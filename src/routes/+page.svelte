<script>
  // Ingen data endnu — udfyldes når der er rigtigt indhold.
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
    <li>Nordic Rentals</li>
    <li>Profox</li>
    <li>Eventsuply/Showtech</li>
    <li>Dr Koncerthuset</li>
    <li>Tivoli Kongresscenter</li>
    <li>Bella Center</li>
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
  }

  .partners li {
    width: 100%;
    max-width: 24rem;
    border-top: 1px solid var(--line);
    padding: clamp(1rem, 3vw, 1.5rem) 0;
    font-size: clamp(1rem, 2.5vw, 1.25rem);
    color: var(--fg);
  }
</style>
