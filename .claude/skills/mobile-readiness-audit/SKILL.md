---
name: mobile-readiness-audit
description: Use when auditing the Mune monorepo for the feasibility of building a React Native / Expo mobile client against the existing Next.js backend. Run when the user asks "is the backend mobile-ready", "can we ship a mobile app", "what needs to change for Expo/React Native", "audit for mobile", "mobile readiness check", or wants a plan for adding mobile to this repo or splitting it into a separate repo. Audit-only — produces a severity-graded markdown report and a prioritized action list, never modifies code.
user-invocable: true
---

# Mobile Readiness Audit

Pre-mobile-build sweep for the Mune backend (Next.js Route Handlers + shared packages). Six structural checks plus one layout decision (where the mobile app lives). **Audit-only — never modify code.**

The mobile client will be Expo / React Native on the Hermes runtime and must reuse `@mune/ai`, `@mune/db`, `@mune/crypto`, and the existing `/api/*` routes. Anything that ties those to Next.js or the browser is a finding.

## Severity frame

| Severity | Meaning | Example |
|---|---|---|
| **Blocker** | Must fix before any mobile build starts. Mobile cannot run, authenticate, or encrypt without this. | Routes use cookie-only auth; `@mune/crypto` RN adapter is a throwing stub; `next/*` import in a shared package |
| **Moderate** | Fix during mobile build (can wait until a real RN client is testing against it). Reduces friction but doesn't prevent boot. | Inconsistent JSON envelopes; non-portable server actions on a path mobile depends on; missing turbo build env entry |
| **Informational** | Worth noting but acceptable as-is. Often "this won't be reused on mobile, that's fine." | Server actions in admin / waitlist / contact paths; relative `fetch('/api/...')` in web client code |

Every finding gets a severity. Ungraded findings are bugs in the report.

## Output

