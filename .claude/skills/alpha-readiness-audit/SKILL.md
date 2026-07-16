---
name: alpha-readiness-audit
description: Pre-alpha sweep for incomplete features, orphaned schema, missing input validation, placeholder content, and React correctness bugs in Mune. Run before alpha testers, investor demos, or any public milestone. Complementary to `privacy-audit` — this catches completeness and correctness, not privacy violations. Use this skill whenever the user asks for a pre-launch audit, pre-alpha check, "is this ready to ship", "check for incomplete features", "find placeholders", "audit for launch", "ready for the demo", or wants a comprehensive completeness sweep of the app.
user-invocable: true
---

# Alpha Readiness Audit

Pre-launch sweep for completeness, correctness, and polish. Seven focused checks. Run before alpha testers, investor demos, or any public milestone — not on every PR.

**Scope boundary:** If a finding is a privacy concern, it belongs in `privacy-audit`, not here. This skill checks whether the app is finished and correct, not whether it's safe.

## Severity frame

Every finding is graded to tell the reader what to do with it:

| Severity | Meaning | Example |
|---|---|---|
| **Ship-blocker** | Visible bug in a user path; demo will fail / embarrass | Contact form silently drops submissions; placeholder hero on landing page |
| **Should-fix** | Functional gap, not user-visible in the happy path, but likely to surface under real use | API route with no request-body validation; useEffect with a stale closure risk |
| **Nice-to-have** | Code hygiene; no user impact | Dead exports, unused imports |

## How to run

Run the seven checks in order. For each, produce:
- **PASS** → `✓ clean` plus a one-line summary of what was checked.
- **FAIL** → table with columns `File | Line | Issue | Fix` and the severity label.
- **UNCLEAR** → explain what couldn't be determined automatically and what the human should verify manually.

At the end, print an aggregate summary (shape defined at the bottom of this skill).

### Check 1 — Placeholder content in user-facing routes

Grep the public and authenticated surfaces for leftover scaffolding:

```bash
cd /Users/figge/Dev/mune
grep -rniE "TODO|FIXME|XXX|placeholder|lorem ipsum|< *div[^>]*>\s*TODO" \
  apps/web/app/\(root\)/ apps/web/app/\(protected\)/ \
  --include="*.tsx" --include="*.ts"

# Commented-out JSX blocks (large, worth a human read)
grep -rnE "^\s*//\s*<|^\s*\{?\s*/\*\s*<" \
  apps/web/app/\(root\)/ apps/web/app/\(protected\)/ \
  --include="*.tsx"
```

Any hit on a route users can reach: **Ship-blocker**. Hits in helper files / tests: **Nice-to-have**.

### Check 2 — API route input validation

For every `route.ts` under `apps/web/app/api/`, determine whether the handler validates its request body before consuming fields.

```bash
for f in apps/web/app/api/*/route.ts apps/web/app/api/**/route.ts; do
  [ -f "$f" ] || continue
  echo "--- $f ---"
  if grep -qE "safeParse|\.parse\(" "$f"; then
    echo "  validation: zod"
  elif grep -qE "typeof .* !==|Array\.isArray" "$f"; then
    echo "  validation: manual (hand-rolled guards)"
  else
    echo "  validation: NONE — FAIL"
  fi
done
```

Report per route: path, method, validation style (`zod` / `manual` / `none`), and — for manual or none — which body fields are used unvalidated.

No validation on a route that touches user data: **Ship-blocker**. Manual validation that covers the present fields: **Should-fix** (migrate to Zod per `.claude/rules/coding.md`). Zod-validated: **PASS**.

### Check 3 — Orphaned schema (non-privacy)

A table exists in migrations but has no query module and no in-app caller. Dead schema — either the feature was never built or was removed without migration cleanup. Privacy-sensitive names (`entry_patterns`, `mood_logs`, etc.) belong in `privacy-audit` Category 8, not here.

