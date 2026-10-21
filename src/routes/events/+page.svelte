<script lang="ts">
  import EventCard from '$lib/components/EventCard.svelte';
  import EventForm from '$lib/components/EventForm.svelte';
  import type { PageData, ActionData } from './$types';

  let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<svelte:head>
  <title>Events – Tour Group</title>
  <meta name="description" content="Events that Tour Group has helped produce." />
</svelte:head>

<!-- Fast baggrundsbillede der dækker hele siden og følger med ved scroll -->
<div class="page-bg" aria-hidden="true" style="--hero-bg: url({data.eventBackgroundUrl});"></div>

<!-- Hero -->
<section class="hero">
  <h1>Events</h1>
  {#if data.events.length === 0}
    <p class="lead">No events right now — check back soon.</p>
  {:else}
    <p class="lead">A selection of events we have helped produce.</p>
  {/if}
</section>

<!-- 01 — Kommende events (tæt på hero) -->
<section class="events-section">
  {#if data.events.length === 0}
    <p class="lead">No events right now — check back soon.</p>
  {:else}
    <ul class="events">
      {#each data.events as event (event.id)}
        <EventCard {event} artists={data.artists} owner={data.owner} />
      {/each}
    </ul>
  {/if}
</section>

{#if data.owner}
  <!-- 02 — Opret event (kun owner) -->
  <section>
    <div class="label">Create event</div>
    <EventForm
      error={form?.error}
      artists={data.artists}
      fields={['name', 'description', 'eventDate', 'location', 'artist', 'linkLabel', 'link', 'file']}
    />
  </section>
{/if}

<style>
  /* Fast baggrundsbillede der dækker hele viewporten og bliver siddende
     mens indholdet ruller forbi ovenpå. */
  .page-bg {
    position: fixed;
    inset: 0;
    z-index: -1;
    background-image: var(--hero-bg);
    background-size: cover;
    background-position: center;
    filter: grayscale(1);
    opacity: 0.9;
    pointer-events: none;
  }

  /* Dæmpende lag så teksten forbliver læsbar ovenpå billedet. */
  .page-bg::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(10, 10, 10, 0.72);
  }

  /* Hero er nu blot indhold ovenpå det faste baggrundsbillede. */
  .hero {
    position: relative;
    padding-bottom: clamp(0.5rem, 2vw, 1rem);
  }

  /* Events-listen trækkes op under hero, men beholder sidens side-margen. */
  .events-section {
    padding-top: 0;
  }

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
    text-align: left;
    border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
    }

    /* Giv event-listen mere plads på alt undtagen mobil. */
    @media (min-width: 641px) {
    .events {
      max-width: 56rem;
    }
    }

  .events :global(.event + .event) {
    border-top: 1px solid var(--line);
  }
</style>
