import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/image";
import type { ProjectCard } from "@/sanity/queries";

const titleLinkClass = "text-accent transition-opacity duration-150 hover:opacity-70";

export function Work({ projects }: { projects: ProjectCard[] }) {
  if (projects.length === 0) return null;

  return (
    <section id="work" className="border-t border-rule">
      <div className="mx-auto w-full max-w-content px-6 py-20 md:py-24">
        <h2 className="font-display text-3xl font-normal leading-display tracking-display">
          Work
        </h2>
        <div className="mt-10 divide-y divide-rule">
          {projects.map((project) => (
            <article key={project._id} className="py-10 first:pt-0 last:pb-0">
              <h3 className="font-display text-2xl font-normal leading-display tracking-display">
                {project.hasDetail ? (
                  <Link href={`/work/${project.slug}`} className={titleLinkClass}>
                    {project.title}
                  </Link>
                ) : (
                  <a href={project.url} rel="noreferrer" className={titleLinkClass}>
                    {project.title}
                  </a>
                )}
              </h3>
              {project.screenshot?.asset ? (
                <Image
                  src={urlFor({ ...project.screenshot, asset: project.screenshot.asset })
                    .width(1360)
                    .height(906)
                    .fit("crop")
                    .url()}
                  alt={project.screenshot.alt ?? ""}
                  width={1360}
                  height={906}
                  sizes="(min-width: 768px) 42.5rem, 100vw"
                  className="mt-6 h-auto w-full"
                />
              ) : null}
              <p className="mt-4">{project.card}</p>
              {project.tags && project.tags.length > 0 ? (
                <p className="mt-4 text-sm text-ink-dim">{project.tags.join(" · ")}</p>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
