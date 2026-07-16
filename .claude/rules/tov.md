# Tone of voice

The primary rule of this file: **you are not writing.**

All copy for this site is supplied in `.claude/rules/` — `ABOUT.md`, `mune.md`, `mobitech.md`. Your job is to place it, not to produce it. If a slot needs a word and those files don't have one, use the plainest available label ("Work", "About", "Contact") or leave `{/* TODO: copy needed */}`. Every invented sentence is a bug, not a contribution.

This rule exists because the site owner writes for a living, has a documented voice, and has already rejected one version of this site for sounding generated. The generated version said "builder of digital calm" and "crafting emotionally intelligent technology that feels alive." Nothing in that register ships.

## Hard bans

Absolute. No exceptions, no context in which these are acceptable, including alt text, meta descriptions, `aria-label`s, commit messages, and README prose.

- **No em-dashes.** Use a period. Use a comma. Restructure the sentence.
- **No exclamation points.**
- **No emojis.**
- **Sentence case for every heading.** Title Case is forbidden.
- **No Oxford-comma'd tricolon of adjectives.** "Fast, accessible, and beautiful" is the sound of a template.

## Banned vocabulary

passionate · crafting · crafted · journey · seamless · seamlessly · leveraging · cutting-edge · empowering · elevate · unlock · robust · delve · landscape · testament · showcasing · dive into · at the intersection of · digital calm · feels alive · let's build something · building spaces where X meets Y · I'm a developer who believes

Also banned: any sentence of the form "I'm a [role] who [verb]s [abstract noun]." That construction is the tell.

## The register

If you must produce a label or a fragment, the target is: a competent person stating a fact, slightly bored of talking about himself.

- "Not taking new work." → correct.
- "I'd love to hear from you even though I'm unfortunately not available at the moment!" → wrong. Apologetic, exclamatory, asking permission to be wanted.

Specific over evocative. "Apple Notes at 2am" beats "late-night reflection." "Twenty client sites" beats "extensive client experience." A number is always better than an adjective. If you're reaching for a sensory word, you've skipped a fact.

Quiet, not cinematic. No "everything changed." No "in that moment." The drama is in the accuracy.

## Structural moves that are correct here

These are the site owner's actual moves. They appear in supplied copy. Do not strip them thinking they're errors.

- **Three-beat list.** Three short clauses. "Chat. Journal. Locked."
- **Not X, but Y.** "Privacy, not as a promise, but as architecture." Once per page maximum.
- **Sentence fragments.** Deliberate. Leave them.
- **Ending on something compressed.** Never end a section on a CTA.

## Claim boundaries: Mune

Mune is an encrypted mental-health-adjacent product. These boundaries are legal and reputational, not stylistic. Violating them on a portfolio is worse than violating them in the product, because the portfolio is where he claims to be the person who gets this right.

Only the exact sentences in `.claude/rules/mune.md` may appear anywhere on this site. Do not summarize Mune. Do not paraphrase Mune. Do not write a shorter version of the Mune paragraph to fit a card.

**Never, under any phrasing:**

- Any therapeutic claim: treats, cures, diagnoses, helps with, replaces therapy, supports mental health
- Any outcome claim: reduces anxiety, makes you feel better, proven to help
- Any AI-empathy claim: understands you, knows how you feel, your AI companion, your AI friend
- "100% secure" · "completely private" · "your data never leaves your device" (it does leave, encrypted)
- "The only" or "the first" or "the best" — superlatives without evidence
- Any comparison to Day One, Rosebud, Replika, or any named competitor
- "Zero data retention" or "zero-data-retention agreement" unless `.claude/rules/mune.md` contains that exact phrase. If it doesn't, the agreement isn't signed and the claim is false. As of this writing it does not — that file blocks the claim explicitly.
- The word "Eir"

**Safe:** end-to-end encrypted · encrypted on your device before it leaves it · the server can't read it · free at the core, paid for what scales

## Alt text and metadata

Alt text describes. It does not sell.

- Correct: "Fredrik Haugen at a frozen lake, aurora composited in Blender."
- Wrong: "Fredrik Haugen, software engineer and designer, crafting digital experiences."

Meta description is one sentence, taken from `.claude/rules/ABOUT.md`. Do not write a new one.

## The test

Read it aloud.

- Sounds like a person stating a fact → keep.
- Sounds like a launch tweet → cut.
- Sounds like a LinkedIn post → cut harder.
- Could appear on any other developer portfolio without changing a word → it isn't done.
