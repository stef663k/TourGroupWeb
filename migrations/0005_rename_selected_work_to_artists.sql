-- Omdøb selected_work til artists. Navnet matcher nu UI'et (forsiden viser "Artists").
-- Data bevares: ALTER TABLE ... RENAME TO flytter rækkerne med.
ALTER TABLE selected_work RENAME TO artists;

-- Den gamle indeks henviser stadig til det omdøbte tabelnavn, men SQLite
-- bevarer indekset under omdøbningen. Drop og genopret det for et klart navn.
DROP INDEX IF EXISTS idx_selected_work_event_id;
CREATE INDEX IF NOT EXISTS idx_artists_event_id ON artists (event_id);
