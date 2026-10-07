export const SESSION_COOKIE_NAME = 'tourgroup_session';
export const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 dage

function encodeText(value: string): Uint8Array<ArrayBuffer> {
	return new TextEncoder().encode(value);
}

/**
 * Sammenligner to strenge i konstant tid for at undgå timing-angreb.
 */
export function timingSafeEqual(a: string, b: string): boolean {
	const aBytes = encodeText(a);
	const bBytes = encodeText(b);
	// Sammenlign altid lige mange bytes, uanset længde.
	const length = Math.max(aBytes.length, bBytes.length);
	let diff = aBytes.length ^ bBytes.length;
	for (let i = 0; i < length; i++) {
		diff |= (aBytes[i] ?? 0) ^ (bBytes[i] ?? 0);
	}
	return diff === 0;
}

/**
 * Udtrækker sessions-cookien fra en Cookie-header.
 */
export function getSessionCookie(cookieHeader: string | null): string | undefined {
	if (!cookieHeader) return undefined;
	for (const part of cookieHeader.split(';')) {
		const [name, ...rest] = part.trim().split('=');
		if (name === SESSION_COOKIE_NAME) {
			return decodeURIComponent(rest.join('='));
		}
	}
	return undefined;
}
