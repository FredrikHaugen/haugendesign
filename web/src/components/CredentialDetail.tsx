import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { PortableTextBlock } from "next-sanity";
import { LogoMark } from "./LogoMark";
import { PortableTextBody } from "./PortableTextBody";

// Shared layout for the /experience and /education subpages. Both render an
// entry from the about document: title, meta line, verbatim description,
// detail body, external link.
export function CredentialDetail({
  title,
  meta,
  description,
  detail,
  url,
}: {
  title: string;
  meta: string;
  description?: string | null;
  detail: PortableTextBlock[];
  url: string | null;
}) {
  const displayUrl = url ? url.replace(/^https?:\/\//, "").replace(/\/$/, "") : null;

  return (
    <>
      <header className="sticky top-0 z-10 border-b border-rule bg-paper">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="flex items-center gap-3 text-sm transition-opacity duration-150 hover:opacity-70"
          >
            <LogoMark className="h-5 text-ink" />
            <span>haugendesign</span>
          </Link>
          <Link
            href="/#credentials"
            className="group inline-flex items-center gap-2 text-sm text-ink-dim transition-colors duration-150 hover:text-ink"
          >
            <ArrowLeft
              aria-hidden
              size={14}
              className="transition-transform duration-150 group-hover:-translate-x-0.5"
            />
            Credentials
          </Link>
        </div>
      </header>
      <main id="main" className="mx-auto w-full max-w-6xl px-6 pb-24 pt-12 md:pt-16">
        <article>
          {/* Above the fold: CSS load animation (paints at first paint) rather
              than the IntersectionObserver Reveal, so the h1 is the LCP element
              and is not gated behind hydration. */}
          <p className="hero-rise border-b border-rule pb-5 text-xs uppercase tracking-widest text-ink-dim">
            {meta}
          </p>
          <h1 className="hero-rise-solid mt-10 font-display text-4xl font-light leading-display tracking-display md:text-6xl">
            {title}
          </h1>
          <div className="hero-rise mt-12 max-w-content" style={{ animationDelay: "100ms" }}>
            {description ? <p className="text-lg">{description}</p> : null}
            <div className={description ? "mt-8 text-ink-dim" : ""}>
              <PortableTextBody value={detail} />
            </div>
            {url && displayUrl ? (
              <p className="mt-10 border-t border-rule pt-6">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 text-accent transition-opacity duration-150 hover:opacity-70"
                >
                  <span className="underline decoration-1 underline-offset-4">{displayUrl}</span>
                  <ArrowUpRight
                    aria-hidden
                    size={16}
                    className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </p>
            ) : null}
          </div>
        </article>
      </main>
    </>
  );
}
