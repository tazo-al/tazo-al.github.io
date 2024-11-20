import HomeContent from "@/components/home/HomeContent";
import { getAllPosts } from "@/lib/posts";
import { Suspense } from "react";

export default function Home() {
  // 서버 컴포넌트에서 데이터 가져오기
  const posts = getAllPosts();
  const allTags = [...new Set(posts.flatMap((post) => post.tags))];

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent initialPosts={posts} initialTags={allTags} />
    </Suspense>
  );
}
