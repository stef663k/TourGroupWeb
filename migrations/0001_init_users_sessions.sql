-- Der er kun én bruger (owner). Rækken har fast id = 1.
-- password_hash sættes med `npm run set-password` (se README).
CREATE TABLE IF NOT EXISTS users (
	id INTEGER PRIMARY KEY CHECK (id = 1),
	password_hash TEXT NOT NULL,
	created_at INTEGER NOT NULL DEFAULT (unixepoch())
);

-- Pladsholder-række, så login kan slå op. Hash'et udskiftes ved opsætning.
INSERT OR IGNORE INTO users (id, password_hash) VALUES (1, '');

-- Aktive sessioner. Cookien indeholder kun sessionens id (opaque token),
-- resten slås op her i databasen.
CREATE TABLE IF NOT EXISTS sessions (
	id TEXT PRIMARY KEY,
	user_id INTEGER NOT NULL,
	created_at INTEGER NOT NULL DEFAULT (unixepoch()),
	expires_at INTEGER NOT NULL,
	FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions (user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions (expires_at);
