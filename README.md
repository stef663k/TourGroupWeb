# Tour Group

Website for Tour Group, built with [SvelteKit](https://svelte.dev/docs/kit).

## Developing

Install dependencies and start the dev server:

```bash
bun install
bun run dev
```

The site runs at http://localhost:5173.

## Building

```bash
bun run build
bun run preview
```

## Project structure

Pages live under `src/routes/`, one folder per route. Each route has a `+page.svelte`, and `+layout.svelte` wraps every page (shared nav and footer).

```
src/
├── app.html                 # HTML shell
├── app.css                  # global styles
└── routes/
    ├── +page.svelte         → /
    ├── +layout.svelte       → shared layout (nav, footer)
    ├── om/
    │   └── +page.svelte     → /om
    └── kontakt/
        └── +page.svelte     → /kontakt
```

## Deployment

The project uses `@sveltejs/adapter-cloudflare` and deploys to Cloudflare Pages. The build output is written to `.svelte-kit/cloudflare` (configured via `wrangler.toml`).
