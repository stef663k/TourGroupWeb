import type { Handle } from '@sveltejs/kit';
import { getSessionCookie } from '$lib/server/session';
import { isSessionValid } from '$lib/server/db';

export const handle: Handle = async ({ event, resolve }) => {
	const db = event.platform?.env.DB;
	const token = getSessionCookie(event.request.headers.get('cookie'));

	event.locals.owner = db && token ? await isSessionValid(db, token) : false;

	return resolve(event);
};
