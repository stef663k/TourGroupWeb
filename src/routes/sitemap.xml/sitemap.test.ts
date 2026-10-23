import { describe, it, expect } from 'vitest';
import { GET } from './+server';
import { SITE } from '$lib/seo';

async function fetchSitemap(): Promise<string> {
	const res = await GET({} as never);
	return res.text();
}

describe('sitemap.xml', () => {
	it('returnerer XML med korrekt indholdstype', async () => {
		const res = await GET({} as never);
		expect(res.headers.get('Content-Type')).toBe('application/xml');
	});

	it('starter med en XML-deklaration og urlset', async () => {
		const xml = await fetchSitemap();
		expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
		expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
	});

	it('indeholder de offentlige sider som absolutte URL\'er', async () => {
		const xml = await fetchSitemap();
		for (const path of ['/', '/events', '/artists', '/clients', '/om', '/kontakt']) {
			const expected = path === '/' ? `${SITE.url}/` : `${SITE.url}${path}`;
			expect(xml).toContain(`<loc>${expected}</loc>`);
		}
	});

	it('indeholder ikke owner-login eller private ruter', async () => {
		const xml = await fetchSitemap();
		expect(xml).not.toContain('/logout');
		expect(xml).not.toContain('owner');
	});
});
