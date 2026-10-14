import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { checkRateLimit } from './rate-limit';

/**
 * In-memory D1-stub der understøtter login_attempts-upserten og oprydningen.
 * Tælleren er pr. (key, window_start).
 */
function createFakeD1() {
	const rows = new Map<string, number>(); // `${key}|${windowStart}` -> attempts

	const prepare = (sql: string) => {
		let args: unknown[] = [];
		const q = sql.replace(/\s+/g, ' ').trim();

		const statement = {
			bind(...values: unknown[]) {
				args = values;
				return statement;
			},
			async first<T>() {
				if (q.startsWith('INSERT INTO login_attempts')) {
					const [key, windowStart] = args as [string, number];
					const id = `${key}|${windowStart}`;
					const next = (rows.get(id) ?? 0) + 1;
					rows.set(id, next);
					return { attempts: next } as T;
				}
				throw new Error(`Unsupported SQL in first(): ${q}`);
			},
			async run() {
				if (q.startsWith('DELETE FROM login_attempts')) {
					const [windowStart] = args as [number];
					for (const id of [...rows.keys()]) {
						const ws = Number(id.split('|')[1]);
						if (ws < windowStart) rows.delete(id);
					}
					return { success: true };
				}
				throw new Error(`Unsupported SQL in run(): ${q}`);
			}
		};
		return statement;
	};

	return { db: { prepare } as unknown as D1Database, rows };
}

describe('checkRateLimit', () => {
	beforeEach(() => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date('2026-01-01T00:00:00Z'));
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('tillader forsøg op til og med grænsen', async () => {
		const { db } = createFakeD1();
		for (let i = 1; i <= 5; i++) {
			const result = await checkRateLimit(db, 'ip-1', 5, 60);
			expect(result.success).toBe(true);
			expect(result.attempts).toBe(i);
		}
	});

	it('afviser når grænsen overskrides', async () => {
		const { db } = createFakeD1();
		for (let i = 0; i < 5; i++) {
			await checkRateLimit(db, 'ip-1', 5, 60);
		}
		const result = await checkRateLimit(db, 'ip-1', 5, 60);
		expect(result.success).toBe(false);
		expect(result.attempts).toBe(6);
	});

	it('holder separate tællere pr. nøgle', async () => {
		const { db } = createFakeD1();
		for (let i = 0; i < 5; i++) {
			await checkRateLimit(db, 'ip-1', 5, 60);
		}
		const other = await checkRateLimit(db, 'ip-2', 5, 60);
		expect(other.success).toBe(true);
		expect(other.attempts).toBe(1);
	});

	it('nulstiller tælleren når vinduet udløber', async () => {
		const { db } = createFakeD1();
		for (let i = 0; i < 6; i++) {
			await checkRateLimit(db, 'ip-1', 5, 60);
		}
		// Flyt tiden ind i næste vindue (60s).
		vi.setSystemTime(new Date('2026-01-01T00:01:01Z'));
		const result = await checkRateLimit(db, 'ip-1', 5, 60);
		expect(result.success).toBe(true);
		expect(result.attempts).toBe(1);
	});

	it('rapporterer resetAt i fremtiden', async () => {
		const { db } = createFakeD1();
		const now = Math.floor(Date.now() / 1000);
		const result = await checkRateLimit(db, 'ip-1', 5, 60);
		expect(result.resetAt).toBeGreaterThan(now);
		expect(result.resetAt - now).toBeLessThanOrEqual(60);
	});
});
