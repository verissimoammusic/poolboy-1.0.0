import { Helmet } from "react-helmet-async";
import { CONTACT } from "../i18n/content.js";
import { useContent } from "../i18n/useContent.jsx";

// Map the active language code (data.htmlLang) to the Open Graph locale
// format ("language_REGION"). `og:locale` + `og:locale:alternate` hint the
// active language to social platforms (Facebook, etc.).
const OG_LOCALES = {
  pt: "pt_PT",
  en: "en_US",
  fr: "fr_FR",
};

// Per-route SEO: title, description, Open Graph/Twitter tags, canonical,
// hreflang alternates, and the LocalBusiness JSON-LD schema (kept from the
// original site). Also sets <html lang> for accessibility.
export default function Seo() {
  const { lang, data } = useContent();
  const { seo } = data;

  // LocalBusiness structured data (schema.org JSON-LD).
  // areaServed lists every locality we target for local search; knowsAbout
  // ties the business to the pool-care services (helps the services ↔ area
  // association Google uses for local-pack ranking).
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "PoolBoy",
    url: CONTACT.canonical,
    description: seo.description,
    areaServed: [
      { "@type": "Place", name: "Carrasqueira" },
      { "@type": "Place", name: "Lagoa de Albufeira" },
      { "@type": "Place", name: "Sesimbra" },
      { "@type": "Place", name: "Santana" },
    ],
    knowsAbout: [
      "Limpeza de Piscinas",
      "Manutenção de Piscinas",
      "Reparação de Equipamentos",
      "Tratamento Químico de Água",
      "Recuperação de Água Verde",
      "Abertura de Época",
      "Invernagem",
      "Check-up de Equipamentos",
      "Otimização de Consumo Energético",
    ],
    telephone: CONTACT.phoneHref.replace("tel:", ""),
  };

  return (
    <Helmet>
      <html lang={data.htmlLang} />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />

      {/* Canonical + alternates.
          `x-default` points at the canonical (Portuguese) URL so crawlers fall
          back to the default language for users whose locale we don't match. */}
      <link rel="canonical" href={CONTACT.canonical} />
      <link rel="alternate" hrefLang="pt" href={CONTACT.canonical} />
      <link rel="alternate" hrefLang="en" href={`${CONTACT.canonical}en`} />
      <link rel="alternate" hrefLang="fr" href={`${CONTACT.canonical}fr`} />
      <link rel="alternate" hrefLang="x-default" href={CONTACT.canonical} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={CONTACT.canonical} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      {/* og:locale + alternates hint the active language to social platforms.
          The active value is derived from data.htmlLang ("pt" | "en" | "fr");
          the alternates list the other two locales so platforms can pick. */}
      <meta
        property="og:locale"
        content={OG_LOCALES[data.htmlLang] ?? "pt_PT"}
      />
      {Object.entries(OG_LOCALES)
        .filter(([code]) => code !== data.htmlLang)
        .map(([, locale]) => (
          <meta key={locale} property="og:locale:alternate" content={locale} />
        ))}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />

      {/* Structured data */}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}
