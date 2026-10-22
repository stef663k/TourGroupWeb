import type { PageServerLoad } from './$types';
import { publicImageUrl } from '$lib/server/storage';

const LOGO_KEY = 'logo/LogoNoBorder.png';
const HERO_BACKGROUND_KEY = 'Lukas/HomeBackground.jpg';

export const load: PageServerLoad = async ({ platform }) => {
	const baseUrl = platform?.env?.R2_PUBLIC_URL;
	const logoUrl = publicImageUrl(LOGO_KEY, baseUrl);
	const heroBackgroundUrl = publicImageUrl(HERO_BACKGROUND_KEY, baseUrl);

	return { logoUrl, heroBackgroundUrl };
};
