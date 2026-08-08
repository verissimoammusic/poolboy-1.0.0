import HeroEffects from "./HeroEffects.jsx";

export default function Hero({ children }) {
  return (
    <section
      className="caustics hero-bg relative mx-auto flex min-h-[560px] w-full max-w-content flex-col items-center gap-6 px-4 pt-[50px] pb-[28px] md:gap-8 md:px-6 md:pt-[70px] md:pb-[38px]"
      data-section="hero"
    >
      {/* Underwater effects stack (painted text, Voronoi warp, bubbles) */}
      <HeroEffects />

      {/* Language slider — absolutely positioned inside the Hero */}
      {children}
    </section>
  );
}
