import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { load, actions } from './+page.server';

/**
 * Minimal in-memory D1-stub der understøtter de SQL-forespørgsler
 * artist-loadet bruger (listArtists + createArtist)
 * samt de event-opslag actions bruger.
 */
function createFakeD1() {
	let nextId = 1;
	const rows: {
		id: number;
		name: string;
		years: string | null;
		details: string | null;
		image_key?: string | null;
		image_content_type?: string | null;
		created_at: number;
	}[] = [];
	let nextLinkId = 1;
	const links: {
		id: number;
		artist_id: number;
		label: string;
		url: string;
		sort_order: number;
		created_at: number;
	}[] = [];
	const events: {
		id: number;
		slug: string;
		name: string;
		event_date: string | null;
		location: string | null;
		description: string | null;
		details: string | null;
		link: string | null;
		artist_id: number | null;
		created_at: number;
	}[] = [];
	const companies: {
		id: number;
		name: string;
		link: string | null;
		created_at: number;
	}[] = [];
	const images: {
		id: number;
		event_id: number;
		r2_key: string;
		caption: string | null;
		content_type: string;
		sort_order: number;
		is_cover: number;
		created_at: number;
	}[] = [];

	const prepare = (sql: string) => {
		let args: unknown[] = [];
		const normalized = () => sql.replace(/\s+/g, ' ').trim();

		const statement = {
			bind(...values: unknown[]) {
				args = values;
				return statement;
			},
			async first<T>() {
				const q = normalized();
				if (q.startsWith('INSERT INTO artists')) {
					const [name, years] = args as [string, string | null];
					const row = {
						id: nextId++,
						name,
						years,
						details: null,
						image_key: null,
						image_content_type: null,
						created_at: 0
					};
					rows.push(row);
					return row as T;
				}
				if (q.startsWith('UPDATE artists SET image_key = ?1, image_content_type = ?2')) {
					const [imageKey, imageContentType, id] = args as [string | null, string | null, number];
					const row = rows.find((r) => r.id === id);
					if (!row) return null;
					row.image_key = imageKey;
					row.image_content_type = imageContentType;
					return row as T;
				}
				if (q.startsWith('UPDATE artists SET details')) {
					const [details, id] = args as [string | null, number];
					const row = rows.find((r) => r.id === id);
					if (!row) return null;
					row.details = details;
					return row as T;
				}
				if (q.startsWith('UPDATE artists SET')) {
					const [name, years, id] = args as [string, string | null, number];
					const row = rows.find((r) => r.id === id);
					if (!row) return null;
					row.name = name;
					row.years = years;
					return row as T;
				}
				if (q.startsWith('SELECT id, name, years, details, image_key, image_content_type, created_at FROM artists WHERE id')) {
					const [id] = args as [number];
					return (rows.find((r) => r.id === id) ?? null) as T | null;
				}
				if (q.startsWith('INSERT INTO artist_links')) {
					const [artist_id, label, url, sort_order] = args as [number, string, string, number];
					const row = { id: nextLinkId++, artist_id, label, url, sort_order, created_at: 0 };
					links.push(row);
					return row as T;
				}
				if (q.startsWith('SELECT id, artist_id, label, url, sort_order, created_at FROM artist_links WHERE id')) {
					const [id] = args as [number];
					return (links.find((l) => l.id === id) ?? null) as T | null;
				}
				if (q.startsWith('SELECT id, slug, name, event_date, location, description, details, link, artist_id, created_at FROM events WHERE id')) {
					const [id] = args as [number];
					return (events.find((e) => e.id === id) ?? null) as T | null;
				}
				if (q.startsWith('SELECT id, name, link, created_at FROM companies WHERE id')) {
					const [id] = args as [number];
					return (companies.find((c) => c.id === id) ?? null) as T | null;
				}
				if (q.startsWith('INSERT INTO companies')) {
					const [name, link] = args as [string, string | null];
					const row = { id: nextId++, name, link, created_at: 0 };
					companies.push(row);
					return row as T;
				}
				if (q.startsWith('UPDATE companies SET')) {
					const [name, link, id] = args as [string, string | null, number];
					const row = companies.find((c) => c.id === id);
					if (!row) return null;
					row.name = name;
					row.link = link;
					return row as T;
				}
				throw new Error(`Unsupported SQL in first(): ${q}`);
			},
			async all<T>() {
				const q = normalized();
				if (
					q.startsWith(
						'SELECT artists.id, artists.name, artists.years, artists.details, artists.image_key, artists.image_content_type'
					)
				) {
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
					return { results: sorted as T[], success: true };
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
					return { results: filtered as T[], success: true };
					}
					if (q.startsWith('SELECT id, slug, name, event_date, location, description, details, link, artist_id, created_at FROM events ORDER BY')) {
					return { results: events as T[], success: true };
					}
					if (
						q.startsWith(
							'SELECT id, event_id, r2_key, caption, content_type, sort_order, is_cover, created_at FROM event_images WHERE event_id'
						)
					) {
						const [eventId] = args as [number];
						return {
							results: images.filter((i) => i.event_id === eventId) as T[],
							success: true
						};
					}
				if (q.startsWith('SELECT id, name, link, created_at FROM companies ORDER BY')) {
					const sorted = [...companies].sort((a, b) =>
						a.name.toLowerCase().localeCompare(b.name.toLowerCase())
					);
					return { results: sorted as T[], success: true };
				}
				throw new Error(`Unsupported SQL in all(): ${q}`);
			},
			async run<T>() {
				const q = normalized();
				if (q.startsWith('DELETE FROM artists WHERE id')) {
					const [id] = args as [number];
					const idx = rows.findIndex((r) => r.id === id);
					if (idx >= 0) rows.splice(idx, 1);
					for (let i = links.length - 1; i >= 0; i--) {
						if (links[i].artist_id === id) links.splice(i, 1);
					}
					return { success: true } as D1Result<T>;
				}
				if (q.startsWith('DELETE FROM artist_links WHERE id')) {
					const [id] = args as [number];
					const idx = links.findIndex((l) => l.id === id);
					if (idx >= 0) links.splice(idx, 1);
					return { success: true } as D1Result<T>;
				}
				if (q.startsWith('DELETE FROM companies WHERE id')) {
					const [id] = args as [number];
					const idx = companies.findIndex((c) => c.id === id);
					if (idx >= 0) companies.splice(idx, 1);
					return { success: true } as D1Result<T>;
				}
				throw new Error(`Unsupported SQL in run(): ${q}`);
			}
		};
		return statement;
	};

	return {
		prepare,
		_rows: rows,
		_links: links,
		_events: events,
		_companies: companies,
		_seedEvent: (event: {
			id: number;
			name: string;
			event_date?: string | null;
			artist_id?: number | null;
		}) => {
			events.push({
				id: event.id,
				slug: event.name.toLowerCase(),
				name: event.name,
				event_date: event.event_date ?? null,
				location: null,
				description: null,
				details: null,
				link: null,
				artist_id: event.artist_id ?? null,
				created_at: 0
			});
		},
		_seedImage: (image: {
			id: number;
			event_id: number;
			r2_key: string;
			caption?: string | null;
		}) => {
			images.push({
				id: image.id,
				event_id: image.event_id,
				r2_key: image.r2_key,
				caption: image.caption ?? null,
				content_type: 'image/jpeg',
				sort_order: 0,
				is_cover: 0,
				created_at: 0
			});
		},
		_images: images
		};
		}

