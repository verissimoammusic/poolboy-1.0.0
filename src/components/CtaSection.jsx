import { useState, useEffect, useRef } from "react";
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
const CHAR_INTERVAL = 30;
const PULSE_DELAY = 1500;

export default function CtaSection() {
  const { lang, data } = useContent();
  const { contact } = data;
  const defaultMsg =
    CONTACT.whatsappPlaceholder[lang] ?? CONTACT.whatsappPlaceholder.pt;

  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState("idle"); // "idle" | "typing" | "revealing" | "pulsing"
  const [charCount, setCharCount] = useState(0);
  const [message, setMessage] = useState("");
  const timerRef = useRef(null);
  const textareaRef = useRef(null);
  const sectionRef = useRef(null);

  // ── IntersectionObserver: start animation when section scrolls into view ──
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // ── Typing / revealing / pulsing state machine ──
  useEffect(() => {
    if (!visible) return; // don't start until scrolled into view
    if (phase === "idle") {
      setPhase("typing");
    }
    if (phase === "typing") {
      timerRef.current = setTimeout(() => {
        setCharCount(0);
        setPhase("revealing");
      }, TYPING_DURATION);
    } else if (phase === "revealing") {
      if (charCount < defaultMsg.length) {
        timerRef.current = setTimeout(() => {
          const next = charCount + 1;
          setCharCount(next);
          setMessage(defaultMsg.slice(0, next));
        }, CHAR_INTERVAL);
      } else {
        timerRef.current = setTimeout(() => setPhase("pulsing"), PULSE_DELAY);
      }
    }
    return () => clearTimeout(timerRef.current);
  }, [visible, phase, charCount, defaultMsg]);

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
          className="text-center font-bold uppercase text-brand"
          style={{
            fontFamily: '"Inter", "Inter Placeholder", sans-serif',
            fontSize: "15px",
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
                <IconWhatsApp className="h-6 w-6" />
              </div>
              <div className="flex flex-1 flex-col">
                <span className="chat-bubble-sender">PoolBoy</span>
                <span className="chat-bubble-online">online</span>
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
                    rows={3}
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
                  width="26"
                  height="26"
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
        <p className="cta-or-line">
          <span className="cta-or-text">{orLabel}</span>
          <a href={CONTACT.phoneHref} className="cta-phone-link">
            <IconPhone className="h-5 w-5 shrink-0" />
            <span>{contact.ctaPhone}</span>
            <span className="cta-phone-number">
              +351 {CONTACT.phoneDisplay}
            </span>
          </a>
        </p>
      </div>
    </section>
  );
}
