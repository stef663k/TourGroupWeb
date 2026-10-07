-- Selected work: kunder/artister vi har arbejdet med. Holdes adskilt fra events,
-- så et navn her ikke skaber en dublet i events-tabellen.
-- years er et frit årsinterval (fx '22-24'); NULL = ikke angivet.
-- event_id peger valgfrit på et event, som pilen i listen kan linke til senere.
CREATE TABLE IF NOT EXISTS selected_work (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name TEXT NOT NULL,
	years TEXT,
	event_id INTEGER,
	created_at INTEGER NOT NULL DEFAULT (unixepoch()),
	FOREIGN KEY (event_id) REFERENCES events (id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_selected_work_event_id ON selected_work (event_id);

-- Seed med de rækker der tidligere var hardcodet på forsiden.
INSERT INTO selected_work (name, years) VALUES
	('Faustix', '22-24'),
	('Loveshop', '23-25'),
	('Aqua', '24-26'),
	('Artige ardit', '25-'),
	('Katinka', '26-'),
	('Who made who', '25-'),
	('Micheal williams', '26-');
