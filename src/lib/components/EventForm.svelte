<script lang="ts">
  import { enhance } from '$app/forms';
  import { compressImage } from '$lib/image';

  type Field =
    | 'name'
    | 'years'
    | 'description'
    | 'details'
    | 'eventDate'
    | 'location'
    | 'link'
    | 'file'
    | 'event';

  type EventOption = { id: number; name: string };

  let {
    error,
    action = '?/createEvent',
    fields = ['name', 'description', 'eventDate', 'location', 'link', 'file'],
    submitLabel = 'Create event',
    pendingLabel = 'Creating…',
    events = [],
    initial = {},
    id = null,
    requireImage = true,
    onSuccess
  }: {
    error?: string;
    action?: string;
    fields?: Field[];
    submitLabel?: string;
    pendingLabel?: string;
    events?: EventOption[];
    initial?: {
      name?: string | null;
      years?: string | null;
      description?: string | null;
      details?: string | null;
      eventDate?: string | null;
      location?: string | null;
      link?: string | null;
    };
    id?: number | null;
    requireImage?: boolean;
    onSuccess?: () => void;
  } = $props();

  const show = (field: Field) => fields.includes(field);

  let submitting = $state(false);
  let compressing = $state(false);
  let fileInput = $state<HTMLInputElement>();
  let compressed: File | null = $state(null);
  let previewUrl: string | null = $state(null);
  let note: string | null = $state(null);

  async function onFileChange(event: Event) {
    const input = event.currentTarget as HTMLInputElement;
    const file = input.files?.[0] ?? null;

    revokePreview();
    compressed = null;
    note = null;

    if (!file) return;

    compressing = true;
    try {
      const result = await compressImage(file);
      compressed = result;
      previewUrl = URL.createObjectURL(result);
      if (result.size < file.size) {
        note = `Compressed from ${formatSize(file.size)} to ${formatSize(result.size)}.`;
      }
    } catch {
      // Kunne ikke komprimere (fx HEIC uden decoder i browseren).
      // Behold originalen og lad serveren give en klar fejl hvis den afvises.
      compressed = file;
      previewUrl = URL.createObjectURL(file);
      note = 'Could not compress the image — uploading the original.';
    } finally {
      compressing = false;
    }
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

  // Overskriv fil-feltet med det komprimerede billede lige før submit.
  function onSubmit() {
    submitting = true;
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
      submitting = false;
      revokePreview();
      previewUrl = null;
      compressed = null;
      note = null;
      if (result.type === 'success') onSuccess?.();
    };
  }

  $effect(() => () => revokePreview());
</script>

<form
  method="POST"
  {action}
  enctype="multipart/form-data"
  class="form"
  use:enhance={onSubmit}
>
  {#if id !== null}
    <input type="hidden" name="id" value={id} />
  {/if}

  {#if show('name')}
    <label for="name">Name</label>
    <input id="name" name="name" type="text" value={initial.name ?? ''} required maxlength="200" />
  {/if}

  {#if show('years')}
    <label for="years">Year (e.g. 22-24)</label>
    <input
      id="years"
      name="years"
      type="text"
      value={initial.years ?? ''}
      maxlength="50"
      placeholder="22-24"
    />
  {/if}

  {#if show('event')}
    <label for="eventId">Linked event</label>
    <select id="eventId" name="eventId">
      <option value="">None</option>
      {#each events as option (option.id)}
        <option value={option.id}>{option.name}</option>
      {/each}
    </select>
  {/if}

  {#if show('description')}
    <label for="description">Description</label>
    <textarea id="description" name="description" rows="3">{initial.description ?? ''}</textarea>
  {/if}

  {#if show('details')}
    <label for="details">Details (shown inside the event modal)</label>
    <textarea id="details" name="details" rows="5">{initial.details ?? ''}</textarea>
  {/if}

  {#if show('eventDate')}
    <label for="eventDate">Date</label>
    <input id="eventDate" name="eventDate" type="date" value={initial.eventDate ?? ''} />
  {/if}

  {#if show('location')}
    <label for="location">Location</label>
    <input
      id="location"
      name="location"
      type="text"
      value={initial.location ?? ''}
      maxlength="200"
    />
  {/if}

  {#if show('link')}
    <label for="link">Link (optional)</label>
    <input
      id="link"
      name="link"
      type="url"
      value={initial.link ?? ''}
      maxlength="2048"
      placeholder="https://…"
    />
  {/if}

  {#if show('file')}
    <label for="file">Image (JPEG, PNG, WebP, GIF or AVIF)</label>
    <input
      id="file"
      name="file"
      type="file"
      accept="image/*"
      required={requireImage}
      bind:this={fileInput}
      onchange={onFileChange}
    />

    {#if compressing}
      <p class="note">Compressing image…</p>
    {:else if note}
      <p class="note">{note}</p>
    {/if}

    {#if previewUrl}
      <img class="preview" src={previewUrl} alt="Selected upload preview" />
    {/if}
  {/if}

  {#if error}
    <p class="error" role="alert">{error}</p>
  {/if}

  <button type="submit" disabled={submitting || compressing}>
    {submitting ? pendingLabel : submitLabel}
  </button>
</form>

<style>
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
  .form textarea,
  .form select {
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
  .form textarea:focus,
  .form select:focus {
    outline: none;
    border-color: var(--accent);
  }

  .preview {
    width: 100%;
    max-width: 16rem;
    aspect-ratio: 4 / 3;
    object-fit: cover;
    border: 1px solid var(--line);
    border-radius: 0.5rem;
  }

  .note {
    align-self: flex-start;
    margin-bottom: 0;
    font-size: 0.875rem;
    color: var(--fg-muted);
  }

  .error {
    align-self: flex-start;
    margin-bottom: 0;
    font-size: 0.875rem;
    color: #ff6b6b;
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
</style>
