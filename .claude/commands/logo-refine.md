# Command: /logo-refine

## Description
Refine a single SVG logo with a natural language prompt. Saves the result as a versioned file alongside the original — never overwrites.

## Usage
```
/logo-refine "<svg-path>" "<prompt>"
```

**Examples:**
- `/logo-refine "outputs/logos/gerak/gerak-minimal-icon-rounded.svg" "make the background deeper navy"`
- `/logo-refine "outputs/logos/gerak/gerak-bold-icon-circle.svg" "increase the icon size and add a subtle glow"`

## Execution Steps

1. **Parse args** — extract `svgPath` (first quoted arg) and `prompt` (second quoted arg). If either is missing, ask the user to provide both.

2. **Read the source SVG** — read the file at `svgPath`. If it doesn't exist, report the error and stop.

3. **Determine version number**:
   - Strip any `-vN` suffix from the filename base (e.g. `gerak-minimal-icon-rounded-v2.svg` → base = `gerak-minimal-icon-rounded`)
   - Scan the directory for files matching `{base}-v*.svg`
   - Next version N = highest existing version + 1, or 2 if none exist

4. **Modify the SVG** — apply the refinement prompt to the SVG source. Produce only valid SVG XML. The output must start with `<svg` and end with `</svg>`. Preserve the `viewBox`, `role="img"`, and `<title>` attributes. Only change what the prompt asks for.

5. **Write versioned file** — save the refined SVG as `{dir}/{base}-v{N}.svg` using the Write tool.

6. **Regenerate preview**:
   ```bash
   node scripts/regen-preview.mjs <dir>
   ```

7. **Report** — confirm: new file path, what changed, and "Refresh `index.html` to see it in the Refined section."

## Notes
- Never overwrite the original file
- If the user refines a versioned file (e.g. v2), the output is v3 — not v2-v2
- The prompt is treated as a design instruction, not code — translate it into SVG changes
