<script lang="ts">
  import EventForm from '$lib/components/EventForm.svelte';
  import type { PageData, ActionData } from './$types';

  let { data, form }: { data: PageData; form: ActionData } = $props();

  const partnere = [
    'Nordic Rentals',
    'Profox',
    'Eventsuply/Showtech',
    'Dr Koncerthuset',
    'Tivoli Kongresscenter',
    'Bella Center',
  ];
</script>

<svelte:head>
  <title>Tour Group</title>
  <meta name="description" content="Tour Group — lighting design and production for events." />
</svelte:head>

<!-- Hero -->
<section class="hero">
  <div class="label">Lighting for events · Denmark</div>
  <h1>Tour Group</h1>
  <p class="lead">Coming soon</p>
</section>

<!-- 01 — Selected work -->
<section>
  <div class="label">01 — Artists</div>
  <ul class="work">
    {#each data.selectedWork as work (work.id)}
      <li>
        {#if work.event_id}
          <a class="work-link" href="/events#event-{work.event_id}">
            <span class="work-name">{work.name}</span>
            {#if work.years}
              <span class="work-years">{work.years}</span>
            {/if}
            <span class="work-arrow" aria-hidden="true">→</span>
          </a>
        {:else}
          <div class="work-link">
            <span class="work-name">{work.name}</span>
            {#if work.years}
              <span class="work-years">{work.years}</span>
            {/if}
            <span class="work-arrow" aria-hidden="true">→</span>
          </div>
        {/if}
      </li>
    {/each}
  </ul>
</section>

{#if data.owner}
  <!-- 01b — Opret selected work (kun owner) -->
  <section>
    <div class="label">Create selected work</div>
    <EventForm
      action="?/createWork"
      fields={['name', 'years']}
      submitLabel="Add"
      pendingLabel="Adding…"
      error={form?.error}
    />
  </section>
{/if}

<!-- 02 — Samarbejde med virksomheder -->
<section>
  <div class="label">02 — Working with companies</div>
  <ul class="partners">
    {#each partnere as partner}
      <li>{partner}</li>
    {/each}
  </ul>
</section>

<style>
  .lead {
    font-size: 1.25rem;
    color: #cccccc;
  }

  .work {
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
    width: 100%;
    max-width: 32rem;
    margin: 0 auto;
    border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
  }

  .work li {
    width: 100%;
  }

  .work li + li {
    border-top: 1px solid var(--line);
  }

  .work-link {
    display: grid;
    grid-template-columns: 1fr auto auto;
    align-items: baseline;
    gap: 0.75rem;
    width: 100%;
    padding: clamp(1rem, 3vw, 1.5rem) clamp(0.5rem, 2vw, 1rem);
    color: var(--fg);
    border-bottom: none;
    transition: color 0.2s var(--ease);
  }

  .work-name {
    text-align: left;
    font-size: clamp(1rem, 2.5vw, 1.25rem);
    letter-spacing: 0.02em;
  }

  .work-years {
    color: var(--fg-muted);
    font-size: 0.875rem;
    white-space: nowrap;
  }

  .work-arrow {
    color: var(--fg-muted);
    font-size: clamp(1rem, 2.5vw, 1.25rem);
    transition: transform 0.2s var(--ease), color 0.2s var(--ease);
  }

  a.work-link:hover,
  a.work-link:focus-visible {
    color: var(--accent);
  }

  a.work-link:hover .work-arrow,
  a.work-link:focus-visible .work-arrow {
    color: var(--accent);
    transform: translateX(0.25rem);
  }

  .partners {
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
    width: 100%;
    max-width: 32rem;
    margin: 0 auto;
    border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
  }

  .partners li {
    width: 100%;
    padding: clamp(1rem, 3vw, 1.5rem) clamp(0.5rem, 2vw, 1rem);
    font-size: clamp(1rem, 2.5vw, 1.25rem);
    color: var(--fg);
    letter-spacing: 0.02em;
    transition: color 0.2s var(--ease);
  }

  .partners li + li {
    border-top: 1px solid var(--line);
  }

  .partners li:hover {
    color: var(--accent);
  }
</style>
