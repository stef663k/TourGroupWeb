import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { load, actions } from './+page.server';

/**
 * Minimal in-memory D1-stub der understøtter de SQL-forespørgsler
 * events-loadet bruger (listEvents + listEventImages).
 */
function createFakeD1() {
	const events: {
		id: number;
		slug: string;
		name: string;
		event_date: string | null;
		location: string | null;
		description: string | null;
		created_at: number;
	}[] = [];
	const images: {
		id: number;
		event_id: number;
		r2_key: string;
		caption: string | null;
		content_type: string;
		sort_order: number;
		created_at: number;
	}[] = [];

	const prepare = (sql: string) => {
		let args: unknown[] = [];
		const q = sql.replace(/\s+/g, ' ').trim();

		const statement = {
			bind(...values: unknown[]) {
				args = values;
				return statement;
			},
			async all<T>() {
				if (q.startsWith('SELECT id, slug, name, event_date, location, description, created_at FROM events ORDER BY')) {
					return { results: events as T[], success: true };
				}
				if (
					q.startsWith(
						'SELECT id, event_id, r2_key, caption, content_type, sort_order, created_at FROM event_images WHERE event_id'
					)
				) {
					const [eventId] = args as [number];
					return {
						results: images.filter((i) => i.event_id === eventId) as T[],
						success: true
					};
				}
				throw new Error(`Unsupported SQL: ${q}`);
			},
			async first<T>() {
				if (q.startsWith('INSERT INTO events')) {
					const [slug, name, event_date, location, description] = args as [
						string,
						string,
						string | null,
						string | null,
						string | null
					];
					if (events.some((e) => e.slug === slug)) {
						throw new Error('UNIQUE constraint failed: events.slug');
					}
					const row = {
						id: events.length + 1,
						slug,
						name,
						event_date,
						location,
						description,
						created_at: 0
					};
					events.push(row);
					return row as T;
				}
				if (q.startsWith('INSERT INTO event_images')) {
					const [event_id, r2_key, caption, content_type, sort_order] = args as [
						number,
						string,
						string | null,
						string,
						number
					];
					const row = {
						id: images.length + 1,
						event_id,
						r2_key,
						caption,
						content_type,
						sort_order,
						created_at: 0
					};
					images.push(row);
					return row as T;
				}
				throw new Error(`Unsupported SQL: ${q}`);
			}
		};
		return statement;
		};

		return {
		prepare,
		_images: images,
		_seed: (rows: typeof events, imageRows: typeof images) => {
			events.push(...rows);
			images.push(...imageRows);
		}
		};
		}

function makePlatform(db: unknown, r2PublicUrl?: string) {
	return { env: { DB: db, Bucket: {}, R2_PUBLIC_URL: r2PublicUrl } } as App.Platform;
}

/** Minimal R2-stub der registrerer puts. */
function createFakeBucket() {
	const put = vi.fn(
		async (_key: string, _value: ArrayBuffer, _opts?: { httpMetadata?: { contentType?: string } }) => ({})
	);
	return { put, _puts: put };
}

function jpegFile(name = 'foto.jpg', size = 1024): File {
	const bytes = new Uint8Array(size);
	// JPEG magic bytes.
	bytes.set([0xff, 0xd8, 0xff, 0xe0], 0);
	return new File([bytes], name, { type: 'image/jpeg' });
}

type ActionResult = { status?: number; error?: string; success?: boolean };

async function runCreateEvent(
	form: FormData,
	platform: unknown,
	owner = true
): Promise<ActionResult> {
	const action = actions.createEvent;
	const result = await action({
		request: new Request('http://localhost/events?/createEvent', { method: 'POST', body: form }),
		platform,
		locals: { owner }
	} as never);
	return result as unknown as ActionResult;
}

type LoadResult = { events: { images: { id: number; caption: string | null; url: string }[] }[]; imageBaseUrl: string | undefined };

async function runLoad(platform: unknown): Promise<LoadResult> {
	return (await load({ platform } as never)) as unknown as LoadResult;
}

