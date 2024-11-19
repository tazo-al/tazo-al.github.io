export const CATEGORIES = [
  { id: "ALL", label: "전체" },
  { id: "DEV", label: "개발" },
  { id: "DAILY", label: "일상" },
] as const;

export type CategoryType = (typeof CATEGORIES)[number]["id"];
