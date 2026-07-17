import Image from "next/image";
import { ArrowDown } from "@phosphor-icons/react/dist/ssr";
import type { About } from "@/sanity/queries";

export function Hero({ about }: { about: About }) {
  const words = about.name.split(" ");

  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="aurora-blob absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-aurora-green opacity-40" />
        <div
          className="aurora-blob absolute top-40 right-8 h-80 w-80 rounded-full bg-aurora-violet opacity-40"
          style={{ animationDelay: "-18s" }}
        />
      </div>
      {/* The hero is above the fold, so it uses the CSS-only .hero-rise load
          animation rather than the IntersectionObserver Reveal: it paints at
          first paint instead of after hydration, which is what LCP measures. */}
      <div className="relative mx-auto w-full max-w-6xl px-6 pb-20 pt-10 md:pb-28 md:pt-14">
        {about.location ? (
          <p className="hero-rise border-b border-rule pb-5 text-xs uppercase tracking-widest text-ink-dim">
            {about.location}
          </p>
        ) : null}
        {/* The name is split across block spans for the two-line display.
            aria-label sets the accessible name so it is not read as one word;
            the spans are hidden from assistive tech to avoid a double read.
            The visible text stays in the DOM for indexing. */}
        <h1
          aria-label={about.name}
          className="mt-12 font-display font-light leading-display tracking-display md:mt-20"
        >
          {words.map((word, index) => (
            <span
              key={word}
              aria-hidden
              className={`hero-rise-solid block text-6xl sm:text-8xl lg:text-9xl ${
                index % 2 === 1 ? "pl-12 italic sm:pl-28 lg:pl-48" : ""
              }`}
              style={{ animationDelay: `${index * 140}ms` }}
            >
              {/* Trailing space so the indexed text content reads
                  "Fredrik Haugen", not one word. display:block hides it. */}
              {word}{" "}
            </span>
          ))}
        </h1>
        <div className="mt-14 flex flex-col gap-10 md:mt-24 md:flex-row md:items-end md:justify-between">
          <a
            href="#work"
            className="hero-rise group order-2 inline-flex items-center gap-2 text-sm text-accent transition-opacity duration-150 hover:opacity-70 md:order-1"
            style={{ animationDelay: "400ms" }}
          >
            <ArrowDown
              aria-hidden
              size={16}
              className="transition-transform duration-150 group-hover:translate-y-0.5"
            />
            <span className="underline decoration-1 underline-offset-4">Work</span>
          </a>
          <div className="order-1 max-w-xl md:order-2">
            {about.oneLiner ? (
              <p className="hero-rise text-xl md:text-2xl" style={{ animationDelay: "250ms" }}>
                {about.oneLiner}
              </p>
            ) : null}
            {about.status ? (
              <p
                className="hero-rise mt-4 text-sm text-ink-dim"
                style={{ animationDelay: "350ms" }}
              >
                {about.status}
              </p>
            ) : null}
          </div>
        </div>
      </div>
      {/* TODO: hero photograph needed at web/public/hero.jpg. The figure
          renders once the file exists and the site is rebuilt. */}
      {process.env.NEXT_PUBLIC_HAS_HERO === "1" ? (
        <figure className="relative">
          <div className="relative aspect-3/2 w-full">
            <Image
              src="/hero.jpg"
              alt="Fredrik Haugen at a frozen lake, aurora composited in Blender."
              fill
              preload
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="mx-auto w-full max-w-6xl px-6 pt-3 text-xs text-ink-dim">
            Photo and aurora composite: Fredrik Haugen, Blender.
          </figcaption>
        </figure>
      ) : null}
    </section>
  );
}
