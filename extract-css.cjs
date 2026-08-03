// Extract CSS rules for the key Framer class names from the minified <style> block.
const fs = require("fs");
const html = fs.readFileSync("reference/index.html", "utf8");

// Key class names to look up (from structure-tree.txt).
const classes = [
  "framer-1cgs98q",
  "framer-cduc4r",
  "framer-a53q7j",
  "framer-12gg2qt",
  "framer-owjulc",
  "framer-14aix3b",
  "framer-vchcqu",
  "framer-oyteoc",
  "framer-k35p55",
  "framer-1bib2dg",
  "framer-6XhEC",
  "framer-25y43g",
  "framer-1am38jp",
  "framer-1ezruyw",
  "framer-rhs9az",
  "framer-2blmyt",
  "framer-10tygb0",
  "framer-cgi2ss",
  "framer-1sl645d",
  "framer-1v6p02s",
  "framer-vejplz",
  "framer-tmwj69",
  "framer-6v4y8q",
  "framer-8o4di1",
  "framer-ap1im5",
  "framer-fmxh1v",
  "framer-7y8nfh",
  "framer-xsep1a",
  "framer-1g4kgyb",
  "framer-1txw27j",
  "framer-16r7752",
  "framer-1jgoera",
  "framer-f4xhsc",
  "framer-1i0afh4",
  "framer-o1fznw",
  "framer-wu0fz1",
  "framer-1qtnt8v",
  "framer-1s9kv5l",
  "framer-lux5qc",
  "framer-58jx1k",
  "framer-a6w24h",
  "framer-styles-preset-ajmyxb",
];

const out = [];
for (const cls of classes) {
  // Match .classname{...} or .classname.variant{...}
  // The CSS is minified, so rules are like: .framer-1cgs98q{...}
  const re = new RegExp(
    `\\.${cls.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?:\\.[\\w-]+)*\\s*\\{([^}]*)\\}`,
    "g",
  );
  const matches = [];
  let m;
  while ((m = re.exec(html)) !== null) {
    matches.push(m[1]);
  }
  if (matches.length) {
    out.push(`=== .${cls} (${matches.length} rules) ===`);
    matches.forEach((body, i) => out.push(`  [${i}] ${body.trim()}`));
    out.push("");
  } else {
    out.push(`=== .${cls} — NOT FOUND ===`);
    out.push("");
  }
}

fs.writeFileSync("extracted-css.txt", out.join("\n"), "utf8");
console.log(out.join("\n"));
