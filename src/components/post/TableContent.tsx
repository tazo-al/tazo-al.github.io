"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // h1, h2, h3 태그들을 찾아서 목차 아이템 생성
    const elements = Array.from(document.querySelectorAll("h1, h2, h3")).map(
      (element) => ({
        id: element.id,
        text: element.textContent || "",
        level: Number(element.tagName.charAt(1)),
      })
    );

    setHeadings(elements);

    // Intersection Observer 설정
    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: "-20% 0px -35% 0px",
    });

    // 모든 헤딩 요소 관찰
    elements.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={`
      xl:fixed xl:top-[100px] xl:right-[calc((100vw-1500px)/2)] xl:w-64 xl:max-h-[calc(100vh-200px)] xl:overflow-y-auto
      lg:static lg:w-full lg:mt-8 lg:mb-8
      w-full mt-4
    `}
    >
      <ul className="space-y-2 text-sm">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{
              paddingLeft: `${(heading.level - 1) * 16}px`,
            }}
          >
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.id)?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className={`block py-1 hover:text-blue-600 transition-colors ${
                activeId === heading.id
                  ? "text-blue-600 font-semibold"
                  : "text-zinc-600"
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
