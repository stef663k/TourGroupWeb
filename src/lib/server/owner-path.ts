/**
 * Hjælpefunktioner til den hemmelige owner-login-sti.
 *
 * Stien læses fra en Wrangler-secret (`OWNER_PATH`), så den ikke ligger i
 * kildekoden. Den normaliseres, så vi kan sammenligne den sikkert med
 * requestens pathname.
 */

/** Den interne route der viser login-siden. Eksponeres ikke direkte. */
export const OWNER_ROUTE = '/owner';

/**
 * Normaliserer en rå konfigureret sti til en absolut sti uden
 * efterstående skråstreg. Returnerer null hvis intet brugbart er sat.
 *
 * Eksempler:
 *   "manage-abc"   → "/manage-abc"
 *   "/manage-abc/" → "/manage-abc"
 *   "   "          → null
 *   undefined      → null
 */
export function normalizeOwnerPath(raw: string | undefined | null): string | null {
	if (raw == null) return null;
	let path = raw.trim();
	if (!path) return null;
	if (!path.startsWith('/')) path = '/' + path;
	// Behold "/" som den er; fjern ellers efterstående skråstreger.
	if (path.length > 1) path = path.replace(/\/+$/, '');
	return path;
}

/**
 * Er stien den konfigurerede hemmelige owner-login-sti?
 * Sammenligningen er præcis (store/små bogstaver respekteres).
 */
export function isOwnerPath(pathname: string, rawOwnerPath: string | undefined | null): boolean {
	const ownerPath = normalizeOwnerPath(rawOwnerPath);
	if (!ownerPath) return false;
	return pathname === ownerPath;
}
