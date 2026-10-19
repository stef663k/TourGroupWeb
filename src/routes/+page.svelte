<script lang="ts">
  import { enhance } from '$app/forms';
  import EventForm from '$lib/components/EventForm.svelte';
  import ArtistModal from '$lib/components/ArtistModal.svelte';
  import type { PageData, ActionData } from './$types';
  import type { ComponentProps } from 'svelte';

  let { data, form }: { data: PageData; form: ActionData } = $props();

  function confirmDeleteArtist(e: SubmitEvent, name: string) {
    if (!confirm(`Delete “${name}”? This cannot be undone.`)) {
      e.preventDefault();
    }
  }

  function confirmDeleteCompany(e: SubmitEvent, name: string) {
    if (!confirm(`Delete “${name}”? This cannot be undone.`)) {
      e.preventDefault();
    }
  }

  let editingId = $state<number | null>(null);

  function toggleEdit(id: number) {
    editingId = editingId === id ? null : id;
  }

  let editingCompanyId = $state<number | null>(null);

  function toggleEditCompany(id: number) {
    editingCompanyId = editingCompanyId === id ? null : id;
  }

  let modalArtist = $state<ComponentProps<typeof ArtistModal>['artist'] | null>(null);

  // Rækkefølgen ejeren redigerer i. Kopieres fra data.artists når panelet
  // åbnes, så uenige ændringer ikke overskriver den gemte rækkefølge.
  let reorderOpen = $state(false);
  let draftOrder = $state<number[]>([]);

  // Navnene slås op fra data.artists (som altid er den gemte rækkefølge),
  // så panelet kan vise navne mens rækkefølgen i draftOrder ændres.
  let artistNameById = $derived(new Map(data.artists.map((artist) => [artist.id, artist.name])));
  let orderDirty = $derived(
    draftOrder.length !== data.artists.length ||
      draftOrder.some((id, index) => data.artists[index]?.id !== id)
  );

  function openReorder() {
    draftOrder = data.artists.map((artist) => artist.id);
    reorderOpen = true;
  }

  function closeReorder() {
    reorderOpen = false;
  }

  function moveArtist(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= draftOrder.length) return;
    const next = [...draftOrder];
    [next[index], next[target]] = [next[target], next[index]];
    draftOrder = next;
  }
  </script>

<svelte:head>
  <title>Tour Group</title>
  <meta name="description" content="Tour Group — lighting design and production for events." />
</svelte:head>

<!-- Fast baggrundsbillede der dækker hele siden og følger med ved scroll -->
<div class="page-bg" aria-hidden="true" style="--hero-bg: url({data.heroBackgroundUrl});"></div>

<!-- Hero -->
<section class="hero">
  <div class="label">Lighting for events</div>
  <h1>
    <img class="hero-logo" src={data.logoUrl} alt="Tour Group" />
  </h1>
  <p class="lead">Coming soon</p>
</section>

