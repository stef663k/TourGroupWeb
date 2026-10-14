// See https://svelte.dev/docs/kit/types#app.d.ts
declare global {
	namespace App {
		interface Platform {
			env: {
				DB: D1Database;
				Bucket: R2Bucket;
				/** Offentlig basis-URL for R2 (fx custom domain). Valgfri. */
				R2_PUBLIC_URL?: string;
				/**
				 * Hemmelig sti til owner-login (fx "/manage-8f3a9c2e"). Sættes som en
				 * Wrangler-secret, så den ikke ligger i repoet. Er den ikke sat,
				 * er owner-login deaktiveret.
				 */
				OWNER_PATH?: string;
				/**
				 * Cloudflare rate limiting-binding for owner-login (se `[[ratelimits]]` i wrangler.toml).
				 */
				LOGIN_RATE_LIMITER: RateLimit;
				};
			context: ExecutionContext;
			caches: CacheStorage;
		}

		interface Locals {
			owner: boolean;
			/** Den hemmelige owner-login-sti (normaliseret), eller null hvis ikke sat. */
			ownerPath: string | null;
		}
	}
}

export {};
