-- Profilbillede for en artist. Billedet vises til venstre for artistens navn
-- på forsiden. Vi gemmer R2-nøglen og indholdstypen (ikke en fuld URL), så
-- domæne/CDN kan skiftes uden at migrere data — samme mønster som event_images.
-- NULL = ingen billede uploadet endnu.
ALTER TABLE artists ADD COLUMN image_key TEXT;
ALTER TABLE artists ADD COLUMN image_content_type TEXT;
