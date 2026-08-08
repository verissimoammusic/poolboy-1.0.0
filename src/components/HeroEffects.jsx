import { useEffect, useRef } from "react";
import heroLogo from "../assets/logo-trimmed.png";

/**
 * HeroEffects — layered underwater realism effects for the hero section.
 *
 * Renders an absolutely-positioned, pointer-events-none stack between the
 * hero's blue gradient background and its z-10 content:
 *
 *   1. SVG filter defs (#waterWarp) — feTurbulence + feDisplacementMap that
 *      warps the Voronoi pattern so it undulates like light through water.
 *   2. .hero-fx-voronoi — the white Voronoi cell pattern (two parallax layers
 *      via ::before/::after), warped by #waterWarp. Back layer is blurred
 *      for depth; near layer stays sharp.
 *   3. <canvas> — micro-bubble particle system.
 *
 * All motion respects prefers-reduced-motion; the canvas pauses when the
 * tab is hidden and scales for devicePixelRatio.
 */
export default function HeroEffects() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d");
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let rafId = 0;
    let running = false;
    let particles = [];

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function makeParticle(initial) {
      return {
        x: Math.random() * width,
        y: initial ? Math.random() * height : height + 10 + Math.random() * 40,
        r: 0.8 + Math.random() * 3.2,
        speed: 0.25 + Math.random() * 0.9,
        swayAmp: 6 + Math.random() * 18,
        swayFreq: 0.4 + Math.random() * 0.9,
        phase: Math.random() * Math.PI * 2,
        alpha: 0.12 + Math.random() * 0.4,
      };
    }

    function spawn(initial) {
      const count = Math.max(24, Math.round((width * height) / 26000));
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push(makeParticle(initial));
      }
    }

    function drawStatic() {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.alpha * 0.5})`;
        ctx.fill();
      }
    }

    function step(t) {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);
      const time = t / 1000;

      // --- Micro-bubbles ---
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y -= p.speed;
        const bx =
          p.x + Math.sin(time * p.swayFreq + p.phase) * p.swayAmp * 0.15;

        if (p.y < -12) {
          particles[i] = makeParticle(false);
          continue;
        }

        // Bubble body
        ctx.beginPath();
        ctx.arc(bx, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.alpha * 0.5})`;
        ctx.fill();

        // Specular highlight
        ctx.beginPath();
        ctx.arc(
          bx - p.r * 0.35,
          p.y - p.r * 0.35,
          Math.max(p.r * 0.32, 0.4),
          0,
          Math.PI * 2,
        );
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
        ctx.fill();
      }

      rafId = requestAnimationFrame(step);
    }

    function start() {
      if (running) return;
      running = true;
      rafId = requestAnimationFrame(step);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(rafId);
    }

    function onVisibility() {
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    }

    function onResize() {
      resize();
      spawn(true);
      if (reducedMotion) drawStatic();
    }

    resize();
    spawn(true);

    if (reducedMotion) {
      drawStatic();
      window.addEventListener("resize", onResize);
    } else {
      start();
      window.addEventListener("resize", onResize);
      document.addEventListener("visibilitychange", onVisibility);
    }

    return () => {
      stop();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className="hero-fx" aria-hidden="true">
      {/* Illuminated pool-floor logo + title + text — sits behind Voronoi caustics and bubbles */}
      <div className="hero-pool-text">
        <div className="hero-pool-brand">
          <span className="hero-pool-glow">
            <img
              src={heroLogo}
              alt="PoolBoy"
              className="hero-pool-logo"
              draggable={false}
            />
          </span>
          <span className="hero-pool-title">PoolBoy</span>
        </div>
        <span className="hero-pool-sub">
          <svg
            className="hero-pool-phone-icon"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24 11.36 11.36 0 0 0 3.58.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.58 1 1 0 0 1-.24 1.01l-2.2 2.2Z"
              fill="currentColor"
            />
          </svg>
          +351 960 363 769
        </span>
      </div>

      {/* SVG filter defs — water warp (feTurbulence + feDisplacementMap) */}
      <svg
        className="hero-fx-defs"
        width="0"
        height="0"
        style={{ position: "absolute", width: 0, height: 0 }}
        focusable="false"
      >
        <defs>
          <filter id="waterWarp" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.02"
              numOctaves="2"
              seed="4"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                dur="14s"
                values="0.012 0.02;0.016 0.014;0.012 0.02"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="18"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Voronoi cell pattern (warped by #waterWarp, depth-blurred) */}
      <div className="hero-fx-voronoi" />

      {/* Micro-bubbles canvas */}
      <canvas ref={canvasRef} className="hero-bubbles" />
    </div>
  );
}
