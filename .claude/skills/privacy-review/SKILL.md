---
name: privacy-review
description: Run a comprehensive, severity-graded security and privacy review of the Mune repo — covers crypto correctness, key handling, RLS, API routes, client boundaries, logging, third-party scripts, auth, dependencies, metadata hygiene, headers/CSP, and migration hygiene. Produces an actionable report with every finding graded Critical / High / Medium / Low / Informational. Use this skill whenever the user asks for a security audit, security review, privacy audit, privacy review, "is this secure", "check for vulnerabilities", "find security issues", "ironclad the app", wants to verify the E2E encryption contract holds end-to-end, or wants a pre-alpha / pre-release deep inspection. Broader and deeper than `privacy-audit` — that one is a quick binary red-line check before merge; this one is the full sweep.
user-invocable: true
---

# Privacy Review

Comprehensive security + privacy audit of the Mune codebase. Where `privacy-audit` returns pass/fail on six architectural red lines, this skill runs twelve passes, grades every finding by severity, and produces an actionable report.

Mune's trust contract is non-negotiable: chat messages and journal entries must be readable only by their author. The encryption architecture (see `docs/architecture/passphrase-and-recovery.md`) must hold even under server compromise, Clerk compromise, Supabase breach, or client-side XSS. This review looks for anything that weakens that contract, not just the things that outright break it.

## Scope

Confirm with the user before starting whether the scope is:
- **Full repo at HEAD** (default) — run against `main` or the currently-checked-out branch
- **Staged changes / a PR** — limit to files changed in the diff

Use `git diff --name-only main..HEAD` (or `git diff --staged --name-only`) to narrow the grep scopes when doing a PR-level review. Otherwise run across the full directories listed in each pass.

## Severity rubric

Grade every finding against the threat model, not the vibe. Severity answers: *"what does an attacker gain from this exact line if they have the listed access?"*

