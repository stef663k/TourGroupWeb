import { describe, it, expect } from 'vitest';
import {
	slugify,
	sniffImageType,
	imageExtension,
	buildImageKey,
	publicImageUrl,
	validateImage,
	MAX_IMAGE_BYTES,
	ALLOWED_IMAGE_TYPES
} from '$lib/server/storage';

/** Hjælper: bygger en byte-sekvens med JPEG-header. */
function jpegHead(): Uint8Array {
	return new Uint8Array([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46, 0x00, 0x01]);
}

function pngHead(): Uint8Array {
	return new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d]);
}

function gifHead(): Uint8Array {
	return new Uint8Array([0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0x01, 0x00, 0x01, 0x00, 0x00, 0x00]);
}

function webpHead(): Uint8Array {
	return new Uint8Array([
		0x52, 0x49, 0x46, 0x46, 0x20, 0x00, 0x00, 0x00, 0x57, 0x45, 0x42, 0x50
	]);
}

function avifHead(): Uint8Array {
	return new Uint8Array([
		0x00, 0x00, 0x00, 0x1c, 0x66, 0x74, 0x79, 0x70, 0x61, 0x76, 0x69, 0x66
	]);
}

describe('slugify', () => {
	it('laver en ASCII-slug af et dansk navn', () => {
		expect(slugify('Sommerfest på Øen')).toBe('sommerfest-paa-oeen');
	});

	it('translittererer æ, ø og å', () => {
		expect(slugify('Æ Ø Å')).toBe('ae-oe-aa');
	});

	it('fjerner førende og efterfølgende bindestreger', () => {
		expect(slugify('  --Hej med dig--  ')).toBe('hej-med-dig');
	});

	it('kollapser gentagne ikke-alfanumeriske tegn', () => {
		expect(slugify('a   b___c')).toBe('a-b-c');
	});

	it('returnerer tom streng for input uden brugbare tegn', () => {
		expect(slugify('!!!')).toBe('');
	});
});

describe('sniffImageType', () => {
	it('genkender JPEG', () => {
		expect(sniffImageType(jpegHead())).toBe('image/jpeg');
	});

	it('genkender PNG', () => {
		expect(sniffImageType(pngHead())).toBe('image/png');
	});

	it('genkender GIF', () => {
		expect(sniffImageType(gifHead())).toBe('image/gif');
	});

	it('genkender WebP', () => {
		expect(sniffImageType(webpHead())).toBe('image/webp');
	});

	it('genkender AVIF', () => {
		expect(sniffImageType(avifHead())).toBe('image/avif');
	});

	it('afviser ukendte bytes', () => {
		expect(sniffImageType(new Uint8Array([0x00, 0x01, 0x02, 0x03]))).toBeNull();
	});

	it('afviser for korte sekvenser', () => {
		expect(sniffImageType(new Uint8Array([0xff, 0xd8]))).toBeNull();
	});
});

describe('imageExtension', () => {
	it('mapper kendte typer til endelser', () => {
		expect(imageExtension('image/jpeg')).toBe('jpg');
		expect(imageExtension('image/png')).toBe('png');
		expect(imageExtension('image/webp')).toBe('webp');
	});

	it('returnerer null for ukendte typer', () => {
		expect(imageExtension('image/tiff')).toBeNull();
		expect(imageExtension('application/pdf')).toBeNull();
	});
});

describe('buildImageKey', () => {
	it('bygger en nøgle under events/<slug>/', () => {
		const key = buildImageKey('sommerfest', 'image/jpeg', 'abc-123');
		expect(key).toBe('events/sommerfest/abc-123.jpg');
	});

	it('bruger den korrekte endelse pr. type', () => {
		expect(buildImageKey('e', 'image/png', 'x')).toBe('events/e/x.png');
		expect(buildImageKey('e', 'image/avif', 'x')).toBe('events/e/x.avif');
	});
});

describe('publicImageUrl', () => {
	it('bruger serveringsruten når der ikke er en base-URL', () => {
		expect(publicImageUrl('events/e/x.jpg')).toBe('/images/events/e/x.jpg');
	});

	it('bruger base-URL når den er sat', () => {
		expect(publicImageUrl('events/e/x.jpg', 'https://cdn.example.com')).toBe(
			'https://cdn.example.com/events/e/x.jpg'
		);
	});

	it('fjerner efterfølgende skråstreger på base-URL', () => {
		expect(publicImageUrl('k', 'https://cdn.example.com///')).toBe('https://cdn.example.com/k');
	});
});

describe('validateImage', () => {
	it('accepterer et gyldigt JPEG', () => {
		const result = validateImage({
			contentType: 'image/jpeg',
			size: 1024,
			head: jpegHead()
		});
		expect(result).toEqual({ ok: true, contentType: 'image/jpeg' });
	});

	it('accepterer et gyldigt PNG', () => {
		const result = validateImage({ contentType: 'image/png', size: 2048, head: pngHead() });
		expect(result).toEqual({ ok: true, contentType: 'image/png' });
	});

	it('afviser en tom fil', () => {
		const result = validateImage({ contentType: 'image/jpeg', size: 0, head: jpegHead() });
		expect(result.ok).toBe(false);
	});

	it('afviser en fil der er for stor', () => {
		const result = validateImage({
			contentType: 'image/jpeg',
			size: MAX_IMAGE_BYTES + 1,
			head: jpegHead()
		});
		expect(result.ok).toBe(false);
	});

	it('afviser en ikke-tilladt type', () => {
		const result = validateImage({
			contentType: 'application/pdf',
			size: 1024,
			head: new Uint8Array([0x25, 0x50, 0x44, 0x46])
		});
		expect(result.ok).toBe(false);
	});

	it('afviser når indholdet ikke matcher den oplyste type (forfalsket type)', () => {
		const result = validateImage({
			contentType: 'image/png',
			size: 1024,
			head: jpegHead() // JPEG-bytes, men påstår PNG
		});
		expect(result.ok).toBe(false);
	});

	it('alle tilladte typer har en endelse', () => {
		for (const type of Object.keys(ALLOWED_IMAGE_TYPES)) {
			expect(imageExtension(type)).toBeTruthy();
		}
	});
});
