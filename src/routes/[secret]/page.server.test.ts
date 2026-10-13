import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { load } from './+page.server';

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
