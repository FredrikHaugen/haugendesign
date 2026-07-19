import type { PortableTextBlock } from "next-sanity";

// Share-card fallback for pages without their own OG crop. Nested `openGraph`
// objects replace the layout's wholesale (Next merges metadata shallowly), so
// pages that set og:title/og:url must re-attach an image themselves.
export const OG_FALLBACK_IMAGE = {
  url: "/og/home.jpg",
  width: 1200,
  height: 630,
  alt: "The haugendesign logo mark.",
};

// Meta descriptions are verbatim Sanity copy (see .claude/rules/tov.md).
// Keep whole leading sentences and stop before the one that would push past
// `max`, so SERP snippets never cut mid-clause. A single overlong sentence is
// returned untouched rather than butchered.
export function clampSentences(text: string, max = 160): string {
  if (text.length <= max) return text;
  let out = "";
  for (const sentence of text.split(/(?<=\.)\s+/)) {
    const next = out ? `${out} ${sentence}` : sentence;
    if (next.length > max) break;
    out = next;
  }
  return out || text;
}

export function blockText(block: PortableTextBlock | undefined): string | null {
  const text = (block?.children ?? [])
    .map((child) => (typeof child.text === "string" ? child.text : ""))
    .join("");
  return text || null;
}
