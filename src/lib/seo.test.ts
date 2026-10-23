import { describe, it, expect } from 'vitest';
import { SITE, absoluteUrl, absoluteImageUrl } from '$lib/seo';

describe('seo', () => {
	it('eksponerer en kanonisk basis-URL', () => {
		expect(SITE.url).toMatch(/^https?:\/\//);
	});

	it('bygger absolutte URL\'er fra stier', () => {
		expect(absoluteUrl('/events')).toBe(`${SITE.url}/events`);
	});

	it('håndterer roden', () => {
		expect(absoluteUrl('/')).toBe(`${SITE.url}/`);
	});

	it('lader absolutte billed-URL\'er være uændrede', () => {
		expect(absoluteImageUrl('https://cdn.example.com/x.jpg')).toBe(
			'https://cdn.example.com/x.jpg'
		);
	});

	it('gør relative billed-stier absolutte', () => {
		expect(absoluteImageUrl('/images/logo/LogoNoBorder.png')).toBe(
			`${SITE.url}/images/logo/LogoNoBorder.png`
		);
	});
});
