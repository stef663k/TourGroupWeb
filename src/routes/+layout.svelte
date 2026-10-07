<script lang="ts">
	import '../app.css';
	import CookieConsent from '$lib/components/CookieConsent.svelte';

	let { children } = $props();
</script>

<nav>
	<a href="/">Tour Group</a>
	<ul>
		<li><a href="/">Hjem</a></li>
		<li><a href="/events">Events</a></li>
		<li><a href="/om">Om</a></li>
		<li><a href="/kontakt">Kontakt</a></li>
	</ul>
</nav>

<main>
	{@render children()}
</main>

<footer>
	<p>&copy; {new Date().getFullYear()} Tour Group</p>
</footer>

<CookieConsent />
