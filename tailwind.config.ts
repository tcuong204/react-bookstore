import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: "Nunito Sans",
        serif: "sans-serif",
      },
      colors: {
        blackText: "#212121",
        grayText: "#333333",
        background: "var(--background)",
        foreground: "var(--foreground)",
        grayBg: "#F0F0F0",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
export default config;
