import Image from "next/image";
import type { About } from "@/sanity/queries";

export function Hero({ about }: { about: About }) {
  return (
    <section>
      <div className="mx-auto w-full max-w-content px-6 pb-14 pt-8 md:pb-20 md:pt-12">
        <h1 className="font-display text-5xl font-light leading-display tracking-display md:text-6xl">
          {about.name}
        </h1>
        {about.oneLiner ? <p className="mt-6 text-lg">{about.oneLiner}</p> : null}
        {about.status ? <p className="mt-3 text-sm text-ink-dim">{about.status}</p> : null}
      </div>
      {/* TODO: hero photograph needed at web/public/hero.jpg. The figure
          renders once the file exists and the site is rebuilt. */}
      {process.env.NEXT_PUBLIC_HAS_HERO === "1" ? (
        <figure>
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
