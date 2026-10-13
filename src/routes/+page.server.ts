import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import {
	createArtist,
	listArtists,
	listEvents,
	listEventImages,
	getArtist,
	updateArtist,
	updateArtistDetails,
	deleteArtist,
	listArtistLinks,
	getArtistLink,
	addArtistLink,
	removeArtistLink,
	listCompanies,
	getCompany,
	createCompany,
	updateCompany,
	deleteCompany
} from '$lib/server/db';
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

export const load: PageServerLoad = async ({ platform }) => {
	const db = platform?.env?.DB;
	if (!db) return { artists: [], companies: [] };

	const baseUrl = platform?.env?.R2_PUBLIC_URL;

	// Events hentes først, så vi kan finde hver artists nyeste event (efter dato)
	// og vise alle artistens events i artistmodalen.
	// listEvents sorterer nyeste dato først, så den første kamp pr. artist er den nyeste.
	let events: Awaited<ReturnType<typeof listEvents>> = [];
	try {
		events = await listEvents(db);
	} catch (err) {
		console.error('Kunne ikke hente events:', err);
	}

	// Berig hvert event med billeder og artistens navn, så de kan vises som
	// EventCards i artistmodalen (samme form som events-siden bruger).
	const artistNameById = new Map<number, string>();
	const eventsWithImages = await Promise.all(
		events.map(async (event) => {
			let images: Awaited<ReturnType<typeof listEventImages>> = [];
			try {
				images = await listEventImages(db, event.id);
			} catch (err) {
				console.error(`Kunne ikke hente billeder for event ${event.id}:`, err);
			}
			return {
				...event,
				artistName: null,
				images: images.map((img) => ({
					id: img.id,
					caption: img.caption,
					url: publicImageUrl(img.r2_key, baseUrl)
				}))
			};
		})
	);

	const latestEventIdByArtist = new Map<number, number>();
	const eventsByArtist = new Map<number, typeof eventsWithImages>();
	for (const event of eventsWithImages) {
		if (event.artist_id === null) continue;
		if (!latestEventIdByArtist.has(event.artist_id)) {
			latestEventIdByArtist.set(event.artist_id, event.id);
		}
		const list = eventsByArtist.get(event.artist_id) ?? [];
		list.push(event);
		eventsByArtist.set(event.artist_id, list);
	}

	// Hvis databasen ikke er sat op endnu (fx manglende migrationer), må siden
	// ikke kaste en 500. Vi logger fejlen og viser en tom liste i stedet.
	let artists: Awaited<ReturnType<typeof listArtists>> = [];
	try {
		artists = await listArtists(db);
	} catch (err) {
		console.error('Kunne ikke hente artists:', err);
	}

	for (const artist of artists) {
		artistNameById.set(artist.id, artist.name);
	}

	const artistsWithLinks = await Promise.all(
		artists.map(async (artist) => {
			let links: Awaited<ReturnType<typeof listArtistLinks>> = [];
			try {
				links = await listArtistLinks(db, artist.id);
			} catch (err) {
				console.error(`Kunne ikke hente links for artist ${artist.id}:`, err);
			}
			const artistEvents = (eventsByArtist.get(artist.id) ?? []).map((event) => ({
				...event,
				artistName: artistNameById.get(event.artist_id ?? -1) ?? null
			}));
			return {
				...artist,
				latestEventId: latestEventIdByArtist.get(artist.id) ?? null,
				links: links.map((link) => ({ id: link.id, label: link.label, url: link.url })),
				events: artistEvents
			};
		})
	);

	let companies: Awaited<ReturnType<typeof listCompanies>> = [];
	try {
		companies = await listCompanies(db);
	} catch (err) {
		console.error('Kunne ikke hente companies:', err);
	}

	return { artists: artistsWithLinks, companies };
	};

	export const actions: Actions = {
	createArtist: async ({ request, platform, locals }) => {
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
			await createArtist(db, { name, years: years || null });
		} catch (err) {
			console.error('Kunne ikke oprette artist:', err);
			return fail(500, { error: 'Could not save. Please try again later.' });
		}

		return { success: true };
		},

	updateArtist: async ({ request, platform, locals }) => {
		if (!locals.owner) return fail(403, { error: 'Not authorized.' });

		const db = platform?.env?.DB;
		if (!db) return fail(500, { error: 'The database is not configured.' });

		const data = await request.formData();
		const id = Number(String(data.get('id') ?? '').trim());
		if (!Number.isInteger(id)) return fail(400, { error: 'Invalid entry.' });

		const name = String(data.get('name') ?? '').trim();
		const years = String(data.get('years') ?? '').trim();

		if (!name) return fail(400, { error: 'Name is required.' });
		if (name.length > 200) return fail(400, { error: 'The name is too long.' });
		if (years.length > 50) return fail(400, { error: 'The year is too long.' });

		const existing = await getArtist(db, id);
		if (!existing) return fail(404, { error: 'The entry does not exist.' });

		try {
			await updateArtist(db, id, { name, years: years || null });
		} catch (err) {
			console.error('Kunne ikke opdatere artist:', err);
			return fail(500, { error: 'Could not save. Please try again later.' });
		}

		return { success: true };
	},

	updateArtistDetails: async ({ request, platform, locals }) => {
		if (!locals.owner) return fail(403, { error: 'Not authorized.' });

		const db = platform?.env?.DB;
		if (!db) return fail(500, { error: 'The database is not configured.' });

		const data = await request.formData();
		const id = Number(String(data.get('id') ?? '').trim());
		if (!Number.isInteger(id)) return fail(400, { error: 'Invalid entry.' });

		const details = String(data.get('details') ?? '').trim();
		if (details.length > 5000) return fail(400, { error: 'The text is too long.' });

		const existing = await getArtist(db, id);
		if (!existing) return fail(404, { error: 'The entry does not exist.' });

		try {
			await updateArtistDetails(db, id, details || null);
		} catch (err) {
			console.error('Kunne ikke opdatere artist-tekst:', err);
			return fail(500, { error: 'Could not save. Please try again later.' });
		}

		return { success: true };
	},

	addArtistLink: async ({ request, platform, locals }) => {
		if (!locals.owner) return fail(403, { error: 'Not authorized.' });

		const db = platform?.env?.DB;
		if (!db) return fail(500, { error: 'The database is not configured.' });

		const data = await request.formData();
		const id = Number(String(data.get('id') ?? '').trim());
		if (!Number.isInteger(id)) return fail(400, { error: 'Invalid entry.' });

		const label = String(data.get('label') ?? '').trim();
		const url = String(data.get('url') ?? '').trim();

		if (!label) return fail(400, { error: 'A link text is required.' });
		if (label.length > 200) return fail(400, { error: 'The link text is too long.' });

		const linkError = validateLink(url);
		if (!url) return fail(400, { error: 'A link is required.' });
		if (linkError) return fail(400, { error: linkError });

		const existing = await getArtist(db, id);
		if (!existing) return fail(404, { error: 'The entry does not exist.' });

		try {
			await addArtistLink(db, { artistId: id, label, url });
		} catch (err) {
			console.error('Kunne ikke tilføje artist-link:', err);
			return fail(500, { error: 'Could not save. Please try again later.' });
		}

		return { success: true };
	},

	removeArtistLink: async ({ request, platform, locals }) => {
		if (!locals.owner) return fail(403, { error: 'Not authorized.' });

		const db = platform?.env?.DB;
		if (!db) return fail(500, { error: 'The database is not configured.' });

		const data = await request.formData();
		const id = Number(String(data.get('id') ?? '').trim());
		if (!Number.isInteger(id)) return fail(400, { error: 'Invalid link.' });

		const existing = await getArtistLink(db, id);
		if (!existing) return fail(404, { error: 'The link does not exist.' });

		try {
			await removeArtistLink(db, id);
		} catch (err) {
			console.error('Kunne ikke slette artist-link:', err);
			return fail(500, { error: 'Could not delete. Please try again later.' });
		}

		return { success: true };
	},

	deleteArtist: async ({ request, platform, locals }) => {
		if (!locals.owner) return fail(403, { error: 'Not authorized.' });

		const db = platform?.env?.DB;
		if (!db) return fail(500, { error: 'The database is not configured.' });

		const data = await request.formData();
		const id = Number(String(data.get('id') ?? '').trim());
		if (!Number.isInteger(id)) return fail(400, { error: 'Invalid entry.' });

		try {
			await deleteArtist(db, id);
		} catch (err) {
			console.error('Kunne ikke slette artist:', err);
			return fail(500, { error: 'Could not delete. Please try again later.' });
		}

		return { success: true };
	},

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
