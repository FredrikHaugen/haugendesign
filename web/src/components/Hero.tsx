import Image from "next/image";
import type { About } from "@/sanity/queries";
import { Reveal } from "./Reveal";

export function Hero({ about }: { about: About }) {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="aurora-blob absolute -top-16 right-1/4 h-72 w-72 rounded-full bg-aurora-green opacity-40" />
        <div
          className="aurora-blob absolute top-24 right-12 h-64 w-64 rounded-full bg-aurora-violet opacity-40"
          style={{ animationDelay: "-18s" }}
        />
      </div>
      <div className="relative mx-auto w-full max-w-content px-6 pb-14 pt-8 md:pb-20 md:pt-12">
        <Reveal>
          <h1 className="font-display text-5xl font-light leading-display tracking-display md:text-6xl">
            {about.name}
          </h1>
        </Reveal>
        {about.oneLiner ? (
          <Reveal delay={100}>
            <p className="mt-6 text-lg">{about.oneLiner}</p>
          </Reveal>
        ) : null}
        {about.status ? (
          <Reveal delay={200}>
            <p className="mt-3 text-sm text-ink-dim">{about.status}</p>
          </Reveal>
        ) : null}
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
          <figcaption className="mx-auto w-full max-w-content px-6 pt-3 text-xs text-ink-dim">
            Photo and aurora composite: Fredrik Haugen, Blender.
          </figcaption>
        </figure>
      ) : null}
    </section>
  );
}
