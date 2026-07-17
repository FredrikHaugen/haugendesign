import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { urlFor } from "@/sanity/image";
import type { ProjectCard } from "@/sanity/queries";
import { projectMedia } from "./projectMedia";
import { Reveal } from "./Reveal";
import { TagList } from "./TagList";

const titleLinkClass =
  "group inline-flex items-baseline gap-2 text-accent transition-opacity duration-150 hover:opacity-70";
const mediaLinkClass = "media-zoom block overflow-hidden border border-rule";

function ProjectImage({ project }: { project: ProjectCard }) {
  const local = projectMedia[project.slug]?.[0];
  if (local) {
    return (
      <Image
        src={local.src}
        alt={local.alt}
        placeholder="blur"
        sizes="(min-width: 1024px) 56vw, calc(100vw - 3rem)"
        className="h-auto w-full"
      />
    );
  }
  if (project.screenshot?.asset) {
    return (
      <Image
        src={urlFor({ ...project.screenshot, asset: project.screenshot.asset })
          .width(1360)
          .height(906)
          .fit("crop")
          .url()}
        alt={project.screenshot.alt ?? ""}
        width={1360}
        height={906}
        sizes="(min-width: 1024px) 56vw, calc(100vw - 3rem)"
        className="h-auto w-full"
      />
    );
  }
  return null;
}

export function Work({ projects }: { projects: ProjectCard[] }) {
  if (projects.length === 0) return null;

  return (
    <section id="work" className="scroll-mt-20 border-t border-rule">
      <div className="mx-auto w-full max-w-6xl px-6 py-24 md:py-32">
        <Reveal>
          <h2 className="section-heading font-display text-4xl font-light leading-display tracking-display md:text-5xl">
            Work
          </h2>
        </Reveal>
        <div className="mt-16 space-y-24 md:mt-20 md:space-y-36">
          {projects.map((project, index) => {
            const hasImage = Boolean(projectMedia[project.slug]?.[0] || project.screenshot?.asset);
            const flipped = index % 2 === 1;
            const number = String(index + 1).padStart(2, "0");
            const displayUrl = project.url.replace(/^https?:\/\//, "").replace(/\/$/, "");

            return (
              <Reveal key={project._id}>
                <article className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12 lg:gap-12">
                  {hasImage ? (
                    <div
                      className={`media-reveal lg:col-span-7 ${flipped ? "lg:order-2" : ""}`}
                    >
                      {project.hasDetail ? (
                        <Link href={`/work/${project.slug}`} className={mediaLinkClass}>
                          <ProjectImage project={project} />
                        </Link>
                      ) : (
                        <a href={project.url} target="_blank" rel="noopener noreferrer" className={mediaLinkClass}>
                          <ProjectImage project={project} />
                        </a>
                      )}
                    </div>
                  ) : null}
                  <div
                    className={`${hasImage ? "lg:col-span-5" : "lg:col-span-8"} ${
                      flipped ? "lg:order-1" : ""
                    }`}
                  >
                    <p className="flex items-baseline justify-between font-display text-lg italic text-ink-dim">
                      <span aria-hidden>{number}</span>
                      {project.year ? <span className="tabular-nums">{project.year}</span> : null}
                    </p>
                    <h3 className="mt-4 border-t border-rule pt-5 font-display text-3xl font-normal leading-display tracking-display md:text-4xl">
                      {project.hasDetail ? (
                        <Link href={`/work/${project.slug}`} className={titleLinkClass}>
                          {project.title}
                          <ArrowRight
                            aria-hidden
                            size={22}
                            className="self-center transition-transform duration-150 group-hover:translate-x-1"
                          />
                        </Link>
                      ) : (
                        <a href={project.url} target="_blank" rel="noopener noreferrer" className={titleLinkClass}>
                          {project.title}
                          <ArrowUpRight
                            aria-hidden
                            size={22}
                            className="self-center transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
                        </a>
                      )}
                    </h3>
                    <p className="mt-4">{project.card}</p>
                    {project.tags && project.tags.length > 0 ? (
                      <div className="mt-6">
                        <TagList tags={project.tags} />
                      </div>
                    ) : null}
                    {project.hasDetail ? (
                      <p className="mt-6">
                        <a
                          href={project.url}
                          target="_blank" rel="noopener noreferrer"
                          className="group inline-flex items-center gap-1 text-sm text-accent transition-opacity duration-150 hover:opacity-70"
                        >
                          <span className="underline decoration-1 underline-offset-4">
                            {displayUrl}
                          </span>
                          <ArrowUpRight
                            aria-hidden
                            size={14}
                            className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
                        </a>
                      </p>
                    ) : null}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
