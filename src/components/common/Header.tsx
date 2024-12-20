"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

export default function Header() {
  const router = useRouter();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const borderStyle = {
    background: `linear-gradient(to right, #3182f6 ${scrollProgress}%, #e5e7eb ${scrollProgress}%)`,
    height: "1px",
    width: "100%",
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / windowHeight) * 100;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/");
    }
  };

  return (
    <header className="w-full h-[60px] fixed top-0 z-50 bg-white">
      <div className="w-[92%] h-full flex justify-between items-center mx-auto">
        <Link href={"/"}>
          <p className="text-[24px] font-[700] italic hover:underline hover:underline-offset-2 pb-0.5">
            Tazoal<span className="text-blue-500">.</span>
          </p>
        </Link>
        <form onSubmit={handleSearch} className="relative">
          <div className="flex items-center">
            <IoSearchOutline className="absolute left-3 w-5 h-5 text-grey-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="검색어를 입력하세요"
              className="w-[240px] pl-10 pr-3 py-1.5 bg-grey-50 rounded-full text-[15px] focus:outline-none focus:bg-grey-100 transition-colors placeholder:text-grey-400"
            />
          </div>
        </form>
      </div>
      <div className="absolute bottom-0 left-0" style={borderStyle}></div>
    </header>
  );
}
