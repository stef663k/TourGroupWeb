import type { PageServerLoad } from './$types';
import { publicImageUrl } from '$lib/server/storage';

/** R2-nøgle for baggrundsbilledet på kontakt-siden. */
const CONTACT_BACKGROUND_KEY = 'Lukas/ContactBackground.jpg';

export const load: PageServerLoad = async ({ platform }) => {
	const baseUrl = platform?.env?.R2_PUBLIC_URL;
	const contactBackgroundUrl = publicImageUrl(CONTACT_BACKGROUND_KEY, baseUrl);
	return { contactBackgroundUrl };
};
