import { describe, it, expect } from 'vitest';
import { normalizeOwnerPath, isOwnerPath } from './owner-path';

describe('normalizeOwnerPath', () => {
	it('returnerer null for undefined og null', () => {
		expect(normalizeOwnerPath(undefined)).toBeNull();
		expect(normalizeOwnerPath(null)).toBeNull();
	});

	it('returnerer null for en tom eller blank streng', () => {
		expect(normalizeOwnerPath('')).toBeNull();
		expect(normalizeOwnerPath('   ')).toBeNull();
	});

	it('tilføjer en ledende skråstreg', () => {
		expect(normalizeOwnerPath('manage-abc')).toBe('/manage-abc');
	});

	it('fjerner efterstående skråstreger', () => {
		expect(normalizeOwnerPath('/manage-abc/')).toBe('/manage-abc');
		expect(normalizeOwnerPath('/manage-abc///')).toBe('/manage-abc');
	});

	it('bevarer rodstien "/"', () => {
		expect(normalizeOwnerPath('/')).toBe('/');
	});

	it('trimmer omkringliggende whitespace', () => {
		expect(normalizeOwnerPath('  /manage-abc  ')).toBe('/manage-abc');
	});
});

describe('isOwnerPath', () => {
	it('matcher den normaliserede sti', () => {
		expect(isOwnerPath('/manage-abc', 'manage-abc')).toBe(true);
		expect(isOwnerPath('/manage-abc', '/manage-abc/')).toBe(true);
	});

	it('matcher ikke en anden sti', () => {
		expect(isOwnerPath('/owner', '/manage-abc')).toBe(false);
		expect(isOwnerPath('/manage-abcd', '/manage-abc')).toBe(false);
	});

	it('returnerer false når stien ikke er konfigureret', () => {
		expect(isOwnerPath('/manage-abc', undefined)).toBe(false);
		expect(isOwnerPath('/manage-abc', '')).toBe(false);
	});

	it('er case-sensitiv', () => {
		expect(isOwnerPath('/Manage-abc', '/manage-abc')).toBe(false);
	});
});
