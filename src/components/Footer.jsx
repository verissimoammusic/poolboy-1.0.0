import { CONTACT } from "../i18n/content.js";
import { useContent } from "../i18n/useContent.jsx";
import { IconWhatsApp } from "./icons.jsx";

// Contact "Closing Card" + Footer note. Mirrors the original
// "Closing Card / Closing Title / Closing Copy / Final WhatsApp CTA /
// Footer Note" sequence.
export default function Footer() {
  const { data } = useContent();
  const { contact, footer } = data;

  return (
    <footer className="relative" data-section="contact">
      {/* Soft divider */}
      <div className="container-content">
        <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Closing card */}
      <div className="container-content py-12 md:py-16">
        <div className="mx-auto max-w-2xl rounded-3xl border border-white/8 bg-ink-800/70 p-8 text-center shadow-card md:p-12">
          <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
            {contact.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/60">
            {contact.copy}
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href={CONTACT.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <IconWhatsApp />
              {contact.cta}
            </a>
            <a href={CONTACT.phoneHref} className="btn-ghost">
              {CONTACT.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* Footer note */}
      <div className="border-t border-white/5">
        <div className="container-content flex flex-col items-center gap-2 py-6 text-center text-sm text-white/40 md:flex-row md:justify-between md:text-left">
          <p>{footer.note}</p>
          <p className="flex items-center gap-2">
            <span aria-hidden="true">📞</span>
            <a
              href={CONTACT.phoneHref}
              className="transition-colors hover:text-white"
            >
              {CONTACT.phoneDisplay}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
