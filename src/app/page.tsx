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

type SearchParams = {
  category?: string;
  tag?: string;
  search?: string;
};

type Props = {
  params: { slug: string };
  searchParams: Promise<SearchParams>; // Promise로 감싸기
};

export default async function Home({
  // async 추가
  searchParams,
}: Props) {
  const { category = "ALL", tag = "", search = "" } = await searchParams;

  const allPosts = getAllPosts().filter((post) => {
    if (search) {
      const searchContent =
        `${post.title} ${post.description} ${post.content}`.toLowerCase();
      return searchContent.includes(search.toLowerCase());
    }
    return (
      (!category || category === "ALL" || post.category === category) &&
      (!tag || post.tags.includes(tag))
    );
  });

  const uniqueTags = [...new Set(allPosts.flatMap((post) => post.tags))];

  return (
    <main className="max-w-[1200px] mt-[60px] mx-auto min-h-[calc(100vh-200px)]">
      {search && (
        <div className="px-6 mb-8">
          <h2 className="text-xl font-bold">
            &ldquo;{search}&rdquo; 검색 결과
            <span className="text-grey-500 ml-2 text-base font-normal">
              {allPosts.length}개의 글
            </span>
          </h2>
        </div>
      )}
      <div className="w-full flex justify-evenly">
        <div className="flex flex-col justify-start items-center max-w-[700px] px-6 mx-auto">
          {!search && <Category category={category} />}
          {allPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
          {allPosts.length === 0 && (
            <p className="text-grey-500 text-center py-12">
              검색 결과가 없습니다.
            </p>
          )}
        </div>
        {!search && (
          <aside className="px-6 pb-12 border-l border-grey-200 hidden lg:block mx-auto">
            <TagList tags={uniqueTags} selectedTag={tag} category={category} />
          </aside>
        )}
      </div>
    </main>
  );
}
