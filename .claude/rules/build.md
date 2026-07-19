# Build

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js, App Router |
| Language | TypeScript, strict, no `any` |
| Styling | Tailwind v4. Tokens in `web/src/app/globals.css`. |
| Content | Sanity Content Lake, queried with GROQ |
| Hosting | Vercel, `haugendesign.no` |

Sanity is the CMS. The Studio stays standalone in `studio/` — do not embed it in the Next.js app via `next-sanity/studio`. Beyond that: no database of your own, no auth, no API routes, no client-side state management. If a dependency is being added, justify it in the PR description or don't add it.

## Content model

Content is data. Components render it. A component that contains a sentence is a bug.

Content lives in Sanity, not in the repo. Schema types are one file per type in `studio/schemaTypes/`, registered in `index.ts`:

```
studio/schemaTypes/
  project.ts        Card + optional detail page per project.
  about.ts          Bio, work history, education, skills, contact. Singleton, _id "about".
  otherProject.ts   One line in the Other section. Not a work card.
```

A project document carries:

```
slug        vitne
title       Vitne
card        One or two lines. Verbatim from the rules file. Never regenerated to fit.
tags        [Next.js 16, TypeScript, Supabase, Clerk, Claude API, Web Crypto]
url         https://vitne.so
year        From the rules file. Mobitech's is still an unresolved CONFIRM.
```

**Adding a project means adding a document.** If adding a project requires editing a component, the content model is wrong. Fix the model.

Run `npx sanity schema deploy` in `studio/` after any schema change, or editor and MCP tooling won't see the new types.

## Where the copy comes from

The source copy is `.claude/rules/ABOUT.md`, `.claude/rules/vitne.md`, and `.claude/rules/mobitech.md`. Those files are the input to Sanity, not the output of it. Copy is entered into the Studio verbatim.

Their `## Claim check`, `## Permission check`, and `## Do not publish` sections are instructions to the site owner. They are not content. They stay in `.claude/rules/` and are never entered into Sanity. They must never render.

Two of them are publishing blockers, not suggestions. Neither project ships until its blocker clears:

- `vitne.md` — the zero-data-retention wording waits on a signed agreement.
- `mobitech.md` — the detail page waits on client permission.

## Rendering

- Server Components by default. `'use client'` only where genuinely required, which on this site is approximately nowhere.
- Content is fetched in Server Components with `{ next: { revalidate: N } }`. `cacheComponents` is not enabled in `next.config.ts`, so do not add `"use cache"` directives without enabling it first. The pages use `revalidate: 3600`.
- **The page body must be server-rendered.** The site owner previously shipped a site where every page body was `next/dynamic({ ssr: false })`, so crawlers saw metadata and no content. Do not repeat that. If `next/dynamic` appears with `ssr: false`, it needs a reason in a comment.
- Images through `next/image`. The hero is preloaded (`priority` is deprecated in Next 16; the prop is `preload`). Sanity image sources go through `@sanity/image-url` via `web/src/sanity/image.ts`.

## Conventions

- Conventional commits. `feat/fix/chore/docs/refactor`. One logical change per commit.
- Components in `web/src/components/`, flat until there are enough to warrant folders. Do not scaffold an Atomic Design hierarchy for a four-section site.
- No barrel files.
- File and export names spelled correctly. Check them. A previous project shipped `ConactForm.js` to production and it is still there.
- No unused files, no unused hooks, no committed build output, no vestigial directories. If it isn't imported, it isn't committed.

## Definition of done

- `pnpm build` and `pnpm lint` clean from the repo root (each runs web then studio). There is no `typecheck` script; run `npx tsc --noEmit` in `web/`.
- Lighthouse: performance and accessibility both above 95. This is a static site with one image. There is no excuse.
- Page content is present in `view-source`. Check this explicitly.
- Every `[CONFIRM: ...]` marker in `.claude/rules/` is either resolved or still visible as a `TODO` in the PR description. None of them render.
- No `TODO` left unmarked. Anywhere copy was needed and not supplied, `{/* TODO: copy needed */}`.

## README must contain

- Setup and run
- How to add a project (one paragraph, and it should be one paragraph)
- Vercel domain configuration for `haugendesign.no`

## Do not

- Add analytics beyond a single Pirsch tag
- Add a contact form
- Add a newsletter signup
- Add Framer Motion. The reveal animations are CSS plus one IntersectionObserver client component.
- Add a second icon library. `@phosphor-icons/react` is the one, imported via `dist/ssr`.
- Generate placeholder copy. See `.claude/rules/tov.md`. Empty is better than invented.
