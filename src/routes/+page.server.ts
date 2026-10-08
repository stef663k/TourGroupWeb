import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import {
	createArtist,
	listArtists,
	getEvent,
	listEvents,
	getArtist,
	updateArtist,
	deleteArtist
} from '$lib/server/db';

export const load: PageServerLoad = async ({ platform }) => {
	const db = platform?.env?.DB;
	if (!db) return { artists: [], events: [] };

	// Hvis databasen ikke er sat op endnu (fx manglende migrationer), må siden
	// ikke kaste en 500. Vi logger fejlen og viser en tom liste i stedet.
	let artists: Awaited<ReturnType<typeof listArtists>> = [];
	try {
		artists = await listArtists(db);
	} catch (err) {
		console.error('Kunne ikke hente artists:', err);
	}

	let events: Awaited<ReturnType<typeof listEvents>> = [];
	try {
		events = await listEvents(db);
	} catch (err) {
		console.error('Kunne ikke hente events:', err);
	}

	return { artists, events };
};

export const actions: Actions = {
	createArtist: async ({ request, platform, locals }) => {
		if (!locals.owner) return fail(403, { error: 'Not authorized.' });

		const db = platform?.env?.DB;
		if (!db) return fail(500, { error: 'The database is not configured.' });

		const data = await request.formData();
		const name = String(data.get('name') ?? '').trim();
		const years = String(data.get('years') ?? '').trim();
		const eventIdRaw = String(data.get('eventId') ?? '').trim();

		if (!name) return fail(400, { error: 'Name is required.' });
		if (name.length > 200) return fail(400, { error: 'The name is too long.' });
		if (years.length > 50) return fail(400, { error: 'The year is too long.' });

		let eventId: number | null = null;
		if (eventIdRaw) {
			const parsed = Number(eventIdRaw);
			if (!Number.isInteger(parsed)) {
				return fail(400, { error: 'Invalid event.' });
			}
			const event = await getEvent(db, parsed);
			if (!event) return fail(400, { error: 'The selected event does not exist.' });
			eventId = parsed;
		}

		try {
			await createArtist(db, { name, years: years || null, eventId });
		} catch (err) {
			console.error('Kunne ikke oprette artist:', err);
			return fail(500, { error: 'Could not save. Please try again later.' });
		}

		return { success: true };
	},

	updateArtist: async ({ request, platform, locals }) => {
		if (!locals.owner) return fail(403, { error: 'Not authorized.' });

		const db = platform?.env?.DB;
		if (!db) return fail(500, { error: 'The database is not configured.' });

		const data = await request.formData();
		const id = Number(String(data.get('id') ?? '').trim());
		if (!Number.isInteger(id)) return fail(400, { error: 'Invalid entry.' });

		const name = String(data.get('name') ?? '').trim();
		const years = String(data.get('years') ?? '').trim();
		const eventIdRaw = String(data.get('eventId') ?? '').trim();

		if (!name) return fail(400, { error: 'Name is required.' });
		if (name.length > 200) return fail(400, { error: 'The name is too long.' });
		if (years.length > 50) return fail(400, { error: 'The year is too long.' });

		const existing = await getArtist(db, id);
		if (!existing) return fail(404, { error: 'The entry does not exist.' });

		let eventId: number | null = null;
		if (eventIdRaw) {
			const parsed = Number(eventIdRaw);
			if (!Number.isInteger(parsed)) {
				return fail(400, { error: 'Invalid event.' });
			}
			const event = await getEvent(db, parsed);
			if (!event) return fail(400, { error: 'The selected event does not exist.' });
			eventId = parsed;
		}

		try {
			await updateArtist(db, id, { name, years: years || null, eventId });
		} catch (err) {
			console.error('Kunne ikke opdatere artist:', err);
			return fail(500, { error: 'Could not save. Please try again later.' });
		}

		return { success: true };
	},

	deleteArtist: async ({ request, platform, locals }) => {
		if (!locals.owner) return fail(403, { error: 'Not authorized.' });

		const db = platform?.env?.DB;
		if (!db) return fail(500, { error: 'The database is not configured.' });

		const data = await request.formData();
		const id = Number(String(data.get('id') ?? '').trim());
		if (!Number.isInteger(id)) return fail(400, { error: 'Invalid entry.' });

		try {
			await deleteArtist(db, id);
		} catch (err) {
			console.error('Kunne ikke slette artist:', err);
			return fail(500, { error: 'Could not delete. Please try again later.' });
		}

		return { success: true };
	}
};
