import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blueberry: {
          900: "#1A3A5C",
          700: "#1D5189",
          500: "#2E7DB7",
          100: "#D6E8F5",
          50: "#EBF4FB",
        },
        cherry: {
          700: "#B5292D",
          500: "#D73A3F",
          100: "#FADCDC",
        },
        neutral: {
          900: "#1A1A1A",
          700: "#454545",
          400: "#8C8C8C",
          200: "#D9D9D9",
          100: "#F0F0F0",
          50: "#F8F8F8",
        },
        success: {
          700: "#1F6B3A",
          100: "#D3EDE1",
        },
        warning: {
          700: "#7A4F00",
          100: "#FFF3CD",
        },
      },
      fontFamily: {
        sans: ["Source Sans 3", "Arial", "system-ui", "sans-serif"],
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
      },
    },
  },
  plugins: [],
};
export default config;
