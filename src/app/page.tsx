import { Metadata } from "next";
import PostCard from "@/components/post/PostCard";
import { SITE_METADATA } from "@/constants/metadata";
import { getAllPosts } from "@/lib/posts";
import TagList from "@/components/TagList";
import Category from "@/components/category/Category";

export const metadata: Metadata = {
  title: SITE_METADATA.title,
  description: SITE_METADATA.description,
  openGraph: {
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    images: SITE_METADATA.image,
  },
  verification: {
    google: "5Rxhu8VWiPcCxzU0LeH3eHf8lNFPickkrLJmxds1-Z8",
    other: {
      "naver-site-verification": "247468c1865867ca8a22d2ae4d87f58c03bffbb8",
    },
  },
  keywords: SITE_METADATA.keywords,
};

interface HomeProps {
  searchParams: {
    category?: string;
    tag?: string;
  };
}

export default function Home({ searchParams }: HomeProps) {
  const { category, tag } = searchParams;
  const allPosts = getAllPosts()
    .filter((post) => !category || category === "ALL" || post.category === category)
    .filter((post) => !tag || post.tags.includes(tag));

  const uniqueTags = [...new Set(allPosts.flatMap((post) => post.tags))];

  return (
    <main className="max-w-[1200px] mt-[60px] mx-auto min-h-[calc(100vh-200px)]">
      <div className="w-full flex justify-evenly">
        <div className="flex flex-col justify-start items-center max-w-[700px] px-6 mx-auto">
          <Category category={category} />
          {allPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
        <aside className="px-6 pb-12 border-l border-grey-200 hidden lg:block mx-auto">
          <TagList tags={uniqueTags} selectedTag={tag} category={category} />
        </aside>
      </div>
    </main>
  );
}
