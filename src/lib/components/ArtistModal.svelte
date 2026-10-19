<script lang="ts">
  import { enhance } from '$app/forms';
  import EventCard from './EventCard.svelte';

  interface ArtistLink {
    id: number;
    label: string;
    url: string;
  }

  interface EventImage {
    id: number;
    caption: string | null;
    url: string;
    isCover: boolean;
  }

  interface ArtistEvent {
    id: number;
    name: string;
    event_date: string | null;
    location: string | null;
    description: string | null;
    details: string | null;
    link: string | null;
    artist_id: number | null;
    artistName: string | null;
    images: EventImage[];
  }

  interface Artist {
    id: number;
    name: string;
    years: string | null;
    details: string | null;
    imageUrl?: string | null;
    links: ArtistLink[];
    events?: ArtistEvent[];
  }

  let {
    artist,
    owner = false,
    onclose
  }: { artist: Artist; owner?: boolean; onclose: () => void } = $props();

  let artistEvents = $derived(artist.events ?? []);

  // The modal is mounted per artist, so capturing the initial value is intentional.
  // svelte-ignore state_referenced_locally
  let details = $state(artist.details ?? '');

  // Re-sync the editable text only when the parent passes a genuinely new saved
  // value (e.g. after the update action re-runs the load). Comparing against the
  // value we last synced from avoids clobbering unsaved edits when unrelated
  // reloads (like adding/removing links) happen.
  // svelte-ignore state_referenced_locally
  let syncedDetails = artist.details ?? '';
  $effect(() => {
    if ((artist.details ?? '') !== syncedDetails) {
      syncedDetails = artist.details ?? '';
      details = artist.details ?? '';
    }
  });

  function close() {
    onclose();
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') close();
  }

  // Submit the details form without resetting it, so the saved text stays visible
  // after the action completes.
  function onSubmitDetails() {
    let submitting = false;
    return async ({
      update
    }: {
      update: (opts?: { reset?: boolean }) => Promise<void>;
    }) => {
      if (submitting) return;
      submitting = true;
      await update({ reset: false });
      submitting = false;
    };
  }

  function confirmDeleteLink(e: SubmitEvent) {
    if (!confirm('Delete this link? This cannot be undone.')) {
      e.preventDefault();
    }
  }
</script>

<svelte:window onkeydown={onKeydown} />

<div
  class="overlay"
  role="presentation"
  onclick={(e) => {
    if (e.target === e.currentTarget) close();
  }}
