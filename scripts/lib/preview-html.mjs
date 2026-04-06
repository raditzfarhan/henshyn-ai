// scripts/lib/preview-html.mjs — shared HTML preview generator
import { readFileSync } from "fs";
import { basename } from "path";

/**
 * Generate the full index.html preview page for a brand's logo set.
 * @param {object} brand       - { slug, name, tagline }
 * @param {Array}  variants    - variant objects from spec.json
 * @param {Array}  generated   - absolute paths to all .svg files
 * @param {string} logoDir     - project-relative path, e.g. "outputs/logos/gerak"
 */
export function generatePreviewHTML(brand, variants, generated, logoDir) {
  const files       = generated.map(f => basename(f));
  const accentColor = variants[0]?.colors?.accent ?? "#f59e0b";

  // Read SVG source — embedded in JS map so copy works on file://
  const svgMap = {};
  for (const f of generated) {
    svgMap[basename(f)] = readFileSync(f, "utf-8");
  }
  const svgMapJSON = JSON.stringify(svgMap);

  const hasRefined = files.some(f => /-v\d+\.svg$/.test(f));

  const sections = [
    {
      id:       "icons",
      title:    "Icon Marks",
      subtitle: "Square · Rounded · Circle — three icon concepts × three containers",
      files:    files.filter(f => f.includes("-icon-") && !/-v\d+\.svg$/.test(f)),
      imgClass: "card-icon",
    },
    {
      id:       "wordmarks",
      title:    "Wordmarks",
      subtitle: "Bold split · Stacked with tagline",
      files:    files.filter(f => f.includes("-wordmark-") && !/-v\d+\.svg$/.test(f)),
      imgClass: "card-wide",
    },
    {
      id:       "lockups",
      title:    "Lockups",
      subtitle: "Horizontal · Vertical — icon + name combined",
      files:    files.filter(f => f.includes("-lockup-") && !/-v\d+\.svg$/.test(f)),
      imgClass: "card-wide",
    },
    {
      id:       "emblem",
      title:    "Emblem",
      subtitle: "Circular seal — one per brand",
      files:    files.filter(f => f.includes("-emblem") && !/-v\d+\.svg$/.test(f)),
      imgClass: "card-icon",
    },
    {
      id:       "refined",
      title:    "Refined",
      subtitle: "Versioned refinements",
      files:    files.filter(f => /-v\d+\.svg$/.test(f)),
      imgClass: "card-icon",
    },
  ];

  function label(filename) {
    return filename.replace(/^[^-]+-/, "").replace(/\.svg$/, "").replace(/-/g, " ");
  }

  function variantTag(filename) {
    const parts = filename.replace(/\.svg$/, "").split("-");
    return parts.length > 1 ? `<span class="badge">${parts[1]}</span>` : "";
  }

  const cards = (section) => section.files.map(f => `
        <figure class="card ${section.imgClass}" data-file="${f}">
          <div class="card-inner">
            <img src="${f}" alt="${f}" loading="lazy" />
            <button class="copy-btn" data-file="${f}" title="Copy SVG source">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
              <span class="copy-label">Copy</span>
            </button>
          </div>
          <figcaption>${variantTag(f)}<span class="card-label">${label(f)}</span></figcaption>
        </figure>`).join("\n");

  const sectionHTML = sections
    .filter(s => s.files.length > 0)
    .map(s => `
      <section id="${s.id}">
        <div class="section-header">
          <h2>${s.title}</h2>
          <p class="section-sub">${s.subtitle}</p>
        </div>
        <div class="grid grid-${s.id}">
          ${cards(s)}
        </div>
      </section>`).join("\n");

  const half = Math.ceil(brand.name.length / 2);

  return `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${brand.name} — Logo Preview</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=IBM+Plex+Mono:wght@300;400;500&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root, [data-theme="dark"] {
      --bg:        #090909;
      --bg-card:   #111113;
      --bg-hover:  #18181b;
      --border:    #1f1f22;
      --accent:    ${accentColor};
      --text:      #e8e8ea;
      --muted:     #5a5a65;
      --label:     #9898a8;
      --copy-bg:   rgba(0,0,0,0.75);
      --copy-text: #e8e8ea;
    }

    [data-theme="light"] {
      --bg:        #f5f5f7;
      --bg-card:   #ffffff;
      --bg-hover:  #f0f0f3;
      --border:    #e0e0e6;
      --accent:    ${accentColor};
      --text:      #0f0f12;
      --muted:     #8a8a9a;
      --label:     #5a5a6a;
      --copy-bg:   rgba(255,255,255,0.9);
      --copy-text: #0f0f12;
    }

    html { background: var(--bg); color: var(--text); font-family: 'IBM Plex Mono', monospace; transition: background 0.25s, color 0.25s; }
    body { min-height: 100vh; padding: 0 0 120px; }

    .hero { padding: 72px 60px 52px; border-bottom: 1px solid var(--border); display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; flex-wrap: wrap; }
    .hero-name { font-family: 'Syne', sans-serif; font-size: clamp(44px, 6vw, 80px); font-weight: 800; line-height: 1; letter-spacing: -0.03em; color: var(--text); }
    .hero-name span { color: var(--accent); }
    .hero-tagline { font-size: 12px; color: var(--muted); letter-spacing: 0.1em; margin-top: 10px; text-transform: uppercase; }
    .hero-meta { font-size: 11px; color: var(--muted); letter-spacing: 0.1em; text-transform: uppercase; line-height: 2; }
    .hero-meta strong { color: var(--label); font-weight: 500; }

    .nav { display: flex; align-items: center; gap: 2px; padding: 0 60px; border-bottom: 1px solid var(--border); position: sticky; top: 0; background: var(--bg); z-index: 10; transition: background 0.25s; }
    .nav-links { display: flex; flex: 1; }
    .nav a { font-family: 'IBM Plex Mono', monospace; font-size: 11px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; text-decoration: none; color: var(--muted); padding: 14px 16px; border-bottom: 2px solid transparent; transition: color 0.2s, border-color 0.2s; }
    .nav a:hover { color: var(--text); border-bottom-color: var(--accent); }

    .theme-toggle { display: flex; align-items: center; gap: 8px; margin-left: auto; cursor: pointer; background: none; border: 1px solid var(--border); border-radius: 20px; padding: 5px 12px 5px 8px; color: var(--muted); font-family: 'IBM Plex Mono', monospace; font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; transition: color 0.2s, border-color 0.2s; }
    .theme-toggle:hover { color: var(--text); border-color: color-mix(in srgb, var(--accent) 50%, transparent); }
    .theme-toggle svg { flex-shrink: 0; }
    .icon-sun  { display: none; }
    .icon-moon { display: block; }
    [data-theme="light"] .icon-sun  { display: block; }
    [data-theme="light"] .icon-moon { display: none; }

    section { padding: 64px 60px 0; }
    .section-header { margin-bottom: 32px; display: flex; align-items: baseline; gap: 20px; flex-wrap: wrap; }
    .section-header h2 { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 700; color: var(--text); letter-spacing: -0.01em; }
    .section-sub { font-size: 11px; color: var(--muted); letter-spacing: 0.06em; }

    .grid { display: grid; gap: 12px; }
    .grid-icons, .grid-emblem, .grid-refined { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); }
    .grid-wordmarks, .grid-lockups { grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); }

    .card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 8px; overflow: hidden; transition: border-color 0.2s, transform 0.2s, background 0.25s, box-shadow 0.2s; position: relative; cursor: pointer; }
    .card:hover { border-color: color-mix(in srgb, var(--accent) 40%, transparent); transform: translateY(-2px); background: var(--bg-hover); }
    .card.selected { border-color: var(--accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 20%, transparent); transform: translateY(-2px); }

    .card-inner { display: flex; align-items: center; justify-content: center; padding: 28px 20px; position: relative; }
    .card-icon .card-inner { padding: 24px; }
    .card-wide .card-inner { padding: 24px 28px; }
    .card img { display: block; max-width: 100%; height: auto; }
    .card-icon img { width: 96px; height: 96px; }
    .card-wide img { width: 100%; max-width: 280px; height: auto; }

    .copy-btn { position: absolute; top: 8px; right: 8px; display: flex; align-items: center; gap: 5px; background: var(--copy-bg); color: var(--copy-text); border: 1px solid var(--border); border-radius: 5px; padding: 5px 9px; font-family: 'IBM Plex Mono', monospace; font-size: 10px; letter-spacing: 0.05em; cursor: pointer; opacity: 0; transform: translateY(-3px); transition: opacity 0.15s, transform 0.15s, border-color 0.15s, color 0.15s; backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px); z-index: 2; }
    .card:hover .copy-btn { opacity: 1; transform: translateY(0); }
    .copy-btn:hover { border-color: var(--accent); color: var(--accent); }
    .copy-btn.copied { border-color: #22c55e; color: #22c55e; }

    figcaption { display: flex; align-items: center; gap: 8px; padding: 8px 14px 12px; border-top: 1px solid var(--border); }
    .badge { font-family: 'IBM Plex Mono', monospace; font-size: 9px; font-weight: 500; letter-spacing: 0.1em; color: var(--accent); background: color-mix(in srgb, var(--accent) 12%, transparent); border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent); border-radius: 3px; padding: 2px 6px; text-transform: uppercase; flex-shrink: 0; }
    .card-label { font-family: 'IBM Plex Mono', monospace; font-size: 10px; color: var(--muted); letter-spacing: 0.04em; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

    footer { margin-top: 80px; padding: 24px 60px; border-top: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
    footer p { font-size: 10px; color: var(--muted); letter-spacing: 0.06em; }
    footer strong { color: var(--accent); }

    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: var(--muted); }

    /* ── TOAST ── */
    .toast { position: fixed; top: 72px; left: 50%; transform: translateX(-50%) translateY(-8px); background: var(--text); color: var(--bg); font-family: 'IBM Plex Mono', monospace; font-size: 11px; padding: 8px 18px; border-radius: 20px; opacity: 0; transition: opacity 0.2s, transform 0.2s; pointer-events: none; z-index: 40; white-space: nowrap; }
    .toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }

    /* ── REFINE PANEL ── */
    .refine-panel { position: fixed; bottom: 0; left: 0; right: 0; background: var(--bg-card); border-top: 1px solid var(--border); padding: 14px 60px 18px; display: flex; align-items: center; gap: 14px; transform: translateY(100%); transition: transform 0.25s cubic-bezier(0.4,0,0.2,1); z-index: 20; flex-wrap: wrap; }
    .refine-panel.visible { transform: translateY(0); }
    .refine-file { font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: var(--accent); letter-spacing: 0.04em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 220px; flex-shrink: 0; }
    .refine-input-group { display: flex; align-items: center; gap: 8px; flex: 1; min-width: 260px; }
    .refine-input { flex: 1; background: var(--bg); border: 1px solid var(--border); border-radius: 6px; padding: 8px 12px; color: var(--text); font-family: 'IBM Plex Mono', monospace; font-size: 12px; outline: none; transition: border-color 0.2s; }
    .refine-input:focus { border-color: var(--accent); }
    .refine-input::placeholder { color: var(--muted); }
    .refine-btn { background: var(--accent); color: #000; border: none; border-radius: 6px; padding: 8px 16px; font-family: 'IBM Plex Mono', monospace; font-size: 11px; font-weight: 600; letter-spacing: 0.06em; cursor: pointer; transition: opacity 0.2s; white-space: nowrap; }
    .refine-btn:hover { opacity: 0.85; }
    .refine-close { background: none; border: 1px solid var(--border); border-radius: 6px; padding: 7px 10px; color: var(--muted); font-size: 16px; line-height: 1; cursor: pointer; transition: color 0.2s, border-color 0.2s; }
    .refine-close:hover { color: var(--text); border-color: var(--muted); }
    .refine-fallback { display: none; width: 100%; background: var(--bg); border: 1px solid var(--border); border-radius: 6px; padding: 8px 12px; color: var(--text); font-family: 'IBM Plex Mono', monospace; font-size: 11px; resize: none; height: 52px; margin-top: 4px; }
    .refine-fallback.visible { display: block; }
  </style>
</head>
<body>

  <div class="toast" id="toast"></div>

  <header class="hero">
    <div>
      <div class="hero-name">${brand.name.slice(0, half)}<span>${brand.name.slice(half)}</span></div>
      ${brand.tagline ? `<p class="hero-tagline">${brand.tagline}</p>` : ""}
    </div>
    <div class="hero-meta">
      <div><strong>Variants</strong> &nbsp;${variants.length}</div>
      <div><strong>Files</strong> &nbsp;${generated.length} SVG</div>
      <div><strong>Generated</strong> &nbsp;${new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</div>
    </div>
  </header>

  <nav class="nav">
    <div class="nav-links">
      <a href="#icons">Icons</a>
      <a href="#wordmarks">Wordmarks</a>
      <a href="#lockups">Lockups</a>
      <a href="#emblem">Emblem</a>
      ${hasRefined ? '<a href="#refined">Refined</a>' : ''}
    </div>
    <button class="theme-toggle" id="themeToggle" aria-label="Toggle theme">
      <svg class="icon-moon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      <svg class="icon-sun" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
      <span id="themeLabel">Light</span>
    </button>
  </nav>

  <main>
    ${sectionHTML}
  </main>

  <footer>
    <p><strong>${brand.name}</strong> brand assets — ${generated.length} files</p>
    <p>Generated by henshyn-ai · open <code>index.html</code> in any browser</p>
  </footer>

  <div class="refine-panel" id="refinePanel">
    <span class="refine-file" id="refineFile"></span>
    <div class="refine-input-group">
      <input type="text" class="refine-input" id="refineInput" placeholder="Describe your refinement…" />
      <button class="refine-btn" id="refineBtn">Refine</button>
      <button class="refine-close" id="refineClose" title="Deselect">×</button>
    </div>
    <textarea class="refine-fallback" id="refineFallback" readonly></textarea>
  </div>

  <script>
    const SVG_MAP  = ${svgMapJSON};
    const LOGO_DIR = "${logoDir}";

    // ── TOAST ──
    function showToast(msg, duration) {
      duration = duration || 2500;
      const t = document.getElementById("toast");
      t.textContent = msg;
      t.classList.add("show");
      setTimeout(() => t.classList.remove("show"), duration);
    }

    // ── COPY SVG ──
    document.addEventListener("click", async (e) => {
      const btn = e.target.closest(".copy-btn");
      if (!btn) return;
      e.stopPropagation();
      const file = btn.dataset.file;
      const src  = SVG_MAP[file];
      if (!src) return;
      try {
        await navigator.clipboard.writeText(src);
        const lbl = btn.querySelector(".copy-label");
        const prev = lbl.textContent;
        btn.classList.add("copied");
        lbl.textContent = "Copied!";
        setTimeout(() => { btn.classList.remove("copied"); lbl.textContent = prev; }, 1800);
      } catch (err) {
        console.error("Copy failed:", err);
      }
    });

    // ── THEME TOGGLE ──
    const htmlEl = document.documentElement;
    const themeBtn = document.getElementById("themeToggle");
    const themeLbl = document.getElementById("themeLabel");
    const saved = localStorage.getItem("theme") || "dark";
    htmlEl.dataset.theme = saved;
    themeLbl.textContent = saved === "dark" ? "Light" : "Dark";
    themeBtn.addEventListener("click", () => {
      const next = htmlEl.dataset.theme === "dark" ? "light" : "dark";
      htmlEl.dataset.theme = next;
      themeLbl.textContent = next === "dark" ? "Light" : "Dark";
      localStorage.setItem("theme", next);
    });

    // ── SELECTION + REFINE PANEL ──
    let selectedCard = null;

    function deselect() {
      if (selectedCard) selectedCard.classList.remove("selected");
      selectedCard = null;
      document.getElementById("refinePanel").classList.remove("visible");
      document.getElementById("refineFallback").classList.remove("visible");
    }

    document.addEventListener("click", (e) => {
      if (e.target.closest(".copy-btn")) return;
      const card = e.target.closest(".card");
      if (!card) { deselect(); return; }
      if (card === selectedCard) { deselect(); return; }
      if (selectedCard) selectedCard.classList.remove("selected");
      selectedCard = card;
      card.classList.add("selected");
      document.getElementById("refineFile").textContent = card.dataset.file;
      document.getElementById("refineInput").value = "";
      document.getElementById("refineFallback").classList.remove("visible");
      document.getElementById("refinePanel").classList.add("visible");
      document.getElementById("refineInput").focus();
    });

    document.getElementById("refineClose").addEventListener("click", deselect);

    document.getElementById("refineInput").addEventListener("keydown", (e) => {
      if (e.key === "Enter") document.getElementById("refineBtn").click();
    });

    document.getElementById("refineBtn").addEventListener("click", async () => {
      if (!selectedCard) return;
      const file = selectedCard.dataset.file;
      const prompt = document.getElementById("refineInput").value.trim();
      if (!prompt) { document.getElementById("refineInput").focus(); return; }
      // Escape for bash double-quoted string (project shell per CLAUDE.md is bash)
      const escaped = prompt.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
      const command = 'node scripts/refine-logo.mjs "' + LOGO_DIR + '/' + file + '" "' + escaped + '"';
      document.getElementById("refineFallback").classList.remove("visible");
      document.getElementById("refineInput").value = "";
      try {
        await navigator.clipboard.writeText(command);
        showToast("Command copied — paste in terminal, then refresh");
      } catch {
        const ta = document.getElementById("refineFallback");
        ta.value = command;
        ta.classList.add("visible");
        ta.focus();
        ta.select();
      }
    });
  </script>

</body>
</html>`;
}
