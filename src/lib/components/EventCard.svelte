<script lang="ts">
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

  let { event }: { event: Event } = $props();

  function formatDate(iso: string | null): string {
    if (!iso) return 'Dato kommer';
    const [y, m, d] = iso.split('-');
    return `${d}.${m}.${y}`;
  }
</script>

<li class="event" id="event-{event.id}">
  <div class="event-head">
    <time>{formatDate(event.event_date)}</time>
    <span class="name">{event.name}</span>
    {#if event.location}
      <span class="location">{event.location}</span>
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
