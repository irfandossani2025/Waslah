import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(160 10% 84%)",
        input: "hsl(160 10% 92%)",
        ring: "hsl(152 63% 34%)",
        background: "hsl(0 0% 100%)",
        foreground: "hsl(210 18% 12%)",
        primary: {
          DEFAULT: "hsl(152 63% 34%)",
          foreground: "hsl(0 0% 100%)"
        },
        secondary: {
          DEFAULT: "hsl(160 16% 95%)",
          foreground: "hsl(210 18% 16%)"
        },
        muted: {
          DEFAULT: "hsl(160 16% 96%)",
          foreground: "hsl(210 10% 42%)"
        },
        accent: {
          DEFAULT: "hsl(48 95% 88%)",
          foreground: "hsl(210 18% 18%)"
        },
        card: {
          DEFAULT: "hsl(0 0% 100%)",
          foreground: "hsl(210 18% 12%)"
        },
        destructive: {
          DEFAULT: "hsl(358 75% 59%)",
          foreground: "hsl(0 0% 100%)"
        }
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem"
      },
      boxShadow: {
        soft: "0 12px 35px rgba(14, 24, 32, 0.08)",
        glow: "0 18px 48px rgba(5, 150, 105, 0.16)"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        arabic: ["var(--font-arabic)", "sans-serif"]
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top, rgba(5,150,105,0.14), transparent 30%), linear-gradient(180deg, rgba(243,247,245,0.95), rgba(255,255,255,1))"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" }
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
