import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/sanity/client";
import { DETAIL_SLUGS_QUERY, PROJECT_QUERY, type ProjectDetail } from "@/sanity/queries";
import { PortableTextBody } from "@/components/PortableTextBody";

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

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-6 focus:bg-paper focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <header className="mx-auto w-full max-w-content px-6">
        <nav className="py-6 text-sm">
          <Link href="/" className="text-ink-dim transition-colors duration-150 hover:text-ink">
            Fredrik Haugen
          </Link>
        </nav>
      </header>
      <main id="main" className="mx-auto w-full max-w-content px-6 pb-24 pt-10 md:pt-14">
        <article>
          <h1 className="font-display text-4xl font-light leading-display tracking-display md:text-5xl">
            {project.title}
          </h1>
          <div className="mt-10">
            <PortableTextBody value={project.detail} />
          </div>
          {project.stack ? (
            <>
              <h2 className="mt-14 font-display text-2xl font-normal leading-display tracking-display">
                Stack
              </h2>
              <p className="mt-5">{project.stack}</p>
            </>
          ) : null}
          <p className="mt-14">
            <a
              href={project.url}
              rel="noreferrer"
              className="text-accent underline decoration-1 underline-offset-4 transition-opacity duration-150 hover:opacity-70"
            >
              {displayUrl}
            </a>
          </p>
        </article>
      </main>
    </>
  );
}
