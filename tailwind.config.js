/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // ---- Design tokens ----
        // Page background / dark glass surfaces
        ink: {
          900: "#061827", // page background rgb(6,24,39)
          800: "#0a2438",
          700: "#0e2d46",
        },
        // Brand cyan accent (PT active, borders, water line)
        brand: {
          DEFAULT: "#1889C9",
          50: "#eaf6fd",
          100: "#cfe9fa",
          400: "#4ba9dd",
          500: "#1889C9",
          600: "#147bab",
          700: "#0f6088",
        },
        // Cyan highlight used for borders/pills
        cyan: {
          DEFAULT: "#7eebff",
          50: "#e8faff", // service icon bubble bg
        },
        // WhatsApp green (CTA buttons)
        wa: {
          DEFAULT: "#25d366",
        },
        // Light Services section background
        paper: {
          DEFAULT: "#f7fbfc",
        },
        // Muted text gray used on the light Services section
        slate: {
          500: "#5a6b76", // rgb(90,107,118)
        },
        // Soft cyan-white used for body text over dark sections
        mist: {
          100: "#e2f6ff", // base soft cyan
          // alpha variants
          72: "rgba(226, 246, 255, 0.72)",
          78: "rgba(226, 246, 255, 0.78)",
          42: "rgba(226, 246, 255, 0.42)",
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
        "hero-card": "0 30px 80px #00000040",
        "wa-cta": "0 18px 46px #25d36657",
        "lang-active": "0 4px 12px #7eebff29",
        "service-card": "0 12px 34px #0618270f",
        "soft-glow": "0 8px 30px -8px rgba(24, 137, 201, 0.45)",
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
