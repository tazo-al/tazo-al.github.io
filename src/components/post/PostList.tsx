"use client";

import { Post } from "@/types/post";
import PostCard from "./PostCard";

interface PostListProps {
  posts: Post[];
  category: string;
  tag: string;
  search: string;
}

export default function PostList({
  posts,
  category,
  tag,
  search,
}: PostListProps) {
  const filteredPosts = posts.filter((post) => {
    if (search) {
      const searchContent = `${post.title} ${post.description}`.toLowerCase();
      return searchContent.includes(search.toLowerCase());
    }
    return (
      (!category || category === "ALL" || post.category === category) &&
      (!tag || post.tags.includes(tag))
    );
  });

  return (
    <>
      {filteredPosts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
      {filteredPosts.length === 0 && (
        <p className="text-grey-500 text-center py-12">검색 결과가 없습니다.</p>
      )}
    </>
  );
}
