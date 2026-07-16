---
name: humanize
description: Strip AI-generated writing tells from a draft while preserving Mune's deliberate signature voice moves (three-beat list, "not X, but Y", anaphoric repetition, earned fragments). Use as a final pass after brand-voice, on raw AI drafts that did not go through brand-voice, or any time copy still reads as obviously AI-written. Triggers on "humanize", "remove AI tells", "audit AI writing", "strip AI markers", "this still sounds like AI", "/humanize". Calibrated to .claude/rules/TOV.md, not generic humanizer rules, so it removes em-dashes, AI vocabulary, sycophancy, and filler without flattening the moves that make Mune content distinct from generic SaaS prose.
---

# Humanize

A surgical AI-tell remover, calibrated to Mune. Based on Wikipedia's "Signs of AI writing" guide (https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing), filtered through `.claude/rules/TOV.md` so it does not sand off the moves Mune deliberately uses.

## Why this exists

The off-the-shelf humanizer flags every "rule of three" and every "not X, but Y" as an AI tell. For most writers that is correct. For Mune those are signature moves. Running the generic humanizer on Mune content strips the voice down to "thoughtful generic person", which is the exact failure mode TOV.md was written to escape.

This skill keeps the strip patterns that align with TOV.md. It discards the conflict patterns that would erode Mune's voice.

## When to invoke

- As a final pass after `brand-voice` produces a draft. The brand-voice skill chains here automatically.
- Manually via `/humanize [content]` for raw AI output, content from outside sources, or anything that still reads as obviously AI after a brand-voice pass.
- When the user says "this does not sound human", "remove AI tells", "audit for AI writing", or "make this sound less like AI".

## Pass 1: what to strip

Full checklist with before and after examples lives in `references/strip-list.md`. The headline patterns:

1. **Em-dashes in new content.** TOV.md is stricter than the source humanizer. Replace every em-dash, especially the spaced variety, with a period, comma, or restructured sentence. The em-dash, by 2026, is an AI tell.
2. **AI vocabulary.** additionally, testament, landscape (as metaphor), showcasing, in today's, ever-evolving, intricate interplay, transformative, leverage, foster, robust, comprehensive, navigate (as metaphor), journey (as metaphor for everything).
3. **Significance inflation.** "marking a pivotal moment", "underscoring its vital role", "a testament to", "stands as a foundation".
4. **Promotional language.** "nestled", "breathtaking", "cutting-edge", "world-class", "seamless", "intuitive".
5. **Vague attributions.** "experts believe", "industry observers note", "studies show" without a citation.
6. **Formulaic challenges arc.** "despite challenges X, Y, Z, the [thing] continues to thrive."
7. **Copula avoidance.** "serves as", "functions as", "stands as", "represents". Use "is" or "has".
8. **Synonym cycling.** protagonist then main character then central figure. Pick one.
9. **False ranges.** "from the everyday to the cosmic", "from beginners to experts". Just list.
10. **Boldface overuse and inline-header lists.** "**Speed:** code is faster." Convert to prose or trim.
11. **Title Case Headings.** Convert to sentence case.
12. **Emojis.** Strip every one.
13. **Chatbot artifacts.** "I hope this helps", "Let me know if", "Feel free to ask".
14. **Cutoff disclaimers.** "while details are limited based on available information".
15. **Sycophantic tone.** "great question", "you're absolutely right", "what an insightful point".
16. **Filler phrases.** "in order to" becomes "to". "due to the fact that" becomes "because". "at the end of the day" gets cut.
17. **Excessive hedging.** "could potentially possibly may" becomes "may". (Honest hedges like "maybe months" stay. See preserve list.)
18. **Generic conclusions.** "the future looks bright", "exciting times ahead", "only time will tell".
19. **Persuasive authority tropes.** "at its core, what matters is", "the truth is", "fundamentally".
20. **Signposting announcements.** "let's dive in", "here's what you need to know", "in this article".
21. **Notability name-dropping.** Listing publications without a quote or claim ("featured in NYT, BBC, FT, The Hindu").
22. **Adjective stacks.** Three or more adjectives in a row ("warm, supportive, thoughtful").
23. **Empty intensifiers.** really, very, incredibly, truly, deeply, absolutely.
24. **Hyphenated word pairs as filler.** "cross-functional, data-driven, client-facing". Drop the hyphenation when it is adjective-stacking.

**One disagreement with the source humanizer.** TOV.md wants curly quotes in prose and straight quotes in code and UI. The source guide flags curly quotes as a tell. Mune disagrees. Keep curly quotes in prose. This is the only humanizer pattern Mune does not enforce.

