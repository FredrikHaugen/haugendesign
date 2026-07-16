---
name: seo-checker
description: Audits all (root)/ public pages for SEO completeness — og:image, meta description length, og:title/title match, H1, JSON-LD schema, sitemap entry, external image hosts, raw HTML entities in descriptions.
disable-model-invocation: true
---

# SEO Checker

Audit every public page in `apps/web/app/(root)/` for SEO correctness. This is a diagnostic — report issues with specific file locations and line numbers. Do not fix anything unless the user asks.

## Pages to audit

Read these files, in order:

| Route | Metadata file |
|---|---|
| `/` | `apps/web/app/(root)/page.tsx` |
| `/about` | `apps/web/app/(root)/about/page.tsx` |
| `/contact` | `apps/web/app/(root)/contact/page.tsx` |
| `/how-it-works` | `apps/web/app/(root)/how-it-works/page.tsx` |
| `/privacy` | `apps/web/app/(root)/privacy/page.tsx` |
| `/notes` (index) | `apps/web/app/(root)/notes/page.tsx` |
| `/notes/[slug]` | `apps/web/app/(root)/notes/[slug]/page.tsx` |

Also read:
- `apps/web/app/sitemap.ts` — check that each public page has a sitemap entry
- `apps/web/lib/cms/defaults.ts` — cross-reference OG image values that come from CMS

## Checks per page

Run every check for every page. Flag any that fail.

### 1. Title length
- **Pass:** 50–60 characters
- **Warn:** Under 50 chars (too short, misses keyword space) or over 60 chars (truncated in SERPs)
- **Source:** `metadata.title` or the string returned by `generateMetadata()`

### 2. Meta description length
- **Pass:** 140–160 characters
- **Warn:** Under 140 chars (keyword opportunity missed) or over 160 chars (truncated)
- **Source:** `metadata.description`

### 3. og:image present
- **Pass:** `metadata.openGraph.images` has at least one entry with a non-empty URL
- **Fail:** Missing entirely
- **Warn:** URL is on an external host that is not `images.unsplash.com` or `mune.so` — in particular, flag `i.ibb.co` (fragile external image host)

### 4. og:title matches page title
- **Pass:** `metadata.openGraph.title` is identical to `metadata.title`, or is a reasonable per-page variant
- **Fail:** `metadata.openGraph.title` is a generic site-wide string (e.g. "Mune — A Private AI Companion for Reflection") used on a page that has its own distinct content — this produces identical-looking share cards for all pages

### 5. H1 present and unique
- **Pass:** Page renders exactly one `<h1>` (look for `<h1` in the component or its page-content child)
- **Fail:** No H1 found, or multiple H1s

### 6. JSON-LD schema present
- **Pass:** Page or its layout exports a `<script type="application/ld+json">` with structured data
- **Fail:** No JSON-LD found
- **Warn (blog post only):** `Article` schema is present but missing the `image` property

### 7. Raw HTML entities in description
- **Fail:** `metadata.description` contains `&#x27;`, `&amp;`, `&quot;`, or similar HTML entities — these render literally in search result snippets

### 8. Sitemap entry
- **Pass:** `apps/web/sitemap.ts` includes a URL entry for this route
- **Fail:** Route is missing from the sitemap
- **Warn:** `lastModified` date is more than 60 days old relative to today (2026-05-01) — stale dates reduce crawl frequency

### 9. Twitter card tags (optional, low priority)
- **Pass:** `metadata.twitter.card` is set
- **Warn if missing:** Only flag, don't fail

## Sitemap-specific checks

Read `apps/web/sitemap.ts` and verify:
- Every `(root)/` route above appears in the returned array
- The redirect target (`/`) is present; the redirect source (`/pricing`) is absent
- `changeFrequency` and `priority` values look intentional

## Output format

Present a table, one row per page, with columns: Route | Title | Description | og:image | og:title match | H1 | JSON-LD | Sitemap | Issues.

Use ✅ Pass, ⚠️ Warn, ❌ Fail in each column.

Then, below the table, list every failure and warning with:
- File path and approximate line number
- The exact value that failed (quote it)
- What the correct value should be

Keep the tone diagnostic. No fixes unless asked.
