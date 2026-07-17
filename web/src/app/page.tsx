import Link from "next/link";
import { client } from "@/sanity/client";
import { HOME_QUERY, type About as AboutData, type HomeData } from "@/sanity/queries";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Credentials } from "@/components/Credentials";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { LogoMark } from "@/components/LogoMark";
import { Other } from "@/components/Other";
import { Work } from "@/components/Work";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const options = { next: { revalidate: 3600 } };

// inline-flex + py-1 gives each link a >=24px tap target (WCAG 2.5.8);
// -my-1 keeps the header's visual height unchanged.
const navLinkClass =
  "inline-flex items-center -my-1 py-1 transition-colors duration-150 hover:text-ink";

function personJsonLd(about: AboutData) {
  const institutions = [
    ...new Set(about.education?.map((entry) => entry.institution).filter(Boolean)),
  ] as string[];
  return {
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: about.name,
    url: SITE_URL,
    description: about.shortBio ?? undefined,
    jobTitle: about.work?.[0]?.role,
    email: about.email ? `mailto:${about.email}` : undefined,
    address: about.location ?? undefined,
    sameAs: [about.github, about.linkedin].filter(Boolean),
    knowsAbout: about.skills?.flatMap((group) => group.items?.split(", ") ?? []),
    worksFor: about.work
      ?.filter((entry) => entry.dates?.includes("Present"))
      .map((entry) => ({ "@type": "Organization", name: entry.org })),
    alumniOf: institutions.map((name) => ({
      "@type": "EducationalOrganization",
      name,
    })),
  };
}

export default async function HomePage() {
  const { about, projects, other } = await client.fetch<HomeData>(HOME_QUERY, {}, options);

  return (
    <>
      {about ? (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "ProfilePage",
                "@id": `${SITE_URL}/#page`,
                url: SITE_URL,
                name: about.name,
                mainEntity: personJsonLd(about),
              },
              {
                "@type": "WebSite",
                "@id": `${SITE_URL}/#website`,
                url: SITE_URL,
                name: SITE_NAME,
                publisher: { "@id": `${SITE_URL}/#person` },
              },
            ],
          }}
        />
      ) : null}
      <header className="sticky top-0 z-10 border-b border-rule bg-paper">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            aria-label="haugendesign, home"
            className="flex items-center gap-3 text-sm transition-opacity duration-150 hover:opacity-70"
          >
            <LogoMark className="h-5 text-ink" />
            {/* Wordmark hidden below sm so the four nav items fit on one line
                instead of wrapping into a block; the logo mark still brands it.
                The link's name comes from aria-label so it survives the hide. */}
            <span className="hidden sm:inline">haugendesign</span>
          </Link>
          <nav className="flex gap-5 text-sm text-ink-dim sm:gap-6">
            <a href="#work" className={navLinkClass}>
              Work
            </a>
            <a href="#about" className={navLinkClass}>
              About
            </a>
            <a href="#credentials" className={navLinkClass}>
              Credentials
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
            <span>haugendesign</span>
          </p>
          {about?.location ? <p>{about.location}</p> : null}
        </div>
      </footer>
    </>
  );
}