| Severity | Threshold | Example |
|---|---|---|
| **Critical** | Data can be decrypted or exfiltrated today by an attacker who gains access to a plausible surface (server, Clerk, Supabase, user's tab via XSS) | Plaintext content column on a user-scoped table; service role key bundled to the client; passphrase/recovery key written to any persistent storage; direct Anthropic SDK call from a client component |
| **High** | Architectural invariant broken; not immediately exploitable but one more bug chains into compromise | Key material in `sessionStorage` / `localStorage` / cookie; RLS disabled on a user-scoped table; third-party `<Script>` on `(protected)/` or `onboarding/`; plaintext user content in any log; RLS policy that omits `requesting_user_id()` |
| **Medium** | Defense-in-depth weakened | `console.log` of identifiers (user_id + session_id together) in production client code; generic `Error` thrown instead of typed error classes; missing rate-limit on auth-adjacent endpoints; overly permissive CORS; missing CSP header on sensitive pages |
| **Low** | Best-practice deviation with low exploit value | Missing `autocomplete="off"` on a sensitive input; non-canonical HSTS; missing SRI on a CDN asset |
| **Informational** | Documentation drift or future-risk observation | `privacy.md` claim that no longer matches the code; metadata-policy drift; a doc claiming per-request ZDR headers exist (they don't — org-level configuration only) |

**Don't re-flag known tradeoffs.** Before scoring a finding, check whether it's documented in `docs/architecture/passphrase-and-recovery.md`, `.claude/rules/privacy.md`, or `CLAUDE.md` Gotchas. Known-and-accepted patterns (e.g. tolerated Next.js `ts(71007)` function-prop warnings) are either Informational or omitted entirely.

## How to run

Do the twelve passes in order. Collect findings into the Output template. Each pass has concrete grep/inspection recipes — adapt when the user's repo structure differs.

### Pass 1 — Key management

Focus: passphrase, recovery key, DEK, KEK, KRK never persist.

```bash
# Key material in browser storage
grep -rn "sessionStorage\|localStorage\|document\.cookie\|IndexedDB\|openDatabase" \
  apps/web/hooks/ apps/web/contexts/ apps/web/components/ \
  --include="*.ts" --include="*.tsx" \
  | grep -iE "passphrase|recoveryKey|mnemonic|dek|kek|krk|cryptoKey|wrapping|encryptionSalt|verifyBlob"

# Clerk metadata leakage
grep -rn "unsafeMetadata\|publicMetadata\|privateMetadata" apps/web/ --include="*.ts" --include="*.tsx" \
  | grep -iE "passphrase|encryptionSalt|verifyBlob|verifyIv|encryptionKey|encryptionPassphrase|mnemonic|dek|kek|krk"

# Stale useCryptoKey references (retired in Phase 4 — PR #52)
grep -rn "useCryptoKey\|use-crypto-key" apps/web/ --include="*.ts" --include="*.tsx" \
  | grep -vE "backwards-compat|Mirrors .useCryptoKey"
```

Expected: zero matches. Any hit is **High** minimum; direct key material in storage is **Critical**.

### Pass 2 — Content encryption

Focus: every write of user content goes through `encrypt()` first.

```bash
# Schema shape — inserts only accept ciphertext + iv
grep -B2 -A10 '\.from("journal_entries")\|\.from("chat_messages")' packages/db/src/queries/ \
  | grep -iE "insert|upsert|update"

# Verify call sites encrypt first
grep -rn "createEntry\|createMessage" apps/web/ --include="*.ts" --include="*.tsx" | grep -v "\.test\."
# For each hit, read ~15 lines above the call — confirm encrypt() on plaintext → {ciphertext, iv} → insert.
```

A plaintext content column anywhere on a user-scoped table is **Critical**. A call site that passes unencrypted content is **Critical**. An IV that isn't random per call is **High**.

### Pass 3 — RLS + database

```bash
# Every migration creating a user-scoped table must enable RLS
for f in supabase/migrations/*.sql; do
  created=$(grep -ciE "create table.*(user|chat|journal|memory|entries|keys)" "$f")
  rls=$(grep -cE "ENABLE ROW LEVEL SECURITY|enable row level security" "$f")
  [ "$created" -gt 0 ] && [ "$rls" -eq 0 ] && echo "NO RLS: $f ($created user-scoped tables)"
done

# Every RLS policy on a user-scoped table uses requesting_user_id()
grep -rn "CREATE POLICY\|create policy" supabase/migrations/ \
  | grep -vE "requesting_user_id|published = true"

# Service-role usage — check against the allowlist
grep -rn "SUPABASE_SERVICE_ROLE_KEY\|createAdminClient" apps/web/ --include="*.ts" --include="*.tsx"
```

Allowed service-role call sites: `/admin/*`, `lib/cms/*` (admin content writes), `app/actions/waitlist.ts` (site-wide table), `app/api/*/route.ts` where it's used for an **ownership check** with explicit `.eq("user_id", userId)` (no content fetch).

Missing RLS on user-scoped table: **High**. Policy that omits `requesting_user_id()` on a user-scoped table: **Critical** (deny-all or permit-all depending on framing). Service role in a file not on the allowlist: **Critical** if in a client boundary, **High** in a route handler without explicit ownership filter.

### Pass 4 — API routes

For every file under `apps/web/app/api/**/route.ts`:

```bash
# Clerk auth verification
for f in apps/web/app/api/*/route.ts apps/web/app/api/**/route.ts; do
  [ -f "$f" ] && grep -qE "auth\(\)|currentUser\(\)|getAuth\(" "$f" || echo "NO AUTH: $f"
done

# Anthropic client centralization — every route must use getAnthropicClient()
# from @mune/ai; a direct `new Anthropic()` in a route handler bypasses the
# single source of truth. NOTE (corrected 2026-07-12): Anthropic zero data
# retention is an ORGANIZATION-LEVEL retention configuration on the Anthropic
# account, not a per-request header. The `anthropic-no-log: 1` header claimed
# by earlier versions of this skill never existed, and neither did
# `zero-retention` / `strict_retention`. There is no ZDR header to grep for.
grep -rn "new Anthropic" apps/web/ packages/ --include="*.ts" | grep -v node_modules | grep -v "packages/ai/src/client.ts"

# Request body logging (never)
grep -rn "console\." apps/web/app/api/ --include="*.ts"
```

Missing auth on a route that touches user data: **Critical**. A route instantiating `new Anthropic()` directly instead of using the central `getAnthropicClient()`: **Medium** (centralization break, not a retention break). Console log in a route handler: **High** if it references user content or auth tokens; **Medium** otherwise.

Do **not** file a finding for "missing zero-retention headers" — verify instead that no doc or copy claims per-request ZDR headers exist (that claim is trust-contract drift: **Informational**, or **High** if it appears in user-facing copy). The actual ZDR guarantee lives in the org's retention configuration with Anthropic and cannot be verified from the repo; note it as an out-of-band check for the operator.

### Pass 5 — Client boundaries

```bash
# Anthropic SDK in client components or non-proxy routes
grep -rn "anthropic\.messages\|getAnthropicClient\|new Anthropic\|@anthropic-ai/sdk" \
  apps/web/ --include="*.ts" --include="*.tsx" \
  | grep -v "apps/web/app/api/"

# Server-only env vars leaked to client
grep -rn "process\.env\.ANTHROPIC\|process\.env\.SUPABASE_SERVICE_ROLE\|process\.env\.CLERK_SECRET\|process\.env\.ADMIN_SECRET" \
  apps/web/ --include="*.ts" --include="*.tsx" \
  | grep -vE "apps/web/app/api/|server\.ts|actions/|middleware|scripts/seed"

# NEXT_PUBLIC_ allowlist sanity check
grep -rn "NEXT_PUBLIC_" apps/web/ --include="*.ts" --include="*.tsx" | grep -v node_modules | head -20
# Every NEXT_PUBLIC_ var ships to the browser — confirm none of them is a secret.
```

Any hit on Anthropic SDK outside `app/api/`: **Critical**. Server-only env var in a client component: **Critical**. A `NEXT_PUBLIC_SECRET*` or similar: **Critical**.

### Pass 6 — Logging + error surfaces

```bash
# Plaintext content in client logs
grep -rn "console\." apps/web/hooks/ apps/web/contexts/ apps/web/components/ apps/web/app/ \
  --include="*.ts" --include="*.tsx" \
  | grep -iE "plaintext|\.content|message\.content|entry\.content|entry\.body|passphrase|recoveryKey|mnemonic|dek|kek|krk"

# Identifier-only logs (lower severity but production noise)
grep -rn "console\." apps/web/hooks/ apps/web/contexts/ --include="*.ts" --include="*.tsx" \
  | grep -iE "user\.id|session\.id|userId|sessionId"

# Typed errors around crypto operations
grep -rn "catch\s*(" apps/web/contexts/vault-context.tsx apps/web/components/organisms/vault-unlock.tsx \
  | grep -v "IncorrectWrappingKeyError\|InvalidRecoveryKeyError\|DOMException"
```

Plaintext user content in any log: **High** (zero-knowledge violation). Identifier-only logs in production client code: **Medium**. A generic `catch {}` around `unwrapDEK` that swallows everything: **Medium** (obscures programming bugs + degrades debuggability).

### Pass 7 — Third-party scripts and inline HTML

```bash
grep -rn "<Script\|from [\"']next/script[\"']\|dangerouslySetInnerHTML\|<iframe\|<embed" \
  apps/web/app/\(protected\)/ apps/web/app/onboarding/ \
  --include="*.ts" --include="*.tsx"

# External asset loads on sensitive routes
grep -rn "https://\|http://" apps/web/app/\(protected\)/ apps/web/app/onboarding/ \
  --include="*.ts" --include="*.tsx" \
  | grep -vE "ClaudeBot|anthropic-ai|//localhost|//example\.com|crisis-|//mune\.|/reflect|/journal"
```

`<Script>` tag on `(protected)/` or `onboarding/`: **High**. `dangerouslySetInnerHTML` on a page that renders user content: **Critical**. External URL fetched at runtime on a sensitive route: **High** (data-exfiltration channel).

### Pass 8 — Auth

```bash
# Auth tokens or credentials in logs
grep -rn "console\." apps/web/ --include="*.ts" --include="*.tsx" \
  | grep -iE "token|jwt|session.*cookie|authorization|getToken\("
# Lines that log the *value* of a token — Critical. Lines that mention "token" in a message string but don't interpolate it — OK.

# Middleware covers protected routes (Next.js 16: renamed to proxy.ts)
cat apps/web/proxy.ts 2>/dev/null

# Clerk template used correctly
grep -rn "getToken\s*(\s*{\s*template" apps/web/ --include="*.ts" --include="*.tsx"
# Should be template: "supabase" for Supabase reads.
```

Logging a token value: **Critical**. Missing middleware on `(protected)/`: **Critical**. Wrong JWT template (sends a non-Supabase token to Supabase): **High**.

### Pass 9 — Dependencies

```bash
# Crypto-adjacent deps — any non-standard package doing crypto?
grep -E "\"crypto|\"encrypt|\"decrypt|\"jwt|\"jose|\"jwk|\"argon|\"bcrypt|\"scrypt|\"nacl" \
  apps/web/package.json packages/*/package.json 2>/dev/null

# Known-good allowlist for this repo: @scure/bip39, @clerk/*, @supabase/*,
# @anthropic-ai/sdk, @mune/crypto (internal). Anything else — flag.

# Outdated critical deps
(cd apps/web && pnpm outdated 2>&1) | grep -iE "critical|security|high" | head -10
```

A new crypto dep not on the allowlist: **High** (audit required). A known-vulnerable version of a crypto-adjacent dep: **Critical** if exploitable, **High** otherwise.

### Pass 10 — Metadata hygiene

```bash
# journal_entries.metadata writes must be {}
grep -rn "createEntry\|updateEntry" apps/web/ --include="*.ts" --include="*.tsx" | head -30
# For each caller, confirm metadata: {} is passed — NOT populated with mood, tags, sentiment, word count, time-of-day, etc.

# Plaintext behavioral-signal columns in any migration
grep -rn "mood\|sentiment\|emotion\|topic\|intensity\|valence" supabase/migrations/ --include="*.sql"
# (signalType on user_memory_nodes is bounded to enum values — OK. Columns holding free-text signals — Critical.)
```

A new plaintext behavioral-signal column: **Critical** (privacy-contract red line). A metadata write that populates the jsonb without a documented decision: **High**.

### Pass 11 — Headers + CSP

```bash
# CSP policy
grep -rn "Content-Security-Policy" apps/web/next.config.* apps/web/proxy.ts 2>&1

# HSTS
grep -rn "Strict-Transport-Security" apps/web/next.config.* 2>&1

# Frame-ancestors / clickjacking
grep -rn "X-Frame-Options\|frame-ancestors" apps/web/next.config.* apps/web/proxy.ts 2>&1
```

Missing CSP on `(protected)/` routes: **Medium**. CSP with `unsafe-inline` or `unsafe-eval`: **High** (XSS defense weakened). No `frame-ancestors` / `X-Frame-Options`: **Low**.

### Pass 12 — Migration hygiene

```bash
# requesting_user_id() must be available in fresh envs
grep -l "requesting_user_id()" supabase/migrations/*.sql
# For any migration that references it, confirm either (a) the function is defined earlier in the same migration,
# (b) an earlier-timestamped migration defines it, or (c) the migration prepends a CREATE OR REPLACE FUNCTION.

# Plaintext key columns in any migration
grep -iE "passphrase|recovery[^_]|hint|mnemonic" supabase/migrations/*.sql \
  | grep -vE "passphrase_salt|recovery_salt|wrapped_dek|--"

# Destructive migrations that could drop user_memory_nodes accidentally
grep -rn "DROP TABLE\|drop table" supabase/migrations/ --include="*.sql"
```

Migration referencing `requesting_user_id()` without ensuring it exists in fresh envs: **High** (migration fails in a fresh deploy). Plaintext `passphrase` / `recovery` / `hint` column: **Critical**. Unconditional `DROP TABLE` that hits a live user-scoped table: **Critical**.

## Output

Produce a markdown report in this exact structure. Write it directly to the conversation; do not create a file unless the user asks.

```markdown
# Privacy Review — YYYY-MM-DD

**Scope:** <e.g., "full repo at HEAD of main" or "staged changes on branch claude/...">

## Summary

| Severity | Count |
|---|---|
| Critical | N |
| High | N |
| Medium | N |
| Low | N |
| Informational | N |

**Net assessment:** <one sentence, e.g., "Encryption contract holds. Two Medium findings around production log noise are worth addressing before alpha.">

## Findings

### Critical — <short finding title>

- **Where:** `path/to/file.ts:123-130`
- **What:** <one sentence>
- **Why it matters:** <which adversary benefits from this, with what access>
- **Fix:** <one-line actionable change or pointer to a design-doc section>

### High — <short finding title>
- **Where:** ...
- **What:** ...
- **Why it matters:** ...
- **Fix:** ...

### Medium — ...
### Low — ...
### Informational — ...

## Passes with zero findings

- Pass 1 — Key management — ✓ clean
- Pass 3 — RLS + database — ✓ clean
- ...
```

If a severity bucket has zero findings, omit the heading. List every pass that returned clean under "Passes with zero findings" so the reader knows it was actually checked, not skipped.

## Tips

- **Be specific with citations.** Every finding must cite exact `file:line`. "The app logs user content" is unactionable; "`apps/web/hooks/use-reflect-session.ts:160` logs `session.id` alongside `user.id` via `console.debug`" is actionable.
- **Grade against the threat model, not the vibe.** A console.log of a random string is Low. A console.log of the derived key is Critical. Ask: *what does an attacker gain from this exact line if they have the listed access?*
- **Don't rediscover known tradeoffs.** Cross-reference `docs/architecture/passphrase-and-recovery.md`, `.claude/rules/privacy.md`, and `CLAUDE.md` Gotchas before scoring. A known-and-accepted pattern (e.g. Next.js `ts(71007)` function-prop warnings) is Informational at most.
- **Prefer fix-at-root over fix-at-symptom.** If 10 call sites log content and one shared helper could suppress it, note that the right fix is the helper — not 10 edits.
- **Documentation drift is real harm.** If `privacy.md` describes behavior that the code no longer does, that's Informational; if it describes a *stronger* guarantee than the code actually provides, bump to High (trust contract drift).
- **Compare against the last review.** If the user has a prior privacy-review report, diff against it — net-new findings since last pass are the most important signal.

## Non-goals

- **Not a pentester.** This skill does static analysis against known-architecture red lines. For active exploitation probes, use `shannon`.
- **Not a TOV / brand / tone review.** For copy concerns use `brand-voice` or `copy-reviewer`.
- **Not a replacement for `privacy-audit`.** `privacy-audit` is the fast binary go/no-go gate intended to run before merge of a focused change. `privacy-review` is the depth audit intended to run pre-alpha, post-major-feature, or quarterly — it's slower and more thorough, and produces a report to act on over time, not a single yes/no.
