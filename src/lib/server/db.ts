import { hashPassword, verifyPassword } from './password';

/** Der er kun én bruger (owner), og rækken har altid id = 1. */
export const OWNER_ID = 1;

export interface UserRow {
	id: number;
	username: string;
	password_hash: string;
	created_at: number;
}

export interface SessionRow {
	id: string;
	user_id: number;
	created_at: number;
	expires_at: number;
}

export interface EventRow {
	id: number;
	slug: string;
	name: string;
	event_date: string | null;
	location: string | null;
	description: string | null;
	details: string | null;
	link: string | null;
	created_at: number;
}

export interface EventImageRow {
	id: number;
	event_id: number;
	r2_key: string;
	caption: string | null;
	content_type: string;
	sort_order: number;
	created_at: number;
}

export interface EventWithImages extends EventRow {
	images: EventImageRow[];
}

export interface ArtistRow {
	id: number;
	name: string;
	years: string | null;
	event_id: number | null;
	created_at: number;
}

/** Der er kun én about-række, og den har altid id = 1. */
export const ABOUT_ID = 1;

export interface AboutRow {
	id: number;
	about_me: string | null;
	what_i_can_do: string | null;
	updated_at: number;
}

/**
 * Slår owner-rækken op. Returnerer null hvis den ikke findes.
 */
export async function getOwner(db: D1Database): Promise<UserRow | null> {
	const result = await db
		.prepare('SELECT id, username, password_hash, created_at FROM users WHERE id = ?1')
		.bind(OWNER_ID)
		.first<UserRow>();
	return result ?? null;
}

/**
 * Verificerer adgangskoden mod owner-hash'et i databasen.
 * Returnerer true hvis kodeordet er korrekt.
 */
export async function verifyOwnerPassword(db: D1Database, password: string): Promise<boolean> {
	const owner = await getOwner(db);
	if (!owner) return false;
	return verifyPassword(password, owner.password_hash);
}

/**
 * Sætter (eller udskifter) owner-brugerens brugernavn og adgangskode.
 * Bruges ved opsætning.
 */
export async function setOwnerCredentials(
	db: D1Database,
	username: string,
	password: string
): Promise<void> {
	const passwordHash = await hashPassword(password);
	await db
		.prepare(
			'INSERT INTO users (id, username, password_hash) VALUES (?1, ?2, ?3) ' +
				'ON CONFLICT (id) DO UPDATE SET username = excluded.username, password_hash = excluded.password_hash'
		)
		.bind(OWNER_ID, username.trim(), passwordHash)
		.run();
}

/**
 * Opretter en ny session og returnerer dens id (opaque token til cookien).
 */
export async function createSession(
	db: D1Database,
	ttlSeconds: number
): Promise<string> {
	const id = crypto.randomUUID();
	const now = Math.floor(Date.now() / 1000);
	const expiresAt = now + ttlSeconds;
	await db
		.prepare(
			'INSERT INTO sessions (id, user_id, created_at, expires_at) VALUES (?1, ?2, ?3, ?4)'
		)
		.bind(id, OWNER_ID, now, expiresAt)
		.run();
	return id;
}

/**
 * Returnerer true hvis sessionen findes og ikke er udløbet.
 * Udløbne sessioner slettes undervejs.
 */
export async function isSessionValid(db: D1Database, sessionId: string): Promise<boolean> {
	const now = Math.floor(Date.now() / 1000);
	const session = await db
		.prepare('SELECT id, user_id, created_at, expires_at FROM sessions WHERE id = ?1')
		.bind(sessionId)
		.first<SessionRow>();

	if (!session) return false;

	if (session.expires_at <= now) {
		await db.prepare('DELETE FROM sessions WHERE id = ?1').bind(sessionId).run();
		return false;
	}

	return true;
}

/**
 * Sletter en session (logout).
 */
export async function deleteSession(db: D1Database, sessionId: string): Promise<void> {
	await db.prepare('DELETE FROM sessions WHERE id = ?1').bind(sessionId).run();
}

/**
 * Fjerner alle udløbne sessioner.
 */
export async function deleteExpiredSessions(db: D1Database): Promise<void> {
	const now = Math.floor(Date.now() / 1000);
	await db.prepare('DELETE FROM sessions WHERE expires_at <= ?1').bind(now).run();
}

/**
 * Henter alle events sorteret med nyeste dato først. Events uden dato
 * (event_date IS NULL) sorteres sidst.
 */
