<script lang="ts">
	import '../app.css';
	import CookieConsent from '$lib/components/CookieConsent.svelte';
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	let { children, data }: { children: Snippet; data: LayoutData } = $props();
</script>

<nav>
	<a href="/">Tour Group</a>
	<ul>
		<li><a href="/">Hjem</a></li>
		<li><a href="/events">Events</a></li>
		<li><a href="/om">Om</a></li>
		<li><a href="/kontakt">Kontakt</a></li>
		<li>
			{#if data.owner}
				<form method="POST" action="/logout">
					<button type="submit">Log ud</button>
				</form>
			{:else}
				<a href="/login">Log ind</a>
			{/if}
		</li>
	</ul>
</nav>

<main>
	{@render children()}
</main>

<footer>
	<p>&copy; {new Date().getFullYear()} Tour Group</p>
</footer>

<CookieConsent />
