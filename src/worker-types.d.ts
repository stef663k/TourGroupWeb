/**
 * Minimale Cloudflare D1-typer.
 *
 * Projektet bruger `@sveltejs/adapter-cloudflare`, men har ikke
 * `@cloudflare/workers-types` installeret. Denne fil erklærer de dele af
 * D1-API'et som vi rent faktisk bruger, så vi kan type-checke uden at
 * afhænge af eksterne typepakker.
 *
 * Typenavnene matcher Cloudflare's officielle typer, så de kan erstattes
 * 1:1 hvis `@cloudflare/workers-types` tilføjes senere.
 */

interface D1Result<T = unknown> {
	results: T[];
	success: boolean;
	meta: Record<string, unknown>;
	error?: string;
}

interface D1PreparedStatement {
	bind(...values: unknown[]): D1PreparedStatement;
	first<T = unknown>(colName?: string): Promise<T | null>;
	run<T = unknown>(): Promise<D1Result<T>>;
	all<T = unknown>(): Promise<D1Result<T>>;
	raw<T = unknown[]>(options?: { columnNames?: boolean }): Promise<T[]>;
}

interface D1Database {
	prepare(query: string): D1PreparedStatement;
	batch<T = unknown>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]>;
	exec(query: string): Promise<number>;
	dump(): Promise<ArrayBuffer>;
}

/**
 * Minimale Cloudflare R2-typer.
 *
 * Samme princip som D1-typerne ovenfor: vi erklærer kun den del af R2-API'et
 * som projektet bruger, så vi kan type-checke uden `@cloudflare/workers-types`.
 */

interface R2HTTPMetadata {
	contentType?: string;
	contentLanguage?: string;
	contentDisposition?: string;
	contentEncoding?: string;
	cacheControl?: string;
	cacheExpiry?: Date;
}

interface R2Object {
	key: string;
	size: number;
	etag: string;
	uploaded: Date;
	httpMetadata: R2HTTPMetadata;
	customMetadata?: Record<string, string>;
}

interface R2ObjectBody extends R2Object {
	body: ReadableStream;
	bodyUsed: boolean;
	arrayBuffer(): Promise<ArrayBuffer>;
	text(): Promise<string>;
	json<T = unknown>(): Promise<T>;
	blob(): Promise<Blob>;
}

interface R2Objects {
	objects: R2Object[];
	truncated: boolean;
	cursor?: string;
	delimitedPrefixes?: string[];
}

interface R2PutOptions {
	httpMetadata?: R2HTTPMetadata;
	customMetadata?: Record<string, string>;
}

interface R2ListOptions {
	limit?: number;
	prefix?: string;
	cursor?: string;
	delimiter?: string;
	include?: ('httpMetadata' | 'customMetadata')[];
}

interface R2Bucket {
	head(key: string): Promise<R2Object | null>;
	get(key: string): Promise<R2ObjectBody | null>;
	put(
		key: string,
		value: ReadableStream | ArrayBuffer | ArrayBufferView | string | Blob | null,
		options?: R2PutOptions
	): Promise<R2Object | null>;
	delete(keys: string | string[]): Promise<void>;
	list(options?: R2ListOptions): Promise<R2Objects>;
}
