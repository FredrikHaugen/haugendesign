import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { OtherProject } from "@/sanity/queries";
import { Reveal } from "./Reveal";

export function Other({ other }: { other: OtherProject[] }) {
  if (other.length === 0) return null;

  return (
    <section id="other" className="border-t border-rule">
      <div className="mx-auto w-full max-w-content px-6 py-20 md:py-24">
        <Reveal>
          <h2 className="section-heading font-display text-3xl font-normal leading-display tracking-display">
            Other
          </h2>
          <ul className="mt-10 space-y-3">
            {other.map((item) => (
              <li key={item._id} className="flex items-baseline justify-between gap-6">
                <a
                  href={item.url}
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1 text-accent transition-opacity duration-150 hover:opacity-70"
                >
                  <span className="underline decoration-1 underline-offset-4">{item.title}</span>
                  <ArrowUpRight
                    aria-hidden
                    size={14}
                    className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
                <span className="text-sm text-ink-dim">{item.year}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
