import Link from "next/link";
import { cn } from "@/lib/utils";

interface TagProps {
  tagName: string;
  isSelected?: boolean;
  category?: string;
  onRemove?: () => void;
}

export default function Tag({ tagName, isSelected, category, onRemove }: TagProps) {
  const href = `/${isSelected ? "?" : "?tag=" + tagName + "&"}${
    category ? "category=" + category : ""
  }`;

  return (
    <div className="mb-2 mr-2 cursor-pointer w-fit inline-block">
      <Link
        href={href}
        className={cn(
          "rounded-[19px] inline-flex justify-center items-center font-semibold text-[13px] leading-[1.6] py-1 px-[10px]",
          isSelected
            ? "text-blue-500 bg-blue-50"
            : "text-grey-500 bg-grey-100 hover:text-blue-500 hover:bg-grey-200"
        )}
      >
        {`# ${tagName}`}
        {isSelected && onRemove && (
          <button onClick={onRemove} className="h-full w-4 ml-1">
            x
          </button>
        )}
      </Link>
    </div>
  );
}
