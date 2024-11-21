"use client";

import { useSearchParams } from "next/navigation";
import PostList from "@/components/post/PostList";
import Category from "@/components/category/Category";
import TagList from "@/components/TagList";
import { Post } from "@/types/post";

interface HomeContentProps {
  initialPosts: Post[];
  initialTags: string[];
}

export default function HomeContent({ initialPosts, initialTags }: HomeContentProps) {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "ALL";
  const tag = searchParams.get("tag") || "";
  const search = searchParams.get("search") || "";

  return (
    <div className="max-w-[1200px] mt-[60px] mx-auto min-h-[calc(100vh-200px)]">
      {search && (
        <div className="px-6 mb-8">
          <h2 className="text-xl font-bold">&ldquo;{search}&rdquo; 검색 결과</h2>
        </div>
      )}
      <div className="w-full flex justify-evenly">
        <div className="flex flex-col justify-start items-center max-w-[700px] px-6 mx-auto">
          {!search && <Category category={category} />}
          <PostList posts={initialPosts} category={category} tag={tag} search={search} />
        </div>
        {!search && (
          <aside className="px-6 pb-12 border-l border-grey-200 hidden lg:block mx-auto">
            <TagList tags={initialTags} selectedTag={tag} category={category} />
          </aside>
        )}
      </div>
    </div>
  );
}
