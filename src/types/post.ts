export interface Post {
  title: string;
  date: string;
  description: string;
  slug: string;
  thumbnail: string;
  category: string;
  tags: string[];
  content?: string;
}
