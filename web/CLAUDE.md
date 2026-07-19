# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

This package is the Next.js frontend of the haugendesign monorepo. The repo-root `CLAUDE.md` and the rules in `.claude/rules/` govern copy, design tokens, and publishing blockers — read those before writing copy or styling anything. This file covers only what is specific to `web/`.

## This is NOT the Next.js you know

This package runs Next.js 16.x, which has breaking changes relative to training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing Next.js code. Consequences already relied on here:

- `cacheComponents` is **not** enabled in `next.config.ts`, so the previous caching model applies: Server Components fetch with `{ next: { revalidate: 3600 } }`. Do not add `"use cache"` directives without enabling Cache Components first.
- Dynamic route `params` is a `Promise` and must be awaited (see `src/app/work/[slug]/page.tsx`).
- On `next/image`, `priority` is deprecated; the prop is `preload`.

## Commands

This package uses **npm** (`package-lock.json`), unlike `studio/` which uses pnpm.

- `npm run dev` — dev server at http://localhost:3000 (Turbopack)
- `npm run build` — production build
- `npm run lint` — ESLint
- `npx tsc --noEmit` — typecheck (there is no script for it)

There are no tests. `web/.env.local` (gitignored) must exist with `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` or the app crashes at startup.

## Architecture

One-page portfolio plus detail routes, fully server-rendered from Sanity:

- `src/sanity/` is the data layer: `client.ts` (shared `next-sanity` client, CDN on), `queries.ts` (GROQ via `defineQuery` plus hand-written TypeScript interfaces for every query result), `image.ts` (`urlFor` via `@sanity/image-url`).
- `src/app/page.tsx` fetches `HOME_QUERY` once and passes data down to the section components in `src/components/` (Hero, Work, About, Other, Credentials, Contact).
- Detail routes: `/work/[slug]` (projects), `/experience/[slug]` (work-history entries), `/education/[slug]` (education entries; the latter two share `src/components/CredentialDetail.tsx`). All use the same GROQ filter, `count(coalesce(detail, [])) > 0`, and `generateStaticParams` bypasses the CDN with `client.withConfig({ useCdn: false })`. Entries without a detail body render as cards or plain rows.
- `src/components/projectMedia.ts` maps project slugs to local photos in `public/photos/<slug>/` (static imports, so blur placeholders are automatic). The first image is the card and detail hero; a project with no entry falls back to the Sanity `screenshot` field. `projectOgImage` maps slugs to the 1200x630 JPG share crops in `public/og/`, regenerated when a source photo changes: `sips -s format jpeg -z <height-at-1200-wide> 1200 <photo> --cropToHeightWidth 630 1200 --out public/og/<slug>.jpg`.
- SEO/GEO surface: `src/lib/site.ts` (site constants), `src/components/JsonLd.tsx` (schema.org scripts on every page: Person/ProfilePage on home, CreativeWork on projects, WebPage + breadcrumbs on credential pages), `src/app/sitemap.ts` and `robots.ts`, and the hand-maintained `public/llms.txt` — add new pages to `llms.txt` when routes are added; the sitemap picks them up by itself. Also update it when a slug changes in Sanity: the sitemap self-heals, `llms.txt` keeps linking the dead route.
- Everything is a Server Component except `src/components/Reveal.tsx` (IntersectionObserver, one-time reveal animations). Keep it that way; the page body must be server-rendered and present in `view-source`.
- Content is data. Components render what Sanity returns; a component that contains a sentence is a bug. Missing copy gets `{/* TODO: copy needed */}`, never invented text.
- `next.config.ts` bakes `NEXT_PUBLIC_HAS_HERO` at build time (checks for `public/hero.jpg`); the hero figure renders only when it is set. It also pins the Turbopack root to this directory so the monorepo root's lockfile isn't picked up.

## Gotchas

- **Stale content after a rebuild:** Next persists its data cache across builds in `.next/cache/fetch-cache`. After editing Sanity content, delete that directory before `npm run build`, and confirm the CDN (`73tyvgdh.apicdn.sanity.io`) already serves the new value — a build started seconds after a write can bake a stale edge response.
- **The skip link lives in `layout.tsx`, not the pages.** On client-side navigation Next focuses the new segment's first element; if the skip link is first in a page fragment it gets focused and (with `focus:` styling) pops visible on every navigation. Keep it in the layout and style it with `focus-visible:` only.

## Imports

- All Sanity utilities (`createClient`, `defineQuery`, `PortableText`, `SanityDocument`, `PortableTextBlock`) come from `next-sanity`. Do not add `@sanity/client`, `groq`, or `@portabletext/react` as dependencies.
- `@sanity/image-url` v2: `createImageUrlBuilder` and `SanityImageSource` are named exports from the package root; the old `lib/types/types` deep import no longer exists.
- Icons from `@phosphor-icons/react/dist/ssr` — the root export uses React context and breaks in Server Components. Decorative only: `aria-hidden`, always beside a text label.

## Styling

Tailwind v4, configured CSS-first in `src/app/globals.css` — there is no `tailwind.config.js`. The default palette is cleared with `--color-*: initial`, so only the brand tokens exist as utilities (`paper`, `ink`, `ink-dim`, `rule`, `accent`, the four tag pastels, the two aurora tints). No hex outside the token block, no arbitrary values. Fonts load in `layout.tsx` via `next/font` (Newsreader → `--font-display`, Inter → `--font-sans`).

Code style is default create-next-app: semicolons, double quotes — the opposite of `studio/`'s Prettier config. Match this package.
