<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData, ActionData } from './$types';

  let { data, form }: { data: PageData; form: ActionData } = $props();

  let editing = $state<null | 'aboutMe' | 'whatICanDo'>(null);

  function onSubmit() {
    return async ({ result }: { result: { type: string } }) => {
      if (result.type === 'success') editing = null;
    };
  }

  function toggle(section: 'aboutMe' | 'whatICanDo') {
    editing = editing === section ? null : section;
  }
</script>

<svelte:head>
  <title>About – Tour Group</title>
  <meta name="description" content="About Tour Group" />
</svelte:head>

<!-- Hero -->
<section class="hero">
  <div class="label">About</div>
  <h1>About</h1>
  <p class="lead">Lighting design and production for events.</p>
</section>

<!-- 01 — About me -->
<section>
  <div class="label">01 — About me</div>
  {#if data.about.aboutMe}
    <p class="lead">{data.about.aboutMe}</p>
  {:else}
    <p class="lead">Coming soon</p>
  {/if}

  {#if data.owner}
    <div class="editor">
      {#if editing === 'aboutMe'}
        <form method="POST" action="?/updateAbout" use:enhance={onSubmit} class="edit-form">
          <label for="aboutMe">About me</label>
          <textarea id="aboutMe" name="aboutMe" rows="5" maxlength="5000"
            >{data.about.aboutMe ?? ''}</textarea
          >

          {#if form?.error}
            <p class="error" role="alert">{form.error}</p>
          {/if}

          <div class="edit-actions">
            <button type="button" class="cancel" onclick={() => (editing = null)}>Cancel</button>
            <button type="submit" class="save">Save</button>
          </div>
        </form>
      {:else}
        <button type="button" class="edit-toggle" onclick={() => toggle('aboutMe')}>Edit</button>
      {/if}
    </div>
  {/if}
</section>

<!-- 02 — What I can do -->
<section>
  <div class="label">02 — What I can do</div>
  {#if data.about.whatICanDo}
    <p class="lead">{data.about.whatICanDo}</p>
  {:else}
    <p class="lead">Coming soon</p>
  {/if}

  {#if data.owner}
    <div class="editor">
      {#if editing === 'whatICanDo'}
        <form method="POST" action="?/updateAbout" use:enhance={onSubmit} class="edit-form">
          <label for="whatICanDo">What I can do</label>
          <textarea id="whatICanDo" name="whatICanDo" rows="5" maxlength="5000"
            >{data.about.whatICanDo ?? ''}</textarea
          >

          {#if form?.error}
            <p class="error" role="alert">{form.error}</p>
          {/if}

          <div class="edit-actions">
            <button type="button" class="cancel" onclick={() => (editing = null)}>Cancel</button>
            <button type="submit" class="save">Save</button>
          </div>
        </form>
      {:else}
        <button type="button" class="edit-toggle" onclick={() => toggle('whatICanDo')}>Edit</button>
      {/if}
    </div>
  {/if}
</section>

<style>
  .lead {
    font-size: 1.25rem;
    color: #cccccc;
    white-space: pre-line;
  }

  .editor {
    margin-top: 1.5rem;
  }

  .edit-form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
    max-width: 40rem;
    margin: 0 auto;
    text-align: left;
  }

  .edit-form label {
    font-size: 0.8125rem;
    letter-spacing: 0.02em;
    color: var(--fg-muted);
  }

  .edit-form textarea {
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

  .edit-form textarea:focus {
    outline: none;
    border-color: var(--accent);
  }

  .error {
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

  .edit-actions button,
  .edit-toggle {
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

  .edit-actions .save,
  .edit-toggle {
    color: var(--bg);
    background: var(--accent);
    border: 1px solid var(--accent);
  }

  .edit-actions .save:hover,
  .edit-toggle:hover {
    opacity: 0.85;
  }
</style>
