# haugendesign.no

Personal portfolio for Fredrik Haugen. Next.js frontend in `web/`, standalone Sanity Studio in `studio/`. Content lives in the Sanity Content Lake, not in this repo. The source copy for everything on the site is in `.claude/rules/` and is entered into the Studio verbatim.

## Setup and run

Requirements: Node 20 or newer, pnpm, npm.

```bash
pnpm install               # repo root, once
npm --prefix web install
pnpm --dir studio install
```

`web/.env.local` must exist or the app crashes at startup:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=73tyvgdh
NEXT_PUBLIC_SANITY_DATASET=production
```

Then, from the repo root:

```bash
pnpm dev     # web on http://localhost:3000, Studio on http://localhost:3333
pnpm build   # production build, web then studio
pnpm lint    # eslint, web then studio
```

There is no typecheck script. Run `npx tsc --noEmit` in `web/` or `studio/`.

## How to add a project

Open the Studio, create a project document, and publish it. A card needs a title, a slug, the card text, stack tags, a live URL, and an order number. The copy is written in `.claude/rules/` first and entered verbatim, never composed in the Studio. If the detail body is left empty, the card links straight to the live URL and no detail route exists; fill the detail body and the stack paragraph and `/work/<slug>` appears on the next revalidation, within an hour. No code changes.

After any schema change in `studio/schemaTypes/`, run `npx sanity schema deploy` in `studio/`.

## Vercel domain configuration

The web app deploys to Vercel with `web/` as the project root directory. Set the two `NEXT_PUBLIC_SANITY_*` variables from above in the project settings. Under Domains, add `haugendesign.no` and `www.haugendesign.no`, with the www variant redirecting to the apex. At the DNS provider, point the apex A record to `76.76.21.21` and the `www` CNAME to `cname.vercel-dns.com`. Vercel verifies the domain and issues certificates on its own.
