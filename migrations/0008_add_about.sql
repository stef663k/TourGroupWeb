-- Redigerbart indhold til About-siden. Der findes kun én række (id = 1),
-- ligesom owner-brugeren i users. Begge sektioner ("About me" og
-- "What I can do") gemmes i samme tabel, da de altid opdateres sammen.
CREATE TABLE IF NOT EXISTS about (
	id INTEGER PRIMARY KEY CHECK (id = 1),
	about_me TEXT,
	what_i_can_do TEXT,
	updated_at INTEGER NOT NULL DEFAULT (unixepoch())
);

-- Seed den ene række, så opslag altid kan finde den.
INSERT OR IGNORE INTO about (id, about_me, what_i_can_do) VALUES (1, NULL, NULL);
