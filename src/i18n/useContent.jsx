import { useParams } from "react-router-dom";
import { content } from "./content.js";

// Resolves the active language from the route (`/` => pt, `/en` => en).
// Falls back to Portuguese for any unknown route.
export function useContent() {
  const { lang } = useParams();
  const key = lang === "en" ? "en" : "pt";
  const data = content[key];
  return { lang: key, data, alternatePath: key === "pt" ? "/en" : "/" };
}
