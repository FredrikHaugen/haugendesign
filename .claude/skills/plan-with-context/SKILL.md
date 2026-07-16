---
name: plan-with-context
description: Write an implementation plan with primary-source context — Playwright snapshots of the affected routes, ui-ux-pro-max design intelligence for any UI work, and unsplash-integration when imagery is needed — and then hand off to superpowers:writing-plans. Use whenever the user asks to plan a feature, redesign, or change that touches the UI, marketing pages, brand surfaces, copy with visual implications, or anything user-facing where seeing the current state matters. Triggers on "plan with context", "/plan-with-context", or any planning request where visual evidence would change the plan.
user-invocable: true
---

# plan-with-context

A wrapper around `superpowers:writing-plans` that forces the assistant to gather primary-source evidence before drafting. Plans written without seeing the current state are guesswork; plans written without design intelligence drift toward generic SaaS aesthetics; plans that mention new imagery without surfacing candidates push that work into execution where it shouldn't live.

**Announce at start:** "I'm using the plan-with-context skill — gathering live state, design intelligence, and asset candidates before drafting the plan."

## Step 1 — Read the brief

The user's argument (or most recent message) is the brief. Pull out:

- **Affected routes / components.** Which pages or files does the change touch? If it's a marketing page, the route is in `apps/web/app/(root)/`. If it's app shell, `apps/web/app/(protected)/`. Be specific — "the homepage" means `/`, not "everywhere."
- **`is-visual`** — true if the change affects layout, copy on a public surface, design tokens, motion, or anything a user can see.
- **`needs-imagery`** — true if the brief mentions photography, illustration, hero art, or "more visual" content where new image assets are plausible.

If any of these are genuinely unclear (not just slightly fuzzy), ask one tight clarifying question. Otherwise proceed.

## Step 2 — Snapshot the current state with Playwright

Required when `is-visual` is true. Skip for backend / migration / API-only work.

For each affected route:

1. `mcp__playwright__browser_resize` → `1440 × 900`, navigate, screenshot full page → save as `<route-slug>-current-desktop.png`
2. `mcp__playwright__browser_resize` → `390 × 844`, navigate again, screenshot full page → save as `<route-slug>-current-mobile.png`

Inspect both screenshots before proceeding. Note specific issues you can see — copy density, hierarchy problems, vertical rhythm, mobile reflow, anything that contradicts assumptions in the brief.

If `localhost:3000` isn't running, ask the user to start it (don't start dev servers unprompted on this project).

## Step 3 — Consult `ui-ux-pro-max:ui-ux-pro-max` (when `is-visual`)

Invoke it with a concrete query that includes the product type, target audience, and style keywords from the brief. Capture:

- Recommended pattern / style match
- Color and typography guidance
- Anti-patterns flagged for this product type
- Any specific UX rules from the relevant priority category (Accessibility, Touch & Interaction, Performance, etc.)

**Reconcile against Mune rules.** Where ui-ux-pro-max conflicts with `.claude/rules/brand.md`, `.claude/rules/TOV.md`, `.claude/rules/figma-design-system.md`, or `CLAUDE.md`, Mune wins. Note the conflict in the plan so the executor knows it was deliberate. (Common case: ui-ux-pro-max bans serif fonts for "dashboard UIs" — Mune deliberately uses Noto Serif.)

## Step 4 — Source imagery with `unsplash-integration` (when `needs-imagery`)

Invoke it with concrete keywords drawn from the brief and brand voice. Surface 3–5 candidates and include URLs + suggested alt text in the plan as proposed assets. Do not download — that's an execution step.

## Step 5 — Draft the plan via `superpowers:writing-plans`

Invoke `superpowers:writing-plans` and pass the gathered evidence. The plan MUST cite:

- Path(s) to the screenshots from Step 2.
- ui-ux-pro-max recommendations actually adopted, and any rejected with reason.
- Imagery candidates and intended usage if applicable.
- The specific Mune rules (`brand.md`, `TOV.md`, `privacy.md`, `ai-layer.md`) that constrain the design.

The output file lives at `docs/superpowers/plans/YYYY-MM-DD-<slug>.md` per the wrapped skill's convention. (Note: that directory is gitignored — plans are local working notes.)

## Step 6 — Hand off

After saving the plan, follow the writing-plans Execution Handoff: offer subagent-driven vs inline execution. Default to inline for solo Mune work since the codebase is small and review is fast.

## When NOT to use

- Pure backend, migration, RLS, or API-only work without UI implications → use `superpowers:writing-plans` directly.
- One-line copy tweaks where the existing state is already obvious → just edit, no plan needed.
- Research-only questions ("how does X work in this codebase?") → use Explore or general-purpose subagents.

## Tradeoffs to know

- Step 2 takes a real Playwright session; if Mune's dev server isn't running this skill stalls. The user starts the dev server, not the assistant.
- Step 3's ui-ux-pro-max output skews toward generic SaaS conventions in places. The reconcile-against-Mune-rules pass in Step 3 is non-optional.
- Step 4 returns Unsplash photos which are royalty-free but not on-brand by default. Treat candidates as starting points for discussion, not final assets.
