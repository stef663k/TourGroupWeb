-- Manuelt sorteret rækkefølge for artister på forsiden.
-- Ejeren kan flytte artisterne op/ned, så rækkefølgen ikke længere styres
-- automatisk af nyeste event-dato. Lavere sort_order vises først.
ALTER TABLE artists ADD COLUMN sort_order INTEGER NOT NULL DEFAULT 0;

-- Backfill: bevar den rækkefølge forsiden hidtil viste (nyeste event-dato først,
-- derefter nyeste artist). Hver række får sin placering i den sortering som
-- sit sort_order. ROW_NUMBER() er tilgængelig i D1/SQLite 3.25+.
UPDATE artists
SET sort_order = (
	SELECT ranked.rn - 1
	FROM (
		SELECT
			artists.id AS id,
			ROW_NUMBER() OVER (
				ORDER BY (latest_event_date IS NULL), latest_event_date DESC, artists.id DESC
			) AS rn
		FROM (
			SELECT
				artists.id AS id,
				(SELECT MAX(events.event_date) FROM events WHERE events.artist_id = artists.id) AS latest_event_date
			FROM artists
		) AS artists
	) AS ranked
	WHERE ranked.id = artists.id
);
