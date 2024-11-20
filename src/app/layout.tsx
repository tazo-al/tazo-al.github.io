import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/common/Header";

export const metadata: Metadata = {
  title: "내 블로그",
  description: "개인 블로그입니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 w-full pt-[60px]">
            {" "}
            {/* Header 높이만큼 pt 추가 */}
            {children}
          </main>
          <footer className="py-8 text-center border-t">© 2024 Tazoal</footer>
        </div>
      </body>
    </html>
  );
}
