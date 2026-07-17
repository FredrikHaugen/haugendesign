import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/client";
import {
  EXPERIENCE_QUERY,
  EXPERIENCE_SLUGS_QUERY,
  type ExperienceDetail,
} from "@/sanity/queries";
import { CredentialDetail } from "@/components/CredentialDetail";
import { JsonLd } from "@/components/JsonLd";
import { OWNER_NAME, SITE_NAME, SITE_URL } from "@/lib/site";

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
  const title = [entry.role, entry.org].filter(Boolean).join(", ");
  return {
    title,
    description: entry.description,
    alternates: { canonical: `/experience/${slug}` },
    openGraph: {
      type: "website",
      url: `/experience/${slug}`,
      siteName: SITE_NAME,
      title,
      description: entry.description ?? undefined,
    },
    twitter: { card: "summary", title, description: entry.description ?? undefined },
  };
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
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": `${SITE_URL}/experience/${slug}`,
              url: `${SITE_URL}/experience/${slug}`,
              name: [entry.role, entry.org].filter(Boolean).join(", "),
              description: entry.description ?? undefined,
              about: {
                "@type": "Organization",
                name: entry.org ?? undefined,
                url: entry.url ?? undefined,
              },
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
                  name: entry.role,
                  item: `${SITE_URL}/experience/${slug}`,
                },
              ],
            },
          ],
        }}
      />
      <CredentialDetail
        title={entry.role}
        meta={[entry.org, entry.location, entry.dates].filter(Boolean).join(" · ")}
        description={entry.description}
        detail={entry.detail}
        url={entry.url}
      />
    </>
  );
}
