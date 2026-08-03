/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Design tokens extracted from reference/index.html
        // Background: rgb(6, 24, 39) -> #061827
        ink: {
          900: "#061827",
          800: "#0a2438",
          700: "#0e2d46",
        },
        // Accent: #1889C9
        brand: {
          DEFAULT: "#1889C9",
          50: "#eaf6fd",
          100: "#cfe9fa",
          400: "#4ba9dd",
          500: "#1889C9",
          600: "#147bab",
          700: "#0f6088",
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
        // Reference breakpoints: >=1200px desktop, <=1199.98px mobile
        xl: "1200px",
      },
      maxWidth: {
        content: "1200px",
      },
      boxShadow: {
        card: "0px 10px 30px -12px rgba(0, 0, 0, 0.45)",
        glow: "0 0 0 1px rgba(24, 137, 201, 0.35), 0 8px 30px -8px rgba(24, 137, 201, 0.45)",
      },
      keyframes: {
        floatY: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        waveX: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      animation: {
        floatY: "floatY 6s ease-in-out infinite",
        waveX: "waveX 12s linear infinite",
      },
    },
  },
  plugins: [],
};
