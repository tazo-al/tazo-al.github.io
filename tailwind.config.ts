import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          50: "#e8f3ff",
          100: "#c9e2ff",
          200: "#90c2ff",
          300: "#64a8ff",
          400: "#4593fc",
          500: "#3182f6",
          600: "#2272eb",
          700: "#1b64da",
          800: "#1957c2",
          900: "#194aa6",
        },
        grey: {
          50: "#f9fafb",
          100: "#f2f4f6",
          200: "#e5e8eb",
          300: "#d1d6db",
          400: "#b0b8c1",
          500: "#8b95a1",
          600: "#6b7684",
          700: "#4e5968",
          800: "#333d4b",
          900: "#191f28",
        },
      },
    },
  },
  plugins: [],
};

export default config;
