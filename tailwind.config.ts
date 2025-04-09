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
        primary: "#007AFF",
        secondary: "#111111",
        gray: "#F5F5F5",
        green: {
          light: "#4CAF50", // Xanh lá tươi sáng
          medium: "#2E7D32", // Xanh lá trung bình
          dark: "#1B5E20", // Xanh lá đậm
          mint: "#98FB98", // Xanh lá bạc hà
          forest: "#228B22", // Xanh lá rừng
          lime: "#32CD32", // Xanh lá chanh
        },
      },
      fontFamily: {
        primary: ["var(--font-manrope)"],
      },
    },
  },
  plugins: [],
};

export default config;
