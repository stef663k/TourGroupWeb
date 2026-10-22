import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { listCompanies, getCompany, createCompany, updateCompany, deleteCompany } from '$lib/server/db';
import { publicImageUrl } from '$lib/server/storage';

/**
 * Validerer et virksomheds-link. Tomme links er tilladt (feltet er valgfrit).
 * Returnerer en fejlmeddelelse eller null hvis linket er gyldigt.
 */
function validateLink(link: string): string | null {
	if (!link) return null;
	if (link.length > 2048) return 'The link is too long.';
	let url: URL;
	try {
		url = new URL(link);
	} catch {
		return 'The link must be a valid URL (starting with http:// or https://).';
	}
	if (url.protocol !== 'http:' && url.protocol !== 'https:') {
		return 'The link must be a valid URL (starting with http:// or https://).';
	}
	return null;
}

const LOGO_KEY = 'logo/LogoNoBorder.png';
const HERO_BACKGROUND_KEY = 'Lukas/HomeBackground.jpg';

export const load: PageServerLoad = async ({ platform }) => {
	const db = platform?.env?.DB;
	const baseUrl = platform?.env?.R2_PUBLIC_URL;
	const logoUrl = publicImageUrl(LOGO_KEY, baseUrl);
	const heroBackgroundUrl = publicImageUrl(HERO_BACKGROUND_KEY, baseUrl);
	if (!db) return { companies: [], logoUrl, heroBackgroundUrl };

	let companies: Awaited<ReturnType<typeof listCompanies>> = [];
	try {
		companies = await listCompanies(db);
	} catch (err) {
		console.error('Kunne ikke hente companies:', err);
	}

	return { companies, logoUrl, heroBackgroundUrl };
};

export const actions: Actions = {
	createCompany: async ({ request, platform, locals }) => {
		if (!locals.owner) return fail(403, { error: 'Not authorized.' });

		const db = platform?.env?.DB;
		if (!db) return fail(500, { error: 'The database is not configured.' });

		const data = await request.formData();
		const name = String(data.get('name') ?? '').trim();
		const link = String(data.get('link') ?? '').trim();

		if (!name) return fail(400, { error: 'Name is required.' });
		if (name.length > 200) return fail(400, { error: 'The name is too long.' });

		const linkError = validateLink(link);
		if (linkError) return fail(400, { error: linkError });

		try {
			await createCompany(db, { name, link: link || null });
		} catch (err) {
			console.error('Kunne ikke oprette company:', err);
			return fail(500, { error: 'Could not save. Please try again later.' });
		}

		return { success: true };
	},

	updateCompany: async ({ request, platform, locals }) => {
		if (!locals.owner) return fail(403, { error: 'Not authorized.' });

		const db = platform?.env?.DB;
		if (!db) return fail(500, { error: 'The database is not configured.' });

		const data = await request.formData();
		const id = Number(String(data.get('id') ?? '').trim());
		if (!Number.isInteger(id)) return fail(400, { error: 'Invalid entry.' });

		const name = String(data.get('name') ?? '').trim();
		const link = String(data.get('link') ?? '').trim();

		if (!name) return fail(400, { error: 'Name is required.' });
		if (name.length > 200) return fail(400, { error: 'The name is too long.' });

		const linkError = validateLink(link);
		if (linkError) return fail(400, { error: linkError });

		const existing = await getCompany(db, id);
		if (!existing) return fail(404, { error: 'The entry does not exist.' });

		try {
			await updateCompany(db, id, { name, link: link || null });
		} catch (err) {
			console.error('Kunne ikke opdatere company:', err);
			return fail(500, { error: 'Could not save. Please try again later.' });
		}

		return { success: true };
	},

	deleteCompany: async ({ request, platform, locals }) => {
		if (!locals.owner) return fail(403, { error: 'Not authorized.' });

		const db = platform?.env?.DB;
		if (!db) return fail(500, { error: 'The database is not configured.' });

		const data = await request.formData();
		const id = Number(String(data.get('id') ?? '').trim());
		if (!Number.isInteger(id)) return fail(400, { error: 'Invalid entry.' });

		try {
			await deleteCompany(db, id);
		} catch (err) {
			console.error('Kunne ikke slette company:', err);
			return fail(500, { error: 'Could not delete. Please try again later.' });
		}

		return { success: true };
	}
};
