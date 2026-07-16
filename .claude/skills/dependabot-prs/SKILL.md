---
name: dependabot-prs
description: Triage and merge all open Dependabot pull requests in this repo, oldest to newest, one at a time, with a full verification pass between every merge. Use this skill whenever the user asks to handle, clear, process, review, triage, or merge Dependabot PRs, dependency-update PRs, or "the bot PRs" — even if they don't name Dependabot explicitly (e.g. "deal with the dependency bumps", "clean up the open update PRs", "merge the security updates"). Writes a plan first, dispatches a subagent to prepare each PR, and stops for your confirmation before every merge into main.
user-invocable: true
---

# Handle Dependabot PRs

Goal: get every open Dependabot PR merged into `main` safely, one at a time, oldest first, without ever leaving `main` more broken than you found it. The risk in dependency bumps is rarely one PR — it's the interaction between several, and a single bump that quietly breaks the build three merges later. So the loop is deliberate: verify, confirm, merge, re-verify, repeat.

Two hard rules that shape everything below:

- **Merging into `main` is a confirmation gate** (see the project CLAUDE.md). You never merge without showing the diff + check results and waiting for an explicit go. Same for closing a PR.
- **"No new errors" means "no worse than baseline,"** not "zero errors." This repo has known baseline noise (`pnpm typecheck` fails on `@mune/db`; `pnpm lint` carries one deferred warning). Capture the baseline in Step 0 and compare against it, never against an imagined clean slate.

A subagent does the heavy lifting per PR (checkout, install, run checks, attempt fixes). The main thread owns the plan, the confirmation gates, and the merges. Keep it that way — the confirmation gate lives where the human is.

---

## Step 0 — Establish the baseline (do this before anything else)

Make sure you're on `main` and clean, then capture what "green" means right now:

```bash
git checkout main && git pull
git status --short          # must be clean before you start
```

Run the four verification checks on current `main` and record each result verbatim (pass / fail + the specific errors):

```bash
cd apps/web && npx tsc --noEmit          # authoritative typecheck (NOT pnpm typecheck — it's cached and fails on @mune/db)
cd <repo-root> && pnpm lint web          # expect: clean modulo the known deferred no-img-element warning
pnpm test                                # full Vitest workspace; note any pre-existing failures
pnpm build web                           # web + packages only (the CI-safe build Vercel runs)
```

Write the baseline down (a short scratch note is fine). Every later "is main still OK?" check compares to THIS, not to zero. If the baseline is already red in some way, that's the bar — a PR is only a regression if it makes a *new* failure appear.

If `main` is badly broken before you start, stop and tell the user. Don't try to clear Dependabot PRs on top of a broken baseline.

## Step 1 — Discover the open Dependabot PRs

```bash
gh pr list --author "app/dependabot" --state open \
  --json number,title,createdAt,headRefName,mergeable,mergeStateStatus \
  --jq 'sort_by(.createdAt)'
```

Sort **oldest first** (ascending `createdAt`) — that's the merge order. Dependabot rebases newer PRs onto each merge, so going oldest-first minimizes churn.

If `gh` isn't authenticated, stop and ask the user to run `gh auth login` themselves (suggest they type `! gh auth login` in the prompt so the output lands here). If there are zero open Dependabot PRs, say so and stop.

For each PR, also note what it actually changes (`gh pr view <num> --json title,body`) — major version bump vs patch, dev-dependency vs runtime, and whether the body flags breaking changes. This feeds the plan.

## Step 2 — Write the plan with `/superpowers:writing-plans`

Invoke the **superpowers:writing-plans** skill to produce the plan document. Don't hand-roll the plan format — that skill owns it. Feed it everything from Steps 0–1 so the plan covers:

- The ordered PR list (oldest → newest) with one line each: what it bumps, from→to version, risk tier (patch/minor/major, dev/runtime).
- For each PR, the decision to make: **merge as-is**, **fix-then-merge** (lockfile regen, peerdep adjustment, small code change for a breaking change), or **close** (superseded, obsolete, or a bump we explicitly don't want). Closing needs user confirmation just like merging.
- The per-PR verification loop (the four checks) and the baseline they compare against.
- A rollback note: if a merge breaks `main` and can't be fixed quickly, how to back it out (`gh pr` revert / `git revert <merge-sha>`).

Show the plan to the user. This is the "plan + see if something needs to be added or deleted" checkpoint — the user may reorder, skip, or veto PRs here before any merging starts.

## Step 3 — Work each PR, oldest to newest

For each PR in order, run this loop. Do **not** batch — one PR fully lands (or is explicitly skipped) before the next begins, because each merge changes the baseline for the next.

**3a. Dispatch a subagent to prepare the PR.** Give it the PR number and the four checks. Its job is to do the legwork and report back — NOT to merge. Prompt it to:

1. `gh pr checkout <num>` to get the branch locally.
2. Rebase/merge current `main` into it if it's behind (`git merge origin/main` or let Dependabot's rebase stand); resolve trivial lockfile conflicts by regenerating (`pnpm install`).
3. `pnpm install` (the lockfile almost always changed).
4. Run all four checks: `cd apps/web && npx tsc --noEmit`, `pnpm lint web`, `pnpm test`, `pnpm build web`.
5. Compare results to the Step 0 baseline.
6. If a check regressed, attempt a minimal, in-scope fix (peerdep, import path change, a renamed API from the bumped package). For a build failure specifically, the `build-log-debugger` agent is the right tool. Do NOT let the subagent expand scope beyond making this one bump work.
7. Report back: green-vs-baseline yes/no, the exact diff, any fixes it made, and whether it recommends merge / fix-then-merge / close.

