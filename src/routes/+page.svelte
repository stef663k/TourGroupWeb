<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>Tour Group</title>
  <meta name="description" content="Tour Group — lighting design and production for events." />
</svelte:head>

<!-- Fast baggrundsbillede der dækker hele siden og følger med ved scroll -->
<div class="page-bg" aria-hidden="true" style="--hero-bg: url({data.heroBackgroundUrl});"></div>

<!-- Hero -->
<section class="hero">
  <div class="label">Lighting & Set Design</div>
  <h1>
    <img class="hero-logo" src={data.logoUrl} alt="Tour Group" />
  </h1>
</section>

<style>
  .hero-logo {
    display: block;
    width: 100%;
    max-width: 34rem;
    height: auto;
    margin-inline: auto;
  }

  /* Fast baggrundsbillede der dækker hele viewporten og bliver siddende
     mens indholdet ruller forbi ovenpå. */
  .page-bg {
    position: fixed;
    inset: 0;
    z-index: -1;
    background-image: var(--hero-bg);
    background-size: cover;
    background-position: center;
    filter: grayscale(1);
    opacity: 0.9;
    pointer-events: none;
  }

  /* Dæmpende lag så teksten forbliver læsbar ovenpå billedet. */
  .page-bg::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(10, 10, 10, 0.72);
  }

  /* Hero er nu blot indhold ovenpå det faste baggrundsbillede. */
  .hero {
    position: relative;
  }
</style>
