// 클라이언트에서 사용할 유틸리티
export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
