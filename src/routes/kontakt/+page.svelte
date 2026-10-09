<script>
</script>

<svelte:head>
	<title>Contact – Tour Group</title>
	<meta name="description" content="Get in touch with Tour Group — production and lighting design for events." />
</svelte:head>

<!-- Hero -->
<section class="hero">
	<div class="label">Contact</div>
	<h1>Contact</h1>
	<p class="lead">Let's create something great together.</p>
	</section>

	<!-- 01 — Get in touch -->
	<section>
	<div class="label">01 — Get in touch</div>
	<h2>Let's have a chat</h2>
	<p class="lead">For enquiries, bookings or a quick question — reach out by email.</p>
	<p>
		<a href="mailto:lukas@tourgroup.dk" class="btn">
			lukas@tourgroup.dk
		</a>
	</p>
	</section>

	<!-- 02 — Follow us -->
	<section>
	<div class="label">02 — Follow us</div>
	<p class="lead">Follow along behind the scenes on Instagram.</p>
	<p>
		<a
			href="https://www.instagram.com/lukas_laukiss/"
			target="_blank"
			rel="noopener noreferrer"
			class="instagram"
			aria-label="Follow @lukas_laukiss on Instagram"
			title="@lukas_laukiss on Instagram"
		>
			<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
				<path
					fill="currentColor"
					d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 1.94c-3.15 0-3.52.01-4.76.07-.9.04-1.39.19-1.71.32-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.13.32-.28.81-.32 1.71-.06 1.24-.07 1.61-.07 4.76s.01 3.52.07 4.76c.04.9.19 1.39.32 1.71.17.43.37.74.69 1.06.32.32.63.52 1.06.69.32.13.81.28 1.71.32 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c.9-.04 1.39-.19 1.71-.32.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.13-.32.28-.81.32-1.71.06-1.24.07-1.61.07-4.76s-.01-3.52-.07-4.76c-.04-.9-.19-1.39-.32-1.71a2.85 2.85 0 0 0-.69-1.06 2.85 2.85 0 0 0-1.06-.69c-.32-.13-.81-.28-1.71-.32-1.24-.06-1.61-.07-4.76-.07Zm0 3.3a4.6 4.6 0 1 1 0 9.2 4.6 4.6 0 0 1 0-9.2Zm0 1.94a2.66 2.66 0 1 0 0 5.32 2.66 2.66 0 0 0 0-5.32Zm5.86-2.16a1.08 1.08 0 1 1-2.16 0 1.08 1.08 0 0 1 2.16 0Z"
				/>
			</svg>
			<span>@lukas_laukiss</span>
		</a>
	</p>
	</section>

<style>
	.lead {
		font-size: 1.25rem;
		color: #cccccc;
	}

	.btn {
		display: inline-block;
		padding: 0.75rem 1.75rem;
		font-size: clamp(1rem, 2.5vw, 1.125rem);
		font-weight: 500;
		letter-spacing: 0.02em;
		color: var(--bg);
		background: var(--accent);
		border: 1px solid var(--accent);
		border-bottom: 1px solid var(--accent);
		border-radius: 999px;
		transition: opacity 0.2s var(--ease);
	}

	.btn:hover,
	.btn:focus-visible {
		color: var(--bg);
		opacity: 0.85;
	}

	.instagram {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		font-size: clamp(1rem, 2.5vw, 1.125rem);
		color: var(--fg);
		border: 1px solid var(--line);
		border-bottom: 1px solid var(--line);
		border-radius: 999px;
		transition: color 0.2s var(--ease), border-color 0.2s var(--ease);
	}

	.instagram svg {
		width: 1.25rem;
		height: 1.25rem;
	}

	.instagram:hover,
	.instagram:focus-visible {
		color: var(--accent);
		border-color: var(--accent);
	}
</style>
