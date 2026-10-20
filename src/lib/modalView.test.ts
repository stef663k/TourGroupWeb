import { describe, it, expect } from 'vitest';
import {
	initialState,
	openEventView,
	backToArtistView,
	resetModalState,
	INITIAL_MODAL_STATE
} from '$lib/modalView';

interface FakeEvent {
	id: number;
	name: string;
}

const event: FakeEvent = { id: 7, name: 'Sommerfest' };

describe('modalView state', () => {
	it('starter på artist-visningen uden et valgt event', () => {
		expect(initialState<FakeEvent>()).toEqual({ view: 'artist', selectedEvent: null });
		expect(INITIAL_MODAL_STATE).toEqual({ view: 'artist', selectedEvent: null });
	});

	it('skifter til event-visningen med det valgte event', () => {
		const state = openEventView(event);
		expect(state.view).toBe('event');
		expect(state.selectedEvent).toBe(event);
	});

	it('går tilbage til artist-visningen og rydder det valgte event', () => {
		const next = backToArtistView<FakeEvent>();
		expect(next).toEqual({ view: 'artist', selectedEvent: null });
	});

	it('nulstiller hele tilstanden ved luk', () => {
		const next = resetModalState<FakeEvent>();
		expect(next).toEqual({ view: 'artist', selectedEvent: null });
	});

	it('returnerer en ny tilstand uden at mutere input', () => {
		const before = openEventView(event);
		const after = backToArtistView<FakeEvent>();
		expect(before).not.toBe(after);
		expect(before.view).toBe('event');
		expect(after.view).toBe('artist');
	});
});
