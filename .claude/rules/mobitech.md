# Mobitech

> Portfolio copy for haugendesign.no. Extracted from the internal `MOBITECH.md`. Nothing here may be rewritten or expanded by a coding agent.
>
> **BLOCKER: confirm you're allowed to publish this. See the bottom.**

## Slug

`mobitech`

## Card

**Mobitech**
The public site for a Norwegian maritime software company. Design through deployment, plus the CMS their staff edit it with.

Tags: `Next.js` `React` `Sanity` `Tailwind` `Framer Motion` `Vercel`

Link: https://www.mobitech.no

## Detail page

Mobitech builds software for Norwegian ferry operators. Ticketing, boarding, on-board sales, toll integration. Their systems run the crossings. Their website did not reflect that.

I built the replacement end to end: Figma through to production. Next.js on Vercel, Sanity for content, Tailwind for styling.

The part that mattered wasn't the frontend. It was that their staff needed to publish without me. So the build shipped with a Sanity Studio and eight content schemas covering homepage copy, product timelines, news, FAQ, and contact templates, plus a deploy button inside the CMS so an editor could push the site live without opening a terminal. Content changes revalidate on a 24-hour window, or immediately if someone presses the button.

Freelance. [CONFIRM: what year? What was the engagement — weeks? Months? A number is worth more than the whole paragraph above it.]

[CONFIRM: one line on what you'd do differently now. You have a 400-line document of your own critiques. One sentence of it, in public, does more for you than the whole feature list. "I'd server-render it now" is a sentence that makes a technical reader trust you.]

### Stack

Next.js 14 (Pages Router), React 18, Sanity v3 with GROQ, Tailwind and DaisyUI, Framer Motion, Lenis for scroll, nodemailer for the contact route, deployed on Vercel. ISR for content, JSON-LD and per-page metadata for SEO.

---

## Permission check before publishing

You freelanced this. Client work is normally fine to show, but a page describing their CMS architecture, their content model, and their publishing workflow is a different artifact from a screenshot and a link. Confirm your contract allows it, or send Mobitech an email that takes four minutes. If you'd rather not ask, the fallback is a card with a screenshot, the stack tags, and a link, and no detail page. That's still a portfolio entry.

## Do not publish (from the internal doc)

- **Section 14 in its entirety.** The technical debt list. Vestigial App Router remnant, the misspelled `ConactForm.js`, the contact handler returning 400 on success, the broken result handling in `lib/api.js`, the unused hook, the duplicate schema registries, the committed `dist/`, the cosmetic loading screen. This is your own bug list. It stays in the repo.
- **The Sanity project ID `2klrbaax` and the dataset name.** It's a real project identifier for a live client. Do not put it on a public website.
- `EMAIL` / `EMAIL_PASS` and the note that it's a Gmail app password.
- `helpdesk@mobitech.no`, `post@mobitech.no`, the phone number, the Atlassian portal URL. They're on Mobitech's own site, so this isn't a leak, but there's no reason for them to be on yours.
- The passenger and vehicle figures. `MOBITECH.md` sources them to the client's own marketing copy. Don't repeat a number you didn't verify.
- The line about crawlers seeing metadata and no content. That's a live SEO weakness on a client's production site, and it's yours.
