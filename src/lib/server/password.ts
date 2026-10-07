import { timingSafeEqual } from './session';

const PBKDF2_ITERATIONS = 100_000;
const KEY_LENGTH_BITS = 256;

function encodeBase64(value: string): string {
	return value;
}

function decodeBase64(value: string): Uint8Array<ArrayBuffer> {
	const binary = atob(value);
	const bytes = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i++) {
		bytes[i] = binary.charCodeAt(i);
	}
	return bytes;
}

function encodeBase64FromBytes(bytes: Uint8Array): string {
	let binary = '';
	for (const byte of bytes) {
		binary += String.fromCharCode(byte);
	}
	return btoa(binary);
}

async function derive(password: string, salt: Uint8Array<ArrayBuffer>, iterations: number): Promise<string> {
	const keyMaterial = await crypto.subtle.importKey(
		'raw',
		new TextEncoder().encode(password),
		'PBKDF2',
		false,
		['deriveBits']
	);
	const bits = await crypto.subtle.deriveBits(
		{ name: 'PBKDF2', salt, iterations, hash: 'SHA-256' },
		keyMaterial,
		KEY_LENGTH_BITS
	);
	return encodeBase64FromBytes(new Uint8Array(bits));
}

/**
 * Verificerer et kodeord mod et hash i formatet `pbkdf2$<iterationer>$<salt-b64>$<hash-b64>`.
 */
export async function verifyPassword(password: string, storedHash: string | undefined): Promise<boolean> {
	if (!storedHash) return false;
	const parts = storedHash.split('$');
	if (parts.length !== 4 || parts[0] !== 'pbkdf2') return false;

	const iterations = Number(parts[1]);
	if (!Number.isInteger(iterations) || iterations <= 0) return false;

	let salt: Uint8Array<ArrayBuffer>;
	try {
		salt = decodeBase64(parts[2]);
	} catch {
		return false;
	}

	const derived = await derive(password, salt, iterations);
	return timingSafeEqual(derived, parts[3]);
}

/**
 * Hjælpefunktion til at generere et hash (bruges når en bruger oprettes
 * via databasen, se src/lib/server/db.ts).
 */
export async function hashPassword(password: string, iterations = PBKDF2_ITERATIONS): Promise<string> {
	const salt = crypto.getRandomValues(new Uint8Array(16));
	const derived = await derive(password, salt, iterations);
	return `pbkdf2$${iterations}$${encodeBase64(encodeBase64FromBytes(salt))}$${derived}`;
}
