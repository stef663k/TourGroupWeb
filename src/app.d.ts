// See https://svelte.dev/docs/kit/types#app.d.ts
declare global {
	namespace App {
		interface Platform {
      	env: {
        DB: D1Database;
        BUCKET: R2Bucket;
      };
      context: ExecutionContext;
      caches: CacheStorage;
    }
	}
}

export {};
