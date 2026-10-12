import { describe, it, expect, beforeEach } from 'vitest';
import {
	listArtists,
	createArtist,
	deleteArtist,
	getArtist,
	updateArtistDetails,
	listArtistLinks,
	getArtistLink,
	addArtistLink,
	removeArtistLink
} from '$lib/server/db';

/**
 * Minimal in-memory D1-stub der understøtter de SQL-forespørgsler
 * artist-funktionerne i db.ts bruger.
 */
type FakeD1 = D1Database & {
	_events: { id: number; event_date: string | null; artist_id: number | null }[];
	_links: {
		id: number;
		artist_id: number;
		label: string;
		url: string;
		sort_order: number;
		created_at: number;
	}[];
};

function createFakeD1(): FakeD1 {
	let nextId = 1;
	let nextLinkId = 1;
	const rows: {
		id: number;
		name: string;
		years: string | null;
		details: string | null;
		created_at: number;
	}[] = [];
	const links: {
		id: number;
		artist_id: number;
		label: string;
		url: string;
		sort_order: number;
		created_at: number;
	}[] = [];
	const events: { id: number; event_date: string | null; artist_id: number | null }[] = [];

	const prepare = (sql: string) => {
		let args: unknown[] = [];
		const normalized = () => sql.replace(/\s+/g, ' ').trim();

		const firstStatement = <T>() => {
			const q = normalized();
			if (q.startsWith('INSERT INTO artists (name, years) VALUES')) {
				const [name, years] = args as [string, string | null];
				const row = {
					id: nextId++,
					name,
					years,
					details: null,
					created_at: Math.floor(Date.now() / 1000)
				};
				rows.push(row);
				return row as T;
			}
			if (q.startsWith('SELECT id, name, years, details, created_at FROM artists WHERE id')) {
				const [id] = args as [number];
				return (rows.find((r) => r.id === id) ?? null) as T | null;
			}
			if (q.startsWith('UPDATE artists SET details')) {
				const [details, id] = args as [string | null, number];
				const row = rows.find((r) => r.id === id);
				if (!row) return null;
				row.details = details;
				return row as T;
			}
			if (q.startsWith('INSERT INTO artist_links')) {
				const [artist_id, label, url, sort_order] = args as [number, string, string, number];
				const row = {
					id: nextLinkId++,
					artist_id,
					label,
					url,
					sort_order,
					created_at: Math.floor(Date.now() / 1000)
				};
				links.push(row);
				return row as T;
			}
			if (q.startsWith('SELECT id, artist_id, label, url, sort_order, created_at FROM artist_links WHERE id')) {
				const [id] = args as [number];
				return (links.find((l) => l.id === id) ?? null) as T | null;
			}
			throw new Error(`Unsupported SQL in first(): ${q}`);
		};

		const allStatement = <T>() => {
			const q = normalized();
			if (
				q.startsWith(
					'SELECT artists.id, artists.name, artists.years, artists.details, artists.created_at'
				)
			) {
				// Emulerer den korrelerede underforespørgsel: nyeste event-dato pr. artist.
				const latestDateOf = (artistId: number) => {
					let latest: string | null = null;
					for (const e of events) {
						if (e.artist_id === artistId && e.event_date !== null) {
							if (latest === null || e.event_date > latest) latest = e.event_date;
						}
					}
					return latest;
				};
				const sorted = [...rows].sort((a, b) => {
					const aDate = latestDateOf(a.id);
					const bDate = latestDateOf(b.id);
					const aNull = aDate === null ? 1 : 0;
					const bNull = bDate === null ? 1 : 0;
					if (aNull !== bNull) return aNull - bNull;
					if (aDate !== bDate) return (bDate ?? '').localeCompare(aDate ?? '');
					return b.id - a.id;
				});
				return sorted as T[];
			}
			if (
				q.startsWith(
					'SELECT id, artist_id, label, url, sort_order, created_at FROM artist_links WHERE artist_id'
				)
			) {
				const [artistId] = args as [number];
				const filtered = links
					.filter((l) => l.artist_id === artistId)
					.sort((a, b) => a.sort_order - b.sort_order || a.id - b.id);
				return filtered as T[];
			}
			throw new Error(`Unsupported SQL in all(): ${q}`);
		};

		const runStatement = () => {
			const q = normalized();
			if (q.startsWith('DELETE FROM artists WHERE id')) {
				const [id] = args as [number];
				const idx = rows.findIndex((r) => r.id === id);
				if (idx >= 0) rows.splice(idx, 1);
				return { success: true };
			}
			if (q.startsWith('DELETE FROM artist_links WHERE id')) {
				const [id] = args as [number];
				const idx = links.findIndex((l) => l.id === id);
				if (idx >= 0) links.splice(idx, 1);
				return { success: true };
			}
			throw new Error(`Unsupported SQL in run(): ${q}`);
		};

		const statement = {
			bind(...values: unknown[]) {
				args = values;
				return statement;
			},
			async run() {
				return runStatement();
			},
			async first<T>() {
				return firstStatement<T>();
			},
			async all<T>() {
				return { results: allStatement<T>(), success: true };
			}
		};
		return statement;
	};

	return { prepare, _events: events, _links: links } as unknown as FakeD1;
}

