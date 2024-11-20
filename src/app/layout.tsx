import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/common/Header";

export const metadata: Metadata = {
  title: "내 블로그",
  description: "개인 블로그입니다.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <div className="w-full mx-auto">
          <Header />
          <main>{children}</main>
          <footer className="py-8 mt-8 text-center">© 2024 내 블로그</footer>
        </div>
      </body>
    </html>
  );
}
