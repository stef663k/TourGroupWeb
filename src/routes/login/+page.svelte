<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
	let submitting = $state(false);
</script>

<svelte:head>
	<title>Log in – Tour Group</title>
	<meta name="description" content="Log in to manage Tour Group." />
</svelte:head>

<!-- Hero -->
<section class="hero">
	<div class="label">Owner · Login</div>
	<h1>Log in</h1>
	<p class="lead">Log in to manage events.</p>
</section>

<!-- 01 — Adgangskode -->
<section>
	<div class="label">01 — Password</div>
	<form
		method="POST"
		use:enhance={() => {
			submitting = true;
			return async ({ update }) => {
				await update();
				submitting = false;
			};
		}}
	>
		<label for="password">Password</label>
		<input
			id="password"
			name="password"
			type="password"
			autocomplete="current-password"
			required
			aria-invalid={form?.error ? 'true' : undefined}
		/>
		{#if form?.error}
			<p class="error" role="alert">{form.error}</p>
		{/if}
		<button type="submit" disabled={submitting}>
			{submitting ? 'Logging in…' : 'Log in'}
		</button>
	</form>
</section>

<style>
	.lead {
		font-size: 1.25rem;
		color: #cccccc;
	}

	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
		width: 100%;
		max-width: 24rem;
		margin: 0 auto;
		text-align: left;
	}

	label {
		align-self: flex-start;
		font-size: 0.875rem;
		letter-spacing: 0.02em;
		color: var(--fg-muted);
	}

	input {
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

	input:focus {
		outline: none;
		border-color: var(--accent);
	}

	button {
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

	button:hover:not(:disabled) {
		opacity: 0.85;
	}

	button:disabled {
		opacity: 0.5;
		cursor: default;
	}

	.error {
		align-self: flex-start;
		margin-bottom: 0;
		font-size: 0.875rem;
		color: #ff6b6b;
	}
</style>
