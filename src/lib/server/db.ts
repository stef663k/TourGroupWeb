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
	link_label: string | null;
	artist_id: number | null;
	created_at: number;
	}

	export interface EventImageRow {
	id: number;
	event_id: number;
	r2_key: string;
	caption: string | null;
	alt: string | null;
	content_type: string;
	sort_order: number;
	is_cover: number;
	created_at: number;
	}

export interface EventWithImages extends EventRow {
	images: EventImageRow[];
}

export interface ArtistRow {
	id: number;
	name: string;
	years: string | null;
	details: string | null;
	image_key: string | null;
	image_content_type: string | null;
	image_alt: string | null;
	sort_order: number;
	created_at: number;
}

export interface ArtistLinkRow {
	id: number;
	artist_id: number;
	label: string;
	url: string;
	sort_order: number;
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

export interface CompanyRow {
	id: number;
	name: string;
	link: string | null;
	created_at: number;
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
			'SELECT id, slug, name, event_date, location, description, details, link, link_label, artist_id, created_at FROM events ' +
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
			'SELECT id, slug, name, event_date, location, description, details, link, link_label, artist_id, created_at FROM events WHERE id = ?1'
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
		linkLabel?: string | null;
		artistId?: number | null;
		}
		): Promise<EventRow> {
		const result = await db
		.prepare(
		'INSERT INTO events (slug, name, event_date, location, description, details, link, link_label, artist_id) ' +
		'VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9) RETURNING id, slug, name, event_date, location, description, details, link, link_label, artist_id, created_at'
		)
		.bind(
		input.slug,
		input.name,
		input.eventDate ?? null,
		input.location ?? null,
		input.description ?? null,
		input.details ?? null,
		input.link ?? null,
		input.linkLabel ?? null,
		input.artistId ?? null
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
		linkLabel?: string | null;
		artistId?: number | null;
		}
		): Promise<EventRow | null> {
		const result = await db
		.prepare(
			'UPDATE events SET slug = ?1, name = ?2, event_date = ?3, location = ?4, description = ?5, details = ?6, link = ?7, link_label = ?8, artist_id = ?9 ' +
				'WHERE id = ?10 RETURNING id, slug, name, event_date, location, description, details, link, link_label, artist_id, created_at'
		)
		.bind(
			input.slug,
			input.name,
			input.eventDate ?? null,
			input.location ?? null,
			input.description ?? null,
			input.details ?? null,
			input.link ?? null,
			input.linkLabel ?? null,
			input.artistId ?? null,
			id
			)
			.first<EventRow>();
			return result ?? null;
			}

			/**
			 * Henter alle artists i den rækkefølge ejeren har sat på forsiden
			 * (lavest sort_order først). Ved lige sort_order sorteres efter id, så
			 * rækkefølgen er stabil.
			 */
			export async function listArtists(db: D1Database): Promise<ArtistRow[]> {
				const result = await db
					.prepare(
						'SELECT id, name, years, details, image_key, image_content_type, image_alt, sort_order, created_at ' +
							'FROM artists ORDER BY sort_order, id'
					)
					.all<ArtistRow>();
				return result.results;
			}

			/**
			 * Slår en artist-række op på id. Returnerer null hvis den ikke findes.
			 */
			export async function getArtist(db: D1Database, id: number): Promise<ArtistRow | null> {
				const row = await db
					.prepare(
						'SELECT id, name, years, details, image_key, image_content_type, image_alt, sort_order, created_at FROM artists WHERE id = ?1'
					)
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
				input: { name: string; years?: string | null }
			): Promise<ArtistRow | null> {
				const result = await db
					.prepare(
						'UPDATE artists SET name = ?1, years = ?2 ' +
							'WHERE id = ?3 RETURNING id, name, years, details, image_key, image_content_type, image_alt, sort_order, created_at'
					)
					.bind(input.name, input.years ?? null, id)
					.first<ArtistRow>();
				return result ?? null;
			}

			/**
			 * Opretter en artist-række og returnerer den. Nye artister lægges nederst
			 * i den manuelt sorterede liste.
			 */
			export async function createArtist(
				db: D1Database,
				input: { name: string; years?: string | null }
			): Promise<ArtistRow> {
				const result = await db
					.prepare(
						'INSERT INTO artists (name, years, sort_order) ' +
							'VALUES (?1, ?2, (SELECT COALESCE(MAX(sort_order) + 1, 0) FROM artists)) ' +
							'RETURNING id, name, years, details, image_key, image_content_type, image_alt, sort_order, created_at'
					)
					.bind(input.name, input.years ?? null)
					.first<ArtistRow>();
				if (!result) throw new Error('Could not create artist.');
				return result;
			}

			/**
			 * Gemmer en ny rækkefølge for artisterne. `orderedIds` er alle artist-id'er
			 * i den ønskede visningsrækkefølge; hver række får sort_order = sin placering.
			 */
			export async function reorderArtists(db: D1Database, orderedIds: number[]): Promise<void> {
				if (orderedIds.length === 0) return;
				const statements = orderedIds.map((id, index) =>
					db.prepare('UPDATE artists SET sort_order = ?1 WHERE id = ?2').bind(index, id)
				);
				await db.batch(statements);
			}

