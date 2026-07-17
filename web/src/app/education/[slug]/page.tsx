import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/client";
import {
  EDUCATION_QUERY,
  EDUCATION_SLUGS_QUERY,
  type EducationDetail,
} from "@/sanity/queries";
import { CredentialDetail } from "@/components/CredentialDetail";
import { JsonLd } from "@/components/JsonLd";
import { OWNER_NAME, SITE_NAME, SITE_URL } from "@/lib/site";

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
  const title = [entry.degree, entry.institution].filter(Boolean).join(", ");
  const description = [entry.institution, entry.years].filter(Boolean).join(" · ");
  return {
    title,
    description,
    alternates: { canonical: `/education/${slug}` },
    openGraph: {
      type: "website",
      url: `/education/${slug}`,
      siteName: SITE_NAME,
      title,
      description,
    },
    twitter: { card: "summary", title, description },
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
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": `${SITE_URL}/education/${slug}`,
              url: `${SITE_URL}/education/${slug}`,
              name: [entry.degree, entry.institution].filter(Boolean).join(", "),
              about: {
                "@type": "EducationalOrganization",
                name: entry.institution ?? undefined,
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
                  name: entry.degree,
                  item: `${SITE_URL}/education/${slug}`,
                },
              ],
            },
          ],
        }}
      />
      <CredentialDetail
        title={entry.degree}
        meta={[entry.institution, entry.years].filter(Boolean).join(" · ")}
        detail={entry.detail}
        url={entry.url}
      />
    </>
  );
}
