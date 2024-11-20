import { SITE_METADATA } from "@/constants/metadata";
import { Post } from "@/types/post";
import Image from "next/image";
import Link from "next/link";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const { title, date, thumbnail, slug, description } = post;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일`;
  };

  return (
    <article className="mt-10 w-full">
      <Link
        href={`/posts/${slug}`}
        aria-label={title}
        className="flex justify-between items-start py-6 group"
      >
        <div className="flex-1 flex flex-col justify-start items-start pr-5">
          <h2 className="mb-1.5 font-bold text-xl break-words overflow-hidden text-ellipsis group-hover:text-blue-500">
            {title}
          </h2>
          <p className="text-grey-500 mb-4 font-normal text-[15px]">
            {description}
          </p>
          <span className="text-grey-700 font-normal text-[13px]">
            {`${formatDate(date)} · ${SITE_METADATA.author}`}
          </span>
        </div>
        <div className="rounded-[20px] w-[130px] h-[90px] mb-auto overflow-hidden">
          <Image
            src={thumbnail}
            alt={`${title} 커버 이미지`}
            width={130}
            height={90}
            className="w-full h-full transition-transform group-hover:scale-110"
          />
        </div>
      </Link>
    </article>
  );
}
