import Seo from "../components/Seo.jsx";
import Hero from "../components/Hero.jsx";
import Features from "../components/Features.jsx";
import CtaSection from "../components/CtaSection.jsx";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import { useContent } from "../i18n/useContent.jsx";

// Shared page layout for both language routes (`/` PT and `/en` EN).
// The "Language Switcher" (Header) is passed as children to Hero, which
// positions it absolutely in its top-right corner.
//
// `key={lang}` on the wrapper forces a clean remount of the whole page subtree
// whenever the language route changes, guaranteeing every localized string,
// the <html lang> attribute and SEO tags flip together with no stale state.
export default function LandingPage() {
  const { lang } = useContent();
  return (
    <div key={lang}>
      <Seo />
      <main>
        <Hero>
          <Header />
        </Hero>
        <Features />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
