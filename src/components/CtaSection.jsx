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
const TYPING_DURATION = 2000;
const CHAR_INTERVAL_FIRST = 30;
const CHAR_INTERVAL_REPLAY = 12; // faster on replay
const PULSE_DELAY = 1500;

export default function CtaSection() {
  const { lang, data } = useContent();
  const { contact } = data;
  const defaultMsg =
    CONTACT.whatsappPlaceholder[lang] ?? CONTACT.whatsappPlaceholder.pt;

  const [phase, setPhase] = useState("idle"); // "idle" | "typing" | "revealing" | "pulsing"
  const [charCount, setCharCount] = useState(0);
  const [message, setMessage] = useState("");
  const timerRef = useRef(null);
  const textareaRef = useRef(null);
  const sectionRef = useRef(null);
  const playCountRef = useRef(0);

  // ── Reset animation state ──
  const resetAnimation = useCallback(() => {
    clearTimeout(timerRef.current);
    setPhase("idle");
    setCharCount(0);
    setMessage("");
  }, []);

  // ── Scroll-driven chatbox height ──
  // Tracks the section's visible ratio using getBoundingClientRect on every
  // scroll frame and directly sets the height in pixels on .chat-bubble-body.
  // The box starts at 0px when off-screen and reaches 140px when fully visible.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const chatBody = el.querySelector(".chat-bubble-body");
    if (!chatBody) return;

    function updateScale() {
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;
      // How much of the section is visible (clamped 0–1)
      const visible = Math.min(rect.bottom, viewportH) - Math.max(rect.top, 0);
      const ratio = Math.min(1, Math.max(0, visible / rect.height));
      // Smoothstep easing for a natural feel
      const eased = ratio * ratio * (3 - 2 * ratio);
      // Scale from 0px → 140px based on how visible the section is
      chatBody.style.height = Math.round(eased * 140) + "px";
      rafId = requestAnimationFrame(updateScale);
    }

    let rafId = requestAnimationFrame(updateScale);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // ── IntersectionObserver: start animation when section enters viewport ──
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          resetAnimation();
          requestAnimationFrame(() => setPhase("typing"));
        } else {
          resetAnimation();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [resetAnimation]);

  // ── Typing / revealing / pulsing state machine ──
  useEffect(() => {
    if (phase === "typing") {
      timerRef.current = setTimeout(() => {
        setCharCount(0);
        setPhase("revealing");
      }, TYPING_DURATION);
    } else if (phase === "revealing") {
      const interval =
        playCountRef.current > 0 ? CHAR_INTERVAL_REPLAY : CHAR_INTERVAL_FIRST;
      if (charCount < defaultMsg.length) {
        timerRef.current = setTimeout(() => {
          const next = charCount + 1;
          setCharCount(next);
          setMessage(defaultMsg.slice(0, next));
        }, interval);
      } else {
        playCountRef.current += 1;
        timerRef.current = setTimeout(() => setPhase("pulsing"), PULSE_DELAY);
      }
    }
    return () => clearTimeout(timerRef.current);
  }, [phase, charCount, defaultMsg]);

  useEffect(() => {
    if (phase === "pulsing" && textareaRef.current) {
      textareaRef.current.focus();
      const len = textareaRef.current.value.length;
      textareaRef.current.setSelectionRange(len, len);
    }
  }, [phase]);

  const waLink = `${CONTACT.whatsappBase}?text=${encodeURIComponent(message)}`;
  const hasText = message.trim().length > 0;

  const orLabel = lang === "pt" ? "ou" : lang === "fr" ? "ou" : "or";

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="cta-section mx-auto"
      data-section="contact"
    >
      {/* Soft divider */}
      <div className="h-px w-full max-w-[720px] bg-gradient-to-r from-transparent via-cyan/[0.46] to-transparent" />

      <div className="cta-content">
        {/* Kicker */}
        <p
          className="px-2 text-center text-xs font-bold uppercase text-water-500 md:text-sm"
          style={{
            fontFamily: '"Inter", "Inter Placeholder", sans-serif',
            lineHeight: "1em",
            letterSpacing: "0.08em",
          }}
        >
          {contact.kicker}
        </p>

        {/* ── Chat compose bubble ── */}
        <div className="chat-bubble-wrapper">
          <div className="chat-bubble">
            {/* Header */}
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
            </div>

            {/* Message area + send button */}
            <div className="chat-bubble-body">
              <div
                className={`chat-message-area ${phase === "pulsing" ? "chat-text-pulse" : ""}`}
              >
                {phase === "typing" || phase === "idle" ? (
                  <span className="chat-typing">
                    <span className="chat-dot" />
                    <span className="chat-dot" />
                    <span className="chat-dot" />
                  </span>
                ) : phase === "revealing" ? (
                  <span>
                    {message}
                    <span className="chat-cursor" />
                  </span>
                ) : (
                  <textarea
                    ref={textareaRef}
                    className="chat-textarea"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={2}
                    spellCheck={false}
                  />
                )}
              </div>

              {/* WA send button */}
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`chat-send-btn ${hasText ? "chat-send-active" : "chat-send-disabled"}`}
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

        {/* "ou" + phone call link */}
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
