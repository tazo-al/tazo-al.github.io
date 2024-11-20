export interface Post {
  title: string;
  description: string;
  thumbnail: string;
  tags: string[];
  date: string;
  slug: string;
  content: string;
  category: "DEV" | "DAILY";
}
