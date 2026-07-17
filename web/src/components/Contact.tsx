import {
  EnvelopeSimple,
  GithubLogo,
  InstagramLogo,
  LinkedinLogo,
  ThreadsLogo,
  XLogo,
} from "@phosphor-icons/react/dist/ssr";
import type { About } from "@/sanity/queries";
import { Reveal } from "./Reveal";

const linkClass =
  "inline-flex items-center gap-2 text-accent transition-opacity duration-150 hover:opacity-70";
const labelClass = "underline decoration-1 underline-offset-4";

export function Contact({ about }: { about: About }) {
  return (
    <section id="contact" className="scroll-mt-20 border-t border-rule">
      <div className="mx-auto w-full max-w-6xl px-6 py-24 md:py-32">
        <Reveal>
          <h2 className="section-heading font-display text-4xl font-light leading-display tracking-display md:text-5xl">
            Contact
          </h2>
        </Reveal>
        {about.status ? (
          <Reveal delay={100}>
            <p className="mt-12 max-w-3xl font-display text-3xl font-light leading-display tracking-display md:text-5xl">
              {about.status}
            </p>
          </Reveal>
        ) : null}
        <Reveal delay={200}>
          <ul className="mt-14 flex flex-wrap gap-x-10 gap-y-4 border-t border-rule pt-8">
            {about.email ? (
              <li>
                <a className={linkClass} href={`mailto:${about.email}`}>
                  <EnvelopeSimple aria-hidden size={18} />
                  <span className={labelClass}>{about.email}</span>
                </a>
              </li>
            ) : null}
            {about.github ? (
              <li>
                <a className={linkClass} href={about.github} target="_blank" rel="noopener noreferrer">
                  <GithubLogo aria-hidden size={18} />
                  <span className={labelClass}>GitHub</span>
                </a>
              </li>
            ) : null}
            {about.linkedin ? (
              <li>
                <a className={linkClass} href={about.linkedin} target="_blank" rel="noopener noreferrer">
                  <LinkedinLogo aria-hidden size={18} />
                  <span className={labelClass}>LinkedIn</span>
                </a>
              </li>
            ) : null}
            {about.instagram ? (
              <li>
                <a className={linkClass} href={about.instagram} target="_blank" rel="noopener noreferrer">
                  <InstagramLogo aria-hidden size={18} />
                  <span className={labelClass}>Instagram</span>
                </a>
              </li>
            ) : null}
            {about.threads ? (
              <li>
                <a className={linkClass} href={about.threads} target="_blank" rel="noopener noreferrer">
                  <ThreadsLogo aria-hidden size={18} />
                  <span className={labelClass}>Threads</span>
                </a>
              </li>
            ) : null}
            {about.x ? (
              <li>
                <a className={linkClass} href={about.x} target="_blank" rel="noopener noreferrer">
                  <XLogo aria-hidden size={18} />
                  <span className={labelClass}>X</span>
                </a>
              </li>
            ) : null}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
