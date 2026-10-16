import type { LayoutServerLoad } from './$types';
import { publicImageUrl } from '$lib/server/storage';

const LOGO_KEY = 'logo/logoudentegn.png';

export const load: LayoutServerLoad = ({ locals, platform }) => {
	const baseUrl = platform?.env?.R2_PUBLIC_URL;
	return { owner: locals.owner, logoUrl: publicImageUrl(LOGO_KEY, baseUrl) };
};
