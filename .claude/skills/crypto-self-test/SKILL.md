---
name: crypto-self-test
description: Use when a tester reports the login spinner never resolves, vault unlock hangs, or encryption misbehaves on a specific device or browser (notably Samsung Internet / low-end Android), or when verifying the real @mune/crypto stack works on a given device. Covers the unauthenticated /diagnostics route and how to open it on a phone over HTTPS.
---

# Crypto self-test (`/diagnostics`)

## What this is

An unauthenticated, dev-only page at `/diagnostics` that runs Mune's **real**
`@mune/crypto` exports in the browser, exactly as production does (Web Crypto
API). It persists nothing and makes no network calls. Every check resolves to
`pass` / `fail` / `warn` / `timeout` / `error` inside a hard per-step timeout, so
nothing can hang — a check that would hang reports "timed out on this device"
instead. That mirrors, and helps locate, the spinner that never resolves.

The page is now an interactive control panel. Beyond the auto-run checks it
offers live tools (run encryption yourself), expandable raw artifacts per check
(salt / IV / ciphertext / wrapped-DEK bytes, params, per-step logs), a "how Mune
encrypts" architecture explainer, and JSON copy + download. The trust invariant
is unchanged: zero network calls, nothing persisted, all bytes test-generated.

Files:
- `apps/web/app/diagnostics/page.tsx` — server gate (404 only when `VERCEL_ENV === 'production'`).
- `apps/web/app/diagnostics/checks.ts` — the auto-run suite. Real `@mune/crypto` exports. Now also exports `CHECKS`, `runOne`, `summarize`, and emits `artifacts` + `log` per check.
- `apps/web/app/diagnostics/tools.ts` — pure functions behind the live tools (`encryptDemo`, `deriveKekDemo`, `recoveryDemo`). Real exports only; tested in `tools.test.ts` (+ `checks.test.ts`).
- `apps/web/app/diagnostics/crypto-self-test.tsx` — the control-panel shell.
- `apps/web/app/diagnostics/*-tool.tsx`, `live-tools.tsx`, `check-row.tsx`, `capabilities-section.tsx`, `status-chip.tsx`, `byte-field.tsx`, `disclosure.tsx`, `architecture-section.tsx`, `json-report.tsx` — the page-local UI pieces.
- `/diagnostics(.*)` is listed in `isPublicRoute` in `apps/web/proxy.ts` so Clerk never redirects a cold tester.

## When to use

- A tester says login spins forever, the vault won't unlock, or "it just loads" on a specific phone.
- You suspect a device-specific Web Crypto problem (Samsung Internet, old Android WebView, locked-down browser).
- You want to confirm the encryption stack works on a device before trusting it.

## The two live suspects this tool exists to catch

The production bug is on real HTTPS, so a missing secure context is a tool-access
issue, **not** the bug. The two real hypotheses:

1. **Slow key derivation** — PBKDF2 at 310,000 iterations on weak hardware. The
   `kek-timing` check flags anything over a 3000 ms perceived-hang budget. A
   `warn` or `timeout` here is the most likely spinner cause.
2. **AES-KW failing in that browser's Web Crypto** — the `key-hierarchy` and
   `recovery` checks both wrap/unwrap a DEK with AES-KW. A `fail` or `error`
   there means unlock would break on that device.

A screenshot of the report shows which one fired at a glance: red chips on those
rows, with an interpretive note under each.

## What it checks

1. **Capabilities** — secure context, `crypto.subtle`, `getRandomValues`, `TextEncoder`/`TextDecoder`, WebAssembly (informational only), plus engine / browser / full user-agent / cores / memory.
2. **Key hierarchy round-trip** — passphrase → KEK (PBKDF2) → `wrapDEK` → `unwrapDEK` → assert byte-equal via `exportKey('raw')`.
3. **Recovery round-trip** — `generateRecoveryKey` (24-word BIP39) → KRK → wrap/unwrap → assert byte-equal. Confirms the wordlist loaded.
4. **AES-256-GCM** — encrypt/decrypt round-trip on ascii, multibyte unicode, empty string, and a 256 KB blob.
5. **Tamper rejection** — flip one ciphertext byte; decryption must be rejected by the GCM auth tag.
6. **Determinism** — same passphrase + salt derives the same KEK twice (compared via identical AES-KW wrap output, since the KEK is non-extractable).
7. **Timing** — measures KEK derivation, flags over the 3000 ms budget.