function makePlatform(db: unknown, r2PublicUrl?: string) {
	return { env: { DB: db, R2_PUBLIC_URL: r2PublicUrl } } as App.Platform;
}

type ActionResult = { status?: number; error?: string; success?: boolean };

async function runCreateArtist(form: FormData, platform: unknown, owner = true): Promise<ActionResult> {
	const action = actions.createArtist;
	const result = await action({
		request: new Request('http://localhost/?/createArtist', { method: 'POST', body: form }),
		platform,
		locals: { owner }
	} as never);
	return result as unknown as ActionResult;
}

async function runUpdateArtist(form: FormData, platform: unknown, owner = true): Promise<ActionResult> {
	const action = actions.updateArtist;
	const result = await action({
		request: new Request('http://localhost/?/updateArtist', { method: 'POST', body: form }),
		platform,
		locals: { owner }
	} as never);
	return result as unknown as ActionResult;
}

async function runDeleteArtist(form: FormData, platform: unknown, owner = true): Promise<ActionResult> {
	const action = actions.deleteArtist;
	const result = await action({
		request: new Request('http://localhost/?/deleteArtist', { method: 'POST', body: form }),
		platform,
		locals: { owner }
	} as never);
	return result as unknown as ActionResult;
}

type LoadResult = {
	artists: {
		id: number;
		name: string;
		years: string | null;
		details: string | null;
		latestEventId: number | null;
		links: { id: number; label: string; url: string }[];
		events: {
			id: number;
			name: string;
			event_date: string | null;
			artist_id: number | null;
			artistName: string | null;
			images: { id: number; caption: string | null; url: string; isCover: boolean }[];
		}[];
	}[];
	companies: { id: number; name: string; link: string | null }[];
	logoUrl: string;
	heroBackgroundUrl: string;
	};

async function runLoad(platform: unknown): Promise<LoadResult> {
	return (await load({ platform } as never)) as unknown as LoadResult;
}

