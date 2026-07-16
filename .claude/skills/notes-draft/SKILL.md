---
name: notes-draft
description: Draft or rewrite a post for Mune's public blog at /notes — applying Fredrik's full essay voice, scene-first structure, Mune TOV hard rules, and correct output format for the notes DB table. Use whenever the user asks to draft, write, create, or rewrite a notes post or blog post.
---

# Notes Draft

This skill is for Mune's public blog at `/notes` — not for private journal entries. Posts live in the `notes` Supabase table and are published via `/admin`. The audience is the same person who reads the landing page: someone who writes in Apple Notes at 2 AM and deletes it before morning.

## Before writing

1. Ask if you don't have it: what is this post about? One sentence from the user is enough to work from.
2. Read `.claude/rules/TOV.md` if it's not already in context — the hard rules there override anything that conflicts with this skill.
3. Do not write a word until you have a clear scene or specific moment to open with. If you can't find one, ask the user for a concrete detail from their experience with Mune or the topic.

## Voice rules (condensed — TOV.md is authoritative)

**Hard rules, zero tolerance:**
- No emojis. Ever.
- No exclamation points. Ever.
- No em-dashes in new content. By 2026 they read as an AI tell. Use a period, a comma, or restructure. `"It's a quiet room. Enter when you need to think out loud."` not `"It's a quiet room — enter when you need to think out loud."`
- No therapy-speak: hold space, lean into, journey, healing, vulnerability, safe space, self-care.
- No founder-speak: move the needle, 10x, disrupt, game-changer, thrilled to announce.
- No performed care: I hear you, I'm here for you, amazing insight, you're doing great work on yourself.
- No adjective stacks (warm, supportive, thoughtful / beautiful, kind, private).
- Sentence case for all headings. Not Title Case.
- Oxford comma.
- Contractions always. "We're" not "we are."

**Voice qualities:**
- Physical, not abstract. Emotional states go through the body.
- Quiet, not cinematic. No "everything changed." Insights arrive sideways.
- Specific over evocative. "Apple Notes" beats "a writing app." Name the brand, the hour, the exact action.
- Anti-performance. The more marketing-adjacent the topic, the more skeptical the voice gets.

**Signature moves (use where they fit; never force):**
- Three-beat list: three short clauses, accumulating. "I showed up. I sat in the chair. I did the responsible thing."
- Not X, but Y: one reframe per piece, max. "Privacy, not as a promise, but as architecture."
- Aphoristic close: end on something compressed. Never a CTA. "After enough deleted notes, building it felt like less work than pretending it didn't matter."
- Honest hedges: "Maybe months." Hedges calibrate; they don't soften.

## Structure for a notes post

These are founder essays, not blog posts in the content-marketing sense. Structure should feel discovered, not planned.

**Opening:** A scene. A specific moment. Not a hook, not a question, not a value proposition. Start where something was happening.

> Good: "It was somewhere around 2 AM, phone on low brightness, thumb hovering over a half-written sentence..."
> Bad: "Have you ever wondered why it's so hard to express your feelings?"

**Middle:** Build through specifics. Each paragraph should earn the next. Vary sentence length aggressively — long breathing sentence, then a three-word stab. Let the tension accumulate rather than announcing it.

**Close:** Something compressed and load-bearing. Not a summary, not a CTA. A click. The last sentence should make the essay feel inevitable.

**Length:** 400–900 words is typical. Short enough that every sentence is doing work. Long enough to earn the close.

## Claim boundaries (non-negotiable)

Can say:
- End-to-end encrypted
- We can't read your conversations
- No account tied to identity required
- Works at any hour, with any thought

Cannot say:
- Any therapeutic claim (replaces therapy, treats, diagnoses)
- Any outcome guarantee (reduces anxiety, makes you feel better)
- "The only" / "the best" — superlatives without evidence
- Claims about AI empathy or emotional intelligence
- "100% secure" — use "end-to-end encrypted"

If the post touches on crisis, self-harm, or mental health in a direct way, include near the top:
> *"If you're in crisis, Mune isn't the right place. Please contact a crisis line in your country — they're trained for this."*

## Output format

Present the draft with these clearly labeled sections:

**Title:** The proposed title (sentence case, no exclamation point, no em-dash). Aim for 40–60 characters. It should be specific, not clever.

**Slug:** Lowercase hyphen-separated version of the title, suitable for a URL. E.g. `the-notes-i-kept-deleting`.

**Body:** The full post in Markdown. Use `##` for any subheadings (sentence case). No `#` (title is separate). Body text only — no frontmatter, no metadata.

## Self-check before presenting

Run every sentence through this test:
- Sounds like a thoughtful person talking to a friend at 11pm → keep
- Sounds like a brand in a launch tweet → cut
- Sounds like a therapist trained on LinkedIn → cut harder
- Could run on a wellness-app Instagram ad → rewrite from scratch

Then check:
- Any em-dashes? Replace them.
- Any exclamation points? Remove them.
- Any therapy-speak or founder-speak? Flag and rewrite.
- Does the opening start in a scene? If not, restructure.
- Does the close land on something compressed? If it ends on a CTA or a summary, rewrite it.

Only present the draft after the self-check passes.
