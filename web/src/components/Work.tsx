import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { urlFor } from "@/sanity/image";
import type { ProjectCard } from "@/sanity/queries";
import { Reveal } from "./Reveal";
import { TagList } from "./TagList";

const titleLinkClass =
  "group inline-flex items-center gap-2 text-accent transition-opacity duration-150 hover:opacity-70";

export function Work({ projects }: { projects: ProjectCard[] }) {
  if (projects.length === 0) return null;

  return (
    <section id="work" className="border-t border-rule">
      <div className="mx-auto w-full max-w-content px-6 py-20 md:py-24">
        <Reveal>
          <h2 className="section-heading font-display text-3xl font-normal leading-display tracking-display">
            Work
          </h2>
        </Reveal>
        <div className="mt-10 divide-y divide-rule">
          {projects.map((project, index) => (
            <Reveal key={project._id} className="py-10 first:pt-0 last:pb-0" delay={index * 100}>
              <article>
                <h3 className="font-display text-2xl font-normal leading-display tracking-display">
                  {project.hasDetail ? (
                    <Link href={`/work/${project.slug}`} className={titleLinkClass}>
                      {project.title}
                      <ArrowRight
                        aria-hidden
                        size={20}
                        className="transition-transform duration-150 group-hover:translate-x-1"
                      />
                    </Link>
                  ) : (
                    <a href={project.url} rel="noreferrer" className={titleLinkClass}>
                      {project.title}
                      <ArrowUpRight
                        aria-hidden
                        size={20}
                        className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
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
                  <div className="mt-5">
                    <TagList tags={project.tags} />
                  </div>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
