import { useContent } from "../i18n/useContent.jsx";

// Minimal footer: just the footer note line.
// The contact CTA has been moved to CtaSection.jsx.
export default function Footer() {
  const { data } = useContent();
  const { footer } = data;

  return (
    <footer className="mx-auto flex w-full max-w-content justify-center px-4 pb-8 pt-2 md:px-6 md:pb-10">
      <p
        className="w-full max-w-[820px] px-1 text-center"
        style={{
          fontFamily: '"Inter", "Inter Placeholder", sans-serif',
          fontSize: "12px",
          fontWeight: 500,
          lineHeight: "1.4em",
          color: "rgba(186, 230, 253, 0.35)",
        }}
      >
        {footer.note}
      </p>
    </footer>
  );
}