/**
 * Opdaterer den uddybende tekst (details) på en artist og returnerer rækken.
 * Returnerer null hvis rækken ikke findes.
 */
export async function updateArtistDetails(
	db: D1Database,
	id: number,
	details: string | null
): Promise<ArtistRow | null> {
	const result = await db
		.prepare(
			'UPDATE artists SET details = ?1 ' +
				'WHERE id = ?2 RETURNING id, name, years, details, image_key, image_content_type, image_alt, sort_order, created_at'
		)
		.bind(details, id)
		.first<ArtistRow>();
	return result ?? null;
	}

/**
 * Sætter (eller rydder) profilbilledet på en artist og returnerer rækken.
 * Returnerer null hvis rækken ikke findes. Send null for at fjerne billedet.
 * `alt` overskriver alt-teksten når den er angivet; ellers bevares den.
 */
export async function updateArtistImage(
	db: D1Database,
	id: number,
	image: { r2Key: string; contentType: string; alt?: string | null } | null
): Promise<ArtistRow | null> {
	const result = await db
		.prepare(
			'UPDATE artists SET image_key = ?1, image_content_type = ?2, ' +
				'image_alt = CASE WHEN ?3 IS NULL THEN image_alt ELSE ?3 END ' +
				'WHERE id = ?4 RETURNING id, name, years, details, image_key, image_content_type, image_alt, sort_order, created_at'
		)
		.bind(image?.r2Key ?? null, image?.contentType ?? null, image?.alt ?? null, id)
		.first<ArtistRow>();
	return result ?? null;
}

/**
 * Opdaterer alt-teksten på en artists profilbillede og returnerer rækken.
 * Returnerer null hvis rækken ikke findes. Send null for at rydde alt-teksten.
 */
export async function updateArtistImageAlt(
	db: D1Database,
	id: number,
	alt: string | null
): Promise<ArtistRow | null> {
	const result = await db
		.prepare(
			'UPDATE artists SET image_alt = ?1 ' +
				'WHERE id = ?2 RETURNING id, name, years, details, image_key, image_content_type, image_alt, sort_order, created_at'
		)
		.bind(alt, id)
		.first<ArtistRow>();
	return result ?? null;
}

/**
 * Sletter en artist-række. Tilhørende links fjernes via ON DELETE CASCADE.
 */
export async function deleteArtist(db: D1Database, id: number): Promise<void> {
	await db.prepare('DELETE FROM artists WHERE id = ?1').bind(id).run();
}

/**
 * Henter alle links for en artist sorteret efter sort_order.
 */
export async function listArtistLinks(
	db: D1Database,
	artistId: number
): Promise<ArtistLinkRow[]> {
	const result = await db
		.prepare(
			'SELECT id, artist_id, label, url, sort_order, created_at ' +
				'FROM artist_links WHERE artist_id = ?1 ORDER BY sort_order, id'
		)
		.bind(artistId)
		.all<ArtistLinkRow>();
	return result.results;
}

/**
 * Henter et enkelt artist-link på id.
 */
export async function getArtistLink(
	db: D1Database,
	id: number
): Promise<ArtistLinkRow | null> {
	const row = await db
		.prepare(
			'SELECT id, artist_id, label, url, sort_order, created_at ' +
				'FROM artist_links WHERE id = ?1'
		)
		.bind(id)
		.first<ArtistLinkRow>();
	return row ?? null;
}

/**
 * Tilføjer et link til en artist og returnerer rækken.
 */
export async function addArtistLink(
	db: D1Database,
	input: { artistId: number; label: string; url: string; sortOrder?: number }
): Promise<ArtistLinkRow> {
	const result = await db
		.prepare(
			'INSERT INTO artist_links (artist_id, label, url, sort_order) ' +
				'VALUES (?1, ?2, ?3, ?4) ' +
				'RETURNING id, artist_id, label, url, sort_order, created_at'
		)
		.bind(input.artistId, input.label, input.url, input.sortOrder ?? 0)
		.first<ArtistLinkRow>();
	if (!result) throw new Error('Could not add artist link.');
	return result;
}

/**
 * Fjerner et artist-link og returnerer den slettede række.
 * Returnerer null hvis rækken ikke findes.
 */
