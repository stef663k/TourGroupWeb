<script lang="ts">
	import '../app.css';
	import CookieConsent from '$lib/components/CookieConsent.svelte';
	import { afterNavigate } from '$app/navigation';
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	let { children, data }: { children: Snippet; data: LayoutData } = $props();

	let menuOpen = $state(false);

	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	function closeMenu() {
		menuOpen = false;
	}

	afterNavigate(() => {
		menuOpen = false;
	});
</script>

<nav>
	<a href="/" onclick={closeMenu}>Tour Group</a>
	<button
		type="button"
		class="burger"
		aria-label={menuOpen ? 'Close menu' : 'Open menu'}
		aria-expanded={menuOpen}
		aria-controls="primary-menu"
		onclick={toggleMenu}
	>
		<span class="burger-bar"></span>
		<span class="burger-bar"></span>
		<span class="burger-bar"></span>
	</button>
	<ul id="primary-menu" class:open={menuOpen}>
		<li><a href="/" onclick={closeMenu}>Home</a></li>
		<li><a href="/events" onclick={closeMenu}>Events</a></li>
		<li><a href="/om" onclick={closeMenu}>About</a></li>
		<li><a href="/kontakt" onclick={closeMenu}>Contact</a></li>
		<li>
			{#if data.owner}
				<form method="POST" action="/logout" onsubmit={closeMenu}>
					<button type="submit">Log out</button>
				</form>
			{:else}
				<a href="/login" onclick={closeMenu}>Log in</a>
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
