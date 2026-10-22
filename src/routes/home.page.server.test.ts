import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { load, actions } from './+page.server';

/**
 * Minimal in-memory D1-stub der understøtter de SQL-forespørgsler
 * home-loadet og company-actionerne bruger.
 */
function createFakeD1() {
	const companies: {
		id: number;
		name: string;
		link: string | null;
		created_at: number;
	}[] = [];

	const prepare = (sql: string) => {
		let args: unknown[] = [];
		const normalized = () => sql.replace(/\s+/g, ' ').trim();
		const runStatement = <T>() => {
			const q = normalized();
			if (q.startsWith('DELETE FROM companies WHERE id')) {
				const [id] = args as [number];
				const idx = companies.findIndex((c) => c.id === id);
				if (idx >= 0) companies.splice(idx, 1);
				return { success: true } as D1Result<T>;
			}
			throw new Error(`Unsupported SQL in run(): ${q}`);
		};

		const statement = {
			bind(...values: unknown[]) {
				args = values;
				return statement;
			},
			async first<T>() {
				const q = normalized();
				if (q.startsWith('SELECT id, name, link, created_at FROM companies WHERE id')) {
					const [id] = args as [number];
					return (companies.find((c) => c.id === id) ?? null) as T | null;
				}
				if (q.startsWith('INSERT INTO companies')) {
					const [name, link] = args as [string, string | null];
					const row = { id: companies.length + 1, name, link, created_at: 0 };
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
				if (q.startsWith('SELECT id, name, link, created_at FROM companies ORDER BY')) {
					const sorted = [...companies].sort((a, b) =>
						a.name.toLowerCase().localeCompare(b.name.toLowerCase())
					);
					return { results: sorted as T[], success: true };
				}
				throw new Error(`Unsupported SQL in all(): ${q}`);
			},
			async run<T>() {
				return runStatement<T>();
			},
			__exec: async () => runStatement()
		};
		return statement;
	};

	return {
		prepare,
		batch: async (statements: unknown[]) => {
			const results: unknown[] = [];
			for (const entry of statements) {
				const exec = (entry as { __exec?: () => Promise<unknown> }).__exec;
				results.push(exec ? await exec() : { success: true });
			}
			return results;
		},
		_companies: companies
	};
}

function makePlatform(db: unknown, r2PublicUrl?: string) {
	return { env: { DB: db, R2_PUBLIC_URL: r2PublicUrl } } as App.Platform;
}

type ActionResult = { status?: number; error?: string; success?: boolean };

type LoadResult = {
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
		expect(data.companies).toEqual([]);
	});

	it('returnerer tom liste når platform.env mangler (ingen 500)', async () => {
		const data = await runLoad({});
		expect(data.companies).toEqual([]);
	});

	it('returnerer logo-URL via /images-ruten som standard', async () => {
		const db = createFakeD1();
		const data = await runLoad(makePlatform(db));
		expect(data.logoUrl).toBe('/images/logo/LogoNoBorder.png');
	});

	it('bruger R2_PUBLIC_URL til logoet når den er sat', async () => {
		const db = createFakeD1();
		const data = await runLoad(makePlatform(db, 'https://cdn.example.com'));
		expect(data.logoUrl).toBe('https://cdn.example.com/logo/LogoNoBorder.png');
	});

	it('giver logo-URL også når databasen ikke er konfigureret', async () => {
		const data = await runLoad(undefined);
		expect(data.logoUrl).toBe('/images/logo/LogoNoBorder.png');
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
