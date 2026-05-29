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
        bg: "#14100C",
        "bg-warm": "#1A1510",
        cream: "#F4EDE1",
        "cream-dim": "#C9BFAE",
        champagne: "#D9C29A",
        gold: "#C9A24B",
        "gold-bright": "#E3BC65",
        burgundy: "#6E1F2A",
        "burgundy-bright": "#9A2E3C",
        line: "rgba(244,237,225,0.12)",
        "line-strong": "rgba(244,237,225,0.22)",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(to top, #14100C 2%, rgba(20,16,12,0.4) 40%, rgba(20,16,12,0.55) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
