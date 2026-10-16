-- Tilføjer en is_cover-kolonne til event_images. Billedet der uploades når
-- eventet oprettes markeres som cover (is_cover = 1). Billeder der senere
-- tilføjes inde i eventmodalen er is_cover = 0. Det gør det muligt at vise kun
-- cover-billedet på eventkortet, mens ekstra billeder kun vises i modalen.
ALTER TABLE event_images ADD COLUMN is_cover INTEGER NOT NULL DEFAULT 0;

-- Backfill: markér det ældste billede pr. event som cover, så eksisterende
-- events fortsat viser et cover-billede på kortet efter migreringen.
UPDATE event_images
SET is_cover = 1
WHERE id IN (
	SELECT MIN(id) FROM event_images GROUP BY event_id
);
