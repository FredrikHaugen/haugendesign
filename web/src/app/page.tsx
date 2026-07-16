import { client } from "@/sanity/client";
import { HOME_QUERY, type HomeData } from "@/sanity/queries";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Credentials } from "@/components/Credentials";
import { Hero } from "@/components/Hero";
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
        className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-6 focus:bg-paper focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <header className="mx-auto w-full max-w-content px-6">
        <nav className="flex justify-end gap-6 py-6 text-sm text-ink-dim">
          <a href="#about" className={navLinkClass}>
            About
          </a>
          <a href="#work" className={navLinkClass}>
            Work
          </a>
          <a href="#contact" className={navLinkClass}>
            Contact
          </a>
        </nav>
      </header>
      <main id="main">
        {about ? <Hero about={about} /> : null}
        {about ? <About about={about} /> : null}
        <Work projects={projects} />
        <Other other={other} />
        {about ? <Credentials about={about} /> : null}
        {about ? <Contact about={about} /> : null}
      </main>
    </>
  );
}