describe('home load', () => {
	let errorSpy: ReturnType<typeof vi.spyOn>;

	beforeEach(() => {
		errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
	});

	afterEach(() => {
		errorSpy.mockRestore();
	});

	it('returnerer tom liste når databasen ikke er konfigureret', async () => {
		const data = await runLoad(undefined);
		expect(data.artists).toEqual([]);
	});

	it('returnerer tom liste når platform.env mangler (ingen 500)', async () => {
		const data = await runLoad({});
		expect(data.artists).toEqual([]);
	});

	it('returnerer logo-URL via /images-ruten som standard', async () => {
		const db = createFakeD1();
		const data = await runLoad(makePlatform(db));
		expect(data.logoUrl).toBe('/images/logo/logoudentegn.png');
	});

	it('bruger R2_PUBLIC_URL til logoet når den er sat', async () => {
		const db = createFakeD1();
		const data = await runLoad(makePlatform(db, 'https://cdn.example.com'));
		expect(data.logoUrl).toBe('https://cdn.example.com/logo/logoudentegn.png');
	});

	it('giver logo-URL også når databasen ikke er konfigureret', async () => {
		const data = await runLoad(undefined);
		expect(data.logoUrl).toBe('/images/logo/logoudentegn.png');
	});

	it('returnerer hero-baggrund via /images-ruten som standard', async () => {
		const db = createFakeD1();
		const data = await runLoad(makePlatform(db));
		expect(data.heroBackgroundUrl).toBe('/images/Lukas/HomeBackground.jpg');
	});

	it('bruger R2_PUBLIC_URL til hero-baggrunden når den er sat', async () => {
		const db = createFakeD1();
		const data = await runLoad(makePlatform(db, 'https://cdn.example.com'));
		expect(data.heroBackgroundUrl).toBe('https://cdn.example.com/Lukas/HomeBackground.jpg');
	});

	it('giver hero-baggrund også når databasen ikke er konfigureret', async () => {
		const data = await runLoad(undefined);
		expect(data.heroBackgroundUrl).toBe('/images/Lukas/HomeBackground.jpg');
	});

	it('kaster ikke når databasen fejler (fx manglende tabeller)', async () => {
		const brokenDb = {
			prepare() {
				throw new Error('D1_ERROR: no such table: artists');
			}
		};
		const data = await runLoad(makePlatform(brokenDb));
		expect(data.artists).toEqual([]);
		expect(errorSpy).toHaveBeenCalled();
	});

	it('kortlægger artist-rækker', async () => {
		const db = createFakeD1();
		db._rows.push({
			id: 1,
			name: 'Faustix',
			years: '22-24',
			details: null,
			created_at: 0
		});
		const data = await runLoad(makePlatform(db));
		expect(data.artists).toHaveLength(1);
		expect(data.artists[0].name).toBe('Faustix');
	});

	it('peger på artistens nyeste event efter dato', async () => {
		const db = createFakeD1();
		db._rows.push({
			id: 1,
			name: 'Faustix',
			years: null,
			details: null,
			created_at: 0
		});
		// listEvents sorterer nyeste dato først.
		db._seedEvent({ id: 9, name: 'Nyeste', event_date: '2026-06-01', artist_id: 1 });
		db._seedEvent({ id: 8, name: 'Ældre', event_date: '2024-06-01', artist_id: 1 });

		const data = await runLoad(makePlatform(db));
		expect(data.artists[0].latestEventId).toBe(9);
	});

	it('giver latestEventId = null når artisten ikke har nogen event', async () => {
		const db = createFakeD1();
		db._rows.push({
			id: 1,
			name: 'Faustix',
			years: null,
			details: null,
			created_at: 0
		});
		const data = await runLoad(makePlatform(db));
		expect(data.artists[0].latestEventId).toBeNull();
	});

	it('giver en tom events-liste når artisten ikke har nogen events', async () => {
		const db = createFakeD1();
		db._rows.push({
			id: 1,
			name: 'Faustix',
			years: null,
			details: null,
			created_at: 0
		});
		const data = await runLoad(makePlatform(db));
		expect(data.artists[0].events).toEqual([]);
	});

	it('lister alle artistens events med billeder og navn', async () => {
		const db = createFakeD1();
		db._rows.push({
			id: 1,
			name: 'Faustix',
			years: null,
			details: null,
			created_at: 0
		});
		db._seedEvent({ id: 9, name: 'Nyeste', event_date: '2026-06-01', artist_id: 1 });
		db._seedEvent({ id: 8, name: 'Ældre', event_date: '2024-06-01', artist_id: 1 });
		db._seedImage({ id: 10, event_id: 9, r2_key: 'events/nyeste/a.jpg', caption: 'Scene' });

		const data = await runLoad(makePlatform(db, 'https://cdn.example.com'));
		expect(data.artists[0].events).toHaveLength(2);
		expect(data.artists[0].events.map((e) => e.id)).toEqual([9, 8]);
		expect(data.artists[0].events[0].artistName).toBe('Faustix');
		expect(data.artists[0].events[0].images).toEqual([
			{
				id: 10,
				caption: 'Scene',
				isCover: false,
				url: 'https://cdn.example.com/events/nyeste/a.jpg'
			}
		]);
	});

	it('udelader andre artisters events fra listen', async () => {
		const db = createFakeD1();
		db._rows.push(
			{ id: 1, name: 'Faustix', years: null, details: null, created_at: 0 },
			{ id: 2, name: 'Aqua', years: null, details: null, created_at: 0 }
		);
		db._seedEvent({ id: 9, name: 'Faustix-fest', event_date: '2026-06-01', artist_id: 1 });
		db._seedEvent({ id: 8, name: 'Aqua-fest', event_date: '2026-01-01', artist_id: 2 });

		const data = await runLoad(makePlatform(db));
		const faustix = data.artists.find((a) => a.name === 'Faustix');
		const aqua = data.artists.find((a) => a.name === 'Aqua');
		expect(faustix?.events.map((e) => e.id)).toEqual([9]);
		expect(aqua?.events.map((e) => e.id)).toEqual([8]);
	});
	});

