import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/client";
import {
  EXPERIENCE_QUERY,
  EXPERIENCE_SLUGS_QUERY,
  type ExperienceDetail,
} from "@/sanity/queries";
import { CredentialDetail } from "@/components/CredentialDetail";

const options = { next: { revalidate: 3600 } };

export async function generateStaticParams() {
  const slugs = await client.withConfig({ useCdn: false }).fetch<string[]>(EXPERIENCE_SLUGS_QUERY);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = await client.fetch<ExperienceDetail | null>(EXPERIENCE_QUERY, { slug }, options);
  if (!entry) return {};
  return { title: entry.role, description: entry.description };
}

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = await client.fetch<ExperienceDetail | null>(EXPERIENCE_QUERY, { slug }, options);
  if (!entry) notFound();

  return (
    <CredentialDetail
      title={entry.role}
      meta={[entry.org, entry.location, entry.dates].filter(Boolean).join(" · ")}
      description={entry.description}
      detail={entry.detail}
      url={entry.url}
    />
  );
}
