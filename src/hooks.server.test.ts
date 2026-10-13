import { describe, it, expect, vi } from 'vitest';
import { handle } from './hooks.server';

/**
 * Bygger en minimal RequestEvent til test af owner-gatingen. DB er ikke sat,
 * så sessions-valideringen springes over (owner = false).
 */
function makeEvent(pathname: string, opts: { platform?: unknown; cookie?: string } = {}) {
	const url = new URL(`http://localhost${pathname}`);
	const headers = new Headers();
	if (opts.cookie) headers.set('cookie', opts.cookie);
	return {
		url,
		request: new Request(url, { headers }),
		platform: opts.platform,
		locals: { owner: false, ownerPath: null }
	};
}

type Event = ReturnType<typeof makeEvent>;

function makeResolve() {
	return vi.fn(async (event: Event) => {
		return new Response(`resolved:${event.url.pathname}`, { status: 200 });
	});
}

function platform(ownerPath?: string) {
	return { env: { OWNER_PATH: ownerPath } };
}

describe('handle — owner-gating', () => {
	it.each(['/owner', '/admin', '/login', '/Owner', '/ADMIN'])(
		'afviser den oplagte sti %s med 404',
		async (path) => {
			const resolve = makeResolve();
			const response = await handle({ event: makeEvent(path), resolve } as never);
			expect(response.status).toBe(404);
			expect(resolve).not.toHaveBeenCalled();
		}
	);

	it('sender den hemmelige sti videre til resolve (routen håndterer auth)', async () => {
		const event = makeEvent('/manage-abc', { platform: platform('/manage-abc') });
		const resolve = makeResolve();
		const response = await handle({ event, resolve } as never);
		expect(response.status).toBe(200);
		expect(resolve).toHaveBeenCalledTimes(1);
		expect(resolve.mock.calls[0][0].url.pathname).toBe('/manage-abc');
	});

	it('sender almindelige sider uændret gennem resolve', async () => {
		const event = makeEvent('/events', { platform: platform('/manage-abc') });
		const resolve = makeResolve();
		await handle({ event, resolve } as never);
		expect(resolve.mock.calls[0][0].url.pathname).toBe('/events');
	});

	it('eksponerer den normaliserede owner-sti på locals', async () => {
		const event = makeEvent('/', { platform: platform('manage-abc/') });
		const resolve = makeResolve();
		await handle({ event, resolve } as never);
		expect(event.locals.ownerPath).toBe('/manage-abc');
	});

	it('giver ownerPath = null når OWNER_PATH ikke er sat', async () => {
		const event = makeEvent('/', { platform: platform(undefined) });
		const resolve = makeResolve();
		await handle({ event, resolve } as never);
		expect(event.locals.ownerPath).toBeNull();
	});

	it('sætter owner = false uden DB (ingen session kan valideres)', async () => {
		const event = makeEvent('/', { platform: platform('/manage-abc') });
		const resolve = makeResolve();
		await handle({ event, resolve } as never);
		expect(event.locals.owner).toBe(false);
	});

	it('samler en ledende dobbelt-skråstreg til én og omdirigerer (308)', async () => {
		const event = makeEvent('//manage-abc', { platform: platform('/manage-abc') });
		const resolve = makeResolve();
		const response = await handle({ event, resolve } as never);
		expect(response.status).toBe(308);
		expect(response.headers.get('location')).toBe('/manage-abc');
		expect(resolve).not.toHaveBeenCalled();
	});

	it('bevarer query-streng ved samling af dobbelt-skråstreg', async () => {
		const event = makeEvent('//manage-abc?x=1', { platform: platform('/manage-abc') });
		const resolve = makeResolve();
		const response = await handle({ event, resolve } as never);
		expect(response.headers.get('location')).toBe('/manage-abc?x=1');
	});

	it('omdirigerer også "///manage-abc" til én skråstreg', async () => {
		const event = makeEvent('///manage-abc', { platform: platform('/manage-abc') });
		const resolve = makeResolve();
		const response = await handle({ event, resolve } as never);
		expect(response.status).toBe(308);
		expect(response.headers.get('location')).toBe('/manage-abc');
	});
	});
