import type { RequestHandler } from './$types';
import { absoluteUrl } from '$lib/seo';

/** Offentlige sider der skal med i sitemap. */
const PAGES: { path: string; changefreq: string; priority: string }[] = [
	{ path: '/', changefreq: 'weekly', priority: '1.0' },
	{ path: '/events', changefreq: 'weekly', priority: '0.9' },
	{ path: '/artists', changefreq: 'weekly', priority: '0.9' },
	{ path: '/clients', changefreq: 'monthly', priority: '0.6' },
	{ path: '/om', changefreq: 'monthly', priority: '0.6' },
	{ path: '/kontakt', changefreq: 'yearly', priority: '0.5' }
];

/** Escape XML-specialtegn i URL'er. */
function escapeXml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

export const GET: RequestHandler = () => {
	const urls = PAGES.map(
		(page) =>
			`\t<url>\n` +
			`\t\t<loc>${escapeXml(absoluteUrl(page.path))}</loc>\n` +
			`\t\t<changefreq>${page.changefreq}</changefreq>\n` +
			`\t\t<priority>${page.priority}</priority>\n` +
			`\t</url>`
	).join('\n');

	const xml =
		`<?xml version="1.0" encoding="UTF-8"?>\n` +
		`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
		`${urls}\n` +
		`</urlset>\n`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': `public, max-age=3600`
		}
	});
};
