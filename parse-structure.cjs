// One-off structural analyzer for the minified Framer index.html.
// Tokenizes the body and rebuilds a DOM tree, capturing data-framer-name,
// key style properties, layout (display/flex), colors, sizes, and text.
// Output: structure-tree.txt
const fs = require("fs");

const html = fs.readFileSync("reference/index.html", "utf8");

// Restrict to the <body> subtree (the page lives in div#main).
const bodyStart = html.indexOf("<body");
const bodyEnd = html.indexOf("</body>");
const body = html.slice(bodyStart, bodyEnd);

// Tokenizer: pull opening tags, closing tags, and text between them.
const tagRe = /<(\/?)([a-zA-Z][\w-]*)(\s[^>]*)?\/?>/g;
const tokens = [];
let m;
let lastIndex = 0;
while ((m = tagRe.exec(body)) !== null) {
  // text before this tag
  const text = body.slice(lastIndex, m.index).trim();
  if (text) tokens.push({ type: "text", value: text });
  const closing = m[1] === "/";
  const tag = m[2];
  const attrsRaw = m[3] || "";
  tokens.push({ type: closing ? "close" : "open", tag, attrsRaw });
  lastIndex = tagRe.lastIndex;
}

// Parse attributes from raw string.
function parseAttrs(raw) {
  const out = {};
  const re = /([\w-]+)\s*=\s*"([^"]*)"/g;
  let a;
  while ((a = re.exec(raw)) !== null) out[a[1]] = a[2];
  return out;
}

// Parse inline style string into an object.
function parseStyle(s) {
  if (!s) return {};
  const out = {};
  for (const part of s.split(";")) {
    const idx = part.indexOf(":");
    if (idx === -1) continue;
    const k = part.slice(0, idx).trim();
    const v = part.slice(idx + 1).trim();
    if (k) out[k] = v;
  }
  return out;
}

// Interesting style keys to surface in the report.
const STYLE_KEYS = [
  "background-color",
  "background",
  "color",
  "display",
  "flex-direction",
  "flex-wrap",
  "align-items",
  "justify-content",
  "gap",
  "padding",
  "border-radius",
  "width",
  "min-width",
  "max-width",
  "height",
  "min-height",
  "font-size",
  "font-weight",
  "line-height",
  "text-align",
  "flex",
  "grid-template-columns",
  "top",
  "left",
  "right",
  "bottom",
  "position",
];

// Build the tree.
const root = {
  tag: "root",
  name: null,
  attrs: {},
  style: {},
  depth: -1,
  children: [],
  text: "",
};
const stack = [root];
const flat = []; // depth-first ordered nodes (only "interesting" ones)

let id = 0;
for (const tk of tokens) {
  if (tk.type === "open") {
    const attrs = parseAttrs(tk.attrsRaw);
    // Skip the Framer badge / svg templates / scripts entirely.
    const cls = attrs.class || "";
    const name = attrs["data-framer-name"] || null;
    if (
      tk.tag === "script" ||
      tk.tag === "svg" ||
      tk.tag === "style" ||
      tk.tag === "link" ||
      tk.tag === "meta" ||
      cls.includes("__framer-badge") ||
      cls.includes("framer-6jWyo")
    ) {
      // treat as self-contained (skip) — push a placeholder we won't print
      continue;
    }
    const style = parseStyle(attrs.style || "");
    const node = {
      id: id++,
      tag: tk.tag,
      name,
      class: cls.split(" ").filter(Boolean).slice(0, 3),
      href: attrs.href || null,
      src: attrs.src || null,
      style,
      depth: stack.length - 1,
      children: [],
      text: "",
      _selfClose: tk.attrsRaw && tk.attrsRaw.trim().endsWith("/"),
    };
    stack[stack.length - 1].children.push(node);
    stack.push(node);
    flat.push(node);
    if (tk.tag === "img" || tk.tag === "input" || node._selfClose) {
      stack.pop();
    }
  } else if (tk.type === "close") {
    if (stack.length > 1) stack.pop();
  } else if (tk.type === "text") {
    const top = stack[stack.length - 1];
    if (top) {
      // Strip CSS var artifacts.
      const t = tk.value.replace(/var\(--[^)]+\)/g, "").trim();
      if (t && !/^[a-z-]+$/.test(t.split(" ")[0]) && t.length < 200) {
        top.text = (top.text ? top.text + " " : "") + t;
      }
    }
  }
}

// Render tree with only "interesting" nodes (named or styled or text-bearing).
function styleLine(node) {
  const parts = [];
  for (const k of STYLE_KEYS) {
    if (node.style[k] != null) {
      let v = node.style[k];
      // collapse css var refs for readability
      if (v.includes("var(")) v = v.replace(/var\([^)]+\)/g, "var(...)");
      parts.push(`${k}:${v}`);
    }
  }
  return parts.length ? ` {${parts.join("; ")}}` : "";
}

function nodeLabel(node) {
  const bits = [`<${node.tag}`];
  if (node.name) bits.push(`name="${node.name}"`);
  if (node.class && node.class.length)
    bits.push(`class=${node.class.join(".")}`);
  if (node.href) bits.push(`href=${node.href}`);
  if (node.src) bits.push(`src=${node.src}`);
  return bits.join(" ");
}

function walk(node, lines, onlyNamed) {
  const interesting =
    node.depth >= 0 &&
    (node.name || node.text || node.href || node.tag === "img" || node.src);

  if (interesting) {
    lines.push(
      `${"  ".repeat(Math.max(0, node.depth))}${nodeLabel(node)}${styleLine(node)}${
        node.text ? `  -> "${node.text.slice(0, 120)}"` : ""
      }`,
    );
  }
  for (const c of node.children) walk(c, lines, onlyNamed);
}

const lines = [];
walk(root, lines, true);
fs.writeFileSync("structure-tree.txt", lines.join("\n"), "utf8");
console.log(`Tree nodes rendered: ${lines.length}`);
console.log(lines.slice(0, 250).join("\n"));
