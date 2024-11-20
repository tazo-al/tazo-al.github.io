// 서버에서만 사용할 유틸리티
import probeImageSize from "probe-image-size";

export async function getImageSize(src: string) {
  try {
    const result = await probeImageSize(src);
    return {
      width: result.width,
      height: result.height,
    };
  } catch (error) {
    console.error("Error getting image size:", error);
    return {
      width: 0,
      height: 0,
    };
  }
}
