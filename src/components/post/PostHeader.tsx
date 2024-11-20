export default function PostHeader({
  title,
  description,
  date,
  tags,
  category,
}: {
  title: string;
  description: string;
  date: string;
  tags: string[];
  category: "DEV" | "DAILY";
}) {
  return (
    <header className="w-full bg-zinc-50 py-12 mb-12 border-b border-zinc-200">
      <div className="mx-auto max-w-4xl px-4">
        <div className="mb-4">
          <span className="text-blue-600 font-semibold">{category}</span>
        </div>

        <h1 className="text-4xl font-bold mb-3 text-zinc-900">{title}</h1>

        <p className="text-lg text-zinc-600 mb-6">{description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span key={tag} className="px-2 py-1 bg-zinc-100 rounded-md text-zinc-600 text-sm">
              {tag}
            </span>
          ))}
        </div>

        <time className="text-zinc-600 text-sm">{date}</time>
      </div>
    </header>
  );
}
