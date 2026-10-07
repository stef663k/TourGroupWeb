// Sætter owner-brugerens brugernavn og adgangskode i D1 ved at generere et
// PBKDF2-hash og køre `wrangler d1 execute`.
//
// Brug:
//   node scripts/set-password.mjs <adgangskode> [--username <navn>] [--remote]
//
// Scriptet opdaterer users-rækken (id = 1).

import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { webcrypto } from 'node:crypto';

const require = createRequire(import.meta.url);

const PBKDF2_ITERATIONS = 100_000;
const KEY_LENGTH_BITS = 256;

function base64FromBytes(bytes) {
	let binary = '';
	for (const byte of bytes) binary += String.fromCharCode(byte);
	return Buffer.from(binary, 'binary').toString('base64');
}

async function hashPassword(password) {
	const salt = webcrypto.getRandomValues(new Uint8Array(16));
	const keyMaterial = await webcrypto.subtle.importKey(
		'raw',
		new TextEncoder().encode(password),
		'PBKDF2',
		false,
		['deriveBits']
	);
	const bits = await webcrypto.subtle.deriveBits(
		{ name: 'PBKDF2', salt, iterations: PBKDF2_ITERATIONS, hash: 'SHA-256' },
		keyMaterial,
		KEY_LENGTH_BITS
	);
	const hash = base64FromBytes(new Uint8Array(bits));
	const saltB64 = base64FromBytes(salt);
	return `pbkdf2$${PBKDF2_ITERATIONS}$${saltB64}$${hash}`;
}

const args = process.argv.slice(2);
const remote = args.includes('--remote');
const usernameIndex = args.indexOf('--username');
const username = usernameIndex >= 0 ? args[usernameIndex + 1] : 'owner';

// Adgangskoden er det første argument der ikke er en flag-værdi.
const flagWithValue = new Set(['--username']);
const password = args.find((a, i) => {
	if (a.startsWith('--')) return false;
	if (i > 0 && flagWithValue.has(args[i - 1])) return false;
	return true;
});

if (!password) {
	console.error('Brug: node scripts/set-password.mjs <adgangskode> [--username <navn>] [--remote]');
	process.exit(1);
}

if (!username) {
	console.error('--username kræver en værdi.');
	process.exit(1);
}

const hash = await hashPassword(password);
const escapedUsername = username.replace(/'/g, "''");
const sql = `INSERT INTO users (id, username, password_hash) VALUES (1, '${escapedUsername}', '${hash}') ON CONFLICT (id) DO UPDATE SET username = excluded.username, password_hash = excluded.password_hash;`;

// Slå wrangler's JS-entrypoint op, så vi ikke er afhængige af npx eller PATH.
const wranglerPkgPath = require.resolve('wrangler/package.json');
const wranglerRoot = dirname(wranglerPkgPath);
const wranglerBin = join(wranglerRoot, require(wranglerPkgPath).bin.wrangler);

const wranglerArgs = [
	wranglerBin,
	'd1',
	'execute',
	'tourgroup',
	remote ? '--remote' : '--local',
	'--command',
	sql
];

// Kør wrangler via den aktuelle Node-installation og wrangler's JS-entrypoint.
// Det undgår npx/.cmd-shims og virker ens på Windows og POSIX.
execFileSync(process.execPath, wranglerArgs, { stdio: 'inherit' });
