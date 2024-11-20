"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface TagProps {
  tagName: string;
  category?: string;
  isSelected?: boolean;
}

export default function Tag({
  tagName,
  category,
  isSelected = false,
}: TagProps) {
  return (
    <Link
      href={{
        pathname: "/",
        query: isSelected
          ? { ...(category && category !== "ALL" && { category }) } // 선택된 태그면 tag 제거
          : {
              ...(category && category !== "ALL" && { category }),
              tag: tagName,
            }, // 선택되지 않은 태그면 tag 추가
      }}
      className={cn(
        "inline-block px-2.5 py-1 text-[14px] rounded-full transition-colors mr-2 mb-2",
        isSelected
          ? "bg-blue-500 text-white hover:bg-blue-600"
          : "bg-grey-100 text-grey-500 hover:bg-grey-200"
      )}
    >
      {tagName}
    </Link>
  );
}
