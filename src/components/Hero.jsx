import HeroEffects from "./HeroEffects.jsx";

export default function Hero({ children }) {
  return (
    <section
      className="caustics hero-bg relative flex min-h-screen w-full flex-col items-center"
      data-section="hero"
    >
      {/* Underwater effects stack (painted text, Voronoi warp, bubbles) */}
      <HeroEffects />

      {/* Language slider — absolutely positioned inside the Hero */}
      {children}
    </section>
  );
}
