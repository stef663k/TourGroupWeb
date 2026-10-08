import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { createSelectedWork, listSelectedWork } from '$lib/server/db';

export const load: PageServerLoad = async ({ platform }) => {
	const db = platform?.env?.DB;
	if (!db) return { selectedWork: [] };

	// Hvis databasen ikke er sat op endnu (fx manglende migrationer), må siden
	// ikke kaste en 500. Vi logger fejlen og viser en tom liste i stedet.
	try {
		const selectedWork = await listSelectedWork(db);
		return { selectedWork };
	} catch (err) {
		console.error('Kunne ikke hente selected work:', err);
		return { selectedWork: [] };
	}
};

export const actions: Actions = {
	createWork: async ({ request, platform, locals }) => {
		if (!locals.owner) return fail(403, { error: 'Not authorized.' });

		const db = platform?.env?.DB;
		if (!db) return fail(500, { error: 'The database is not configured.' });

		const data = await request.formData();
		const name = String(data.get('name') ?? '').trim();
		const years = String(data.get('years') ?? '').trim();

		if (!name) return fail(400, { error: 'Name is required.' });
		if (name.length > 200) return fail(400, { error: 'The name is too long.' });
		if (years.length > 50) return fail(400, { error: 'The year is too long.' });

		try {
			await createSelectedWork(db, { name, years: years || null });
		} catch (err) {
			console.error('Kunne ikke oprette selected work:', err);
			return fail(500, { error: 'Could not save. Please try again later.' });
		}

		return { success: true };
	}
};
