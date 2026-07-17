import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import { OWNER_NAME, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

// The hero heading (the LCP element) is set in Newsreader. "optional" lets it
// paint in the metric-matched fallback at first paint rather than blocking on
// the font download; adjustFontFallback (next/font default) keeps CLS at 0.
const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "optional",
  variable: "--font-newsreader",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const description = "I build things that hold private thoughts.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: OWNER_NAME,
    template: `%s. ${OWNER_NAME}`,
  },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    title: OWNER_NAME,
    description,
    locale: "en_US",
    images: [
      {
        url: "/og/home.jpg",
        width: 1200,
        height: 630,
        alt: "The haugendesign logo mark.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: OWNER_NAME,
    description,
    images: ["/og/home.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${newsreader.variable} ${inter.variable} antialiased`}>
      <body>
        {/* Lives in the layout, not the pages: Next focuses the new segment's
            first element on client navigation, and the skip link must not be it. */}
        <a
          href="#main"
          className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:left-6 focus-visible:top-6 focus-visible:z-20 focus-visible:bg-paper focus-visible:px-4 focus-visible:py-2"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
