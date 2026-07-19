import type { MetadataRoute } from "next";
import { client } from "@/sanity/client";
import {
  ABOUT_UPDATED_QUERY,
  EDUCATION_SLUGS_QUERY,
  EXPERIENCE_SLUGS_QUERY,
  SITEMAP_PROJECTS_QUERY,
  type SitemapProject,
} from "@/sanity/queries";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const freshClient = client.withConfig({ useCdn: false });
  const [projects, experience, education, aboutUpdated] = await Promise.all([
    freshClient.fetch<SitemapProject[]>(SITEMAP_PROJECTS_QUERY),
    freshClient.fetch<string[]>(EXPERIENCE_SLUGS_QUERY),
    freshClient.fetch<string[]>(EDUCATION_SLUGS_QUERY),
    freshClient.fetch<string | null>(ABOUT_UPDATED_QUERY),
  ]);

  // Experience and education entries live on the about singleton, so its
  // _updatedAt is the honest lastModified for those pages and the home page.
  const aboutModified = aboutUpdated ? new Date(aboutUpdated) : undefined;

  return [
    { url: SITE_URL, lastModified: aboutModified, changeFrequency: "monthly", priority: 1 },
    ...projects.map(({ slug, _updatedAt }) => ({
      url: `${SITE_URL}/work/${slug}`,
      lastModified: new Date(_updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...experience.map((slug) => ({
      url: `${SITE_URL}/experience/${slug}`,
      lastModified: aboutModified,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
    ...education.map((slug) => ({
      url: `${SITE_URL}/education/${slug}`,
      lastModified: aboutModified,
      changeFrequency: "yearly" as const,
      priority: 0.4,
    })),
  ];
}
