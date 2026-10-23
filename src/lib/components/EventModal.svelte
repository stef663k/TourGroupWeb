<script lang="ts">
  import { enhance } from '$app/forms';
  import { compressImage } from '$lib/image';
  import FaviconLink from './FaviconLink.svelte';

  interface EventImage {
    id: number;
    caption: string | null;
    alt: string | null;
    url: string;
    isCover: boolean;
  }

  interface EventData {
    id: number;
    name: string;
    event_date: string | null;
    location: string | null;
    description: string | null;
    details: string | null;
    link: string | null;
    link_label: string | null;
    artist_id: number | null;
    artistName: string | null;
    images: EventImage[];
    }

  type ArtistOption = { id: number; name: string };

  let {
    event,
    owner = false,
    artists = [],
    embedded = false,
    backLabel = 'Tilbage',
    onback,
    onclose
  }: {
    event: EventData;
    owner?: boolean;
    artists?: ArtistOption[];
    embedded?: boolean;
    backLabel?: string;
    onback?: () => void;
    onclose: () => void;
  } = $props();

  // The modal is mounted per event, so capturing the initial values is intentional.
  // svelte-ignore state_referenced_locally
  let name = $state(event.name);
  // svelte-ignore state_referenced_locally
  let details = $state(event.details ?? '');
  // svelte-ignore state_referenced_locally
  let artistId = $state(event.artist_id ? String(event.artist_id) : '');
  // svelte-ignore state_referenced_locally
  let link = $state(event.link ?? '');
  // svelte-ignore state_referenced_locally
  let linkLabel = $state(event.link_label ?? '');

  // Modalen viser de uploadede billeder (alt undtagen cover-billedet, som
  // vises på eventkortet). Det gælder for alle — også ikke-ownere.
  let photos = $derived(event.images.filter((image) => !image.isCover));

  // Re-sync the editable fields only when the parent passes a genuinely new
  // saved value (e.g. after the update action re-runs the load). Comparing
  // against the values we last synced from avoids clobbering unsaved edits
  // when unrelated reloads (like adding/removing photos) happen.
  // svelte-ignore state_referenced_locally
  let syncedName = event.name;
  // svelte-ignore state_referenced_locally
  let syncedDetails = event.details ?? '';
  // svelte-ignore state_referenced_locally
  let syncedArtistId = event.artist_id;
  // svelte-ignore state_referenced_locally
  let syncedLink = event.link ?? '';
  // svelte-ignore state_referenced_locally
  let syncedLinkLabel = event.link_label ?? '';
  $effect(() => {
    if (
      event.name !== syncedName ||
      (event.details ?? '') !== syncedDetails ||
      event.artist_id !== syncedArtistId ||
      (event.link ?? '') !== syncedLink ||
      (event.link_label ?? '') !== syncedLinkLabel
    ) {
      syncedName = event.name;
      syncedDetails = event.details ?? '';
      syncedArtistId = event.artist_id;
      syncedLink = event.link ?? '';
      syncedLinkLabel = event.link_label ?? '';
      name = event.name;
      details = event.details ?? '';
      artistId = event.artist_id ? String(event.artist_id) : '';
      link = event.link ?? '';
      linkLabel = event.link_label ?? '';
    }
  });

  let fileInput = $state<HTMLInputElement>();
  // Én post pr. valgt fil. Hver post holdes adskilt, så flere billeder kan
  // komprimeres og uploades i samme indsendelse.
  let items = $state<{ compressed: File; previewUrl: string }[]>([]);
  let compressing = $state(false);
  let imageNote: string | null = $state(null);

  function close() {
    clearSelection();
    onclose();
  }

  function onKeydown(e: KeyboardEvent) {
    // I indlejret tilstand (inde i artistmodalen) tager den ydre modal sig af
    // Escape, så vi undgår dobbelt håndtering.
    if (embedded) return;
    if (e.key === 'Escape') close();
  }

  function revokeItems() {
    for (const item of items) URL.revokeObjectURL(item.previewUrl);
  }

  function clearSelection() {
    revokeItems();
    items = [];
    imageNote = null;
  }

  // Sørg for at selve <input>-feltet altid indeholder præcis de valgte
  // (komprimerede) filer. SvelteKit's `use:enhance` læser filerne fra
  // input-feltet i det øjeblik formularen indsendes, så vi kan IKKE bytte
  // filerne i submit-callbacken (den kører for sent). Derfor synkroniserer vi
  // input-feltet hver gang listen ændres.
  function syncInputFiles() {
    if (!fileInput) return;
    const dt = new DataTransfer();
    for (const item of items) dt.items.add(item.compressed);
    fileInput.files = dt.files;
  }

  // Fjern en enkelt valgt fil før den gemmes (fx hvis brugeren kom til at
  // vælge det forkerte billede). Frigør dens preview-URL og opdatér noten.
  function removeItem(previewUrl: string) {
    URL.revokeObjectURL(previewUrl);
    items = items.filter((item) => item.previewUrl !== previewUrl);
    if (items.length === 0) imageNote = null;
    syncInputFiles();
  }

  function formatSize(bytes: number): string {
    return bytes >= 1024 * 1024
      ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
      : `${Math.round(bytes / 1024)} KB`;
  }

  async function onFileChange(e: Event) {
    const input = e.currentTarget as HTMLInputElement;
    const files = Array.from(input.files ?? []);

    clearSelection();
    if (files.length === 0) return;

    compressing = true;
    let savedBytes = 0;
    try {
      for (const file of files) {
        let result: File;
        try {
          result = await compressImage(file);
        } catch {
          // Kunne ikke komprimere (fx HEIC uden decoder i browseren). Behold
          // originalen og lad serveren give en klar fejl hvis den afvises.
          result = file;
        }
        if (result.size < file.size) savedBytes += file.size - result.size;
        items = [
          ...items,
          { compressed: result, previewUrl: URL.createObjectURL(result) }
        ];
      }
      if (savedBytes > 0) {
        imageNote =
          files.length > 1
            ? `Compressed ${files.length} images (saved ${formatSize(savedBytes)}).`
            : `Compressed, saving ${formatSize(savedBytes)}.`;
      }
      } finally {
      compressing = false;
      }
      // Sæt de komprimerede filer tilbage i input-feltet, så de er det der
      // indsendes (i stedet for originalerne).
      syncInputFiles();
      }

  function onSubmitImage() {
    return async ({
      update
    }: {
      update: (opts?: { reset?: boolean }) => Promise<void>;
    }) => {
      await update({ reset: true });
      if (fileInput) fileInput.value = '';
      clearSelection();
    };
  }

  function confirmDeleteImage(e: SubmitEvent) {
    if (!confirm('Delete this image? This cannot be undone.')) {
      e.preventDefault();
    }
  }

  // Submit the details form without resetting it, so the typed/saved text
  // stays visible after the action completes.
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

  $effect(() => () => revokeItems());
