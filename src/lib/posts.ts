import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post } from "@/types/post";

const POSTS_PATH = path.join(process.cwd(), "posts");

// 재귀적으로 모든 하위 디렉토리를 검색하는 함수
const getAllFiles = (dirPath: string): string[] => {
  const files = fs.readdirSync(dirPath);
  let arrayOfFiles: string[] = [];

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = arrayOfFiles.concat(getAllFiles(fullPath));
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
};

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_PATH)) {
    return [];
  }

  try {
    const allFiles = getAllFiles(POSTS_PATH);
    console.log("All files found:", allFiles);

    const posts = allFiles
      .filter((filePath) => /\.mdx?$/.test(filePath))
      .map((filePath) => {
        console.log("Processing file:", filePath);
        const source = fs.readFileSync(filePath, "utf8");
        const { data } = matter(source);
        const fileName = path.basename(filePath);

        return {
          ...(data as Omit<Post, "slug">),
          slug: fileName.replace(/\.mdx?$/, ""),
        };
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    console.log("Processed posts:", posts);
    return posts;
  } catch (error) {
    console.error("Error reading posts:", error);
    return [];
  }
}

export function getPostBySlug(slug: string): Post {
  try {
    const allFiles = getAllFiles(POSTS_PATH);
    const postFile = allFiles.find((file) => {
      const fileName = path.basename(file).replace(/\.mdx?$/, "");
      return fileName === slug;
    });

    if (!postFile) {
      throw new Error(`Post not found: ${slug}`);
    }

    const source = fs.readFileSync(postFile, "utf8");
    const { data, content } = matter(source);

    return {
      ...(data as Omit<Post, "slug">),
      slug,
      content,
    };
  } catch (error) {
    console.error(`Error getting post by slug ${slug}:`, error);
    throw error;
  }
}
