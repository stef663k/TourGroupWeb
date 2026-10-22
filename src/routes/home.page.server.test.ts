import { describe, it, expect } from 'vitest';
import { load } from './+page.server';

function makePlatform(r2PublicUrl?: string) {
	return { env: { R2_PUBLIC_URL: r2PublicUrl } } as App.Platform;
}

type LoadResult = {
	logoUrl: string;
	heroBackgroundUrl: string;
};

async function runLoad(platform: unknown): Promise<LoadResult> {
	return (await load({ platform } as never)) as unknown as LoadResult;
}

describe('home load', () => {
	it('returnerer logo-URL via /images-ruten som standard', async () => {
		const data = await runLoad(makePlatform());
		expect(data.logoUrl).toBe('/images/logo/LogoNoBorder.png');
	});

	it('bruger R2_PUBLIC_URL til logoet når den er sat', async () => {
		const data = await runLoad(makePlatform('https://cdn.example.com'));
		expect(data.logoUrl).toBe('https://cdn.example.com/logo/LogoNoBorder.png');
	});

	it('giver logo-URL også når platform mangler', async () => {
		const data = await runLoad(undefined);
		expect(data.logoUrl).toBe('/images/logo/LogoNoBorder.png');
	});

	it('returnerer hero-baggrund via /images-ruten som standard', async () => {
		const data = await runLoad(makePlatform());
		expect(data.heroBackgroundUrl).toBe('/images/Lukas/HomeBackground.jpg');
	});

	it('bruger R2_PUBLIC_URL til hero-baggrunden når den er sat', async () => {
		const data = await runLoad(makePlatform('https://cdn.example.com'));
		expect(data.heroBackgroundUrl).toBe('https://cdn.example.com/Lukas/HomeBackground.jpg');
	});

	it('giver hero-baggrund også når platform mangler', async () => {
		const data = await runLoad(undefined);
		expect(data.heroBackgroundUrl).toBe('/images/Lukas/HomeBackground.jpg');
	});
});
