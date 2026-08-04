import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import { detectBrowserLanguage } from "./i18n/useContent.jsx";

// Route-based i18n:
//   /    -> Portuguese (default)
//   /en  -> English
//   /fr  -> French
// Any unknown path redirects to the Portuguese homepage.
//
// "Setup on arrival": on the very first SPA mount, the language is derived
// from the browser/system locale (see detectBrowserLanguage) and the visitor is
// redirected once to the matching language route (e.g. /en or /fr).
//
// Crucially, this auto-redirect only ever runs on the FIRST render of "/" in a
// SPA session (tracked via a module-level flag that resets on full page
// reload). After that, manually selecting a language always works — for
// example picking Portuguese from the dropdown (whose link target is "/")
// reliably lands on the Portuguese home instead of bouncing back to the
// browser's detected language.
export default function App() {
  // Resolve the browser/system language once, at the very first render.
  const [arrivalLanguage] = useState(() =>
    typeof window === "undefined" ? "pt" : detectBrowserLanguage(),
  );

  return (
    <Routes>
      <Route
        path="/"
        element={<RootHome arrivalLanguage={arrivalLanguage} />}
      />
      <Route path="/en" element={<LandingPage />} />
      <Route path="/fr" element={<LandingPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

// Module-level flag: tracks whether the auto-redirect has already fired in
// this SPA session. Unlike sessionStorage, this resets on a full page reload,
// so the browser-language detection runs again on each fresh visit, while
// still preventing infinite loops when the user explicitly navigates to "/"
// (e.g. clicking the PT flag in the language slider).
let hasAutoRedirected = false;

// LandingPage wrapper that applies the "setup on arrival" rule: on the root "/"
// route and only during the initial SPA session, if the browser/system language
// detected on arrival differs from the default (Portuguese), redirect once to
// the matching localized route. The module-level flag prevents re-redirecting
// when the user later clicks the PT flag (link target "/"), but a full page
// reload resets it so auto-detect works on fresh visits.
function RootHome({ arrivalLanguage }) {
  const [shouldRedirect] = useState(() => {
    if (hasAutoRedirected) return false;
    hasAutoRedirected = true;
    return arrivalLanguage !== "pt";
  });

  if (shouldRedirect && arrivalLanguage !== "pt") {
    return <Navigate to={`/${arrivalLanguage}`} replace />;
  }
  return <LandingPage />;
}
