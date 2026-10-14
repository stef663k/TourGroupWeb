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

	type ActionInput = {
	request: Request;
	cookies: { set: ReturnType<typeof vi.fn> };
	platform: unknown;
	locals: { owner: boolean; ownerPath: string | null };
	params: { secret: string };
	};

	type RateLimiter = { limit: ReturnType<typeof vi.fn> };

	function makeRateLimiter(success: boolean): RateLimiter {
		return { limit: vi.fn(async () => ({ success })) };
	}

	async function runAction(opts: {
	secret?: string;
	ownerPath?: string;
	ip?: string;
	limitSuccess?: boolean;
	limiter?: RateLimiter;
	password?: string;
	}) {
	const headers = new Headers();
	if (opts.ip) headers.set('CF-Connecting-IP', opts.ip);

	const body = new FormData();
	if (opts.password !== undefined) body.set('password', opts.password);

	const limiter: RateLimiter = opts.limiter ?? makeRateLimiter(opts.limitSuccess ?? true);
	const input: ActionInput = {
		request: new Request('https://example.com/login', { method: 'POST', headers, body }),
		cookies: { set: vi.fn() },
		platform: {
			env: {
				LOGIN_RATE_LIMITER: limiter,
				OWNER_PATH: opts.ownerPath ?? '/manage-abc',
				DB: {}
			}
		},
		locals: { owner: false, ownerPath: null },
		params: { secret: opts.secret ?? 'manage-abc' }
	};
	return { result: await actions.default(input as never), limiter, input };
	}

	describe('[secret] owner-login action — rate limit', () => {
	it('returnerer 500 når LOGIN_RATE_LIMITER mangler', async () => {
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

	it('bruger CF-Connecting-IP som nøgle', async () => {
		const { limiter } = await runAction({ ip: '1.2.3.4', password: '' });
		expect(limiter.limit).toHaveBeenCalledWith({ key: '1.2.3.4' });
	});

	it('returnerer 500 uden CF-Connecting-IP header (fails closed)', async () => {
		const { result, limiter } = await runAction({ password: '' });
		expect(result).toMatchObject({ status: 500 });
		expect(limiter.limit).not.toHaveBeenCalled();
	});

	it('kaster 429 når rate limit er overskredet', async () => {
		await expect(runAction({ ip: '9.9.9.9', limitSuccess: false })).rejects.toMatchObject({
			status: 429
		});
	});

	it('foretager ikke login-forsøg når rate limit er overskredet', async () => {
		await expect(
			runAction({ ip: '9.9.9.9', limitSuccess: false, password: 'secret' })
		).rejects.toMatchObject({ status: 429 });
	});
	});
