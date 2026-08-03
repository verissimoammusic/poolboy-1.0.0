// Extract inline style attributes for the text-bearing and card nodes,
// to capture exact font-size / color / weight for the rewrite.
const fs = require("fs");
const html = fs.readFileSync("reference/index.html", "utf8");
const bodyStart = html.indexOf("<body");
const bodyEnd = html.indexOf("</body>");
const body = html.slice(bodyStart, bodyEnd);

// Find each RichTextContainer and its <p>/<h2>/<h3>/<h4> with style.
// We capture data-framer-name + the inner heading/paragraph style.
const re =
  /data-framer-name="([^"]+)"[^>]*data-framer-component-type="RichTextContainer"[^>]*?style="([^"]*)"[^>]*?>([\s\S]*?)<\/div>/g;
const lines = [];
let m;
const seen = new Set();
while ((m = re.exec(body)) !== null) {
  const name = m[1];
  const outerStyle = m[2];
  const inner = m[3];
  // pull first <p|hx ... style="..."> and the text
  const innerRe = /<(p|h[1-6])[^>]*style="([^"]*)"[^>]*>([\s\S]*?)<\/\1>/;
  const im = inner.match(innerRe);
  const key = name + "|" + (im ? im[2] : outerStyle);
  if (seen.has(key)) continue;
  seen.add(key);
  lines.push(`=== ${name} ===`);
  lines.push(`  outer: ${outerStyle}`);
  if (im) {
    lines.push(`  <${im[1]}> style: ${im[2]}`);
    lines.push(
      `  text: ${im[3]
        .replace(/<[^>]+>/g, "")
        .trim()
        .slice(0, 80)}`,
    );
  }
  lines.push("");
}
fs.writeFileSync("extracted-styles.txt", lines.join("\n"), "utf8");
console.log(lines.join("\n"));
