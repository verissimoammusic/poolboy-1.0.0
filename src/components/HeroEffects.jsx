import { useRef, useEffect } from "react";

/**
 * HeroEffects — Clean Voronoi caustic lines via Delaunay triangulation.
 *
 * Two layers: a dim background layer (coarser grid) and a bright
 * foreground layer (denser grid) for depth.
 *
 * The SVG #waterWarp filter (feTurbulence + feDisplacementMap) warps
 * the clean lines to create an organic water refraction effect.
 *
 * Accessiblity:
 *   - `aria-hidden="true"` (purely decorative)
 *   - `prefers-reduced-motion` disables the displacement animation
 */

/* ---- Delaunay triangulation (Bowyer–Watson) ---- */

function triangulate(points) {
  const n = points.length;
  if (n < 3) return [];

  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;
  for (const p of points) {
    if (p.x < minX) minX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.x > maxX) maxX = p.x;
    if (p.y > maxY) maxY = p.y;
  }
  const dx = maxX - minX || 1;
  const dy = maxY - minY || 1;
  const margin = Math.max(dx, dy) * 20;
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;

  const superTri = {
    a: { x: cx - margin, y: cy - margin * 2 },
    b: { x: cx + margin, y: cy + margin },
    c: { x: cx - margin, y: cy + margin },
  };

  let tris = [superTri];

  for (const p of points) {
    const bad = [];
    for (const t of tris) {
      if (circumCircleContains(t, p)) {
        bad.push(t);
      }
    }

    const edgeSet = new Map();
    function addEdge(u, v) {
      const key1 = `${u.x},${u.y}|${v.x},${v.y}`;
      const key2 = `${v.x},${v.y}|${u.x},${u.y}`;
      if (edgeSet.has(key2)) {
        edgeSet.delete(key2);
      } else {
        edgeSet.set(key1, { a: u, b: v });
      }
    }

    for (const t of bad) {
      addEdge(t.a, t.b);
      addEdge(t.b, t.c);
      addEdge(t.c, t.a);
    }

    tris = tris.filter((t) => !bad.includes(t));

    for (const [, edge] of edgeSet) {
      tris.push({ a: edge.a, b: edge.b, c: p });
    }
  }

  const isSuper = (p) =>
    (p.x === superTri.a.x && p.y === superTri.a.y) ||
    (p.x === superTri.b.x && p.y === superTri.b.y) ||
    (p.x === superTri.c.x && p.y === superTri.c.y);

  return tris.filter((t) => !isSuper(t.a) && !isSuper(t.b) && !isSuper(t.c));
}

function circumCircleContains(tri, p) {
  const { a, b, c } = tri;
  const ax = a.x - p.x,
    ay = a.y - p.y;
  const bx = b.x - p.x,
    by = b.y - p.y;
  const cx = c.x - p.x,
    cy = c.y - p.y;

  const det =
    (ax * ax + ay * ay) * (bx * cy - by * cx) -
    (bx * bx + by * by) * (ax * cy - ay * cx) +
    (cx * cx + cy * cy) * (ax * by - ay * bx);

  return det > 0;
}

function circumcenter(a, b, c) {
  const d = 2 * (a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y));
  if (Math.abs(d) < 1e-10) return null;

  const a2 = a.x * a.x + a.y * a.y;
  const b2 = b.x * b.x + b.y * b.y;
  const c2 = c.x * c.x + c.y * c.y;

  return {
    x: (a2 * (b.y - c.y) + b2 * (c.y - a.y) + c2 * (a.y - b.y)) / d,
    y: (a2 * (c.x - b.x) + b2 * (a.x - c.x) + c2 * (b.x - a.x)) / d,
  };
}

/* ---- Generate Voronoi edges from stratified seeds ---- */
function generateEdges(width, height, gridTarget) {
  const margin = Math.max(width, height) * 0.5;
  const areaW = width + margin * 2;
  const areaH = height + margin * 2;
  const offsetX = -margin;
  const offsetY = -margin;

  const aspect = areaW / areaH;
  const gridCols = Math.max(4, Math.round(Math.sqrt(gridTarget * aspect)));
  const gridRows = Math.max(4, Math.round(gridTarget / gridCols));
  const cellW = areaW / gridCols;
  const cellH = areaH / gridRows;

  const seeds = [];
  for (let row = 0; row < gridRows; row++) {
    for (let col = 0; col < gridCols; col++) {
      const jx = (Math.random() - 0.5) * cellW * 0.8;
      const jy = (Math.random() - 0.5) * cellH * 0.8;
      seeds.push({
        x: offsetX + col * cellW + cellW / 2 + jx,
        y: offsetY + row * cellH + cellH / 2 + jy,
      });
    }
  }

  const tris = triangulate(seeds);
  const edgeMap = new Map();

  for (let i = 0; i < tris.length; i++) {
    for (let j = i + 1; j < tris.length; j++) {
      const ta = tris[i];
      const tb = tris[j];

      const shared = [];
      const pts = [ta.a, ta.b, ta.c];
      for (const v of pts) {
        const inB =
          (v.x === tb.a.x && v.y === tb.a.y) ||
          (v.x === tb.b.x && v.y === tb.b.y) ||
          (v.x === tb.c.x && v.y === tb.c.y);
        if (inB) shared.push(v);
      }

      if (shared.length === 2) {
        const ca = circumcenter(ta.a, ta.b, ta.c);
        const cb = circumcenter(tb.a, tb.b, tb.c);
        if (ca && cb) {
          const key = `${Math.round(ca.x)},${Math.round(ca.y)}-${Math.round(cb.x)},${Math.round(cb.y)}`;
          const revKey = `${Math.round(cb.x)},${Math.round(cb.y)}-${Math.round(ca.x)},${Math.round(ca.y)}`;
          if (!edgeMap.has(revKey)) {
            edgeMap.set(key, { x1: ca.x, y1: ca.y, x2: cb.x, y2: cb.y });
          }
        }
      }
    }
  }

  return Array.from(edgeMap.values());
}

