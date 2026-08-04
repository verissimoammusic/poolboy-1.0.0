import { CONTACT } from "../i18n/content.js";
import { useContent } from "../i18n/useContent.jsx";
import { IconWhatsApp, IconPhone } from "./icons.jsx";

// "Soft Ending" + footer:
//   background: radial-gradient(50% 50% at 50% 0, #21b5d62e 0%, #06182700 48%)
//   max-width 1180px, padding 58px 24px 76px, gap 24px
//   └─ "Soft Divider": gradient line, max-width 720px
//   └─ "Closing Card":
//       bg linear-gradient(#ffffff14 -> #ffffff0a), border #cdf4ff24,
//       radius 30px, max-width 820px, padding 34px 28px, gap 18px
//     └─ "Closing Title": Satoshi 30px 700, ls -0.035em, color #FFFFFF, center
//     └─ "Closing Copy": color rgba(226,246,255,0.72), center
//     └─ "Buttons":
//         └─ Final WhatsApp CTA: #25d366 round, WhatsApp icon (#061827)
//         └─ Final WhatsApp CTA (phone): #fff round, phone icon
//   └─ "Footer Note": Inter 13px 500, color rgba(226,246,255,0.42), center
export default function Footer() {
  const { data } = useContent();
  const { contact, footer } = data;

  return (
    <footer data-section="contact">
      <section
        className="mx-auto flex w-full max-w-content flex-col items-center gap-6 px-6 pt-[58px] pb-[76px]"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 0, #21b5d62e 0%, #06182700 48%)",
        }}
      >
        {/* Soft divider */}
        <div className="h-px w-full max-w-[720px] bg-gradient-to-r from-transparent via-cyan/[0.46] to-transparent" />

        {/* Closing card */}
        <div className="closing-card">
          {/* Closing text */}
          <div className="flex w-full max-w-[620px] flex-col items-center gap-2.5">
            <h2
              className="w-full text-center font-bold text-white"
              style={{
                fontFamily:
                  '"Satoshi", "Satoshi Placeholder", "Inter", sans-serif',
                fontSize: "clamp(25px, 2.6vw, 30px)",
                letterSpacing: "-0.035em",
                lineHeight: "1.15em",
                textWrap: "balance",
              }}
            >
              {contact.title}
            </h2>
            <p
              className="w-full text-center"
              style={{
                fontFamily: '"Inter", "Inter Placeholder", sans-serif',
                fontSize: "clamp(13px, 1.2vw, 15px)",
                lineHeight: "1.55em",
                color: "rgba(226, 246, 255, 0.72)",
                textWrap: "balance",
                maxWidth: 560,
              }}
            >
              {contact.copy}
            </p>
          </div>

          {/* Buttons */}
          <div className="closing-buttons">
            <a
              href={CONTACT.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa-round"
              aria-label={contact.cta}
            >
              <IconWhatsApp className="h-[22px] w-[22px]" />
            </a>
            <a
              href={CONTACT.phoneHref}
              className="btn-phone-round"
              aria-label={CONTACT.phoneDisplay}
            >
              <IconPhone className="h-[22px] w-[22px]" />
            </a>
          </div>
        </div>

        {/* Footer note */}
        <p
          className="w-full max-w-[820px] text-center"
          style={{
            fontFamily: '"Inter", "Inter Placeholder", sans-serif',
            fontSize: "13px",
            fontWeight: 500,
            lineHeight: "1.4em",
            color: "rgba(226, 246, 255, 0.42)",
          }}
        >
          {footer.note}
        </p>
      </section>
    </footer>
  );
}
