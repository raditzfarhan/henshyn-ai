---
name: generate-docx
description: Use when converting a markdown output file to a styled .docx Word document — triggered by requests like "convert to docx", "make a Word file", or "export as document".
---

# Generate Docx

## Overview
Convert any output `.md` file in this project to a styled `.docx` file using `scripts/generate-docx.mjs`. The script auto-detects the output type and applies the correct template.

## Process

### 0. Check dependencies
```bash
ls node_modules/docx 2>/dev/null || echo "NOT INSTALLED"
```
If not installed, stop: "The `docx` package is not installed. Run `npm install` first."

### 1. Identify the source file
- If the user provides an explicit path, use it directly.
- If the user describes the file (e.g. "the waterproof proposal", "last sprint plan"):
  - Run: `ls -t outputs/**/*.md` to list all output files sorted by recency
  - Match on filename keywords from the user's description
  - If multiple matches exist, pick the most recent

### 2. Run the script
```bash
node scripts/generate-docx.mjs <file-path>
```

### 3. Report back
Tell the user the exact path of the generated `.docx` file.

## Notes
- `.docx` is saved next to the source `.md` (same folder, same base name)
- Mermaid blocks (` ```mermaid `) render to PNG via Kroki.io and embed as images — requires internet
- Untagged blocks (` ``` `) are skipped — assumed to be ASCII art
- Tagged blocks (` ```php `, ` ```js `, etc.) render as styled monospace
- Templates applied automatically: `outputs/proposals/` → `proposal.mjs`; all others → `universal.mjs`
- To add a new template: create `scripts/templates/{type}.mjs` exporting `build(content, meta)`
