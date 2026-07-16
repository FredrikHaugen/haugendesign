# Strip list: AI tells to remove from Mune content

Each pattern below is something the standard humanizer flags AND something Mune's TOV.md agrees with. The before/after examples are calibrated to the kind of copy that actually appears in Mune drafts (landing page, founder essay, app store, UI), not to the original humanizer's Wikipedia-article examples.

Apply with the smallest possible edit. Do not rewrite passages that don't trigger any pattern.

## 1. Em-dashes in new content

TOV.md is stricter than the source humanizer. By 2026 the em-dash, especially the spaced variety, reads as an AI tell. Replace with a period, comma, or restructured sentence. Quoted legacy Fredrik essays keep their original em-dashes.

| Before | After |
|---|---|
| "Mune is the place — quiet, private, yours — where the hardest thoughts can land." | "Mune is the place. Quiet. Private. Yours." |
| "It's encrypted on your device — before it leaves." | "Encrypted on your device, before it leaves." |
| "We built it for the 2 AM moment — when you can't sleep, can't talk, can't write." | "We built it for the 2 AM moment. When you can't sleep, can't talk, can't write." |

## 2. AI vocabulary

The lexical signature of LLM output. Strip aggressively.

| Before | After |
|---|---|
| "Mune showcases a deep commitment to privacy." | "Mune is built around privacy." |
| "In today's rapidly evolving landscape of AI products..." | "Most AI products..." |
| "The intricate interplay of encryption and warmth..." | "Encryption and warmth, together..." |
| "A testament to careful design." | "Carefully designed." |
| "Leveraging advanced encryption..." | "Using AES-256-GCM..." |
| "Foster a sense of safety." | "Feel safe." |
| "Robust privacy infrastructure." | "End-to-end encryption." |
| "Navigate the complexities of self-reflection." | "Help you think." |
| "On a journey of self-discovery." | "Trying to figure out what you feel." |

## 3. Significance inflation

Generic claims of importance attached to ordinary descriptions.

| Before | After |
|---|---|
| "Mune marks a pivotal moment in private journaling." | "Mune is a private journal." |
| "Underscoring its vital role in modern mental health..." | (delete the sentence; let the previous claim stand) |
| "Stands as a foundation for emotional clarity." | "Helps you find emotional clarity." |
| "A defining product in the AI companion space." | "An AI companion." |

## 4. Promotional language

Real-estate-listing energy. Almost always strippable to a plain noun.

| Before | After |
|---|---|
| "Nestled within an end-to-end encrypted vault..." | "In an end-to-end encrypted vault..." |
| "Breathtaking simplicity." | "Simple." |
| "A cutting-edge approach to journaling." | "A different approach to journaling." |
| "World-class privacy." | "End-to-end encrypted." |
| "Seamless, intuitive experience." | (delete; let the screenshot speak for the experience) |

## 5. Vague attributions

Unsourced authority claims. Either find a real source or remove.

| Before | After |
|---|---|
| "Experts believe private journaling improves clarity." | "A 2023 study by [actual author] in [actual journal] found..." OR delete. |
| "Industry observers note that AI companions are growing." | "OpenAI and Anthropic both shipped consumer companion products in 2024." OR delete. |
| "Studies show that anonymity reduces self-censorship." | (find the actual study) OR delete. |

## 6. Formulaic challenges arc

The classic "despite X, Y, Z, the [thing] continues to thrive" structure.

| Before | After |
|---|---|
| "Despite challenges typical of emerging technologies including hallucinations, bias, and accountability, the ecosystem continues to thrive." | "AI products still hallucinate. The category is growing anyway." |
| "Despite obstacles in adoption, Mune continues to grow steadily." | (delete the sentence; if growth is real, name a number) |

## 7. Copula avoidance

"Serves as," "functions as," "stands as," "represents." Replace with "is" or "has."

| Before | After |
|---|---|
| "Mune serves as a private space for reflection." | "Mune is a private space for reflection." |
| "The encryption layer functions as the trust contract." | "The encryption layer is the trust contract." |
| "Anonymity stands as the foundation of the product." | "Anonymity is the foundation of the product." |

## 8. Synonym cycling

Cycling through near-synonyms in adjacent sentences to avoid repetition. Just repeat the original word.

| Before | After |
|---|---|
| "The protagonist of this essay is Fredrik. The main character struggles with... The central figure realizes..." | "Fredrik struggles with... He realizes..." OR repeat "Fredrik." |

## 9. False ranges

"From X to Y" where X and Y are not actually a range, just two examples.

| Before | After |
|---|---|
| "From 2 AM crises to morning gratitude." | "Whatever you bring." OR list the actual cases. |
| "From beginners to power users." | (just say "everyone" or list the actual segments) |
| "From the everyday to the cosmic." | (delete or list the actual scope) |

## 10. Boldface overuse and inline-header lists

The "**Key insight:** Insight here." pattern. Convert to prose.

| Before | After |
|---|---|
| "**Privacy:** Encrypted on your device. **Warmth:** Without a persona. **Free:** No identity tax." | "Encrypted on your device. Without a persona. Free, because the identity tax is the problem." |
| "**Speed:** Code generation is significantly faster." | (rewrite as prose; lose the inline header) |

