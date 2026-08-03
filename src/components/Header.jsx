import { Link, useLocation } from "react-router-dom";
import { useContent } from "../i18n/useContent.jsx";

// Sticky top bar with the PoolBoy brand + a PT/EN language switch.
// Mirrors the original "Language Slider" (PT active / EN inactive) using routes.
export default function Header() {
  const { lang, data, alternatePath } = useContent();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-ink-900/70 backdrop-blur-md">
      <div className="container-content flex h-16 items-center justify-between">
        {/* Brand */}
        <Link
          to={lang === "en" ? "/en" : "/"}
          className="group flex items-center gap-2.5"
        >
          <span className="font-display text-xl font-bold tracking-tight text-white">
            {data.brand}
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-brand transition-colors group-hover:bg-brand-400" />
        </Link>

        {/* Language switch */}
        <nav
          className="flex items-center gap-1.5"
          aria-label="Language switcher"
        >
          <LangLink
            to="/"
            active={lang === "pt"}
            label={data.nav.ptLabel}
            title="Português"
            current={location.pathname}
          />
          <span className="text-white/20" aria-hidden="true">
            |
          </span>
          <LangLink
            to="/en"
            active={lang === "en"}
            label={data.nav.enLabel}
            title="English"
            current={location.pathname}
          />
        </nav>
      </div>
    </header>
  );
}

function LangLink({ to, active, label, title }) {
  return (
    <Link
      to={to}
      title={title}
      aria-label={title}
      aria-current={active ? "true" : undefined}
      className={
        "flex h-9 min-w-9 items-center justify-center rounded-full px-3 text-sm font-bold transition-all " +
        (active
          ? "bg-brand text-white shadow-glow"
          : "bg-white/0 text-white/60 hover:text-white")
      }
    >
      <span aria-hidden="true">{label}</span>
      <span className="sr-only">{title}</span>
    </Link>
  );
}
