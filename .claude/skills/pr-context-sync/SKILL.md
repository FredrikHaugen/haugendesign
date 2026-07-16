---
name: pr-context-sync
description: Use when wrapping up or finishing a pull request / claude branch and you want the project's Claude context to stay current with the code that landed. Scopes the PR diff against main, decides what warrants documentation, drives claude-md-improver to update CLAUDE.md, propagates the same facts into .claude/rules/*, guarantees CLAUDE.md links to any new files so future sessions can locate them, then prints a detailed change summary in chat and drafts a short proposed-changes summary onto the PR. Triggers: "sync CLAUDE.md for this PR", "update the docs before I merge", "keep CLAUDE.md up to date", "finish this branch", "does CLAUDE.md still match the code", "PR context sync".
user-invocable: true
---

# PR context sync

Keep the Claude/agent context in sync with the code a PR actually changed, so the next session can find and understand the new pieces without reading the whole diff.

**Core principle.** CLAUDE.md is a navigational index, not a changelog. Its job is to point a future session at the right file. After this skill runs, every new subsystem introduced by the PR must be **findable** from CLAUDE.md (a package row, a route line, a table entry, a Rules Index link, a Gotcha), and the detail must live in the right place (an existing `.claude/rules/*.md`, a new one, or inline).

**This skill composes `claude-md-improver`. It does not replace it.** `claude-md-improver` is the engine that audits and edits CLAUDE.md files. This skill scopes that engine to the PR's change set, feeds it the specific new artifacts, then does the four things it does not do: propagate the same facts into `.claude/rules/*`, honor generated-file conventions, guarantee the navigational links to new files, and produce the two PR outputs.

---

## Hard boundaries (never cross)

- **Write scope is this repo only.** Only ever create or edit files under `Projects/mune-code/` — its `CLAUDE.md`, `.claude/rules/*`, `.claude/skills/*`, `.claude/agents/*`, and repo `docs/`. **Never** edit the parent workspace `CLAUDE.md`, `Projects/CLAUDE.md`, or the global `~/.claude/CLAUDE.md`. Those are hand-authored. If `claude-md-improver` proposes an edit to any CLAUDE.md above the repo root, drop that proposal.
- **Propose, then apply.** Print a quality report plus exact diffs and wait for an explicit go before editing any tracked file. No silent edits to CLAUDE.md or rules.
- **Documentation only.** This skill edits docs. It does not fix code, rename symbols, or change behavior. If the PR's code contradicts a hard rule (a plaintext behavioral signal, a bypassed RLS, a persona in an AI prompt), flag it in the report and stop short of "fixing" it. Scope stays on the docs.
- **Respect generated files.** Some rule docs are generated, not hand-edited. `.claude/rules/system-prompts.md` says "re-extract rather than edit by hand" and is owned by the `prompt-sync` skill (canonical source: `packages/ai/src/config.ts`). If the PR touched prompts or `config.ts`, route that doc through `prompt-sync`, not a freehand markdown edit.

---

## Procedure

### 1. Scope the change set to the PR (not the working tree)

The unit of work is everything the branch added versus its base, not just uncommitted files.

```bash
git branch --show-current
git fetch origin main --quiet 2>/dev/null || true
git diff --stat main...HEAD          # what this PR changed
git diff --name-status main...HEAD   # adds (A) vs modifies (M) vs deletes (D)
```

If there is no `main` to diff against, fall back to `git diff --stat @{u}...HEAD` or ask for the base. If the diff is empty or documentation-only, say so and stop. Nothing to sync.

### 2. Read each new or changed artifact before documenting it

Never document from the filename. Open the file and record the fact accurately:

- **New API route** (`apps/web/app/api/**/route.ts`): streaming vs JSON, the auth gate, whether it carries user content, whether it persists anything.
- **New package** (`packages/*/`): the `name` in its `package.json` and its public exports in `src/index.ts`.
- **New migration** (`supabase/migrations/*.sql`): table name, columns, `user_id text` type, RLS policies, whether content is ciphertext-only.
- **New rule surface** (a new subsystem, convention, or gotcha in the code): what the non-obvious behavior is.
- **New docs** (`docs/**`, a new `.claude/rules/*.md`): the file's purpose in one line.

### 3. Classify each fact: where does it belong?

| The PR added / changed | Document it in | And ensure CLAUDE.md can locate it by |
|---|---|---|
| New internal package | `.claude/rules/mune-overview-revised.md` tree | a row in CLAUDE.md "Monorepo Packages" |
| New AI proxy route | `privacy.md` + `ai-layer.md` endpoint lists | a line in CLAUDE.md "AI Proxy Routes" |
| New Supabase table | `privacy.md` "Schema" block | the CLAUDE.md "Database" live-tables line + a one-paragraph description |
| New command / script | — | a row in CLAUDE.md "Commands" |
| New non-obvious gotcha | inline in CLAUDE.md "Gotchas" | (it is already there) |
| New rule file `.claude/rules/<x>.md` | the file itself | a row in CLAUDE.md "Rules Index" (this is the link that makes it findable) |
| New `docs/architecture/*.md` | the file itself | a pointer from the relevant CLAUDE.md section or rule file |
| New skill / agent | its own SKILL.md / agent md | the CLAUDE.md "Claude Code Tooling" table if that table enumerates them |
| Prompt / model config change | `packages/ai/src/config.ts` (canonical) then `system-prompts.md` | via the **`prompt-sync`** skill, not a manual edit |

