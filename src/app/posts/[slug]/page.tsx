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

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return {
    title: `Tazoal Log | ${post.title}`,
    description: post.description,
    openGraph: {
      title: `Tazoal Log | ${post.title}`,
      description: post.description,
      images: "/images/og-image.png",
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return (
    <>
      <div className="relative max-w-4xl mx-auto px-4">
        <div className="relative xl:max-w-[896px] w-full mx-auto">
          <div className="relative">
            <PostHeader
              title={post.title}
              description={post.description}
              date={post.date}
              tags={post.tags}
              category={post.category as "DEV" | "DAILY"}
            />
            <TableOfContents />
            <PostBody content={post.content} />
          </div>
        </div>
      </div>
    </>
  );
}
