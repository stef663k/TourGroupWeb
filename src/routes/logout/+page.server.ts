import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { SESSION_COOKIE_NAME, getSessionCookie } from '$lib/server/session';
import { deleteSession } from '$lib/server/db';

export const actions: Actions = {
	default: async ({ cookies, request, platform }) => {
		const db = platform?.env.DB;
		const token = getSessionCookie(request.headers.get('cookie'));
		if (db && token) {
			await deleteSession(db, token);
		}
		cookies.delete(SESSION_COOKIE_NAME, { path: '/' });
		redirect(303, '/');
	}
};
