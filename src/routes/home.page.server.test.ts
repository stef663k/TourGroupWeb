import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { load, actions } from './+page.server';

/**
 * Minimal in-memory D1-stub der understøtter de SQL-forespørgsler
 * selected-work-loadet bruger (listSelectedWork + createSelectedWork)
 * samt de event-opslag createWork bruger til at validere event_id.
 */
function createFakeD1() {
	let nextId = 1;
	const rows: {
		id: number;
		name: string;
		years: string | null;
		event_id: number | null;
		created_at: number;
	}[] = [];
	const events: {
		id: number;
		slug: string;
		name: string;
		event_date: string | null;
		location: string | null;
		description: string | null;
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
				if (q.startsWith('INSERT INTO selected_work')) {
					const [name, years, event_id] = args as [string, string | null, number | null];
					const row = { id: nextId++, name, years, event_id, created_at: 0 };
					rows.push(row);
					return row as T;
				}
				if (q.startsWith('UPDATE selected_work SET')) {
					const [name, years, event_id, id] = args as [string, string | null, number | null, number];
					const row = rows.find((r) => r.id === id);
					if (!row) return null;
					row.name = name;
					row.years = years;
					row.event_id = event_id;
					return row as T;
				}
				if (q.startsWith('SELECT id, name, years, event_id, created_at FROM selected_work WHERE id')) {
					const [id] = args as [number];
					return (rows.find((r) => r.id === id) ?? null) as T | null;
				}
				if (q.startsWith('SELECT id, slug, name, event_date, location, description, created_at FROM events WHERE id')) {
					const [id] = args as [number];
					return (events.find((e) => e.id === id) ?? null) as T | null;
				}
				throw new Error(`Unsupported SQL in first(): ${q}`);
			},
			async all<T>() {
				const q = normalized();
				if (q.startsWith('SELECT id, name, years, event_id, created_at FROM selected_work ORDER BY')) {
					return { results: [...rows].sort((a, b) => b.id - a.id) as T[], success: true };
				}
				if (q.startsWith('SELECT id, slug, name, event_date, location, description, created_at FROM events ORDER BY')) {
					return { results: events as T[], success: true };
				}
				throw new Error(`Unsupported SQL in all(): ${q}`);
			},
			async run<T>() {
				const q = normalized();
				if (q.startsWith('DELETE FROM selected_work WHERE id')) {
					const [id] = args as [number];
					const idx = rows.findIndex((r) => r.id === id);
					if (idx >= 0) rows.splice(idx, 1);
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
		_events: events,
		_seedEvent: (event: { id: number; name: string }) => {
			events.push({
				id: event.id,
				slug: event.name.toLowerCase(),
				name: event.name,
				event_date: null,
				location: null,
				description: null,
				created_at: 0
			});
		}
	};
}

function makePlatform(db: unknown) {
	return { env: { DB: db } } as App.Platform;
}

type ActionResult = { status?: number; error?: string; success?: boolean };

async function runCreateWork(form: FormData, platform: unknown, owner = true): Promise<ActionResult> {
	const action = actions.createWork;
	const result = await action({
		request: new Request('http://localhost/?/createWork', { method: 'POST', body: form }),
		platform,
		locals: { owner }
	} as never);
	return result as unknown as ActionResult;
}

async function runDeleteWork(form: FormData, platform: unknown, owner = true): Promise<ActionResult> {
	const action = actions.deleteWork;
	const result = await action({
		request: new Request('http://localhost/?/deleteWork', { method: 'POST', body: form }),
		platform,
		locals: { owner }
	} as never);
	return result as unknown as ActionResult;
	}

	async function runUpdateWork(form: FormData, platform: unknown, owner = true): Promise<ActionResult> {
	const action = actions.updateWork;
	const result = await action({
		request: new Request('http://localhost/?/updateWork', { method: 'POST', body: form }),
		platform,
		locals: { owner }
	} as never);
	return result as unknown as ActionResult;
	}

	type LoadResult = { selectedWork: { id: number; name: string; years: string | null }[] };

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
		expect(data.selectedWork).toEqual([]);
	});

	it('returnerer tom liste når platform.env mangler (ingen 500)', async () => {
		const data = await runLoad({});
		expect(data.selectedWork).toEqual([]);
	});

	it('kaster ikke når databasen fejler (fx manglende tabeller)', async () => {
		const brokenDb = {
			prepare() {
				throw new Error('D1_ERROR: no such table: selected_work');
			}
		};
		const data = await runLoad(makePlatform(brokenDb));
		expect(data.selectedWork).toEqual([]);
		expect(errorSpy).toHaveBeenCalled();
	});

	it('kortlægger selected-work-rækker', async () => {
		const db = createFakeD1();
		db._rows.push({
			id: 1,
			name: 'Faustix',
			years: '22-24',
			event_id: null,
			created_at: 0
		});
		const data = await runLoad(makePlatform(db));
		expect(data.selectedWork).toHaveLength(1);
		expect(data.selectedWork[0].name).toBe('Faustix');
	});
});

