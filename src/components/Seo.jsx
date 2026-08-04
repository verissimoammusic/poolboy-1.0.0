import { Helmet } from "react-helmet-async";
import { CONTACT } from "../i18n/content.js";
import { useContent } from "../i18n/useContent.jsx";

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

      {/* Canonical + alternates */}
      <link rel="canonical" href={CONTACT.canonical} />
      <link rel="alternate" hrefLang="pt" href={CONTACT.canonical} />
      <link rel="alternate" hrefLang="en" href={`${CONTACT.canonical}en`} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={CONTACT.canonical} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />

      {/* Structured data */}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}
