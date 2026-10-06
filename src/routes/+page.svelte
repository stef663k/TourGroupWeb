<script>
  const partnere = [
    'Nordic Rentals',
    'Profox',
    'Eventsuply/Showtech',
    'Dr Koncerthuset',
    'Tivoli Kongresscenter',
    'Bella Center',
  ];
</script>

<svelte:head>
  <title>Tour Group</title>
  <meta name="description" content="Tour Group — lysdesign og lysproduktion til events." />
</svelte:head>

<!-- Hero -->
<section class="hero">
  <div class="label">Lys til events · Denmark</div>
  <h1>Tour Group</h1>
  <p class="lead">Kommer snart</p>
</section>

<!-- 01 — Selected work -->
<section>
  <div class="label">01 — Selected work</div>
  <p class="lead">Kommer snart</p>
</section>

<!-- 02 — Samarbejde med virksomheder -->
<section>
  <div class="label">02 — Samarbejde med virksomheder</div>
  <ul class="partners">
    {#each partnere as partner}
      <li>{partner}</li>
    {/each}
  </ul>
</section>

<style>
  .lead {
    font-size: 1.25rem;
    color: #cccccc;
  }

  .partners {
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
    width: 100%;
    max-width: 32rem;
    margin: 0 auto;
    border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
  }

  .partners li {
    width: 100%;
    padding: clamp(1rem, 3vw, 1.5rem) clamp(0.5rem, 2vw, 1rem);
    font-size: clamp(1rem, 2.5vw, 1.25rem);
    color: var(--fg);
    letter-spacing: 0.02em;
    transition: color 0.2s var(--ease);
  }

  .partners li + li {
    border-top: 1px solid var(--line);
  }

  .partners li:hover {
    color: var(--accent);
  }
</style>
