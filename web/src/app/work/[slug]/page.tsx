import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { client } from "@/sanity/client";
import { DETAIL_SLUGS_QUERY, PROJECT_QUERY, type ProjectDetail } from "@/sanity/queries";
import { LogoMark } from "@/components/LogoMark";
import { PortableTextBody } from "@/components/PortableTextBody";
import { projectMedia } from "@/components/projectMedia";
import { Reveal } from "@/components/Reveal";

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
  return { title: project.title, description: project.card };
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

  const externalLink = (
    <a
      href={project.url}
      rel="noreferrer"
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
          <Reveal>
            <h1 className="font-display text-5xl font-light leading-display tracking-display md:text-7xl">
              {project.title}
            </h1>
          </Reveal>
          {heroImage ? (
            <Reveal className="mt-12" delay={150}>
              <div className="media-reveal border border-rule">
                <Image
                  src={heroImage.src}
                  alt={heroImage.alt}
                  preload
                  placeholder="blur"
                  sizes="(min-width: 1152px) 72rem, 100vw"
                  className="h-auto w-full"
                />
              </div>
            </Reveal>
          ) : null}
          <div className="mt-14 lg:grid lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <Reveal>
                <div className="body-lead max-w-content">
                  <PortableTextBody value={project.detail} />
                </div>
              </Reveal>
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
