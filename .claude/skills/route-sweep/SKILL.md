---
name: route-sweep
description: Use when a tester reports a page looks broken, overflows, or won't load on a phone or a specific browser; when verifying no route regressed across screen sizes after a UI / layout / routing change; or when confirming the post-login vault unlock resolves instead of spinning forever. Covers the Playwright route sweep (every public + protected route × Chromium/WebKit/Firefox × four viewports).
---

# Route sweep (`pnpm e2e`)

## What this is

A Playwright sweep of every route in the app, discovered from the filesystem
(never a hardcoded list), across three engines and four viewports. It asserts
load health, layout, dark-mode-only, mobile tap targets, and — for protected
routes — that the Clerk login + passphrase unlock resolves to content (or a
typed error) instead of spinning forever.

Files live in `apps/web/`:
- `playwright.config.ts` — engine × viewport projects, `webServer` (starts `pnpm dev`), HTML report, trace/screenshot/video on failure.
- `e2e/discover-routes.ts` — filesystem route discovery + classification. `pnpm e2e:routes` prints the manifest.
- `e2e/helpers/assertions.ts` — the shared checks.
- `e2e/public/public-routes.spec.ts` — public, auth, onboarding routes.
- `e2e/private/auth.setup.ts` + `protected-routes.spec.ts` — authenticated + vault-unlocked routes.

## Engine coverage (read this before trusting a green run)

Playwright drives **Chromium, WebKit, and Firefox** — **not Samsung Internet**.
This is cross-engine regression coverage, not a substitute for real-device
testing. The Samsung-Internet "login spinner never resolves" bug must still be
reproduced on a real device (use `/diagnostics` — see the `crypto-self-test`
skill). A green sweep means the three engines Playwright drives are fine.

## When to use

- A tester says a page overflows, looks wrong, or won't load on mobile / a specific browser.
- After any change to a route, layout, navbar, or shared component — confirm nothing regressed across viewports.
- To confirm the post-login unlock resolves (the loading/unlock spinner is the regression this suite exists to catch).
- Before alpha, as a broad "nothing is visibly broken" gate.

## How to run

```bash
cd apps/web
pnpm e2e:routes     # print the discovered + classified route manifest
pnpm e2e:public     # public routes only — no auth needed
pnpm e2e:private    # protected routes — needs the test account (below)
pnpm e2e            # everything
pnpm e2e:report     # open the last HTML report
pnpm e2e:ui         # Playwright UI mode for debugging
```

`webServer` starts `pnpm dev` and reuses an already-running one. The full matrix
is 25 projects (~3–4 min); pass a project to narrow, e.g.
`npx playwright test e2e/public --project=public-chromium-android-sm`.

## Triage: reading a failing run

Each failure message is self-diagnosing: an overflow reports how many px the
document exceeds the viewport; a tap-target failure lists each offending control
as `"label" WxH`. `pnpm e2e:report` opens the HTML report; per-failure trace,
screenshot, and video sit under `test-results/`.

Two heuristics do most of the triage:

- **All three engines fail the same route → a real layout/logic bug. One
  engine/viewport fails while the rest stay green → flake or an engine quirk,
  not a Mune bug.** (This is how a transient "primary content missing" is told
  apart from a genuine one.)
- **A large overflow (hundreds of px) is a real element escaping the viewport;
  ~15px is usually a `100vw` element plus the vertical scrollbar.**

To pinpoint an overflow, open the route at the failing width and find what
escapes — run this in a Playwright `browser_evaluate` (or the browser console):

```js
[...document.querySelectorAll('*')]
  .filter((el) => el.getBoundingClientRect().right > document.documentElement.clientWidth + 5)
  .map((el) => ({ cls: el.className, right: Math.round(el.getBoundingClientRect().right) }))
  .sort((a, b) => b.right - a.right)
  .slice(0, 5);
```

The fix for a decorative element that bleeds off-screen is `overflow-x: clip`
(sticky-safe, unlike `hidden`) on its containing block — not `hidden` on the
element itself, which would crop the intended visual.

## Protected-route setup dependency

The private sweep skips cleanly unless all of these are set (in `apps/web/.env.local`):

```
MUNE_E2E_USER_EMAIL=...        # a SYNTHETIC Clerk test user, never a real account
MUNE_E2E_USER_PASSWORD=...     # that user's Clerk password
MUNE_E2E_PASSPHRASE=...        # that user's vault passphrase (data must decrypt)
```

Plus a Clerk **development** instance (`CLERK_SECRET_KEY=sk_test...`) — Clerk
testing tokens are rejected by production instances. The test user must have
completed onboarding and have a vault, or the unlock step fails with a clear
message. If these are missing, `pnpm e2e:private` reports the skip reason.

## Privacy of artifacts (hard rule)

Trace / screenshot / video on failure capture the rendered DOM, which on
`/journal` and `/reflect` is **decrypted content**. This is only acceptable
because the private sweep runs against a **synthetic** account. Never point
`MUNE_E2E_*` at a real user. In CI, gate private-route artifact upload — do not
ship `/journal` traces to a shared report.

## Knobs and gotchas

- **Tap-target threshold.** Defaults to 40px — Mune's documented brand-button
  minimum (the `.btn` utility and the Button atom). Set
  `MUNE_E2E_MIN_TAP_TARGET=44` for the stricter Apple HIG / WCAG 2.1 AAA target.
  The check is scoped to `button`, `[role=button]`, `.btn`, and nav links on
  mobile viewports only (WCAG exempts inline prose links).
- **Third-party rule (protected).** The check is an allowlist: first-party +
  `*.clerk.*` + `*.supabase.co` + Clerk Turnstile. Anything else fails — so a
  newly-added analytics/tracking script on a protected route fails the day it
  lands, by design.
- **Dev vs prod.** The sweep runs against `next dev`. Next injects a dev-tools
  overlay (excluded from the tap-target check) and dev can emit occasional
  transient console/network noise. For the cleanest CI signal, point `webServer`
  at a production build (`next build` then `next start`); `retries: 2` in CI
  absorbs residual flake.

## Re-verifying after a route or component change

The route list is filesystem-derived, so new pages are swept automatically — run
`pnpm e2e:routes` to confirm a new route landed in the right bucket. If you
rename the vault-unlock heading ("Unlock your vault."), the "Unlock" button, or
the loader, update `unlockVault` in `e2e/helpers/assertions.ts` to match.
