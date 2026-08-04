import { useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useContent } from "../i18n/useContent.jsx";

// Floating "Language Dropdown" — a pill pinned to the top-right corner of the
// Hero section. Shows the current language as a flag in a circle next to its
// 2-letter uppercase code; opening it reveals the PT / EN / FR options in the
// same format.
//
//   container: absolute, top 24 right 24, z-30 (pinned to Hero, out of flow)
//   trigger:   pill — border cyan/20, bg ink-900/50, radius 999px, fixed width
//              so opening/closing the menu can never shift any layout
//   menu:      pill-styled dropdown — same border/bg, rounded-2xl, mt-2
//   active row: bg-brand (#1889C9), shadow-lang-active, white text
//   inactive:   transparent bg, white/90 text, hover white
//
// Flags are inline SVG clipped by a <circle>, so they render identically on
// every platform (emoji flags fall back to plain letter glyphs on Windows).
//
// Language is driven from routes (/, /en, /fr), keeping the active/inactive
// visual states in sync with the URL — exactly like the old slider. Opening
// the menu is purely visual (no navigation); clicking an item uses <Link> so
// react-router handles the route change and LandingPage's key={lang} remounts
// the subtree, flipping every localized string + <html lang> + SEO together.
//
// A11y / UX:
//   - flags are aria-hidden; the trigger's aria-label and each item's title
//     carry the full language name ("Português", "English", "Français")
//   - trigger is a <button> with aria-haspopup/aria-expanded/aria-controls
//   - the menu is a real <ul role="menu"> with <li role="none"> and
//     <Link role="menuitemradio" aria-checked>
//   - Escape closes; clicking outside closes; focus returns to the trigger
//   - Arrow Up/Down moves between items, Enter/Space activates the focused item

// 24×24 circular flag. Size is controlled via className (w/h) by the caller.
function CircleFlag({ children, title }) {
  const clipId = useId();
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className="h-full w-full"
    >
      <title>{title}</title>
      <defs>
        <clipPath id={clipId}>
          <circle cx="12" cy="12" r="12" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>{children}</g>
    </svg>
  );
}

function FlagPT({ title }) {
  return (
    <CircleFlag title={title}>
      {/* Green field */}
      <rect width="24" height="24" fill="#046A38" />
      {/* Red fly (60% of the width) */}
      <rect x="9.6" width="14.4" height="24" fill="#DA291C" />
      {/* Armillary sphere + shield */}
      <circle cx="9.6" cy="12" r="5.2" fill="#FFE900" />
      <circle cx="9.6" cy="12" r="3.4" fill="#DA291C" />
      <rect x="7.3" y="9.4" width="4.6" height="5.2" rx="0.7" fill="#FFFFFF" />
      <rect x="8.2" y="10.3" width="2.8" height="3.4" rx="0.4" fill="#046A38" />
    </CircleFlag>
  );
}

function FlagEN({ title }) {
  // Union Jack — blue field, white + red saltires, then St George's cross.
  // The white saltire goes corner-to-corner; the red ones are inset so only
  // their tips emerge where the white was clipped by the cross.
  return (
    <CircleFlag title={title}>
      <rect width="24" height="24" fill="#012169" />
      {/* White saltire */}
      <path d="M0 0 L24 24 M24 0 L0 24" stroke="#FFFFFF" strokeWidth="4.2" />
      {/* Red saltires (inset / counter-changed segments) */}
      <path d="M0 0 L8 8 M16 16 L24 24" stroke="#C8102E" strokeWidth="1.6" />
      <path d="M24 0 L16 8 M8 16 L0 24" stroke="#C8102E" strokeWidth="1.6" />
      {/* White-bordered red cross of St George */}
      <path d="M12 0 V24 M0 12 H24" stroke="#FFFFFF" strokeWidth="8" />
      <path d="M12 0 V24 M0 12 H24" stroke="#C8102E" strokeWidth="4.8" />
    </CircleFlag>
  );
}

function FlagFR({ title }) {
  return (
    <CircleFlag title={title}>
      <rect width="8" height="24" fill="#0055A4" />
      <rect x="8" width="8" height="24" fill="#FFFFFF" />
      <rect x="16" width="8" height="24" fill="#EF4135" />
    </CircleFlag>
  );
}

const LANGUAGES = [
  { code: "pt", to: "/", label: "Português", Flag: FlagPT },
  { code: "en", to: "/en", label: "English", Flag: FlagEN },
  { code: "fr", to: "/fr", label: "Français", Flag: FlagFR },
];

