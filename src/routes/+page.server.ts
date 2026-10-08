import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import {
	createSelectedWork,
	listSelectedWork,
	getEvent,
	listEvents,
	getSelectedWork,
	updateSelectedWork,
	deleteSelectedWork
} from '$lib/server/db';

export const load: PageServerLoad = async ({ platform }) => {
	const db = platform?.env?.DB;
	if (!db) return { selectedWork: [], events: [] };

	// Hvis databasen ikke er sat op endnu (fx manglende migrationer), må siden
	// ikke kaste en 500. Vi logger fejlen og viser en tom liste i stedet.
	let selectedWork: Awaited<ReturnType<typeof listSelectedWork>> = [];
	try {
		selectedWork = await listSelectedWork(db);
	} catch (err) {
		console.error('Kunne ikke hente selected work:', err);
	}

	let events: Awaited<ReturnType<typeof listEvents>> = [];
	try {
		events = await listEvents(db);
	} catch (err) {
		console.error('Kunne ikke hente events:', err);
	}

	return { selectedWork, events };
};

export const actions: Actions = {
	createWork: async ({ request, platform, locals }) => {
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
			await createSelectedWork(db, { name, years: years || null, eventId });
		} catch (err) {
			console.error('Kunne ikke oprette selected work:', err);
			return fail(500, { error: 'Could not save. Please try again later.' });
		}

		return { success: true };
		},

		updateWork: async ({ request, platform, locals }) => {
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

		const existing = await getSelectedWork(db, id);
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
			await updateSelectedWork(db, id, { name, years: years || null, eventId });
		} catch (err) {
			console.error('Kunne ikke opdatere selected work:', err);
			return fail(500, { error: 'Could not save. Please try again later.' });
		}

		return { success: true };
		},

		deleteWork: async ({ request, platform, locals }) => {
		if (!locals.owner) return fail(403, { error: 'Not authorized.' });

		const db = platform?.env?.DB;
		if (!db) return fail(500, { error: 'The database is not configured.' });

		const data = await request.formData();
		const id = Number(String(data.get('id') ?? '').trim());
		if (!Number.isInteger(id)) return fail(400, { error: 'Invalid entry.' });

		try {
			await deleteSelectedWork(db, id);
		} catch (err) {
			console.error('Kunne ikke slette selected work:', err);
			return fail(500, { error: 'Could not delete. Please try again later.' });
		}

		return { success: true };
	}
};