```bash
cd /Users/figge/Dev/mune

# Extract every CREATE TABLE from migrations
for t in $(grep -rhE "CREATE TABLE (IF NOT EXISTS )?([a-z_]+)" supabase/migrations/ \
  | sed -E 's/.*CREATE TABLE (IF NOT EXISTS )?([a-z_]+).*/\2/' | sort -u); do
  # Any DROP TABLE that kills it?
  if grep -qE "DROP TABLE (IF EXISTS )?$t\b" supabase/migrations/; then
    continue
  fi
  # Any query or in-app reference?
  refs=$(grep -rcE "\.from\([\"']$t[\"']\)|FROM $t\b" \
    packages/db/src/ apps/web/ 2>/dev/null | awk -F: '{sum += $2} END {print sum+0}')
  [ "$refs" -eq 0 ] && echo "ORPHAN: $t (in migrations, zero in-app references)"
done
```

Orphan table for a public-facing feature (e.g. `profiles` if signup depends on it): **Ship-blocker**. Internal / admin-only orphan: **Should-fix**. If the orphan name suggests behavioral tracking (mood / sentiment / emotion / patterns), redirect the finding to `privacy-audit` Category 8 — do not double-report.

### Check 4 — Forms that don't submit

Find every `<form>` and every component whose name ends in `Form`. For each, trace the submit handler and flag any one of:
- `onSubmit` that only calls `setState`
- `onSubmit` that calls a function containing no network request (no `fetch`, no Supabase / Clerk / Resend call, no `createEntry`/`createMessage`/server action)
- `onSubmit` that references an integration module that isn't imported anywhere in the file

```bash
grep -rnE "<form\b|[A-Za-z]+Form\s*[:=]|function [A-Z][A-Za-z]+Form\b" \
  apps/web/components/ apps/web/app/ \
  --include="*.tsx" | head -40
```

For each hit, read the onSubmit handler and confirm a real network call chain. **Special case — contact form:** confirm `apps/web/app/(root)/contact/actions.ts` imports `Resend` AND the component posts to the action.

Form that doesn't reach the network: **Ship-blocker**. Form that submits to a stubbed action that returns without doing work: **Ship-blocker**.

### Check 5 — useEffect correctness

For every `useEffect` in a client component under `apps/web/app/(protected)/` and `apps/web/app/onboarding/`, list:
- File path + line number
- The dependency array contents
- Any state / prop / callback closed over inside the effect body that is missing from the deps

```bash
# Enumerate useEffect sites to review
grep -rn "useEffect" apps/web/app/\(protected\)/ apps/web/app/onboarding/ \
  --include="*.tsx" --include="*.ts"

# Then for each, read ~30 lines around it and identify closure references
```

Review manually — static grep can't catch all stale-closure shapes. Known hotspot: `apps/web/app/(protected)/reflect/page.tsx` has historically had issues. Read both of its useEffects in full.

Stale-closure risk that affects rendered state: **Should-fix**. Demonstrably broken (produces wrong UI): **Ship-blocker**. If the effect's deps look complete, report PASS with the citation.

### Check 6 — Invisible UI / broken tokens

Grep component files for Tailwind classes or CSS custom properties that reference tokens not defined in `apps/web/app/globals.css`, OR that resolve to near-transparent / near-background values on the dark surface.

```bash
# Every arbitrary-value Tailwind class in components
grep -rnE "bg-\[[^]]+\]|text-\[[^]]+\]|border-\[[^]]+\]" \
  apps/web/components/ --include="*.tsx" | head -40

# Unresolved semantic tokens
grep -rn "bg-[a-z-]*-" apps/web/components/ --include="*.tsx" \
  | grep -oE "bg-[a-z-]+" | sort -u
# Compare that list against token definitions
grep -nE "^\s*--[a-z-]+:" apps/web/app/globals.css
```

