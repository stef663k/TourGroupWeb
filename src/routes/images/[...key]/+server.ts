import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

/**
 * Serverer R2-objekter. Bruges når bucketen ikke er offentlig.
 * Nøglen kommer fra catch-all-parameteren [...key].
 */
export const GET: RequestHandler = async ({ params, platform, request }) => {
	const bucket = platform?.env.Bucket;
	if (!bucket) error(500, 'Lageret er ikke konfigureret.');

	const key = params.key;
	if (!key || key.includes('..')) error(400, 'Ugyldig nøgle.');

	const object = await bucket.get(key);
	if (!object) error(404, 'Billedet findes ikke.');

	const headers = new Headers();
	if (object.httpMetadata?.contentType) {
		headers.set('content-type', object.httpMetadata.contentType);
	}
	headers.set('etag', object.etag);
	headers.set('Cache-Control', 'public, max-age=31536000, immutable');

	// Betinget GET: returnér 304 hvis klienten allerede har objektet.
	const ifNoneMatch = request.headers.get('if-none-match');
	if (ifNoneMatch && ifNoneMatch === object.etag) {
		return new Response(null, { status: 304, headers });
	}

	return new Response(object.body, { headers });
};
