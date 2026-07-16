import Link from "next/link";
import { client } from "@/sanity/client";
import { defineQuery, type SanityDocument } from "next-sanity";

const POSTS_QUERY = defineQuery(
  `*[_type == "post" && defined(slug.current)] | order(_createdAt desc){ _id, title, slug }`
);

const options = { next: { revalidate: 30 } };

export default async function PostsPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-16 font-sans">
      <h1 className="text-3xl font-semibold tracking-tight">Posts</h1>
      {posts.length === 0 ? (
        <p className="text-zinc-600 dark:text-zinc-400">
          No posts yet. Add one in the Sanity Studio.
        </p>
      ) : (
        <ul className="flex flex-col gap-4">
          {posts.map((post) => (
            <li key={post._id}>
              <Link
                className="text-lg font-medium underline-offset-4 hover:underline"
                href={`/${(post.slug as { current?: string })?.current}`}
              >
                {post.title as string}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
