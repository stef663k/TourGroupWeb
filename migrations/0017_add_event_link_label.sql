-- Tilføjer en link_label-kolonne til events-tabellen. Det er den viste tekst
-- for eventets link (fx "Billetter" eller "Læs mere"), på samme måde som
-- label på artist_links. URL'en gemmes fortsat i link-kolonnen.
-- NULL = ingen label; så vises selve URL'en som link-tekst.
ALTER TABLE events ADD COLUMN link_label TEXT;
