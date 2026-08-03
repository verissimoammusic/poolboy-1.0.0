// =============================================================================
// Inline SVG icons, re-implemented from the `#svg-templates` block in
// reference/index.html. Each icon is a 24x24 stroke icon rendered with
// `currentColor`, so it inherits Tailwind text color.
//
// Map (service id -> icon):
//   aspiracao   -> vacuum / pool-cleaning
//   filtros     -> filter
//   quimico     -> droplet (chemistry)
//   verde       -> refresh (recovery)
//   abertura    -> sun (season opening)
//   invernagem  -> snow (winterization)
//   checkup     -> clipboard (inspection)
//   energia     -> gauge (energy optimization)
// =============================================================================

const base = {
  viewBox: "0 0 24 24",
  width: 28,
  height: 28,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function IconAspiracao(props) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      {/* pool-cleaning: handle + vacuum head over water */}
      <path d="M17 5 L17 18 a2 2 0 0 1 -2 2 H9 a2 2 0 0 1 -2 -2 L7 5" />
      <path d="M4 17 C 4.6 17.5 5.2 18 6.5 18 C 9 18 9 16 11.5 16 C 14.1 16 13.9 18 16.5 18 C 19 18 19 16 21.5 16" />
      <path d="M9 13 H15" />
      <path d="M9 9 H15" />
    </svg>
  );
}

export function IconFiltros(props) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      {/* filter funnel */}
      <path d="M3 4 H21 L14 12 V20 L10 18 V12 Z" />
    </svg>
  );
}

export function IconQuimico(props) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      {/* droplet */}
      <path d="M12 3 C 12 3 5 10 5 15 a7 7 0 0 0 14 0 C 19 10 12 3 12 3 Z" />
      <path d="M9 15 a3 3 0 0 0 3 3" />
    </svg>
  );
}

export function IconVerde(props) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      {/* recovery: circular arrows */}
      <path d="M21 12 a9 9 0 1 1 -3 -6.7" />
      <path d="M21 4 V9 H16" />
      <path d="M3 12 a9 9 0 1 0 3 6.7" opacity="0" />
    </svg>
  );
}

export function IconAbertura(props) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      {/* sun */}
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2 V4" />
      <path d="M12 20 V22" />
      <path d="M4 12 H2" />
      <path d="M22 12 H20" />
      <path d="M5.6 5.6 L4.2 4.2" />
      <path d="M19.8 19.8 L18.4 18.4" />
      <path d="M5.6 18.4 L4.2 19.8" />
      <path d="M19.8 4.2 L18.4 5.6" />
    </svg>
  );
}

export function IconInvernagem(props) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      {/* snowflake */}
      <path d="M12 2 V22" />
      <path d="M4 7 L20 17" />
      <path d="M20 7 L4 17" />
      <path d="M9 4 L12 6 L15 4" />
      <path d="M9 20 L12 18 L15 20" />
    </svg>
  );
}

export function IconCheckup(props) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      {/* clipboard with check */}
      <rect x="5" y="4" width="14" height="18" rx="2" />
      <path d="M9 4 a2 2 0 0 1 2 -2 h2 a2 2 0 0 1 2 2" opacity="0" />
      <path d="M9 13 l2 2 l4 -4" />
    </svg>
  );
}

export function IconEnergia(props) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      {/* gauge */}
      <path d="M12 14 L15 9" />
      <path d="M5 18 a8 8 0 1 1 14 0" />
      <circle cx="12" cy="14" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconWhatsApp(props) {
  // WhatsApp glyph (brand mark)
  return (
    <svg
      viewBox="0 0 24 24"
      width={22}
      height={22}
      fill="currentColor"
      {...props}
      aria-hidden="true"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.8 14.13c-.25.69-1.44 1.32-1.99 1.36-.51.04-1.16.2-3.74-.78-3.16-1.24-5.18-4.46-5.34-4.67-.16-.21-1.27-1.69-1.27-3.22 0-1.53.8-2.28 1.09-2.59.29-.31.63-.39.84-.39.21 0 .42 0 .6.01.19.01.45-.07.7.54.25.62.86 2.14.93 2.3.07.16.12.35.02.56-.1.21-.16.34-.31.52-.16.18-.33.4-.47.54-.16.16-.32.33-.14.64.18.31.8 1.32 1.72 2.14 1.18 1.05 2.18 1.38 2.49 1.54.31.16.49.13.67-.08.18-.21.77-.9.98-1.21.21-.31.41-.26.69-.16.29.1 1.82.86 2.13 1.02.31.16.52.24.6.37.08.13.08.75-.17 1.44Z" />
    </svg>
  );
}

const ICONS = {
  aspiracao: IconAspiracao,
  filtros: IconFiltros,
  quimico: IconQuimico,
  verde: IconVerde,
  abertura: IconAbertura,
  invernagem: IconInvernagem,
  checkup: IconCheckup,
  energia: IconEnergia,
};

export function ServiceIcon({ id, ...props }) {
  const Cmp = ICONS[id] || IconQuimico;
  return <Cmp {...props} />;
}
