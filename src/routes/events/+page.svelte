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

<!-- Hero -->
<section class="hero">
  <div class="label">Events · Denmark</div>
  <h1>Events</h1>
  {#if data.events.length === 0}
    <p class="lead">No events right now — check back soon.</p>
  {:else}
    <p class="lead">A selection of events we have helped produce.</p>
  {/if}
</section>

<!-- 01 — Kommende events -->
<section>
  <div class="label">01 — Upcoming events</div>
  {#if data.events.length === 0}
    <p class="lead">No events right now — check back soon.</p>
  {:else}
    <ul class="events">
      {#each data.events as event (event.id)}
        <EventCard {event} owner={data.owner} />
      {/each}
    </ul>
  {/if}
</section>

{#if data.owner}
  <!-- 02 — Opret event (kun owner) -->
  <section>
    <div class="label">02 — Create event</div>
    <EventForm error={form?.error} />
  </section>
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

  .events :global(.event + .event) {
    border-top: 1px solid var(--line);
  }
</style>