**New-file vs inline rule of thumb.** A whole new subsystem with its own conventions earns a new `.claude/rules/<name>.md` plus a Rules Index link. A single quirk earns one line in Gotchas. Do not spawn a rule file for a one-liner, and do not bury a subsystem in a Gotcha.

### 4. Drive `claude-md-improver` for the CLAUDE.md edits

Invoke the `claude-md-improver` skill via the Skill tool. It ships in the `claude-md-management` plugin, so the invokable name is `claude-md-management:claude-md-improver`. It discovers CLAUDE.md files from the repo root, scores them, prints a quality report, and proposes targeted edits. Feed it the artifacts from step 2 as the specific facts to incorporate. Constrain it to the repo (see Hard boundaries) and discard any proposal that targets a CLAUDE.md above the repo root.

### 5. Propagate to `.claude/rules/*` and guarantee the links

`claude-md-improver` only touches CLAUDE.md files. You still owe the detail tier. For each fact, apply the matching edit from the step-3 table to the rule file. Match the shape of the surrounding block (copy a sibling entry's structure: a new table describes itself the way `user_memory_nodes` does in `privacy.md`).

Then verify the navigational invariant. Every new file the PR added under `.claude/rules/` or `docs/` must be reachable from CLAUDE.md by a link or a table row. Confirm with a grep that the new names appear where their siblings are listed:

```bash
grep -rn "user_insights\|@mune/insights\|api/insights" CLAUDE.md .claude/rules/
```

If a new concept appears in the code but in none of the docs that list its siblings, the sync is incomplete.

### 6. House style for what you write

- Sentence case for headings. No emoji. No exclamation points.
- Avoid em-dashes in new prose; use a period or a comma. Match the conventions already in the file you are editing.
- Keep additions minimal and actionable. State the non-obvious fact, not what the code already makes obvious. One line beats a paragraph.

### 7. Report, then gate

Print the combined report before touching anything:
- `claude-md-improver`'s quality report for CLAUDE.md.
- The list of `.claude/rules/*` edits with exact diffs.
- Any hard-rule concern the PR's code raised (flag only, do not fix).
- Any pre-existing drift you noticed but that this PR did not introduce (flag as an optional follow-up, do not fix without a separate go).

Wait for an explicit go. Then apply with Edit.

### 8. Produce the two outputs

- **Detailed summary in chat.** A structured, per-file account of what changed and why each edit helps a future session. This is the full picture.
- **Short summary drafted onto the PR.** A brief note listing only the files this sync proposes to touch and edit (not a full description). Draft it onto the PR body:

  ```bash
  gh pr view --json number,title -q .number   # confirm a PR exists first
  gh pr edit <number> --body "<existing body>\n\n---\n### Context sync\n<short file list>"
  ```

  If no PR exists yet, skip the draft, say so, and hand the short summary back in chat for the user to place when they open the PR. Editing the PR body is an outward action; include it in the same approval gate as the file edits.

---

## Edge cases

- **Not on a PR / claude branch.** Say so and confirm the base to diff against before proceeding. Do not assume `main...HEAD` is meaningful on `main` itself.
- **No `main` locally.** Fetch it, or fall back to the upstream tracking branch, or ask.
- **Empty or docs-only diff.** Report "nothing to sync" and stop. Do not manufacture edits.
- **PR touches prompts.** Hand the prompt/config doc to `prompt-sync`; do not hand-edit `system-prompts.md`.
- **`claude-md-improver` proposes a parent-CLAUDE.md edit.** Drop it. Repo scope only.

---

## Common mistakes

| Mistake | Fix |
|---|---|
| Reinventing the CLAUDE.md audit by hand | Compose `claude-md-improver`. That is the point of this skill. |
| Updating CLAUDE.md but not `.claude/rules/*` | Both tiers, every time. The index without the detail is a half-truth. |
| Adding a fact to a rule file with no link from CLAUDE.md | A future session cannot find it. Add the Rules Index row / table entry. |
| Diffing the working tree instead of the PR | Use `main...HEAD`. The unit is the whole branch. |
| Applying edits before showing them | Report and gate first. No silent doc edits. |
| Hand-editing `system-prompts.md` | It is generated. Route through `prompt-sync`. |
| Editing a workspace or Projects CLAUDE.md | Repo scope only. Never ascend past the repo root. |
| "Fixing" a code red line the PR introduced | Flag it in the report. This skill edits docs, not code. |

## Red flags (stop and re-read this skill)

- You are about to write a CLAUDE.md audit without invoking `claude-md-improver`.
- You edited a rule file but cannot point to where CLAUDE.md now links it.
- You are about to `Edit` a tracked doc and have not shown the diff yet.
- You are typing a path that starts above `Projects/mune-code/`.
