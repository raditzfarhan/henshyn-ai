---
name: generate-logo
description: Use when generating SVG logo variations for a brand — after the name and positioning are defined and the user wants visual identity assets.
---

# Generate Logo

## Overview
Generate polished SVG logos from brand identity data. Derives a spec from the brand name, tagline, and positioning, then invokes `scripts/generate-logo.mjs` to write SVG files across 3 style variants.

## Process

### 1. Gather brand data
Read from the most recent name output file (`outputs/ideas/*-names.md`) or from context:
- **Name**, **Slug** (lowercase, hyphens), **Tagline**, **Positioning**, **Personality** (3–5 adjectives)

### 2. Derive 3 style variants

| Variant | Background | Container | Case | Weight |
|---|---|---|---|---|
| `minimal` | Navy gradient + blue accent | Rounded | Lowercase | 800 |
| `bold` | Deep dark gradient + strong accent | Square | Uppercase | 900 + letter-spacing 3 |
| `expressive` | Single dark tone + brand accent | Rounded | Lowercase | 700 |

**Color psychology:**

| Color | Signal | Use for |
|---|---|---|
| Navy `#0F172A–#1E3A5F` | Trust, stability | Fintech, B2B, professional |
| Blue `#1d4ed8–#3B82F6` | Technology, clarity | SaaS, digital tools |
| Emerald `#059669–#064e3b` | Growth, success | Finance, wellness |
| Amber `#D97706–#78350F` | Energy, urgency | Consumer, food |
| Indigo `#4f46e5–#1e1b4b` | Innovation, premium | AI, creative tech |
| Crimson `#e11d48–#881337` | Action, passion | Alerts, entertainment |

**Icon concept selection:**
- `tag-wing` — invoicing, billing, pricing, or tagging
- `paper-plane` — sending, delivery, messaging, or speed
- `t-mark` — letterform works for the brand, or neither concept fits

### 3. Write the spec JSON
Write to `outputs/logos/.spec.json`:
```json
{
  "brand": { "name": "", "slug": "", "tagline": "", "positioning": "", "personality": [] },
  "variants": [],
  "custom_styles": []
}
```

### 4. Run the script
```bash
node scripts/generate-logo.mjs outputs/logos/.spec.json
```

### 5. Report output
- How many SVGs generated
- Output path: `outputs/logos/{slug}/`
- Types: icons (3 concepts × 3 shapes), wordmarks, lockups, emblem

### 6. Offer custom styles
After confirming: "Want more variations with custom style directions?"
If yes — append new variant(s) to `custom_styles` and re-run. New files added alongside originals (no overwrite).

## SVG Design Principles
Simple (readable at 100px) · Memorable (distinct per variant) · Timeless (subtle gradients only) · Versatile (lockups on light, icons on dark) · Appropriate (colors reflect brand positioning)