> The stack is PBKDF2 + AES-256-GCM + AES-KW via Web Crypto, with a 24-word BIP39
> recovery key (`@scure/bip39`). There is **no Argon2id and no WebAssembly** in
> this path. The WebAssembly capability probe is feature-detect-only (it never
> instantiates a module, which the production CSP would block).

## How to run it on a phone

`crypto.subtle` requires a **secure context** (HTTPS, or `localhost`). Over plain
`http://<LAN-ip>:3000` a phone is neither, so Web Crypto is missing and every
crypto check fails with "Web Crypto is not available." Pick one of:

**A. Vercel preview (best, and required for a Samsung not on your LAN).** Push
the branch, open the preview deployment's HTTPS URL on the device, go to
`/diagnostics`. The route is enabled on preview deploys and only 404s on the
production domain. The tester taps the JSON box, selects all, copies, and sends
it back (the Copy button needs a secure context, so the selectable box is the
reliable path).

**B. Tunnel (reliable same-machine HTTPS).** With `pnpm dev` already running,
expose it over public HTTPS:

```bash
cloudflared tunnel --url http://localhost:3000   # or: ngrok http 3000
```

Open the printed HTTPS URL + `/diagnostics` on any device, anywhere.

On the dev machine itself, `http://localhost:3000/diagnostics` works as-is
(localhost is a secure context).

**C. Local HTTPS over the LAN (fiddly, last resort).**

```bash
pnpm --filter @mune/web exec next dev --experimental-https -H 0.0.0.0
```

Open `https://<your-mac-LAN-ip>:3000/diagnostics` and accept the cert warning.
Caveat: the generated cert is for `localhost` and may not cover the LAN IP, so a
phone can reject it even after the warning. Prefer A or B.

## Collecting results

The page shows a pass/fail report (dark mode, brand tokens, screenshot-friendly)
and a copyable JSON blob with every result plus device / engine / user-agent /
timestamp. Have the tester screenshot the report and paste the JSON.

## Re-verifying after a crypto change

The suite imports the real exports, so it must stay in sync with the package.
Before trusting a run:

1. Read `packages/crypto/src/index.ts` and confirm the exports `checks.ts`
   imports still exist with the same signatures. Current exports it uses:
   `encrypt`, `decrypt`, `generateDEK`, `deriveKEK`, `generateRecoveryKey`,
   `deriveKRKFromRecoveryKey`, `wrapDEK`, `unwrapDEK`, `generateSalt`,
   `uint8ArrayToBase64`, `base64ToUint8Array`.
2. If the key hierarchy changed (e.g. Argon2id is introduced, or KEK iterations
   move), update `checks.ts` and the `CRYPTO_STACK` constant, and adjust the
   3000 ms timing budget if iteration count changed.
3. Verify with a real browser run, not just `tsc`: `pnpm dev`, open
   `http://localhost:3000/diagnostics`, confirm every check resolves and the
   console is clean. A green typecheck does not prove the harness runs.

## Gotchas

- **Gate is a runtime check, not a build exclusion.** The route file ships in the
  bundle; `page.tsx` calls `notFound()` when `VERCEL_ENV === 'production'`. It is
  reachable on local dev and preview, 404 on the production domain. The page uses
  only synthetic test data and touches no auth, DB, or user content.
- **Tamper test catches a raw `DOMException` (`OperationError`)**, not
  `IncorrectWrappingKeyError`. `decrypt()` lets the DOMException propagate; only
  `unwrapDEK` maps to the typed error. The check catches broadly: any throw is
  the correct outcome.
- **Hard timeouts protect against async hangs** (the realistic Web Crypto failure
  mode). A pathological *synchronous* block can't be interrupted in single-threaded
  JS — but Mune's KDF and AES paths are all async.
