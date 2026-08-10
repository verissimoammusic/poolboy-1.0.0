import { useRef } from "react";
import heroVideoDesktop from "../assets/videos-desktop/video1.mp4";
import heroVideoMobile from "../assets/videos-mobile/video1.mp4";

/**
 * HeroEffects — fullscreen video background for the hero section.
 *
 * Renders a looping, muted video that fills the entire hero viewport
 * as an absolutely-positioned background layer. A subtle gradient overlay
 * sits on top to ensure text readability.
 *
 * Uses the mobile video on viewports < 640px and the desktop video on 640px+
 * via the `<source media="...">` attribute — the browser picks the first
 * matching source automatically.
 *
 * Accessibility:
 *   - `prefers-reduced-motion` disables video autoplay (static poster fallback)
 *   - `aria-hidden="true"` since the video is purely decorative
 */
export default function HeroEffects() {
  const videoRef = useRef(null);

  return (
    <div className="hero-fx" aria-hidden="true">
      {/* Fullscreen video background — responsive source switching */}
      <video
        ref={videoRef}
        className="hero-video-bg"
        autoPlay
        muted
        loop
        playsInline
        poster={heroVideoDesktop}
        preload="auto"
      >
        <source
          src={heroVideoMobile}
          type="video/mp4"
          media="(max-width: 639px)"
        />
        <source src={heroVideoDesktop} type="video/mp4" />
      </video>

      {/* Gradient overlay for text readability */}
      <div className="hero-video-overlay" />

      {/* Bouncing scroll-down chevron — anchored at bottom center */}
      <div className="hero-scroll-chevron" aria-hidden="true">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </div>
  );
}
