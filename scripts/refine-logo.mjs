// scripts/refine-logo.mjs — refine a single SVG logo via Claude
// Usage: node scripts/refine-logo.mjs <svg-file-path> "<refinement-prompt>"
import { readFileSync, writeFileSync, readdirSync } from "fs";
import { resolve, join, dirname, basename, relative } from "path";
import { generatePreviewHTML } from "./lib/preview-html.mjs";

// ─── ARGS ────────────────────────────────────────────────────────────
const [svgArg, prompt] = process.argv.slice(2);
if (!svgArg || !prompt) {
  console.error('Usage: node scripts/refine-logo.mjs <svg-file-path> "<prompt>"');
  process.exit(1);
}

const svgPath = resolve(svgArg);
const dir     = dirname(svgPath);

// ─── READ SVG ────────────────────────────────────────────────────────
let svgSource;
try {
  svgSource = readFileSync(svgPath, "utf-8");
} catch {
  console.error(`File not found: ${svgPath}`);
  process.exit(1);
}

// ─── READ SPEC ───────────────────────────────────────────────────────
const specFile = join(dir, "spec.json");
let brand, variants;
try {
  ({ brand, variants } = JSON.parse(readFileSync(specFile, "utf-8")));
} catch {
  console.error(`spec.json not found in ${dir} — run generate-logo.mjs first`);
  process.exit(1);
}

// ─── VERSION NUMBER ──────────────────────────────────────────────────
// Strip any existing -vN suffix so refining a versioned file still increments cleanly
const inputBase = basename(svgPath, ".svg").replace(/-v\d+$/, "");
const versionRe = new RegExp(`^${inputBase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}-v(\\d+)\\.svg$`);
const existing  = readdirSync(dir)
  .map(f => { const m = f.match(versionRe); return m ? parseInt(m[1], 10) : null; })
  .filter(n => n !== null);
const nextN   = existing.length ? Math.max(...existing) + 1 : 2;
const outName = `${inputBase}-v${nextN}.svg`;
const outPath = join(dir, outName);

// ─── CHECK API KEY ───────────────────────────────────────────────────
const apiKey = process.env.ANTHROPIC_API_KEY;
if (!apiKey) {
  console.error("ANTHROPIC_API_KEY environment variable is not set");
  process.exit(1);
}

console.log(`\nRefining ${basename(svgPath)} → ${outName}...`);

// ─── CALL CLAUDE ─────────────────────────────────────────────────────
let refined;
try {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key":         apiKey,
      "anthropic-version": "2023-06-01",
      "content-type":      "application/json",
    },
    body: JSON.stringify({
      model:      "claude-sonnet-4-6",
      max_tokens: 4096,
      system:     "You are an SVG editor. Return only valid SVG XML. Start your response with `<svg` and end with `</svg>`. No markdown, no code fences, no explanation.",
      messages: [{
        role:    "user",
        content: `Here is the SVG:\n\n${svgSource}\n\nRefinement request: ${prompt}`,
      }],
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    console.error(`Claude API error ${res.status}: ${body}`);
    process.exit(1);
  }
  const data = await res.json();
  refined = data.content[0].text;
} catch (err) {
  console.error(`Claude API request failed: ${err.message}`);
  process.exit(1);
}

// ─── VALIDATE ────────────────────────────────────────────────────────
const trimmed = refined.trim();
if (!trimmed.toLowerCase().startsWith("<svg") || !trimmed.includes("</svg>")) {
  console.error("Claude returned non-SVG content — no file written.");
  console.error("Response preview:", trimmed.slice(0, 300));
  process.exit(1);
}

// ─── WRITE ───────────────────────────────────────────────────────────
writeFileSync(outPath, trimmed);
console.log(`  ✓ Saved: ${relative(process.cwd(), outPath).replace(/\\/g, "/")}`);

// ─── REGENERATE HTML ─────────────────────────────────────────────────
const allSvgs = readdirSync(dir)
  .filter(f => f.endsWith(".svg"))
  .sort()
  .map(f => join(dir, f));

const logoDir = relative(process.cwd(), dir).replace(/\\/g, "/");
writeFileSync(join(dir, "index.html"), generatePreviewHTML(brand, variants, allSvgs, logoDir));
console.log(`  ✓ index.html regenerated — refresh browser to see ${outName}`);
