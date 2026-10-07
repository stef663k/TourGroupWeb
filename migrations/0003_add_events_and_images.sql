-- Events som Tour Group har produceret. Hvert event er forældre til sine billeder.
CREATE TABLE IF NOT EXISTS events (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	slug TEXT NOT NULL UNIQUE,
	name TEXT NOT NULL,
	event_date TEXT, -- ISO 'YYYY-MM-DD'; NULL = dato ikke fastsat endnu
	location TEXT,
	description TEXT,
	created_at INTEGER NOT NULL DEFAULT (unixepoch())
);

-- Billeder knyttet til et event. r2_key er objektnøglen i R2-bucketen
-- (fx 'events/sommer-2026/01.jpg'), ikke en fuld URL. URL'en udledes af nøglen,
-- så domæne/CDN kan skiftes uden at migrere data.
CREATE TABLE IF NOT EXISTS event_images (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	event_id INTEGER NOT NULL,
	r2_key TEXT NOT NULL UNIQUE,
	caption TEXT,
	content_type TEXT NOT NULL,
	sort_order INTEGER NOT NULL DEFAULT 0,
	created_at INTEGER NOT NULL DEFAULT (unixepoch()),
	FOREIGN KEY (event_id) REFERENCES events (id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_event_images_event_id ON event_images (event_id);
