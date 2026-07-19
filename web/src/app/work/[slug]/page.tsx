import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  InstagramLogo,
  ThreadsLogo,
  XLogo,
} from "@phosphor-icons/react/dist/ssr";
import { client } from "@/sanity/client";
import { DETAIL_SLUGS_QUERY, PROJECT_QUERY, type ProjectDetail } from "@/sanity/queries";
import { JsonLd } from "@/components/JsonLd";
import { LogoMark } from "@/components/LogoMark";
import { PortableTextBody } from "@/components/PortableTextBody";
import { projectMedia, projectOgImage } from "@/components/projectMedia";
import { Reveal } from "@/components/Reveal";
import { clampSentences, OG_FALLBACK_IMAGE } from "@/lib/seo";
import { OWNER_NAME, SITE_NAME, SITE_URL } from "@/lib/site";

const options = { next: { revalidate: 3600 } };

export async function generateStaticParams() {
  const slugs = await client.withConfig({ useCdn: false }).fetch<string[]>(DETAIL_SLUGS_QUERY);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await client.fetch<ProjectDetail | null>(PROJECT_QUERY, { slug }, options);
  if (!project) return {};
  const og = projectOgImage[slug];
  const description = clampSentences(project.card);
  return {
    title: project.title,
    description,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      type: "website",
      url: `/work/${slug}`,
      siteName: SITE_NAME,
      title: project.title,
      description,
      images: og ? [{ url: og.url, width: 1200, height: 630, alt: og.alt }] : [OG_FALLBACK_IMAGE],
    },
    twitter: {
      card: og ? "summary_large_image" : "summary",
      title: project.title,
      description,
      images: og ? [og.url] : undefined,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await client.fetch<ProjectDetail | null>(PROJECT_QUERY, { slug }, options);
  if (!project) notFound();

  const displayUrl = project.url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const [heroImage, ...moreImages] = projectMedia[slug] ?? [];

  // The product's own social accounts, not personal ones.
  const socials = [
    { href: project.instagram, label: "Instagram", Icon: InstagramLogo },
    { href: project.threads, label: "Threads", Icon: ThreadsLogo },
    { href: project.x, label: "X", Icon: XLogo },
  ].filter((account): account is { href: string; label: string; Icon: typeof XLogo } =>
    Boolean(account.href)
  );
  const sameAs = [project.url, project.instagram, project.threads, project.x].filter(Boolean);

  const externalLink = (
    <a
      href={project.url}
      target="_blank" rel="noopener noreferrer"
      className="group inline-flex items-center gap-1 text-accent transition-opacity duration-150 hover:opacity-70"
    >
      <span className="underline decoration-1 underline-offset-4">{displayUrl}</span>
      <ArrowUpRight
        aria-hidden
        size={16}
        className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </a>
  );

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CreativeWork",
              "@id": `${SITE_URL}/work/${slug}#work`,
              name: project.title,
              description: project.card,
              url: `${SITE_URL}/work/${slug}`,
              sameAs,
              image: projectOgImage[slug]
                ? `${SITE_URL}${projectOgImage[slug].url}`
                : undefined,
              author: {
                "@type": "Person",
                "@id": `${SITE_URL}/#person`,
                name: OWNER_NAME,
                url: SITE_URL,
              },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: SITE_NAME, item: SITE_URL },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: project.title,
                  item: `${SITE_URL}/work/${slug}`,
                },
              ],
            },
          ],
        }}
      />
      <header className="sticky top-0 z-10 border-b border-rule bg-paper">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="flex items-center gap-3 text-sm transition-opacity duration-150 hover:opacity-70"
          >
            <LogoMark className="h-5 text-ink" />
            <span>haugendesign</span>
          </Link>
          <Link
            href="/#work"
            className="group inline-flex items-center gap-2 text-sm text-ink-dim transition-colors duration-150 hover:text-ink"
          >
            <ArrowLeft
              aria-hidden
              size={14}
              className="transition-transform duration-150 group-hover:-translate-x-0.5"
            />
            Work
          </Link>
        </div>
      </header>
      <main id="main" className="mx-auto w-full max-w-6xl px-6 pb-24 pt-12 md:pt-16">
        <article>
          {/* Above the fold: CSS .hero-rise load animation, not the IO Reveal,
              so the title and hero image (the LCP element) paint at first
              paint. Below-fold blocks keep the scroll-triggered Reveal. */}
          <h1 className="hero-rise font-display text-5xl font-light leading-display tracking-display md:text-7xl">
            {project.title}
          </h1>
          {heroImage ? (
            <div
              className="hero-rise mt-12 border border-rule"
              style={{ animationDelay: "150ms" }}
            >
              <Image
                src={heroImage.src}
                alt={heroImage.alt}
                preload
                placeholder="blur"
                sizes="(min-width: 1152px) 72rem, 100vw"
                className="h-auto w-full"
              />
            </div>
          ) : null}
          <div className="mt-14 lg:grid lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              {/* Above-the-fold body is the LCP on image-light projects, so it
                  uses the CSS load animation instead of the JS-gated Reveal. */}
              <div className="hero-rise body-lead max-w-content">
                <PortableTextBody value={project.detail} />
              </div>
            </div>
            <aside className="mt-14 lg:col-span-4 lg:col-start-9 lg:mt-0">
              <Reveal delay={100} className="lg:sticky lg:top-24">
                {project.stack ? (
                  <>
                    <h2 className="section-heading font-display text-2xl font-normal leading-display tracking-display">
                      Stack
                    </h2>
                    <p className="mt-5 text-sm">{project.stack}</p>
                  </>
                ) : null}
                <p className="mt-10">{externalLink}</p>
                {socials.length > 0 ? (
                  <div className="mt-10 border-t border-rule pt-6">
                    <h2 className="text-sm text-ink-dim">{project.title} accounts</h2>
                    <ul className="mt-4 space-y-2">
                      {socials.map(({ href, label, Icon }) => (
                        <li key={label}>
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 text-accent transition-opacity duration-150 hover:opacity-70"
                          >
                            <Icon aria-hidden size={16} />
                            <span className="underline decoration-1 underline-offset-4">
                              {label}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </Reveal>
            </aside>
          </div>
          {moreImages.map((image) => (
            <Reveal key={image.src.src} className="mt-16">
              <div className="media-reveal border border-rule">
                <Image
                  src={image.src}
                  alt={image.alt}
                  placeholder="blur"
                  sizes="(min-width: 1152px) 72rem, 100vw"
                  className="h-auto w-full"
                />
              </div>
            </Reveal>
          ))}
        </article>
      </main>
    </>
  );
}
