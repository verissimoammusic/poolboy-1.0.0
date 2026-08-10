import { useEffect, useRef } from "react";
import HeroEffects from "./HeroEffects.jsx";

// How much of the hero must be visible (as a fraction of the viewport height)
// for the snap-to-hero to engage once scrolling stops.
const SNAP_THRESHOLD = 0.5;
// Debounce delay (ms) — wait until the user has stopped scrolling before
// deciding whether to snap, so we don't fight an in-progress scroll.
const SNAP_IDLE_DELAY = 150;

export default function Hero() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let idleTimer = null;
    // Guard against re-triggering while a programmatic snap is animating.
    let snapping = false;

    const onScroll = () => {
      if (snapping) return;
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        const rect = section.getBoundingClientRect();
        const vh = window.innerHeight;
        // Visible portion of the hero within the viewport.
        const visible = Math.min(rect.bottom, vh) - Math.max(rect.top, 0);
        const visibleRatio = visible / vh;

        // Snap to the top only when at least half the hero is visible but it
        // isn't already flush with the top (rect.top < 0 means we've scrolled
        // partway into it). Otherwise leave the page to scroll freely.
        if (visibleRatio >= SNAP_THRESHOLD && rect.top < 0) {
          snapping = true;
          window.scrollTo({ top: 0, behavior: "smooth" });
          // Release the guard after the smooth scroll has had time to finish.
          window.setTimeout(() => {
            snapping = false;
          }, 600);
        }
      }, SNAP_IDLE_DELAY);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(idleTimer);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="caustics hero-bg relative flex min-h-screen w-full flex-col items-center"
      data-section="hero"
    >
      {/* Underwater effects stack (painted text, Voronoi warp, bubbles) */}
      <HeroEffects />
    </section>
  );
}
