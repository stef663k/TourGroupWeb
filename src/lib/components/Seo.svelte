<script lang="ts">
  import { SITE, absoluteUrl, absoluteImageUrl } from '$lib/seo';

  let {
    title,
    description = SITE.description,
    path,
    image,
    type = 'website',
    noindex = false
  }: {
    /** Sidens fulde <title>. Falder tilbage til SITE.name hvis den ikke er sat. */
    title?: string;
    description?: string;
    /** Sidens sti (fx "/events"), brugt til canonical + og:url. */
    path: string;
    /** Absolut eller relativ billed-URL til deling; falder tilbage til intet. */
    image?: string | null;
    type?: 'website' | 'article';
    /** Sæt til true for sider der ikke må indekseres. */
    noindex?: boolean;
  } = $props();

  let fullTitle = $derived(title ?? SITE.name);
  let canonical = $derived(absoluteUrl(path));
  let ogImage = $derived(image ? absoluteImageUrl(image) : null);
</script>

<svelte:head>
  <title>{fullTitle}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonical} />

  {#if noindex}
    <meta name="robots" content="noindex, nofollow" />
  {/if}

  <meta property="og:site_name" content={SITE.name} />
  <meta property="og:type" content={type} />
  <meta property="og:title" content={fullTitle} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={canonical} />
  <meta property="og:locale" content={SITE.locale} />
  {#if ogImage}
    <meta property="og:image" content={ogImage} />
  {/if}

  <meta name="twitter:card" content={ogImage ? 'summary_large_image' : 'summary'} />
  <meta name="twitter:title" content={fullTitle} />
  <meta name="twitter:description" content={description} />
  {#if ogImage}
    <meta name="twitter:image" content={ogImage} />
  {/if}
</svelte:head>
