import { Link } from "react-router-dom";
import { useContent } from "../i18n/useContent.jsx";

// Floating "Language Slider" — a pill pinned to the top-right corner of the
// Hero section.
//
//   container: border #7eebff33, bg #06182785, radius 999px, top:24 right:24
//   active (PT): bg #1889C9, shadow 0 4px 12px #7eebff29, white text
//   inactive (EN): transparent bg, white text
//
// PT/EN are driven from routes (/ and /en), keeping the active/inactive visual
// states.
export default function Header() {
  const { lang } = useContent();

  return (
    <div
      className="absolute right-6 top-6 z-30 flex w-min items-center gap-[3px] rounded-full border border-cyan/20 bg-ink-900/50 p-1"
      style={{ top: 24, right: 24 }}
      aria-label="Language switcher"
    >
      <LangLink to="/" active={lang === "pt"} label="🇵🇹" title="Português" />
      <LangLink to="/en" active={lang === "en"} label="🇬🇧" title="English" />
    </div>
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
        "flex min-w-min cursor-pointer items-center justify-center rounded-full px-[11px] py-[7px] text-[15px] font-bold leading-none text-white transition-colors " +
        (active
          ? "bg-brand text-white shadow-lang-active"
          : "bg-transparent text-white/90 hover:text-white")
      }
    >
      <span aria-hidden="true">{label}</span>
    </Link>
  );
}