describe('createArtist action', () => {
	let errorSpy: ReturnType<typeof vi.spyOn>;

	beforeEach(() => {
		errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
	});

	afterEach(() => {
		errorSpy.mockRestore();
	});

	it('afviser en ikke-owner', async () => {
		const form = new FormData();
		form.set('name', 'Faustix');
		const res = await runCreateArtist(form, makePlatform(createFakeD1()), false);
		expect(res.status).toBe(403);
	});

	it('kræver et navn', async () => {
		const form = new FormData();
		const res = await runCreateArtist(form, makePlatform(createFakeD1()));
		expect(res.status).toBe(400);
	});

	it('afviser et for langt navn', async () => {
		const form = new FormData();
		form.set('name', 'a'.repeat(201));
		const res = await runCreateArtist(form, makePlatform(createFakeD1()));
		expect(res.status).toBe(400);
	});

	it('fejler når databasen ikke er konfigureret', async () => {
		const form = new FormData();
		form.set('name', 'Faustix');
		const res = await runCreateArtist(form, makePlatform(undefined));
		expect(res.status).toBe(500);
	});

	it('opretter en række med kun navn', async () => {
		const db = createFakeD1();
		const form = new FormData();
		form.set('name', 'Faustix');
		const res = await runCreateArtist(form, makePlatform(db));
		expect(res.success).toBe(true);
		expect(db._rows).toHaveLength(1);
		expect(db._rows[0].name).toBe('Faustix');
		expect(db._rows[0].years).toBeNull();
	});

	it('gemmer det valgfrie år', async () => {
		const db = createFakeD1();
		const form = new FormData();
		form.set('name', 'Aqua');
		form.set('years', '24-26');
		const res = await runCreateArtist(form, makePlatform(db));
		expect(res.success).toBe(true);
		expect(db._rows[0].years).toBe('24-26');
	});

	it('behandler et tomt år som null', async () => {
		const db = createFakeD1();
		const form = new FormData();
		form.set('name', 'Katinka');
		form.set('years', '   ');
		const res = await runCreateArtist(form, makePlatform(db));
		expect(res.success).toBe(true);
		expect(db._rows[0].years).toBeNull();
	});
	});

describe('deleteArtist action', () => {
	let errorSpy: ReturnType<typeof vi.spyOn>;

	beforeEach(() => {
		errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
	});

	afterEach(() => {
		errorSpy.mockRestore();
	});

	it('afviser en ikke-owner', async () => {
		const form = new FormData();
		form.set('id', '1');
		const res = await runDeleteArtist(form, makePlatform(createFakeD1()), false);
		expect(res.status).toBe(403);
	});

	it('afviser et ugyldigt id', async () => {
		const form = new FormData();
		form.set('id', 'abc');
		const res = await runDeleteArtist(form, makePlatform(createFakeD1()));
		expect(res.status).toBe(400);
	});

	it('fejler når databasen ikke er konfigureret', async () => {
		const form = new FormData();
		form.set('id', '1');
		const res = await runDeleteArtist(form, makePlatform(undefined));
		expect(res.status).toBe(500);
	});

	it('sletter en artist', async () => {
		const db = createFakeD1();
		const create = new FormData();
		create.set('name', 'Faustix');
		await runCreateArtist(create, makePlatform(db));
		expect(db._rows).toHaveLength(1);

		const form = new FormData();
		form.set('id', String(db._rows[0].id));
		const res = await runDeleteArtist(form, makePlatform(db));
		expect(res.success).toBe(true);
		expect(db._rows).toHaveLength(0);
	});
});

