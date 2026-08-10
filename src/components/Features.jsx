import { useContent } from "../i18n/useContent.jsx";
import { ServiceIcon } from "./icons.jsx";
import Header from "./Header.jsx";

// Services section:
//   background-color #f7fbfc, max-width 1180px, padding 46px 24px, gap 28px
//   └─ "Services Intro": max-width 720px, gap 10px
//      └─ Kicker: "Serviços" — Inter 13px 700, color rgb(24,137,201), center, uppercase
//      └─ Title: Satoshi 34px 700, letter-spacing -0.04em, color rgb(6,24,39)
//      └─ Copy: "Máxima comodidade..." — color rgb(90,107,118), center
//   └─ "Services Grid":
//        grid 4 cols minmax(190px,1fr), gap 14px, max-width 1000px
//      └─ cards:
//        bg #fff, radius 22px, border #06182714, min-height 176px, gap 18px
//        └─ "Icon Bubble": 44x44, bg #e8faff, radius 14px, icon #1889c9 24px
//        └─ "Service Text": gap 6px
//           └─ Title: Satoshi 18px 700, ls -0.02em, color rgb(6,24,39)
//           └─ Subtitle: Inter 14px 500, lh 1.35em, color rgb(90,107,118)
export default function Features() {
  const { data } = useContent();
  const { services } = data;
  const list = services.services;
  const langKey = services.langKey;

  return (
    <section
      id="services"
      className="services-section relative mx-auto"
      data-section="services"
    >
      {/* Language switcher — pinned to the top-right of the Services section */}
      <Header />

      {/* Intro */}
      <div className="flex w-full max-w-[720px] flex-col items-center gap-2 md:gap-2.5 px-2 md:px-0">
        <p
          className="text-center text-xs font-bold text-water-500 uppercase md:text-sm"
          style={{
            fontFamily: '"Inter", "Inter Placeholder", sans-serif',
            lineHeight: "1em",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          {services.kicker}
        </p>
        <h2
          className="w-full text-center font-bold text-ocean-900"
          style={{
            fontFamily: '"Satoshi", "Satoshi Placeholder", "Inter", sans-serif',
            fontSize: "clamp(22px, 6vw, 34px)",
            letterSpacing: "-0.04em",
            lineHeight: "1.12em",
            textWrap: "balance",
          }}
        >
          {services.title}
        </h2>
        <p
          className="w-full text-center text-sm text-slate-500 md:text-base"
          style={{ lineHeight: "1.5em" }}
        >
          {services.copy}
        </p>
      </div>

      {/* Grid */}
      <div className="services-grid">
        {list.map((s) => {
          const { title, subtitle } = s[langKey];
          return (
            <article key={s.id} className="service-card">
              {/* Icon bubble */}
              <div className="icon-bubble">
                <ServiceIcon id={s.id} />
              </div>
              {/* Service text */}
              <div className="flex w-full flex-col items-start gap-1.5">
                <h3
                  className="w-full font-bold text-ocean-900"
                  style={{
                    fontFamily:
                      '"Satoshi", "Satoshi Placeholder", "Inter", sans-serif',
                    fontSize: "clamp(15px, 4vw, 18px)",
                    letterSpacing: "-0.02em",
                    lineHeight: "1.2em",
                  }}
                >
                  {title}
                </h3>
                <p
                  className="w-full text-slate-500"
                  style={{
                    fontFamily: '"Inter", "Inter Placeholder", sans-serif',
                    fontSize: "clamp(12px, 3.5vw, 14px)",
                    fontWeight: 500,
                    lineHeight: "1.35em",
                  }}
                >
                  {subtitle}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
