<script lang="ts">
  import { enhance } from '$app/forms';
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

  function confirmDeleteWork(e: SubmitEvent, name: string) {
    if (!confirm(`Delete “${name}”? This cannot be undone.`)) {
      e.preventDefault();
    }
  }

  let editingId = $state<number | null>(null);

  function toggleEdit(id: number) {
    editingId = editingId === id ? null : id;
  }
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

<!-- 01 — Artists -->
<section>
  <div class="label">01 — Artists</div>
  <ul class="work">
    {#each data.selectedWork as work (work.id)}
      <li class="work-row">
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
        {#if data.owner}
          <button
            type="button"
            class="icon-btn edit"
            aria-label="Edit {work.name}"
            aria-expanded={editingId === work.id}
            title="Edit"
            onclick={() => toggleEdit(work.id)}
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
          <form method="POST" action="?/deleteWork" use:enhance onsubmit={(e) => confirmDeleteWork(e, work.name)}>
            <input type="hidden" name="id" value={work.id} />
            <button type="submit" class="icon-btn delete" aria-label="Delete {work.name}" title="Delete">
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
      </li>
      {#if data.owner && editingId === work.id}
        <li class="edit-row">
          <form method="POST" action="?/updateWork" use:enhance={() => async ({ update }) => { await update(); editingId = null; }} class="edit-form">
            <input type="hidden" name="id" value={work.id} />
            <label for="edit-name-{work.id}">Name</label>
            <input
              id="edit-name-{work.id}"
              name="name"
              type="text"
              value={work.name}
              required
              maxlength="200"
            />
            <label for="edit-years-{work.id}">Year (e.g. 22-24)</label>
            <input
              id="edit-years-{work.id}"
              name="years"
              type="text"
              value={work.years ?? ''}
              maxlength="50"
              placeholder="22-24"
            />
            <label for="edit-event-{work.id}">Linked event</label>
            <select id="edit-event-{work.id}" name="eventId">
              <option value="" selected={work.event_id === null}>None</option>
              {#each data.events as option (option.id)}
                <option value={option.id} selected={work.event_id === option.id}>{option.name}</option>
              {/each}
            </select>
            <div class="edit-actions">
              <button type="button" class="cancel" onclick={() => (editingId = null)}>Cancel</button>
              <button type="submit" class="save">Save</button>
            </div>
          </form>
        </li>
      {/if}
    {/each}
  </ul>
</section>

{#if data.owner}
  <!-- 01b — Opret selected work (kun owner) -->
  <section>
    <div class="label">Create selected work</div>
    <EventForm
      action="?/createWork"
      fields={['name', 'years', 'event']}
      events={data.events}
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

  .work-row {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .work-row .work-link {
    flex: 1 1 auto;
    min-width: 0;
  }

  .work-row .icon-btn {
    flex: 0 0 auto;
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

  .work-row .icon-btn:last-child {
    margin-right: clamp(0.5rem, 2vw, 1rem);
  }

  .work-row .icon-btn.edit:hover,
  .work-row .icon-btn.edit:focus-visible {
    color: var(--accent);
    background: rgba(255, 255, 255, 0.08);
  }

  .work-row .icon-btn.delete:hover,
  .work-row .icon-btn.delete:focus-visible {
    color: #ff6b6b;
    background: rgba(255, 107, 107, 0.1);
  }

  .work-row .icon-btn svg {
    width: 1.0625rem;
    height: 1.0625rem;
  }

  .edit-row {
    padding: 0 clamp(0.5rem, 2vw, 1rem) clamp(1rem, 3vw, 1.5rem);
  }

  .edit-form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: clamp(0.75rem, 2vw, 1rem);
    text-align: left;
    background: var(--bg-soft);
    border: 1px solid var(--line);
    border-radius: 0.5rem;
  }

  .edit-form label {
    font-size: 0.8125rem;
    letter-spacing: 0.02em;
    color: var(--fg-muted);
  }

  .edit-form input,
  .edit-form select {
    width: 100%;
    padding: 0.5rem 0.75rem;
    font-family: inherit;
    font-size: 0.9375rem;
    color: var(--fg);
    background: var(--bg);
    border: 1px solid var(--line);
    border-radius: 0.375rem;
    transition: border-color 0.2s var(--ease);
  }

  .edit-form input:focus,
  .edit-form select:focus {
    outline: none;
    border-color: var(--accent);
  }

  .edit-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    margin-top: 0.25rem;
  }

  .edit-actions button {
    padding: 0.5rem 1.25rem;
    font-family: inherit;
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0.02em;
    border-radius: 999px;
    cursor: pointer;
    transition: opacity 0.2s var(--ease), color 0.2s var(--ease), border-color 0.2s var(--ease);
  }

  .edit-actions .cancel {
    background: transparent;
    color: var(--fg-muted);
    border: 1px solid var(--line);
  }

  .edit-actions .cancel:hover {
    color: var(--fg);
    border-color: var(--fg-muted);
  }

  .edit-actions .save {
    color: var(--bg);
    background: var(--accent);
    border: 1px solid var(--accent);
  }

  .edit-actions .save:hover {
    opacity: 0.85;
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
