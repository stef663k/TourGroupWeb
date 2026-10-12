-- Fjerner artists.event_id. Artistens tilknytning til et event findes nu den
-- anden vej (events.artist_id), og kolonnen kan derfor ikke længere sættes.
--
-- SQLite kan ikke DROP COLUMN på en kolonne der indgår i en foreign key
-- (event_id havde FOREIGN KEY ... REFERENCES events). Tabellen genopbygges
-- derfor: opret ny tabel uden kolonnen, kopiér data, drop den gamle, omdøb.
--
-- artist_links refererer artists(id) med ON DELETE CASCADE, så et DROP TABLE
-- artists ville slette alle links. Vi gemmer derfor link-rækkerne i en
-- midlertidig tabel og lægger dem tilbage bagefter. Det holder uanset om
-- foreign_keys-håndhævelsen er slået til eller fra.

CREATE TABLE artist_links_backup AS SELECT * FROM artist_links;

CREATE TABLE artists_new (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name TEXT NOT NULL,
	years TEXT,
	details TEXT,
	created_at INTEGER NOT NULL DEFAULT (unixepoch())
);

INSERT INTO artists_new (id, name, years, details, created_at)
	SELECT id, name, years, details, created_at FROM artists;

DROP TABLE artists;

ALTER TABLE artists_new RENAME TO artists;

DELETE FROM artist_links;

INSERT INTO artist_links (id, artist_id, label, url, sort_order, created_at)
	SELECT id, artist_id, label, url, sort_order, created_at FROM artist_links_backup;

DROP TABLE artist_links_backup;

DROP INDEX IF EXISTS idx_artists_event_id;
