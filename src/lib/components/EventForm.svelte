<script lang="ts">
  import { enhance } from '$app/forms';
  import { compressImage } from '$lib/image';

  type Field = 'name' | 'description' | 'eventDate' | 'location' | 'file';

  let {
    error,
    action = '?/createEvent',
    fields = ['name', 'description', 'eventDate', 'location', 'file'],
    submitLabel = 'Opret event',
    pendingLabel = 'Opretter…'
  }: {
    error?: string;
    action?: string;
    fields?: Field[];
    submitLabel?: string;
    pendingLabel?: string;
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
        note = `Komprimeret fra ${formatSize(file.size)} til ${formatSize(result.size)}.`;
      }
    } catch {
      // Kunne ikke komprimere (fx HEIC uden decoder i browseren).
      // Behold originalen og lad serveren give en klar fejl hvis den afvises.
      compressed = file;
      previewUrl = URL.createObjectURL(file);
      note = 'Kunne ikke komprimere billedet — sender originalen.';
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
    return async ({ update }: { update: (opts?: { reset?: boolean }) => Promise<void> }) => {
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
  {#if show('name')}
    <label for="name">Navn</label>
    <input id="name" name="name" type="text" required maxlength="200" />
  {/if}

  {#if show('description')}
    <label for="description">Beskrivelse</label>
    <textarea id="description" name="description" rows="3"></textarea>
  {/if}

  {#if show('eventDate')}
    <label for="eventDate">Dato</label>
    <input id="eventDate" name="eventDate" type="date" />
  {/if}

  {#if show('location')}
    <label for="location">Sted</label>
    <input id="location" name="location" type="text" maxlength="200" />
  {/if}

  {#if show('file')}
    <label for="file">Billede (JPEG, PNG, WebP, GIF eller AVIF)</label>
    <input
      id="file"
      name="file"
      type="file"
      accept="image/*"
      required
      bind:this={fileInput}
      onchange={onFileChange}
    />

    {#if compressing}
      <p class="note">Komprimerer billede…</p>
    {:else if note}
      <p class="note">{note}</p>
    {/if}

    {#if previewUrl}
      <img class="preview" src={previewUrl} alt="Forhåndsvisning af valgt billede" />
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
  .form textarea:focus {
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
