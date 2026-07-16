import Link from "next/link";
import { PortableText, defineQuery, type SanityDocument } from "next-sanity";
import { notFound } from "next/navigation";
import { client } from "@/sanity/client";

const POST_QUERY = defineQuery(
  `*[_type == "post" && slug.current == $slug][0]{ _id, title, body }`
);

const options = { next: { revalidate: 30 } };

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await client.fetch<SanityDocument | null>(POST_QUERY, { slug }, options);

  if (!post) return notFound();

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-16 font-sans">
      <Link className="text-sm text-zinc-600 hover:underline dark:text-zinc-400" href="/">
        ← Back to posts
      </Link>
      <article className="flex flex-col gap-6">
        <h1 className="text-3xl font-semibold tracking-tight">{post.title as string}</h1>
        {Array.isArray(post.body) && (
          <div className="prose leading-7 dark:prose-invert">
            <PortableText value={post.body} />
          </div>
        )}
      </article>
    </main>
  );
}
