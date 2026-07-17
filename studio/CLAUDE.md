# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

This package is the standalone Sanity Studio (Sanity v6) of the haugendesign monorepo. The repo-root `CLAUDE.md` and the rules in `.claude/rules/` govern the content model, source copy, and publishing blockers — read those before touching schemas or entering content. This file covers only what is specific to `studio/`.

## Commands

This package uses **pnpm** (`pnpm-lock.yaml`), unlike `web/` which uses npm.

- `pnpm dev` — Studio at http://localhost:3333
- `pnpm build` / `pnpm deploy` — build / deploy the Studio to Sanity hosting
- `pnpm lint` — ESLint (`@sanity/eslint-config-studio`)
- `npx tsc --noEmit` — typecheck (there is no script for it)
- `npx sanity schema deploy` — deploy the schema to the Content Lake. **Required after any schema change**, or MCP and editor tooling won't see the new types.

pnpm 11 refuses to run build scripts until they are approved; `pnpm-workspace.yaml` carries `allowBuilds: esbuild: true` for that. The `pnpm` field in `package.json` is no longer read. There are no tests. `dist/` is build output and gitignored.

## Configuration

Project ID `73tyvgdh` and dataset `production` are hardcoded in both `sanity.config.ts` (Studio runtime) and `sanity.cli.ts` (CLI); change one, change both. The dataset is publicly readable — the web app queries it with no token. `sanity.cli.ts` also enables `autoUpdates` for the deployed Studio.

## Schema

One file per document type in `schemaTypes/`, named after the type, exporting a `defineType` result registered in `schemaTypes/index.ts`:

- `project.ts` — work card plus optional detail page. An empty `detail` body means the card links straight to the live URL and no `/work/<slug>` route exists on the site; the web app filters on `count(coalesce(detail, [])) > 0`.
- `about.ts` — singleton. `sanity.config.ts` pins it in the structure to document ID `about`; keep that ID if you touch the structure. Its `workEntry` and `educationEntry` array items carry optional `slug`, `url`, and `detail` fields: an entry with a detail body gets a `/experience/<slug>` or `/education/<slug>` page on the site (same `count(coalesce(detail, [])) > 0` filter); the rest render as plain rows.
- `otherProject.ts` — one line in the Other section, not a work card.

Field `description`s in these schemas carry editorial rules from `.claude/rules/` ("Verbatim from the project file", "Leave empty until the address is confirmed"). They are load-bearing instructions to the editor — keep them accurate when editing fields, and give new fields the same treatment.

The desk structure in `sanity.config.ts` is hand-built (`structureTool` with an explicit list); a new document type must be added there as well as in `schemaTypes/index.ts` or it won't appear in the Studio.

Content itself never lives in this repo. Copy is written in `.claude/rules/` and entered into the Studio verbatim; the `## Claim check` / `## Permission check` / `## Do not publish` sections of those files must never be entered into Sanity.

Content can also be entered from the CLI (must run inside `studio/` so `sanity.cli.ts` is found, with a logged-in `sanity` CLI): `npx sanity documents get <id>` → edit the JSON (drop `_rev`/`_createdAt`/`_updatedAt`) → `npx sanity documents create <file> --replace`. Omit `_id` on `create` to let Sanity generate one. Check for `drafts.<id>` first; replacing a published document under an open draft will confuse the Studio.

## Code style

Prettier config in `package.json`: no semicolons, single quotes, `printWidth: 100`, `bracketSpacing: false` — the opposite of `web/`'s create-next-app style. Match this package.
