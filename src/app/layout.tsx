import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/common/Header";

export const metadata: Metadata = {
  title: "Tazoal Log",
  description: "웹 프론트엔드 개발자 장원정입니다.",
  authors: { name: "장원정", url: "https://github.com/tazoal" },
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
          <main className="flex-1 w-full pt-[60px]">{children}</main>
          <footer className="py-8 text-center border-t">© 2024 Tazoal</footer>
        </div>
      </body>
    </html>
  );
}
