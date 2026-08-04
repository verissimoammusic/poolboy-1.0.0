// =============================================================================
// Inline SVG icons for the PoolBoy site.
//
// Each service icon inlines its own <path> data — keeping each path's `d`
// (relative to the path's local origin) AND its `transform="translate(x y)"`
// so the rendered geometry is pixel-identical to the design. Icons use
// `currentColor` so they inherit Tailwind text color.
//
// Service -> icon mapping:
//   aspiracao   -> IconAspiracao   (vacuum)
//   filtros     -> IconFiltros      (filter funnel)
//   quimico     -> IconQuimico     (chemistry flask)
//   verde       -> IconVerde        (refresh / recovery)
//   abertura    -> IconAbertura    (sun)
//   invernagem  -> IconInvernagem   (snowflake)
//   checkup     -> IconCheckup      (wrench)
//   energia     -> IconEnergia      (gauge / meter)
//   phone       -> IconPhone        (phone)
//
// The WhatsApp glyph is a filled 16x16 mask, reproduced below.
// =============================================================================

const base = {
  viewBox: "0 0 24 24",
  width: 24,
  height: 24,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

// #3606546390 — Aspiração (vacuum handle + base + crossbars)
export function IconAspiracao(props) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path
        d="M 2 0 C 0.895 0 0 0.895 0 2 L 0 13"
        transform="translate(17 5)"
      />
      <path
        d="M 0 1 C 0.6 1.5 1.2 2 2.5 2 C 5 2 5 0 7.5 0 C 10.1 0 9.9 2 12.5 2 C 15 2 15 0 17.5 0 C 18.8 0 19.4 0.5 20 1"
        transform="translate(2 17)"
      />
      <path d="M 0 0 L 10 0" transform="translate(7 13)" />
      <path d="M 0 0 L 10 0" transform="translate(7 9)" />
      <path d="M 2 0 C 0.895 0 0 0.895 0 2 L 0 13" transform="translate(7 5)" />
    </svg>
  );
}

// #1447758117 — Limpeza de Filtros (filter funnel + drips)
export function IconFiltros(props) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M 1 4 L 0 0" transform="translate(15 18)" />
      <path
        d="M 15 11.99 C 15.552 11.99 16 11.542 16 10.99 L 16 10 C 16 8.895 15.105 8 14 8 L 11 8 C 10.448 8 10 7.552 10 7 L 10 2 C 10 0.895 9.105 0 8 0 C 6.895 0 6 0.895 6 2 L 6 7 C 6 7.552 5.552 8 5 8 L 2 8 C 0.895 8 0 8.895 0 10 L 0 10.99 C 0 11.542 0.448 11.99 1 11.99"
        transform="translate(4 2)"
      />
      <path
        d="M 2.001 0 L 16.001 0 L 17.974 6.767 C 18.045 7.065 17.976 7.379 17.786 7.619 C 17.596 7.86 17.307 8 17.001 8 L 1.001 8 C 0.694 8 0.405 7.86 0.215 7.619 C 0.025 7.379 -0.044 7.065 0.028 6.767 Z"
        transform="translate(2.999 14)"
      />
      <path d="M 0 4 L 1 0" transform="translate(8 18)" />
    </svg>
  );
}

// #668900100 — Tratamento Químico (lab beaker)
export function IconQuimico(props) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M 0 0 L 15 0" transform="translate(4.5 3)" />
      <path
        d="M 0 0 L 0 16 C 0 17.105 0.895 18 2 18 L 10 18 C 11.105 18 12 17.105 12 16 L 12 0"
        transform="translate(6 3)"
      />
      <path d="M 0 0 L 12 0" transform="translate(6 14)" />
    </svg>
  );
}

// #324576014 — Recuperação de Água Verde (circular arrows)
export function IconVerde(props) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path
        d="M 0 9 C 0 4.029 4.029 0 9 0 C 11.516 0.009 13.931 0.991 15.74 2.74 L 18 5"
        transform="translate(3 3)"
      />
      <path d="M 5 0 L 5 5 L 0 5" transform="translate(16 3)" />
      <path
        d="M 18 0 C 18 4.971 13.971 9 9 9 C 6.484 8.991 4.069 8.009 2.26 6.26 L 0 4"
        transform="translate(3 12)"
      />
      <path d="M 5 0 L 0 0 L 0 5" transform="translate(3 16)" />
    </svg>
  );
}

