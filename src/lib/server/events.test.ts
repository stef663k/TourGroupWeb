import { describe, it, expect, beforeEach } from 'vitest';
import {
	listEvents,
	getEvent,
	createEvent,
	deleteEvent,
	addEventImage,
	listEventImages,
	getEventImage,
	removeEventImage
} from '$lib/server/db';

/**
 * Minimal in-memory D1-stub der understøtter de SQL-forespørgsler
 * event-funktionerne i db.ts bruger.
 */
function createFakeD1(): D1Database {
	let nextEventId = 1;
	let nextImageId = 1;
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
		const normalized = () => sql.replace(/\s+/g, ' ').trim();

		const firstStatement = <T>() => {
			const q = normalized();
			if (q.startsWith('SELECT id, slug, name, event_date, location, description, created_at FROM events WHERE id')) {
				const [id] = args as [number];
				return (events.find((e) => e.id === id) ?? null) as T | null;
			}
			if (
				q.startsWith(
					'SELECT id, event_id, r2_key, caption, content_type, sort_order, created_at FROM event_images WHERE id'
				)
			) {
				const [id] = args as [number];
				return (images.find((i) => i.id === id) ?? null) as T | null;
			}
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
					id: nextEventId++,
					slug,
					name,
					event_date,
					location,
					description,
					created_at: Math.floor(Date.now() / 1000)
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
				if (images.some((i) => i.r2_key === r2_key)) {
					throw new Error('UNIQUE constraint failed: event_images.r2_key');
				}
				const row = {
					id: nextImageId++,
					event_id,
					r2_key,
					caption,
					content_type,
					sort_order,
					created_at: Math.floor(Date.now() / 1000)
				};
				images.push(row);
				return row as T;
			}
			throw new Error(`Unsupported SQL in first(): ${q}`);
		};

		const allStatement = <T>() => {
			const q = normalized();
			if (q.startsWith('SELECT id, slug, name, event_date, location, description, created_at FROM events ORDER BY')) {
				const sorted = [...events].sort((a, b) => {
					const aNull = a.event_date === null ? 1 : 0;
					const bNull = b.event_date === null ? 1 : 0;
					if (aNull !== bNull) return aNull - bNull;
					if (a.event_date !== b.event_date) {
						return (b.event_date ?? '').localeCompare(a.event_date ?? '');
					}
					return b.id - a.id;
				});
				return sorted as T[];
			}
			if (
				q.startsWith(
					'SELECT id, event_id, r2_key, caption, content_type, sort_order, created_at FROM event_images WHERE event_id'
				)
			) {
				const [eventId] = args as [number];
				const rows = images
					.filter((i) => i.event_id === eventId)
					.sort((a, b) => a.sort_order - b.sort_order || a.id - b.id);
				return rows as T[];
			}
			throw new Error(`Unsupported SQL in all(): ${q}`);
		};

		const runStatement = () => {
			const q = normalized();
			if (q.startsWith('DELETE FROM events WHERE id')) {
				const [id] = args as [number];
				const idx = events.findIndex((e) => e.id === id);
				if (idx >= 0) events.splice(idx, 1);
				// Emulerer ON DELETE CASCADE.
				for (let i = images.length - 1; i >= 0; i--) {
					if (images[i].event_id === id) images.splice(i, 1);
				}
				return { success: true };
			}
			if (q.startsWith('DELETE FROM event_images WHERE id')) {
				const [id] = args as [number];
				const idx = images.findIndex((i) => i.id === id);
				if (idx >= 0) images.splice(idx, 1);
				return { success: true };
			}
			throw new Error(`Unsupported SQL in run(): ${q}`);
		};

		const statement = {
			bind(...values: unknown[]) {
				args = values;
				return statement;
			},
			async run() {
				return runStatement();
			},
			async first<T>() {
				return firstStatement<T>();
			},
			async all<T>() {
				return { results: allStatement<T>(), success: true };
			}
		};
		return statement;
	};

	return { prepare } as unknown as D1Database;
}

