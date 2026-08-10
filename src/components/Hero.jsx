import { CONTACT } from "../i18n/content.js";
import { useContent } from "../i18n/useContent.jsx";
import { IconWhatsApp } from "./icons.jsx";
import logo from "../assets/logo.png";

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

  return (
    <section
      className="relative flex min-h-[560px] w-full flex-col items-center justify-center gap-8 px-6 py-16 md:py-24"
      style={{
        background: "radial-gradient(50% 50%, #08243a 0%, #061827 100%)",
      }}
      data-section="hero"
    >
      {/* Language switcher — absolutely positioned inside the Hero */}
      {children}

      <div className="hero-card flex flex-col items-center gap-6">
        {/* Brand Row — logo + wordmark
            Desktop: side-by-side (row, gap 10px)
            Mobile: stacked (column), logo bigger above the title */}
        <div className="flex flex-col items-center justify-center gap-2 md:flex-row md:gap-2.5">
          <div className="animate-floatY">
            <img
              src={logo}
              alt={`${brand} logo`}
              className="h-[120px] w-[120px] object-contain md:h-[192px] md:w-[192px]"
              fetchPriority="high"
            />
          </div>
          <p
            className="text-center font-bold leading-[1em] text-white md:text-left"
            style={{
              fontFamily:
                '"Satoshi", "Satoshi Placeholder", "Inter", sans-serif',
              fontSize: "clamp(40px, 12vw, 111px)",
              letterSpacing: "-0.03em",
            }}
          >
            {brand}
          </p>
        </div>

        {/* Headline */}
        <h1
          className="w-full text-center font-normal leading-[1.55em]"
          style={{
            fontFamily: '"Inter", "Inter Placeholder", sans-serif',
            fontSize: "clamp(18px, 2.1vw, 25px)",
            color: "rgba(226, 246, 255, 0.74)",
            textWrap: "balance",
          }}
        >
          {hero.headline}
        </h1>

        {/* WhatsApp CTA */}
        <a
          href={`${CONTACT.whatsappBase}?text=${encodeURIComponent(CONTACT.whatsappPlaceholder.pt)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-wa"
        >
          <IconWhatsApp className="h-6 w-6 shrink-0" />
          <span>{hero.cta}</span>
        </a>

        {/* Mobile note pill */}
        <p className="note-pill">{hero.ctaNote}</p>
      </div>

      {/* Water line divider */}
      <div className="water-line" />
    </section>
  );
}
