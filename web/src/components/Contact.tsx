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
    <section id="contact" className="border-t border-rule">
      <div className="mx-auto w-full max-w-content px-6 py-20 md:py-24">
        <Reveal>
          <h2 className="section-heading font-display text-3xl font-normal leading-display tracking-display">
            Contact
          </h2>
          {about.status ? <p className="mt-10">{about.status}</p> : null}
          <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            {about.email ? (
              <li>
                <a className={linkClass} href={`mailto:${about.email}`}>
                  <EnvelopeSimple aria-hidden size={18} />
                  <span className={labelClass}>{about.email}</span>
                </a>
              </li>
            ) : null}
            {/* TODO: copy needed. The email in .claude/rules/ABOUT.md is an unresolved
                CONFIRM; the mailto renders once the email field is set in Sanity. */}
            {about.github ? (
              <li>
                <a className={linkClass} href={about.github} rel="noreferrer">
                  <GithubLogo aria-hidden size={18} />
                  <span className={labelClass}>GitHub</span>
                </a>
              </li>
            ) : null}
            {about.linkedin ? (
              <li>
                <a className={linkClass} href={about.linkedin} rel="noreferrer">
                  <LinkedinLogo aria-hidden size={18} />
                  <span className={labelClass}>LinkedIn</span>
                </a>
              </li>
            ) : null}
            {about.instagram ? (
              <li>
                <a className={linkClass} href={about.instagram} rel="noreferrer">
                  <InstagramLogo aria-hidden size={18} />
                  <span className={labelClass}>Instagram</span>
                </a>
              </li>
            ) : null}
            {about.threads ? (
              <li>
                <a className={linkClass} href={about.threads} rel="noreferrer">
                  <ThreadsLogo aria-hidden size={18} />
                  <span className={labelClass}>Threads</span>
                </a>
              </li>
            ) : null}
            {about.x ? (
              <li>
                <a className={linkClass} href={about.x} rel="noreferrer">
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
