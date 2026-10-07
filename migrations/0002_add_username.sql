-- Tilføjer en username-kolonne til users-tabellen.
-- SQLite kan ikke tilføje en NOT NULL-kolonne uden en default, så vi giver
-- eksisterende rækker en standardværdi ('owner') og håndhæver unikhed.
ALTER TABLE users ADD COLUMN username TEXT NOT NULL DEFAULT 'owner';

CREATE UNIQUE INDEX IF NOT EXISTS idx_users_username ON users (username);
