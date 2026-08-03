// Extract each SVG template's full inner markup by id, so we can reuse
// the EXACT path data in the React icons (pixel-faithful).
const fs = require("fs");
const html = fs.readFileSync("reference/index.html", "utf8");

const ids = [
  "3606546390", // Aspiração
  "1447758117", // Limpeza de Filtros
  "668900100", // Tratamento Químico
  "324576014", // Recuperação Água Verde
  "2962436954", // Abertura de Época
  "2850519585", // Invernagem
  "997315869", // Check-up
  "4021185382", // Energia
  "3459148117", // Phone (final CTA)
];

const out = [];
for (const id of ids) {
  const re = new RegExp(`<svg[^>]*id="${id}"[^>]*>([\\s\\S]*?)</svg>`, "g");
  const m = re.exec(html);
  out.push(`=== #${id} ===`);
  if (m) {
    out.push(m[1].trim());
  } else {
    out.push("NOT FOUND");
  }
  out.push("");
}
fs.writeFileSync("extracted-svgs.txt", out.join("\n"), "utf8");
console.log(out.join("\n"));
