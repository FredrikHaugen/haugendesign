# Anti-patterns — what the Mune voice is not

A catalog of specific sentences that would be wrong for Mune, grouped by why they fail, with suggested rewrites where useful. When in doubt whether a draft is drifting, compare it against this list — if the draft sounds like any of these shapes, rewrite it.

## 1. Wellness-app cheerful

**Broken:**

- "Welcome to Mune — your personal space for mental wellness!"
- "Start your journey to a calmer mind today."
- "Mune is the all-in-one AI companion for your emotional wellbeing."
- "Take the first step toward a healthier you."

**Why it breaks:**
Exclamation marks. Generic "wellness" framing. "All-in-one" is a SaaS tic. "Journey" is therapy-speak. Every one of these could live in a hundred other apps.

**Fix:**
Lead with what the product does, not what the user becomes. Use concrete affordances. Drop the exclamation mark. Skip "wellness."

> "A private place to write. Encrypted on your device. Free."

## 2. Therapy-coded

**Broken:**

- "A safe space to lean into your vulnerability."
- "Mune holds space for your healing journey."
- "Process your feelings with compassion."
- "We see you."
- "You're not alone."

**Why it breaks:**
Therapy-speak ("hold space," "lean into," "healing," "vulnerability as noun"). Most of these phrases are now signals of a specific kind of brand Mune is explicitly not. "You're not alone" and "we see you" are parasocial and false — Mune doesn't see the user; that's the whole point.

**Fix:**
Describe what the user can actually do. No parasocial claims. No "we see you."

> "Write what you can't say out loud. Mune doesn't save it anywhere we can read."

## 3. Founder-hustle

**Broken:**

- "I built Mune to disrupt the mental health space."
- "We're on a mission to democratize emotional support."
- "At the end of the day, everyone deserves a tool that 10x's their self-awareness."
- "We're customer-obsessed and mission-driven."

**Why it breaks:**
Every phrase is a founder-speak cliché. "Disrupt," "democratize," "mission-driven," "10x," "at the end of the day" — none of these land, and together they signal a bad YC pitch deck.

**Fix:**
Say what you actually did, in specific terms.

> "I kept deleting notes at 2 AM. So I built a place to write them without saving them anywhere I'd regret."

## 4. Cinematic / performative

**Broken:**

- "And in that moment, everything changed."
- "I knew right then that I had to build this."
- "A single tear rolled down her cheek as she finally found her voice."
- "This is the story of how I changed my life forever."

**Why it breaks:**
Cinematic gestures. The drama is announced rather than earned. "Forever" is a weather report tell.

**Fix:**
Keep the observation, drop the announcement. Let the specificity do the work.

> "After enough deleted notes, building it felt like less work than pretending it didn't matter."

## 5. Adjective stacks

**Broken:**

- "Beautifully designed. Deeply personal. Always there for you."
- "A warm, supportive, thoughtful place to write."
- "Private. Safe. Judgment-free."

**Why it breaks:**
Three adjectives in a row is almost always a tell that the writer doesn't trust the noun. Every app claims these adjectives. They don't differentiate, and they read as copywriting.

**Fix:**
Pick one concrete noun and let it carry. Or use "not X, but Y" to make the adjective earn its place.

> "Private — not as a promise, but as architecture."

## 6. Performative vulnerability

**Broken:**

- "Let me be real with you — we all struggle."
- "This is my truth."
- "Raw, unfiltered, honest — that's what Mune stands for."
- "I want to be fully transparent with you."

**Why it breaks:**
The phrase "let me be real with you" is a promise that the next sentence will be dishonest. "My truth" is an Instagram caption. "Raw" and "unfiltered" are posture, not substance.

**Fix:**
If the writing is honest, you don't need to announce it. Show it.

> "I won't tell you what I wrote in those notes. For the same reason I never saved them."

## 7. Empty intensifiers

**Broken:**

- "Mune is really, truly private."
- "We're incredibly committed to your privacy."
- "This is a deeply personal product."
- "We very much care about your trust."

