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
├── hooks.server.ts          # læser session-cookie → event.locals.user
└── routes/
    ├── +page.svelte         → /
    ├── +layout.svelte       → shared layout (nav, footer, cookie banner)
    ├── +layout.server.ts    → giver owner-status videre til layoutet
    ├── login/               → /login (owner-login)
    ├── logout/              → /logout
    ├── events/
    │   └── +page.svelte     → /events
    ├── om/
    │   └── +page.svelte     → /om
    └── kontakt/
        └── +page.svelte     → /kontakt
```

## Owner-login

Der er **kun én bruger** (owner) med et brugernavn og en adgangskode. Adgangskoden gemmes **aldrig** i klartekst — kun som et PBKDF2-hash i `users`-tabellen i **D1** (Cloudflare SQL-database, binding `DB`). Sessioner gemmes ligeledes i D1.

### Databasemigrationer

Skemaet ligger i `migrations/` og anvendes med Wrangler:

```bash
bun run db:migrate          # lokal D1
bun run db:migrate:remote   # remote D1
```

### Sæt owner-brugerens brugernavn og adgangskode

Efter migrationen sættes brugernavn og adgangskode med:

```bash
bun run set-password "<adgangskode>"                        # lokal D1, standard brugernavn: owner
bun run set-password "<adgangskode>" --username <navn>      # lokal D1, valgfrit brugernavn
bun run set-password "<adgangskode>" --remote               # remote D1
```

Scriptet genererer et PBKDF2-hash og opdaterer `users`-rækken (id = 1).

Sessionen gemmes i en HttpOnly, Secure, SameSite=Lax-cookie (`tourgroup_session`) med 7 dages levetid. Cookien indeholder kun et tilfældigt session-id; selve sessionen slås op i D1 og valideres på hver request (udløbne sessioner ryddes automatisk).

## Tests

```bash
bun run test
```

Unit-tests (Vitest) dækker session-håndtering, adgangskode-hashing og D1-datalaget (brugere + sessioner) i `src/lib/server/`.

## Deployment

The project uses `@sveltejs/adapter-cloudflare` and deploys to Cloudflare Pages. The build output is written to `.svelte-kit/cloudflare` (configured via `wrangler.toml`).
