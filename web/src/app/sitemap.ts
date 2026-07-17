import type { MetadataRoute } from "next";
import { client } from "@/sanity/client";
import {
  DETAIL_SLUGS_QUERY,
  EDUCATION_SLUGS_QUERY,
  EXPERIENCE_SLUGS_QUERY,
} from "@/sanity/queries";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const freshClient = client.withConfig({ useCdn: false });
  const [projects, experience, education] = await Promise.all([
    freshClient.fetch<string[]>(DETAIL_SLUGS_QUERY),
    freshClient.fetch<string[]>(EXPERIENCE_SLUGS_QUERY),
    freshClient.fetch<string[]>(EDUCATION_SLUGS_QUERY),
  ]);

  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    ...projects.map((slug) => ({
      url: `${SITE_URL}/work/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...experience.map((slug) => ({
      url: `${SITE_URL}/experience/${slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
    ...education.map((slug) => ({
      url: `${SITE_URL}/education/${slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.4,
    })),
  ];
}
