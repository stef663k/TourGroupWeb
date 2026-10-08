/**
 * Klient-side-billedkomprimering.
 *
 * Denne fil bruger browser-API'er (createImageBitmap/canvas) og må kun kaldes
 * fra kode der kører i browseren (fx i en event-handler), aldrig under SSR.
 *
 * Formålet er at undgå at telefonbilleder på 5-12 MB bliver afvist af
 * serverens 8 MB-grænse, og at gemme et billede der passer til sitets
 * visningsstørrelse i stedet for et fuldopløst originalfoto.
 *
 * Komprimering her er en bekvemmelighed — IKKE en sikkerhedskontrol.
 * Serveren validerer stadig filens magic bytes og størrelse.
 */

export const MAX_DIMENSION = 2000;
export const JPEG_QUALITY = 0.82;

/**
 * Komprimerer et billede ved at skalere den længste kant ned til `maxDimension`
 * og kode det som WebP (hvis understøttet) eller JPEG.
 *
 * GIF'er sendes uændret igennem, så animerede GIF'er ikke bliver fladtrykt.
 * Hvis browseren ikke kan afkode billedet (fx HEIC uden decoder), kastes en fejl
 * videre til kalderen, som må håndtere det (fx uploade originalen og lade
 * serveren afvise den med en klar besked).
 */
export async function compressImage(
	file: File,
	options: { maxDimension?: number; quality?: number } = {}
): Promise<File> {
	const maxDimension = options.maxDimension ?? MAX_DIMENSION;
	const quality = options.quality ?? JPEG_QUALITY;

	// Animerede GIF'er må ikke fladtrykkes af canvas — send dem videre uændret.
	if (file.type === 'image/gif') return file;

	const bitmap = await decode(file);

	try {
		const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
		const width = Math.max(1, Math.round(bitmap.width * scale));
		const height = Math.max(1, Math.round(bitmap.height * scale));

		const canvas = document.createElement('canvas');
		canvas.width = width;
		canvas.height = height;

		const ctx = canvas.getContext('2d');
		if (!ctx) throw new Error('Could not create canvas context.');

		ctx.drawImage(bitmap, 0, 0, width, height);

		const outputType = supportsWebp() ? 'image/webp' : 'image/jpeg';
		const blob = await canvasToBlob(canvas, outputType, quality);

		// Hvis komprimeringen ikke gjorde filen mindre, behold originalen.
		if (blob.size >= file.size) return file;

		return toFile(blob, file.name);
	} finally {
		bitmap.close?.();
	}
}

/** Afkoder en fil til en ImageBitmap via createImageBitmap; fejler hvis formatet ikke understøttes. */
async function decode(file: File): Promise<ImageBitmap> {
	try {
		return await createImageBitmap(file);
	} catch {
		throw new Error('The image could not be read in the browser (possibly HEIC).');
	}
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob> {
	return new Promise((resolve, reject) => {
		canvas.toBlob(
			(blob) => (blob ? resolve(blob) : reject(new Error('Komprimering fejlede.'))),
			type,
			quality
		);
	});
}

/** Giver den komprimerede blob en filendelse der matcher dens type. */
function toFile(blob: Blob, originalName: string): File {
	const base = originalName.replace(/\.[^.]+$/, '') || 'billede';
	const ext = blob.type === 'image/webp' ? 'webp' : 'jpg';
	return new File([blob], `${base}.${ext}`, { type: blob.type });
}

let webpSupport: boolean | undefined;
function supportsWebp(): boolean {
	if (webpSupport === undefined) {
		const canvas = document.createElement('canvas');
		canvas.width = 1;
		canvas.height = 1;
		webpSupport = canvas.toDataURL('image/webp').startsWith('data:image/webp');
	}
	return webpSupport;
}
