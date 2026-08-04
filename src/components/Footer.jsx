import { useContent } from "../i18n/useContent.jsx";

// Minimal footer: just the footer note line.
// The contact CTA has been moved to CtaSection.jsx.
export default function Footer() {
  const { data } = useContent();
  const { footer } = data;

  return (
    <footer className="mx-auto flex w-full max-w-content justify-center px-6 pb-10 pt-2">
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
    </footer>
  );
}
