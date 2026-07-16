import type { OtherProject } from "@/sanity/queries";

export function Other({ other }: { other: OtherProject[] }) {
  if (other.length === 0) return null;

  return (
    <section id="other" className="border-t border-rule">
      <div className="mx-auto w-full max-w-content px-6 py-20 md:py-24">
        <h2 className="font-display text-3xl font-normal leading-display tracking-display">
          Other
        </h2>
        <ul className="mt-10 space-y-3">
          {other.map((item) => (
            <li key={item._id} className="flex items-baseline justify-between gap-6">
              <a
                href={item.url}
                rel="noreferrer"
                className="text-accent underline decoration-1 underline-offset-4 transition-opacity duration-150 hover:opacity-70"
              >
                {item.title}
              </a>
              <span className="text-sm text-ink-dim">{item.year}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