export async function listEvents(db: D1Database): Promise<EventRow[]> {
	const result = await db
		.prepare(
			'SELECT id, slug, name, event_date, location, description, details, link, created_at FROM events ' +
				'ORDER BY (event_date IS NULL), event_date DESC, id DESC'
		)
		.all<EventRow>();
	return result.results;
}

/**
 * Slår et enkelt event op på id. Returnerer null hvis det ikke findes.
 */
export async function getEvent(db: D1Database, id: number): Promise<EventRow | null> {
	const row = await db
		.prepare(
			'SELECT id, slug, name, event_date, location, description, details, link, created_at FROM events WHERE id = ?1'
		)
		.bind(id)
		.first<EventRow>();
	return row ?? null;
}

/**
 * Opretter et event og returnerer rækken. `slug` skal være unik;
 * et brud på unikhedsmæssige kast videre til kalderen.
 */
export async function createEvent(
	db: D1Database,
	input: {
		slug: string;
		name: string;
		eventDate?: string | null;
		location?: string | null;
		description?: string | null;
		details?: string | null;
		link?: string | null;
	}
	): Promise<EventRow> {
	const result = await db
		.prepare(
			'INSERT INTO events (slug, name, event_date, location, description, details, link) ' +
				'VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7) RETURNING id, slug, name, event_date, location, description, details, link, created_at'
		)
		.bind(
			input.slug,
			input.name,
			input.eventDate ?? null,
			input.location ?? null,
			input.description ?? null,
			input.details ?? null,
			input.link ?? null
		)
		.first<EventRow>();
	if (!result) throw new Error('Could not create event.');
	return result;
	}

	/**
	* Opdaterer et event og returnerer den opdaterede række.
	* Returnerer null hvis eventet ikke findes. `slug` skal være unik.
	*/
	export async function updateEvent(
	db: D1Database,
	id: number,
	input: {
		slug: string;
		name: string;
		eventDate?: string | null;
		location?: string | null;
		description?: string | null;
		details?: string | null;
		link?: string | null;
	}
	): Promise<EventRow | null> {
	const result = await db
		.prepare(
			'UPDATE events SET slug = ?1, name = ?2, event_date = ?3, location = ?4, description = ?5, details = ?6, link = ?7 ' +
				'WHERE id = ?8 RETURNING id, slug, name, event_date, location, description, details, link, created_at'
		)
		.bind(
			input.slug,
			input.name,
			input.eventDate ?? null,
			input.location ?? null,
			input.description ?? null,
			input.details ?? null,
			input.link ?? null,
			id
		)
		.first<EventRow>();
	return result ?? null;
	}

/**
 * Henter alle artists sorteret efter deres tilknyttede events dato (nyeste først).
 * Artister uden et tilknyttet event (eller hvor eventet mangler en dato) ligger
 * nederst. Ved lige datoer sorteres efter id, så rækkefølgen er stabil.
 */
export async function listArtists(db: D1Database): Promise<ArtistRow[]> {
	const result = await db
		.prepare(
			'SELECT artists.id, artists.name, artists.years, artists.event_id, artists.created_at ' +
				'FROM artists LEFT JOIN events ON events.id = artists.event_id ' +
				"ORDER BY (events.event_date IS NULL), events.event_date DESC, artists.id DESC"
		)
		.all<ArtistRow>();
	return result.results;
}

/**
 * Slår en artist-række op på id. Returnerer null hvis den ikke findes.
 */
export async function getArtist(db: D1Database, id: number): Promise<ArtistRow | null> {
	const row = await db
		.prepare('SELECT id, name, years, event_id, created_at FROM artists WHERE id = ?1')
		.bind(id)
		.first<ArtistRow>();
	return row ?? null;
}

/**
 * Opdaterer en artist-række og returnerer den opdaterede række.
 * Returnerer null hvis rækken ikke findes.
 */
export async function updateArtist(
	db: D1Database,
	id: number,
	input: { name: string; years?: string | null; eventId?: number | null }
): Promise<ArtistRow | null> {
	const result = await db
		.prepare(
			'UPDATE artists SET name = ?1, years = ?2, event_id = ?3 ' +
				'WHERE id = ?4 RETURNING id, name, years, event_id, created_at'
		)
		.bind(input.name, input.years ?? null, input.eventId ?? null, id)
		.first<ArtistRow>();
	return result ?? null;
}

/**
 * Opretter en artist-række og returnerer den.
 */
