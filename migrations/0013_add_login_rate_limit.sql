-- Rate limiting for owner-login sker i applikationen (Cloudflare Pages
-- understøtter ikke `ratelimits`-bindingen). Vi bruger en simpel
-- fixed-window-tæller pr. nøgle (klientens IP).
--
-- En række pr. (key, window_start). `attempts` tælles op ved hvert forsøg;
-- når vinduet udløber, starter en ny række. Gamle rækker ryddes løbende.
CREATE TABLE IF NOT EXISTS login_attempts (
	key TEXT NOT NULL,
	window_start INTEGER NOT NULL,
	attempts INTEGER NOT NULL DEFAULT 0,
	PRIMARY KEY (key, window_start)
);

CREATE INDEX IF NOT EXISTS idx_login_attempts_window_start ON login_attempts (window_start);