describe('events load', () => {
	let errorSpy: ReturnType<typeof vi.spyOn>;

	beforeEach(() => {
		errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
	});

	afterEach(() => {
		errorSpy.mockRestore();
	});

	it('returnerer tom liste når databasen ikke er konfigureret', async () => {
		const data = await runLoad(undefined);
		expect(data.events).toEqual([]);
		expect(data.imageBaseUrl).toBeUndefined();
	});

	it('returnerer tom liste når platform.env mangler (ingen 500)', async () => {
		const data = await runLoad({});
		expect(data.events).toEqual([]);
	});

	it('kaster ikke når databasen fejler (fx manglende tabeller)', async () => {
		const brokenDb = {
			prepare() {
				throw new Error('D1_ERROR: no such table: events');
			}
		};
		const data = await runLoad(makePlatform(brokenDb));
		expect(data.events).toEqual([]);
		expect(errorSpy).toHaveBeenCalled();
	});

	it('kortlægger events og deres billed-URLer', async () => {
		const db = createFakeD1();
		db._seed(
			[
				{
					id: 1,
					slug: 'sommerfest',
					name: 'Sommerfest',
					event_date: '2026-07-01',
					location: 'København',
					description: null,
					created_at: 0
				}
			],
			[
				{
					id: 10,
					event_id: 1,
					r2_key: 'events/sommerfest/a.jpg',
					caption: 'Første',
					content_type: 'image/jpeg',
					sort_order: 0,
					created_at: 0
				}
			]
		);

		const data = await runLoad(makePlatform(db, 'https://cdn.example.com'));
		expect(data.events).toHaveLength(1);
		expect(data.events[0].images).toEqual([
			{ id: 10, caption: 'Første', url: 'https://cdn.example.com/events/sommerfest/a.jpg' }
		]);
		expect(data.imageBaseUrl).toBe('https://cdn.example.com');
	});

	it('bruger /images-ruten når ingen base-URL er sat', async () => {
		const db = createFakeD1();
		db._seed(
			[
				{
					id: 1,
					slug: 'fest',
					name: 'Fest',
					event_date: null,
					location: null,
					description: null,
					created_at: 0
				}
			],
			[
				{
					id: 5,
					event_id: 1,
					r2_key: 'events/fest/x.png',
					caption: null,
					content_type: 'image/png',
					sort_order: 0,
					created_at: 0
				}
			]
		);

		const data = await runLoad(makePlatform(db));
		expect(data.events[0].images[0].url).toBe('/images/events/fest/x.png');
		});
		});

		describe('createEvent action', () => {
		let errorSpy: ReturnType<typeof vi.spyOn>;

		beforeEach(() => {
		errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
		});

		afterEach(() => {
		errorSpy.mockRestore();
		});

		it('afviser en ikke-owner', async () => {
		const form = new FormData();
		form.set('name', 'Fest');
		form.set('file', jpegFile());
		const res = await runCreateEvent(form, makePlatform(createFakeD1(), undefined), false);
		expect(res.status).toBe(403);
		});

		it('kræver et navn', async () => {
		const form = new FormData();
		form.set('file', jpegFile());
		const res = await runCreateEvent(form, makePlatform(createFakeD1()));
		expect(res.status).toBe(400);
		});

		it('kræver et billede', async () => {
		const form = new FormData();
		form.set('name', 'Fest');
		const res = await runCreateEvent(form, makePlatform(createFakeD1()));
		expect(res.status).toBe(400);
		});

		it('afviser en tom fil', async () => {
		const form = new FormData();
		form.set('name', 'Fest');
		form.set('file', new File([], 'tom.jpg', { type: 'image/jpeg' }));
		const res = await runCreateEvent(form, makePlatform(createFakeD1()));
		expect(res.status).toBe(400);
		});

		it('afviser en fil hvis indhold ikke matcher typen', async () => {
		const form = new FormData();
		form.set('name', 'Fest');
		form.set('file', new File([new Uint8Array([1, 2, 3, 4])], 'falsk.png', { type: 'image/png' }));
		const res = await runCreateEvent(form, makePlatform(createFakeD1()));
		expect(res.status).toBe(400);
		});

		it('opretter event og gemmer billedet i bucket', async () => {
		const db = createFakeD1();
		const bucket = createFakeBucket();
		const platform = { env: { DB: db, Bucket: bucket } } as unknown as App.Platform;

		const form = new FormData();
		form.set('name', 'Sommerfest');
		form.set('description', 'En fest');
		form.set('file', jpegFile());

		const res = await runCreateEvent(form, platform);
		expect(res.success).toBe(true);
		expect(bucket._puts).toHaveBeenCalledTimes(1);
		const [key, , opts] = bucket._puts.mock.calls[0];
		expect(key).toMatch(/^events\/sommerfest\/.+\.jpg$/);
		expect(opts?.httpMetadata?.contentType).toBe('image/jpeg');
		});

		it('afviser en dublet-slug', async () => {
		const db = createFakeD1();
		db._seed(
			[
				{
					id: 1,
					slug: 'sommerfest',
					name: 'Sommerfest',
					event_date: null,
					location: null,
					description: null,
					created_at: 0
				}
			],
			[]
		);
		const bucket = createFakeBucket();
		const platform = { env: { DB: db, Bucket: bucket } } as unknown as App.Platform;

		const form = new FormData();
		form.set('name', 'Sommerfest');
		form.set('file', jpegFile());

		const res = await runCreateEvent(form, platform);
		expect(res.status).toBe(400);
		expect(bucket._puts).not.toHaveBeenCalled();
		});
		});
