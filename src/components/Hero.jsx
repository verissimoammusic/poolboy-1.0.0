import { CONTACT } from "../i18n/content.js";
import { useContent } from "../i18n/useContent.jsx";
import { IconWhatsApp } from "./icons.jsx";
import HeroEffects from "./HeroEffects.jsx";
import logo from "../assets/logo.png";
import { useEffect, useRef } from "react";

// Hero section:
//   radial-gradient(50% 50%, #08243a 0%, #061827 100%)
//   min-height 560px, padding 70px 24px 38px, gap 32px, centered column
//   ├─ "Language Switcher" — absolute top-right (passed as children)
//   └─ "Hero Content" glass card
//      ├─ "Brand Row": logo (192px) + "PoolBoy" wordmark (Satoshi 111px 700)
//      ├─ "Headline": Inter 25px 400, color #e2f6ffbd, center
//      ├─ "WhatsApp CTA": #25d366 pill, label "Fale Connosco !"
//      └─ "Mobile Note": cyan pill (#7eebff17 / #7eebff29)
//   └─ "Water Line": gradient divider
//
// `children` is the Language Switcher (Header), passed in by LandingPage so it
// is positioned absolutely inside the Hero `<section>`.
export default function Hero({ children }) {
  const { data } = useContent();
  const { hero, brand } = data;
  const { subtitle } = hero;
  const sectionRef = useRef(null);
  const snapTimeoutRef = useRef(null);
  const isSnappingRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      // Clear any pending snap check on every scroll
      if (snapTimeoutRef.current) {
        clearTimeout(snapTimeoutRef.current);
        snapTimeoutRef.current = null;
      }

      // If currently snapping, ignore
      if (isSnappingRef.current) return;

      // Schedule a check after scrolling stops
      snapTimeoutRef.current = setTimeout(() => {
        const rect = section.getBoundingClientRect();
        const heroHeight = rect.height;
        const viewportMiddle = window.innerHeight * 0.5;
        const heroCenter = rect.top + heroHeight / 2;
        const isMoreThanHalfVisible =
          heroCenter < viewportMiddle && rect.bottom > heroHeight * 0.5;

        if (isMoreThanHalfVisible) {
          isSnappingRef.current = true;
          window.scrollTo({ top: 0, behavior: "smooth" });
          setTimeout(() => {
            isSnappingRef.current = false;
          }, 500);
        }
      }, 300); // Wait 300ms after scrolling stops
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (snapTimeoutRef.current) {
        clearTimeout(snapTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen w-full flex-col items-center justify-center gap-8 px-6 py-16 md:py-24"
      style={{
        background: "radial-gradient(50% 50%, #08243a 0%, #061827 100%)",
      }}
      data-section="hero"
    >
      {/* Turquoise pool background for the entire section - bright gradient bottom to top */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, #155e75 0%, #0e7490 25%, #0891b2 50%, #06b5d4 75%, #22d3ee 100%)",
        }}
        aria-hidden="true"
      />
      {/* Hero effects — caustics, water warp, bubbles (section background) */}
      <HeroEffects />
      {/* Language switcher — absolutely positioned inside the Hero */}
      {children}

      {/* Dark glass card over the section background effects */}
      <div className="hero-card relative flex flex-col items-center gap-4 md:gap-3">
        {/* Content — placed above the glass with isolation to protect box-shadows */}
        <div className="relative z-10 isolate flex flex-col items-center gap-3 md:gap-0.5">
          {/* Brand Row — logo + wordmark + subtitle */}
          <div className="flex flex-col items-center gap-0.5 md:flex-row md:gap-2.5">
            <div className="animate-floatY">
              <img
                src={logo}
                alt={`${brand} logo`}
                className="h-[140px] w-[140px] object-contain md:h-[192px] md:w-[192px]"
                fetchPriority="high"
              />
            </div>
            <p
              className="text-center font-bold leading-[1em] text-white md:text-left"
              style={{
                fontFamily:
                  '"Satoshi", "Satoshi Placeholder", "Inter", sans-serif',
                fontSize: "clamp(56px, 12vw, 111px)",
                letterSpacing: "-0.03em",
              }}
            >
              {brand}
            </p>
          </div>
          {/* Subtitle */}
          <p
            className="text-center text-sm font-medium text-white/60 md:text-xl"
            style={{
              fontFamily: '"Inter", "Inter Placeholder", sans-serif',
              letterSpacing: "0.02em",
            }}
          >
            {subtitle}
          </p>
          {/* WhatsApp CTA */}
          <a
            href={`${CONTACT.whatsappBase}?text=${encodeURIComponent(CONTACT.whatsappPlaceholder.pt)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wa mt-3 md:mt-4"
          >
            <IconWhatsApp className="h-6 w-6 shrink-0" />
            <span>{hero.cta}</span>
          </a>

          {/* Mobile note pill */}
          <p className="note-pill mt-3 md:mt-4">{hero.ctaNote}</p>
        </div>
      </div>

      {/* Water line divider */}
      <div className="water-line" />

      {/* Scroll indicator — chevron at bottom */}
      <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-center gap-2 pb-6">
        <div className="relative z-10 animate-bounce" aria-hidden="true">
          <svg className="h-6 w-6" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 13 L2 6 L4.5 4 L8 7.5 L11.5 4 L14 6 Z"
              stroke="rgba(255, 255, 255, 0.6)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