**3b. Review and confirm (main thread, with the human).** Read the subagent's report. Then show the user: the PR title + version bump, the diff (including any fix commits the subagent added), and the check results vs baseline. Wait for an explicit go.

- This is a confirmation gate. No go, no merge.
- If the subagent had to add fix commits, those are changes to a Dependabot branch — call that out explicitly so the user knows the PR is no longer pure-bot.

**3c. Merge.** On confirmation:

```bash
gh pr merge <num> --squash --delete-branch    # match the repo's convention; ask if unsure which merge method
```

**3d. Re-verify `main`.** Return to `main`, pull the merge, and re-run the four checks:

```bash
git checkout main && git pull
cd apps/web && npx tsc --noEmit && cd <repo-root> && pnpm lint web && pnpm test && pnpm build web
```

If `main` is still green-vs-baseline, move to the next PR. If this merge introduced a new failure that 3a didn't catch (possible — the merge resolution differs from the local rebase), STOP. Don't proceed to the next PR on a broken `main`. Diagnose, dispatch a fixer subagent if needed, and either push a fix or revert the merge per the plan's rollback note. Get the user's call on fix-vs-revert.

> Speed note: running `pnpm build web` and the full `pnpm test` between *every* merge is thorough but slow. If there are many low-risk patch bumps and the user wants speed, offer to run only `tsc` + `lint` per-PR and defer `test` + `build` to a checkpoint every few PRs (and always at the end). Only do this if the user opts in — the default is all four, every time.

## Step 4 — Final full sweep

After the last PR, run all four checks on `main` one final time, from a clean state, and compare to the Step 0 baseline:

```bash
git checkout main && git pull && git status --short
cd apps/web && npx tsc --noEmit
cd <repo-root> && pnpm lint web
pnpm test
pnpm build web
```

Report the end state: which PRs merged, which were closed (and why), which were skipped, and the final check results vs baseline.

## Step 5 — Fix-up if the final sweep is red

If the final sweep shows any new failure (a regression that slipped through, or an interaction only visible once everything's merged):

1. Re-open / update the plan via **superpowers:writing-plans** — add a "remediation" section describing the failure, the suspected PR(s), and the fix approach. This is the "if something is at the end, update the plan" step.
2. Dispatch a dev subagent (`general-purpose`, or `build-log-debugger` for build breakage) to implement the fix on a `claude/` branch — not directly on `main`. Use `git checkout -b claude/YYYY-MM-DD-HHMM-dependabot-fixup` (the `pnpm claude:branch` helper no-ops if you're already on a `claude/*` branch).
3. Verify the fix against the baseline, show the diff, and confirm with the user before merging it (same gate as every other merge).

Done when the final sweep is green-vs-baseline and every Dependabot PR is either merged, closed-with-reason, or explicitly deferred with the user's agreement.

---

## Reference: the four checks

| Check | Command | Notes |
|---|---|---|
| Typecheck | `cd apps/web && npx tsc --noEmit` | Authoritative. `pnpm typecheck` is Turborepo-cached and fails on `@mune/db` (missing vitest) — do not use it as the gate. |
| Lint | `pnpm lint web` | Baseline carries one deferred `no-img-element` warning in the admin notes page. Not a regression. |
| Test | `pnpm test` | Full workspace. For speed, `pnpm --filter @mune/crypto test` and `cd apps/web && pnpm test` run focused subsets. |
| Build | `pnpm build web` | Web + packages only — the CI-safe build. Never `pnpm build` (that triggers a paid EAS mobile build). |

## Reference: gotchas that bite during this workflow

- **PR merge can leave you on `main`.** After a merge, your local clone may fast-forward and switch you to `main`. Always `git branch --show-current` before committing any fix-up — pushing to `main` happens silently otherwise.
- **Turbopack cache corruption after branch-switching.** If `pnpm build web` / `pnpm dev` panics with `Unable to open static sorted file`, delete `apps/web/.next` and retry. Safe to nuke — it's all regenerated output.
- **Quote route-group paths.** Zsh globs `(root)` and `(protected)`; quote them in any `git` command a fix-up touches.
- **Dependabot author handle.** It's `app/dependabot` for `gh pr list --author`. If that returns nothing but you know PRs exist, try `dependabot[bot]` or check `gh pr list --json author`.
