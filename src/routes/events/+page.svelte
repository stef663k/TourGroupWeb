<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData, ActionData } from './$types';

  let { data, form }: { data: PageData; form: ActionData } = $props();

  let submitting = $state(false);

  function formatDate(iso: string | null): string {
    if (!iso) return 'Dato kommer';
    const [y, m, d] = iso.split('-');
    return `${d}.${m}.${y}`;
  }
</script>

<svelte:head>
  <title>Events – Tour Group</title>
  <meta name="description" content="Events som Tour Group har været med til at producere." />
</svelte:head>

<!-- Hero -->
<section class="hero">
  <div class="label">Events · Denmark</div>
  <h1>Events</h1>
  {#if data.events.length === 0}
    <p class="lead">Ingen events lige nu — kom snart igen.</p>
  {:else}
    <p class="lead">Et udvalg af events vi har været med til at producere.</p>
  {/if}
</section>

<!-- 01 — Kommende events -->
<section>
  <div class="label">01 — Kommende events</div>
  {#if data.events.length === 0}
    <p class="lead">Ingen events lige nu — kom snart igen.</p>
  {:else}
    <ul class="events">
      {#each data.events as event (event.id)}
        <li class="event">
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
      {/each}
    </ul>
  {/if}
</section>

{#if data.owner}
  <!-- 02 — Opret event (kun owner) -->
  <section>
    <div class="label">02 — Opret event</div>
    <form
      method="POST"
      action="?/createEvent"
      class="form"
      use:enhance={() => {
        submitting = true;
        return async ({ update }) => {
          await update();
          submitting = false;
        };
      }}
    >
      <label for="name">Navn</label>
      <input id="name" name="name" type="text" required maxlength="200" />

      <label for="eventDate">Dato</label>
      <input id="eventDate" name="eventDate" type="date" />

      <label for="location">Sted</label>
      <input id="location" name="location" type="text" maxlength="200" />

      <label for="description">Beskrivelse</label>
      <textarea id="description" name="description" rows="3"></textarea>

      {#if form?.error}
        <p class="error" role="alert">{form.error}</p>
      {/if}
      <button type="submit" disabled={submitting}>
        {submitting ? 'Opretter…' : 'Opret event'}
      </button>
    </form>
  </section>

  {#if data.events.length > 0}
    <!-- 03 — Upload billede (kun owner) -->
    <section>
      <div class="label">03 — Upload billede</div>
      <form
        method="POST"
        action="?/uploadImage"
        enctype="multipart/form-data"
        class="form"
        use:enhance={() => {
          submitting = true;
          return async ({ update }) => {
            await update();
            submitting = false;
          };
        }}
      >
        <label for="eventId">Event</label>
        <select id="eventId" name="eventId" required>
          {#each data.events as event (event.id)}
            <option value={event.id}>{event.name}</option>
          {/each}
        </select>

        <label for="file">Billede (JPEG, PNG, WebP, GIF eller AVIF, maks 8 MB)</label>
        <input id="file" name="file" type="file" accept="image/*" required />

        <label for="caption">Billedtekst</label>
        <input id="caption" name="caption" type="text" maxlength="200" />

        <button type="submit" disabled={submitting}>
          {submitting ? 'Uploader…' : 'Upload billede'}
        </button>
      </form>
    </section>
  {/if}
{/if}

<style>
  .lead {
    font-size: 1.25rem;
    color: #cccccc;
  }

  .events {
    list-style: none;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 32rem;
    margin: 0 auto;
    border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
  }

  .event {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: clamp(1rem, 3vw, 1.5rem) clamp(0.5rem, 2vw, 1rem);
  }

  .event + .event {
    border-top: 1px solid var(--line);
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

  .event-head time {
    color: var(--fg-muted);
    font-size: 0.875rem;
    white-space: nowrap;
  }

  .event-head .location {
    color: var(--fg-muted);
    font-size: 0.875rem;
    white-space: nowrap;
  }

  .description {
    max-width: none;
    margin-bottom: 0;
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

  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    max-width: 24rem;
    margin: 0 auto;
    text-align: left;
  }

  .form label {
    align-self: flex-start;
    font-size: 0.875rem;
    letter-spacing: 0.02em;
    color: var(--fg-muted);
  }

  .form input,
  .form select,
  .form textarea {
    width: 100%;
    padding: 0.75rem 1rem;
    font-family: inherit;
    font-size: 1rem;
    color: var(--fg);
    background: var(--bg-soft);
    border: 1px solid var(--line);
    border-radius: 0.5rem;
    transition: border-color 0.2s var(--ease);
  }

  .form input:focus,
  .form select:focus,
  .form textarea:focus {
    outline: none;
    border-color: var(--accent);
  }

  .form button {
    width: 100%;
    margin-top: 0.5rem;
    padding: 0.75rem 1.5rem;
    font-family: inherit;
    font-size: 0.9375rem;
    font-weight: 500;
    letter-spacing: 0.02em;
    color: var(--bg);
    background: var(--accent);
    border: 1px solid var(--accent);
    border-radius: 999px;
    cursor: pointer;
    transition: opacity 0.2s var(--ease);
  }

  .form button:hover:not(:disabled) {
    opacity: 0.85;
  }

  .form button:disabled {
    opacity: 0.5;
    cursor: default;
  }

  .error {
    align-self: flex-start;
    margin-bottom: 0;
    font-size: 0.875rem;
    color: #ff6b6b;
  }
</style>
