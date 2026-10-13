import type { Handle } from '@sveltejs/kit';
import { getSessionCookie } from '$lib/server/session';
import { isSessionValid } from '$lib/server/db';
import { normalizeOwnerPath } from '$lib/server/owner-path';

/**
 * Stier der aldrig må føre til owner-login. De afvises tidligt i `handle`,
 * så et gæt på et oplagt navn ikke engang når frem til en route.
 */
const GUESSABLE_OWNER_PATHS = new Set(['/owner', '/admin', '/login']);

export const handle: Handle = async ({ event, resolve }) => {
	const db = event.platform?.env?.DB;
	const token = getSessionCookie(event.request.headers.get('cookie'));

	event.locals.owner = db && token ? await isSessionValid(db, token) : false;

	// Gør den normaliserede owner-sti tilgængelig for resten af requesten.
	event.locals.ownerPath = normalizeOwnerPath(event.platform?.env?.OWNER_PATH);

	// Hvis OWNER_PATH indeholder en ledende skråstreg og man kopierer den
	// direkte ind i adresselinjen, kan man ende med "//manage-xyz". Så matcher
	// den dynamiske route ikke (tomt første-segment), og man får et 404 fra
	// routeren. Vi samler stien til én skråstreg og omdirigerer.
	if (event.url.pathname.startsWith('//')) {
		const collapsed = event.url.pathname.replace(/^\/+/, '/');
		return new Response(null, {
			status: 308,
			headers: { location: collapsed + event.url.search }
		});
	}

	// Auth er gate't her på serveren: oplagte owner-stier svarer 404, uanset om
	// der findes en route. Selve login-siden ligger på den hemmelige sti
	// (OWNER_PATH) og valideres derudover i routens load/action.
	if (GUESSABLE_OWNER_PATHS.has(event.url.pathname.toLowerCase())) {
		return new Response('Not Found', { status: 404 });
	}

	return resolve(event);
};
