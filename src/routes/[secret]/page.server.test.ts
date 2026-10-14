import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { actions, load } from './+page.server';

let warnSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
	warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
});

afterEach(() => {
	warnSpy.mockRestore();
});

function makePlatform(ownerPath?: string) {
	return { env: { OWNER_PATH: ownerPath } };
}

type LoadInput = {
	params: { secret: string };
	platform: unknown;
	locals: { owner: boolean; ownerPath: string | null };
};

async function runLoad(secret: string, ownerPath: string | undefined, owner = false) {
	const input: LoadInput = {
		params: { secret },
		platform: makePlatform(ownerPath),
		locals: { owner, ownerPath: null }
	};
	return load(input as never);
}

describe('[secret] owner-login load', () => {
	it('kaster 404 når OWNER_PATH ikke er konfigureret', async () => {
		await expect(runLoad('manage-abc', undefined)).rejects.toMatchObject({ status: 404 });
	});

	it('kaster 404 ved en forkert hemmelig sti', async () => {
		await expect(runLoad('manage-wrong', '/manage-abc')).rejects.toMatchObject({ status: 404 });
	});

	it('logger en diagnose uden at lække selve værdien', async () => {
		await expect(runLoad('manage-wrong', '/manage-abc')).rejects.toMatchObject({ status: 404 });
		const message = String(warnSpy.mock.calls[0]?.[0] ?? '');
		expect(message).toContain('manage-wrong');
		expect(message).toContain('configured');
		// Den hemmelige værdi må ikke optræde i loggen.
		expect(message).not.toContain('/manage-abc');
	});

	it('logger at OWNER_PATH mangler når den ikke er sat', async () => {
		await expect(runLoad('manage-abc', undefined)).rejects.toMatchObject({ status: 404 });
		const message = String(warnSpy.mock.calls[0]?.[0] ?? '');
		expect(message).toContain('IS NOT SET');
	});

	it('kaster 404 for oplagte navne som admin', async () => {
		await expect(runLoad('admin', '/manage-abc')).rejects.toMatchObject({ status: 404 });
	});

	it('returnerer tomt objekt for den korrekte hemmelige sti', async () => {
		await expect(runLoad('manage-abc', '/manage-abc')).resolves.toEqual({});
	});

	it('accepterer en konfigureret sti uden ledende skråstreg', async () => {
		await expect(runLoad('manage-abc', 'manage-abc')).resolves.toEqual({});
	});

	it('omdirigerer til forsiden hvis man allerede er owner', async () => {
		await expect(runLoad('manage-abc', '/manage-abc', true)).rejects.toMatchObject({
			status: 303,
			location: '/'
		});
	});
});

/**
 * Minimal in-memory D1-stub der kun understøtter den SQL som
 * `checkRateLimit` bruger (login_attempts-tabellen).
 */
function createFakeRateLimitDb(): D1Database {
	const attempts = new Map<string, number>(); // key -> count (kun ét aktivt vindue)

	const prepare = (sql: string) => {
		let args: unknown[] = [];
		const q = sql.replace(/\s+/g, ' ').trim();

		const statement = {
			bind(...values: unknown[]) {
				args = values;
				return statement;
			},
			async first<T>() {
				if (q.startsWith('INSERT INTO login_attempts')) {
					const [key] = args as [string, number];
					const next = (attempts.get(key) ?? 0) + 1;
					attempts.set(key, next);
					return { attempts: next } as T;
				}
				throw new Error(`Unsupported SQL in first(): ${q}`);
			},
			async run() {
				if (q.startsWith('DELETE FROM login_attempts')) {
					return { success: true };
				}
				throw new Error(`Unsupported SQL in run(): ${q}`);
			}
		};
		return statement;
	};

	return { prepare } as unknown as D1Database;
}

type ActionInput = {
	request: Request;
	cookies: { set: ReturnType<typeof vi.fn> };
	platform: unknown;
	locals: { owner: boolean; ownerPath: string | null };
	params: { secret: string };
};

async function runAction(opts: {
	secret?: string;
	ownerPath?: string;
	ip?: string;
	db?: D1Database;
	password?: string;
}) {
	const headers = new Headers();
	if (opts.ip) headers.set('CF-Connecting-IP', opts.ip);

	const body = new FormData();
	if (opts.password !== undefined) body.set('password', opts.password);

	const db = opts.db ?? createFakeRateLimitDb();
	const input: ActionInput = {
		request: new Request('https://example.com/login', { method: 'POST', headers, body }),
		cookies: { set: vi.fn() },
		platform: {
			env: {
				OWNER_PATH: opts.ownerPath ?? '/manage-abc',
				DB: db
			}
		},
		locals: { owner: false, ownerPath: null },
		params: { secret: opts.secret ?? 'manage-abc' }
	};
	return { result: await actions.default(input as never), db, input };
}

describe('[secret] owner-login action — input-validering', () => {
	it('returnerer 500 når DB-bindingen mangler', async () => {
		const input: ActionInput = {
			request: new Request('https://example.com/login', { method: 'POST', body: new FormData() }),
			cookies: { set: vi.fn() },
			platform: { env: { OWNER_PATH: '/manage-abc' } },
			locals: { owner: false, ownerPath: null },
			params: { secret: 'manage-abc' }
		};
		const result = await actions.default(input as never);
		expect(result).toMatchObject({ status: 500 });
	});

	it('afviser en forkert hemmelig sti med 404', async () => {
		const { result } = await runAction({ secret: 'manage-wrong' });
		expect(result).toMatchObject({ status: 404 });
	});

	it('afviser et tomt password med 400', async () => {
		const { result } = await runAction({ password: '' });
		expect(result).toMatchObject({ status: 400 });
	});
});

describe('[secret] owner-login action — rate limit', () => {
	it('bruger CF-Connecting-IP som nøgle (tæller stiger pr. IP)', async () => {
		const db = createFakeRateLimitDb();
		// Samme IP to gange: andet forsøg må ikke blive blokeret (grænse er 10).
		const first = await runAction({ ip: '1.2.3.4', password: '', db });
		const second = await runAction({ ip: '1.2.3.4', password: '', db });
		expect(first.result).toMatchObject({ status: 400 });
		expect(second.result).toMatchObject({ status: 400 });
	});

	it('kaster 429 når grænsen (10) er overskredet for samme IP', async () => {
		const db = createFakeRateLimitDb();
		// De første 10 forsøg teller; det 11. skal blokeres.
		for (let i = 0; i < 10; i++) {
			await runAction({ ip: '9.9.9.9', password: '', db });
		}
		await expect(runAction({ ip: '9.9.9.9', password: 'secret', db })).rejects.toMatchObject({
			status: 429
		});
	});

	it('forskellige IPer deler ikke tæller', async () => {
		const db = createFakeRateLimitDb();
		for (let i = 0; i < 10; i++) {
			await runAction({ ip: '1.1.1.1', password: '', db });
		}
		// En anden IP har sin egen tæller og skal stadig kunne forsøge.
		await expect(runAction({ ip: '2.2.2.2', password: '' })).resolves.toBeDefined();

		const { result } = await runAction({ ip: '2.2.2.2', password: '', db });
		expect(result).toMatchObject({ status: 400 });
	});

	it('falder tilbage til en fast nøgle uden CF-Connecting-IP header', async () => {
		const db = createFakeRateLimitDb();
		// Uden header bruges "local-dev", så login stadig virker i dev.
		const { result } = await runAction({ password: '', db });
		expect(result).toMatchObject({ status: 400 });
	});
});
