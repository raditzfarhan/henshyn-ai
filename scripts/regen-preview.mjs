// scripts/regen-preview.mjs — regenerate index.html from existing SVGs + spec.json
// Usage: node scripts/regen-preview.mjs <logo-dir>
import { readFileSync, writeFileSync, readdirSync } from "fs";
import { resolve, join, relative } from "path";
import { generatePreviewHTML } from "./lib/preview-html.mjs";

const dirArg = process.argv[2];
if (!dirArg) {
  console.error("Usage: node scripts/regen-preview.mjs <logo-dir>");
  process.exit(1);
}

const dir = resolve(dirArg);

let brand, variants;
try {
  ({ brand, variants } = JSON.parse(readFileSync(join(dir, "spec.json"), "utf-8")));
} catch {
  console.error(`spec.json not found in ${dir} — run generate-logo.mjs first`);
  process.exit(1);
}

const allSvgs = readdirSync(dir)
  .filter(f => f.endsWith(".svg"))
  .sort()
  .map(f => join(dir, f));

const logoDir = relative(process.cwd(), dir).replace(/\\/g, "/");
writeFileSync(join(dir, "index.html"), generatePreviewHTML(brand, variants, allSvgs, logoDir));
console.log(`index.html regenerated → ${logoDir}/`);
