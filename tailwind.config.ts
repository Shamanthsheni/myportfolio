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
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Lora", "Newsreader", "Georgia", "serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      colors: {
        canvas: {
          DEFAULT: "#FAF9F6",
          subtle: "#F4F3EE",
          card: "#FFFFFF",
          muted: "#ECEAE4",
        },
        ink: {
          DEFAULT: "#111418",
          secondary: "#333A44",
          muted: "#5F6978",
          faint: "#8C96A5",
          border: "#E4E3DC",
        },
        accent: {
          DEFAULT: "#0F172A",
          hover: "#1E293B",
          blue: "#2563EB",
          warm: "#D97706",
        },
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'editorial': '0 1px 3px rgba(0, 0, 0, 0.02), 0 8px 24px -4px rgba(0, 0, 0, 0.04)',
        'editorial-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.03), 0 16px 32px -4px rgba(0, 0, 0, 0.07)',
        'elevated': '0 20px 40px -15px rgba(0, 0, 0, 0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
