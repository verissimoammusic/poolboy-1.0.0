import Seo from "../components/Seo.jsx";
import Header from "../components/Header.jsx";
import Hero from "../components/Hero.jsx";
import Features from "../components/Features.jsx";
import Footer from "../components/Footer.jsx";

// Shared page layout for both language routes (`/` PT and `/en` EN).
// The active language is resolved from the route via useContent().
export default function LandingPage() {
  return (
    <>
      <Seo />
      <Header />
      <main>
        <Hero />
        <Features />
      </main>
      <Footer />
    </>
  );
}