// #2962436954 — Abertura de Época (sun: circle + 8 short dot-rays)
export function IconAbertura(props) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path
        d="M 0 4 C 0 1.791 1.791 0 4 0 C 6.209 0 8 1.791 8 4 C 8 6.209 6.209 8 4 8 C 1.791 8 0 6.209 0 4 Z"
        transform="translate(8 8)"
      />
      <path d="M 0 0 L 0.01 0" transform="translate(12 4)" />
      <path d="M 0 0 L 0.01 0" transform="translate(20 12)" />
      <path d="M 0 0 L 0.01 0" transform="translate(12 20)" />
      <path d="M 0 0 L 0.01 0" transform="translate(4 12)" />
      <path d="M 0 0 L 0.01 0" transform="translate(17.657 6.343)" />
      <path d="M 0 0 L 0.01 0" transform="translate(17.657 17.657)" />
      <path d="M 0 0 L 0.01 0" transform="translate(6.343 17.657)" />
      <path d="M 0 0 L 0.01 0" transform="translate(6.343 6.343)" />
    </svg>
  );
}

// #2850519585 — Invernagem (snowflake)
export function IconInvernagem(props) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M 4 2.5 L 2.75 0 L 0 0.5" transform="translate(6 17.5)" />
      <path d="M 4 0 L 2.75 2.5 L 0 2" transform="translate(6 4)" />
      <path d="M 0 2.5 L 1.25 0 L 4 0.5" transform="translate(14 17.5)" />
      <path d="M 0 0 L 1.25 2.5 L 4 2" transform="translate(14 4)" />
      <path d="M 7 6 L 4 0 L 0 0" transform="translate(10 15)" />
      <path d="M 3 0 L 0 6 L 1.5 9" transform="translate(14 3)" />
      <path d="M 0 3 L 6.5 3 L 8 0" transform="translate(2 9)" />
      <path d="M 1.5 0 L 0 2 L 1.5 4" transform="translate(18.5 10)" />
      <path d="M 8 0 L 1.5 0 L 0 3" transform="translate(14 12)" />
      <path d="M 0 0 L 1.5 2 L 0 4" transform="translate(4 10)" />
      <path d="M 0 9 L 3 3 L 1.5 0" transform="translate(7 12)" />
      <path d="M 0 0 L 3 6 L 7 6" transform="translate(7 3)" />
    </svg>
  );
}

// #997315869 — Check-up aos Equipamentos (wrench)
export function IconCheckup(props) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path
        d="M 12.7 4.304 C 12.319 4.693 12.319 5.315 12.7 5.704 L 14.3 7.304 C 14.689 7.685 15.312 7.685 15.7 7.304 L 18.806 4.199 C 19.126 3.877 19.669 3.979 19.789 4.417 C 20.406 6.66 19.671 9.058 17.902 10.569 C 16.133 12.08 13.65 12.433 11.53 11.474 L 3.62 19.384 C 2.792 20.212 1.449 20.212 0.621 19.383 C -0.207 18.555 -0.207 17.212 0.621 16.384 L 8.531 8.474 C 7.572 6.354 7.925 3.871 9.436 2.103 C 10.948 0.334 13.345 -0.402 15.588 0.215 C 16.026 0.335 16.128 0.877 15.807 1.199 Z"
        transform="translate(2 1.996)"
      />
    </svg>
  );
}

