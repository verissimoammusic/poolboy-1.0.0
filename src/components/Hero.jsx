import { CONTACT } from "../i18n/content.js";
import { useContent } from "../i18n/useContent.jsx";
import { IconWhatsApp } from "./icons.jsx";
import logo from "../assets/logo.png";

// Hero section. Contains the PoolBoy logo (used as the hero image), the
// headline and a WhatsApp CTA — matching "Hero Content / Brand Row / Headline /
// WhatsApp CTA" from reference/index.html.
export default function Hero() {
  const { data } = useContent();
  const { hero, brand } = data;

  return (
    <section className="relative overflow-hidden" data-section="hero">
      {/* Ambient water glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-brand/20 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-brand/40 to-transparent" />
      </div>

      <div className="container-content relative flex flex-col items-center py-16 text-center md:py-24">
        {/* Brand row / hero image (the logo) */}
        <div className="animate-floatY mb-8">
          <img
            src={logo}
            alt={`${brand} logo`}
            className="h-28 w-auto drop-shadow-[0_10px_30px_rgba(24,137,201,0.35)] md:h-36"
            fetchPriority="high"
          />
        </div>

        {/* Headline */}
        <h1 className="max-w-3xl font-display text-3xl font-bold leading-tight text-white md:text-5xl">
          {hero.headline}
        </h1>

        {/* WhatsApp CTA */}
        <div className="mt-9 flex flex-col items-center gap-3">
          <a
            href={CONTACT.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <IconWhatsApp />
            {hero.cta}
          </a>
          <p className="text-sm text-white/60">{hero.ctaNote}</p>
        </div>
      </div>
    </section>
  );
}