**Why it breaks:**
"Really," "truly," "incredibly," "deeply," "very much" — these words are filler. When a writer reaches for them, it's usually because they sense the sentence isn't strong enough and they're trying to patch it with emphasis. Cut the intensifier and the sentence almost always improves.

**Fix:**
Kill the intensifier. Let the claim stand.

> "Mune is end-to-end encrypted."

## 8. Clickbait email subject lines

**Broken:**

- "🤯 You won't believe what writing every night did for me"
- "Quick question…"
- "Are you making this mistake at 2 AM?"
- "The #1 thing that changed everything"
- "Re: your late-night thoughts"

**Why it breaks:**
Every single one is a spam-filter tell. "Quick question" is the classic sales fake-out. "You won't believe" is link-bait. "Re:" as fake-reply is dishonest. All of these break the trust you've spent the voice building.

**Fix:**
Write the subject as a specific noun or scene fragment.

> "A note on encryption."
>
> "What I built this week."
>
> "The notes I kept deleting."

## 9. UI microcopy that tries too hard

**Broken:**

- "Oops! Something went wonky 🙈"
- "Yay! You're all set! 🎉"
- "Let's get started on your journey ✨"
- "Hi friend! What's on your mind today? 💭"

**Why it breaks:**
Emoji in UI copy. Performative cuteness. "Let's get started on your journey" is the opposite of compressed voice. "Hi friend" is parasocial.

**Fix:**
Strip to the bone. State the action. Trust the user.

> "Can't reach the server. Try again in a moment."
>
> "Account created."
>
> "Start writing."
>
> (blank cursor, no greeting)

## 10. Fake-urgent marketing copy

**Broken:**

- "Limited time offer — don't miss out!"
- "Join thousands of others who've already transformed their mental health."
- "⚡ Last chance to secure your spot."
- "Be one of the first 100 to try Mune."

**Why it breaks:**
Mune is free. There is no limited offer. "Thousands of others" is either unverifiable or a claim we can't make. "Transform your mental health" is an outcome guarantee. Fake urgency corrodes trust for a product whose whole pitch is trust.

**Fix:**
Don't manufacture urgency. Mune doesn't need it.

> "Mune is free. Open the app and start writing."

## 11. Broken claim boundaries (critical)

**Broken (never ship any of these):**

- "Mune can replace your therapist."
- "Reduce your anxiety in just 10 minutes a day."
- "The only truly private AI chatbot on the market."
- "Mune understands you better than anyone."
- "Our AI is trained on trauma-informed care."
- "100% secure — your data never leaves your device." *(The data does leave the device, encrypted — we just can't read it.)*
- "Thousands of users have transformed their mental health with Mune."

**Why they break:**
Therapeutic claim. Outcome guarantee. Unsupported superlative. Parasocial claim about AI empathy. Unverifiable training claim. Technically false security claim. Testimonial-adjacent claim without verification.

**Fix:**
Use the claim-boundary list in `mune-company.md`. Say only what's factually accurate and provable.

> "Mune is end-to-end encrypted. Conversations are encrypted on your device before they leave it. We can't read them."

## 12. "We see you" copy (parasocial)

**Broken:**

- "We see you at 2 AM."
- "We know what you're going through."
- "Our AI understands your pain."
- "You're not alone — Mune is here for you."

**Why it breaks:**
Mune literally cannot see the user (end-to-end encryption is the whole point). Claims of understanding the user's internal state are false and creepy. "We're here for you" is branded empathy — exactly what the product rejects.

**Fix:**
Describe what the user can do. Don't make claims about what the product knows or feels about them.

> "Write whatever you want to write. Ask for a journal entry if you want one."

---

## The diagnostic questions

When uncertain whether a draft is drifting into anti-pattern territory, ask:

1. **Could this sentence live unchanged in a wellness app with a purple gradient?** If yes, cut or rewrite.
2. **Is there a specific noun or action that would replace the abstract claim?** If yes, use it.
3. **Is the draft announcing an emotion, or showing it through the body or a specific action?** If announcing, rewrite toward the body or the action.
4. **Would the sentence read as honest at 2 AM, or only in a launch context?** If only launch, cut it.
5. **Is the sentence making a claim we can actually prove?** If not, find a claim we can.
