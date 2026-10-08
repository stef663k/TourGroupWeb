<script lang="ts">
  import { enhance } from '$app/forms';
  import { compressImage } from '$lib/image';

  interface EventImage {
    id: number;
    caption: string | null;
    url: string;
  }

  interface EventData {
    id: number;
    name: string;
    event_date: string | null;
    location: string | null;
    description: string | null;
    details: string | null;
    link: string | null;
    images: EventImage[];
  }

  let {
    event,
    owner = false,
    onclose
  }: { event: EventData; owner?: boolean; onclose: () => void } = $props();

  // The modal is mounted per event, so capturing the initial values is intentional.
  // svelte-ignore state_referenced_locally
  let name = $state(event.name);
  // svelte-ignore state_referenced_locally
  let details = $state(event.details ?? '');

  let fileInput = $state<HTMLInputElement>();
  let compressed: File | null = $state(null);
  let previewUrl: string | null = $state(null);
  let compressing = $state(false);
  let imageNote: string | null = $state(null);

  function close() {
    revokePreview();
    onclose();
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') close();
  }

  function revokePreview() {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      previewUrl = null;
    }
  }

  function formatSize(bytes: number): string {
    return bytes >= 1024 * 1024
      ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
      : `${Math.round(bytes / 1024)} KB`;
  }

  async function onFileChange(e: Event) {
    const input = e.currentTarget as HTMLInputElement;
    const file = input.files?.[0] ?? null;

    revokePreview();
    compressed = null;
    imageNote = null;

    if (!file) return;

    compressing = true;
    try {
      const result = await compressImage(file);
      compressed = result;
      previewUrl = URL.createObjectURL(result);
      if (result.size < file.size) {
        imageNote = `Compressed from ${formatSize(file.size)} to ${formatSize(result.size)}.`;
      }
    } catch {
      compressed = file;
      previewUrl = URL.createObjectURL(file);
      imageNote = 'Could not compress the image — uploading the original.';
    } finally {
      compressing = false;
    }
  }

  function onSubmitImage() {
    return async ({
      result,
      update
    }: {
      result: { type: string };
      update: (opts?: { reset?: boolean }) => Promise<void>;
    }) => {
      if (compressed && fileInput && fileInput.files?.[0] !== compressed) {
        const dt = new DataTransfer();
        dt.items.add(compressed);
        fileInput.files = dt.files;
      }
      await update({ reset: true });
      if (fileInput) fileInput.value = '';
      revokePreview();
      compressed = null;
      imageNote = null;
    };
  }

  function confirmDeleteImage(e: SubmitEvent) {
    if (!confirm('Delete this image? This cannot be undone.')) {
      e.preventDefault();
    }
  }

  $effect(() => () => revokePreview());
</script>

<svelte:window onkeydown={onKeydown} />

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
      {#if owner}
        <form method="POST" action="?/updateEvent" use:enhance class="edit-form">
          <input type="hidden" name="id" value={event.id} />
          <input type="hidden" name="eventDate" value={event.event_date ?? ''} />
          <input type="hidden" name="location" value={event.location ?? ''} />
          <input type="hidden" name="link" value={event.link ?? ''} />

          <label for="modal-name">Name</label>
          <input id="modal-name" name="name" type="text" bind:value={name} required maxlength="200" />

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

      <div class="images-section">
        <h3>Photos</h3>

        {#if event.images.length > 0}
          <ul class="images">
            {#each event.images as image (image.id)}
              <li>
                <img src={image.url} alt={image.caption ?? event.name} loading="lazy" />
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

            {#if previewUrl}
              <img class="preview" src={previewUrl} alt="Selected upload preview" />
            {/if}

            <button type="submit" class="save" disabled={compressing}>
              {compressing ? 'Compressing…' : 'Add photo'}
            </button>
          </form>
        {/if}
      </div>
    </div>
  </div>
</div>

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
    width: 100%;
    max-width: 32rem;
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
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(6rem, 1fr));
    gap: 0.5rem;
  }

  .images li {
    position: relative;
  }

  .images img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
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

  .preview {
    width: 100%;
    max-width: 12rem;
    aspect-ratio: 4 / 3;
    object-fit: cover;
    border: 1px solid var(--line);
    border-radius: 0.5rem;
  }

  .note {
    margin: 0;
    font-size: 0.875rem;
    color: var(--fg-muted);
  }
</style>
