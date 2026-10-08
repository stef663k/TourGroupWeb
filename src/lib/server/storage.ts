/**
 * R2-hjælpefunktioner til billeder knyttet til events.
 *
 * Billeder gemmes i R2 under nøgler som `events/<slug>/<uuid>.<ext>`.
 * Databasen gemmer kun objektnøglen (r2_key), ikke en fuld URL, så
 * domæne/CDN kan skiftes uden at migrere data.
 */

/**
 * Laver en URL/R2-venlig slug ud fra et navn.
 *
 * Danske tegn translittereres (æ→ae, ø→oe, å→aa),så slugen er ASCII.
 * Returnerer en tom streng hvis intet brugbart tegn findes; kalderen
 * må håndtere det (fx ved at falde tilbage til et id).
 */
export function slugify(input: string): string {
	return input
		.toLowerCase()
		.trim()
		.replace(/[æ]/g, 'ae')
		.replace(/[ø]/g, 'oe')
		.replace(/[å]/g, 'aa')
		.normalize('NFKD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

export const MAX_IMAGE_BYTES = 8 * 1024 * 1024; // 8 MB

/** Tilladte billedformater: MIME-type → filendelse. */
export const ALLOWED_IMAGE_TYPES: Record<string, string> = {
	'image/jpeg': 'jpg',
	'image/png': 'png',
	'image/webp': 'webp',
	'image/gif': 'gif',
	'image/avif': 'avif'
};

/**
 * Tjekker om de første bytes matcher et kendt billedformat. Vi stoler
 * aldrig på klientens Content-Type alene — denne kontrol bruges sammen
 * med den oplyste MIME-type.
 */
export function sniffImageType(bytes: Uint8Array): string | null {
	const b = bytes;
	if (b.length >= 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return 'image/jpeg';
	if (
		b.length >= 8 &&
		b[0] === 0x89 &&
		b[1] === 0x50 &&
		b[2] === 0x4e &&
		b[3] === 0x47 &&
		b[4] === 0x0d &&
		b[5] === 0x0a &&
		b[6] === 0x1a &&
		b[7] === 0x0a
	)
		return 'image/png';
	if (
		b.length >= 12 &&
		b[0] === 0x52 &&
		b[1] === 0x49 &&
		b[2] === 0x46 &&
		b[3] === 0x46 &&
		b[8] === 0x57 &&
		b[9] === 0x45 &&
		b[10] === 0x42 &&
		b[11] === 0x50
	)
		return 'image/webp';
	if (b.length >= 6 && b[0] === 0x47 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x38)
		return 'image/gif';
	// ISO-BMFF-container (avif): 'ftyp' på byte 4, brand 'avif'/'avis' på byte 8.
	if (
		b.length >= 12 &&
		b[4] === 0x66 &&
		b[5] === 0x74 &&
		b[6] === 0x79 &&
		b[7] === 0x70 &&
		b[8] === 0x61 &&
		b[9] === 0x76 &&
		b[10] === 0x69 &&
		(b[11] === 0x66 || b[11] === 0x73)
	)
		return 'image/avif';
	return null;
}

/** Slår en MIME-type op i de tilladte typer. */
export function imageExtension(contentType: string): string | null {
	return ALLOWED_IMAGE_TYPES[contentType] ?? null;
}

/**
 * Bygger en R2-nøgle for et billede. Slug og id er allerede valideret
 * af kalderen; UUID'en sikrer unikhed og gør nøglen uforudsigelig.
 */
export function buildImageKey(slug: string, contentType: string, uuid: string): string {
	const ext = imageExtension(contentType) ?? 'bin';
	return `events/${slug}/${uuid}.${ext}`;
}

/**
 * Udleder en offentlig URL for en R2-nøgle. Bruger `baseUrl` hvis sat
 * (fx et R2 custom domain), ellers serveres objektet via /images-ruten.
 */
export function publicImageUrl(r2Key: string, baseUrl?: string): string {
	if (baseUrl) return `${baseUrl.replace(/\/+$/, '')}/${r2Key}`;
	return `/images/${r2Key}`;
}

/**
 * Validerer en uploadet fil ud fra oplyst type, størrelse og magic bytes.
 * Returnerer den endelige MIME-type eller en fejl.
 */
export function validateImage(input: {
	contentType: string;
	size: number;
	head: Uint8Array;
}): { ok: true; contentType: string } | { ok: false; error: string } {
	if (input.size <= 0) return { ok: false, error: 'The file is empty.' };
	if (input.size > MAX_IMAGE_BYTES) return { ok: false, error: 'The file is too large (max 8 MB).' };

	const declared = input.contentType.toLowerCase();
	if (!imageExtension(declared)) return { ok: false, error: 'The file type is not supported.' };

	const sniffed = sniffImageType(input.head);
	if (!sniffed) return { ok: false, error: 'The file is not a valid image.' };
	if (sniffed !== declared) return { ok: false, error: "The file's contents do not match the file type." };

	return { ok: true, contentType: sniffed };
}
