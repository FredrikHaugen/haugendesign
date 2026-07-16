---
name: sync-codex-context
description: Use when .claude/**, CLAUDE.md, apps/mobile/CLAUDE.md, or .mcp.json changed and the Codex mirror needs the same updates — triggers include "port to codex", "update .codex", "sync AGENTS.md", a failing `node scripts/sync-codex-context.mjs --check`, or finishing any branch that edited rules, skills, agents, hooks, or MCP config.
user-invocable: true
---

# Sync Claude context to Codex

Codex CLI runs as a second brain on this repo and reads a mirror of the Claude context. Most of the mirror is **generated** by `scripts/sync-codex-context.mjs`; a small surface is **hand-ported**. Never edit generated files directly (the next sync overwrites them), and never write to `CLAUDE.md` or `.claude/**` from this flow (the script's `assertCodexWritePath` refuses, and so should you).

## What syncs where

| Source | Target | How |
|---|---|---|
| `CLAUDE.md` | `AGENTS.md` | script |
| `apps/mobile/CLAUDE.md` | `apps/mobile/AGENTS.md` | script |
| `.claude/rules/*.md` | `.codex/rules/*.md` | script |
| `.claude/skills/**` | `.agents/skills/**` | script |
| `.claude/agents/*.md` | `.codex/agents/*.toml` | **manual** |
| `.claude/settings.json` hooks + `.claude/hooks/` | `.codex/hooks.json` + `.codex/hooks/` | **manual** |
| `.mcp.json` | `.codex/config.toml` `[mcp_servers.*]` | **manual** |
| review prompt docs | `.github/codex/prompts/*.md` | **manual** |

Deliberately not synced: `.claude/plans/`, `.claude/worktrees/`, `.claude/commands/`, `settings.local.json`.

**`.mcp.json` → `config.toml` mapping:** http server `{type:"http", url}` → `url = "..."` only; stdio server → `command = "..."` + `args = [...]`; `env: {"KEY": "${KEY}"}` → `env_vars = ["KEY"]` (names only — never copy secret values into the TOML).

## Procedure

1. `node --test scripts/sync-codex-context.test.mjs` — sanity-check the generator (writes only to a tmpdir fixture).
2. `node scripts/sync-codex-context.mjs --check` — list drift. Exit 0 means the generated surface is current; still do step 4.
3. `node scripts/sync-codex-context.mjs` — regenerate. It rewrites drifted files, updates `.codex/generated-context-manifest.json`, and **deletes stale generated files** whose `.claude` source was removed. Name any deletion to Fredrik before committing.
4. Diff the manual surface against what changed in `.claude`: if `.claude/agents/*.md` changed, hand-port the same edit into the matching `.codex/agents/*.toml` (translate Claude-specific tool names to Codex equivalents); if `.claude/settings.json` hooks changed, mirror into `.codex/hooks.json`; if `.mcp.json` changed, apply the mapping above.
5. Verify: `--check` exits 0, and `git diff --stat` touches only `AGENTS.md`, `apps/mobile/AGENTS.md`, `.codex/`, `.agents/`, `.github/codex/` — never `CLAUDE.md` or `.claude/**`.
6. Commit the mirror files together as one `chore(codex): sync context` commit.

## Common mistakes

- Hand-editing `AGENTS.md` or anything under `.codex/rules/` / `.agents/skills/` — fix the `.claude` source instead, then re-run the script.
- Assuming the script covers everything — agent TOMLs, hooks, and MCP config are manual and silently go stale.
- Copying secret values into `config.toml` — `env_vars` takes names only.
- Running the sync and skipping step 4 because `--check` passed — `--check` only sees the generated surface.
