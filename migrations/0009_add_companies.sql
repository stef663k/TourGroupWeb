-- Virksomheder som Tour Group samarbejder med ("Working with companies").
-- link er en valgfri URL, som virksomhedsnavnet linker til (fx virksomhedens
-- hjemmeside). NULL = ingen URL endnu.
CREATE TABLE IF NOT EXISTS companies (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name TEXT NOT NULL,
	link TEXT,
	created_at INTEGER NOT NULL DEFAULT (unixepoch())
);

-- Seed med de virksomheder der tidligere var hardcodet på forsiden.
-- Linket efterlades tomt, så det kan udfyldes via UI'et.
INSERT INTO companies (name) VALUES
	('Nordic Rentals'),
	('Profox'),
	('Eventsuply/Showtech'),
	('Dr Koncerthuset'),
	('Tivoli Kongresscenter'),
	('Bella Center');
