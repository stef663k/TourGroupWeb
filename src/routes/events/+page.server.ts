import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import {
	createEvent,
	listEvents,
	listEventImages,
	addEventImage,
	getEvent,
	updateEvent,
	deleteEvent
} from '$lib/server/db';
import {
	buildImageKey,
	publicImageUrl,
	slugify,
	validateImage,
	MAX_IMAGE_BYTES
} from '$lib/server/storage';

export const load: PageServerLoad = async ({ platform }) => {
	const db = platform?.env?.DB;
	if (!db) return { events: [], imageBaseUrl: undefined };

	const baseUrl = platform?.env?.R2_PUBLIC_URL;

	// Hvis databasen ikke er sat op endnu (fx manglende migrationer), må siden
	// ikke kaste en 500. Vi logger fejlen og viser en tom liste i stedet.
	let events: Awaited<ReturnType<typeof listEvents>>;
	try {
		events = await listEvents(db);
	} catch (err) {
		console.error('Kunne ikke hente events:', err);
		return { events: [], imageBaseUrl: baseUrl };
	}

	const withImages = await Promise.all(
		events.map(async (event) => {
			let images: Awaited<ReturnType<typeof listEventImages>> = [];
			try {
				images = await listEventImages(db, event.id);
			} catch (err) {
				console.error(`Kunne ikke hente billeder for event ${event.id}:`, err);
			}
			return {
				...event,
				images: images.map((img) => ({
					id: img.id,
					caption: img.caption,
					url: publicImageUrl(img.r2_key, baseUrl)
				}))
			};
		})
	);

	return { events: withImages, imageBaseUrl: baseUrl };
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
		const file = data.get('file');

		if (!name) return fail(400, { error: 'Name is required.' });
		if (name.length > 200) return fail(400, { error: 'The name is too long.' });

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
				description: description || null
			});
		} catch (err) {
			if (err instanceof Error && err.message.includes('UNIQUE')) {
				return fail(400, { error: 'An event with the same name already exists.' });
			}
			console.error('Kunne ikke oprette event:', err);
			return fail(500, { error: 'Could not create the event. Please try again later.' });
		}

		const key = buildImageKey(created.slug, validation.contentType, crypto.randomUUID());

		try {
			await bucket.put(key, await file.arrayBuffer(), {
				httpMetadata: { contentType: validation.contentType }
			});

			await addEventImage(db, {
				eventId: created.id,
				r2Key: key,
				caption: null,
				contentType: validation.contentType
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

		if (!name) return fail(400, { error: 'Name is required.' });
		if (name.length > 200) return fail(400, { error: 'The name is too long.' });

		if (eventDate && !/^\d{4}-\d{2}-\d{2}$/.test(eventDate)) {
			return fail(400, { error: 'Date must be in the format YYYY-MM-DD.' });
		}

		const existing = await getEvent(db, id);
		if (!existing) return fail(404, { error: 'The event does not exist.' });

		const slug = slugify(name) || existing.slug;

		try {
			await updateEvent(db, id, {
				slug,
				name,
				eventDate: eventDate || null,
				location: location || null,
				description: description || null
			});
		} catch (err) {
			if (err instanceof Error && err.message.includes('UNIQUE')) {
				return fail(400, { error: 'An event with the same name already exists.' });
			}
			console.error('Kunne ikke opdatere event:', err);
			return fail(500, { error: 'Could not save the event. Please try again later.' });
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
