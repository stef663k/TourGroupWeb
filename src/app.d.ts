// See https://svelte.dev/docs/kit/types#app.d.ts
declare global {
	namespace App {
		interface Platform {
			env: {
				DB: D1Database;
				Bucket: R2Bucket;
				/** Offentlig basis-URL for R2 (fx custom domain). Valgfri. */
				R2_PUBLIC_URL?: string;
			};
			context: ExecutionContext;
			caches: CacheStorage;
		}

		interface Locals {
			owner: boolean;
		}
	}
}

export {};
