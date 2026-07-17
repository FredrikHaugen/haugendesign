import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { OtherProject } from "@/sanity/queries";
import { Reveal } from "./Reveal";

export function Other({ other }: { other: OtherProject[] }) {
  if (other.length === 0) return null;

  return (
    <section id="other" className="scroll-mt-20 border-t border-rule">
      <div className="mx-auto w-full max-w-6xl px-6 py-24 md:py-32 lg:grid lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <Reveal className="lg:sticky lg:top-24">
            <h2 className="section-heading font-display text-4xl font-light leading-display tracking-display md:text-5xl">
              Other
            </h2>
          </Reveal>
        </div>
        <div className="mt-10 lg:col-span-8 lg:mt-0">
          <Reveal delay={100}>
            <ul className="border-t border-rule">
              {other.map((item, index) => (
                <li key={item._id}>
                  <a
                    href={item.url}
                    target="_blank" rel="noopener noreferrer"
                    className="group flex items-baseline justify-between gap-6 border-b border-rule py-5 transition-colors duration-150 hover:text-accent"
                  >
                    <span className="flex items-baseline gap-5">
                      <span aria-hidden className="font-display text-sm italic text-ink-dim">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{item.title}</span>
                      <ArrowUpRight
                        aria-hidden
                        size={14}
                        className="self-center opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                      />
                    </span>
                    <span className="text-sm tabular-nums text-ink-dim">{item.year}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
