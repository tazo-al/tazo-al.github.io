import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import probe from "probe-image-size";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getImageSize(src: string) {
  try {
    const result = await probe(src);
    return { width: result.width, height: result.height };
  } catch (error) {
    console.error("Error getting image size:", error);
    return { width: 800, height: 600 }; // 기본값
  }
}
