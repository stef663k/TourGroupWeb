/**
 * Hjælpefunktioner til at vise et favicon for et eksternt link.
 *
 * Når ejeren opretter et link med en tekst, viser vi et lille ikon foran
 * linkteksten, så det er tydeligt hvor linket peger hen. Ikonet hentes fra
 * Googles favicon-tjeneste baseret på linkets domæne.
 */

const FAVICON_ENDPOINT = 'https://www.google.com/s2/favicons';

/**
 * Udtrækker værtsnavnet (domænet) fra en URL.
 *
 * Returnerer `null` hvis URL'en ikke kan parses, eller hvis den ikke har et
 * brugbart værtsnavn (fx relative stier som "/kontakt").
 */
export function faviconDomain(url: string | null | undefined): string | null {
  if (!url) return null;

  const trimmed = url.trim();
  if (!trimmed) return null;

  try {
    const parsed = new URL(trimmed);
    const host = parsed.hostname;
    return host ? host : null;
  } catch {
    return null;
  }
}

/**
 * Bygger en URL til Googles favicon-tjeneste for det givne link.
 *
 * Returnerer `null` når domænet ikke kan udledes, så kaldere kan vælge at
 * udelade ikonet helt.
 */
export function faviconUrl(
  url: string | null | undefined,
  size = 64
): string | null {
  const domain = faviconDomain(url);
  if (!domain) return null;

  const params = new URLSearchParams({ domain, sz: String(size) });
  return `${FAVICON_ENDPOINT}?${params.toString()}`;
}