export async function removeArtistLink(
	db: D1Database,
	id: number
): Promise<ArtistLinkRow | null> {
	const row = await getArtistLink(db, id);
	if (!row) return null;
	await db.prepare('DELETE FROM artist_links WHERE id = ?1').bind(id).run();
	return row;
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
		alt?: string | null;
		contentType: string;
		sortOrder?: number;
		isCover?: boolean;
	}
): Promise<EventImageRow> {
	const result = await db
		.prepare(
			'INSERT INTO event_images (event_id, r2_key, caption, alt, content_type, sort_order, is_cover) ' +
				'VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7) ' +
				'RETURNING id, event_id, r2_key, caption, alt, content_type, sort_order, is_cover, created_at'
		)
		.bind(
			input.eventId,
			input.r2Key,
			input.caption ?? null,
			input.alt ?? null,
			input.contentType,
			input.sortOrder ?? 0,
			input.isCover ? 1 : 0
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
			'SELECT id, event_id, r2_key, caption, alt, content_type, sort_order, is_cover, created_at ' +
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
			'SELECT id, event_id, r2_key, caption, alt, content_type, sort_order, is_cover, created_at ' +
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
 * Opdaterer et billedes R2-nøgle og indholdstype, fx når cover-billedet
 * udskiftes med en ny fil (ny nøgle pga. evt. anden filendelse).
 * Returnerer den opdaterede række eller null hvis billedet ikke findes.
 */
export async function updateEventImage(
	db: D1Database,
	id: number,
	input: { r2Key: string; contentType: string }
): Promise<EventImageRow | null> {
	const result = await db
		.prepare(
			'UPDATE event_images SET r2_key = ?1, content_type = ?2 WHERE id = ?3 ' +
				'RETURNING id, event_id, r2_key, caption, alt, content_type, sort_order, is_cover, created_at'
		)
		.bind(input.r2Key, input.contentType, id)
		.first<EventImageRow>();
	return result ?? null;
}

/**
 * Opdaterer alt-teksten på et billede og returnerer rækken.
 * Returnerer null hvis billedet ikke findes. Send null for at rydde alt-teksten.
 */
export async function updateEventImageAlt(
	db: D1Database,
	id: number,
	alt: string | null
): Promise<EventImageRow | null> {
	const result = await db
		.prepare(
			'UPDATE event_images SET alt = ?1 WHERE id = ?2 ' +
				'RETURNING id, event_id, r2_key, caption, alt, content_type, sort_order, is_cover, created_at'
		)
		.bind(alt, id)
		.first<EventImageRow>();
	return result ?? null;
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
 * aldrig fejler på en tom tabel. Felter der ikke er angivet (undefined),
 * bevares — så hver sektion kan opdateres uafhængigt af den anden.
 */
export async function updateAbout(
	db: D1Database,
	input: { aboutMe?: string | null; whatICanDo?: string | null }
): Promise<AboutRow> {
	const columns: string[] = ['id'];
	const values: (string | number | null)[] = [ABOUT_ID];
	const updates: string[] = ['updated_at = unixepoch()'];

	if (input.aboutMe !== undefined) {
		columns.push('about_me');
		values.push(input.aboutMe);
		updates.push('about_me = excluded.about_me');
	}
	if (input.whatICanDo !== undefined) {
		columns.push('what_i_can_do');
		values.push(input.whatICanDo);
		updates.push('what_i_can_do = excluded.what_i_can_do');
	}

	const placeholders = columns.map((_, i) => `?${i + 1}`).join(', ');

	const result = await db
		.prepare(
			`INSERT INTO about (${columns.join(', ')}) VALUES (${placeholders}) ` +
				`ON CONFLICT (id) DO UPDATE SET ${updates.join(', ')} ` +
				'RETURNING id, about_me, what_i_can_do, updated_at'
		)
		.bind(...values)
		.first<AboutRow>();
	if (!result) throw new Error('Could not update about content.');
	return result;
}

/**
 * Henter alle virksomheder sorteret efter navn.
 */
export async function listCompanies(db: D1Database): Promise<CompanyRow[]> {
	const result = await db
		.prepare('SELECT id, name, link, created_at FROM companies ORDER BY name COLLATE NOCASE, id')
		.all<CompanyRow>();
	return result.results;
}

/**
 * Slår en virksomhed op på id. Returnerer null hvis den ikke findes.
 */
export async function getCompany(db: D1Database, id: number): Promise<CompanyRow | null> {
	const row = await db
		.prepare('SELECT id, name, link, created_at FROM companies WHERE id = ?1')
		.bind(id)
		.first<CompanyRow>();
	return row ?? null;
}

/**
 * Opretter en virksomhed og returnerer rækken.
 */
export async function createCompany(
	db: D1Database,
	input: { name: string; link?: string | null }
): Promise<CompanyRow> {
	const result = await db
		.prepare(
			'INSERT INTO companies (name, link) VALUES (?1, ?2) RETURNING id, name, link, created_at'
		)
		.bind(input.name, input.link ?? null)
		.first<CompanyRow>();
	if (!result) throw new Error('Could not create company.');
	return result;
}

/**
 * Opdaterer en virksomhed og returnerer den opdaterede række.
 * Returnerer null hvis rækken ikke findes.
 */
export async function updateCompany(
	db: D1Database,
	id: number,
	input: { name: string; link?: string | null }
): Promise<CompanyRow | null> {
	const result = await db
		.prepare(
			'UPDATE companies SET name = ?1, link = ?2 WHERE id = ?3 RETURNING id, name, link, created_at'
		)
		.bind(input.name, input.link ?? null, id)
		.first<CompanyRow>();
	return result ?? null;
}

/**
 * Sletter en virksomhed.
 */
export async function deleteCompany(db: D1Database, id: number): Promise<void> {
	await db.prepare('DELETE FROM companies WHERE id = ?1').bind(id).run();
}
