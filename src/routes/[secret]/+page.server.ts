import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { verifyOwnerPassword, createSession } from '$lib/server/db';
import { SESSION_COOKIE_NAME, SESSION_TTL_SECONDS } from '$lib/server/session';
import { normalizeOwnerPath } from '$lib/server/owner-path';

/**
 * Er den besøgte sti den konfigurerede hemmelige owner-login-sti?
 * Stien kommer fra Wrangler-secret `OWNER_PATH` og må ikke ende i repoet.
 */
function matchesOwnerPath(secret: string, ownerPathEnv: string | undefined): boolean {
	const ownerPath = normalizeOwnerPath(ownerPathEnv);
	if (!ownerPath) return false;
	// `normalizeOwnerPath` giver en absolut sti ("/manage-abc") og `secret`
	// er ét enkelt segment ("manage-abc"), så vi sammenligner uden skråstreg.
	return secret === ownerPath.replace(/^\//, '');
}

export const load: PageServerLoad = ({ params, platform, locals }) => {
	const ownerPath = normalizeOwnerPath(platform?.env?.OWNER_PATH);
	if (!matchesOwnerPath(params.secret, platform?.env?.OWNER_PATH)) {
		// Log kun om stien er konfigureret og dens længde — aldrig selve værdien.
		console.warn(
			`[owner-login] 404 for segment "${params.secret}". ` +
				`OWNER_PATH ${ownerPath ? `configured (length ${ownerPath.length})` : 'IS NOT SET'}.`
		);
		// Ukendt sti: opfør dig som enhver anden ikke-eksisterende side.
		error(404, 'Not Found');
	}
	if (locals.owner) {
		redirect(303, '/');
	}
	return {};
};

export const actions: Actions = {
	default: async ({ request, cookies, platform, locals, params }) => {
		if (!matchesOwnerPath(params.secret, platform?.env?.OWNER_PATH)) {
			return fail(404, { error: 'Not found.' });
		}

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
