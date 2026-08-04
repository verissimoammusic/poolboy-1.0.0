// =============================================================================
// PoolBoy content + i18n dictionary.
//
// PT copy is the original Portuguese site copy. EN copy is a faithful
// translation written for this rebuild.
//
// Contact details:
//   Phone     : +351 960 363 769  (display: 960 363 769)
//   WhatsApp  : https://wa.me/351960363769
//   Canonical: https://poolboy.example.com/   <-- TODO: replace with the real
//             production domain before deploying (also drives SEO canonical
//             + hreflang alternates in src/components/Seo.jsx).
// =============================================================================

export const CONTACT = {
  phoneDisplay: "960 363 769",
  phoneHref: "tel:+351960363769",
  whatsappHref: "https://wa.me/351960363769",
  canonical: "https://poolboy.example.com/",
};

// The eight service cards from the original "Services Grid".
// `id` maps each card to an icon component in src/components/icons.jsx.
const SERVICES = [
  {
    id: "aspiracao",
    pt: {
      title: "Limpeza Regular",
      subtitle: "Incluindo aspiração do fundo e paredes",
    },
    en: {
      title: "Regular Cleaning",
      subtitle: "Including bottom and wall vacuuming",
    },
  },
  {
    id: "filtros",
    pt: {
      title: "Limpeza de Filtros",
      subtitle: "Circulação e filtragem mais limpas",
    },
    en: {
      title: "Filter Cleaning",
      subtitle: "Cleaner circulation and filtration",
    },
  },
  {
    id: "quimico",
    pt: { title: "Tratamento Químico", subtitle: "Equilíbrio de pH e cloro" },
    en: { title: "Chemical Treatment", subtitle: "pH and chlorine balance" },
  },
  {
    id: "verde",
    pt: {
      title: "Recuperação de Água Verde",
      subtitle: "Tratamentos rápidos de recuperação",
    },
    en: { title: "Green Water Recovery", subtitle: "Fast recovery treatments" },
  },
  {
    id: "abertura",
    pt: {
      title: "Abertura de Época",
      subtitle: "Ativação da piscina quando chega o calor",
    },
    en: {
      title: "Season Opening",
      subtitle: "Pool activation as the warm weather arrives",
    },
  },
  {
    id: "invernagem",
    pt: {
      title: "Invernagem",
      subtitle: "Tratamento e proteção para os meses frios",
    },
    en: {
      title: "Winterization",
      subtitle: "Treatment and protection for the cold months",
    },
  },
  {
    id: "checkup",
    pt: {
      title: "Check-up aos Equipamentos",
      subtitle: "Inspeções preventivas de salvaguarda",
    },
    en: {
      title: "Equipment Check-up",
      subtitle: "Preventive safeguard inspections",
    },
  },
  {
    id: "energia",
    pt: {
      title: "Otimização de Consumo Energético",
      subtitle: "Análise extensa ao sistema",
    },
    en: {
      title: "Energy Use Optimization",
      subtitle: "Extensive system analysis",
    },
  },
];

export const content = {
  pt: {
    htmlLang: "pt",
    nav: {
      ptLabel: "🇵🇹",
      enLabel: "🇬🇧",
      services: "Serviços",
      contact: "Contacto",
    },
    seo: {
      title: "PoolBoy — Limpeza de Piscinas na Lagoa de Albufeira e Sesimbra",
      description:
        "Limpeza de Piscinas na Lagoa de Albufeira e Sesimbra. Manutenção, reparação, tratamento de água e invernagem. Serviços profissionais de Pool Care em Carrasqueira, Santana e região.",
    },
    brand: "PoolBoy",
    hero: {
      // H1 — single natural sentence with the primary key phrase (matches
      // "limpeza de piscinas" + "lagoa de albufeira" + "sesimbra").
      // "Reparação" and secondary localities (Carrasqueira, Santana) are kept
      // out of the hero — they're covered by seo.description, JSON-LD
      // (areaServed / knowsAbout), the services cards, and footer.note.
      headline:
        "Limpeza e Manutenção de Piscinas na Lagoa de Albufeira e Sesimbra",
      cta: "Fale Connosco !",
      ctaNote: "Resposta rápida por WhatsApp",
      mobileNote: "Resposta rápida por WhatsApp",
    },
    services: {
      kicker: "Serviços",
      title: "Criamos soluções higiénicas que protegem o seu sistema",
      copy: "Máxima comodidade com eficiência",
      services: SERVICES,
      langKey: "pt",
    },
    contact: {
      title: "Entre em Contacto",
      copy: "Ligue 960 363 769 ou envie mensagem por WhatsApp, fale-nos da sua piscina e como podemos ajudar",
      cta: "Fale Connosco !",
    },
    footer: {
      note: "PoolBoy · Limpeza e Manutenção de Piscinas · Lagoa de Albufeira, Sesimbra e região",
    },
  },

  en: {
    htmlLang: "en",
    nav: {
      ptLabel: "🇵🇹",
      enLabel: "🇬🇧",
      services: "Services",
      contact: "Contact",
    },
    seo: {
      title: "PoolBoy — Pool Care in Sesimbra and Lagoa de Albufeira",
      description:
        "Pool Care and cleaning in Sesimbra and Lagoa de Albufeira. Maintenance, repair, water treatment and winterization. Professional pool services across Carrasqueira, Santana and the region.",
    },
    brand: "PoolBoy",
    hero: {
      // H1 — single natural sentence with the primary key phrase (matches
      // "pool care" + "sesimbra" + "lagoa de albufeira"). "Repair" and secondary
      // localities (Carrasqueira, Santana) are covered elsewhere.
      headline: "Pool Care and Cleaning in Sesimbra and Lagoa de Albufeira",
      cta: "Get in Touch!",
      ctaNote: "Quick reply on WhatsApp",
      mobileNote: "Quick reply on WhatsApp",
    },
    services: {
      kicker: "Services",
      title: "We create hygienic solutions that protect your system",
      copy: "Maximum comfort with efficiency",
      services: SERVICES,
      langKey: "en",
    },
    contact: {
      title: "Get in Touch",
      copy: "Call 960 363 769 or send a message on WhatsApp — tell us about your pool and how we can help",
      cta: "Get in Touch!",
    },
    footer: {
      note: "PoolBoy · Pool Cleaning and Maintenance · Sesimbra, Lagoa de Albufeira and region",
    },
  },
};
