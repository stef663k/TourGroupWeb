import { describe, it, expect, beforeEach } from 'vitest';
import { listSelectedWork, createSelectedWork, deleteSelectedWork } from '$lib/server/db';

/**
 * Minimal in-memory D1-stub der understøtter de SQL-forespørgsler
 * selected-work-funktionerne i db.ts bruger.
 */
function createFakeD1(): D1Database {
	let nextId = 1;
	const rows: {
		id: number;
		name: string;
		years: string | null;
		event_id: number | null;
		created_at: number;
	}[] = [];

	const prepare = (sql: string) => {
		let args: unknown[] = [];
		const normalized = () => sql.replace(/\s+/g, ' ').trim();

		const firstStatement = <T>() => {
			const q = normalized();
			if (
				q.startsWith(
					'INSERT INTO selected_work (name, years, event_id) VALUES'
				)
			) {
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
			if (q.startsWith('SELECT id, name, years, event_id, created_at FROM selected_work ORDER BY')) {
				return [...rows].sort((a, b) => b.id - a.id) as T[];
			}
			throw new Error(`Unsupported SQL in all(): ${q}`);
		};

		const runStatement = () => {
			const q = normalized();
			if (q.startsWith('DELETE FROM selected_work WHERE id')) {
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

	return { prepare } as unknown as D1Database;
}

describe('selected work', () => {
	let db: D1Database;

	beforeEach(() => {
		db = createFakeD1();
	});

	it('starter uden rækker', async () => {
		expect(await listSelectedWork(db)).toEqual([]);
	});

	it('opretter og læser en række med kun navn', async () => {
		const created = await createSelectedWork(db, { name: 'Faustix' });
		expect(created.id).toBeGreaterThan(0);
		expect(created.name).toBe('Faustix');
		expect(created.years).toBeNull();
		expect(created.event_id).toBeNull();

		const rows = await listSelectedWork(db);
		expect(rows).toHaveLength(1);
		expect(rows[0].name).toBe('Faustix');
	});

	it('gemmer valgfrit årsinterval', async () => {
		const created = await createSelectedWork(db, { name: 'Aqua', years: '24-26' });
		expect(created.years).toBe('24-26');
	});

	it('sorterer med nyeste række først', async () => {
		await createSelectedWork(db, { name: 'Første' });
		await createSelectedWork(db, { name: 'Anden' });
		const rows = await listSelectedWork(db);
		expect(rows.map((r) => r.name)).toEqual(['Anden', 'Første']);
	});

	it('sletter en række', async () => {
		const created = await createSelectedWork(db, { name: 'Slet mig' });
		await deleteSelectedWork(db, created.id);
		expect(await listSelectedWork(db)).toEqual([]);
	});
});
