import { useLocation } from "react-router-dom";
import { content } from "./content.js";

// Resolves the active language from the current URL pathname:
//   "/"      -> Portuguese (default)
//   "/en"    -> English
// Falls back to Portuguese for any other path.
//
// We read from the location pathname (not useParams) because the routes are
// static ("/" and "/en") rather than a dynamic "/:lang" segment, so useParams
// would always return an empty object.
export function useContent() {
  const { pathname } = useLocation();
  const key = pathname.replace(/^\/+/, "").startsWith("en") ? "en" : "pt";
  const data = content[key];
  return { lang: key, data, alternatePath: key === "pt" ? "/en" : "/" };
}
