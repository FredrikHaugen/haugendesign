import type { About as AboutData } from "@/sanity/queries";
import { PortableTextBody } from "./PortableTextBody";
import { Reveal } from "./Reveal";

export function About({ about }: { about: AboutData }) {
  if (!about.longBio || about.longBio.length === 0) return null;

  return (
    <section id="about" className="scroll-mt-20 border-t border-rule">
      <div className="mx-auto w-full max-w-6xl px-6 py-24 md:py-32 lg:grid lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <Reveal className="lg:sticky lg:top-24">
            <h2 className="section-heading font-display text-4xl font-light leading-display tracking-display md:text-5xl">
              About
            </h2>
          </Reveal>
        </div>
        <div className="mt-10 lg:col-span-8 lg:mt-0">
          <Reveal delay={100}>
            <div className="body-lead max-w-content">
              <PortableTextBody value={about.longBio} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
