import { Helmet } from "react-helmet-async";
import { CONTACT } from "../i18n/content.js";
import { useContent } from "../i18n/useContent.jsx";

// Per-route SEO: title, description, Open Graph/Twitter tags, canonical,
// hreflang alternates, and the LocalBusiness JSON-LD schema (kept from the
// original site). Also sets <html lang> for accessibility.
export default function Seo() {
  const { lang, data } = useContent();
  const { seo } = data;

  // LocalBusiness structured data, matching reference/index.html (headStart).
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "PoolBoy",
    url: CONTACT.canonical,
    description: seo.description,
    areaServed: {
      "@type": "Place",
      name: "Carrasqueira e Lagoa de Albufeira",
    },
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
