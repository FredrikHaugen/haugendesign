import Image from "next/image";
import { ArrowDown } from "@phosphor-icons/react/dist/ssr";
import type { About } from "@/sanity/queries";
import { Reveal } from "./Reveal";

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
      <div className="relative mx-auto w-full max-w-6xl px-6 pb-20 pt-10 md:pb-28 md:pt-14">
        {about.location ? (
          <Reveal>
            <p className="border-b border-rule pb-5 text-xs uppercase tracking-widest text-ink-dim">
              {about.location}
            </p>
          </Reveal>
        ) : null}
        <Reveal className="mt-12 md:mt-20">
          <h1 className="font-display font-light leading-display tracking-display">
            {words.map((word, index) => (
              <span
                key={word}
                className={`reveal-child block text-6xl sm:text-8xl lg:text-9xl ${
                  index % 2 === 1 ? "pl-12 italic sm:pl-28 lg:pl-48" : ""
                }`}
                style={index ? { transitionDelay: `${index * 140}ms` } : undefined}
              >
                {word}
              </span>
            ))}
          </h1>
        </Reveal>
        <div className="mt-14 flex flex-col gap-10 md:mt-24 md:flex-row md:items-end md:justify-between">
          <Reveal delay={400} className="order-2 md:order-1">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 text-sm text-accent transition-opacity duration-150 hover:opacity-70"
            >
              <ArrowDown
                aria-hidden
                size={16}
                className="transition-transform duration-150 group-hover:translate-y-0.5"
              />
              <span className="underline decoration-1 underline-offset-4">Work</span>
            </a>
          </Reveal>
          <div className="order-1 max-w-xl md:order-2">
            {about.oneLiner ? (
              <Reveal delay={250}>
                <p className="text-xl md:text-2xl">{about.oneLiner}</p>
              </Reveal>
            ) : null}
            {about.status ? (
              <Reveal delay={350}>
                <p className="mt-4 text-sm text-ink-dim">{about.status}</p>
              </Reveal>
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
