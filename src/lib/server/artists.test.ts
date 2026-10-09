import { describe, it, expect, beforeEach } from 'vitest';
import { listArtists, createArtist, deleteArtist } from '$lib/server/db';

/**
 * Minimal in-memory D1-stub der understøtter de SQL-forespørgsler
 * artist-funktionerne i db.ts bruger.
 */
type FakeD1 = D1Database & { _events: { id: number; event_date: string | null }[] };

function createFakeD1(): FakeD1 {
	let nextId = 1;
	const rows: {
		id: number;
		name: string;
		years: string | null;
		event_id: number | null;
		created_at: number;
	}[] = [];
	const events: { id: number; event_date: string | null }[] = [];

	const prepare = (sql: string) => {
		let args: unknown[] = [];
		const normalized = () => sql.replace(/\s+/g, ' ').trim();

		const firstStatement = <T>() => {
			const q = normalized();
			if (q.startsWith('INSERT INTO artists (name, years, event_id) VALUES')) {
				const [name, years, event_id] = args as [string, string | null, number | null];
				const row = {
					id: nextId++,
					name,
					years,
					event_id,
					created_at: Math.floor(Date.now() / 1000)
				};
				rows.push(row);
				return row as T;
			}
			throw new Error(`Unsupported SQL in first(): ${q}`);
		};

		const allStatement = <T>() => {
			const q = normalized();
			if (
				q.startsWith(
					'SELECT artists.id, artists.name, artists.years, artists.event_id, artists.created_at FROM artists LEFT JOIN events'
				)
			) {
				const dateOf = (eventId: number | null) =>
					events.find((e) => e.id === eventId)?.event_date ?? null;
				const sorted = [...rows].sort((a, b) => {
					const aDate = dateOf(a.event_id);
					const bDate = dateOf(b.event_id);
					const aNull = aDate === null ? 1 : 0;
					const bNull = bDate === null ? 1 : 0;
					if (aNull !== bNull) return aNull - bNull;
					if (aDate !== bDate) return (bDate ?? '').localeCompare(aDate ?? '');
					return b.id - a.id;
				});
				return sorted as T[];
			}
			throw new Error(`Unsupported SQL in all(): ${q}`);
		};

		const runStatement = () => {
			const q = normalized();
			if (q.startsWith('DELETE FROM artists WHERE id')) {
				const [id] = args as [number];
				const idx = rows.findIndex((r) => r.id === id);
				if (idx >= 0) rows.splice(idx, 1);
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

	return { prepare, _events: events } as unknown as FakeD1;
}

describe('artists', () => {
	let db: D1Database;

	beforeEach(() => {
		db = createFakeD1();
	});

	it('starter uden rækker', async () => {
		expect(await listArtists(db)).toEqual([]);
	});

	it('opretter og læser en række med kun navn', async () => {
		const created = await createArtist(db, { name: 'Faustix' });
		expect(created.id).toBeGreaterThan(0);
		expect(created.name).toBe('Faustix');
		expect(created.years).toBeNull();
		expect(created.event_id).toBeNull();

		const rows = await listArtists(db);
		expect(rows).toHaveLength(1);
		expect(rows[0].name).toBe('Faustix');
	});

	it('gemmer valgfrit årsinterval', async () => {
		const created = await createArtist(db, { name: 'Aqua', years: '24-26' });
		expect(created.years).toBe('24-26');
	});

	it('sorterer efter tilknyttet events dato (nyeste først)', async () => {
		const fake = createFakeD1();
		fake._events.push(
			{ id: 1, event_date: '2024-01-01' },
			{ id: 2, event_date: '2026-01-01' }
		);
		await createArtist(fake, { name: 'Gammel', eventId: 1 });
		await createArtist(fake, { name: 'Ny', eventId: 2 });

		const rows = await listArtists(fake);
		expect(rows.map((r) => r.name)).toEqual(['Ny', 'Gammel']);
	});

	it('placerer artister uden tilknyttet event nederst', async () => {
		const fake = createFakeD1();
		fake._events.push({ id: 1, event_date: '2026-01-01' });
		await createArtist(fake, { name: 'Uden event' });
		await createArtist(fake, { name: 'Med event', eventId: 1 });

		const rows = await listArtists(fake);
		expect(rows.map((r) => r.name)).toEqual(['Med event', 'Uden event']);
	});

	it('placerer event uden dato sammen med dem uden event', async () => {
		const fake = createFakeD1();
		fake._events.push(
			{ id: 1, event_date: '2026-01-01' },
			{ id: 2, event_date: null }
		);
		await createArtist(fake, { name: 'Uden dato', eventId: 2 });
		await createArtist(fake, { name: 'Med dato', eventId: 1 });

		const rows = await listArtists(fake);
		expect(rows.map((r) => r.name)).toEqual(['Med dato', 'Uden dato']);
	});

	it('sletter en række', async () => {
		const created = await createArtist(db, { name: 'Slet mig' });
		await deleteArtist(db, created.id);
		expect(await listArtists(db)).toEqual([]);
	});
});
