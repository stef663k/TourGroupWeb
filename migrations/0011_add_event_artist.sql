-- Tilføjer en valgfri artist-kolonne til events-tabellen. Den peger på en af
-- vores artister, så man kan vælge en artist direkte på eventet (fx når det
-- oprettes eller opdateres) og vise artistens navn under billedet på eventkortet.
-- NULL = ingen artist valgt. ON DELETE SET NULL så et slettet artist ikke
-- ødelægger eventet — det mister blot sin tilknytning.
ALTER TABLE events ADD COLUMN artist_id INTEGER REFERENCES artists (id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_events_artist_id ON events (artist_id);
