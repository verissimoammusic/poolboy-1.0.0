import { useLocation } from "react-router-dom";
import { content } from "./content.js";

// Supported language codes.
const SUPPORTED = ["pt", "en", "fr"];
const DEFAULT_LANG = "pt";

// Maps a browser/system locale (e.g. "en-US", "fr-FR", "pt-PT") to one of the
// three supported codes. Falls back to the default language on any mismatch.
export function detectBrowserLanguage() {
  if (typeof navigator === "undefined") return DEFAULT_LANG;
  const candidates = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];
  for (const locale of candidates) {
    const base = String(locale).split("-")[0].toLowerCase();
    if (SUPPORTED.includes(base)) return base;
  }
  return DEFAULT_LANG;
}

// Resolves the active language from the current URL pathname:
//   "/"      -> Portuguese (default)
//   "/en"    -> English
//   "/fr"    -> French
// Falls back to Portuguese for any other path.
//
// We read from the location pathname (not useParams) because the routes are
// static ("/", "/en", "/fr") rather than a dynamic "/:lang" segment, so
// useParams would always return an empty object.
//
// `lang` is guaranteed to be one of the three supported codes ("pt" | "en" |
// "fr"). The optional-chaining fallback to "pt" keeps the site working even if
// a route is added to App.jsx before its content block exists in content.js.
export function useContent() {
  const { pathname } = useLocation();
  const firstSegment = pathname.replace(/^\/+/, "").split(/[/?#]/)[0];
  const key =
    firstSegment === "en" || firstSegment === "fr" ? firstSegment : "pt";
  const data = content[key] ?? content.pt;
  return { lang: key, data };
}
