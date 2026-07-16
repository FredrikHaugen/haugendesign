---
name: prompt-sync
description: Use when a model/temperature/token value or a system-prompt's text in .claude/rules/system-prompts.md has been edited and needs to land in the actual code, or when verifying whether that doc and the AI prompt/config source have drifted apart. Mune-specific (the @mune/ai prompts + config and the AI proxy routes).
user-invocable: true
disable-model-invocation: true
---

# Prompt sync

Keep `.claude/rules/system-prompts.md` and the AI prompt/config source in sync without silently corrupting a live prompt. Plan before editing code, every time.

The doc is the human-readable surface; the code is what runs. The doc carries the same data in several forms, so trust exactly one source per kind of change.

## What is canonical

| Doc element | Code source of truth | Sync rule |
|---|---|---|
| The `PROMPT_CONFIG` ` ```ts ` block | `packages/ai/src/config.ts` | **Config (model / temperature / maxTokens): doc→code.** Structured and unambiguous. Propose the edit directly. |
| The 5 static prompt ` ```text ` blocks: reflect, journal-assist question, journal-assist finalize, journal-summary, session-summary | `packages/ai/src/prompts/{reflect,journal-assist,journal-summary,session-summary}.ts` | **Prompt text: diff + confirm direction.** Code is byte-exact; the doc may be a lossy snapshot. Never blind-overwrite either way. |
| Daily-prompt ` ```text ` block | `apps/web/app/api/daily-prompt/build-prompt.ts` | Static base text only. The `<MEMORY CONTEXT>` marker is `${memoryContext}` code — never sync it as a string. |
| Reflect "Dynamic context appended at request time" section | `apps/web/app/api/reflect/build-system-prompt.ts` | **Documentation only.** Code logic (loops, sanitization), not a literal string. Never sync. |
| Per-endpoint settings table + the per-prompt "Setting" tables | (none — derived) | **Regenerated from `PROMPT_CONFIG`.** Never read as a source; rewrite them to match the canonical block. |

When byte-comparing a prompt, strip the TS template-literal wrapper (`export const NAME = \`` at the start, `` `; `` at the end) — that's syntax, not prompt content.

## Procedure

1. Read `.claude/rules/system-prompts.md` and every source file in the table.
2. Compute drift per row:
   - **Config:** compare the doc's `PROMPT_CONFIG` block to `config.ts`. Any difference is a doc→code edit.
   - **Prompt text:** byte-compare each ` ```text ` block to its source string. List every difference (whitespace and punctuation included).
   - Skip the derived tables here.
3. For prompt-text drift, **do not guess direction.** The doc may be a stale snapshot OR an intentional edit. Surface both versions. Default to code-is-canonical unless the human confirms they edited the doc on purpose; then it becomes doc→code.
4. **Write a plan first. REQUIRED: use superpowers:writing-plans.** The plan lists every proposed edit as `file:line` with before → after, grouped into config vs prompt-text, and flags every direction decision from step 3. Do not edit code before the plan is approved.
5. On approval, apply the edits.
6. Reconcile the doc: regenerate the per-endpoint table and the per-prompt "Setting" tables from the now-current `PROMPT_CONFIG` block so all three config views agree. Update the doc's "the code pins `claude-sonnet-4-6`…" note if a model changed.
7. Verify: `cd packages/ai && npx tsc --noEmit` and `cd apps/web && npx tsc --noEmit`. If a prompt's JSON-shape line changed, confirm the consuming route still parses it.

## Common mistakes

- **Blindly making code "match the doc" for prompt text.** The doc once showed `<p>...</p>` while source had `<p>...</p><p>...</p>` — obeying the doc literally would regress two live prompts. Confirm direction first (step 3).
- **Editing config in one doc table but not the others.** Only the `PROMPT_CONFIG` block is canonical; the two table styles are regenerated, never hand-edited as a source.
- **Syncing a dynamic builder as a string.** `daily-prompt`'s `${memoryContext}` and reflect's dynamic-context block are code. Editing them from the doc's placeholder text corrupts the interpolation.
- **Editing code without a plan.** This skill changes live AI behavior. Always route through writing-plans.
- **Wrong doc path.** It lives at `.claude/rules/system-prompts.md`, not the `.claude` root.
