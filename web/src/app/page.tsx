import Link from "next/link";
import { client } from "@/sanity/client";
import { HOME_QUERY, type HomeData } from "@/sanity/queries";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Credentials } from "@/components/Credentials";
import { Hero } from "@/components/Hero";
import { LogoMark } from "@/components/LogoMark";
import { Other } from "@/components/Other";
import { Work } from "@/components/Work";

const options = { next: { revalidate: 3600 } };

const navLinkClass = "transition-colors duration-150 hover:text-ink";

export default async function HomePage() {
  const { about, projects, other } = await client.fetch<HomeData>(HOME_QUERY, {}, options);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-6 focus:z-20 focus:bg-paper focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-10 border-b border-rule bg-paper">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="flex items-center gap-3 text-sm transition-opacity duration-150 hover:opacity-70"
          >
            <LogoMark className="h-5 text-ink" />
            {about ? <span>{about.name}</span> : null}
          </Link>
          <nav className="flex gap-6 text-sm text-ink-dim">
            <a href="#work" className={navLinkClass}>
              Work
            </a>
            <a href="#about" className={navLinkClass}>
              About
            </a>
            <a href="#contact" className={navLinkClass}>
              Contact
            </a>
          </nav>
        </div>
      </header>
      <main id="main">
        {about ? <Hero about={about} /> : null}
        <Work projects={projects} />
        {about ? <About about={about} /> : null}
        <Other other={other} />
        {about ? <Credentials about={about} /> : null}
        {about ? <Contact about={about} /> : null}
      </main>
      <footer className="border-t border-rule">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-10 text-sm text-ink-dim">
          <p className="flex items-center gap-3">
            <LogoMark className="h-4" />
            {about ? <span>{about.name}</span> : null}
          </p>
          {about?.location ? <p>{about.location}</p> : null}
        </div>
      </footer>
    </>
  );
}