describe('artists', () => {
	let db: D1Database;

	beforeEach(() => {
		db = createFakeD1();
	});

	it('starter uden rækker', async () => {
		expect(await listArtists(db)).toEqual([]);
	});

	it('opretter og læser en række med kun navn', async () => {
		const created = await createArtist(db, { name: 'Faustix' });
		expect(created.id).toBeGreaterThan(0);
		expect(created.name).toBe('Faustix');
		expect(created.years).toBeNull();

		const rows = await listArtists(db);
		expect(rows).toHaveLength(1);
		expect(rows[0].name).toBe('Faustix');
	});

	it('gemmer valgfrit årsinterval', async () => {
		const created = await createArtist(db, { name: 'Aqua', years: '24-26' });
		expect(created.years).toBe('24-26');
	});

	it('sorterer efter nyeste tilknyttede events dato (nyeste først)', async () => {
		const fake = createFakeD1();
		const gammel = await createArtist(fake, { name: 'Gammel' });
		const ny = await createArtist(fake, { name: 'Ny' });
		fake._events.push(
			{ id: 1, event_date: '2024-01-01', artist_id: gammel.id },
			{ id: 2, event_date: '2026-01-01', artist_id: ny.id }
		);

		const rows = await listArtists(fake);
		expect(rows.map((r) => r.name)).toEqual(['Ny', 'Gammel']);
	});

	it('bruger artistens nyeste event når flere er tilknyttet', async () => {
		const fake = createFakeD1();
		const a = await createArtist(fake, { name: 'A' });
		const b = await createArtist(fake, { name: 'B' });
		fake._events.push(
			{ id: 1, event_date: '2024-01-01', artist_id: a.id },
			{ id: 2, event_date: '2026-01-01', artist_id: a.id },
			{ id: 3, event_date: '2025-01-01', artist_id: b.id }
		);

		const rows = await listArtists(fake);
		expect(rows.map((r) => r.name)).toEqual(['A', 'B']);
	});

	it('placerer artister uden tilknyttet event nederst', async () => {
		const fake = createFakeD1();
		const udenEvent = await createArtist(fake, { name: 'Uden event' });
		const medEvent = await createArtist(fake, { name: 'Med event' });
		fake._events.push({ id: 1, event_date: '2026-01-01', artist_id: medEvent.id });

		const rows = await listArtists(fake);
		expect(rows.map((r) => r.name)).toEqual(['Med event', 'Uden event']);
	});

	it('placerer event uden dato sammen med dem uden event', async () => {
		const fake = createFakeD1();
		const udenDato = await createArtist(fake, { name: 'Uden dato' });
		const medDato = await createArtist(fake, { name: 'Med dato' });
		fake._events.push(
			{ id: 1, event_date: '2026-01-01', artist_id: medDato.id },
			{ id: 2, event_date: null, artist_id: udenDato.id }
		);

		const rows = await listArtists(fake);
		expect(rows.map((r) => r.name)).toEqual(['Med dato', 'Uden dato']);
	});

	it('kaster ikke når ingen artister har et tilknyttet event', async () => {
		const fake = createFakeD1();
		await createArtist(fake, { name: 'A' });
		await createArtist(fake, { name: 'B' });

		const rows = await listArtists(fake);
		expect(rows.map((r) => r.name)).toEqual(['B', 'A']);
	});

	it('sletter en række', async () => {
		const created = await createArtist(db, { name: 'Slet mig' });
		await deleteArtist(db, created.id);
		expect(await listArtists(db)).toEqual([]);
	});

	it('starter uden details', async () => {
		const created = await createArtist(db, { name: 'Faustix' });
		expect(created.details).toBeNull();
	});

	it('gemmer og læser details', async () => {
		const created = await createArtist(db, { name: 'Faustix' });
		const updated = await updateArtistDetails(db, created.id, 'Lysdesigner fra Aarhus.');
		expect(updated?.details).toBe('Lysdesigner fra Aarhus.');

		const fetched = await getArtist(db, created.id);
		expect(fetched?.details).toBe('Lysdesigner fra Aarhus.');
	});

	it('rydder details når teksten er tom', async () => {
		const created = await createArtist(db, { name: 'Faustix' });
		await updateArtistDetails(db, created.id, 'Noget tekst');
		const cleared = await updateArtistDetails(db, created.id, null);
		expect(cleared?.details).toBeNull();
	});

	it('returnerer null når details opdateres på en ukendt række', async () => {
		expect(await updateArtistDetails(db, 999, 'tekst')).toBeNull();
	});

	it('tilføjer og lister links for en artist', async () => {
		const created = await createArtist(db, { name: 'Faustix' });
		await addArtistLink(db, {
			artistId: created.id,
			label: 'Website',
			url: 'https://faustix.dk'
		});
		await addArtistLink(db, {
			artistId: created.id,
			label: 'Spotify',
			url: 'https://open.spotify.com/artist/x'
		});

		const links = await listArtistLinks(db, created.id);
		expect(links.map((l) => l.label)).toEqual(['Website', 'Spotify']);
	});

	it('holder links adskilt pr. artist', async () => {
		const a = await createArtist(db, { name: 'A' });
		const b = await createArtist(db, { name: 'B' });
		await addArtistLink(db, { artistId: a.id, label: 'A-site', url: 'https://a.dk' });
		await addArtistLink(db, { artistId: b.id, label: 'B-site', url: 'https://b.dk' });

		expect((await listArtistLinks(db, a.id)).map((l) => l.label)).toEqual(['A-site']);
		expect((await listArtistLinks(db, b.id)).map((l) => l.label)).toEqual(['B-site']);
	});

	it('fjerner et link', async () => {
		const created = await createArtist(db, { name: 'Faustix' });
		const link = await addArtistLink(db, {
			artistId: created.id,
			label: 'Website',
			url: 'https://faustix.dk'
		});

		expect(await getArtistLink(db, link.id)).not.toBeNull();
		await removeArtistLink(db, link.id);
		expect(await getArtistLink(db, link.id)).toBeNull();
		expect(await listArtistLinks(db, created.id)).toEqual([]);
	});

	it('returnerer null når et ukendt link fjernes', async () => {
		expect(await removeArtistLink(db, 999)).toBeNull();
	});
});
