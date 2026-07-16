---
name: serp-analysis
description: Use when the user asks for a SERP analysis, SERP report, GEO/AEO audit, competitor SEO check, AI-engine visibility check, or keyword opportunity scan for the Mune marketing site (mune.so). Triggered by /serp-analysis.
disable-model-invocation: true
---

# SERP Analysis

End-to-end SERP + GEO (generative-engine optimization) analysis for the Mune marketing site at `mune.so`. Reads the local `mune-marketing/` brand workspace, fetches the live site, runs competitor and keyword research online, invokes the relevant companion skills, and produces a single dated report at `mune-marketing/SERP_analyzis/SERP-Analysis_<YYYY-MM-DD>.md` with a prioritized fix list that Claude can execute in a follow-up session.

The report is the deliverable. The skill is read-only on the codebase. Fixes ship in a separate session.

## When to use

- User types `/serp-analysis`
- User asks for "SERP report", "competitor SEO check", "GEO audit", "AEO audit", "AI-engine visibility", "keyword opportunity scan", or any combination that needs online competitor research + a fix list for the Mune marketing site
- User wants a handoff document Claude can execute in a separate pass

Do NOT use this for:
- Single-page SEO tweaks → use `searchfit-seo:on-page-seo`
- Pure technical-only audit (no competitor / keyword work) → use `seo-checker` directly
- Schema generation → that's the next-session job; this skill recommends it, doesn't do it

## Tools required

The skill orchestrates these tools, roughly in this order:

| Tool | Use |
|---|---|
| `Glob`, `Read` | Ingest `mune-marketing/_context/`, `seo_audits/`, `Blog_Posts/`, `campaigns/` |
| `Read`, `Grep` | Cross-reference codebase at `apps/web/app/(root)/`, `sitemap.ts`, `lib/cms/defaults.ts` |
| `Bash` | `date +%Y-%m-%d` for the report filename, occasional `wc` |
| `WebFetch` | Fetch live `mune.so` pages, competitor pages, schema validator output |
| `WebSearch` | Keyword research, SERP queries, AI-engine answer probes |
| `Write` | The final report file. Nothing else. |

Optional escalation tool: `mcp__playwright__browser_navigate` + `mcp__playwright__browser_snapshot` only if a rendered SERP feature (AI Overview, knowledge panel) cannot be read via WebFetch. Default to WebFetch first.

## Companion skills

Invoke each via the `Skill` tool when the step calls for it. Do not redo their work.

| Skill | Phase | Purpose |
|---|---|---|
| `seo-checker` | **Always — Step 2** | Technical baseline of `(root)/` pages: titles, meta, og:image, schema, sitemap. Capture its output verbatim into the report. |
| `brand-voice` | **Always — Step 5** | Voice-review every proposed copy line BEFORE it enters the fix list. Reject anything brand-voice would flag (em-dashes in new content, exclamation points, therapy-speak, performative care, adjective stacks). The fix list shows only voice-approved copy. |
| `unsplash-integration` | **Conditional — Step 5** | Invoke when the report recommends a new hero / og:image / blog-post header. Use intentional, artistic keywords per the skill's rules. Capture the resulting URL with `?w=1600&q=85&fit=crop` parameters into the fix. |
| `searchfit-seo:schema-markup` | **Recommend only — Step 6** | Do NOT invoke during the analysis. Add it to the "Next session" block of the report with the exact list of pages that need schema work. The next session will run it with full context. |

## Process

### Step 1 — Ingest local context

The marketing repo is mid-rename from "Eir" → "Mune". Reconcile silently in the report using "Mune" as the authoritative name, except in the dedicated "Repo state" section where you flag the contradictions.

Read in this order:

1. `mune-marketing/CLAUDE.md` — repo orientation
2. `mune-marketing/_context/*.md` — six canonical brand files (brand context, voice, style, ICP, product offerings, growth)
3. `mune-marketing/seo_audits/` — most recent audit by filename date. Diff against it; don't re-derive findings that haven't changed.
4. `mune-marketing/Blog_Posts/` and `Blog_Posts/Ideas/` — published essays + idea backlog. Feeds content-gap analysis.
5. `mune-marketing/campaigns/` — open campaigns. Tells you which keywords matter right now.
6. `apps/web/app/(root)/` (and subroutes) — live page metadata via the Next.js codebase
7. `apps/web/app/sitemap.ts` and `apps/web/lib/cms/defaults.ts` — canonical metadata sources for the live site

### Step 2 — Technical baseline

Invoke `seo-checker` via the `Skill` tool. Capture its full output (the per-page table + failure list) verbatim into the report under `## Technical baseline`. Do not edit, summarize, or reorder.

