import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import {
	createEvent,
	listEvents,
	listEventImages,
	addEventImage,
	getEvent,
	getEventImage,
	updateEvent,
	updateEventImage,
	updateEventImageAlt,
	deleteEvent,
	removeEventImage,
	listArtists,
	getArtist
} from '$lib/server/db';
import {
	buildImageKey,
	publicImageUrl,
	slugify,
	validateImage,
	MAX_IMAGE_BYTES
} from '$lib/server/storage';

/** R2-nøgle for baggrundsbilledet på events-siden. */
const EVENTS_BACKGROUND_KEY = 'Lukas/EventBackground.jpg';

export const load: PageServerLoad = async ({ platform }) => {
	const db = platform?.env?.DB;
	const baseUrl = platform?.env?.R2_PUBLIC_URL;
	const eventBackgroundUrl = publicImageUrl(EVENTS_BACKGROUND_KEY, baseUrl);
	if (!db) return { events: [], artists: [], imageBaseUrl: undefined, eventBackgroundUrl };

	// Artisterne hentes til "Link an artist"-vælgeren på opret/opdater-formularen.
	let artists: Awaited<ReturnType<typeof listArtists>> = [];
	try {
		artists = await listArtists(db);
	} catch (err) {
		console.error('Kunne ikke hente artists:', err);
	}

	// Hvis databasen ikke er sat op endnu (fx manglende migrationer), må siden
	// ikke kaste en 500. Vi logger fejlen og viser en tom liste i stedet.
	let events: Awaited<ReturnType<typeof listEvents>>;
	try {
		events = await listEvents(db);
	} catch (err) {
		console.error('Kunne ikke hente events:', err);
		return { events: [], artists, imageBaseUrl: baseUrl, eventBackgroundUrl };
	}

	const withImages = await Promise.all(
		events.map(async (event) => {
			let images: Awaited<ReturnType<typeof listEventImages>> = [];
			try {
				images = await listEventImages(db, event.id);
			} catch (err) {
				console.error(`Kunne ikke hente billeder for event ${event.id}:`, err);
			}
			const artist = artists.find((a) => a.id === event.artist_id) ?? null;
			return {
				...event,
				artistName: artist?.name ?? null,
				images: images.map((img) => ({
					id: img.id,
					caption: img.caption,
					alt: img.alt,
					isCover: img.is_cover === 1,
					url: publicImageUrl(img.r2_key, baseUrl)
				}))
			};
		})
	);

	return {
		events: withImages,
		artists: artists.map((a) => ({ id: a.id, name: a.name })),
		imageBaseUrl: baseUrl,
		eventBackgroundUrl
	};
};

/**
 * Læser højst det antal bytes vi skal bruge til magic-byte-sniffing.
 * Vi læser hele filen (den er allerede i hukommelsen som Blob), men
 * sniffer kun headeren.
 */
async function readImageHead(file: Blob, length = 16): Promise<Uint8Array> {
	const buffer = await file.slice(0, length).arrayBuffer();
	return new Uint8Array(buffer);
}

/**
 * Læser og validerer et valgfrit artist-id fra formularen. Returnerer
 * { value } ved succes (null = ingen artist) eller { error } ved fejl.
 */
async function resolveArtistId(
	db: D1Database,
	artistIdRaw: string
): Promise<{ value: number | null } | { error: string }> {
	if (!artistIdRaw) return { value: null };
	const parsed = Number(artistIdRaw);
	if (!Number.isInteger(parsed)) return { error: 'Invalid artist.' };
	const artist = await getArtist(db, parsed);
	if (!artist) return { error: 'The selected artist does not exist.' };
	return { value: parsed };
}

/**
 * Validerer et event-link. Tomme links er tilladt (feltet er valgfrit).
 * Returnerer en fejlmeddelelse eller null hvis linket er gyldigt.
 */
function validateLink(link: string): string | null {
	if (!link) return null;
	if (link.length > 2048) return 'The link is too long.';
	let url: URL;
	try {
		url = new URL(link);
	} catch {
		return 'The link must be a valid URL (starting with http:// or https://).';
	}
	if (url.protocol !== 'http:' && url.protocol !== 'https:') {
		return 'The link must be a valid URL (starting with http:// or https://).';
	}
	return null;
}

