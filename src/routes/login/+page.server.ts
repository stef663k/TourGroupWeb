import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { verifyOwnerPassword, createSession } from '$lib/server/db';
import { SESSION_COOKIE_NAME, SESSION_TTL_SECONDS } from '$lib/server/session';

export const load: PageServerLoad = ({ locals }) => {
	if (locals.owner) {
		redirect(303, '/');
	}
	return {};
};

export const actions: Actions = {
	default: async ({ request, cookies, platform, locals }) => {
		const data = await request.formData();
		const password = String(data.get('password') ?? '');

		if (!password) {
			return fail(400, { error: 'Indtast venligst en adgangskode.' });
		}

		const db = platform?.env.DB;
		if (!db) {
			return fail(500, { error: 'Login er ikke konfigureret korrekt på serveren.' });
		}

		const ok = await verifyOwnerPassword(db, password);
		if (!ok) {
			return fail(400, { error: 'Forkert adgangskode.' });
		}

		const sessionId = await createSession(db, SESSION_TTL_SECONDS);
		cookies.set(SESSION_COOKIE_NAME, sessionId, {
			path: '/',
			httpOnly: true,
			secure: true,
			sameSite: 'lax',
			maxAge: SESSION_TTL_SECONDS
		});

		locals.owner = true;

		redirect(303, '/');
	}
};
