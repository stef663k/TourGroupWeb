<script lang="ts">
	import { onMount } from 'svelte';

	const STORAGE_KEY = 'tourgroup-cookie-consent';

	type Consent = 'accepted' | 'rejected';

	let visible = $state(false);

	onMount(() => {
		try {
			const stored = localStorage.getItem(STORAGE_KEY) as Consent | null;
			if (stored !== 'accepted' && stored !== 'rejected') {
				visible = true;
			}
		} catch {
			visible = true;
		}
	});

	function decide(choice: Consent) {
		try {
			localStorage.setItem(STORAGE_KEY, choice);
		} catch {
			// localStorage kan være utilgængeligt (fx privat browsing)
		}
		visible = false;
	}
</script>

{#if visible}
	<div class="cookie" role="dialog" aria-live="polite" aria-label="Cookie consent">
		<p>
			We use cookies to improve your experience on our website. By clicking
			“Accept” you consent to our use of cookies.
		</p>
		<div class="actions">
			<button class="reject" onclick={() => decide('rejected')}>Reject</button>
			<button class="accept" onclick={() => decide('accepted')}>Accept</button>
		</div>
	</div>
{/if}

<style>
	.cookie {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 100;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 1rem 1.5rem;
		width: 100%;
		max-width: var(--max-width);
		margin: 0 auto;
		padding: clamp(1rem, 3vw, 1.5rem) var(--space-gutter);
		background: var(--bg-soft);
		border: 1px solid var(--line);
		border-bottom: none;
	}

	.cookie p {
		flex: 1 1 20rem;
		margin-bottom: 0;
		font-size: clamp(0.875rem, 2vw, 1rem);
		text-align: left;
	}

	.actions {
		display: flex;
		gap: 0.75rem;
	}

	button {
		font-family: inherit;
		font-size: 0.9375rem;
		font-weight: 500;
		letter-spacing: 0.02em;
		padding: 0.625rem 1.5rem;
		border-radius: 999px;
		cursor: pointer;
		transition: color 0.2s var(--ease), background 0.2s var(--ease),
			border-color 0.2s var(--ease);
	}

	.reject {
		background: transparent;
		color: var(--fg-muted);
		border: 1px solid var(--line);
	}

	.reject:hover {
		color: var(--fg);
		border-color: var(--fg-muted);
	}

	.accept {
		background: var(--accent);
		color: var(--bg);
		border: 1px solid var(--accent);
	}

	.accept:hover {
		opacity: 0.85;
	}

	@media (max-width: 640px) {
		.cookie {
			text-align: center;
		}

		.cookie p {
			text-align: center;
		}

		.actions {
			width: 100%;
			justify-content: center;
		}
	}
</style>