export const actions: Actions = {
	createEvent: async ({ request, platform, locals }) => {
		if (!locals.owner) return fail(403, { error: 'Not authorized.' });

		const db = platform?.env?.DB;
		const bucket = platform?.env?.Bucket;
		if (!db) return fail(500, { error: 'The database is not configured.' });

		const data = await request.formData();
		const name = String(data.get('name') ?? '').trim();
		const eventDate = String(data.get('eventDate') ?? '').trim();
		const location = String(data.get('location') ?? '').trim();
		const description = String(data.get('description') ?? '').trim();
		const link = String(data.get('link') ?? '').trim();
		const linkLabel = String(data.get('linkLabel') ?? '').trim();
		const artistIdRaw = String(data.get('artistId') ?? '').trim();
		const file = data.get('file');

		if (!name) return fail(400, { error: 'Name is required.' });
		if (name.length > 200) return fail(400, { error: 'The name is too long.' });

		const linkError = validateLink(link);
		if (linkError) return fail(400, { error: linkError });
		if (linkLabel.length > 200) return fail(400, { error: 'The link text is too long.' });

		const artistResult = await resolveArtistId(db, artistIdRaw);
		if ('error' in artistResult) return fail(400, { error: artistResult.error });

		const slug = slugify(name) || `event-${Date.now()}`;

		if (eventDate && !/^\d{4}-\d{2}-\d{2}$/.test(eventDate)) {
			return fail(400, { error: 'Date must be in the format YYYY-MM-DD.' });
		}

		if (!(file instanceof File) || file.size === 0) {
			return fail(400, { error: 'Choose an image.' });
		}
		if (!bucket) return fail(500, { error: 'Storage is not configured.' });

		if (file.size > MAX_IMAGE_BYTES) {
			return fail(400, { error: 'The file is too large (max 8 MB).' });
		}

		const head = await readImageHead(file);
		const validation = validateImage({
			contentType: file.type,
			size: file.size,
			head
		});
		if (!validation.ok) return fail(400, { error: validation.error });

		let created: Awaited<ReturnType<typeof createEvent>>;
		try {
			created = await createEvent(db, {
				slug,
				name,
				eventDate: eventDate || null,
				location: location || null,
				description: description || null,
				link: link || null,
				linkLabel: linkLabel || null,
				artistId: artistResult.value
				});
		} catch (err) {
			if (err instanceof Error && err.message.includes('UNIQUE')) {
				return fail(400, { error: 'An event with the same name already exists.' });
			}
			console.error('Kunne ikke oprette event:', err);
			return fail(500, { error: 'Could not create the event. Please try again later.' });
		}

		const key = buildImageKey(created.slug, validation.contentType, crypto.randomUUID(), 'cover');

		try {
			await bucket.put(key, await file.arrayBuffer(), {
				httpMetadata: { contentType: validation.contentType }
			});

			await addEventImage(db, {
				eventId: created.id,
				r2Key: key,
				caption: null,
				contentType: validation.contentType,
				isCover: true
			});
		} catch (err) {
			console.error('Kunne ikke uploade billede:', err);
			return fail(500, { error: 'The event was created, but the image could not be uploaded.' });
		}

		return { success: true };
	},

	updateEvent: async ({ request, platform, locals }) => {
		if (!locals.owner) return fail(403, { error: 'Not authorized.' });

		const db = platform?.env?.DB;
		if (!db) return fail(500, { error: 'The database is not configured.' });

		const data = await request.formData();
		const id = Number(String(data.get('id') ?? '').trim());
		if (!Number.isInteger(id)) return fail(400, { error: 'Invalid event.' });

		const name = String(data.get('name') ?? '').trim();
		const eventDate = String(data.get('eventDate') ?? '').trim();
		const location = String(data.get('location') ?? '').trim();
		const description = String(data.get('description') ?? '').trim();
		const details = String(data.get('details') ?? '').trim();
		const link = String(data.get('link') ?? '').trim();
		const linkLabel = String(data.get('linkLabel') ?? '').trim();
		const artistIdRaw = String(data.get('artistId') ?? '').trim();

		if (!name) return fail(400, { error: 'Name is required.' });
		if (name.length > 200) return fail(400, { error: 'The name is too long.' });

		const linkError = validateLink(link);
		if (linkError) return fail(400, { error: linkError });
		if (linkLabel.length > 200) return fail(400, { error: 'The link text is too long.' });

		if (eventDate && !/^\d{4}-\d{2}-\d{2}$/.test(eventDate)) {
			return fail(400, { error: 'Date must be in the format YYYY-MM-DD.' });
		}

		const artistResult = await resolveArtistId(db, artistIdRaw);
		if ('error' in artistResult) return fail(400, { error: artistResult.error });

		const existing = await getEvent(db, id);
		if (!existing) return fail(404, { error: 'The event does not exist.' });

		// Valgfrit nyt cover-billede. Er der valgt en fil, valideres den og
		// uploades til R2, hvorefter det eksisterende cover overskrives.
		const file = data.get('file');
		const newCoverFile = file instanceof File && file.size > 0 ? file : null;

		let cover: {
			key: string;
			contentType: string;
			previousKey: string | null;
			currentId: number | null;
		} | null = null;

		if (newCoverFile) {
			const bucket = platform?.env?.Bucket;
			if (!bucket) return fail(500, { error: 'Storage is not configured.' });

			if (newCoverFile.size > MAX_IMAGE_BYTES) {
				return fail(400, { error: 'The file is too large (max 8 MB).' });
			}

			const head = await readImageHead(newCoverFile);
			const validation = validateImage({
				contentType: newCoverFile.type,
				size: newCoverFile.size,
				head
			});
			if (!validation.ok) return fail(400, { error: validation.error });

			let currentImages: Awaited<ReturnType<typeof listEventImages>> = [];
			try {
				currentImages = await listEventImages(db, id);
			} catch (err) {
				console.error(`Kunne ikke hente billeder for event ${id}:`, err);
			}
			const currentCover = currentImages.find((img) => img.is_cover === 1) ?? null;

			cover = {
				key: buildImageKey(existing.slug, validation.contentType, crypto.randomUUID(), 'cover'),
				contentType: validation.contentType,
				previousKey: currentCover?.r2_key ?? null,
				currentId: currentCover?.id ?? null
			};
		}

		const slug = slugify(name) || existing.slug;

		try {
			await updateEvent(db, id, {
				slug,
				name,
				eventDate: eventDate || null,
				location: location || null,
				description: description || null,
				details: details || null,
				link: link || null,
				linkLabel: linkLabel || null,
				artistId: artistResult.value
				});
		} catch (err) {
			if (err instanceof Error && err.message.includes('UNIQUE')) {
				return fail(400, { error: 'An event with the same name already exists.' });
			}
			console.error('Kunne ikke opdatere event:', err);
			return fail(500, { error: 'Could not save the event. Please try again later.' });
		}

		if (cover && newCoverFile) {
			const bucket = platform?.env?.Bucket!;
			try {
				await bucket.put(cover.key, await newCoverFile.arrayBuffer(), {
					httpMetadata: { contentType: cover.contentType }
				});

				if (cover.currentId !== null) {
					await updateEventImage(db, cover.currentId, {
						r2Key: cover.key,
						contentType: cover.contentType
					});
				} else {
					await addEventImage(db, {
						eventId: id,
						r2Key: cover.key,
						caption: null,
						contentType: cover.contentType,
						isCover: true
					});
				}
			} catch (err) {
				console.error('Kunne ikke opdatere cover-billede:', err);
				return fail(500, { error: 'Could not update the cover image. Please try again later.' });
			}

			// Slet det forrige cover-objekt i R2, så vi ikke efterlader filer.
			if (cover.previousKey && cover.previousKey !== cover.key) {
				try {
					await bucket.delete(cover.previousKey);
				} catch (err) {
					console.error(`Kunne ikke slette gammelt cover ${cover.previousKey} i R2:`, err);
				}
			}
		}

		return { success: true };
		},

	addEventImage: async ({ request, platform, locals }) => {
		if (!locals.owner) return fail(403, { error: 'Not authorized.' });

		const db = platform?.env?.DB;
		const bucket = platform?.env?.Bucket;
		if (!db) return fail(500, { error: 'The database is not configured.' });
		if (!bucket) return fail(500, { error: 'Storage is not configured.' });

		const data = await request.formData();
		const id = Number(String(data.get('id') ?? '').trim());
		if (!Number.isInteger(id)) return fail(400, { error: 'Invalid event.' });

		const caption = String(data.get('caption') ?? '').trim();
		if (caption.length > 200) return fail(400, { error: 'The caption is too long.' });

		const alt = String(data.get('alt') ?? '').trim();
		if (alt.length > 250) return fail(400, { error: 'The alt text is too long.' });

		// Understøtter både én og flere filer i samme upload. Tomme
		// fil-inputs (fx "no file selected") filtreres fra.
		const files = data
			.getAll('file')
			.filter((entry): entry is File => entry instanceof File && entry.size > 0);
		if (files.length === 0) {
			return fail(400, { error: 'Choose an image.' });
		}
		for (const file of files) {
			if (file.size > MAX_IMAGE_BYTES) {
				return fail(400, { error: 'The file is too large (max 8 MB).' });
			}
		}

		const event = await getEvent(db, id);
		if (!event) return fail(404, { error: 'The event does not exist.' });

		// Valider alle filer før vi skriver noget, så en ugyldig fil i en
		// fler-fils-upload ikke efterlader delvise resultater.
		const validated: { file: File; contentType: string }[] = [];
		for (const file of files) {
			const head = await readImageHead(file);
			const validation = validateImage({
				contentType: file.type,
				size: file.size,
				head
			});
			if (!validation.ok) return fail(400, { error: validation.error });
			validated.push({ file, contentType: validation.contentType });
		}

		try {
			for (const { file, contentType } of validated) {
				const key = buildImageKey(event.slug, contentType, crypto.randomUUID(), 'photo');
				await bucket.put(key, await file.arrayBuffer(), {
					httpMetadata: { contentType }
				});
				await addEventImage(db, {
					eventId: id,
					r2Key: key,
					caption: caption || null,
					// Alt-teksten udfyldes automatisk fra billedteksten når den
					// ikke er angivet særskilt, så alt ikke står tomt.
					alt: alt || caption || null,
					contentType
				});
			}
		} catch (err) {
			console.error('Kunne ikke tilføje billede:', err);
			return fail(500, { error: 'Could not add the image. Please try again later.' });
		}

		return { success: true };
		},

		updateEventImageAlt: async ({ request, platform, locals }) => {
		if (!locals.owner) return fail(403, { error: 'Not authorized.' });

		const db = platform?.env?.DB;
		if (!db) return fail(500, { error: 'The database is not configured.' });

		const data = await request.formData();
		const id = Number(String(data.get('id') ?? '').trim());
		if (!Number.isInteger(id)) return fail(400, { error: 'Invalid image.' });

		const alt = String(data.get('alt') ?? '').trim();
		if (alt.length > 250) return fail(400, { error: 'The alt text is too long.' });

		const image = await getEventImage(db, id);
		if (!image) return fail(404, { error: 'The image does not exist.' });

		try {
			await updateEventImageAlt(db, id, alt || null);
		} catch (err) {
			console.error('Kunne ikke opdatere alt-tekst:', err);
			return fail(500, { error: 'Could not save the alt text. Please try again later.' });
		}

		return { success: true };
		},

		removeEventImage: async ({ request, platform, locals }) => {
		if (!locals.owner) return fail(403, { error: 'Not authorized.' });

		const db = platform?.env?.DB;
		if (!db) return fail(500, { error: 'The database is not configured.' });

		const data = await request.formData();
		const id = Number(String(data.get('id') ?? '').trim());
		if (!Number.isInteger(id)) return fail(400, { error: 'Invalid image.' });

		const image = await getEventImage(db, id);
		if (!image) return fail(404, { error: 'The image does not exist.' });

		const bucket = platform?.env?.Bucket;
		if (bucket) {
			try {
				await bucket.delete(image.r2_key);
			} catch (err) {
				console.error(`Kunne ikke slette billede ${id} i R2:`, err);
			}
		}

		try {
			await removeEventImage(db, id);
		} catch (err) {
			console.error('Kunne ikke slette billede:', err);
			return fail(500, { error: 'Could not delete the image. Please try again later.' });
		}

		return { success: true };
	},

	deleteEvent: async ({ request, platform, locals }) => {
		if (!locals.owner) return fail(403, { error: 'Not authorized.' });

		const db = platform?.env?.DB;
		if (!db) return fail(500, { error: 'The database is not configured.' });

		const data = await request.formData();
		const idRaw = String(data.get('id') ?? '').trim();
		const id = Number(idRaw);
		if (!Number.isInteger(id)) return fail(400, { error: 'Invalid event.' });

		const event = await getEvent(db, id);
		if (!event) return fail(404, { error: 'The event does not exist.' });

		// Slet tilhørende R2-objekter først, så vi ikke efterlader forældreløse filer.
		const bucket = platform?.env?.Bucket;
		if (bucket) {
			let images: Awaited<ReturnType<typeof listEventImages>> = [];
			try {
				images = await listEventImages(db, id);
			} catch (err) {
				console.error(`Kunne ikke hente billeder for event ${id}:`, err);
			}
			if (images.length > 0) {
				try {
					await bucket.delete(images.map((img) => img.r2_key));
				} catch (err) {
					console.error(`Kunne ikke slette billeder for event ${id}:`, err);
				}
			}
		}

		try {
			await deleteEvent(db, id);
		} catch (err) {
			console.error('Kunne ikke slette event:', err);
			return fail(500, { error: 'Could not delete the event. Please try again later.' });
		}

		return { success: true };
	}
};