## 11. Title Case Headings

Convert every heading to sentence case unless it is a proper noun.

| Before | After |
|---|---|
| "## How To Get Started With Mune" | "## How to get started with Mune" |
| "## Strategic Reflection And Insight" | "## Strategic reflection and insight" (or cut the heading entirely if it is filler) |

## 12. Emojis

Strip every one. TOV.md and the AI-tells guide both ban them in marketing/UI/email.

| Before | After |
|---|---|
| "🔒 Encrypted. 💜 Private. 🌙 Yours." | "Encrypted. Private. Yours." |
| "## 🚀 Launch phase" | "## Launch phase" |

## 13. Chatbot artifacts

Conversational AI residue from the model that drafted the copy.

| Before | After |
|---|---|
| "I hope this helps! Let me know if you'd like me to expand on anything." | (delete) |
| "Feel free to reach out if you have questions." | (delete; let the contact link do the work) |
| "Here's an essay on this topic." | (delete the framing line; start with the essay) |

## 14. Cutoff disclaimers

The model admitting to its training cutoff or lack of sources. Always strip.

| Before | After |
|---|---|
| "While details are limited based on available information..." | (delete) |
| "Based on what I know up to my training cutoff..." | (delete) |

## 15. Sycophantic tone

| Before | After |
|---|---|
| "Great question!" | (delete) |
| "You're absolutely right." | (delete or replace with a direct response) |
| "What an insightful prompt." | (delete) |

## 16. Filler phrases

| Before | After |
|---|---|
| "In order to start journaling..." | "To start journaling..." |
| "Due to the fact that encryption is local..." | "Because encryption is local..." |
| "At the end of the day, what matters is privacy." | "What matters is privacy." OR "Privacy matters." |
| "It is important to note that..." | (delete; just state the point) |

## 17. Excessive hedging

Distinct from honest hedges (preserve those, see preserve-list.md). Excessive hedging stacks qualifiers without calibrating any specific claim.

| Before | After |
|---|---|
| "Mune could potentially possibly help with reflection." | "Mune may help with reflection." OR "Mune is built for reflection." |
| "It might be the case that some users find this useful." | "Some users find this useful." (drop the modal stack) |

## 18. Generic conclusions

Endings that could conclude any piece on any topic.

| Before | After |
|---|---|
| "The future of private AI looks bright." | (delete; replace with the actual aphoristic close) |
| "Exciting times ahead." | (delete) |
| "Only time will tell." | (delete) |
| "We're just getting started." | (delete unless followed by something specific) |

## 19. Persuasive authority tropes

Phrases that perform authority without earning it.

| Before | After |
|---|---|
| "At its core, what matters is privacy." | "Privacy matters." |
| "The truth is, no journal is private if a server can read it." | "No journal is private if a server can read it." |
| "Fundamentally, this is a trust contract." | "This is a trust contract." |

## 20. Signposting announcements

Telling the reader what is about to happen instead of just doing it.

| Before | After |
|---|---|
| "Let's dive in." | (delete) |
| "Here's what you need to know." | (delete; just say it) |
| "In this article, we'll explore..." | (delete; start with the content) |

## 21. Notability name-dropping

Listing publications without a quote, claim, or specific credit.

| Before | After |
|---|---|
| "Featured in The New York Times, Wired, and The Verge." | "In a 2025 NYT piece, [name] argued..." OR delete if no quote exists. |

## 22. Adjective stacks

Three or more adjectives in a row. Pick one or two; cut the rest.

| Before | After |
|---|---|
| "A warm, supportive, thoughtful AI." | "A warm AI." OR rewrite without adjectives. |
| "Beautiful, kind, private." | "Private." (the only one that says something specific) |

## 23. Empty intensifiers

| Before | After |
|---|---|
| "Really useful." | "Useful." |
| "Very encrypted." | "Encrypted." |
| "Incredibly private." | "Private." |
| "Truly different." | "Different." |
| "Deeply personal." | "Personal." |
| "Absolutely secure." | "Secure." (or better, "end-to-end encrypted") |

## 24. Hyphenated word pairs as filler

The "data-driven, customer-obsessed, mission-driven" stack. Drop the hyphenation when it is adjective-stacking. Keep when it is an actual compound noun.

| Before | After |
|---|---|
| "A cross-functional, data-driven, client-facing approach." | (delete the whole sentence; it says nothing) |
| "End-to-end encrypted." | KEEP, this is a real technical term. |
| "Built for thought-out, well-considered, deeply-personal use." | (rewrite; the adjective pile is the problem) |

## Process notes

- **Apply smallest edit possible.** If a sentence has one AI tell, fix only that. Do not rewrite the surrounding sentences for style.
- **Do not invent edits to look thorough.** If a passage is clean, say so in the audit note.
- **Do not strip inside preserved zones.** See `preserve-list.md` for the moves that block the strip rules.
- **Read aloud at the end.** If a paragraph still rhythmically reads as AI (uniform sentence length, predictable cadence), vary length on a second pass.

## One-line summary

Strip the tells. Quote the original. Note what changed. Trust the preserve list when in doubt.
