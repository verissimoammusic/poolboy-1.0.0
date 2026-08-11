import { useState, useEffect, useRef, useCallback } from "react";
import { CONTACT, whatsappHref } from "../i18n/content.js";
import { useContent } from "../i18n/useContent.jsx";
import { IconWhatsApp, IconPhone } from "./icons.jsx";

// Service → Contact call-to-action section.
//
// Layout:
//   ┌──────────────────────────────────────────┐
//   │  🟢 PoolBoy  online                      │
//   │──────────────────────────────────────────│
//   │  [message / typing]              ➤       │
//   └──────────────────────────────────────────┘
//        ou  📞 Ligar +351 960 363 769

// Animation timing (ms)
const B_TYPING_DURATION = 600;
const CHAR_INTERVAL = 22;
const CHIP_INTERVAL = 300;
const PULSE_DELAY = 300;

// Phase enum — avoids string typos
const PHASE = {
  IDLE: "idle",
  TYPING: "typing",
  BEFORE: "before",
  CHIPS: "chips",
  AFTER: "after",
  CLOSING: "closing",
  CHOOSING: "choosing",
};

export default function CtaSection() {
  const { lang, data } = useContent();
  const { contact } = data;
  const compose = CONTACT.whatsappCompose[lang] ?? CONTACT.whatsappCompose.pt;

  const [phase, setPhase] = useState(PHASE.IDLE);

  // Each typed segment has its own progress — no cross-phase interference.
  const [beforeText, setBeforeText] = useState("");
  const [chipRevealCount, setChipRevealCount] = useState(0);
  const [afterText, setAfterText] = useState("");
  const [closingText, setClosingText] = useState("");

  const [selected, setSelected] = useState(0);
  const [interacted, setInteracted] = useState(false);

  const timerRef = useRef(null);
  const sectionRef = useRef(null);
  const playCountRef = useRef(0);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  // ── Reset ──
  const resetAnimation = useCallback(() => {
    clearTimer();
    setPhase(PHASE.IDLE);
    setBeforeText("");
    setChipRevealCount(0);
    setAfterText("");
    setClosingText("");
    setSelected(0);
    setInteracted(false);
  }, []);

  // ── Scroll-driven chatbox min-height ──
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const chatBody = el.querySelector(".chat-bubble-body");
    if (!chatBody) return;

    function updateScale() {
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const visible = Math.min(rect.bottom, viewportH) - Math.max(rect.top, 0);
      const ratio = Math.min(1, Math.max(0, visible / rect.height));
      const eased = ratio * ratio * (3 - 2 * ratio);
      chatBody.style.minHeight = Math.round(eased * 140) + "px";
      rafId = requestAnimationFrame(updateScale);
    }

    let rafId = requestAnimationFrame(updateScale);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // ── IntersectionObserver ──
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          resetAnimation();
          requestAnimationFrame(() => setPhase(PHASE.TYPING));
        } else {
          resetAnimation();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [resetAnimation]);

  // ── State machine ──
  // Each phase advances independently, using segment-specific state.
  useEffect(() => {
    clearTimer();

    if (phase === PHASE.TYPING) {
      timerRef.current = setTimeout(
        () => setPhase(PHASE.BEFORE),
        B_TYPING_DURATION,
      );
    } else if (phase === PHASE.BEFORE) {
      const text = compose.before;
      if (beforeText.length < text.length) {
        timerRef.current = setTimeout(() => {
          setBeforeText(text.slice(0, beforeText.length + 1));
        }, CHAR_INTERVAL);
      } else {
        setPhase(PHASE.CHIPS);
      }
    } else if (phase === PHASE.CHIPS) {
      if (chipRevealCount < compose.options.length) {
        timerRef.current = setTimeout(() => {
          setChipRevealCount((c) => c + 1);
        }, CHIP_INTERVAL);
      } else {
        setPhase(PHASE.AFTER);
      }
    } else if (phase === PHASE.AFTER) {
      const text = compose.after;
      if (afterText.length < text.length) {
        timerRef.current = setTimeout(() => {
          setAfterText(text.slice(0, afterText.length + 1));
        }, CHAR_INTERVAL);
      } else {
        setPhase(PHASE.CLOSING);
      }
    } else if (phase === PHASE.CLOSING) {
      const text = compose.closing;
      if (closingText.length < text.length) {
        timerRef.current = setTimeout(() => {
          setClosingText(text.slice(0, closingText.length + 1));
        }, CHAR_INTERVAL);
      } else {
        playCountRef.current += 1;
        timerRef.current = setTimeout(
          () => setPhase(PHASE.CHOOSING),
          PULSE_DELAY,
        );
      }
    }

    return clearTimer;
  }, [phase, beforeText, chipRevealCount, afterText, closingText, compose]);

  // The composed WhatsApp message.
  const message =
    selected === null
      ? ""
      : compose.before +
        compose.options[selected] +
        compose.after +
        compose.closing;
  const waLink = `${CONTACT.whatsappBase}?text=${encodeURIComponent(message)}`;
  const hasText = selected !== null;

  const orLabel = lang === "pt" ? "ou" : lang === "fr" ? "ou" : "or";

  // Show cursor on a segment while it's still being typed
  const showBeforeCursor = phase === PHASE.BEFORE;
  const showChips =
    phase === PHASE.CHIPS ||
    phase === PHASE.AFTER ||
    phase === PHASE.CLOSING ||
    phase === PHASE.CHOOSING;
  const showAfterCursor = phase === PHASE.AFTER;
  const showAfter =
    phase === PHASE.AFTER ||
    phase === PHASE.CLOSING ||
    phase === PHASE.CHOOSING;
  const showClosingCursor = phase === PHASE.CLOSING;
  const showClosing = phase === PHASE.CLOSING || phase === PHASE.CHOOSING;

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="cta-section mx-auto"
      data-section="contact"
    >
      <div className="h-px w-full max-w-[720px] bg-gradient-to-r from-transparent via-cyan/[0.46] to-transparent" />

      <div className="cta-content">
        <p
          className="px-2 text-center font-bold uppercase text-water-500"
          style={{
            fontFamily: '"Inter", "Inter Placeholder", sans-serif',
            lineHeight: "1em",
            letterSpacing: "0.08em",
            fontSize: "10px",
          }}
        >
          {contact.kicker}
        </p>

        <div className="chat-bubble-wrapper">
          <div className="chat-bubble">
            <div className="chat-bubble-header">
              <div className="chat-bubble-avatar">
                <IconWhatsApp className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <div className="flex flex-1 flex-col">
                <span className="chat-bubble-sender text-sm md:text-base">
                  PoolBoy
                </span>
                <span className="chat-bubble-online text-xs">online</span>
              </div>
              {/* WhatsApp button — top-right corner of the chatbox header */}
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="chat-whatsapp-btn"
                aria-label="WhatsApp"
                onClick={(e) => !hasText && e.preventDefault()}
              >
                {/* External-link / open-app icon — box with arrow */}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                <span>WhatsApp</span>
              </a>
            </div>

            <div className="chat-bubble-body">
              <div className="chat-message-area">
                {/* Typing bar cursor */}
                {(phase === PHASE.TYPING || phase === PHASE.IDLE) && (
                  <span className="chat-typing-bar" aria-label="typing">
                    |
                  </span>
                )}

                {/* Composed message */}
                {phase !== PHASE.TYPING && phase !== PHASE.IDLE && (
                  <span className="chat-compose">
                    {/* Line 1: "Bom dia, preciso de " */}
                    <span className="chat-sentence">
                      <span>{beforeText}</span>
                      {showBeforeCursor && <span className="chat-cursor" />}
                    </span>

                    {/* Line 2: chips */}
                    {showChips && (
                      <span
                        className="chat-chips-row"
                        role="group"
                        aria-label={contact.cta}
                      >
                        {compose.options.map((opt, i) => (
                          <button
                            key={opt}
                            type="button"
                            className={`chat-chip ${phase === PHASE.CHOOSING ? "chat-chip-interactive" : ""} ${selected === i ? "chat-chip-active" : ""} ${i < chipRevealCount ? "chat-chip-visible" : ""}`}
                            aria-pressed={selected === i}
                            disabled={phase !== PHASE.CHOOSING}
                            onClick={() => {
                              if (phase !== PHASE.CHOOSING) return;
                              setSelected(i);
                              setInteracted(true);
                            }}
                          >
                            {opt}
                          </button>
                        ))}
                      </span>
                    )}

                    {/* Line 3: "na minha piscina." */}
                    {showAfter && (
                      <span className="chat-sentence-after">
                        <span>{afterText}</span>
                        {showAfterCursor && <span className="chat-cursor" />}
                      </span>
                    )}

                    {/* Line 4: "Cumprimentos." */}
                    {showClosing && (
                      <span className="chat-closing">
                        <span>{closingText}</span>
                        {showClosingCursor && <span className="chat-cursor" />}
                      </span>
                    )}
                  </span>
                )}
              </div>

              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`chat-send-btn ${hasText ? "chat-send-active" : "chat-send-disabled"} ${interacted ? "chat-send-hint" : ""}`}
                aria-label={contact.cta}
                onClick={(e) => !hasText && e.preventDefault()}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 pt-1">
          <div className="flex w-full items-center gap-3 text-white/40 text-xs font-medium uppercase tracking-[0.15em]">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-white/10" />
            <span>{orLabel}</span>
            <span className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
          </div>
          <a
            href={CONTACT.phoneHref}
            className="group flex items-center gap-2.5 rounded-full border border-cyan/20 bg-white/5 px-5 py-2.5 text-white/80 transition-all hover:border-cyan/40 hover:bg-white/10 hover:text-white"
          >
            <IconPhone className="h-4 w-4 shrink-0 text-cyan-400 transition-colors group-hover:text-cyan-300 md:h-5 md:w-5" />
            <span className="text-sm font-semibold md:text-base">
              {contact.ctaPhone}
            </span>
            <span className="text-sm text-white/50 md:text-base">
              +351 {CONTACT.phoneDisplay}
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
