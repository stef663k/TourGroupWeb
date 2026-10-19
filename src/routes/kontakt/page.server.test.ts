import { describe, it, expect } from 'vitest';
import { load } from './+page.server';

function makePlatform(r2PublicUrl?: string) {
	return { env: { R2_PUBLIC_URL: r2PublicUrl } } as App.Platform;
}

type LoadResult = { contactBackgroundUrl: string };

async function runLoad(platform: unknown): Promise<LoadResult> {
	return (await load({ platform } as never)) as unknown as LoadResult;
}

describe('kontakt load', () => {
	it('returnerer baggrundsbilledets URL via /images-ruten som standard', async () => {
		const data = await runLoad(makePlatform());
		expect(data.contactBackgroundUrl).toBe('/images/Lukas/ContactBackground.jpg');
	});

	it('bruger R2_PUBLIC_URL til baggrundsbilledet når den er sat', async () => {
		const data = await runLoad(makePlatform('https://cdn.example.com'));
		expect(data.contactBackgroundUrl).toBe('https://cdn.example.com/Lukas/ContactBackground.jpg');
	});

	it('giver baggrundsbilledets URL også når platform.env mangler', async () => {
		const data = await runLoad({});
		expect(data.contactBackgroundUrl).toBe('/images/Lukas/ContactBackground.jpg');
	});

	it('giver baggrundsbilledets URL når platform er undefined', async () => {
		const data = await runLoad(undefined);
		expect(data.contactBackgroundUrl).toBe('/images/Lukas/ContactBackground.jpg');
	});
});
