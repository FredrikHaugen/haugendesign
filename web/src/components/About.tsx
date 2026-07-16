import type { About as AboutData } from "@/sanity/queries";
import { PortableTextBody } from "./PortableTextBody";

export function About({ about }: { about: AboutData }) {
  if (!about.longBio || about.longBio.length === 0) return null;

  return (
    <section id="about" className="border-t border-rule">
      <div className="mx-auto w-full max-w-content px-6 py-20 md:py-24">
        <h2 className="font-display text-3xl font-normal leading-display tracking-display">
          About
        </h2>
        <div className="mt-10">
          <PortableTextBody value={about.longBio} />
        </div>
      </div>
    </section>
  );
}
