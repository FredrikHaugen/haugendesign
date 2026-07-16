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
- pnpm 11 refuses to run anything until build scripts are approved; `studio/pnpm-workspace.yaml` carries `allowBuilds: esbuild: true` for that. The `pnpm` field in `package.json` is no longer read.
- `npx sanity schema deploy` — deploy schema to the Content Lake; **required after any schema change** for MCP/editor tooling to see new types
- `pnpm build` / `pnpm deploy` — build / deploy Studio to Sanity hosting

Web (run in `web/`):
- `npm run dev` — app at http://localhost:3000 (Turbopack)
- `npm run build` — production build
- `npm run lint` — ESLint

There are no tests in either package.

## Project Rules (`.claude/rules/`)

Six files that constrain what gets built and what may be published. They auto-load as project instructions. Read the relevant one before writing copy, styling anything, or shipping a project page.

| File | What it governs |
|---|---|
| [`ABOUT.md`](.claude/rules/ABOUT.md) | Source copy: bio, work history, education, skills, contact. |
| [`mune.md`](.claude/rules/mune.md) | Source copy for the Mune project page. **Carries a publishing blocker.** |
| [`mobitech.md`](.claude/rules/mobitech.md) | Source copy for the Mobitech project page. **Carries a publishing blocker.** |
| [`brand.md`](.claude/rules/brand.md) | Design system: palette, type, layout, motion. Explicitly a proposal Fredrik can overrule. |
| [`build.md`](.claude/rules/build.md) | Architecture: stack, content model, rendering, definition of done. |
| [`tov.md`](.claude/rules/tov.md) | Tone of voice: hard bans, banned vocabulary, and Mune claim boundaries. |

Three of these are not style guidance and are not negotiable by an agent:

- **`mune.md`** blocks any zero-data-retention wording until the agreement with Anthropic is signed.
- **`mobitech.md`** blocks the detail page until client permission is confirmed. Fallback is a card and a link.
- **`tov.md`** sets legal and reputational claim boundaries for Mune (no therapeutic claims, no AI-empathy claims, no superlatives, no named competitors).

The copy in these files is the input to Sanity, entered verbatim. **Do not write, paraphrase, or summarize portfolio copy** — `tov.md`'s first rule is that you are not writing. Unresolved `[CONFIRM: ...]` markers are questions for Fredrik; leave them rather than inventing an answer. The `## Claim check` / `## Permission check` / `## Do not publish` sections are instructions to him, never content, and must never reach Sanity or the site.

## Sanity Architecture

- Project ID `73tyvgdh`, dataset `production` (publicly readable). Hardcoded in `studio/sanity.config.ts` and `studio/sanity.cli.ts`; the web app reads them from `web/.env.local` (`NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`) — that file is gitignored and must exist or the app crashes at startup.
- Content flow: schema types live in `studio/schemaTypes/` (one file per type, registered in `index.ts`) → deploy schema → `web` fetches with the shared client in `web/src/sanity/client.ts` and the queries in `web/src/sanity/queries.ts` → the one-page portfolio at `web/src/app/page.tsx` plus detail routes at `web/src/app/work/[slug]/page.tsx`. Only projects with a non-empty `detail` body get a route; the others' cards link straight to their live URL.
- In `web`, import all Sanity utilities (`createClient`, `defineQuery`, `PortableText`, `SanityDocument`) from `next-sanity` — do not add `@sanity/client`, `groq`, or `@portabletext/react` as direct dependencies. `@sanity/image-url` is the one separate Sanity package.
- The `sanity-best-practices` skill is installed at `.agents/skills/sanity-best-practices/` (symlinked into `.claude/skills/`). Use it for any Sanity work — schema design, GROQ, Visual Editing, TypeGen, etc.

## Next.js Version Caveat

`web/AGENTS.md` warns this Next.js version (16.x) differs from training data — read the relevant guide in `web/node_modules/next/dist/docs/` before writing Next.js code. Two consequences already relied on here:

- `cacheComponents` is **not** enabled in `next.config.ts`, so the previous caching model applies: fetches use `{ next: { revalidate: N } }` options (see the existing pages). Do not add `"use cache"` directives without enabling Cache Components.
- Dynamic route `params` is a `Promise` and must be awaited.

## Styling (web)

Tailwind v4, configured CSS-first in `web/src/app/globals.css` — there is no `tailwind.config.js`. Theme tokens go in the `@theme inline` block; plugins load via `@plugin` in CSS, not a JS config.

- The five brand colors, both font variables, the prose measure (`--container-content`), and display leading/tracking are all defined as tokens in `globals.css`. The default Tailwind palette is cleared with `--color-*: initial`, so classes like `text-zinc-600` do not exist — use the brand tokens. No hex outside the token block, no arbitrary values (see `.claude/rules/brand.md`).
- `@sanity/image-url` is wired up in `web/src/sanity/image.ts` (`urlFor`); `cdn.sanity.io` is allowed in `next.config.ts` `remotePatterns`. In v2 of that package, `createImageUrlBuilder` and `SanityImageSource` are named exports from the package root — the `lib/types/types` deep import no longer exists.
- The hero figure renders only when `web/public/hero.jpg` exists; the check is baked in at build time via `NEXT_PUBLIC_HAS_HERO` in `next.config.ts`.

## Code Style

The two packages have different formatting: `studio/` uses the Prettier config in its `package.json` (no semicolons, single quotes, `printWidth: 100`, `bracketSpacing: false`); `web/` uses default create-next-app style (semicolons, double quotes). Match the package you're editing.
