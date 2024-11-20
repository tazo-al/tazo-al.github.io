import HomeContent from "@/components/home/HomeContent";
import Loading from "@/components/common/Loading";
import { getAllPosts } from "@/lib/posts";
import { Suspense } from "react";

export default function Home() {
  const posts = getAllPosts();
  const allTags = [...new Set(posts.flatMap((post) => post.tags))];

  return (
    <Suspense fallback={<Loading />}>
      <HomeContent initialPosts={posts} initialTags={allTags} />
    </Suspense>
  );
}
