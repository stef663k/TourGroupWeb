import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { load, actions } from './+page.server';

/**
 * Minimal in-memory D1-stub der understøtter de SQL-forespørgsler
 * about-loadet og updateAbout-actionen bruger.
 */
function createFakeD1() {
	const rows: {
		id: number;
		about_me: string | null;
		what_i_can_do: string | null;
		updated_at: number;
	}[] = [];

	const prepare = (sql: string) => {
		let args: unknown[] = [];
		const q = sql.replace(/\s+/g, ' ').trim();

		const statement = {
			bind(...values: unknown[]) {
				args = values;
				return statement;
			},
			async first<T>() {
				if (q.startsWith('SELECT id, about_me, what_i_can_do, updated_at FROM about WHERE id')) {
					const [id] = args as [number];
					return (rows.find((r) => r.id === id) ?? null) as T | null;
				}
				if (q.startsWith('INSERT INTO about')) {
					// Parse kolonnelisten så vi kan understøtte delvise opdateringer.
					const columns = q.slice(q.indexOf('(') + 1, q.indexOf(')')).split(',').map((c) => c.trim());
					const values = args as (number | string | null)[];
					const provided: Record<string, number | string | null> = {};
					columns.forEach((col, i) => (provided[col] = values[i]));

					const id = provided.id as number;
					const existing = rows.find((r) => r.id === id);
					const row = existing ?? { id, about_me: null, what_i_can_do: null, updated_at: 1 };
					if ('about_me' in provided) row.about_me = provided.about_me as string | null;
					if ('what_i_can_do' in provided) row.what_i_can_do = provided.what_i_can_do as string | null;
					row.updated_at = 1;
					if (!existing) rows.push(row);
					return row as T;
				}
				throw new Error(`Unsupported SQL: ${q}`);
			}
		};
		return statement;
	};

	return {
		prepare,
		_rows: rows,
		_seed: (row: { id: number; about_me: string | null; what_i_can_do: string | null }) => {
			rows.push({ ...row, updated_at: 0 });
		}
	};
}

function makePlatform(db: unknown) {
	return { env: { DB: db } } as App.Platform;
}

type ActionResult = { status?: number; error?: string; success?: boolean };

async function runUpdateAbout(
	form: FormData,
	platform: unknown,
	owner = true
): Promise<ActionResult> {
	const action = actions.updateAbout;
	const result = await action({
		request: new Request('http://localhost/om?/updateAbout', { method: 'POST', body: form }),
		platform,
		locals: { owner }
	} as never);
	return result as unknown as ActionResult;
}

type LoadResult = { about: { aboutMe: string | null; whatICanDo: string | null } };

async function runLoad(platform: unknown): Promise<LoadResult> {
	return (await load({ platform } as never)) as unknown as LoadResult;
}

describe('om load', () => {
	let errorSpy: ReturnType<typeof vi.spyOn>;

	beforeEach(() => {
		errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
	});

	afterEach(() => {
		errorSpy.mockRestore();
	});

	it('returnerer tomt indhold når databasen ikke er konfigureret', async () => {
		const data = await runLoad(undefined);
		expect(data.about).toEqual({ aboutMe: null, whatICanDo: null });
	});

	it('returnerer tomt indhold når platform.env mangler (ingen 500)', async () => {
		const data = await runLoad({});
		expect(data.about).toEqual({ aboutMe: null, whatICanDo: null });
	});

	it('kaster ikke når databasen fejler (fx manglende tabel)', async () => {
		const brokenDb = {
			prepare() {
				throw new Error('D1_ERROR: no such table: about');
			}
		};
		const data = await runLoad(makePlatform(brokenDb));
		expect(data.about).toEqual({ aboutMe: null, whatICanDo: null });
		expect(errorSpy).toHaveBeenCalled();
	});

	it('returnerer tomt indhold når rækken ikke findes', async () => {
		const db = createFakeD1();
		const data = await runLoad(makePlatform(db));
		expect(data.about).toEqual({ aboutMe: null, whatICanDo: null });
	});

	it('kortlægger about-rækkens felter', async () => {
		const db = createFakeD1();
		db._seed({ id: 1, about_me: 'Hej, jeg er...', what_i_can_do: 'Lysdesign og produktion' });

		const data = await runLoad(makePlatform(db));
		expect(data.about.aboutMe).toBe('Hej, jeg er...');
		expect(data.about.whatICanDo).toBe('Lysdesign og produktion');
	});
});

describe('updateAbout action', () => {
	let errorSpy: ReturnType<typeof vi.spyOn>;

	beforeEach(() => {
		errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
	});

	afterEach(() => {
		errorSpy.mockRestore();
	});

	it('afviser en ikke-owner', async () => {
		const form = new FormData();
		form.set('aboutMe', 'Hej');
		const res = await runUpdateAbout(form, makePlatform(createFakeD1()), false);
		expect(res.status).toBe(403);
	});

	it('fejler når databasen ikke er konfigureret', async () => {
		const form = new FormData();
		form.set('aboutMe', 'Hej');
		const res = await runUpdateAbout(form, makePlatform(undefined));
		expect(res.status).toBe(500);
	});

	it('gemmer begge sektioner', async () => {
		const db = createFakeD1();
		const form = new FormData();
		form.set('aboutMe', 'Om mig');
		form.set('whatICanDo', 'Det kan jeg');

		const res = await runUpdateAbout(form, makePlatform(db));
		expect(res.success).toBe(true);
		expect(db._rows[0].about_me).toBe('Om mig');
		expect(db._rows[0].what_i_can_do).toBe('Det kan jeg');
	});

	it('gemmer tomt indhold som NULL', async () => {
		const db = createFakeD1();
		db._seed({ id: 1, about_me: 'Gammel', what_i_can_do: 'Også gammel' });

		const form = new FormData();
		form.set('aboutMe', '');
		form.set('whatICanDo', '   ');

		const res = await runUpdateAbout(form, makePlatform(db));
		expect(res.success).toBe(true);
		expect(db._rows[0].about_me).toBeNull();
		expect(db._rows[0].what_i_can_do).toBeNull();
	});

	it('afviser en for lang tekst', async () => {
		const db = createFakeD1();
		const form = new FormData();
		form.set('aboutMe', 'x'.repeat(5001));
		const res = await runUpdateAbout(form, makePlatform(db));
		expect(res.status).toBe(400);
	});

	it('opdaterer kun den sektion der sendes med', async () => {
		const db = createFakeD1();
		db._seed({ id: 1, about_me: 'Gammel om mig', what_i_can_do: 'Gammel kan' });

		const form = new FormData();
		form.set('aboutMe', 'Ny om mig');

		const res = await runUpdateAbout(form, makePlatform(db));
		expect(res.success).toBe(true);
		expect(db._rows[0].about_me).toBe('Ny om mig');
		// Den anden sektion må ikke røres.
		expect(db._rows[0].what_i_can_do).toBe('Gammel kan');
	});

	it('kan rydde en enkelt sektion uden at påvirke den anden', async () => {
		const db = createFakeD1();
		db._seed({ id: 1, about_me: 'Gammel om mig', what_i_can_do: 'Gammel kan' });

		const form = new FormData();
		form.set('whatICanDo', '');

		const res = await runUpdateAbout(form, makePlatform(db));
		expect(res.success).toBe(true);
		expect(db._rows[0].what_i_can_do).toBeNull();
		expect(db._rows[0].about_me).toBe('Gammel om mig');
	});
	});
