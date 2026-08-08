/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // ---- Clean Water Palette ----
        // Deep ocean background tones
        ocean: {
          950: "#020e1a", // deepest background
          900: "#0a1628", // primary dark bg
          800: "#0f2236", // secondary dark
          700: "#152d45", // tertiary dark
          600: "#1b3a56", // accent dark
        },
        // Bright blues representing clean water
        water: {
          50: "#e0f4ff", // very light sky
          100: "#b8e4ff", // light sky
          200: "#7ccbff", // bright sky
          300: "#3db3ff", // vivid blue
          400: "#0099ff", // clean water blue
          500: "#0080e6", // primary water blue
          600: "#0066b3", // deeper blue
          700: "#004d80", // ocean blue
        },
        // Teal tones for water depth
        teal: {
          50: "#e0faf7",
          100: "#b8f0e8",
          200: "#7de0d0",
          300: "#42cbb5",
          400: "#26b8a0",
          500: "#0ea589", // primary teal
          600: "#0a8c73",
          700: "#08735e",
        },
        // Accent cyan for highlights
        cyan: {
          DEFAULT: "#22d3ee",
          50: "#e0f7fa",
          100: "#b2effa",
          200: "#7ae0f5",
          300: "#3fd0ed",
          400: "#22d3ee",
          500: "#06b6d4",
        },
        // Brand gradient colors
        brand: {
          DEFAULT: "#0ea5e9",
          50: "#e0f2fe",
          100: "#bae6fd",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
        },
        // Soft white for text on light backgrounds
        mist: {
          100: "#f0f9ff",
          200: "#e0f2fe",
          300: "#bae6fd",
          400: "rgba(186, 230, 253, 0.9)",
          500: "rgba(186, 230, 253, 0.7)",
          600: "rgba(186, 230, 253, 0.5)",
          700: "rgba(186, 230, 253, 0.35)",
        },
        // Light section background
        paper: {
          DEFAULT: "#f0f9ff",
        },
        // Muted text for light sections
        slate: {
          500: "#64748b",
          600: "#475569",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: [
          "Satoshi",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      screens: {
        // 2-state design: desktop >=1200px vs mobile <=1199.98px.
        // We keep the standard sm/md/lg breakpoints for layout, and add `xl`
        // matching the desktop breakpoint.
        xl: "1200px",
      },
      maxWidth: {
        content: "1180px", // hero/services/soft-ending max-width
        services: "1000px", // services grid
        closing: "820px", // closing card
        card: "358px", // mobile hero card
      },
      borderRadius: {
        hero: "32px", // hero card (desktop)
        "hero-sm": "26px", // hero card (mobile)
        closing: "30px", // closing card (desktop)
        "closing-sm": "26px", // closing card (mobile)
        card: "22px", // service card
        bubble: "14px", // service icon bubble
      },
      boxShadow: {
        // Shadows
        "hero-card": "0 30px 80px rgba(0, 0, 0, 0.35)",
        "soft-glow": "0 8px 30px -8px rgba(14, 165, 233, 0.5)",
        "teal-glow": "0 8px 30px -8px rgba(14, 165, 137, 0.4)",
        "card-shadow": "0 12px 40px rgba(0, 0, 0, 0.12)",
      },
      keyframes: {
        floatY: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        floatY: "floatY 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