// #4021185382 — Otimização de Consumo Energético (meter / control panel)
export function IconEnergia(props) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path
        d="M 2 20 C 0.895 20 0 19.105 0 18 L 0 2 C 0 0.895 0.895 0 2 0 L 14 0 C 15.105 0 16 0.895 16 2 L 16 18 C 16 19.105 15.105 20 14 20 Z"
        transform="translate(4 2)"
      />
      <path d="M 0 0 L 8 0" transform="translate(8 6)" />
      <path d="M 0 0 L 0 4" transform="translate(16 14)" />
      <path d="M 0 0 L 0.01 0" transform="translate(16 10)" />
      <path d="M 0 0 L 0.01 0" transform="translate(12 10)" />
      <path d="M 0 0 L 0.01 0" transform="translate(8 10)" />
      <path d="M 0 0 L 0.01 0" transform="translate(12 14)" />
      <path d="M 0 0 L 0.01 0" transform="translate(8 14)" />
      <path d="M 0 0 L 0.01 0" transform="translate(12 18)" />
      <path d="M 0 0 L 0.01 0" transform="translate(8 18)" />
    </svg>
  );
}

// #3459148117 — Phone (used on the closing white button)
export function IconPhone(props) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path
        d="M 11.832 14.568 C 12.257 14.763 12.761 14.637 13.045 14.265 L 13.4 13.8 C 13.778 13.296 14.37 13 15 13 L 18 13 C 19.105 13 20 13.895 20 15 L 20 18 C 20 19.105 19.105 20 18 20 C 8.059 20 0 11.941 0 2 C 0 0.895 0.895 0 2 0 L 5 0 C 6.105 0 7 0.895 7 2 L 7 5 C 7 5.63 6.704 6.222 6.2 6.6 L 5.732 6.951 C 5.353 7.24 5.231 7.756 5.44 8.184 C 6.807 10.96 9.054 13.205 11.832 14.568"
        transform="translate(2 2)"
      />
    </svg>
  );
}

// WhatsApp glyph — a filled 16x16 mask, rendered as a filled glyph in the
// brand color.
export function IconWhatsApp(props) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={24}
      height={24}
      fill="currentColor"
      {...props}
      aria-hidden="true"
    >
      <path d="M 11.61 9.588 C 11.412 9.489 10.438 9.01 10.257 8.943 C 10.075 8.877 9.943 8.845 9.81 9.043 C 9.679 9.241 9.299 9.687 9.183 9.819 C 9.068 9.952 8.952 9.968 8.754 9.869 C 8.556 9.769 7.917 9.561 7.161 8.886 C 6.572 8.361 6.174 7.712 6.059 7.513 C 5.943 7.315 6.047 7.208 6.145 7.109 C 6.235 7.021 6.344 6.878 6.443 6.763 C 6.541 6.647 6.575 6.564 6.641 6.431 C 6.707 6.299 6.675 6.184 6.625 6.085 C 6.575 5.985 6.179 5.01 6.014 4.613 C 5.853 4.227 5.689 4.28 5.568 4.273 C 5.441 4.268 5.315 4.266 5.188 4.267 C 5.056 4.267 4.841 4.316 4.66 4.515 C 4.479 4.713 3.967 5.192 3.967 6.167 C 3.967 7.142 4.677 8.084 4.775 8.217 C 4.874 8.349 6.173 10.35 8.16 11.208 C 8.633 11.412 9.001 11.534 9.289 11.625 C 9.764 11.776 10.196 11.755 10.537 11.703 C 10.917 11.647 11.709 11.224 11.874 10.761 C 12.039 10.299 12.039 9.902 11.989 9.819 C 11.94 9.737 11.808 9.687 11.609 9.588 M 7.995 14.523 L 7.993 14.523 C 6.813 14.523 5.654 14.206 4.639 13.605 L 4.398 13.462 L 1.904 14.117 L 2.569 11.685 L 2.413 11.435 C 1.753 10.385 1.404 9.169 1.406 7.929 C 1.407 4.295 4.363 1.339 7.998 1.339 C 9.758 1.339 11.413 2.026 12.657 3.271 C 13.897 4.505 14.591 6.185 14.585 7.934 C 14.583 11.567 11.627 14.523 7.995 14.523 M 13.604 2.325 C 12.12 0.832 10.1 -0.005 7.995 0 C 3.625 0 0.069 3.557 0.067 7.928 C 0.067 9.325 0.431 10.689 1.125 11.891 L 0 16 L 4.203 14.897 C 5.366 15.53 6.668 15.862 7.992 15.863 L 7.995 15.863 C 12.365 15.863 15.922 12.306 15.924 7.934 C 15.931 5.83 15.095 3.81 13.604 2.325" />
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
