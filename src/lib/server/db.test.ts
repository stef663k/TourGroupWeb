import { describe, it, expect, beforeEach } from 'vitest';
import {
	OWNER_ID,
	getOwner,
	verifyOwnerPassword,
	setOwnerCredentials,
	createSession,
	isSessionValid,
	deleteSession,
	deleteExpiredSessions
} from '$lib/server/db';
import { SESSION_TTL_SECONDS } from '$lib/server/session';

/**
 * Minimal in-memory D1-stub der understøtter de SQL-forespørgsler db.ts bruger.
 */
function createFakeD1(): D1Database {
	const users = new Map<
		number,
		{ id: number; username: string; password_hash: string; created_at: number }
	>();
	const sessions: { id: string; user_id: number; created_at: number; expires_at: number }[] = [];

	const prepare = (sql: string) => {
		let args: unknown[] = [];
		const normalized = () => sql.replace(/\s+/g, ' ').trim();

		const runStatement = () => {
			const q = normalized();
			if (q.startsWith('INSERT INTO users')) {
				const [id, username, password_hash] = args as [number, string, string];
				users.set(id, {
					id,
					username,
					password_hash,
					created_at: users.get(id)?.created_at ?? Math.floor(Date.now() / 1000)
				});
				return { success: true };
			}
			if (q.startsWith('INSERT INTO sessions')) {
				const [id, user_id, created_at, expires_at] = args as [string, number, number, number];
				sessions.push({ id, user_id, created_at, expires_at });
				return { success: true };
			}
			if (q.startsWith('DELETE FROM sessions WHERE id')) {
				const [id] = args as [string];
				const idx = sessions.findIndex((s) => s.id === id);
				if (idx >= 0) sessions.splice(idx, 1);
				return { success: true };
			}
			if (q.startsWith('DELETE FROM sessions WHERE expires_at')) {
				const [now] = args as [number];
				for (let i = sessions.length - 1; i >= 0; i--) {
					if (sessions[i].expires_at <= now) sessions.splice(i, 1);
				}
				return { success: true };
			}
			throw new Error(`Unsupported SQL in run(): ${q}`);
		};

		const firstStatement = <T>() => {
			const q = normalized();
			if (q.startsWith('SELECT id, username, password_hash, created_at FROM users WHERE id')) {
				const [id] = args as [number];
				return (users.get(id) ?? null) as T | null;
			}
			if (q.startsWith('SELECT id, user_id, created_at, expires_at FROM sessions WHERE id')) {
				const [id] = args as [string];
				return (sessions.find((s) => s.id === id) ?? null) as T | null;
			}
			throw new Error(`Unsupported SQL in first(): ${q}`);
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
			}
		};
		return statement;
	};

	return { prepare } as unknown as D1Database;
}

describe('owner-bruger', () => {
	let db: D1Database;

	beforeEach(() => {
		db = createFakeD1();
	});

	it('returnerer null når der ikke er nogen owner', async () => {
		expect(await getOwner(db)).toBeNull();
	});

	it('sætter og læser owner-brugeren', async () => {
		await setOwnerCredentials(db, 'owner', 'hemmeligt');
		const owner = await getOwner(db);
		expect(owner?.id).toBe(OWNER_ID);
		expect(owner?.username).toBe('owner');
	});

	it('gemmer brugernavnet trimmet', async () => {
		await setOwnerCredentials(db, '  Owner  ', 'hemmeligt');
		const owner = await getOwner(db);
		expect(owner?.username).toBe('Owner');
	});

	it('verificerer den korrekte adgangskode', async () => {
		await setOwnerCredentials(db, 'owner', 'hemmeligt');
		expect(await verifyOwnerPassword(db, 'hemmeligt')).toBe(true);
	});

	it('afviser en forkert adgangskode', async () => {
		await setOwnerCredentials(db, 'owner', 'hemmeligt');
		expect(await verifyOwnerPassword(db, 'forkert')).toBe(false);
	});

	it('afviser når der ikke er sat en adgangskode', async () => {
		expect(await verifyOwnerPassword(db, 'hemmeligt')).toBe(false);
	});

	it('udskifter brugernavn og adgangskode ved gentaget opsætning', async () => {
		await setOwnerCredentials(db, 'gammelt', 'gammelt-pw');
		await setOwnerCredentials(db, 'nyt', 'nyt-pw');
		expect(await getOwner(db).then((o) => o?.username)).toBe('nyt');
		expect(await verifyOwnerPassword(db, 'nyt-pw')).toBe(true);
		expect(await verifyOwnerPassword(db, 'gammelt-pw')).toBe(false);
	});
});

describe('sessions', () => {
	let db: D1Database;

	beforeEach(async () => {
		db = createFakeD1();
		await setOwnerCredentials(db, 'owner', 'hemmeligt');
	});

	it('opretter en gyldig session', async () => {
		const sessionId = await createSession(db, SESSION_TTL_SECONDS);
		expect(typeof sessionId).toBe('string');
		expect(await isSessionValid(db, sessionId)).toBe(true);
	});

	it('afviser en ukendt session', async () => {
		expect(await isSessionValid(db, 'findes-ikke')).toBe(false);
	});

	it('afviser og sletter udløbne sessioner', async () => {
		const sessionId = await createSession(db, -10);
		expect(await isSessionValid(db, sessionId)).toBe(false);
		expect(await isSessionValid(db, sessionId)).toBe(false);
	});

	it('ugyldiggør en session ved logout', async () => {
		const sessionId = await createSession(db, SESSION_TTL_SECONDS);
		await deleteSession(db, sessionId);
		expect(await isSessionValid(db, sessionId)).toBe(false);
	});

	it('rydder udløbne sessioner op', async () => {
		const live = await createSession(db, SESSION_TTL_SECONDS);
		await createSession(db, -10);
		await deleteExpiredSessions(db);
		expect(await isSessionValid(db, live)).toBe(true);
	});
});