describe('events', () => {
	let db: D1Database;

	beforeEach(() => {
		db = createFakeD1();
	});

	it('starter uden events', async () => {
		expect(await listEvents(db)).toEqual([]);
	});

	it('opretter og læser et event med sted', async () => {
		const created = await createEvent(db, {
			slug: 'sommerfest',
			name: 'Sommerfest',
			eventDate: '2026-07-01',
			location: 'København',
			description: 'En fest'
		});
		expect(created.id).toBeGreaterThan(0);

		const fetched = await getEvent(db, created.id);
		expect(fetched?.name).toBe('Sommerfest');
		expect(fetched?.location).toBe('København');
		expect(fetched?.event_date).toBe('2026-07-01');
	});

	it('gemmer valgfrie felter som null', async () => {
		const created = await createEvent(db, { slug: 'tom', name: 'Tom' });
		expect(created.event_date).toBeNull();
		expect(created.location).toBeNull();
		expect(created.description).toBeNull();
	});

	it('afviser en dublet-slug', async () => {
		await createEvent(db, { slug: 'dublet', name: 'A' });
		await expect(createEvent(db, { slug: 'dublet', name: 'B' })).rejects.toThrow();
	});

	it('sorterer events med nyeste dato først og uden dato sidst', async () => {
		await createEvent(db, { slug: 'gammel', name: 'Gammel', eventDate: '2024-01-01' });
		await createEvent(db, { slug: 'ny', name: 'Ny', eventDate: '2026-01-01' });
		await createEvent(db, { slug: 'uden', name: 'Uden dato' });

		const rows = await listEvents(db);
		expect(rows.map((r) => r.slug)).toEqual(['ny', 'gammel', 'uden']);
	});

	it('returnerer null for et ukendt event', async () => {
		expect(await getEvent(db, 999)).toBeNull();
	});

	it('sletter et event', async () => {
		const created = await createEvent(db, { slug: 'slet-mig', name: 'Slet mig' });
		await deleteEvent(db, created.id);
		expect(await getEvent(db, created.id)).toBeNull();
	});
});

describe('event-billeder', () => {
	let db: D1Database;
	let eventId: number;

	beforeEach(async () => {
		db = createFakeD1();
		const event = await createEvent(db, { slug: 'fest', name: 'Fest' });
		eventId = event.id;
	});

	it('tilføjer og læser billeder for et event', async () => {
		await addEventImage(db, {
			eventId,
			r2Key: 'events/fest/a.jpg',
			contentType: 'image/jpeg',
			caption: 'Første'
		});
		const images = await listEventImages(db, eventId);
		expect(images).toHaveLength(1);
		expect(images[0].r2_key).toBe('events/fest/a.jpg');
		expect(images[0].caption).toBe('Første');
	});

	it('sorterer billeder efter sort_order', async () => {
		await addEventImage(db, { eventId, r2Key: 'events/fest/b.jpg', contentType: 'image/jpeg', sortOrder: 2 });
		await addEventImage(db, { eventId, r2Key: 'events/fest/a.jpg', contentType: 'image/jpeg', sortOrder: 1 });
		const images = await listEventImages(db, eventId);
		expect(images.map((i) => i.r2_key)).toEqual(['events/fest/a.jpg', 'events/fest/b.jpg']);
	});

	it('afviser en dublet-r2-nøgle', async () => {
		await addEventImage(db, { eventId, r2Key: 'events/fest/x.jpg', contentType: 'image/jpeg' });
		await expect(
			addEventImage(db, { eventId, r2Key: 'events/fest/x.jpg', contentType: 'image/jpeg' })
		).rejects.toThrow();
	});

	it('henter et enkelt billede på id', async () => {
		const img = await addEventImage(db, {
			eventId,
			r2Key: 'events/fest/y.jpg',
			contentType: 'image/jpeg'
		});
		const fetched = await getEventImage(db, img.id);
		expect(fetched?.r2_key).toBe('events/fest/y.jpg');
	});

	it('fjerner et billede og returnerer rækken', async () => {
		const img = await addEventImage(db, {
			eventId,
			r2Key: 'events/fest/z.jpg',
			contentType: 'image/jpeg'
		});
		const removed = await removeEventImage(db, img.id);
		expect(removed?.r2_key).toBe('events/fest/z.jpg');
		expect(await listEventImages(db, eventId)).toEqual([]);
	});

	it('returnerer null når et billede ikke findes ved fjernelse', async () => {
		expect(await removeEventImage(db, 999)).toBeNull();
	});

	it('fjerner tilhørende billeder når eventet slettes (cascade)', async () => {
		await addEventImage(db, { eventId, r2Key: 'events/fest/c.jpg', contentType: 'image/jpeg' });
		await deleteEvent(db, eventId);
		expect(await listEventImages(db, eventId)).toEqual([]);
	});
});