### Step 3 — Live site reconciliation

For each `(root)/` route in the seo-checker table, fetch `https://mune.so<path>` with `WebFetch`. Compare against the codebase:

- Rendered `<title>` vs `metadata.title`
- Rendered meta description vs `metadata.description`
- Rendered og:image vs `metadata.openGraph.images`
- Indexability (`<meta name="robots">`) and canonical link

If `mune.so` is not yet live, returns a different domain (e.g. still serving `eir.so`), or a route 404s, record the actual served state in the report. Do not fail the run.

### Step 4 — Competitor, keyword, and GEO research (online)

Use `WebSearch` and `WebFetch`. Cap each section so the report stays scannable.

**Fixed competitor set for Mune:**

| Category | Competitors |
|---|---|
| AI companions | Replika, Pi (`pi.ai`), Character.ai |
| Encrypted journaling | Day One, Journey, Stoic, Rosebud (`rosebud.app`) |
| Mental wellness | Calm, Headspace, Finch, Howie |
| AI therapy-adjacent (negative reference) | Woebot, Wysa, Youper |

For each competitor:
- Fetch homepage and `/pricing` (if it exists)
- Capture `<title>`, meta description, H1, one-sentence positioning claim
- Note any schema types they use that Mune does not (FAQPage, SoftwareApplication, Product, Review, etc.)
- Note their primary keyword angle (informational only — never recommend stuffing)

**Target keyword clusters:**

Run `WebSearch` for each seed query. Capture: top 10 organic results, presence of AI Overview / featured snippet / People Also Ask, and which competitor (if any) ranks. Note Mune's current rank or "not ranking".

| Cluster | Seed queries |
|---|---|
| Private journaling | `private journaling app`, `encrypted journal`, `end-to-end encrypted journaling`, `journal app that doesn't store data` |
| AI companion | `private AI companion`, `AI to talk to anonymously`, `AI for reflection`, `AI without persona` |
| Anti-therapy alternative | `journal app for people who think too much`, `AI alternative to therapy`, `2am thoughts app`, `AI for late night thoughts` |
| GEO / AI-engine | `best private AI journal 2026`, `most private AI chatbot`, `AI you can vent to` |

**GEO probe (Generative Engine Optimization):**

Run `WebSearch` for AI-engine answers (or fetch ChatGPT/Claude/Perplexity public share URLs if the user supplies any) for: *"What is the most private AI journal?"*, *"What's a good AI to vent to that doesn't store data?"*, *"Encrypted journaling apps."*

For each: note whether Mune is mentioned, which engine mentioned it, and what citation source the engine pulled from. The answer to "how do we get cited more" lives in the citation source, not the engine — list those sources as ranking targets in the fix list.

### Step 5 — Synthesize fix list

Three priority buckets:

**P0 — Critical:** broken signals, missing required metadata, schema errors, indexability problems. Paste the failures from Step 2 verbatim with file paths and line numbers.

**P1 — Keyword + copy:** title, meta description, H1, body copy. For each:
- Quote the current value with file path and line number
- Propose the new value
- **Before adding it to the report, invoke `brand-voice` via the `Skill` tool** to verify the proposed line. Reject anything voice would flag. Iterate until voice-approved. Only voice-approved copy enters the report.
- Tie the fix to a specific target keyword from Step 4 or a competitor gap

**P2 — Visual + schema + structural:** hero/og:image upgrades, schema gaps, internal linking gaps. For each visual fix:
- **Invoke `unsplash-integration` via the `Skill` tool** with intentional descriptive keywords that match Mune's tone (no "happy people", no "meeting room"; do "desaturated 4am window light through linen curtain", "minimalist editorial still life with single linen page")
- Capture the chosen Unsplash URL with sizing parameters into the fix
- For schema gaps, record the page + missing schema type. Do NOT generate schema here — that's the next-session job.

For every recommendation in every bucket include:
- File path and line number, OR `mune.so` URL if codebase-internal
- Current value (quoted)
- Proposed value (quoted)
- One-line rationale tied to a target keyword, competitor gap, GEO citation source, or technical signal

### Step 6 — Write the report

Run `date +%Y-%m-%d` to get the date stamp. Write the file `mune-marketing/SERP_analyzis/SERP-Analysis_<YYYY-MM-DD>.md` with this exact section order. Do not write any other file. Do not edit any codebase file.

