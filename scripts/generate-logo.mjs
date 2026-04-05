// scripts/generate-logo.mjs — SVG logo generator
// Usage: node scripts/generate-logo.mjs <path-to-spec.json>
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { resolve, join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ─── ENTRY POINT ────────────────────────────────────────────────────
const specPath = process.argv[2];
if (!specPath) {
  console.error("Usage: node scripts/generate-logo.mjs <path-to-spec.json>");
  process.exit(1);
}

let spec;
try {
  spec = JSON.parse(readFileSync(resolve(specPath), "utf-8"));
} catch (e) {
  console.error(`Error reading spec: ${e.message}`);
  process.exit(1);
}

const { brand, variants } = spec;
if (!brand?.slug || !Array.isArray(variants) || variants.length === 0) {
  console.error("Invalid spec: missing brand.slug or variants array.");
  process.exit(1);
}

const outDir = resolve(__dirname, "..", "outputs", "logos", brand.slug);
mkdirSync(outDir, { recursive: true });

// ─── SVG UTILITIES ──────────────────────────────────────────────────

// Unique gradient IDs — avoids collision when multiple SVGs are inlined in one HTML page
function ns(suffix, variant, layout) {
  return `${brand.slug}-${variant.id}-${layout}-${suffix}`;
}

function gradientDef(id, c1, c2) {
  return `<linearGradient id="${id}" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
    <stop offset="0%" stop-color="${c1}"/>
    <stop offset="100%" stop-color="${c2}"/>
  </linearGradient>`;
}

function gradientFadeDef(id, color) {
  return `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="${color}"/>
    <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
  </linearGradient>`;
}

function bgShape(container, size, bgId) {
  const s = size;
  if (container === "circle")  return `<circle cx="${s/2}" cy="${s/2}" r="${s/2}" fill="url(#${bgId})"/>`;
  if (container === "rounded") return `<rect width="${s}" height="${s}" rx="${Math.round(s*0.22)}" fill="url(#${bgId})"/>`;
  return `<rect width="${s}" height="${s}" fill="url(#${bgId})"/>`;
}

function applyCase(text, caseRule) {
  if (caseRule === "uppercase") return text.toUpperCase();
  if (caseRule === "lowercase") return text.toLowerCase();
  return text;
}

// ─── ICON CONCEPTS ──────────────────────────────────────────────────

function iconTagWing(s, colors, bgId) {
  const tagX = s * 0.16, tagY = s * 0.30;
  const tagW = s * 0.44, tagH = s * 0.28;
  const midY = tagY + tagH / 2;
  const holeX = tagX + tagW * 0.18;
  const lx = tagX + tagW * 0.36;
  const f = (n) => n.toFixed(1);
  return `
  <rect x="${f(tagX)}" y="${f(tagY)}" width="${f(tagW)}" height="${f(tagH)}" rx="${f(tagH*0.13)}" fill="${colors.primary}" fill-opacity="0.95"/>
  <circle cx="${f(holeX)}" cy="${f(midY)}" r="${f(tagH*0.14)}" fill="${colors.background}"/>
  <line x1="${f(lx)}" y1="${f(tagY+tagH*0.28)}" x2="${f(tagX+tagW*0.88)}" y2="${f(tagY+tagH*0.28)}" stroke="${colors.accent}" stroke-width="${f(s*0.018)}" stroke-linecap="round" stroke-opacity="0.5"/>
  <line x1="${f(lx)}" y1="${f(midY)}" x2="${f(tagX+tagW*0.82)}" y2="${f(midY)}" stroke="${colors.accent}" stroke-width="${f(s*0.018)}" stroke-linecap="round" stroke-opacity="0.5"/>
  <line x1="${f(lx)}" y1="${f(tagY+tagH*0.72)}" x2="${f(tagX+tagW*0.86)}" y2="${f(tagY+tagH*0.72)}" stroke="${colors.accent}" stroke-width="${f(s*0.018)}" stroke-linecap="round" stroke-opacity="0.5"/>
  <path d="M${f(tagX+tagW)} ${f(midY)} C${f(s*0.70)} ${f(midY-s*0.13)} ${f(s*0.82)} ${f(midY-s*0.09)} ${f(s*0.84)} ${f(midY)} C${f(s*0.82)} ${f(midY+s*0.09)} ${f(s*0.70)} ${f(midY+s*0.13)} ${f(tagX+tagW)} ${f(midY)}Z" fill="${colors.accent}"/>`;
}

function iconPaperPlane(s, colors) {
  const f = (n) => n.toFixed(1);
  return `
  <path d="M${f(s*0.18)} ${f(s*0.60)} L${f(s*0.50)} ${f(s*0.20)} L${f(s*0.82)} ${f(s*0.60)} L${f(s*0.64)} ${f(s*0.57)} L${f(s*0.58)} ${f(s*0.72)} L${f(s*0.50)} ${f(s*0.57)} L${f(s*0.42)} ${f(s*0.72)} L${f(s*0.36)} ${f(s*0.57)} Z" fill="${colors.primary}" fill-opacity="0.95"/>
  <path d="M${f(s*0.50)} ${f(s*0.20)} L${f(s*0.50)} ${f(s*0.57)} L${f(s*0.64)} ${f(s*0.57)} Z" fill="${colors.accent}" fill-opacity="0.55"/>`;
}

function iconTMark(s, colors, arcId) {
  const f = (n) => n.toFixed(1);
  return `
  <rect x="${f(s*0.20)}" y="${f(s*0.26)}" width="${f(s*0.60)}" height="${f(s*0.10)}" rx="${f(s*0.05)}" fill="${colors.primary}"/>
  <rect x="${f(s*0.42)}" y="${f(s*0.26)}" width="${f(s*0.16)}" height="${f(s*0.44)}" rx="${f(s*0.05)}" fill="${colors.primary}"/>
  <path d="M${f(s*0.58)} ${f(s*0.57)} Q${f(s*0.74)} ${f(s*0.47)} ${f(s*0.80)} ${f(s*0.57)}" stroke="url(#${arcId})" stroke-width="${f(s*0.035)}" fill="none" stroke-linecap="round"/>
  <path d="M${f(s*0.58)} ${f(s*0.64)} Q${f(s*0.76)} ${f(s*0.52)} ${f(s*0.84)} ${f(s*0.64)}" stroke="url(#${arcId})" stroke-width="${f(s*0.02)}" fill="none" stroke-linecap="round" stroke-opacity="0.4"/>`;
}

function buildIconContent(variant, s, bgId, arcId) {
  const { icon_concept, colors } = variant;
  if (icon_concept === "tag-wing")    return iconTagWing(s, colors, bgId);
  if (icon_concept === "paper-plane") return iconPaperPlane(s, colors);
  if (icon_concept === "t-mark")      return iconTMark(s, colors, arcId);
  return "";
}

// ─── LAYOUT GENERATORS ──────────────────────────────────────────────

function renderIcon(variant, container_shape) {
  const s = 100;
  const { colors, typography } = variant;
  const bgId  = ns("bg",  variant, container_shape);
  const arcId = ns("arc", variant, container_shape);
  const name  = applyCase(brand.name, typography.case);
  const ls    = typography.letter_spacing ?? 1.2;

  const defs = `<defs>
    ${gradientDef(bgId, colors.background, colors.background_end)}
    ${variant.icon_concept === "t-mark" ? gradientFadeDef(arcId, colors.accent) : ""}
  </defs>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${s} ${s}" role="img">
  <title>${brand.name} — ${variant.label} (${container_shape})</title>
  ${defs}
  <g id="background">${bgShape(container_shape, s, bgId)}</g>
  <g id="icon">${buildIconContent(variant, s, bgId, arcId)}</g>
  <g id="wordmark">
    <text x="${s/2}" y="${(s*0.80).toFixed(1)}" text-anchor="middle"
      font-family="'Segoe UI',-apple-system,system-ui,Arial,sans-serif"
      font-size="${(s*0.10).toFixed(1)}" font-weight="${typography.weight_name}"
      fill="${colors.primary}" letter-spacing="${ls}">${name}</text>
  </g>
</svg>`;
}

function renderWordmarkBold(variant) {
  const W = 280, H = 72;
  const { colors, typography } = variant;
  const bgId = ns("wm-bg", variant, "bold");
  const name = applyCase(brand.name, typography.case);
  const half = Math.ceil(name.length / 2);
  const p1   = name.slice(0, half);
  const p2   = name.slice(half);
  const ls   = typography.letter_spacing ?? 0;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img">
  <title>${brand.name} wordmark — bold</title>
  <defs>${gradientDef(bgId, colors.background, colors.background_end)}</defs>
  <rect width="${W}" height="${H}" rx="8" fill="url(#${bgId})"/>
  <g id="wordmark">
    <text x="18" y="46" font-family="'Segoe UI',-apple-system,system-ui,Arial,sans-serif" font-size="34">
      <tspan font-weight="${typography.weight_name}" fill="${colors.primary}" letter-spacing="${ls}">${p1}</tspan><tspan fill="${colors.primary}" font-weight="100" font-size="24" letter-spacing="0" fill-opacity="0.3">  |  </tspan><tspan font-weight="${typography.weight_name}" fill="${colors.accent}" letter-spacing="${ls}">${p2}</tspan>
    </text>
  </g>
</svg>`;
}

function renderWordmarkStacked(variant) {
  const W = 280, H = 80;
  const { colors, typography } = variant;
  const bgId    = ns("wm-stk", variant, "stacked");
  const name    = applyCase(brand.name, typography.case);
  const tagline = (brand.tagline ?? "").toUpperCase();
  const ls      = typography.letter_spacing ?? 0;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img">
  <title>${brand.name} wordmark — stacked</title>
  <defs>${gradientDef(bgId, colors.background, colors.background_end)}</defs>
  <rect width="${W}" height="${H}" rx="8" fill="url(#${bgId})"/>
  <g id="wordmark">
    <text x="${W/2}" y="36" text-anchor="middle"
      font-family="'Segoe UI',-apple-system,system-ui,Arial,sans-serif"
      font-size="28" font-weight="${typography.weight_name}"
      fill="${colors.primary}" letter-spacing="${ls}">${name}</text>
    <line x1="40" y1="46" x2="${W-40}" y2="46" stroke="${colors.accent}" stroke-width="0.75" stroke-opacity="0.4"/>
    <text x="${W/2}" y="62" text-anchor="middle"
      font-family="'Segoe UI',-apple-system,system-ui,Arial,sans-serif"
      font-size="10" font-weight="400" fill="${colors.accent}" letter-spacing="2">${tagline}</text>
  </g>
</svg>`;
}

function renderLockupHorizontal(variant) {
  const W = 320, H = 80;
  const { colors, typography } = variant;
  const iconSize = 54;
  const iconPad  = 12;
  const textX    = iconPad + iconSize + 14;
  const iconY    = (H - iconSize) / 2;
  const bgId     = ns("lh-bg",  variant, "lockup-h");
  const arcId    = ns("lh-arc", variant, "lockup-h");
  const name     = applyCase(brand.name, typography.case);
  const tagline  = brand.tagline ?? "";
  const half     = Math.ceil(name.length / 2);
  const ls       = typography.letter_spacing ?? 0;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img">
  <title>${brand.name} horizontal lockup</title>
  <defs>
    ${gradientDef(bgId, colors.background, colors.background_end)}
    ${variant.icon_concept === "t-mark" ? gradientFadeDef(arcId, colors.accent) : ""}
  </defs>
  <g id="icon" transform="translate(${iconPad}, ${iconY.toFixed(1)})">
    ${bgShape("rounded", iconSize, bgId)}
    ${buildIconContent(variant, iconSize, bgId, arcId)}
  </g>
  <g id="wordmark">
    <text x="${textX}" y="${(H*0.44).toFixed(1)}"
      font-family="'Segoe UI',-apple-system,system-ui,Arial,sans-serif" font-size="22">
      <tspan font-weight="${typography.weight_name}" fill="#0F172A" letter-spacing="${ls}">${name.slice(0, half)}</tspan><tspan font-weight="300" fill="${colors.accent}" letter-spacing="${ls}">${name.slice(half)}</tspan>
    </text>
    <text x="${textX}" y="${(H*0.67).toFixed(1)}"
      font-family="'Segoe UI',-apple-system,system-ui,Arial,sans-serif"
      font-size="9" font-weight="400" fill="#94a3b8" letter-spacing="1.5">${tagline.toUpperCase()}</text>
  </g>
</svg>`;
}

function renderLockupVertical(variant) {
  const W = 200, H = 130;
  const { colors, typography } = variant;
  const iconSize = 56;
  const iconX    = (W - iconSize) / 2;
  const bgId     = ns("lv-bg",  variant, "lockup-v");
  const arcId    = ns("lv-arc", variant, "lockup-v");
  const name     = applyCase(brand.name, typography.case);
  const tagline  = brand.tagline ?? "";
  const half     = Math.ceil(name.length / 2);
  const ls       = typography.letter_spacing ?? 0;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img">
  <title>${brand.name} vertical lockup</title>
  <defs>
    ${gradientDef(bgId, colors.background, colors.background_end)}
    ${variant.icon_concept === "t-mark" ? gradientFadeDef(arcId, colors.accent) : ""}
  </defs>
  <g id="icon" transform="translate(${iconX.toFixed(1)}, 8)">
    ${bgShape("circle", iconSize, bgId)}
    ${buildIconContent(variant, iconSize, bgId, arcId)}
  </g>
  <g id="wordmark">
    <text x="${W/2}" y="88" text-anchor="middle"
      font-family="'Segoe UI',-apple-system,system-ui,Arial,sans-serif" font-size="22">
      <tspan font-weight="${typography.weight_name}" fill="#0F172A" letter-spacing="${ls}">${name.slice(0, half)}</tspan><tspan font-weight="300" fill="${colors.accent}" letter-spacing="${ls}">${name.slice(half)}</tspan>
    </text>
    <text x="${W/2}" y="104" text-anchor="middle"
      font-family="'Segoe UI',-apple-system,system-ui,Arial,sans-serif"
      font-size="9" font-weight="400" fill="#94a3b8" letter-spacing="1.5">${tagline.toUpperCase()}</text>
  </g>
</svg>`;
}

function renderEmblem(variant) {
  const S = 100;
  const { colors, icon_concept } = variant;
  const bgId  = ns("em-bg",  variant, "emblem");
  const arcId = ns("em-arc", variant, "emblem");
  const topId = ns("em-top", variant, "emblem");
  const botId = ns("em-bot", variant, "emblem");
  const iconSize = 36;
  const iconX    = (S - iconSize) / 2;
  const iconY    = S * 0.32 - iconSize / 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}" role="img">
  <title>${brand.name} emblem</title>
  <defs>
    ${gradientDef(bgId, colors.background, colors.background_end)}
    ${icon_concept === "t-mark" ? gradientFadeDef(arcId, colors.accent) : ""}
    <path id="${topId}" d="M12,50 a38,38 0 0,1 76,0"/>
    <path id="${botId}" d="M88,50 a38,38 0 0,1 -76,0"/>
  </defs>
  <circle cx="${S/2}" cy="${S/2}" r="${S/2 - 1}" fill="url(#${bgId})"/>
  <circle cx="${S/2}" cy="${S/2}" r="${S/2 - 6}" fill="none" stroke="${colors.accent}" stroke-width="0.6" stroke-opacity="0.4"/>
  <g id="icon" transform="translate(${iconX.toFixed(1)}, ${iconY.toFixed(1)})">
    ${buildIconContent(variant, iconSize, bgId, arcId)}
  </g>
  <text font-family="'Segoe UI',-apple-system,system-ui,Arial,sans-serif"
    font-size="7.5" font-weight="700" fill="${colors.accent}" letter-spacing="2">
    <textPath href="#${topId}" startOffset="18%">· ${brand.name.toUpperCase()} ·</textPath>
  </text>
  <text font-family="'Segoe UI',-apple-system,system-ui,Arial,sans-serif"
    font-size="6" font-weight="400" fill="${colors.primary}" fill-opacity="0.6" letter-spacing="1.2">
    <textPath href="#${botId}" startOffset="8%">${(brand.tagline ?? "").toUpperCase()}</textPath>
  </text>
</svg>`;
}

// ─── MAIN ────────────────────────────────────────────────────────────
const generated = [];

for (const variant of variants) {
  for (const container of ["square", "rounded", "circle"]) {
    const path = join(outDir, `${brand.slug}-${variant.id}-icon-${container}.svg`);
    writeFileSync(path, renderIcon(variant, container));
    generated.push(path);
  }

  const wbPath = join(outDir, `${brand.slug}-${variant.id}-wordmark-bold.svg`);
  writeFileSync(wbPath, renderWordmarkBold(variant));
  generated.push(wbPath);

  const wsPath = join(outDir, `${brand.slug}-${variant.id}-wordmark-stacked.svg`);
  writeFileSync(wsPath, renderWordmarkStacked(variant));
  generated.push(wsPath);

  const lhPath = join(outDir, `${brand.slug}-${variant.id}-lockup-horizontal.svg`);
  writeFileSync(lhPath, renderLockupHorizontal(variant));
  generated.push(lhPath);

  const lvPath = join(outDir, `${brand.slug}-${variant.id}-lockup-vertical.svg`);
  writeFileSync(lvPath, renderLockupVertical(variant));
  generated.push(lvPath);
}

// One emblem per brand — use first variant
const emblemPath = join(outDir, `${brand.slug}-emblem.svg`);
writeFileSync(emblemPath, renderEmblem(variants[0]));
generated.push(emblemPath);

console.log(`\nGenerated ${generated.length} SVG files → ${outDir.replace(process.cwd() + "/", "").replace(/\\/g, "/")}/`);
generated.forEach(f => console.log(`  ${f.replace(process.cwd() + "\\", "").replace(process.cwd() + "/", "").replace(/\\/g, "/")}`));
