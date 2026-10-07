import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { load, actions } from './+page.server';

/**
 * Minimal in-memory D1-stub der understøtter de SQL-forespørgsler
 * selected-work-loadet bruger (listSelectedWork + createSelectedWork).
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
				throw new Error(`Unsupported SQL in first(): ${q}`);
			},
			async all<T>() {
				const q = normalized();
				if (q.startsWith('SELECT id, name, years, event_id, created_at FROM selected_work ORDER BY')) {
					return { results: [...rows].sort((a, b) => b.id - a.id) as T[], success: true };
				}
				throw new Error(`Unsupported SQL in all(): ${q}`);
			}
		};
		return statement;
	};

	return { prepare, _rows: rows };
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
});
