/**
 * Tilstand for artistmodalen, der skifter mellem at vise artisten og et
 * enkelt event. Modalen genbruges i stedet for at stable modaler oven på
 * hinanden, så vi holder styr på hvilken "visning" der er aktiv.
 */

/** Hvilken visning modalen aktuelt viser. */
export type ModalView = 'artist' | 'event';

export interface ModalState<TEvent> {
  view: ModalView;
  selectedEvent: TEvent | null;
}

/**
 * Starttilstanden for artistmodalen.
 */
export function initialState<TEvent>(): ModalState<TEvent> {
  return { view: 'artist', selectedEvent: null };
}

/** Den globale starttilstand (uden et valgt event). */
export const INITIAL_MODAL_STATE: ModalState<never> = { view: 'artist', selectedEvent: null };

/**
 * Skifter modalen til event-visningen for det valgte event.
 */
export function openEventView<TEvent>(selectedEvent: TEvent): ModalState<TEvent> {
  return { view: 'event', selectedEvent };
}

/**
 * Går tilbage til artist-visningen og rydder det valgte event.
 */
export function backToArtistView<TEvent>(): ModalState<TEvent> {
  return { view: 'artist', selectedEvent: null };
}

/**
 * Nulstiller hele modalens tilstand (fx når modalen lukkes helt).
 */
export function resetModalState<TEvent>(): ModalState<TEvent> {
  return { view: 'artist', selectedEvent: null };
}
