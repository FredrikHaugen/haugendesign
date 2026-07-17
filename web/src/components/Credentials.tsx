import type { About } from "@/sanity/queries";
import { Reveal } from "./Reveal";

const labelClass = "text-xs uppercase tracking-widest text-ink-dim";

export function Credentials({ about }: { about: About }) {
  const hasWork = Boolean(about.work && about.work.length > 0);
  const hasEducation = Boolean(about.education && about.education.length > 0);
  const hasSkills = Boolean(about.skills && about.skills.length > 0);
  if (!hasWork && !hasEducation && !hasSkills) return null;

  return (
    <section id="credentials" className="scroll-mt-20 border-t border-rule">
      <div className="mx-auto w-full max-w-6xl px-6 py-24 md:py-32 lg:grid lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <Reveal className="lg:sticky lg:top-24">
            <h2 className="section-heading font-display text-4xl font-light leading-display tracking-display md:text-5xl">
              Credentials
            </h2>
          </Reveal>
        </div>
        <div className="mt-10 grid gap-14 md:grid-cols-2 lg:col-span-8 lg:mt-0">
          {hasWork ? (
            <Reveal>
              <h3 className={labelClass}>Work history</h3>
              <ul className="mt-6 divide-y divide-rule border-t border-rule">
                {about.work?.map((entry) => (
                  <li key={entry._key} className="py-6">
                    <p>{entry.role}</p>
                    <p className="mt-1 text-sm text-ink-dim">
                      {[entry.org, entry.location, entry.dates].filter(Boolean).join(" · ")}
                    </p>
                    {entry.description ? <p className="mt-2 text-sm">{entry.description}</p> : null}
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : null}
          <Reveal className="space-y-14" delay={100}>
            {hasEducation ? (
              <div>
                <h3 className={labelClass}>Education</h3>
                <ul className="mt-6 divide-y divide-rule border-t border-rule">
                  {about.education?.map((entry) => (
                    <li key={entry._key} className="py-5">
                      <p>{entry.degree}</p>
                      <p className="mt-1 text-sm text-ink-dim">
                        {[entry.institution, entry.years].filter(Boolean).join(" · ")}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {hasSkills ? (
              <div>
                <h3 className={labelClass}>Skills</h3>
                <dl className="mt-6 divide-y divide-rule border-t border-rule">
                  {about.skills?.map((group) => (
                    <div key={group._key} className="py-4">
                      <dt className="text-sm text-ink-dim">{group.category}</dt>
                      <dd className="mt-1">{group.items}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ) : null}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
