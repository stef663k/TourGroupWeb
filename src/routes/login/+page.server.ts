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
			return fail(400, { error: 'Please enter a password.' });
		}

		const db = platform?.env?.DB;
		if (!db) {
			return fail(500, { error: 'Login is not configured correctly on the server.' });
			}

			let ok: boolean;
			try {
			ok = await verifyOwnerPassword(db, password);
			} catch (err) {
			console.error('Login fejlede:', err);
			return fail(500, { error: 'Login is not configured correctly on the server.' });
			}
			if (!ok) {
			return fail(400, { error: 'Incorrect password.' });
			}

		let sessionId: string;
		try {
			sessionId = await createSession(db, SESSION_TTL_SECONDS);
		} catch (err) {
			console.error('Kunne ikke oprette session:', err);
			return fail(500, { error: 'Could not log in. Please try again later.' });
		}

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
