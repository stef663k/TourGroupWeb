import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { getAbout, updateAbout } from '$lib/server/db';

const MAX_LENGTH = 5000;

export const load: PageServerLoad = async ({ platform }) => {
	const db = platform?.env?.DB;
	if (!db) return { about: { aboutMe: null, whatICanDo: null } };

	// Hvis databasen ikke er sat op endnu (fx manglende migrationer), må siden
	// ikke kaste en 500. Vi logger fejlen og viser tomt indhold i stedet.
	try {
		const row = await getAbout(db);
		return {
			about: {
				aboutMe: row?.about_me ?? null,
				whatICanDo: row?.what_i_can_do ?? null
			}
		};
	} catch (err) {
		console.error('Kunne ikke hente about-indhold:', err);
		return { about: { aboutMe: null, whatICanDo: null } };
	}
};

export const actions: Actions = {
	updateAbout: async ({ request, platform, locals }) => {
		if (!locals.owner) return fail(403, { error: 'Not authorized.' });

		const db = platform?.env?.DB;
		if (!db) return fail(500, { error: 'The database is not configured.' });

		const data = await request.formData();

		// Kun felter der faktisk er sendt med, opdateres. Det gør det muligt at
		// have en separat formular under hver sektion uden at overskrive den anden.
		const input: { aboutMe?: string | null; whatICanDo?: string | null } = {};

		if (data.has('aboutMe')) {
			const aboutMe = String(data.get('aboutMe') ?? '').trim();
			if (aboutMe.length > MAX_LENGTH) {
				return fail(400, { error: 'The “About me” text is too long.' });
			}
			input.aboutMe = aboutMe || null;
		}

		if (data.has('whatICanDo')) {
			const whatICanDo = String(data.get('whatICanDo') ?? '').trim();
			if (whatICanDo.length > MAX_LENGTH) {
				return fail(400, { error: 'The “What I can do” text is too long.' });
			}
			input.whatICanDo = whatICanDo || null;
		}

		try {
			await updateAbout(db, input);
		} catch (err) {
			console.error('Kunne ikke opdatere about-indhold:', err);
			return fail(500, { error: 'Could not save. Please try again later.' });
		}

		return { success: true };
	}
};
