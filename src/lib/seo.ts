/**
 * SEO-konstanter og hjælpefunktioner.
 *
 * `SITE.url` er den kanoniske basis-URL for hele sitet. Den bruges til
 * canonical-links, Open Graph-URL'er og sitemap. Lige nu peger den på
 * Cloudflare Pages-domænet; når det endelige domæne er klar, er det den
 * eneste linje der skal ændres.
 */
export const SITE = {
	url: 'https://tourgroupweb.pages.dev',
	name: 'Tour Group',
	description: 'Tour Group — lighting design and production for events.',
	locale: 'en_US'
} as const;

/** Bygger en absolut URL ud fra en sti (fx "/events" → "https://…/events"). */
export function absoluteUrl(path: string): string {
	try {
		return new URL(path, SITE.url).toString();
	} catch {
		return SITE.url;
	}
}

/**
 * Slår en Open Graph-billede-URL op. R2-billeder leveres som enten en fuld URL
 * (fx et custom domain) eller en relativ "/images/…"-sti. Relative stier gøres
 * absolutte, så de er gyldige i og:-tags og JSON-LD.
 */
export function absoluteImageUrl(url: string): string {
	return /^https?:\/\//i.test(url) ? url : absoluteUrl(url);
}
