---
description: Strip AI tells from content while preserving Mune's signature voice moves (three-beat list, "not X but Y", deliberate repetition, earned fragments).
argument-hint: [content to humanize, or leave blank to humanize the most recent assistant draft]
allowed-tools: Read, Edit, Write, Grep
---

Apply the `humanize` skill to the content below. The skill lives at `.claude/skills/humanize/SKILL.md` and is calibrated to `.claude/rules/TOV.md`, so it removes em-dashes, AI vocabulary, sycophancy, filler, and generic conclusions without flattening Mune's signature voice moves.

## Steps

1. Read `.claude/skills/humanize/SKILL.md` if not already loaded in this conversation.
2. Read `.claude/skills/humanize/references/preserve-list.md` and `.claude/skills/humanize/references/strip-list.md`.
3. If `$ARGUMENTS` is empty, humanize the most recent assistant draft in this conversation. If the most recent assistant turn was not a draft, ask the user what to humanize before proceeding.
4. Run the three-pass process from the skill:
   - Pass 1: identify Mune signature moves and mark preserved zones, then apply the smallest possible edit to every strip-list hit outside those zones.
   - Pass 2: verify no signature move was damaged.
   - Pass 3: read the rewrite aloud, sniff-test for any remaining "obviously AI" residue, do a second-pass rewrite on offending passages.
5. Output the rewritten content followed by the audit note in the format the skill specifies (Stripped / Preserved as signature / Flagged for human review).

## Content to humanize

$ARGUMENTS
