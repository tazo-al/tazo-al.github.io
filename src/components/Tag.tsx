"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface TagProps {
  tagName: string; // tag -> tagName으로 변경
  category?: string;
  isSelected?: boolean; // selected -> isSelected로 변경
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
        query: {
          ...(category && category !== "ALL" && { category }),
          tag: tagName, // tag -> tagName으로 변경
        },
      }}
      className={cn(
        "px-2.5 py-1 text-[14px] rounded-full transition-colors",
        isSelected
          ? "bg-blue-500 text-white hover:bg-blue-600"
          : "bg-grey-100 text-grey-500 hover:bg-grey-200"
      )}
    >
      {tagName}
    </Link>
  );
}
