<script lang="ts">
  import { enhance } from '$app/forms';
  import EventForm from './EventForm.svelte';

  interface EventImage {
    id: number;
    caption: string | null;
    url: string;
  }

  interface Event {
    id: number;
    name: string;
    event_date: string | null;
    location: string | null;
    description: string | null;
    images: EventImage[];
  }

  let { event, owner = false }: { event: Event; owner?: boolean } = $props();

  let editing = $state(false);

  function formatDate(iso: string | null): string {
    if (!iso) return 'Date to be announced';
    const [y, m, d] = iso.split('-');
    return `${d}.${m}.${y}`;
  }

  function confirmDelete(e: SubmitEvent) {
    if (!confirm(`Delete “${event.name}”? This cannot be undone.`)) {
      e.preventDefault();
    }
  }
</script>

<li class="event" id="event-{event.id}">
  <div class="event-head">
    <time>{formatDate(event.event_date)}</time>
    <span class="name">{event.name}</span>
    {#if event.location}
      <span class="location">{event.location}</span>
    {/if}
    {#if owner}
      <button
        type="button"
        class="edit"
        aria-label="Edit {event.name}"
        aria-expanded={editing}
        title="Edit event"
        onclick={() => (editing = !editing)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            d="M4 20h4L19 9a2.12 2.12 0 0 0-3-3L5 17v3zM14 6l3 3"
            fill="none"
            stroke="currentColor"
            stroke-width="1.75"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <form method="POST" action="?/deleteEvent" use:enhance onsubmit={confirmDelete}>
        <input type="hidden" name="id" value={event.id} />
        <button type="submit" class="delete" aria-label="Delete {event.name}" title="Delete event">
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path
              d="M3 6h18M8 6V4h8v2m-9 0v14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V6M10 11v6M14 11v6"
              fill="none"
              stroke="currentColor"
              stroke-width="1.75"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </form>
    {/if}
  </div>
  {#if event.description}
    <p class="description">{event.description}</p>
  {/if}
  {#if event.images.length > 0}
    <ul class="images">
      {#each event.images as image (image.id)}
        <li>
          <img src={image.url} alt={image.caption ?? event.name} loading="lazy" />
        </li>
      {/each}
    </ul>
  {/if}
  {#if owner && editing}
    <div class="edit-panel">
      <EventForm
        action="?/updateEvent"
        fields={['name', 'description', 'eventDate', 'location']}
        id={event.id}
        initial={{
          name: event.name,
          description: event.description,
          eventDate: event.event_date,
          location: event.location
        }}
        submitLabel="Save"
        pendingLabel="Saving…"
        onSuccess={() => (editing = false)}
      />
      <button type="button" class="cancel" onclick={() => (editing = false)}>Cancel</button>
    </div>
  {/if}
</li>

<style>
  .event {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: clamp(1rem, 3vw, 1.5rem) clamp(0.5rem, 2vw, 1rem);
  }

  .event-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 1.5rem;
    font-size: clamp(1rem, 2.5vw, 1.25rem);
    color: var(--fg);
    letter-spacing: 0.02em;
  }

  .event-head time,
  .event-head .location {
    color: var(--fg-muted);
    font-size: 0.875rem;
    white-space: nowrap;
  }

  .event-head .edit,
  .event-head .delete {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.75rem;
    height: 1.75rem;
    padding: 0;
    background: transparent;
    border: none;
    border-radius: 0.375rem;
    color: var(--fg-muted);
    cursor: pointer;
    transition: color 0.2s var(--ease), background 0.2s var(--ease);
  }

  .event-head .edit:hover,
  .event-head .edit:focus-visible {
    color: var(--accent);
    background: rgba(255, 255, 255, 0.08);
  }

  .event-head .delete:hover,
  .event-head .delete:focus-visible {
    color: #ff6b6b;
    background: rgba(255, 107, 107, 0.1);
  }

  .event-head .edit svg,
  .event-head .delete svg {
    width: 1.0625rem;
    height: 1.0625rem;
  }

  .edit-panel {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    padding: clamp(0.75rem, 2vw, 1rem);
    background: var(--bg-soft);
    border: 1px solid var(--line);
    border-radius: 0.5rem;
  }

  .edit-panel .cancel {
    align-self: center;
    padding: 0.5rem 1.25rem;
    font-family: inherit;
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0.02em;
    color: var(--fg-muted);
    background: transparent;
    border: 1px solid var(--line);
    border-radius: 999px;
    cursor: pointer;
    transition: color 0.2s var(--ease), border-color 0.2s var(--ease);
  }

  .edit-panel .cancel:hover {
    color: var(--fg);
    border-color: var(--fg-muted);
  }

  .description {
    max-width: none;
    margin-bottom: 0;
    color: #cccccc;
    font-size: 0.9375rem;
    text-align: left;
  }

  .images {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(6rem, 1fr));
    gap: 0.5rem;
  }

  .images img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: 0.375rem;
    border: 1px solid var(--line);
  }
</style>