export default function Header() {
  const { lang } = useContent();
  const [open, setOpen] = useState(false);
  // Index of the option that should receive focus while the menu is open.
  // Initialized to the active language so keyboard nav starts there.
  const [focusIdx, setFocusIdx] = useState(
    () => LANGUAGES.findIndex((l) => l.code === lang) ?? 0,
  );
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const itemRefs = useRef([]);

  // Keep the focused index in sync with the active language whenever the menu
  // is closed and the route changes.
  useEffect(() => {
    if (!open) {
      setFocusIdx(LANGUAGES.findIndex((l) => l.code === lang) ?? 0);
    }
  }, [lang, open]);

  // Close on click-outside.
  useEffect(() => {
    if (!open) return;
    function onPointerDown(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // Close on Escape and manage focus while the menu is open.
  useEffect(() => {
    if (!open) return;
    const items = itemRefs.current;
    // Focus the initial item when the menu opens.
    items[focusIdx]?.focus();
    function onKeydown(e) {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setFocusIdx((i) => (i + 1) % LANGUAGES.length);
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setFocusIdx((i) => (i - 1 + LANGUAGES.length) % LANGUAGES.length);
        return;
      }
      if (e.key === "Home") {
        e.preventDefault();
        setFocusIdx(0);
        return;
      }
      if (e.key === "End") {
        e.preventDefault();
        setFocusIdx(LANGUAGES.length - 1);
        return;
      }
    }
    document.addEventListener("keydown", onKeydown);
    return () => document.removeEventListener("keydown", onKeydown);
  }, [open, focusIdx]);

  // When focusIdx changes (via arrows), move DOM focus to that item.
  useEffect(() => {
    if (open) itemRefs.current[focusIdx]?.focus();
  }, [focusIdx, open]);

  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  return (
    <div ref={rootRef} className="absolute right-6 top-6 z-30">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="lang-menu"
        aria-label={`Language: ${current.label}. Change language`}
        className="flex w-[76px] cursor-pointer items-center justify-between gap-2 rounded-full border border-cyan/20 bg-ink-900/50 px-2.5 py-[7px] text-[13px] font-bold uppercase leading-none tracking-wide text-white transition-colors hover:bg-ink-900/70"
        style={{ top: 24, right: 24 }}
      >
        <span className="flex items-center gap-1.5">
          <span
            aria-hidden="true"
            className="block h-[18px] w-[18px] shrink-0 overflow-hidden rounded-full shadow-[inset_0_0_0_1px_rgba(255,255,255,0.25)]"
          >
            <current.Flag title={current.label} />
          </span>
          <span>{current.code}</span>
        </span>
        {/* Caret — rotates when open */}
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          width="14"
          height="14"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          <path d="M 0 0 L 6 6 L 12 0" transform="translate(6 9)" />
        </svg>
      </button>

      {open && (
        <ul
          id="lang-menu"
          role="menu"
          aria-label="Change language"
          className="absolute right-0 top-full mt-2 flex w-[104px] flex-col gap-[3px] rounded-2xl border border-cyan/20 bg-ink-900/85 p-1.5 shadow-lang-active backdrop-blur-sm"
        >
          {LANGUAGES.map((l, i) => {
            const active = l.code === lang;
            return (
              <li key={l.code} role="none">
                <Link
                  ref={(el) => (itemRefs.current[i] = el)}
                  to={l.to}
                  role="menuitemradio"
                  aria-checked={active ? "true" : "false"}
                  aria-label={l.label}
                  tabIndex={i === focusIdx ? 0 : -1}
                  onClick={() => setOpen(false)}
                  title={l.label}
                  className={
                    "flex w-full cursor-pointer items-center gap-2 rounded-xl px-2.5 py-2 text-[13px] font-bold uppercase leading-none tracking-wide text-white transition-colors " +
                    (active
                      ? "bg-brand text-white shadow-lang-active"
                      : "bg-transparent text-white/90 hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white focus:outline-none")
                  }
                >
                  <span
                    aria-hidden="true"
                    className="block h-[18px] w-[18px] shrink-0 overflow-hidden rounded-full shadow-[inset_0_0_0_1px_rgba(255,255,255,0.25)]"
                  >
                    <l.Flag title={l.label} />
                  </span>
                  <span>{l.code}</span>
                  {active && (
                    <span aria-hidden="true" className="ml-auto text-white">
                      ✓
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