Write the report to `docs/mobile-readiness-audit-YYYY-MM-DD.md` (today's date in ISO form). Do **not** overwrite older audits — they're part of the change history.

Structure the report as:

1. **Executive summary** — 3-5 sentences. Honest. Are we mobile-ready or not? What's the biggest blocker?
2. **Six numbered sections**, one per check below. Each section:
   - **Verdict:** Ready / Needs work / Blocker
   - **Findings** with concrete `file_path:line_number` citations
   - **Recommendation** — a concrete next step (no "consider whether to…" hedging)
3. **Section 7 — Repository layout** (`apps/mobile/` vs separate repo). Decision matrix, recommendation.
4. **Prioritized action list** at the end:
   - Must-fix before any mobile build starts
   - Fix during mobile build
   - Can ignore / acceptable as-is

Be direct. Flag real problems. No padding with reassurances.

## How to run

For each check, read every file referenced. Cite line numbers. Don't trust grep alone — confirm by reading.

If a previous audit exists at `docs/mobile-readiness-audit-*.md`, read the latest one first and note what's been fixed since (a regression in a previously-Ready check is its own kind of finding).

### Check 1 — Route handlers are thin proxies

For every `apps/web/app/api/**/route.ts`:

```bash
find apps/web/app/api -name route.ts | xargs wc -l
```

Trace shape: auth gate → request validation → delegate to a service in `@mune/ai` or `@mune/db` → return via `apiOk` / `apiErr` (or SSE for streaming). Flag:
- Inline AI prompt strings (vs `import { *_PROMPT } from '@mune/ai'`)
- Inline DB queries that should live in `@mune/db`
- Multi-step orchestration that mobile would re-implement instead of reuse

Routes to audit (list with `find` — new endpoints get added):
- `/api/reflect` — SSE streaming
- `/api/journal-assist` — JSON
- `/api/journal-summary` — JSON
- `/api/session-summary` — JSON
- `/api/daily-prompt` — JSON
- Plus any new ones (auth, contact, admin, cron, webhook routes)

Thin (≤150 lines, single delegation, no inline business logic) → **Ready**. Heavy (inline logic that an Expo app on a separate backend couldn't trivially reuse) → **Moderate**.

### Check 2 — No business logic in RSC, server actions, or middleware

Server actions and Next.js middleware will not be reachable from mobile. Anything mobile depends on must live in a Route Handler.

```bash
grep -rn "'use server'" apps/web --include="*.ts" --include="*.tsx"
grep -rn "\"use server\"" apps/web --include="*.ts" --include="*.tsx"
```

For each `'use server'` file, classify the path:
- **Admin / marketing / waitlist / contact** — mobile won't call these → **Informational**
- **Core user path** (auth, journal, reflect, settings) — mobile depends on the underlying logic → **Blocker**, must move logic to a route handler

Read `apps/web/proxy.ts` (note: NOT `middleware.ts` — Next.js 16 renamed the convention; CLAUDE.md gotcha). Confirm it only handles auth-gating and CSP nonce injection. Any business logic in middleware that mobile would also need (rate limiting, content rewrites) → **Moderate**.

Read every `async function Page()` / `async function Layout()` under `apps/web/app/(protected)/` and `(root)/`. Pure data fetching for SSR is fine. Side-effectful business logic (mutating DB, calling AI) inside an RSC → **Blocker**.

### Check 3 — Consistent JSON envelopes

Confirm the envelope contract at `apps/web/app/api/_lib/responses.ts`:
- `apiOk<T>(data: T, status = 200)` returns `{ ok: true, data }`
- `apiErr(code: string, status: number, detail?: unknown)` returns `{ ok: false, code, detail? }`
- Shared `ApiEnvelope<T>` type exported

For every JSON route, verify it uses `apiOk` / `apiErr`. Hand-rolled `NextResponse.json({...})` → **Moderate** (regression on the contract).

For the SSE endpoint (`/api/reflect`), verify error frames follow the streaming contract documented at the top of the route file. Inconsistent SSE error framing → **Moderate**. (Do not apply the JSON envelope rule to SSE — that's a false positive.)

Build the error-code vocabulary by listing every distinct `code` string passed to `apiErr` across all routes. Inconsistent codes for the same conceptual error (e.g. `INVALID_BODY` in one route and `BAD_INPUT` in another) → **Moderate**.

### Check 4 — Bearer-token compatible auth

Mobile authenticates with `Authorization: Bearer <clerk-session-token>`. Cookie-only auth blocks every API call.

For every route handler:
- Check how auth is invoked. `await auth()` from `@clerk/nextjs/server` — confirm the Clerk version supports Bearer tokens (Clerk v5+: yes by default, but verify `apps/web/proxy.ts` doesn't override session strategy).
- Look for explicit `cookies()` from `next/headers` driving auth decisions → **Blocker**.
- Look for `req.cookies.get('__session')` or similar → **Blocker**.

Read `apps/web/proxy.ts`. Confirm `clerkMiddleware()` is configured without `cookieOnly` or session-mode overrides that exclude Bearer.

For Supabase access, confirm the route uses `getToken({ template: 'supabase' })` and passes it to `createClientWithToken(token)`. Mobile must do the same flow — confirm the JWT template `supabase` exists in Clerk and that the Clerk Expo SDK can mint it.

If any production route is cookie-only and mobile depends on it → **Blocker**. Recommend a small `apps/web/lib/auth-with-bearer.ts` helper that accepts both header and cookie auth.

### Check 5 — `@mune/crypto` portability to React Native

The platform shim at `packages/crypto/src/platform.ts` must be the **only** place that touches platform globals.

```bash
grep -rn "window\.\|document\.\|self\.\|globalThis\." packages/crypto/src/
grep -rn "crypto\.subtle\|crypto\.getRandomValues" packages/crypto/src/ | grep -v platform.ts
grep -rn "TextEncoder\|TextDecoder\|btoa\|atob" packages/crypto/src/ | grep -v platform.ts
```

Any leak in another file → **Blocker**.

Read `packages/crypto/package.json`. Any browser-only dependency (`jsdom`, `node-forge`, anything Node `crypto`-shimmed for the browser) → **Blocker**.

Read the RN side of `platform.ts` (the `IS_RN` / `navigator.product === 'ReactNative'` branch). If it's a throwing stub, mobile crashes at the first encryption call → **Blocker**, with a concrete fix:
- `react-native-quick-crypto` for `subtle` + `getRandomValues`
- `text-encoding` (or Hermes-built-in TextEncoder, depending on RN version) for the codec types
- A polyfilled `btoa` / `atob` (e.g. `base-64` package) since Hermes lacks them by default

Run the round-trip tests:
```bash
pnpm --filter @mune/crypto test
```
Failing tests on web → **Blocker** (the shim itself is broken). Tests pass on web but RN adapter is a stub → **Blocker** (not yet wired, but separately tracked).

### Check 6 — No hardcoded Next-isms in shared packages

```bash
grep -rn "from 'next/\|from \"next/" packages/
grep -rn "process\.env\.NEXT_PUBLIC_" packages/
```

Any `next/*` import in `packages/` → **Blocker**. Shared packages must be framework-agnostic.

Any `NEXT_PUBLIC_*` env var read in `packages/` → **Blocker**. Env vars consumed by shared packages must use neutral prefixes (`MUNE_*`) so an Expo app can alias `EXPO_PUBLIC_MUNE_*` → `MUNE_*` at module load.

Confirm `apps/web/next.config.ts` has an `env:` block exposing the Mune env vars to the browser bundle:
```ts
env: {
  MUNE_SUPABASE_URL: process.env.MUNE_SUPABASE_URL,
  MUNE_SUPABASE_ANON_KEY: process.env.MUNE_SUPABASE_ANON_KEY,
}
```
Missing `env:` block → web bundle silently breaks (Moderate, not mobile-blocking — but worth flagging).

Confirm `turbo.json#tasks.build.env` lists every `MUNE_*` var that affects build output. Missing entries → cache poisoning across the monorepo → **Moderate**.

Grep for hardcoded URLs in shared packages:
```bash
grep -rnE "https?://" packages/ --include="*.ts" | grep -v "@types"
```
Any `localhost:3000` or hardcoded production URL in `packages/` → **Blocker**.

In `apps/web/`, fetch calls using relative paths (`fetch('/api/...')`) are fine for the web client. Mobile will need a base URL → note as **Informational** and recommend a single `getApiBase()` helper the mobile app can override.

### Check 7 — Repository layout decision (where the mobile app lives)

Not a fail check — surface tradeoffs in the report so the user picks.

| | `apps/mobile/` (this monorepo) | Separate repo (e.g. `mune-mobile`) |
|---|---|---|
| Sharing `@mune/{crypto,ai,db,types}` | Direct workspace import (`workspace:*`) | Publish to private npm OR git submodule |
| CI | Single Turborepo pipeline, can fan out | Two pipelines |
| Env vars | One source of truth, with `EXPO_PUBLIC_*` aliasing | Separate env per repo |
| Install footprint for web devs | Adds Expo / RN / Metro tooling to every web `pnpm install` | Web stays clean |
| Atomic refactors across web + mobile + shared | One PR | Multi-repo coordination |
| EAS / OTA updates | Same | Same |
| Tooling friction | pnpm + Turborepo + Expo Router play together but require careful workspace config (Metro resolver, Hermes config) | Cleaner config; you lose the workspace |

**Recommendation:** Default to `apps/mobile/` for a small team (1-3 devs). The shared packages are the entire point of the monorepo split — separating them re-introduces the versioning friction that motivated extracting them. Move to a separate repo only if the install footprint becomes a real problem (RN's transitive deps regularly add 200-500MB of `node_modules`) or the mobile team grows independently.

State this as a recommendation, not a blocker. The user makes the call.

## End summary

After all six checks + the layout decision, append:

```markdown
## Summary

- **Checks performed:** 6 + 1 layout decision
- **Ready:** N
- **Needs work:** N
- **Blocker:** N

**Net assessment:** <one sentence — e.g., "Two blockers must close before mobile build starts: Bearer auth helper and RN crypto adapter. JSON envelopes, package portability, and route-handler shape are all clean.">

**Repository layout recommendation:** <apps/mobile/ vs separate, one sentence why>
```

## Tips

- **Don't trust grep alone.** Every cited `file:line` must come from an actual read. Greps surface candidates; reads confirm. A grep can hit a comment or a string literal that isn't actually live code.
- **The audit must be reproducible.** Two months from now, running this skill again should produce a comparable report. That's why severity grades matter — they let you diff progress between runs.
- **Check the prior report first.** If `docs/mobile-readiness-audit-*.md` already exists, read the latest. New audit should note what's been fixed since the last run and (more importantly) what's regressed.
- **Don't pad.** "This is fine and well-done!" lines are not findings. If a section has nothing to flag, write `**Verdict:** Ready` and one line of evidence.
- **Streaming endpoints are special.** `/api/reflect` uses SSE — applying the JSON envelope rule blindly to it is a false positive. Read the streaming contract first; then verify error frames follow it.
- **Clerk Expo SDK gotchas.** When recommending the Bearer-auth helper, mention that the Clerk Expo SDK uses a different session-token shape than the web SDK — the helper's testing plan should include a real Expo round-trip, not just a curl test.
- **Hermes runtime gaps.** Hermes (RN's default JS engine since 0.70) lacks `crypto.subtle`, `TextEncoder`/`TextDecoder` (until very recent versions), `btoa`/`atob`, `URL.canParse`, `Intl.Segmenter`, and full `Intl` data by default. Anything in a shared package that touches these must go through the platform shim.

## Non-goals

- **Not a privacy audit.** Use `/privacy-audit` for encryption invariants, RLS, key handling, third-party scripts, behavioral tables.
- **Not an alpha-readiness audit.** Use `/alpha-readiness-audit` for completeness, missing input validation, broken forms, placeholder content.
- **Not a route-handler audit.** Use `/route-handler-audit` for AI-proxy hygiene (ZDR headers, log hygiene, fence stripping, PII).
- **Not a code-change skill.** This skill produces a markdown plan only. Implementation is a separate `superpowers:writing-plans` + `superpowers:executing-plans` flow.
- **Not a test runner.** Recommend running tests in the report; don't run them as part of the audit.
- **Not a UX audit of the mobile app.** Mobile design and screens are out of scope until the backend is portable.