## Pass 2: what to preserve

Verify nothing in this list got touched. Full list with examples and judgment calls: `references/preserve-list.md`. Headlines:

- **Three-beat list.** Three short clauses, escalating or accumulating. "I showed up. I sat in the chair. I did the responsible thing." TOV.md signature move. Do not flatten to two beats or one. Do not merge into a single sentence.
- **"Not X, but Y" reframes.** "Privacy, not as a promise, but as architecture." TOV.md signature. Used once per piece. When used, leave it alone.
- **Anaphoric repetition.** "Even by someone whose job was not to judge. Even by someone trained to handle it. Even by someone who would probably nod and say the right words." TOV.md uses repetition where other writers would bold or italicize. Do not collapse into one sentence.
- **Earned sentence fragments.** "Scene, not hook." "More like a confession." TOV.md endorses fragments when they earn their stop. Do not "fix" them by adding subjects.
- **Honest hedges.** "Maybe months." "More like a confession." Calibration, not flinch. Do not delete or harden.
- **Aphoristic close.** Long-form ending on one compressed line. "After enough deleted notes, building it felt like less work than pretending it didn't matter." Do not extend, summarize, or replace with a CTA.

If a passage uses one of these moves, mark it a preserved zone. Strip-list rules do not apply inside preserved zones.

## Signature versus generic: judgment guide

The humanize pass is judgment work. The same surface pattern can be a signature move or an AI tell depending on whether it is load-bearing.

| Pattern | Signature, preserve | Generic, strip |
|---|---|---|
| Three short clauses | "No audience. No profile. No 'this will be used to improve our services.'" Load-bearing, escalating, specific. | "Innovation, inspiration, and insights." Adjective triad, no specificity, no escalation. |
| "Not X, but Y" | "Anonymity, not as an aesthetic, but as a relief." Reframes a real tension. | "Not just a tool, but a partner." Generic SaaS framing. |
| Repetition | "Even by someone whose job was not to judge. Even by someone trained to handle it." Accumulating evidence. | "Innovation. Innovation. Innovation." Emphasis as substitute for content. |
| Fragments | "Scene, not hook." Earning the stop. | "Game-changer." Laziness. |

Rule of thumb: if the move could be replaced by its generic version and lose nothing, it is not load-bearing. Strip it. If removing it changes what the sentence says, preserve it.

## Process

1. **Read the input.** Identify which TOV.md signature moves are present. Mark those passages as preserved zones.
2. **Pass 1, strip.** Walk the strip-list. Apply the smallest possible edit at each hit. Do not touch preserved zones.
3. **Pass 2, verify.** Re-read the output. Confirm every signature move from pass 1 still survives. If a signature move got accidentally damaged, restore it.
4. **Pass 3, "obviously AI" sniff test.** Read the whole thing aloud. Does it still scream "AI wrote this"? If yes, do a second-pass rewrite on the offending passages. The most common residue: paragraphs that were structurally sound but rhythmically uniform. Vary length aggressively on the second pass.
5. **Deliver.** Output the rewritten text plus an audit note (format below).

## Audit note format

Always include this block at the end of the response:

```
**Humanize audit:**
- Stripped: [pattern names with counts, e.g. "em-dashes ×4", "AI vocabulary (testament, landscape)", "generic conclusion ×1"]
- Preserved as signature: [pattern names with locations, e.g. "three-beat list (¶3)", "not X but Y (¶7)"]
- Flagged for human review: [anything ambiguous, e.g. "¶5 looks like a three-beat list but the third beat is generic, Fredrik should decide"]
```

If nothing was stripped, say so. Do not invent edits to look thorough.

## When NOT to apply

- **Direct quotes from prior writing.** Keep original punctuation, including em-dashes. TOV.md is explicit: "Direct quotes from prior writing keep their original punctuation."
- **Legacy essays already in production.** Archival voice, not a template. Do not retroactively humanize Fredrik's published essays.
- **Legal copy, security disclosures, privacy policy, terms of service.** TOV.md exempts these from voice rules entirely. Do not humanize compliance prose.
- **Code, config, technical docs, migrations, RLS policies.** Leave alone.
- **User-generated content.** If the user pastes their own writing for any reason other than humanizing it, do not run this skill on it.

## References

- `references/strip-list.md`. Full checklist with before/after examples calibrated to Mune content.
- `references/preserve-list.md`. Mune signature moves with examples and judgment calls.
- `.claude/rules/TOV.md`. The authoritative voice ruleset this skill is calibrated against.
- `.claude/skills/brand-voice/SKILL.md`. The upstream sculpting skill.
- https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing. The source guide.
