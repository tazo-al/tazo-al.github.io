import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post } from "@/types/post";

const POSTS_PATH = path.join(process.cwd(), "content/posts");

export function getAllPosts(): Post[] {
  // posts 디렉토리가 없는 경우 빈 배열 반환
  if (!fs.existsSync(POSTS_PATH)) {
    return [];
  }

  const posts = fs
    .readdirSync(POSTS_PATH)
    .filter((path) => /\.mdx?$/.test(path))
    .map((fileName) => {
      const source = fs.readFileSync(path.join(POSTS_PATH, fileName), "utf8");
      const { data } = matter(source);

      return {
        ...(data as Omit<Post, "slug">),
        slug: fileName.replace(/\.mdx?$/, ""),
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}