<!-- 01 — Artists -->
<section>
  <div class="label">01 — Artists</div>
  <ul class="work">
    {#each data.artists as work (work.id)}
      <li class="work-row">
        <button
          type="button"
          class="work-link"
          aria-haspopup="dialog"
          onclick={() => (modalArtist = work)}
        >
          {#if work.imageUrl}
            <span class="work-thumb" aria-hidden="true">
              <img src={work.imageUrl} alt="" loading="lazy" />
            </span>
          {/if}
          <span class="work-name">{work.name}</span>
          {#if work.years}
            <span class="work-years">{work.years}</span>
          {/if}
        </button>
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
          <form method="POST" action="?/deleteArtist" use:enhance onsubmit={(e) => confirmDeleteArtist(e, work.name)}>
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
      {#if work.latestEventId}
        <li class="work-foot">
          <a class="work-latest" href="/events#event-{work.latestEventId}">
            latest event
            <span class="work-arrow" aria-hidden="true">→</span>
          </a>
        </li>
      {/if}
      {#if data.owner && editingId === work.id}
        <li class="edit-row">
          <form method="POST" action="?/updateArtist" enctype="multipart/form-data" use:enhance={() => async ({ update }) => { await update(); editingId = null; }} class="edit-form">
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

            <label for="edit-photo-{work.id}">Picture {work.imageUrl ? '(replaces the current one)' : '(optional)'}</label>
            {#if work.imageUrl}
              <div class="edit-image-current">
                <img src={work.imageUrl} alt="Current picture for {work.name}" />
                <label class="remove-image-label">
                  <input type="checkbox" name="removeImage" value="1" />
                  Delete current picture
                </label>
              </div>
            {/if}
            <input
              id="edit-photo-{work.id}"
              name="file"
              type="file"
              accept="image/*"
            />

            <div class="edit-actions">
              <button type="button" class="cancel" onclick={() => (editingId = null)}>Cancel</button>
              <button type="submit" class="save">Save</button>
            </div>
          </form>
        </li>
      {/if}
    {/each}
    </ul>

    {#if data.owner && data.artists.length > 1}
    <!-- 01a — Sorter artister (kun owner) -->
    <div class="reorder">
      {#if !reorderOpen}
        <button type="button" class="reorder-toggle" onclick={openReorder}>
          Reorder artists
        </button>
      {:else}
        <form
          method="POST"
          action="?/reorderArtists"
          use:enhance={() => async ({ update, result }) => {
            await update();
            if (result.type === 'success') reorderOpen = false;
          }}
          class="reorder-form"
        >
          <input type="hidden" name="order" value={draftOrder.join(',')} />
          <p class="reorder-hint">Use the arrows to change the order, then save.</p>
          <ol class="reorder-list">
            {#each draftOrder as id, index (id)}
              <li class="reorder-item">
                <span class="reorder-name">{artistNameById.get(id) ?? '—'}</span>
                <span class="reorder-controls">
                  <button
                    type="button"
                    class="icon-btn"
                    aria-label="Move {artistNameById.get(id) ?? 'artist'} up"
                    title="Move up"
                    disabled={index === 0}
                    onclick={() => moveArtist(index, -1)}
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    class="icon-btn"
                    aria-label="Move {artistNameById.get(id) ?? 'artist'} down"
                    title="Move down"
                    disabled={index === draftOrder.length - 1}
                    onclick={() => moveArtist(index, 1)}
                  >
                    ↓
                  </button>
                </span>
              </li>
            {/each}
          </ol>
          <div class="edit-actions">
            <button type="button" class="cancel" onclick={closeReorder}>Cancel</button>
            <button type="submit" class="save" disabled={!orderDirty}>Save order</button>
          </div>
        </form>
      {/if}
    </div>
    {/if}
    </section>

    {#if data.owner}
    <!-- 01b — Opret artist (kun owner) -->
  <section>
    <div class="label">Create artist</div>
    <EventForm
      action="?/createArtist"
      fields={['name', 'years', 'file']}
      submitLabel="Add"
      pendingLabel="Adding…"
      requireImage={false}
      imageLabel="Picture (optional)"
      error={form?.error}
    />
  </section>
{/if}

<!-- 02 — Samarbejde med virksomheder -->
<section>
  <div class="label">02 — Working with companies</div>
  <ul class="partners">
    {#each data.companies as company (company.id)}
      <li class="partner-row">
        {#if company.link}
          <a class="partner-link" href={company.link} target="_blank" rel="noopener noreferrer">
            <span class="partner-name">{company.name}</span>
            <span class="partner-arrow" aria-hidden="true">{'\u2197'}</span>
          </a>
        {:else}
          <div class="partner-link">
            <span class="partner-name">{company.name}</span>
          </div>
        {/if}
        {#if data.owner}
          <button
            type="button"
            class="icon-btn edit"
            aria-label="Edit {company.name}"
            aria-expanded={editingCompanyId === company.id}
            title="Edit"
            onclick={() => toggleEditCompany(company.id)}
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
          <form method="POST" action="?/deleteCompany" use:enhance onsubmit={(e) => confirmDeleteCompany(e, company.name)}>
            <input type="hidden" name="id" value={company.id} />
            <button type="submit" class="icon-btn delete" aria-label="Delete {company.name}" title="Delete">
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
      {#if data.owner && editingCompanyId === company.id}
        <li class="edit-row">
          <form method="POST" action="?/updateCompany" use:enhance={() => async ({ update }) => { await update(); editingCompanyId = null; }} class="edit-form">
            <input type="hidden" name="id" value={company.id} />
            <label for="edit-company-name-{company.id}">Name</label>
            <input
              id="edit-company-name-{company.id}"
              name="name"
              type="text"
              value={company.name}
              required
              maxlength="200"
            />
            <label for="edit-company-link-{company.id}">Link (optional)</label>
            <input
              id="edit-company-link-{company.id}"
              name="link"
              type="url"
              value={company.link ?? ''}
              maxlength="2048"
              placeholder="https://…"
            />
            <div class="edit-actions">
              <button type="button" class="cancel" onclick={() => (editingCompanyId = null)}>Cancel</button>
              <button type="submit" class="save">Save</button>
            </div>
          </form>
        </li>
      {/if}
    {/each}
  </ul>
</section>

{#if data.owner}
  <!-- 02b — Opret virksomhed (kun owner) -->
  <section>
    <div class="label">Create company</div>
    <form method="POST" action="?/createCompany" use:enhance={() => async ({ update }) => { await update(); }} class="edit-form">
      <label for="company-name">Name</label>
      <input id="company-name" name="name" type="text" required maxlength="200" />
      <label for="company-link">Link (optional)</label>
      <input id="company-link" name="link" type="url" maxlength="2048" placeholder="https://…" />
      {#if form?.error}
        <p class="form-error" role="alert">{form.error}</p>
      {/if}
      <div class="edit-actions">
        <button type="submit" class="save">Add</button>
      </div>
    </form>
  </section>
{/if}

{#if modalArtist}
  <ArtistModal artist={modalArtist} owner={data.owner} onclose={() => (modalArtist = null)} />
{/if}

<style>
  .hero-logo {
    display: block;
    width: 100%;
    max-width: 34rem;
    height: auto;
    margin-inline: auto;
  }

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
  }

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
    max-width: var(--content-width);
    margin: 0 auto;
    border-top: 1px solid var(--line-strong);
    border-bottom: 1px solid var(--line-strong);
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

  /* Sorteringspanel for ejeren, vist under artistlisten. */
  .reorder {
    width: 100%;
    max-width: var(--content-width);
    margin: clamp(0.75rem, 2vw, 1rem) auto 0;
  }

  .reorder-toggle {
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

  .reorder-toggle:hover,
  .reorder-toggle:focus-visible {
    color: var(--fg);
    border-color: var(--fg-muted);
  }

  .reorder-form {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: clamp(0.75rem, 2vw, 1rem);
    text-align: left;
    background: var(--bg-soft);
    border: 1px solid var(--line);
    border-radius: 0.5rem;
  }

  .reorder-hint {
    margin: 0;
    font-size: 0.8125rem;
    color: var(--fg-muted);
  }

  .reorder-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  .reorder-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    padding: 0.375rem 0.75rem;
    background: var(--bg);
    border: 1px solid var(--line);
    border-radius: 0.375rem;
  }

  .reorder-name {
    min-width: 0;
    overflow-wrap: anywhere;
    font-size: 0.9375rem;
  }

  .reorder-controls {
    flex: 0 0 auto;
    display: inline-flex;
    gap: 0.25rem;
  }

  .reorder-controls .icon-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.75rem;
    height: 1.75rem;
    padding: 0;
    font-size: 1rem;
    line-height: 1;
    color: var(--fg-muted);
    background: transparent;
    border: 1px solid var(--line);
    border-radius: 0.375rem;
    cursor: pointer;
    transition: color 0.2s var(--ease), border-color 0.2s var(--ease);
  }

  .reorder-controls .icon-btn:hover:not(:disabled),
  .reorder-controls .icon-btn:focus-visible:not(:disabled) {
    color: var(--accent);
    border-color: var(--accent);
  }

  .reorder-controls .icon-btn:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  .edit-actions .save:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .work-foot {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.25rem;
    padding: 0 clamp(0.5rem, 2vw, 1rem) clamp(0.75rem, 2vw, 1rem);
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

  .edit-form input {
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

  .edit-form input:focus {
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

  .edit-actions .save:hover:not(:disabled) {
    opacity: 0.85;
  }

  .work li + li {
    border-top: 1px solid var(--line-strong);
  }

  /* "latest event" hører til rækken ovenfor, så der må ikke være en skillelinje imellem. */
  .work-row + .work-foot {
    border-top: none;
  }

  .work-link {
    display: grid;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    padding: clamp(1rem, 3vw, 1.5rem) clamp(0.5rem, 2vw, 1rem);
    font-family: inherit;
    text-align: left;
    color: var(--fg);
    background: transparent;
    border: none;
    cursor: pointer;
    transition: color 0.2s var(--ease);
    }

    .work-thumb {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: clamp(5rem, 12vw, 9rem);
    height: clamp(5rem, 12vw, 9rem);
    overflow: hidden;
    background: var(--bg-soft);
    border: 1px solid var(--line);
    border-radius: 0.5rem;
    flex-shrink: 0;
    }

    .work-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    }

  .work-link:hover,
  .work-link:focus-visible {
    color: var(--accent);
  }

  .work-name {
    flex: 1 1 auto;
    text-align: center;
    font-size: clamp(1rem, 2.5vw, 1.25rem);
    letter-spacing: 0.02em;
  }

  .work-years {
    flex: 0 0 auto;
    color: var(--fg-muted);
    font-size: 0.875rem;
    white-space: nowrap;
  }

  .work-latest {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    color: var(--fg-muted);
    font-size: 0.75rem;
    letter-spacing: 0.02em;
    white-space: nowrap;
    border-bottom: none;
    transition: color 0.2s var(--ease);
  }

  .work-latest:hover,
  .work-latest:focus-visible {
    color: var(--accent);
  }

  .work-latest:hover .work-arrow,
  .work-latest:focus-visible .work-arrow {
    color: var(--accent);
    transform: translateX(0.25rem);
  }

  .work-arrow {
    color: var(--fg-muted);
    font-size: clamp(1rem, 2.5vw, 1.25rem);
    transition: transform 0.2s var(--ease), color 0.2s var(--ease);
  }

  .partners {
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
    width: 100%;
    max-width: var(--content-width);
    margin: 0 auto;
    border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
  }

  .partners li {
    width: 100%;
  }

  .partner-row {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .partner-row .partner-link {
    flex: 1 1 auto;
    min-width: 0;
  }

  .partner-row .icon-btn {
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

  .partner-row .icon-btn:last-child {
    margin-right: clamp(0.5rem, 2vw, 1rem);
  }

  .partner-row .icon-btn.edit:hover,
  .partner-row .icon-btn.edit:focus-visible {
    color: var(--accent);
    background: rgba(255, 255, 255, 0.08);
  }

  .partner-row .icon-btn.delete:hover,
  .partner-row .icon-btn.delete:focus-visible {
    color: #ff6b6b;
    background: rgba(255, 107, 107, 0.1);
  }

  .partner-row .icon-btn svg {
    width: 1.0625rem;
    height: 1.0625rem;
  }

  .partner-link {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 0.75rem;
    width: 100%;
    padding: clamp(1rem, 3vw, 1.5rem) clamp(0.5rem, 2vw, 1rem);
    font-size: clamp(1rem, 2.5vw, 1.25rem);
    color: var(--fg);
    letter-spacing: 0.02em;
    border-bottom: none;
    transition: color 0.2s var(--ease);
  }

  .partner-name {
    text-align: left;
  }

  .partner-arrow {
    color: var(--fg-muted);
    font-size: clamp(1rem, 2.5vw, 1.25rem);
    transition: transform 0.2s var(--ease), color 0.2s var(--ease);
  }

  a.partner-link:hover,
  a.partner-link:focus-visible {
    color: var(--accent);
  }

  a.partner-link:hover .partner-arrow,
  a.partner-link:focus-visible .partner-arrow {
    color: var(--accent);
    transform: translateX(0.25rem);
  }

  .edit-row {
    padding: 0 clamp(0.5rem, 2vw, 1rem) clamp(1rem, 3vw, 1.5rem);
  }

  .edit-form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    max-width: var(--content-width);
    margin: 0 auto;
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

  .edit-form input {
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

  .edit-form input:focus {
    outline: none;
    border-color: var(--accent);
  }

  .edit-image-current {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .edit-image-current img {
    width: 4rem;
    height: 4rem;
    object-fit: cover;
    border: 1px solid var(--line);
    border-radius: 0.375rem;
  }

  .remove-image-label {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    font-size: 0.8125rem;
    color: var(--fg-muted);
    cursor: pointer;
  }

  .remove-image-label input {
    width: auto;
  }

  .form-error {
    margin-bottom: 0;
    font-size: 0.875rem;
    color: #ff6b6b;
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

  .edit-actions .save:hover:not(:disabled) {
    opacity: 0.85;
  }

  .partners li + li {
    border-top: 1px solid var(--line);
  }
</style>
