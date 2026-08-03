// Capture inline styles of framer-text <p>/<h2>/<h3>/<h4> AND the icon-bubble <use> mapping.
const fs = require("fs");
const html = fs.readFileSync("reference/index.html", "utf8");
const bodyStart = html.indexOf("<body");
const body = html.slice(bodyStart, html.indexOf("</body>"));

const lines = [];
const seen = new Set();

// 1) text nodes: <p|hx class="framer-text..." style="..." ...>TEXT</p|hx>
const textRe =
  /<(p|h[1-6])([^>]*class="[^"]*framer-text[^"]*"[^>]*)>([\s\S]*?)<\/\1>/g;
let m;
while ((m = textRe.exec(body)) !== null) {
  const tag = m[1];
  const attrs = m[2];
  const inner = m[3].replace(/<[^>]+>/g, "").trim();
  if (!inner) continue;
  const style = (attrs.match(/style="([^"]*)"/) || [])[1] || "";
  const name = (attrs.match(/data-framer-name="([^"]*)"/) || [])[1] || "";
  // Pull just the interesting props
  const color = (style.match(/--framer-text-color:([^;]*)/) || [])[1] || "";
  const size = (style.match(/--framer-font-size:([^;]*)/) || [])[1] || "";
  const weight = (style.match(/--framer-font-weight:([^;]*)/) || [])[1] || "";
  const align = (style.match(/--framer-text-alignment:([^;]*)/) || [])[1] || "";
  const key = inner.slice(0, 30) + color + size;
  if (seen.has(key)) continue;
  seen.add(key);
  lines.push(`[${tag}] ${inner.slice(0, 70)}`);
  lines.push(
    `  name=${name} color=${color} size=${size} weight=${weight} align=${align}`,
  );
}

lines.push("");
lines.push("=== Icon Bubble <use href> mapping (in order) ===");

// 2) icon bubbles: walk "Icon Bubble" divs and their <use href=#id>
// Find each "Service Card — ..." then the Icon Bubble's use href.
const cardRe = /data-framer-name="Service Card[^"]*"|<use href="#(\d+)"/g;
const seq = [];
let c;
while ((c = cardRe.exec(body)) !== null) {
  seq.push(c[0]);
}
// print condensed
let cardIdx = 0;
seq.forEach((s) => {
  if (s.startsWith("data-framer-name")) {
    lines.push(`${s}`);
    cardIdx++;
  } else {
    lines.push(`    -> use ${s}`);
  }
});

fs.writeFileSync("extracted-typo.txt", lines.join("\n"), "utf8");
console.log(lines.join("\n"));
