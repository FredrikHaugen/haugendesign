import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-newsreader",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://haugendesign.no"),
  title: {
    default: "Fredrik Haugen",
    template: "%s. Fredrik Haugen",
  },
  description: "I build things that hold private thoughts.",
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
