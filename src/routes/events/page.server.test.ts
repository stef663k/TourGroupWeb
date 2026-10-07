import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { load } from './+page.server';

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
			}
		};
		return statement;
	};

	return {
		prepare,
		_seed: (rows: typeof events, imageRows: typeof images) => {
			events.push(...rows);
			images.push(...imageRows);
		}
	};
}

function makePlatform(db: unknown, r2PublicUrl?: string) {
	return { env: { DB: db, Bucket: {}, R2_PUBLIC_URL: r2PublicUrl } } as App.Platform;
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
