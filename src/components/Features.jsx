import { useContent } from "../i18n/useContent.jsx";
import { ServiceIcon } from "./icons.jsx";

// Services section. Maps to "Services / Services Intro / Services Grid" from
// reference/index.html. Renders the eight service cards extracted from the
// original, each with its own inline SVG icon.
export default function Features() {
  const { data } = useContent();
  const { services } = data;
  const list = services.services;
  const langKey = services.langKey;

  return (
    <section
      id="services"
      className="relative py-16 md:py-24"
      data-section="services"
    >
      <div className="container-content">
        {/* Intro */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-brand/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-100">
            {services.kicker}
          </span>
          <h2 className="mt-4 font-display text-2xl font-bold leading-snug text-white md:text-4xl">
            {services.title}
          </h2>
          <p className="mt-3 text-base text-white/60">{services.copy}</p>
        </div>

        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((s) => {
            const { title, subtitle } = s[langKey];
            return (
              <article
                key={s.id}
                className="group relative flex flex-col gap-4 rounded-2xl border border-white/8 bg-ink-800/60 p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:bg-ink-800"
              >
                {/* Icon bubble */}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/15 text-brand-100 transition-colors group-hover:bg-brand group-hover:text-white">
                  <ServiceIcon id={s.id} />
                </div>
                {/* Text */}
                <div>
                  <h3 className="font-display text-lg font-bold text-white">
                    {title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/55">
                    {subtitle}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
