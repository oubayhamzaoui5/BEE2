import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        bee: {
          gold: "#D4AF37",
          "gold-bright": "#EBCB5F",
          "gold-deep": "#9C7E1E",
          ink: "#0B0B0E",
          coal: "#121216",
          surface: "#18181D",
          elevated: "#1F1F26",
          line: "rgba(255,255,255,0.08)",
          "line-strong": "rgba(255,255,255,0.14)",
          cream: "#F4F0E6",
          muted: "rgba(244,240,230,0.55)"
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        display: ["var(--font-display)", "ui-serif", "Georgia"]
      },
      boxShadow: {
        card: "0 8px 32px rgba(0,0,0,0.45)",
        "card-hover": "0 24px 64px rgba(0,0,0,0.65), 0 0 0 1px rgba(212,175,55,0.25)",
        glow: "0 0 48px rgba(212,175,55,0.18)"
      },
      animation: {
        "ken-burns": "ken-burns 9s ease-out forwards",
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        "slide-progress": "slide-progress 6.5s linear forwards",
        marquee: "marquee 32s linear infinite"
      },
      keyframes: {
        "ken-burns": {
          "0%": { transform: "scale(1.02)" },
          "100%": { transform: "scale(1.12)" }
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "slide-progress": {
          "0%": { width: "0%" },
          "100%": { width: "100%" }
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
