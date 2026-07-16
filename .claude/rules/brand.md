# Brand system

> **Fredrik: the palette and type below are a proposal, not a decision.** You're the designer; this is the one file you should overrule. It's specified concretely because a concrete proposal is easier to reject than a vague one. The reasoning is stated so you can argue with it.

## The governing constraint

**This site is not Mune.** A visitor who has seen mune.so must not think this is a Mune subpage. That rules out:

- The Mune palette: `#8963BA` brand-purple, `#F5A87C` brand-gold, `#1f2937` brand-graphite. Never appear here.
- Dark-mode-only. Mune is dark-only as a brand-defining choice. This site is light.
- The Mune type triangle: Noto Serif, Noto Sans, Geist Mono. Different fonts here.
- The locked-box metaphor, the "blob" vocabulary, the Mune motion system.

## The direction

A printed exhibition catalogue. Not a SaaS landing page.

Cold, quiet, editorial. Nordic without a stock photo of a fjord. The reference is a gallery wall label: generous white space, one strong typographic hierarchy, information presented as fact and nothing competing with it.

The site owner is a designer as well as an engineer. A visitor should be able to tell that from the typography alone, before reading a word about it. That is the entire argument for spending any time on this file.

## Color

**Proposal: near-monochrome. The hero photograph is the only color on the page.**

The reasoning: the hero is a composited aurora, cold greens and violets. Any palette competes with it. A monochrome page makes that image the single chromatic event, which is both stronger design and an honest signal, since he made the image.

```
--paper    #FAFAF8   page background, a warm off-white, not pure white
--ink      #16181A   body text, a near-black with warmth, never #000
--ink-dim  #6B7076   secondary text, dates, labels
--rule     #E2E2DE   hairlines and borders
--accent   #1B4A5A   links, and only links. A cold deep teal, pulled from the aurora's shadow.
```

Rules:
- Accent is for interactive text only. Never a background. Never a large surface. Never decorative.
- No gradients. None. The old version of this site had a gradient CTA and it read as 2019.
- Borders or nothing. **No card shadows.** No `shadow-lg`, no `shadow-md`, no elevation system.
- No hardcoded hex outside the token definitions. No Tailwind arbitrary values.

Fredrik's July 2026 amendment, on top of the rules above:
- Stack tags render as pills tinted with four washed-out pastels (tokens in `globals.css`, pairs pulled from the warm-monochrome system). Pastels appear nowhere else.
- The hero carries a faint aurora tint: two blurred blobs, green and violet, low opacity. It stands in for the photograph's palette until the hero ships and stays quiet after.
- One decorative use of the accent is allowed: the 2rem hairline tick above section headings.

## Type

**Proposal: Newsreader (display) + Inter (body).**

- **Newsreader** for the name, section headings, and project titles. Weights 300–400 only. It's an editorial serif with real character and it does not appear on other developer portfolios.
- **Inter** for body, labels, nav, credentials. Weight 400. Never above 500.
- No third font. No mono unless a stack tag needs it, and stack tags don't need it.

Rules:
- **Emphasis comes from size, color, or italic. Never weight.** No bold body text.
- Body measure 65–75ch. Set it explicitly. This is the single most common failure.
- Body line-height 1.6 minimum. Display line-height 1.1.
- Set real values. Do not accept Tailwind's defaults for `leading` and `tracking` on display type.
- Sentence case everywhere. `text-transform: uppercase` is permitted only on small labels in the credentials section.
- `font-family: system-ui` anywhere is a bug.

## Layout

- Mobile-first. One column until 768px.
- Credentials section is two-column on desktop, one on mobile.
- Generous vertical rhythm. Sections breathe. When in doubt, more space, not less.
- Max content width around 680px for prose. The hero is full-bleed. Nothing else is.
- Hairline rules between sections, not boxes around them.

## Motion

Subtle, not cinematic. Fredrik overruled the original almost-none proposal in July 2026 and asked for a livelier page. The current list:

- One-time reveals: 12px fade-up over 600ms, staggered 80 to 100ms, once per element, never re-triggered. The hidden state sits behind a `scripting: enabled` media query so the copy is always in the HTML and visible without JS.
- Link hover transitions at 150ms: color, opacity, and small icon transforms.
- The ambient aurora tint in the hero: two blurred blobs, low opacity, drifting on a 36s loop.
- Still banned: parallax, spring physics, bounce, marquees, anything that moves continuously inside the content column.
- Everything guarded by `prefers-reduced-motion`.

## Forbidden

- Skill bars, percentage ratings, star ratings, proficiency meters
- A second icon set. Icons come from `@phosphor-icons/react` (Fredrik's July 2026 call, replacing the old three-inline-SVGs rule), imported from `dist/ssr`, small, `aria-hidden`, always beside a text label. No icon-only buttons.
- A contact form. It's a mailto link.
- Testimonial sections, "as seen in," logo walls
- A blog. He has one, it's at mune.so/notes.
- Cookie banners. There's nothing to consent to. If analytics ship at all, it's Pirsch, cookieless, one script tag.
- Dark mode toggle. Pick light and commit.

## Accessibility

WCAG AA minimum, contrast checked against `--paper`, keyboard navigable, visible focus states that are not the browser default and not removed. The site owner ships accessibility audits into his repos. Do not make this the thing he finds.
