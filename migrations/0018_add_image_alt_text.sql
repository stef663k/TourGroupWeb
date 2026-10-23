-- Tilføjer en dedikeret alt-tekst til billeder, så skærmlæsere og
-- søgemaskiner får en beskrivelse af det enkelte billede. Tidligere blev
-- event-billedernes caption brugt som alt-tekst, og artist-billederne brugte
-- artistens navn. Nu kan alt-teksten sættes og redigeres pr. billede —
-- også retroaktivt for billeder der allerede er uploadet.
--
-- NULL = ingen alt-tekst sat; så falder visningen tilbage til en fornuftig
-- standard (caption/event-navn for events, artistens navn for artister).

-- Event-billeder: ny alt-kolonne. Backfill fra eksisterende caption, så
-- allerede uploadede billeder får en alt-tekst med det samme.
ALTER TABLE event_images ADD COLUMN alt TEXT;

UPDATE event_images
SET alt = caption
WHERE caption IS NOT NULL AND caption <> '';

-- Artist-profilbilleder: ny alt-kolonne. Backfill fra artistens navn, som
-- var det der blev brugt som alt-tekst før.
ALTER TABLE artists ADD COLUMN image_alt TEXT;

UPDATE artists
SET image_alt = name
WHERE image_key IS NOT NULL AND name IS NOT NULL AND name <> '';