>
  <div class="modal" role="dialog" aria-modal="true" aria-labelledby="artist-modal-title">
    <div class="modal-head">
      <div class="modal-title-group">
        {#if artist.imageUrl}
          <img class="modal-thumb" src={artist.imageUrl} alt={artist.name} />
        {/if}
        <h2 id="artist-modal-title">{artist.name}</h2>
      </div>
      <button type="button" class="close" aria-label="Close" onclick={close}>×</button>
    </div>

    <div class="modal-body">
      {#if owner}
        <form
          method="POST"
          action="?/updateArtistDetails"
          use:enhance={onSubmitDetails}
          class="edit-form"
        >
          <input type="hidden" name="id" value={artist.id} />

          <label for="modal-details">About the artist</label>
          <textarea id="modal-details" name="details" rows="6" bind:value={details}></textarea>

          <div class="edit-actions">
            <button type="submit" class="save">Save text</button>
          </div>
        </form>
      {:else if artist.details}
        <p class="description">{artist.details}</p>
      {/if}

      <div class="links-section">
        <h3>Links</h3>

        {#if artist.links.length > 0}
          <ul class="links">
            {#each artist.links as link (link.id)}
              <li>
                <a href={link.url} target="_blank" rel="noopener noreferrer">{link.label}</a>
                {#if owner}
                  <form
                    method="POST"
                    action="?/removeArtistLink"
                    use:enhance
                    onsubmit={confirmDeleteLink}
                  >
                    <input type="hidden" name="id" value={link.id} />
                    <button type="submit" class="remove" aria-label="Delete link" title="Delete">
                      ×
                    </button>
                  </form>
                {/if}
              </li>
            {/each}
          </ul>
        {:else}
          <p class="empty">No links yet.</p>
        {/if}

        {#if owner}
          <form method="POST" action="?/addArtistLink" use:enhance class="add-link">
            <input type="hidden" name="id" value={artist.id} />
            <label for="modal-link-label">Link text</label>
            <input
              id="modal-link-label"
              name="label"
              type="text"
              required
              maxlength="200"
              placeholder="Website"
            />
            <label for="modal-link-url">URL</label>
            <input
              id="modal-link-url"
              name="url"
              type="url"
              required
              maxlength="2048"
              placeholder="https://…"
            />

            <button type="submit" class="save">Add link</button>
          </form>
        {/if}
      </div>

      <!-- Artistens events vises som EventCards. De er altid skrivebeskyttede
           her, fordi event-handlingerne (redigering/sletning) hører til
           events-siden og ikke til forsiden, hvor modalen lever. -->
      <div class="events-section">
        <h3>Events</h3>

        {#if artistEvents.length > 0}
          <ul class="events">
            {#each artistEvents as event (event.id)}
              <EventCard {event} owner={false} />
            {/each}
          </ul>
        {:else}
          <p class="empty">No events yet.</p>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  .overlay {
    position: fixed;
    inset: 0;
    z-index: 100;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: clamp(1rem, 5vh, 3rem) 1rem;
    overflow-y: auto;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(2px);
  }

  .modal {
    width: 85vw;
    max-width: 85vw;
    background: var(--bg);
    border: 1px solid var(--line);
    border-radius: 0.75rem;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  }

  .modal-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: clamp(1rem, 3vw, 1.5rem);
    border-bottom: 1px solid var(--line);
  }

  .modal-title-group {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    min-width: 0;
  }

  .modal-thumb {
    flex: 0 0 auto;
    width: clamp(3.5rem, 8vw, 5rem);
    height: clamp(3.5rem, 8vw, 5rem);
    object-fit: cover;
    border: 1px solid var(--line);
    border-radius: 0.5rem;
    }

  .modal-head h2 {
    margin: 0;
    font-size: clamp(1.125rem, 3vw, 1.5rem);
    letter-spacing: 0.02em;
  }

  .close {
    flex: 0 0 auto;
    width: 2rem;
    height: 2rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    line-height: 1;
    color: var(--fg-muted);
    background: transparent;
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: color 0.2s var(--ease), background 0.2s var(--ease);
  }

  .close:hover,
  .close:focus-visible {
    color: var(--fg);
    background: rgba(255, 255, 255, 0.08);
  }

  .modal-body {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: clamp(1rem, 3vw, 1.5rem);
  }

  .edit-form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .edit-form label,
  .add-link label {
    font-size: 0.8125rem;
    letter-spacing: 0.02em;
    color: var(--fg-muted);
  }

  .edit-form textarea,
  .add-link input {
    width: 100%;
    padding: 0.5rem 0.75rem;
    font-family: inherit;
    font-size: 0.9375rem;
    color: var(--fg);
    background: var(--bg-soft);
    border: 1px solid var(--line);
    border-radius: 0.375rem;
    transition: border-color 0.2s var(--ease);
  }

  .edit-form textarea:focus,
  .add-link input:focus {
    outline: none;
    border-color: var(--accent);
  }

  .edit-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 0.25rem;
  }

  .save {
    padding: 0.5rem 1.25rem;
    font-family: inherit;
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0.02em;
    color: var(--bg);
    background: var(--accent);
    border: 1px solid var(--accent);
    border-radius: 999px;
    cursor: pointer;
    transition: opacity 0.2s var(--ease);
  }

  .save:hover:not(:disabled) {
    opacity: 0.85;
  }

  .description {
    margin: 0;
    color: #cccccc;
    font-size: 0.9375rem;
    text-align: left;
    white-space: pre-line;
  }

  .links-section {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .links-section h3 {
    margin: 0;
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--fg-muted);
  }

  .links {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .links li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    padding: 0.5rem 0.75rem;
    background: var(--bg-soft);
    border: 1px solid var(--line);
    border-radius: 0.375rem;
  }

  .links a {
    min-width: 0;
    overflow-wrap: anywhere;
    border-bottom: none;
  }

  .links a:hover,
  .links a:focus-visible {
    color: var(--accent);
  }

  .remove {
    flex: 0 0 auto;
    width: 1.5rem;
    height: 1.5rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    line-height: 1;
    color: var(--fg-muted);
    background: transparent;
    border: none;
    border-radius: 999px;
    cursor: pointer;
    transition: color 0.2s var(--ease), background 0.2s var(--ease);
  }

  .remove:hover,
  .remove:focus-visible {
    color: #ff6b6b;
    background: rgba(255, 107, 107, 0.1);
  }

  .empty {
    margin: 0;
    font-size: 0.875rem;
    color: var(--fg-muted);
  }

  .add-link {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px solid var(--line);
  }

  .add-link button {
    align-self: flex-start;
  }

  .events-section {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .events-section h3 {
    margin: 0;
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--fg-muted);
  }

  .events {
    list-style: none;
    display: flex;
    flex-direction: column;
    width: 100%;
    border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
  }

  .events :global(.event + .event) {
    border-top: 1px solid var(--line);
  }
</style>