export default function HeroEffects() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const backEdgesRef = useRef([]);
  const frontEdgesRef = useRef([]);
  const widthRef = useRef(0);
  const heightRef = useRef(0);
  const startTimeRef = useRef(Date.now());
  const prevCycleRef = useRef(-1);
  const cycleDuration = 8000; // 8 seconds per full cycle
  const wobbleAmplitude = 3; // pixels of wobble displacement

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const { width, height } = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      widthRef.current = width;
      heightRef.current = height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      const seedTarget = 45;
      backEdgesRef.current = generateEdges(width, height, seedTarget);
      frontEdgesRef.current = generateEdges(width, height, seedTarget);
    };

    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      const w = widthRef.current;
      const h = heightRef.current;
      if (w === 0 || h === 0) {
        animRef.current = requestAnimationFrame(render);
        return;
      }

      const elapsed = Date.now() - startTimeRef.current;
      const currentCycle = Math.floor(elapsed / cycleDuration);
      const cycleTime = elapsed % cycleDuration;
      const cycleProgress = cycleTime / cycleDuration;

      /* Regenerate edges at the start of each new cycle */
      if (currentCycle !== prevCycleRef.current) {
        prevCycleRef.current = currentCycle;
        /* Front layer fades in at cycle start (t=0) */
        frontEdgesRef.current = generateEdges(w, h, 45);
        /* Back layer fades in at cycle midpoint (t=4s) — handled below */
      }

      /* Check if we just crossed the midpoint (t=4s) for back layer regeneration */
      const prevProgress = ((elapsed - 16) % cycleDuration) / cycleDuration; // ~16ms ago
      const currHalf = Math.floor(cycleProgress * 2);
      const prevHalf = Math.floor(prevProgress * 2);
      if (currHalf === 1 && prevHalf === 0) {
        backEdgesRef.current = generateEdges(w, h, 45);
      }

      /* Back layer opacity: 1→0 during first half, 0→1 during second half */
      let backOpacity;
      if (cycleProgress < 0.5) {
        backOpacity = 1 - cycleProgress * 2; // fading out
      } else {
        backOpacity = (cycleProgress - 0.5) * 2; // fading in
      }

      /* Front layer opacity: 0→1 during first half, 1→0 during second half (inverted) */
      let frontOpacity;
      if (cycleProgress < 0.5) {
        frontOpacity = cycleProgress * 2; // fading in
      } else {
        frontOpacity = 1 - (cycleProgress - 0.5) * 2; // fading out
      }

      /* Apply global opacity via canvas composite */
      ctx.clearRect(0, 0, w, h);

      const backEdges = backEdgesRef.current;
      const frontEdges = frontEdgesRef.current;

      /* ======== BACKGROUND LAYER (fully opaque when visible) ======== */
      ctx.globalAlpha = backOpacity;
      /* Wide soft glow */
      ctx.strokeStyle = "rgba(100, 180, 230, 0.12)";
      ctx.lineWidth = 14;
      ctx.lineCap = "round";
      for (const e of backEdges) {
        ctx.beginPath();
        const wx1 =
          e.x1 + Math.sin(e.y1 * 0.05 + elapsed * 0.002) * wobbleAmplitude;
        const wy1 =
          e.y1 + Math.cos(e.x1 * 0.05 + elapsed * 0.002) * wobbleAmplitude;
        const wx2 =
          e.x2 + Math.sin(e.y2 * 0.05 + elapsed * 0.002) * wobbleAmplitude;
        const wy2 =
          e.y2 + Math.cos(e.x2 * 0.05 + elapsed * 0.002) * wobbleAmplitude;
        ctx.moveTo(wx1, wy1);
        ctx.lineTo(wx2, wy2);
        ctx.stroke();
      }
      /* Medium glow */
      ctx.strokeStyle = "rgba(130, 200, 240, 0.35)";
      ctx.lineWidth = 7;
      for (const e of backEdges) {
        ctx.beginPath();
        const wx1 =
          e.x1 + Math.sin(e.y1 * 0.05 + elapsed * 0.002) * wobbleAmplitude;
        const wy1 =
          e.y1 + Math.cos(e.x1 * 0.05 + elapsed * 0.002) * wobbleAmplitude;
        const wx2 =
          e.x2 + Math.sin(e.y2 * 0.05 + elapsed * 0.002) * wobbleAmplitude;
        const wy2 =
          e.y2 + Math.cos(e.x2 * 0.05 + elapsed * 0.002) * wobbleAmplitude;
        ctx.moveTo(wx1, wy1);
        ctx.lineTo(wx2, wy2);
        ctx.stroke();
      }
      /* Core */
      ctx.strokeStyle = "rgba(160, 215, 245, 0.9)";
      ctx.lineWidth = 3;
      for (const e of backEdges) {
        ctx.beginPath();
        const wx1 =
          e.x1 + Math.sin(e.y1 * 0.05 + elapsed * 0.002) * wobbleAmplitude;
        const wy1 =
          e.y1 + Math.cos(e.x1 * 0.05 + elapsed * 0.002) * wobbleAmplitude;
        const wx2 =
          e.x2 + Math.sin(e.y2 * 0.05 + elapsed * 0.002) * wobbleAmplitude;
        const wy2 =
          e.y2 + Math.cos(e.x2 * 0.05 + elapsed * 0.002) * wobbleAmplitude;
        ctx.moveTo(wx1, wy1);
        ctx.lineTo(wx2, wy2);
        ctx.stroke();
      }

      /* ======== FOREGROUND LAYER (bright, in front, inverted opacity) ======== */
      ctx.globalAlpha = frontOpacity;
      /* Wide soft glow */
      ctx.strokeStyle = "rgba(150, 220, 255, 0.25)";
      ctx.lineWidth = 12;
      ctx.lineCap = "round";
      for (const e of frontEdges) {
        ctx.beginPath();
        const wx1 =
          e.x1 + Math.sin(e.y1 * 0.05 + elapsed * 0.002 + 1) * wobbleAmplitude;
        const wy1 =
          e.y1 + Math.cos(e.x1 * 0.05 + elapsed * 0.002 + 1) * wobbleAmplitude;
        const wx2 =
          e.x2 + Math.sin(e.y2 * 0.05 + elapsed * 0.002 + 1) * wobbleAmplitude;
        const wy2 =
          e.y2 + Math.cos(e.x2 * 0.05 + elapsed * 0.002 + 1) * wobbleAmplitude;
        ctx.moveTo(wx1, wy1);
        ctx.lineTo(wx2, wy2);
        ctx.stroke();
      }
      /* Medium inner glow */
      ctx.strokeStyle = "rgba(200, 235, 255, 0.5)";
      ctx.lineWidth = 6;
      for (const e of frontEdges) {
        ctx.beginPath();
        const wx1 =
          e.x1 + Math.sin(e.y1 * 0.05 + elapsed * 0.002 + 1) * wobbleAmplitude;
        const wy1 =
          e.y1 + Math.cos(e.x1 * 0.05 + elapsed * 0.002 + 1) * wobbleAmplitude;
        const wx2 =
          e.x2 + Math.sin(e.y2 * 0.05 + elapsed * 0.002 + 1) * wobbleAmplitude;
        const wy2 =
          e.y2 + Math.cos(e.x2 * 0.05 + elapsed * 0.002 + 1) * wobbleAmplitude;
        ctx.moveTo(wx1, wy1);
        ctx.lineTo(wx2, wy2);
        ctx.stroke();
      }
      /* Bright core */
      ctx.strokeStyle = "rgb(235, 248, 255)";
      ctx.lineWidth = 2.5;
      for (const e of frontEdges) {
        ctx.beginPath();
        const wx1 =
          e.x1 + Math.sin(e.y1 * 0.05 + elapsed * 0.002 + 1) * wobbleAmplitude;
        const wy1 =
          e.y1 + Math.cos(e.x1 * 0.05 + elapsed * 0.002 + 1) * wobbleAmplitude;
        const wx2 =
          e.x2 + Math.sin(e.y2 * 0.05 + elapsed * 0.002 + 1) * wobbleAmplitude;
        const wy2 =
          e.y2 + Math.cos(e.x2 * 0.05 + elapsed * 0.002 + 1) * wobbleAmplitude;
        ctx.moveTo(wx1, wy1);
        ctx.lineTo(wx2, wy2);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;

      animRef.current = requestAnimationFrame(render);
    };

    animRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <div className="hero-card-fx" aria-hidden="true">
      <canvas ref={canvasRef} className="hero-card-fx-caustics" />
      <svg
        className="hero-card-fx-defs"
        width="0"
        height="0"
        aria-hidden="true"
      >
        <defs>
          <filter id="waterWarp" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.025 0.035"
              numOctaves="2"
              result="noise"
              seed="3"
            >
              <animate
                attributeName="baseFrequency"
                values="0.025 0.035;0.028 0.038;0.025 0.035"
                dur="18s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="14"
              xChannelSelector="R"
              yChannelSelector="G"
            >
              <animate
                attributeName="scale"
                values="14;20;14"
                dur="18s"
                repeatCount="indefinite"
              />
            </feDisplacementMap>
          </filter>
        </defs>
      </svg>
    </div>
  );
}
