/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Static HTML 내보내기 설정
  images: {
    unoptimized: true, // GitHub Pages에서는 Image Optimization이 지원되지 않음
  },
};

module.exports = nextConfig;
