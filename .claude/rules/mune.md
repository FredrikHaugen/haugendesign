# Mune

> Portfolio copy for haugendesign.no. Extracted from the internal `MUNE.md`. Nothing here may be rewritten or expanded by a coding agent.
>
> **BLOCKER: see the ZDR note at the bottom before this ships.**

## Slug

`mune`

## Card

**Mune**
An end-to-end encrypted app for thinking out loud. Chat, and a journal attached to it. The server holds a blob it can't read.

Tags: `Next.js 16` `TypeScript` `Supabase` `Clerk` `Claude API` `Web Crypto` `Turborepo` `Expo`

Link: https://mune.so

## Detail page

Mune is a chat-first, end-to-end encrypted app for private reflection, with an encrypted journal attached. You talk to an AI that has no name, no persona, and no character. It listens, asks one question at a time or none, and stops. It does not perform empathy at you.

I built it because I kept writing things in Apple Notes at 2am and deleting them before morning.

Everything is encrypted in the browser before it touches a network. The database stores ciphertext and an IV. There are three keys: a data key that encrypts content, a key derived from your passphrase that wraps the data key, and a second one derived from a 24-word recovery phrase that wraps a second copy. The server never holds any of them. Changing your passphrase rewraps one key instead of re-encrypting every row.

Privacy, not as a promise, but as architecture.

I'm building it alone. Architecture, product, design, copy, the encryption layer, the mobile client, the words on the marketing site. Pre-alpha, waitlist open.

[CONFIRM: one sentence here about what's hard about it, in your words. Right now this reads like it went well. It didn't. That's more interesting than the spec.]

### Stack

Next.js 16 (App Router), React 19, TypeScript strict, Tailwind v4. Supabase with RLS on every user-scoped table. Clerk for auth. Claude API through server-side route handlers, never the client. Web Crypto: AES-256-GCM for content, AES-KW for wrapping, PBKDF2 for derivation, BIP39 for recovery. Turborepo monorepo with a shared crypto package used by both web and an Expo iOS client.

---

## Claim check before publishing

- **The ZDR sentence.** Do not publish any wording that says content is "processed under a zero-data-retention agreement" until that agreement is executed with Anthropic. If it isn't signed yet, the honest version is: "Chat content is decrypted only in flight, inside a single server request, and never logged or stored." That's true today and it's still a strong claim. Add the ZDR line the day it's real.
- **Account deletion.** `MUNE.md` says a deletion endpoint exists. It doesn't say deletion cascades to journal and chat rows, because last I knew it didn't. Say nothing about deletion on the portfolio until it does.
- **"Free at the core, paid for what scales."** Not "free." Not "completely free."
- Never: "understands you," "your AI companion," "100% secure," "your data never leaves your device," any therapeutic claim.

## Do not publish (from the internal doc)

- Section 4.8, the red lines list
- Section 12, the gotcha layer, especially the `requesting_user_id()` migration gap
- Any env var name, table name, file path, or `sessionStorage` key
- Section 3's competitor comparison (Day One, Rosebud, Replika)
- "No competitor credibly delivers" — superlative without evidence, banned by your own TOV