```
# SERP + GEO Analysis — mune.so
**Generated:** <YYYY-MM-DD>
**Run by:** /serp-analysis

## Executive summary
| Metric | Value |
|---|---|
| Overall score | <0–100> |
| Pages analyzed | <n> |
| P0 (critical) | <n> |
| P1 (keyword + copy) | <n> |
| P2 (visual + schema) | <n> |
| GEO mentions found | <engines that mention Mune>/<engines probed> |

## Repo state
<Eir → Mune rename status, contradictions found, marketing-repo files still using "Eir" naming>

## Technical baseline
<Verbatim output from /seo-checker — table + failure list>

## Live site reconciliation
| Route | Codebase title | Live title | Codebase desc | Live desc | Drift? |
| ... | ... | ... | ... | ... | ... |

## Competitor landscape
| Competitor | Title | H1 | Positioning claim | Schema types we don't have |
| ... | ... | ... | ... | ... |

## Keyword opportunities
| Cluster | Query | Top competitor | AI Overview? | Mune rank | Action |
| ... | ... | ... | ... | ... | ... |

## GEO findings
| Engine probed | Query | Mune mentioned? | Citation source | Action |
| ... | ... | ... | ... | ... |

## P0 — Critical fixes
<File path, current, proposed, rationale>

## P1 — Keyword + copy fixes (brand-voice approved)
<File path, current, proposed, rationale, target keyword>

## P2 — Visual + schema + structural fixes
<File path, current, proposed, rationale; Unsplash URLs included for visual fixes>

## Next session — for Claude executing the fixes

Required skills for the fix pass:
- `/brand-voice` — every copy edit must run through it; this report's P1 list is already voice-approved, but any new strings introduced during fixes must be re-checked
- `/searchfit-seo:schema-markup` — run for these pages with these gaps:
  <list every page with a schema gap from Step 4 + the schema type to add>
- `/unsplash-integration` — run for these slots if the URLs in P2 need to be regenerated:
  <list any visual recommendation that could not be filled during analysis>

Required reading before starting fixes:
- `mune-marketing/_context/Eir_Brand_Voice.md`
- `.claude/rules/TOV.md`
- `apps/web/app/(root)/<each touched route>/page.tsx`
- This report

Do not skip the brand-voice review on any net-new string.
```

## Common mistakes

- **Modifying the codebase during analysis.** The skill is read-only on `apps/web/`. Only `mune-marketing/SERP_analyzis/SERP-Analysis_<date>.md` gets written.
- **Skipping `brand-voice` on copy lines.** Every proposed string must be voice-approved before it lands in the P1 list. No exceptions, including for "obvious" fixes.
- **Running `searchfit-seo:schema-markup` during analysis.** It belongs in the next session. Recommend it in the Next-session block with the exact page + schema-type list, then stop.
- **Treating `mune-marketing/` as a code repo.** It's brand canon. No build, no tests, no edits beyond the report.
- **Surfacing the "Eir" name in user-facing recommendations.** The product is "Mune". Reconcile silently in the fix list. Only the "Repo state" section names the rename gap.
- **Re-deriving findings already in the latest `seo_audits/SEO-Audit_*.md`.** Diff against the most recent audit. Note resolved items as resolved; focus the report on new and unresolved findings.
- **Using generic Unsplash queries.** "Happy people" or "journal" violates the unsplash-integration skill. Match Mune's tone: "linen page in low light", "desaturated 4am window", "single ceramic mug on slate".
- **Padding the keyword section.** Every keyword in the report must map to a fix. If it doesn't, drop it.

## Quick reference

| Step | Action | Tool / Skill | Artifact |
|---|---|---|---|
| 1 | Ingest local context | `Read`, `Glob`, `Grep` | (in-memory) |
| 2 | Technical baseline | `Skill: seo-checker` | "Technical baseline" section |
| 3 | Live site reconciliation | `WebFetch` mune.so | "Live site reconciliation" section |
| 4 | Competitor + keyword + GEO research | `WebSearch`, `WebFetch` | Competitor / keyword / GEO sections |
| 5a | Voice-review every copy line | `Skill: brand-voice` | P1 fix list |
| 5b | Source visuals where needed | `Skill: unsplash-integration` | P2 fix list (Unsplash URLs) |
| 6 | Write report | `Bash: date +%Y-%m-%d`, then `Write` | `mune-marketing/SERP_analyzis/SERP-Analysis_<YYYY-MM-DD>.md` |
| — | Recommend schema-markup for next session | (none — text in report) | "Next session" block |

## Output rules (non-negotiable)

- One file written per run: the dated report
- The report mentions `/searchfit-seo:schema-markup` only as a next-session recommendation, never invoked during the run
- The report's P1 list contains only brand-voice-approved copy
- The report quotes existing values verbatim with file paths and line numbers
- Em-dashes are tolerated in this skill's instruction text (process documentation), but the proposed copy lines for Mune must follow `.claude/rules/TOV.md` — no em-dashes in new Mune content, no exclamation points, no emoji