export async function createArtist(
	db: D1Database,
	input: { name: string; years?: string | null; eventId?: number | null }
): Promise<ArtistRow> {
	const result = await db
		.prepare(
			'INSERT INTO artists (name, years, event_id) ' +
				'VALUES (?1, ?2, ?3) RETURNING id, name, years, event_id, created_at'
		)
		.bind(input.name, input.years ?? null, input.eventId ?? null)
		.first<ArtistRow>();
	if (!result) throw new Error('Could not create artist.');
	return result;
}

/**
 * Sletter en artist-række.
 */
export async function deleteArtist(db: D1Database, id: number): Promise<void> {
	await db.prepare('DELETE FROM artists WHERE id = ?1').bind(id).run();
}

/**
 * Sletter et event. Tilhørende billedrækker fjernes via ON DELETE CASCADE.
 * Bemærk: R2-objekterne slettes IKKE her — det skal gøres særskilt.
 */
export async function deleteEvent(db: D1Database, id: number): Promise<void> {
	await db.prepare('DELETE FROM events WHERE id = ?1').bind(id).run();
}

/**
 * Tilføjer en billedrække for et event og returnerer rækken.
 */
export async function addEventImage(
	db: D1Database,
	input: {
		eventId: number;
		r2Key: string;
		caption?: string | null;
		contentType: string;
		sortOrder?: number;
	}
): Promise<EventImageRow> {
	const result = await db
		.prepare(
			'INSERT INTO event_images (event_id, r2_key, caption, content_type, sort_order) ' +
				'VALUES (?1, ?2, ?3, ?4, ?5) ' +
				'RETURNING id, event_id, r2_key, caption, content_type, sort_order, created_at'
		)
		.bind(
			input.eventId,
			input.r2Key,
			input.caption ?? null,
			input.contentType,
			input.sortOrder ?? 0
		)
		.first<EventImageRow>();
	if (!result) throw new Error('Could not add image.');
	return result;
}

/**
 * Henter alle billeder for et event sorteret efter sort_order.
 */
export async function listEventImages(
	db: D1Database,
	eventId: number
): Promise<EventImageRow[]> {
	const result = await db
		.prepare(
			'SELECT id, event_id, r2_key, caption, content_type, sort_order, created_at ' +
				'FROM event_images WHERE event_id = ?1 ORDER BY sort_order, id'
		)
		.bind(eventId)
		.all<EventImageRow>();
	return result.results;
}

/**
 * Henter et enkelt billede på id.
 */
export async function getEventImage(
	db: D1Database,
	id: number
): Promise<EventImageRow | null> {
	const row = await db
		.prepare(
			'SELECT id, event_id, r2_key, caption, content_type, sort_order, created_at ' +
				'FROM event_images WHERE id = ?1'
		)
		.bind(id)
		.first<EventImageRow>();
	return row ?? null;
}

/**
 * Fjerner en billedrække og returnerer den, så kalderen kan slette
 * det tilhørende R2-objekt bagefter. Returnerer null hvis rækken ikke findes.
 */
export async function removeEventImage(
	db: D1Database,
	id: number
): Promise<EventImageRow | null> {
	const row = await getEventImage(db, id);
	if (!row) return null;
	await db.prepare('DELETE FROM event_images WHERE id = ?1').bind(id).run();
	return row;
}

/**
 * Slår about-rækken op (id = 1). Returnerer null hvis den ikke findes.
 * Bemærk at migrationen seeder rækken, så den normalt altid findes.
 */
export async function getAbout(db: D1Database): Promise<AboutRow | null> {
	const row = await db
		.prepare('SELECT id, about_me, what_i_can_do, updated_at FROM about WHERE id = ?1')
		.bind(ABOUT_ID)
		.first<AboutRow>();
	return row ?? null;
}

/**
 * Opdaterer about-rækken. Opretter rækken hvis den mangler, så opslag
 * aldrig fejler på en tom tabel.
 */
export async function updateAbout(
	db: D1Database,
	input: { aboutMe?: string | null; whatICanDo?: string | null }
): Promise<AboutRow> {
	const result = await db
		.prepare(
			'INSERT INTO about (id, about_me, what_i_can_do, updated_at) VALUES (?1, ?2, ?3, unixepoch()) ' +
				'ON CONFLICT (id) DO UPDATE SET about_me = excluded.about_me, what_i_can_do = excluded.what_i_can_do, updated_at = unixepoch() ' +
				'RETURNING id, about_me, what_i_can_do, updated_at'
		)
		.bind(ABOUT_ID, input.aboutMe ?? null, input.whatICanDo ?? null)
		.first<AboutRow>();
	if (!result) throw new Error('Could not update about content.');
	return result;
}
