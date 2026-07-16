---
name: crypto-tests
description: Scaffold or run the mandatory encryption tests for @mune/crypto — the content primitives (deriveKey, generateSalt, encrypt, decrypt) and the key hierarchy (deriveKEK, generateDEK, wrapDEK/unwrapDEK, recovery key). The highest-trust tests in the codebase per CLAUDE.md.
user-invocable: true
---

`@mune/crypto` has two test layers. Do not assume "a test file exists" means the
part you care about is covered — that is the trap this skill used to fall into.

- **Key hierarchy** — `deriveKEK`, `generateDEK`, `deriveKRKFromRecoveryKey`,
  `wrapDEK`/`unwrapDEK`. Covered by `derive-kek.test.ts`, `generate-dek.test.ts`,
  `recovery-key.test.ts`, `wrap-dek.test.ts`, `signup-roundtrip.test.ts`.
- **Content primitives** — `deriveKey`, `generateSalt`, `encrypt`, `decrypt`.
  The AES-256-GCM workhorse that protects every chat message and journal entry.
  Lives in `crypto.test.ts`.

## Step 1 — detect what is actually covered

Run the coverage probe. It matches call-sites, so it does not false-positive on
the `['encrypt', 'decrypt']` key-usage arrays in the hierarchy tests:

```bash
cd packages/crypto
for fn in deriveKey generateSalt encrypt decrypt; do
  grep -rqE "\b${fn}\(" --include='*.test.ts' src/ && echo "$fn: covered" || echo "$fn: MISSING"
done
```

`--include='*.test.ts'` keeps the search to test files (so implementation files do not false-positive) and avoids a no-match error on a package with no tests yet.

If any primitive reports `MISSING`, or `src/crypto.test.ts` is absent, the content
layer is NOT covered even when other test files exist — go to Step 2. If all four
report `covered`, skip to Step 3.

## Step 2 — scaffold the missing content-primitive tests

Create `packages/crypto/src/crypto.test.ts` covering:

1. `deriveKey(password, salt)` produces an AES-GCM CryptoKey with encrypt/decrypt usages
2. `deriveKey` is stable — same password + salt decrypts the same ciphertext
3. `encrypt(plaintext, key)` → `decrypt(payload, key)` round-trips
4. A different key cannot decrypt — the GCM auth tag rejects it (throws)
5. `generateSalt()` produces 16-byte values that differ on each call
6. Empty string round-trips
7. Multibyte unicode / emoji round-trips

Rules:
- Vitest: `import { describe, it, expect } from 'vitest'`.
- No mocking. Use the real Web Crypto API. The package has no vitest config; vitest defaults to its Node environment, where `globalThis.crypto` and `CryptoKey` are present (Node ≥ 18). The existing tests rely on this — no jsdom and no extra setup.
- Co-locate at `packages/crypto/src/crypto.test.ts`.
- Import the real functions with **relative paths**, matching the package's own test convention: `deriveKey` and `generateSalt` from `./deriveKey`, `encrypt` from `./encrypt`, `decrypt` from `./decrypt`. Self-importing `@mune/crypto` from inside the package does not resolve.

These test already-shipped, working code, so they pass on the first run — there
is no red phase. The cross-key case (4) asserts a throw and also passes
immediately.

## Step 3 — run and report

```bash
pnpm --filter @mune/crypto test
```

Report:
- Pass/fail count, and any failing test names with their error messages.
- Whether the content layer is now covered (re-run the Step 1 probe).
- Coverage summary only if `@vitest/coverage-v8` is installed. It is not installed
  by default and there is no `coverage` script — note its absence rather than
  forcing a dependency install.

`packages/crypto/package.json` already has `"test": "vitest run"`. If a future
package lacks it, add `"test": "vitest run"` and confirm `vitest` is in
devDependencies.
