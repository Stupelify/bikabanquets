import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#FBF9F4",          // warm ivory
        "bg-warm": "#F4EFE4",   // slightly deeper cream panel
        "bg-deep": "#EDE6D6",   // border/section alt
        cream: "#2B2620",       // (now the TEXT color - dark espresso)
        "cream-dim": "#6B6358", // muted brown-grey text
        ink: "#2B2620",
        "ink-soft": "#5A5247",
        champagne: "#C9A24B",
        gold: "#A8842E",        // deeper gold for contrast on light bg
        "gold-bright": "#C9A24B",
        burgundy: "#7B1E2B",
        "burgundy-bright": "#9A2E3C",
        line: "rgba(43,38,32,0.10)",
        "line-strong": "rgba(43,38,32,0.20)",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      transitionTimingFunction: { smooth: "cubic-bezier(0.22, 1, 0.36, 1)" },
    },
  },
  plugins: [],
};

export default config;
