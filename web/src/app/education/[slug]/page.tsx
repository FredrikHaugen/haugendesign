import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/client";
import {
  EDUCATION_QUERY,
  EDUCATION_SLUGS_QUERY,
  type EducationDetail,
} from "@/sanity/queries";
import { CredentialDetail } from "@/components/CredentialDetail";

const options = { next: { revalidate: 3600 } };

export async function generateStaticParams() {
  const slugs = await client.withConfig({ useCdn: false }).fetch<string[]>(EDUCATION_SLUGS_QUERY);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = await client.fetch<EducationDetail | null>(EDUCATION_QUERY, { slug }, options);
  if (!entry) return {};
  return {
    title: entry.degree,
    description: [entry.institution, entry.years].filter(Boolean).join(" · "),
  };
}

export default async function EducationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = await client.fetch<EducationDetail | null>(EDUCATION_QUERY, { slug }, options);
  if (!entry) notFound();

  return (
    <CredentialDetail
      title={entry.degree}
      meta={[entry.institution, entry.years].filter(Boolean).join(" · ")}
      detail={entry.detail}
      url={entry.url}
    />
  );
}