Specifically inspect mood indicators and status dots. Known-once issue: `MOOD_COLORS` in `session-history.tsx` + `from-chat-entry.tsx` used opacity values as low as `bg-brand-purple/10` on 10px dots over `#161616`, rendering invisible. Floor is now `/50`; re-verify it hasn't drifted.

Near-invisible UI element a user would actually look for (status dot, badge, CTA accent): **Should-fix**. Decorative only: **Nice-to-have**.

### Check 7 — Dead imports and unused exports

TypeScript's own `noUnusedLocals` + `noUnusedParameters` only covers in-file usage. Cross-file dead exports need repo-wide grep.

```bash
# Exported components with zero imports across the repo
for f in $(find apps/web/components -name "*.tsx"); do
  names=$(grep -oE "^export (function|const) [A-Z][A-Za-z0-9_]+" "$f" \
    | awk '{print $3}' | tr -d '=' | sort -u)
  for name in $names; do
    count=$(grep -rcE "\b$name\b" apps/web/ --include="*.tsx" --include="*.ts" \
      | awk -F: '{if ($2 > 0) s++} END {print s+0}')
    # A component used only in its own file produces count==1
    [ "$count" -le 1 ] && echo "DEAD EXPORT: $name in $f"
  done
done
```

Everything here is **Nice-to-have** — no user impact, just noise.

## Output format

For each category, produce one of:

```
### Check N — <title>

**PASS** ✓ clean — <one-line summary of what was checked>
```

```
### Check N — <title>

**FAIL** — <severity>

| File | Line | Issue | Fix |
|---|---|---|---|
| `path/to/file.ts` | 123 | What's wrong | One-line fix |
```

```
### Check N — <title>

**UNCLEAR** — <what couldn't be determined automatically>.
Human to verify: <what to do manually>.
```

## End summary

After all seven checks, print:

```markdown
## Summary

- **Total categories:** 7
- **Passed:** N
- **Failed:** N
  - Ship-blocker: N
  - Should-fix: N
  - Nice-to-have: N
- **Unclear:** N

**Net assessment:** <one sentence — e.g., "Two ship-blockers before alpha. Three should-fix items worth addressing this week. No privacy findings (run `/privacy-audit` separately for that).">
```

## Tips

- **Don't double-report with `privacy-audit`.** Any finding with a privacy angle (encryption, RLS, key handling, third-party scripts on sensitive routes, behavioral tables) belongs in `/privacy-audit`, not here. Cross-check before filing: if the problem would persist even with perfect privacy hygiene, it's for this skill. If fixing the privacy issue fixes the problem, it belongs to privacy-audit.
- **Be specific with citations.** Every failure must cite `file:line`. "The contact form is broken" is unactionable; "`apps/web/app/(root)/contact/actions.ts` has no `Resend` import despite the form expecting email delivery" is actionable.
- **Grade against user impact.** A placeholder div on `/pricing` is ship-blocker if the page is linked from the nav. The same div on `/dev-sandbox` is nice-to-have.
- **Known hotspots first.** Before expanding the sweep, verify: reflect/page.tsx useEffects (Check 5), MOOD_COLORS opacity (Check 6), contact form Resend wiring (Check 4). These have been the biting points historically.
- **Record false-pass misses.** If a check returns PASS but the user later finds a problem in that category, note the pattern the grep missed — the recipe almost certainly needs widening (as happened with the ZDR grep recipe in the initial `privacy-review` skill).

## Non-goals

- **Not a privacy audit.** Use `/privacy-audit` for encryption, RLS, third-party scripts, plaintext in logs, key handling, behavioral tables.
- **Not a pentester.** Use `/shannon` for active exploitation probes.
- **Not a brand / TOV review.** Use `/brand-voice` or `copy-reviewer` for copy.
- **Not a replacement for manual QA.** This skill catches static-analysis-detectable issues. A person still has to actually run the app before a public milestone.
