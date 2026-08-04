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
// "Setup on arrival": on the very first page load, the language is derived from
// the browser/system locale (see detectBrowserLanguage) and the visitor is
// redirected once to the matching language route (e.g. /en or /fr).
//
// Crucially, this auto-redirect only ever runs on the FIRST render of "/" in a
// session (tracked via sessionStorage). After that, manually selecting a
// language always works — for example picking Portuguese from the dropdown
// (whose link target is "/") reliably lands on the Portuguese home instead of
// bouncing back to the browser's detected language.
function readStored(key) {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStored(key, value) {
  try {
    sessionStorage.setItem(key, value);
  } catch {
    /* sessionStorage unavailable — ignore */
  }
}

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

// LandingPage wrapper that applies the "setup on arrival" rule: on the root "/"
// route and only during the initial page load, if the browser/system language
// detected on arrival differs from the default (Portuguese), redirect once to
// the matching localized route. A session flag records that the redirect has
// already run, so any later visit to "/" (e.g. selecting Portuguese in the
// dropdown) renders the Portuguese homepage normally.
function RootHome({ arrivalLanguage }) {
  const [shouldRedirect] = useState(() => {
    if (readStored("pb-redirected")) return false;
    writeStored("pb-redirected", "1");
    return arrivalLanguage !== "pt";
  });

  if (shouldRedirect && arrivalLanguage !== "pt") {
    return <Navigate to={`/${arrivalLanguage}`} replace />;
  }
  return <LandingPage />;
}
