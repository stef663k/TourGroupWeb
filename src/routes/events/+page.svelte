<script lang="ts">
  // Udfyld med rigtige events når de er klar.
  const events: { dato: string; navn: string }[] = [];
</script>

<svelte:head>
  <title>Events – Tour Group</title>
  <meta name="description" content="Events som Tour Group har været med til at producere." />
</svelte:head>

<!-- Hero -->
<section class="hero">
  <div class="label">Events · Denmark</div>
  <h1>Events</h1>
  {#if events.length === 0}
    <p class="lead">Ingen events lige nu — kom snart igen.</p>
  {:else}
    <p class="lead">Et udvalg af events vi har været med til at producere.</p>
  {/if}
</section>

<!-- 01 — Kommende events -->
<section>
  <div class="label">01 — Kommende events</div>
  {#if events.length === 0}
    <p class="lead">Ingen events lige nu — kom snart igen.</p>
  {:else}
    <ul class="events">
      {#each events as event}
        <li>
          <time>{event.dato}</time>
          <span>{event.navn}</span>
        </li>
      {/each}
    </ul>
  {/if}
</section>

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

  .events li {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 1.5rem;
    padding: clamp(1rem, 3vw, 1.5rem) clamp(0.5rem, 2vw, 1rem);
    font-size: clamp(1rem, 2.5vw, 1.25rem);
    color: var(--fg);
    letter-spacing: 0.02em;
    transition: color 0.2s var(--ease);
  }

  .events li + li {
    border-top: 1px solid var(--line);
  }

  .events li:hover {
    color: var(--accent);
  }

  .events time {
    color: var(--fg-muted);
    font-size: 0.875rem;
    white-space: nowrap;
  }
</style>
