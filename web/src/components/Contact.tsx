import type { About } from "@/sanity/queries";

const linkClass =
  "text-accent underline decoration-1 underline-offset-4 transition-opacity duration-150 hover:opacity-70";

export function Contact({ about }: { about: About }) {
  return (
    <section id="contact" className="border-t border-rule">
      <div className="mx-auto w-full max-w-content px-6 py-20 md:py-24">
        <h2 className="font-display text-3xl font-normal leading-display tracking-display">
          Contact
        </h2>
        {about.status ? <p className="mt-10">{about.status}</p> : null}
        <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-2">
          {about.email ? (
            <li>
              <a className={linkClass} href={`mailto:${about.email}`}>
                {about.email}
              </a>
            </li>
          ) : null}
          {/* TODO: copy needed. The email in .claude/rules/ABOUT.md is an unresolved
              CONFIRM; the mailto renders once the email field is set in Sanity. */}
          {about.github ? (
            <li>
              <a className={linkClass} href={about.github} rel="noreferrer">
                GitHub
              </a>
            </li>
          ) : null}
          {about.linkedin ? (
            <li>
              <a className={linkClass} href={about.linkedin} rel="noreferrer">
                LinkedIn
              </a>
            </li>
          ) : null}
        </ul>
      </div>
    </section>
  );
}
