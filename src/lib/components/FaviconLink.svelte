<script lang="ts">
  import { faviconUrl } from '$lib/favicon';

  interface Props {
    href: string;
    label?: string | null;
    target?: string;
    rel?: string;
    class?: string;
  }

  let {
    href,
    label = null,
    target = '_blank',
    rel = 'noopener noreferrer',
    class: className = undefined
  }: Props = $props();

  let icon = $derived(faviconUrl(href, 32));
</script>

<a {href} {target} {rel} class={className}>
  {#if icon}
    <img
      class="favicon"
      src={icon}
      alt=""
      aria-hidden="true"
      width="16"
      height="16"
      loading="lazy"
      decoding="async"
      referrerpolicy="no-referrer"
    />
  {/if}
  <span class="favicon-label">{label ?? href}</span>
</a>

<style>
  a {
    display: inline-flex;
    align-items: center;
    gap: 0.4em;
  }

  .favicon {
    width: 1em;
    height: 1em;
    flex: 0 0 auto;
    border-radius: 2px;
    object-fit: contain;
  }
</style>
