// =============================================================================
// PoolBoy content + i18n dictionary.
//
// PT copy is the original Portuguese site copy. EN copy is a faithful
// translation written for this rebuild.
//
// Contact details:
//   Phone     : +351 931 492 206  (display: 931 492 206)
//   WhatsApp  : https://wa.me/351931492206
//   Canonical : https://poolboy.pt/  (drives SEO canonical + hreflang in
//             src/components/Seo.jsx)
// =============================================================================

export const CONTACT = {
  phoneDisplay: "931 492 206",
  phoneHref: "tel:+351931492206",
  whatsappBase: "https://wa.me/351931492206",
  // Default WhatsApp greeting, loaded as a pre-filled message when a visitor
  // taps either WhatsApp button. The button itself stays text-free — this text
  // only appears inside the WhatsApp chat once opened. Kept simple and
  // intent-focused so the client can easily complete the "region" placeholder.
  whatsappPlaceholder: {
    pt: "Bom dia, preciso de [limpezas regulares / uma reparação pontual / outro serviço] na minha piscina em [região].",
    en: "Good Morning, I need a [recurring cleaning / a one-time fix job / another service] on my pool in [region].",
    fr: "Bonjour, j'ai besoin [d'un nettoyage régulier / d'une réparation ponctuelle / d'autre service] pour ma piscine à [région].",
  },
  // Chip-based message composer: the greeting is split around a single
  // {service} placeholder. The visitor taps one of `serviceOptions` chips to
  // fill it in — no typing required. The composed message is what gets sent
  // to WhatsApp. Region was removed per design.
  whatsappCompose: {
    pt: {
      before: "Bom dia, preciso de ",
      after: " na minha piscina.",
      closing: " Cumprimentos.",
      options: [
        "limpezas regulares",
        "recuperação de água verde",
        "um outro serviço",
      ],
    },
    en: {
      before: "Good Morning, I need ",
      after: " on my pool.",
      closing: " Best regards.",
      options: ["recurring cleaning", "green water recovery", "a service"],
    },
    fr: {
      before: "Bonjour, j'ai besoin ",
      after: " pour ma piscine.",
      closing: " Cordialement.",
      options: [
        "d'un nettoyage régulier",
        "d'une récupération d'eau verte",
        "d'un service",
      ],
    },
  },
  canonical: "https://poolboy.pt/",
};

