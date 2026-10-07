import { describe, it, expect } from 'vitest';
import { getSessionCookie, timingSafeEqual, SESSION_COOKIE_NAME } from '$lib/server/session';

describe('timingSafeEqual', () => {
	it('returnerer true for identiske strenge', () => {
		expect(timingSafeEqual('abc', 'abc')).toBe(true);
	});

	it('returnerer false for forskellige strenge', () => {
		expect(timingSafeEqual('abc', 'abd')).toBe(false);
	});

	it('returnerer false for forskellige længder', () => {
		expect(timingSafeEqual('abc', 'abcd')).toBe(false);
	});
});

describe('getSessionCookie', () => {
	it('finder cookien blandt flere', () => {
		const header = `foo=bar; ${SESSION_COOKIE_NAME}=abc123; baz=qux`;
		expect(getSessionCookie(header)).toBe('abc123');
	});

	it('returnerer undefined når cookien mangler', () => {
		expect(getSessionCookie('foo=bar; baz=qux')).toBeUndefined();
	});

	it('returnerer undefined for null header', () => {
		expect(getSessionCookie(null)).toBeUndefined();
	});

	it('afkoder URL-encodede værdier', () => {
		const header = `${SESSION_COOKIE_NAME}=a%2Eb%2Ec`;
		expect(getSessionCookie(header)).toBe('a.b.c');
	});
});
