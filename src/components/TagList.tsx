import Tag from "./Tag";

interface TagListProps {
  tags: string[];
  selectedTag?: string;
  category?: string;
}

export default function TagList({ tags, selectedTag, category }: TagListProps) {
  return (
    <div className="w-[300px]">
      <h3 className="text-grey-500 font-semibold text-[13px]">태그</h3>
      <div className="mt-3">
        {tags.map((tagName) => (
          <Tag
            key={tagName}
            tagName={tagName}
            isSelected={tagName === selectedTag}
            category={category}
          />
        ))}
      </div>
    </div>
  );
}