describe('updateArtist action', () => {
	let errorSpy: ReturnType<typeof vi.spyOn>;

	beforeEach(() => {
		errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
	});

	afterEach(() => {
		errorSpy.mockRestore();
	});

	async function seedArtist(db: ReturnType<typeof createFakeD1>) {
		const create = new FormData();
		create.set('name', 'Faustix');
		create.set('years', '22-24');
		await runCreateArtist(create, makePlatform(db));
		return db._rows[0].id;
	}

	it('afviser en ikke-owner', async () => {
		const form = new FormData();
		form.set('id', '1');
		form.set('name', 'Faustix');
		const res = await runUpdateArtist(form, makePlatform(createFakeD1()), false);
		expect(res.status).toBe(403);
	});

	it('kræver et navn', async () => {
		const db = createFakeD1();
		const id = await seedArtist(db);
		const form = new FormData();
		form.set('id', String(id));
		const res = await runUpdateArtist(form, makePlatform(db));
		expect(res.status).toBe(400);
	});

	it('afviser et ugyldigt id', async () => {
		const form = new FormData();
		form.set('id', 'abc');
		form.set('name', 'Faustix');
		const res = await runUpdateArtist(form, makePlatform(createFakeD1()));
		expect(res.status).toBe(400);
	});

	it('returnerer 404 for en post der ikke findes', async () => {
		const form = new FormData();
		form.set('id', '999');
		form.set('name', 'Faustix');
		const res = await runUpdateArtist(form, makePlatform(createFakeD1()));
		expect(res.status).toBe(404);
	});

	it('opdaterer navn og år', async () => {
		const db = createFakeD1();
		const id = await seedArtist(db);
		const form = new FormData();
		form.set('id', String(id));
		form.set('name', 'Aqua');
		form.set('years', '24-26');
		const res = await runUpdateArtist(form, makePlatform(db));
		expect(res.success).toBe(true);
		expect(db._rows[0].name).toBe('Aqua');
		expect(db._rows[0].years).toBe('24-26');
		});
		});

		async function runCreateCompany(form: FormData, platform: unknown, owner = true): Promise<ActionResult> {
		const action = actions.createCompany;
		const result = await action({
		request: new Request('http://localhost/?/createCompany', { method: 'POST', body: form }),
		platform,
		locals: { owner }
		} as never);
		return result as unknown as ActionResult;
		}

		async function runUpdateCompany(form: FormData, platform: unknown, owner = true): Promise<ActionResult> {
		const action = actions.updateCompany;
		const result = await action({
		request: new Request('http://localhost/?/updateCompany', { method: 'POST', body: form }),
		platform,
		locals: { owner }
		} as never);
		return result as unknown as ActionResult;
		}

		async function runDeleteCompany(form: FormData, platform: unknown, owner = true): Promise<ActionResult> {
		const action = actions.deleteCompany;
		const result = await action({
		request: new Request('http://localhost/?/deleteCompany', { method: 'POST', body: form }),
		platform,
		locals: { owner }
		} as never);
		return result as unknown as ActionResult;
		}

		describe('companies load', () => {
		let errorSpy: ReturnType<typeof vi.spyOn>;

		beforeEach(() => {
		errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
		});

		afterEach(() => {
		errorSpy.mockRestore();
		});

		it('returnerer tom liste når databasen ikke er konfigureret', async () => {
		const data = await runLoad(undefined);
		expect(data.companies).toEqual([]);
		});

		it('kaster ikke når companies-tabellen mangler', async () => {
		const brokenDb = {
			prepare() {
				throw new Error('D1_ERROR: no such table: companies');
			}
		};
		const data = await runLoad(makePlatform(brokenDb));
		expect(data.companies).toEqual([]);
		expect(errorSpy).toHaveBeenCalled();
		});

		it('kortlægger company-rækker', async () => {
		const db = createFakeD1();
		db._companies.push({ id: 1, name: 'Profox', link: 'https://profox.dk', created_at: 0 });
		const data = await runLoad(makePlatform(db));
		expect(data.companies).toHaveLength(1);
		expect(data.companies[0].name).toBe('Profox');
		expect(data.companies[0].link).toBe('https://profox.dk');
		});
		});

		describe('createCompany action', () => {
		let errorSpy: ReturnType<typeof vi.spyOn>;

		beforeEach(() => {
		errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
		});

		afterEach(() => {
		errorSpy.mockRestore();
		});

		it('afviser en ikke-owner', async () => {
		const form = new FormData();
		form.set('name', 'Profox');
		const res = await runCreateCompany(form, makePlatform(createFakeD1()), false);
		expect(res.status).toBe(403);
		});

		it('kræver et navn', async () => {
		const form = new FormData();
		const res = await runCreateCompany(form, makePlatform(createFakeD1()));
		expect(res.status).toBe(400);
		});

		it('fejler når databasen ikke er konfigureret', async () => {
		const form = new FormData();
		form.set('name', 'Profox');
		const res = await runCreateCompany(form, makePlatform(undefined));
		expect(res.status).toBe(500);
		});

		it('opretter en virksomhed med et link', async () => {
		const db = createFakeD1();
		const form = new FormData();
		form.set('name', 'Profox');
		form.set('link', 'https://profox.dk');
		const res = await runCreateCompany(form, makePlatform(db));
		expect(res.success).toBe(true);
		expect(db._companies).toHaveLength(1);
		expect(db._companies[0].name).toBe('Profox');
		expect(db._companies[0].link).toBe('https://profox.dk');
		});

		it('behandler et tomt link som null', async () => {
		const db = createFakeD1();
		const form = new FormData();
		form.set('name', 'Profox');
		form.set('link', '   ');
		const res = await runCreateCompany(form, makePlatform(db));
		expect(res.success).toBe(true);
		expect(db._companies[0].link).toBeNull();
		});

		it('afviser et ugyldigt link', async () => {
		const db = createFakeD1();
		const form = new FormData();
		form.set('name', 'Profox');
		form.set('link', 'ikke-en-url');
		const res = await runCreateCompany(form, makePlatform(db));
		expect(res.status).toBe(400);
		expect(db._companies).toHaveLength(0);
		});

		it('afviser et link uden http(s)-skema', async () => {
		const db = createFakeD1();
		const form = new FormData();
		form.set('name', 'Profox');
		form.set('link', 'javascript:alert(1)');
		const res = await runCreateCompany(form, makePlatform(db));
		expect(res.status).toBe(400);
		expect(db._companies).toHaveLength(0);
		});
		});

		describe('updateCompany action', () => {
		let errorSpy: ReturnType<typeof vi.spyOn>;

		beforeEach(() => {
		errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
		});

		afterEach(() => {
		errorSpy.mockRestore();
		});

		async function seedCompany(db: ReturnType<typeof createFakeD1>) {
		const create = new FormData();
		create.set('name', 'Profox');
		await runCreateCompany(create, makePlatform(db));
		return db._companies[0].id;
		}

		it('afviser en ikke-owner', async () => {
		const form = new FormData();
		form.set('id', '1');
		form.set('name', 'Profox');
		const res = await runUpdateCompany(form, makePlatform(createFakeD1()), false);
		expect(res.status).toBe(403);
		});

		it('afviser et ugyldigt id', async () => {
		const form = new FormData();
		form.set('id', 'abc');
		form.set('name', 'Profox');
		const res = await runUpdateCompany(form, makePlatform(createFakeD1()));
		expect(res.status).toBe(400);
		});

		it('returnerer 404 for en post der ikke findes', async () => {
		const form = new FormData();
		form.set('id', '999');
		form.set('name', 'Profox');
		const res = await runUpdateCompany(form, makePlatform(createFakeD1()));
		expect(res.status).toBe(404);
		});

		it('sætter et link på en virksomhed', async () => {
		const db = createFakeD1();
		const id = await seedCompany(db);
		const form = new FormData();
		form.set('id', String(id));
		form.set('name', 'Profox');
		form.set('link', 'https://profox.dk');
		const res = await runUpdateCompany(form, makePlatform(db));
		expect(res.success).toBe(true);
		expect(db._companies[0].link).toBe('https://profox.dk');
		});

		it('fjerner linket når feltet er tomt', async () => {
		const db = createFakeD1();
		const id = await seedCompany(db);

		const withLink = new FormData();
		withLink.set('id', String(id));
		withLink.set('name', 'Profox');
		withLink.set('link', 'https://profox.dk');
		await runUpdateCompany(withLink, makePlatform(db));
		expect(db._companies[0].link).toBe('https://profox.dk');

		const cleared = new FormData();
		cleared.set('id', String(id));
		cleared.set('name', 'Profox');
		cleared.set('link', '');
		const res = await runUpdateCompany(cleared, makePlatform(db));
		expect(res.success).toBe(true);
		expect(db._companies[0].link).toBeNull();
		});

		it('afviser et ugyldigt link', async () => {
		const db = createFakeD1();
		const id = await seedCompany(db);
		const form = new FormData();
		form.set('id', String(id));
		form.set('name', 'Profox');
		form.set('link', 'ftp://profox.dk');
		const res = await runUpdateCompany(form, makePlatform(db));
		expect(res.status).toBe(400);
		});
		});

		describe('deleteCompany action', () => {
		let errorSpy: ReturnType<typeof vi.spyOn>;

		beforeEach(() => {
		errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
		});

		afterEach(() => {
		errorSpy.mockRestore();
		});

		it('afviser en ikke-owner', async () => {
		const form = new FormData();
		form.set('id', '1');
		const res = await runDeleteCompany(form, makePlatform(createFakeD1()), false);
		expect(res.status).toBe(403);
		});

		it('afviser et ugyldigt id', async () => {
		const form = new FormData();
		form.set('id', 'abc');
		const res = await runDeleteCompany(form, makePlatform(createFakeD1()));
		expect(res.status).toBe(400);
		});

		it('sletter en virksomhed', async () => {
		const db = createFakeD1();
		const create = new FormData();
		create.set('name', 'Profox');
		await runCreateCompany(create, makePlatform(db));
		expect(db._companies).toHaveLength(1);

		const form = new FormData();
		form.set('id', String(db._companies[0].id));
		const res = await runDeleteCompany(form, makePlatform(db));
		expect(res.success).toBe(true);
		expect(db._companies).toHaveLength(0);
		});
		});

		async function runUpdateArtistDetails(form: FormData, platform: unknown, owner = true): Promise<ActionResult> {
		const action = actions.updateArtistDetails;
		const result = await action({
			request: new Request('http://localhost/?/updateArtistDetails', { method: 'POST', body: form }),
			platform,
			locals: { owner }
		} as never);
		return result as unknown as ActionResult;
		}

		async function runAddArtistLink(form: FormData, platform: unknown, owner = true): Promise<ActionResult> {
		const action = actions.addArtistLink;
		const result = await action({
			request: new Request('http://localhost/?/addArtistLink', { method: 'POST', body: form }),
			platform,
			locals: { owner }
		} as never);
		return result as unknown as ActionResult;
		}

		async function runRemoveArtistLink(form: FormData, platform: unknown, owner = true): Promise<ActionResult> {
		const action = actions.removeArtistLink;
		const result = await action({
			request: new Request('http://localhost/?/removeArtistLink', { method: 'POST', body: form }),
			platform,
			locals: { owner }
		} as never);
		return result as unknown as ActionResult;
		}

		describe('artist links load', () => {
		let errorSpy: ReturnType<typeof vi.spyOn>;

		beforeEach(() => {
			errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
		});

		afterEach(() => {
			errorSpy.mockRestore();
		});

		it('kortlægger links pr. artist', async () => {
			const db = createFakeD1();
			const create = new FormData();
			create.set('name', 'Faustix');
			await runCreateArtist(create, makePlatform(db));
			const id = db._rows[0].id;
			const link = new FormData();
			link.set('id', String(id));
			link.set('label', 'Website');
			link.set('url', 'https://faustix.dk');
			await runAddArtistLink(link, makePlatform(db));

			const data = await runLoad(makePlatform(db));
			expect(data.artists[0].links).toEqual([
				{ id: 1, label: 'Website', url: 'https://faustix.dk' }
			]);
		});

		it('kaster ikke når artist_links-tabellen mangler', async () => {
			const db = createFakeD1();
			db._rows.push({
				id: 1,
				name: 'Faustix',
				years: null,
				details: null,
				created_at: 0
			});
			const original = db.prepare.bind(db);
			// Simuler at kun artist_links-opslaget fejler.
			(db as unknown as { prepare: typeof db.prepare }).prepare = ((sql: string) => {
				if (sql.includes('artist_links')) throw new Error('D1_ERROR: no such table: artist_links');
				return original(sql);
			}) as typeof db.prepare;

			const data = await runLoad(makePlatform(db));
			expect(data.artists[0].links).toEqual([]);
			expect(errorSpy).toHaveBeenCalled();
		});
		});

		describe('updateArtistDetails action', () => {
		let errorSpy: ReturnType<typeof vi.spyOn>;

		beforeEach(() => {
			errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
		});

		afterEach(() => {
			errorSpy.mockRestore();
		});

		async function seedArtist(db: ReturnType<typeof createFakeD1>) {
			const create = new FormData();
			create.set('name', 'Faustix');
			await runCreateArtist(create, makePlatform(db));
			return db._rows[0].id;
		}

		it('afviser en ikke-owner', async () => {
			const form = new FormData();
			form.set('id', '1');
			form.set('details', 'tekst');
			const res = await runUpdateArtistDetails(form, makePlatform(createFakeD1()), false);
			expect(res.status).toBe(403);
		});

		it('afviser et ugyldigt id', async () => {
			const form = new FormData();
			form.set('id', 'abc');
			form.set('details', 'tekst');
			const res = await runUpdateArtistDetails(form, makePlatform(createFakeD1()));
			expect(res.status).toBe(400);
		});

		it('returnerer 404 for en post der ikke findes', async () => {
			const form = new FormData();
			form.set('id', '999');
			form.set('details', 'tekst');
			const res = await runUpdateArtistDetails(form, makePlatform(createFakeD1()));
			expect(res.status).toBe(404);
		});

		it('gemmer teksten', async () => {
			const db = createFakeD1();
			const id = await seedArtist(db);
			const form = new FormData();
			form.set('id', String(id));
			form.set('details', 'Lysdesigner fra Aarhus.');
			const res = await runUpdateArtistDetails(form, makePlatform(db));
			expect(res.success).toBe(true);
			expect(db._rows[0].details).toBe('Lysdesigner fra Aarhus.');
		});

		it('behandler en tom tekst som null', async () => {
			const db = createFakeD1();
			const id = await seedArtist(db);
			const form = new FormData();
			form.set('id', String(id));
			form.set('details', '   ');
			const res = await runUpdateArtistDetails(form, makePlatform(db));
			expect(res.success).toBe(true);
			expect(db._rows[0].details).toBeNull();
		});

		it('afviser en for lang tekst', async () => {
			const db = createFakeD1();
			const id = await seedArtist(db);
			const form = new FormData();
			form.set('id', String(id));
			form.set('details', 'x'.repeat(5001));
			const res = await runUpdateArtistDetails(form, makePlatform(db));
			expect(res.status).toBe(400);
		});

		it('fejler når databasen ikke er konfigureret', async () => {
			const form = new FormData();
			form.set('id', '1');
			form.set('details', 'tekst');
			const res = await runUpdateArtistDetails(form, makePlatform(undefined));
			expect(res.status).toBe(500);
		});
		});

		describe('addArtistLink action', () => {
		let errorSpy: ReturnType<typeof vi.spyOn>;

		beforeEach(() => {
			errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
		});

		afterEach(() => {
			errorSpy.mockRestore();
		});

		async function seedArtist(db: ReturnType<typeof createFakeD1>) {
			const create = new FormData();
			create.set('name', 'Faustix');
			await runCreateArtist(create, makePlatform(db));
			return db._rows[0].id;
		}

		it('afviser en ikke-owner', async () => {
			const form = new FormData();
			form.set('id', '1');
			form.set('label', 'Website');
			form.set('url', 'https://faustix.dk');
			const res = await runAddArtistLink(form, makePlatform(createFakeD1()), false);
			expect(res.status).toBe(403);
		});

		it('afviser et ugyldigt id', async () => {
			const form = new FormData();
			form.set('id', 'abc');
			form.set('label', 'Website');
			form.set('url', 'https://faustix.dk');
			const res = await runAddArtistLink(form, makePlatform(createFakeD1()));
			expect(res.status).toBe(400);
		});

		it('kræver en linktekst', async () => {
			const db = createFakeD1();
			await seedArtist(db);
			const form = new FormData();
			form.set('id', String(db._rows[0].id));
			form.set('url', 'https://faustix.dk');
			const res = await runAddArtistLink(form, makePlatform(db));
			expect(res.status).toBe(400);
		});

		it('kræver en URL', async () => {
			const db = createFakeD1();
			await seedArtist(db);
			const form = new FormData();
			form.set('id', String(db._rows[0].id));
			form.set('label', 'Website');
			const res = await runAddArtistLink(form, makePlatform(db));
			expect(res.status).toBe(400);
		});

		it('afviser en ugyldig URL', async () => {
			const db = createFakeD1();
			await seedArtist(db);
			const form = new FormData();
			form.set('id', String(db._rows[0].id));
			form.set('label', 'Website');
			form.set('url', 'javascript:alert(1)');
			const res = await runAddArtistLink(form, makePlatform(db));
			expect(res.status).toBe(400);
			expect(db._links).toHaveLength(0);
		});

		it('returnerer 404 for en artist der ikke findes', async () => {
			const form = new FormData();
			form.set('id', '999');
			form.set('label', 'Website');
			form.set('url', 'https://faustix.dk');
			const res = await runAddArtistLink(form, makePlatform(createFakeD1()));
			expect(res.status).toBe(404);
		});

		it('tilføjer et gyldigt link', async () => {
			const db = createFakeD1();
			await seedArtist(db);
			const form = new FormData();
			form.set('id', String(db._rows[0].id));
			form.set('label', 'Website');
			form.set('url', 'https://faustix.dk');
			const res = await runAddArtistLink(form, makePlatform(db));
			expect(res.success).toBe(true);
			expect(db._links).toHaveLength(1);
			expect(db._links[0].artist_id).toBe(db._rows[0].id);
			expect(db._links[0].url).toBe('https://faustix.dk');
		});

		it('fejler når databasen ikke er konfigureret', async () => {
			const form = new FormData();
			form.set('id', '1');
			form.set('label', 'Website');
			form.set('url', 'https://faustix.dk');
			const res = await runAddArtistLink(form, makePlatform(undefined));
			expect(res.status).toBe(500);
		});
		});

		describe('removeArtistLink action', () => {
		let errorSpy: ReturnType<typeof vi.spyOn>;

		beforeEach(() => {
			errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
		});

		afterEach(() => {
			errorSpy.mockRestore();
		});

		it('afviser en ikke-owner', async () => {
			const form = new FormData();
			form.set('id', '1');
			const res = await runRemoveArtistLink(form, makePlatform(createFakeD1()), false);
			expect(res.status).toBe(403);
		});

		it('afviser et ugyldigt id', async () => {
			const form = new FormData();
			form.set('id', 'abc');
			const res = await runRemoveArtistLink(form, makePlatform(createFakeD1()));
			expect(res.status).toBe(400);
		});

		it('returnerer 404 for et link der ikke findes', async () => {
			const form = new FormData();
			form.set('id', '999');
			const res = await runRemoveArtistLink(form, makePlatform(createFakeD1()));
			expect(res.status).toBe(404);
		});

		it('sletter et link', async () => {
			const db = createFakeD1();
			const create = new FormData();
			create.set('name', 'Faustix');
			await runCreateArtist(create, makePlatform(db));

			const add = new FormData();
			add.set('id', String(db._rows[0].id));
			add.set('label', 'Website');
			add.set('url', 'https://faustix.dk');
			await runAddArtistLink(add, makePlatform(db));
			expect(db._links).toHaveLength(1);

			const form = new FormData();
			form.set('id', String(db._links[0].id));
			const res = await runRemoveArtistLink(form, makePlatform(db));
			expect(res.success).toBe(true);
			expect(db._links).toHaveLength(0);
		});

		it('fejler når databasen ikke er konfigureret', async () => {
			const form = new FormData();
			form.set('id', '1');
			const res = await runRemoveArtistLink(form, makePlatform(undefined));
			expect(res.status).toBe(500);
		});
		});