</script>

<svelte:window onkeydown={onKeydown} />

{#if embedded}
  <!-- Indlejret i artistmodalen: vi viser kun modalens indhold, så den ydre
       modal (og dens overlay/fokus-fælde) genbruges i stedet for at stable
       endnu en modal oven på den. -->
  <div class="modal-head">
    {#if onback}
      <button type="button" class="back" onclick={onback}>← {backLabel}</button>
    {:else}
      <span></span>
    {/if}
    <button type="button" class="close" aria-label="Close" onclick={close}>×</button>
  </div>

  <div class="modal-body">
    <h2 id="event-modal-title" class="event-title">{event.name}</h2>

    <div class="modal-content">
      {@render content()}
    </div>
  </div>
{:else}
  <div
    class="overlay"
    role="presentation"
    onclick={(e) => {
      if (e.target === e.currentTarget) close();
    }}
  >
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="event-modal-title">
      <div class="modal-head">
        <h2 id="event-modal-title">{event.name}</h2>
        <button type="button" class="close" aria-label="Close" onclick={close}>×</button>
      </div>

      <div class="modal-body">
        {@render content()}
      </div>
    </div>
  </div>
{/if}

{#snippet content()}
      {#if owner}
        <form method="POST" action="?/updateEvent" use:enhance={onSubmitDetails} class="edit-form">
          <input type="hidden" name="id" value={event.id} />
          <input type="hidden" name="eventDate" value={event.event_date ?? ''} />
          <input type="hidden" name="location" value={event.location ?? ''} />

          <label for="modal-name">Name</label>
          <input id="modal-name" name="name" type="text" bind:value={name} required maxlength="200" />

          <label for="modal-artist">Artist</label>
          <select id="modal-artist" name="artistId" bind:value={artistId}>
            <option value="">None</option>
            {#each artists as option (option.id)}
              <option value={String(option.id)}>{option.name}</option>
            {/each}
          </select>

          <label for="modal-link-label">Link text (optional)</label>
          <input
            id="modal-link-label"
            name="linkLabel"
            type="text"
            bind:value={linkLabel}
            maxlength="200"
            placeholder="More info"
          />

          <label for="modal-link">Link (optional)</label>
          <input
            id="modal-link"
            name="link"
            type="url"
            bind:value={link}
            maxlength="2048"
            placeholder="https://…"
          />

          <label for="modal-description">Details</label>
          <textarea
            id="modal-description"
            name="details"
            rows="5"
            bind:value={details}
          ></textarea>

          <div class="edit-actions">
            <button type="submit" class="save">Save details</button>
          </div>
        </form>
      {:else if event.details}
        <p class="description">{event.details}</p>
      {/if}

      {#if event.link}
        <p class="link-row">
          <span class="link-label">Link</span>
          <FaviconLink class="event-link" href={event.link} label={event.link_label || event.link} />
        </p>
      {/if}

      <div class="images-section">
        <h3>Photos</h3>

        {#if photos.length > 0}
          <ul class="images">
            {#each photos as image (image.id)}
              <li>
                <img src={image.url} alt={image.alt ?? image.caption ?? event.name} loading="lazy" />
                {#if owner}
                  <form
                    method="POST"
                    action="?/removeEventImage"
                    use:enhance
                    onsubmit={confirmDeleteImage}
                  >
                    <input type="hidden" name="id" value={image.id} />
                    <button type="submit" class="remove" aria-label="Delete image" title="Delete">
                      ×
                    </button>
                    </form>
                    {/if}
              </li>
            {/each}
          </ul>
        {:else}
          <p class="empty">No photos yet.</p>
        {/if}

        {#if owner}
          <form
            method="POST"
            action="?/addEventImage"
            enctype="multipart/form-data"
            class="add-image"
            use:enhance={onSubmitImage}
          >
            <input type="hidden" name="id" value={event.id} />
            <label for="modal-image">Add photo</label>
            <input
              id="modal-image"
              name="file"
              type="file"
              accept="image/*"
              multiple
              required
              bind:this={fileInput}
              onchange={onFileChange}
            />
            <label for="modal-caption">Caption (optional)</label>
            <input id="modal-caption" name="caption" type="text" maxlength="200" />

            {#if compressing}
              <p class="note">Compressing image…</p>
            {:else if imageNote}
              <p class="note">{imageNote}</p>
            {/if}

            {#if items.length > 0}
              <ul class="previews">
                {#each items as item, index (item.previewUrl)}
                  <li>
                    <img src={item.previewUrl} alt="Selected upload preview {index + 1}" />
                    <button
                      type="button"
                      class="remove-preview"
                      aria-label="Remove selected image {index + 1}"
                      title="Remove"
                      onclick={() => removeItem(item.previewUrl)}
                    >
                      ×
                    </button>
                  </li>
                {/each}
              </ul>
            {/if}

            <button type="submit" class="save" disabled={compressing || items.length === 0}>
              {compressing
                ? 'Compressing…'
                : items.length > 1
                  ? `Add ${items.length} photos`
                  : 'Add photo'}
            </button>
          </form>
          {/if}
          </div>
          {/snippet}

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

  /* Indlejret tilstand: "tilbage"-knap og event-titel. */
  .back {
    padding: 0.375rem 0.75rem;
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

  .back:hover,
  .back:focus-visible {
    color: var(--fg);
    border-color: var(--fg-muted);
  }

  .event-title {
    margin: 0;
    font-size: clamp(1.125rem, 3vw, 1.5rem);
    letter-spacing: 0.02em;
  }

  .modal-content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
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
  .add-image label {
    font-size: 0.8125rem;
    letter-spacing: 0.02em;
    color: var(--fg-muted);
  }

  .edit-form input,
  .edit-form textarea,
  .edit-form select,
  .add-image input {
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

  .edit-form input:focus,
  .edit-form textarea:focus,
  .edit-form select:focus,
  .add-image input:focus {
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

  .save:disabled {
    opacity: 0.5;
    cursor: default;
  }

  .description {
    margin: 0;
    color: #cccccc;
    font-size: 0.9375rem;
    text-align: left;
    white-space: pre-line;
  }

  .link-row {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    margin: 0;
    text-align: left;
  }

  .link-label {
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--fg-muted);
  }

  .link-row :global(.event-link) {
    color: var(--fg);
    font-size: 0.9375rem;
    overflow-wrap: anywhere;
    border-bottom: none;
  }

  .images-section {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .images-section h3 {
    margin: 0;
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--fg-muted);
  }

  .images {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .images li {
    position: relative;
    flex: 0 0 auto;
    max-width: 100%;
  }

  .images img {
    /* Fast højde på store skærme, men skalerer ned på smalle skærme, så
       brede billeder ikke løber ud over modalens kant. Bredden følger
       billedets eget format (bevarer proportioner, ingen beskæring). */
    height: min(18rem, 60vw);
    width: auto;
    max-width: 100%;
    display: block;
    object-fit: contain;
    border-radius: 0.375rem;
    border: 1px solid var(--line);
  }

  .remove {
    position: absolute;
    top: 0.25rem;
    right: 0.25rem;
    width: 1.5rem;
    height: 1.5rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    line-height: 1;
    color: #fff;
    background: rgba(0, 0, 0, 0.6);
    border: none;
    border-radius: 999px;
    cursor: pointer;
    transition: background 0.2s var(--ease);
  }

  .remove:hover,
  .remove:focus-visible {
    background: #ff6b6b;
  }

  .empty {
    margin: 0;
    font-size: 0.875rem;
    color: var(--fg-muted);
  }

  .add-image {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px solid var(--line);
  }

  .previews {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(5.5rem, 1fr));
    gap: 0.875rem;
    margin: 0.25rem 0 0;
    padding: 0;
    }

    .previews li {
    position: relative;
    }

    .previews img {
    display: block;
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    border: 1px solid var(--line);
    border-radius: 0.5rem;
    }

    .remove-preview {
    position: absolute;
    top: 0.25rem;
    right: 0.25rem;
    width: 1.5rem;
    height: 1.5rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    line-height: 1;
    color: #fff;
    background: rgba(0, 0, 0, 0.6);
    border: none;
    border-radius: 999px;
    cursor: pointer;
    transition: background 0.2s var(--ease);
    }

    .remove-preview:hover,
    .remove-preview:focus-visible {
    background: #ff6b6b;
    }

  .note {
    margin: 0;
    font-size: 0.875rem;
    color: var(--fg-muted);
  }
</style>
