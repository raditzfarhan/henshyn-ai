// scripts/generate-docx.mjs
import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve, dirname, basename, extname, join } from "path";
import { fileURLToPath } from "url";

// Guard: check docx package is installed before attempting import
try {
  await import("docx");
} catch {
  console.error("Error: 'docx' package not found. Run `npm install` first.");
  process.exit(1);
}

const { Packer } = await import("docx");

const filePath = process.argv[2];

if (!filePath) {
  console.error("Error: file path is required.\nUsage: node scripts/generate-docx.mjs <path-to-md-file>");
  process.exit(1);
}

const absPath = resolve(filePath);

if (!existsSync(absPath)) {
  console.error(`Error: file not found — ${absPath}`);
  process.exit(1);
}

// Detect output type from the first path segment after outputs/
// Normalizes backslashes and strips trailing plural 's'
// e.g. C:\...\outputs\proposals\foo.md → "proposal"
//      C:\...\outputs\ideas\foo.md     → "idea"
function detectType(absPath) {
  const normalized = absPath.replace(/\\/g, "/");
  const match = normalized.match(/outputs\/([^/]+)\//);
  if (!match) return "universal";
  const segment = match[1];
  return segment.endsWith("s") ? segment.slice(0, -1) : segment;
}

// Extract title and date from file content and filename
// Title: first H1 in content → filename slug (better than spec's empty-string fallback)
// Date: YYYY-MM-DD prefix in filename → today
function extractMeta(absPath, content) {
  const file = basename(absPath, extname(absPath));
  const dateMatch = file.match(/^(\d{4}-\d{2}-\d{2})/);
  const date = dateMatch ? dateMatch[1] : new Date().toISOString().slice(0, 10);
  const h1Match = content.match(/^#\s+(.+)$/m);
  const title = h1Match
    ? h1Match[1].trim()
    : file.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/-/g, " ");
  return { title, date };
}

const type = detectType(absPath);
const content = readFileSync(absPath, "utf-8");
const meta = extractMeta(absPath, content);

const __dirname = dirname(fileURLToPath(import.meta.url));

let templateModule;
try {
  templateModule = await import(`./templates/${type}.mjs`);
} catch {
  templateModule = await import(`./templates/universal.mjs`);
}

const doc = await templateModule.build(content, meta);
const buffer = await Packer.toBuffer(doc);

// Write .docx next to the .md source file
const outPath = join(dirname(absPath), basename(absPath, extname(absPath)) + ".docx");
writeFileSync(outPath, buffer);
console.log(`Done: ${outPath}`);
