import { describe, it, expect } from 'vitest';
import { hashPassword, verifyPassword } from '$lib/server/password';

// Lavere iterations for hurtigere tests — formatet er det samme.
const ITERATIONS = 1000;

describe('hashPassword / verifyPassword', () => {
	it('genererer et hash i det forventede format', async () => {
		const hash = await hashPassword('hemmeligt', ITERATIONS);
		expect(hash.startsWith(`pbkdf2$${ITERATIONS}$`)).toBe(true);
		expect(hash.split('$')).toHaveLength(4);
	});

	it('verificerer det korrekte kodeord', async () => {
		const hash = await hashPassword('hemmeligt', ITERATIONS);
		expect(await verifyPassword('hemmeligt', hash)).toBe(true);
	});

	it('afviser et forkert kodeord', async () => {
		const hash = await hashPassword('hemmeligt', ITERATIONS);
		expect(await verifyPassword('forkert', hash)).toBe(false);
	});

	it('giver forskellige hashes for samme kodeord (unikt salt)', async () => {
		const a = await hashPassword('hemmeligt', ITERATIONS);
		const b = await hashPassword('hemmeligt', ITERATIONS);
		expect(a).not.toBe(b);
		expect(await verifyPassword('hemmeligt', a)).toBe(true);
		expect(await verifyPassword('hemmeligt', b)).toBe(true);
	});

	it('afviser når intet hash er sat', async () => {
		expect(await verifyPassword('hemmeligt', undefined)).toBe(false);
	});

	it('afviser et ugyldigt hash-format', async () => {
		expect(await verifyPassword('hemmeligt', 'ikke-et-hash')).toBe(false);
		expect(await verifyPassword('hemmeligt', 'pbkdf2$abc$def$ghi')).toBe(false);
	});
});
