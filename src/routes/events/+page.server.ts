import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { createEvent, listEvents, listEventImages, addEventImage } from '$lib/server/db';
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
		if (!locals.owner) return fail(403, { error: 'Ikke autoriseret.' });

		const db = platform?.env?.DB;
		const bucket = platform?.env?.Bucket;
		if (!db) return fail(500, { error: 'Databasen er ikke konfigureret.' });

		const data = await request.formData();
		const name = String(data.get('name') ?? '').trim();
		const eventDate = String(data.get('eventDate') ?? '').trim();
		const location = String(data.get('location') ?? '').trim();
		const description = String(data.get('description') ?? '').trim();
		const file = data.get('file');

		if (!name) return fail(400, { error: 'Navn er påkrævet.' });
		if (name.length > 200) return fail(400, { error: 'Navnet er for langt.' });

		const slug = slugify(name) || `event-${Date.now()}`;

		if (eventDate && !/^\d{4}-\d{2}-\d{2}$/.test(eventDate)) {
			return fail(400, { error: 'Dato skal være i formatet ÅÅÅÅ-MM-DD.' });
		}

		if (!(file instanceof File) || file.size === 0) {
			return fail(400, { error: 'Vælg et billede.' });
		}
		if (!bucket) return fail(500, { error: 'Lageret er ikke konfigureret.' });

		if (file.size > MAX_IMAGE_BYTES) {
			return fail(400, { error: 'Filen er for stor (maks 8 MB).' });
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
				return fail(400, { error: 'Der findes allerede et event med samme navn.' });
			}
			console.error('Kunne ikke oprette event:', err);
			return fail(500, { error: 'Kunne ikke oprette event. Prøv igen senere.' });
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
			return fail(500, { error: 'Eventet blev oprettet, men billedet kunne ikke uploades.' });
		}

		return { success: true };
	}
};