// Builds the wa.me link with the pre-filled, URL-encoded default message for
// the given language ("pt" | "en" | "fr"). Falls back to the default language
// for any unknown code so the link is always valid.
//
// `service` (optional) is a human-readable service name that gets prepended to
// the greeting, so a visitor who taps a specific service card already tells us
// which service they want. When omitted the plain default greeting is used.
export function whatsappHref(lang, service) {
  const base =
    CONTACT.whatsappPlaceholder[lang] ?? CONTACT.whatsappPlaceholder.pt;
  const message = service ? `${service} — ${base}` : base;
  return `${CONTACT.whatsappBase}?text=${encodeURIComponent(message)}`;
}

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
      subtitle: "Deep floor and wall vacuuming",
    },
    fr: {
      title: "Nettoyage Régulier",
      subtitle: "Aspiration profonde du fond et des parois",
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
    fr: {
      title: "Nettoyage des Filtres",
      subtitle: "Circulation et filtration plus propres",
    },
  },
  {
    id: "quimico",
    pt: { title: "Tratamento Químico", subtitle: "Equilíbrio de pH e cloro" },
    en: { title: "Chemical Treatment", subtitle: "pH and chlorine balance" },
    fr: {
      title: "Traitement Chimique",
      subtitle: "Équilibre du pH et du chlore",
    },
  },
  {
    id: "verde",
    pt: {
      title: "Recuperação de Água Verde",
      subtitle: "Tratamentos rápidos de recuperação",
    },
    en: { title: "Green Water Recovery", subtitle: "Fast recovery treatments" },
    fr: {
      title: "Récupération d'Eau Verte",
      subtitle: "Traitements de récupération rapides",
    },
  },
  {
    id: "abertura",
    pt: {
      title: "Abertura de Época",
      subtitle: "Ativação da piscina quando chega o calor",
    },
    en: {
      title: "Pool Opening Opening",
      subtitle: "Complete activation as soon as the warm weather arrives",
    },
    fr: {
      title: "Ouverture de Saison",
      subtitle: "Mise en service complète dès l'arrivée des beaux jours",
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
      subtitle: "Treatment and protection for the cold season",
    },
    fr: {
      title: "Hivernage",
      subtitle: "Traitement et protection pour la saison froide",
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
      subtitle: "Preventive safeguard assessments",
    },
    fr: {
      title: "Contrôle des Équipements",
      subtitle: "Inspections préventives de sauvegarde",
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
    fr: {
      title: "Optimisation de la Consommation Énergétique",
      subtitle: "Analyse complète du système",
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
      // Main heading — the primary service description (subtitle from original)
      headline: "Limpeza e Manutenção de Piscinas",
      // Subtitle — the three core service pillars
      subtitle: "Limpeza · Manutenção · Reparação",
      // Location line — secondary text with geographic focus
      location: "Lagoa de Albufeira, Sesimbra e região",
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
      kicker: "Vamos Conversar",
      title: "A sua piscina merece cuidado profissional",
      copy: "Resposta rápida, orçamento sem compromisso. Diga-nos onde fica a sua piscina e nós tratamos do resto.",
      cta: "WhatsApp",
      ctaPhone: "Ligar",
      trustPoints: [
        "Resposta em menos de 1 hora",
        "Sem compromisso",
        "Lagoa de Albufeira, Sesimbra e região",
      ],
    },
    footer: {
      note: "PoolBoy · Limpeza e Manutenção de Piscinas · Lagoa de Albufeira, Sesimbra e região",
    },
    features: {
      items: [
        {
          id: "cleaning",
          icon: "aspiracao",
          title: "Limpeza Recorrente",
          subtitle:
            "Manutenção periódica com aspiração do fundo e paredes, para uma piscina impecável todo o ano",
        },
        {
          id: "reparation",
          icon: "checkup",
          title: "Reparação",
          subtitle:
            "Trabalhos de reparação rápidos e fiáveis para bombas, filtros e equipamentos",
        },
        {
          id: "opening",
          icon: "abertura",
          title: "Abertura / Invernagem",
          subtitle:
            "Abertura de época ou proteção e invernagem para os meses frios",
        },
      ],
    },
  },

  en: {
    htmlLang: "en",
    nav: {
      ptLabel: "🇵🇹",
      enLabel: "🇬🇧",
      frLabel: "🇫🇷",
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
      // Main heading — the primary service description (subtitle from original)
      headline: "Pool Care and Maintenance",
      // Subtitle — the three core service pillars
      subtitle: "Cleaning · Maintenance · Repair",
      // Location line — secondary text with geographic focus
      location: "Sesimbra, Lagoa de Albufeira and region",
      cta: "Get in Touch!",
      ctaNote: "Quick reply on WhatsApp",
      mobileNote: "Quick reply on WhatsApp",
    },
    services: {
      kicker: "Services",
      title: "We deliver healthy water solutions that protect your systems",
      copy: "For maximum convenience and cost-effective maintenance",
      services: SERVICES,
      langKey: "en",
    },
    contact: {
      kicker: "Let's Talk",
      title: "Your pool deserves professional care",
      copy: "Quick response, free quote. Tell us where your pool is and we'll take care of the rest.",
      cta: "WhatsApp",
      ctaPhone: "Call",
      trustPoints: [
        "Reply in under 1 hour",
        "No obligation",
        "Lagoa de Albufeira, Sesimbra and region",
      ],
    },
    footer: {
      note: "PoolBoy · Pool Cleaning and Maintenance · Sesimbra, Lagoa de Albufeira and region",
    },
    features: {
      items: [
        {
          id: "cleaning",
          icon: "aspiracao",
          title: "Recurring Cleaning",
          subtitle:
            "Scheduled maintenance with deep floor and wall vacuuming to keep your pool spotless all year",
        },
        {
          id: "reparation",
          icon: "checkup",
          title: "Reparation",
          subtitle:
            "Fast, reliable repair work for pumps, filters and pool equipment",
        },
        {
          id: "opening",
          icon: "abertura",
          title: "Opening Service & Winterizing",
          subtitle:
            "Season opening or winterizing protection for the cold months",
        },
      ],
    },
  },

  // ---------------------------------------------------------------------------
  // French (fr) — final translation of the EN copy. The structure stays
  // identical to `pt` / `en`, so all fields line up 1:1.
  // ---------------------------------------------------------------------------
  fr: {
    htmlLang: "fr",
    nav: {
      ptLabel: "🇵🇹",
      enLabel: "🇬🇧",
      frLabel: "🇫🇷",
      services: "Services",
      contact: "Contact",
    },
    seo: {
      title: "PoolBoy — Entretien de Piscine à Sesimbra et Lagoa de Albufeira",
      description:
        "Entretien et nettoyage de piscine à Sesimbra et Lagoa de Albufeira. Maintenance, réparation, traitement de l'eau et hivernage. Services professionnels de piscine à Carrasqueira, Santana et dans la région.",
    },
    brand: "PoolBoy",
    hero: {
      // Main heading — the primary service description (subtitle from original)
      headline: "Entretien et Maintenance de Piscine",
      // Subtitle — the three core service pillars
      subtitle: "Nettoyage · Maintenance · Réparation",
      // Location line — secondary text with geographic focus
      location: "Sesimbra, Lagoa de Albufeira et région",
      cta: "Contactez-nous !",
      ctaNote: "Réponse rapide sur WhatsApp",
      mobileNote: "Réponse rapide sur WhatsApp",
    },
    services: {
      kicker: "Services",
      title:
        "Nous fournissons des solutions d'eau saines qui protègent vos systèmes",
      copy: "Pour un confort maximal et un entretien rentable",
      services: SERVICES,
      langKey: "fr",
    },
    contact: {
      kicker: "Parlons-en",
      title: "Votre piscine mérite un soin professionnel",
      copy: "Réponse rapide, devis gratuit. Dites-nous où se trouve votre piscine et nous nous occupons du reste.",
      cta: "WhatsApp",
      ctaPhone: "Appeler",
      trustPoints: [
        "Réponse en moins d'1 heure",
        "Sans engagement",
        "Lagoa de Albufeira, Sesimbra et région",
      ],
    },
    footer: {
      note: "PoolBoy · Nettoyage et Entretien de Piscine · Sesimbra, Lagoa de Albufeira et région",
    },
    features: {
      items: [
        {
          id: "cleaning",
          icon: "aspiracao",
          title: "Nettoyage Régulier",
          subtitle:
            "Entretien programmé avec aspiration profonde du fond et des parois pour garder votre piscine impeccable toute l'année",
        },
        {
          id: "reparation",
          icon: "checkup",
          title: "Réparation",
          subtitle:
            "Travaux de réparation rapides et fiables pour pompes, filtres et équipements de piscine",
        },
        {
          id: "opening",
          icon: "abertura",
          title: "Ouverture / Hivernage",
          subtitle:
            "Ouverture de saison ou protection d'hivernage pour les mois froids",
        },
      ],
    },
  },
};