describe('createWork action', () => {
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
		const res = await runCreateWork(form, makePlatform(createFakeD1()), false);
		expect(res.status).toBe(403);
	});

	it('kræver et navn', async () => {
		const form = new FormData();
		const res = await runCreateWork(form, makePlatform(createFakeD1()));
		expect(res.status).toBe(400);
	});

	it('afviser et for langt navn', async () => {
		const form = new FormData();
		form.set('name', 'a'.repeat(201));
		const res = await runCreateWork(form, makePlatform(createFakeD1()));
		expect(res.status).toBe(400);
	});

	it('fejler når databasen ikke er konfigureret', async () => {
		const form = new FormData();
		form.set('name', 'Faustix');
		const res = await runCreateWork(form, makePlatform(undefined));
		expect(res.status).toBe(500);
	});

	it('opretter en række med kun navn', async () => {
		const db = createFakeD1();
		const form = new FormData();
		form.set('name', 'Faustix');
		const res = await runCreateWork(form, makePlatform(db));
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
		const res = await runCreateWork(form, makePlatform(db));
		expect(res.success).toBe(true);
		expect(db._rows[0].years).toBe('24-26');
	});

	it('behandler et tomt år som null', async () => {
		const db = createFakeD1();
		const form = new FormData();
		form.set('name', 'Katinka');
		form.set('years', '   ');
		const res = await runCreateWork(form, makePlatform(db));
		expect(res.success).toBe(true);
		expect(db._rows[0].years).toBeNull();
	});

	it('knytter selected work til et eksisterende event', async () => {
		const db = createFakeD1();
		db._seedEvent({ id: 7, name: 'Sommerfest' });
		const form = new FormData();
		form.set('name', 'Faustix');
		form.set('eventId', '7');
		const res = await runCreateWork(form, makePlatform(db));
		expect(res.success).toBe(true);
		expect(db._rows[0].event_id).toBe(7);
	});

	it('behandler et tomt event_id som null', async () => {
		const db = createFakeD1();
		const form = new FormData();
		form.set('name', 'Faustix');
		form.set('eventId', '');
		const res = await runCreateWork(form, makePlatform(db));
		expect(res.success).toBe(true);
		expect(db._rows[0].event_id).toBeNull();
	});

	it('afviser et event_id der ikke findes', async () => {
		const db = createFakeD1();
		const form = new FormData();
		form.set('name', 'Faustix');
		form.set('eventId', '999');
		const res = await runCreateWork(form, makePlatform(db));
		expect(res.status).toBe(400);
		expect(db._rows).toHaveLength(0);
	});

	it('afviser et ugyldigt event_id', async () => {
		const db = createFakeD1();
		const form = new FormData();
		form.set('name', 'Faustix');
		form.set('eventId', 'abc');
		const res = await runCreateWork(form, makePlatform(db));
		expect(res.status).toBe(400);
		expect(db._rows).toHaveLength(0);
	});
});

