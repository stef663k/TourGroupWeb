/**
 * Simpel fixed-window rate limiter oven på D1.
 *
 * Cloudflare Pages understøtter ikke `ratelimits`-bindingen (den findes kun
 * på Workers), så vi tæller forsøg i databasen i stedet. Det gør login-beskyttelsen
 * uafhængig af deploy-target.
 *
 * Vinduet er fast: alle forsøg inden for `windowSeconds` fra vinduets start
 * deler samme tæller. Når vinduet udløber, begynder et nyt.
 */

export interface RateLimitResult {
	/** true hvis forsøget er tilladt, false hvis grænsen er nået. */
	success: boolean;
	/** Antal forsøg i det aktuelle vindue (inkl. dette). */
	attempts: number;
	/** Unix-tid (sekunder) hvor det aktuelle vindue udløber. */
	resetAt: number;
}

/**
 * Registrerer et forsøg for `key` og afgør om det er inden for grænsen.
 *
 * Bemærk: dette tæller forsøget, uanset om det efterfølgende lykkes. Det er
 * med vilje — også vellykkede logins tæller, så en angriber ikke kan omgå
 * grænsen ved at gætte korrekt.
 */
export async function checkRateLimit(
	db: D1Database,
	key: string,
	limit: number,
	windowSeconds: number
): Promise<RateLimitResult> {
	const now = Math.floor(Date.now() / 1000);
	const windowStart = now - (now % windowSeconds);
	const resetAt = windowStart + windowSeconds;

	// Atomisk optælling: opret eller øg tælleren for det aktuelle vindue.
	const row = await db
		.prepare(
			'INSERT INTO login_attempts (key, window_start, attempts) VALUES (?1, ?2, 1) ' +
				'ON CONFLICT (key, window_start) DO UPDATE SET attempts = attempts + 1 ' +
				'RETURNING attempts'
		)
		.bind(key, windowStart)
		.first<{ attempts: number }>();

	const attempts = row?.attempts ?? 1;

	// Ryd op i gamle vinduer så tabellen ikke vokser ubegrænset.
	await db
		.prepare('DELETE FROM login_attempts WHERE window_start < ?1')
		.bind(windowStart)
		.run();

	return {
		success: attempts <= limit,
		attempts,
		resetAt
	};
}
