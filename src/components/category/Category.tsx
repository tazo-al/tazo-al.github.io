import Link from "next/link";
import { CATEGORIES } from "@/constants/category";
import { cn } from "@/lib/utils";

interface CategoryProps {
  category?: string;
}

export default function Category({ category = "ALL" }: CategoryProps) {
  return (
    <nav className="flex flex-col py-2.5 w-full">
      <div className="relative flex max-w-full h-[47px] border-b border-grey-200">
        {CATEGORIES.map((cat) => {
          const isSelected = cat.id === category;

          return (
            <div key={cat.id} className="relative">
              {isSelected && <div className="w-[72px] absolute bottom-[-1px] h-0.5 bg-blue-500" />}
              <Link
                href={`/?category=${cat.id}`}
                className={cn(
                  "flex justify-center items-center w-[72px] h-[47px] font-bold text-[17px]",
                  isSelected ? "text-grey-900" : "text-grey-500 hover:text-grey-700"
                )}
              >
                {cat.label}
              </Link>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
