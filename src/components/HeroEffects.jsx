import { useEffect, useRef } from "react";
import heroVideoDesktop from "../assets/videos-desktop/video1.mp4";
import heroVideoMobile from "../assets/videos-mobile/video1.mp4";

/**
 * HeroEffects — fullscreen video background for the hero section.
 *
 * Renders a looping, muted video that fills the entire hero viewport
 * as an absolutely-positioned background layer. A subtle gradient overlay
 * sits on top to ensure text readability.
 *
 * Uses the mobile video on viewports < 640px and the desktop video on 640px+.
 * The `<source media="...">` attribute is **not supported** on `<video>`
 * elements (it was removed from the HTML spec and only works inside
 * `<picture>`), so we select the correct source via `window.matchMedia`
 * and set it directly on the video element.
 *
 * Looping behaviour:
 *   In the last ~0.4 s of each cycle the video fades into a solid dark
 *   overlay, and fades back out when the next cycle begins.  This masks
 *   the inevitable visual discontinuity of a short 2.7 s loop.
 *
 * Accessibility:
 *   - `prefers-reduced-motion` disables video autoplay (static poster fallback)
 *   - `prefers-reduced-motion` also skips the loop-crossfade animation
 *   - `aria-hidden="true"` since the video is purely decorative
 */
export default function HeroEffects() {
  const videoRef = useRef(null);
  const fadeRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const fade = fadeRef.current;
    if (!video || !fade) return;

    const mobileQuery = window.matchMedia("(max-width: 639px)");
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    /* ── determine video duration once it's loaded ── */
    const getDuration = () => {
      // FFmpeg xfade output is 2.708 s; round to avoid floating drift
      return typeof video.duration === "number" && isFinite(video.duration)
        ? video.duration
        : 2.7;
    };

    /* ── crossfade logic ── */
    let rafId = null;

    const tick = () => {
      if (!video || prefersReduced.matches) return;
      const dur = getDuration();
      if (dur <= 0) return;

      const remaining = dur - video.currentTime;
      const fadeInDuration = 0.3; // s to fade up after loop
      const fadeOutStart = 0.4; // s from end to start fading out

      let opacity = 0;

      if (remaining <= fadeOutStart && video.currentTime > 1) {
        // Fade out toward the loop point
        opacity = 1 - remaining / fadeOutStart;
      } else if (video.currentTime < fadeInDuration) {
        // Fade in right after the loop restarts
        opacity = 1 - video.currentTime / fadeInDuration;
      }

      fade.style.opacity = Math.max(0, Math.min(1, opacity));
      rafId = requestAnimationFrame(tick);
    };

    /* ── source switching ── */
    const setSource = () => {
      const src = mobileQuery.matches ? heroVideoMobile : heroVideoDesktop;
      if (video.src !== src) {
        video.src = src;
        video.load();
        video.play().catch(() => {});
      }
    };

    /* ── wire up ── */
    setSource();
    rafId = requestAnimationFrame(tick);
    mobileQuery.addEventListener("change", setSource);

    return () => {
      mobileQuery.removeEventListener("change", setSource);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

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
      />

      {/* Crossfade overlay that masks the loop cut */}
      <div ref={fadeRef} className="hero-video-loop-fade" />

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
