# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Layout

Monorepo with two independent packages plus a thin root `package.json` that only orchestrates them (it is not a pnpm workspace):

- `studio/` — standalone Sanity Studio (Sanity v6). Uses **pnpm** (`pnpm-lock.yaml`).
- `web/` — Next.js 16 App Router frontend. Uses **npm** (`package-lock.json`).

Keep the Studio standalone — do not embed it in the Next.js app via `next-sanity/studio`.

## Commands

Root (run in repo root, requires `pnpm install` there once):
- `pnpm dev` — both apps via concurrently: web on http://localhost:3000, Studio on http://localhost:3333
- `pnpm build` / `pnpm lint` — runs web then studio sequentially

Studio (run in `studio/`):
- `pnpm dev` — Studio at http://localhost:3333
- `npx sanity schema deploy` — deploy schema to the Content Lake; **required after any schema change** for MCP/editor tooling to see new types
- `pnpm build` / `pnpm deploy` — build / deploy Studio to Sanity hosting

Web (run in `web/`):
- `npm run dev` — app at http://localhost:3000 (Turbopack)
- `npm run build` — production build
- `npm run lint` — ESLint

There are no tests in either package.

## Sanity Architecture

- Project ID `73tyvgdh`, dataset `production` (publicly readable). Hardcoded in `studio/sanity.config.ts` and `studio/sanity.cli.ts`; the web app reads them from `web/.env.local` (`NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`) — that file is gitignored and must exist or the app crashes at startup.
- Content flow: schema types live in `studio/schemaTypes/` (one file per type, registered in `index.ts`) → deploy schema → `web` fetches with the shared client in `web/src/sanity/client.ts` → pages under `web/src/app/` (`page.tsx` lists posts, `[slug]/page.tsx` renders one).
- In `web`, import all Sanity utilities (`createClient`, `defineQuery`, `PortableText`, `SanityDocument`) from `next-sanity` — do not add `@sanity/client`, `groq`, or `@portabletext/react` as direct dependencies. `@sanity/image-url` is the one separate Sanity package.
- The `sanity-best-practices` skill is installed at `.agents/skills/sanity-best-practices/` (symlinked into `.claude/skills/`). Use it for any Sanity work — schema design, GROQ, Visual Editing, TypeGen, etc.

## Next.js Version Caveat

`web/AGENTS.md` warns this Next.js version (16.x) differs from training data — read the relevant guide in `web/node_modules/next/dist/docs/` before writing Next.js code. Two consequences already relied on here:

- `cacheComponents` is **not** enabled in `next.config.ts`, so the previous caching model applies: fetches use `{ next: { revalidate: N } }` options (see the existing pages). Do not add `"use cache"` directives without enabling Cache Components.
- Dynamic route `params` is a `Promise` and must be awaited.

## Code Style

The two packages have different formatting: `studio/` uses the Prettier config in its `package.json` (no semicolons, single quotes, `printWidth: 100`, `bracketSpacing: false`); `web/` uses default create-next-app style (semicolons, double quotes). Match the package you're editing.
