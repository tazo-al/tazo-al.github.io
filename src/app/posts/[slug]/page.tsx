import { getAllPosts } from "@/lib/posts";
import { Metadata } from "next";
import { getPostBySlug } from "@/lib/posts";
import PostHeader from "@/components/post/PostHeader";
import PostBody from "@/components/post/PostBody";
import TableOfContents from "@/components/post/TableContent";

export const dynamicParams = false;

export function generateStaticParams() {
  const allPosts = getAllPosts();
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getPostBySlug(params.slug);

  return {
    title: `TazoAL | ${post.title}`,
    description: post.description,
    openGraph: {
      title: `TazoAL | ${post.title}`,
      description: post.description,
      images: "/images/og-image.png",
    },
  };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  return (
    <>
      <PostHeader
        title={post.title}
        description={post.description}
        date={post.date}
        tags={post.tags}
        category={post.category as "DEV" | "DAILY"}
      />
      <div className="relative max-w-[1248px] mx-auto px-4">
        <div className="relative xl:max-w-[896px] w-full mx-auto py-12">
          <div className="relative">
            <TableOfContents />
            <PostBody content={post.content} />
          </div>
        </div>
      </div>
    </>
  );
}
