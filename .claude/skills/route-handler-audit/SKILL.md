---
name: route-handler-audit
description: Use when adding or modifying a Next.js Route Handler under apps/web/app/api/**/route.ts, especially any proxy to the Claude API. Checks Clerk auth verification, Anthropic client centralization, streaming vs JSON correctness, markdown-fence stripping, request-body log hygiene, and absence of plaintext persistence.
user-invocable: true
---

Audit the recently changed route handler(s) under `apps/web/app/api/**/route.ts` against Mune's AI-proxy contract. For each item, either report the violation with file:line and a one-line fix, or print "✓ clean".

1. **Clerk auth gate.** Every route must call `auth()` (or `currentUser()`) from `@clerk/nextjs/server` before any Claude call or Supabase write. Unauthenticated requests must return 401 before the provider call.

2. **Anthropic client centralization.** Any call carrying user content to Anthropic must go through the shared `getAnthropicClient()` helper in `@mune/ai`. Flag any direct `new Anthropic(...)` in a route handler that bypasses the helper. Do not check for retention headers — Anthropic zero data retention is an org-level account configuration, not a per-request header; no such header exists in the API.

3. **No request-body logging.** Search for `console.log`, `console.error`, `console.warn`, Sentry captures, or any logger call that includes the request body, decrypted session content, prompt strings, or message arrays. Timestamps + route + user id (non-PII identifier) are fine; payloads are not.

4. **No plaintext persistence server-side.** The route may receive decrypted content in-flight (e.g. `/api/journal-summary`) but must never write it to Supabase, Redis, a file, or any other store. Ciphertext is the only acceptable persisted form — and persistence should happen client-side, not in the route.

5. **Streaming vs JSON contract.**
   - `/api/reflect` must stream (SSE or `ReadableStream`). Non-streaming responses in Reflect are a bug.
   - `/api/journal-assist`, `/api/journal-summary`, `/api/session-summary`, `/api/daily-prompt` return JSON. These must parse Claude's response defensively — if the prompt asks for JSON, the route MUST strip markdown fences before `JSON.parse`:
     ```ts
     const jsonText = raw.startsWith('```')
       ? (raw.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1]?.trim() ?? raw)
       : raw
     ```
     Flag any `JSON.parse(raw)` without this guard.

6. **PII stripping in prompts.** Names, emails, and identifiers must be stripped from prompts before they reach Claude. Flag prompt construction that embeds `user.emailAddresses[0]`, full name, or any Clerk identifier without being anonymized or excluded.

7. **System prompt source.** System prompts for Reflect must come from `packages/ai/src/prompts/reflect.ts` (version-controlled). Flag inline system prompts in route files that shadow or replace the shared prompt.

8. **Model, temperature, max tokens.** Per `.claude/rules/ai-layer.md`: latest Claude model, temperature 0.5, 512 max tokens for chat, 800 for journal summaries. Flag deviations.

9. **Error-path log hygiene.** `try/catch` blocks must not log the caught error's request context or message payload. `console.error(err)` is fine; `console.error({ body, err })` is not.

10. **No third-party fetches beyond Anthropic and Supabase.** Route handlers touching user content must not call out to analytics, telemetry, or any other third party. Flag any `fetch('https://...')` to a non-Anthropic, non-Supabase host.

## Output

Lead with a one-line summary: `N critical / M warnings / K clean checks`. Then for each check, either the violation block or `✓ clean`. End with the affected route files and whether the privacy-audit skill should also be run.
