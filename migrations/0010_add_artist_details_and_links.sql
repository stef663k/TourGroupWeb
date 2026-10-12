-- Uddybende tekst om en artist (vises i artistmodalen).
-- NULL = ingen tekst skrevet endnu.
ALTER TABLE artists ADD COLUMN details TEXT;

-- Links knyttet til en artist (fx hjemmeside, Spotify, Instagram).
-- label er den viste tekst, url er den faktiske adresse.
CREATE TABLE IF NOT EXISTS artist_links (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	artist_id INTEGER NOT NULL,
	label TEXT NOT NULL,
	url TEXT NOT NULL,
	sort_order INTEGER NOT NULL DEFAULT 0,
	created_at INTEGER NOT NULL DEFAULT (unixepoch()),
	FOREIGN KEY (artist_id) REFERENCES artists (id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_artist_links_artist_id ON artist_links (artist_id);
