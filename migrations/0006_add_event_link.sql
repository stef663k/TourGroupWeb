-- Tilføjer en link-kolonne til events-tabellen. Linket er en valgfri URL,
-- som "More"-knappen på eventkortet kan navigere til (fx en ekstern
-- eventbillet-side eller arrangementsside).
ALTER TABLE events ADD COLUMN link TEXT;
