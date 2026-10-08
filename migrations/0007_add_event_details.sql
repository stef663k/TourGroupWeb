-- Tilføjer en details-kolonne til events-tabellen. Beskrivelsen (description)
-- er den korte teaser der vises på eventkortet i listen, mens details er den
-- længere, mere uddybende tekst der vises inde i eventmodalen.
ALTER TABLE events ADD COLUMN details TEXT;