describe('deleteWork action', () => {
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
		const res = await runDeleteWork(form, makePlatform(createFakeD1()), false);
		expect(res.status).toBe(403);
	});

	it('afviser et ugyldigt id', async () => {
		const form = new FormData();
		form.set('id', 'abc');
		const res = await runDeleteWork(form, makePlatform(createFakeD1()));
		expect(res.status).toBe(400);
	});

	it('fejler når databasen ikke er konfigureret', async () => {
		const form = new FormData();
		form.set('id', '1');
		const res = await runDeleteWork(form, makePlatform(undefined));
		expect(res.status).toBe(500);
	});

	it('sletter en artist', async () => {
		const db = createFakeD1();
		const create = new FormData();
		create.set('name', 'Faustix');
		await runCreateWork(create, makePlatform(db));
		expect(db._rows).toHaveLength(1);

		const form = new FormData();
		form.set('id', String(db._rows[0].id));
		const res = await runDeleteWork(form, makePlatform(db));
		expect(res.success).toBe(true);
		expect(db._rows).toHaveLength(0);
	});
	});

	describe('updateWork action', () => {
	let errorSpy: ReturnType<typeof vi.spyOn>;

	beforeEach(() => {
		errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
	});

	afterEach(() => {
		errorSpy.mockRestore();
	});

	async function seedWork(db: ReturnType<typeof createFakeD1>) {
		const create = new FormData();
		create.set('name', 'Faustix');
		create.set('years', '22-24');
		await runCreateWork(create, makePlatform(db));
		return db._rows[0].id;
	}

	it('afviser en ikke-owner', async () => {
		const form = new FormData();
		form.set('id', '1');
		form.set('name', 'Faustix');
		const res = await runUpdateWork(form, makePlatform(createFakeD1()), false);
		expect(res.status).toBe(403);
	});

	it('kræver et navn', async () => {
		const db = createFakeD1();
		const id = await seedWork(db);
		const form = new FormData();
		form.set('id', String(id));
		const res = await runUpdateWork(form, makePlatform(db));
		expect(res.status).toBe(400);
	});

	it('afviser et ugyldigt id', async () => {
		const form = new FormData();
		form.set('id', 'abc');
		form.set('name', 'Faustix');
		const res = await runUpdateWork(form, makePlatform(createFakeD1()));
		expect(res.status).toBe(400);
	});

	it('returnerer 404 for en post der ikke findes', async () => {
		const form = new FormData();
		form.set('id', '999');
		form.set('name', 'Faustix');
		const res = await runUpdateWork(form, makePlatform(createFakeD1()));
		expect(res.status).toBe(404);
	});

	it('knytter et event til en eksisterende artist', async () => {
		const db = createFakeD1();
		const id = await seedWork(db);
		db._seedEvent({ id: 7, name: 'Sommerfest' });

		const form = new FormData();
		form.set('id', String(id));
		form.set('name', 'Faustix');
		form.set('years', '22-24');
		form.set('eventId', '7');
		const res = await runUpdateWork(form, makePlatform(db));
		expect(res.success).toBe(true);
		expect(db._rows[0].event_id).toBe(7);
	});

	it('fjerner linket når event_id er tomt', async () => {
		const db = createFakeD1();
		const id = await seedWork(db);
		db._seedEvent({ id: 7, name: 'Sommerfest' });

		const link = new FormData();
		link.set('id', String(id));
		link.set('name', 'Faustix');
		link.set('eventId', '7');
		await runUpdateWork(link, makePlatform(db));
		expect(db._rows[0].event_id).toBe(7);

		const form = new FormData();
		form.set('id', String(id));
		form.set('name', 'Faustix');
		form.set('eventId', '');
		const res = await runUpdateWork(form, makePlatform(db));
		expect(res.success).toBe(true);
		expect(db._rows[0].event_id).toBeNull();
	});

	it('afviser et event_id der ikke findes', async () => {
		const db = createFakeD1();
		const id = await seedWork(db);
		const form = new FormData();
		form.set('id', String(id));
		form.set('name', 'Faustix');
		form.set('eventId', '999');
		const res = await runUpdateWork(form, makePlatform(db));
		expect(res.status).toBe(400);
	});

	it('opdaterer navn og år', async () => {
		const db = createFakeD1();
		const id = await seedWork(db);
		const form = new FormData();
		form.set('id', String(id));
		form.set('name', 'Aqua');
		form.set('years', '24-26');
		const res = await runUpdateWork(form, makePlatform(db));
		expect(res.success).toBe(true);
		expect(db._rows[0].name).toBe('Aqua');
		expect(db._rows[0].years).toBe('24-26');
	});
	});
