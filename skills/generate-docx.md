# Skill: Generate Docx

## Purpose
Convert any output `.md` file in this project to a styled `.docx` file on demand.

## When to Use
When the user asks to:
- "convert [X] to docx"
- "generate a Word file for [X]"
- "make a .docx of [X]"
- "export [X] as a document"

## Process

### 1. Identify the source file
- If the user provides an explicit path, use it directly.
- If the user describes the file (e.g., "the waterproof proposal", "last sprint plan"):
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
- The `.docx` is saved next to the source `.md` (same folder, same base name)
- Type-specific templates are applied automatically:
  - `outputs/proposals/` → `scripts/templates/proposal.mjs` (branded: title page, dark navy/blue)
  - All other types → `scripts/templates/universal.mjs` (neutral style)
- To add a new template for a new output type, create `scripts/templates/{type}.mjs` exporting `build(content, meta)`
  - `content: string` — raw markdown text of the source `.md` file
  - `meta: { title: string, date: string }` — extracted from file content and filename
