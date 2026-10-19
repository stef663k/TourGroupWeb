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
	<a href="/" class="brand" onclick={closeMenu} aria-label="Tour Group — home">
		<img class="brand-logo" src={data.logoUrl} alt="Tour Group" />
	</a>
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
		{#if data.owner}
			<li>
				<form method="POST" action="/logout" onsubmit={closeMenu}>
					<button type="submit">Log out</button>
				</form>
			</li>
		{/if}
	</ul>
</nav>

<main>
	{@render children()}
</main>

<footer>
	<p>&copy; {new Date().getFullYear()} Tour Group</p>
</footer>

<CookieConsent />

<style>
	/* Logoet ligger absolut ovenpå nav-linjen og fylder hele dens højde
	   (top: 0 / bottom: 0). Nav-linjens højde kommer fra --nav-height i
	   app.css, som er beregnet ud fra logoets bredde. */
	.brand {
		position: absolute;
		top: 0;
		bottom: 0;
		left: var(--space-gutter);
		z-index: 1;
		display: flex;
		align-items: center;
		/* Logoen må ikke stjæle klik fra menupunkterne. Kun selve logoet
		   er klikbart (pointer-events: auto nedenfor). */
		pointer-events: none;
	}

	/* Logoen skaleres efter den plads der er tilbage når menuen er trukket
	   fra, så de to aldrig overlapper. Bredden kommer fra
	   --brand-logo-width i app.css, som nav-højden også læser – derfor
	   følger nav-linjen altid logoets størrelse. */
	.brand-logo {
		display: block;
		width: min(
			calc(100vw - var(--menu-width) - 6rem),
			var(--brand-logo-width)
		);
		max-width: 100%;
		/* Højden følger logoets bredde (931×150), så billedet ikke forskydes. */
		aspect-ratio: 931 / 150;
		height: auto;
		object-fit: contain;
		object-position: left center;
		pointer-events: auto;
	}
</style>
