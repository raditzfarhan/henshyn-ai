# Skill: Generate Logo

## Purpose
Generate polished SVG logos from brand identity data. Derives a spec from the brand name, tagline, and positioning, then invokes `scripts/generate-logo.mjs` to write SVG files.

## When to Use
- After `/name` when user confirms logo generation
- When user runs `/logo [name]`
- When user says "generate logos for [project]"

## Process

### 1. Gather brand data
Read from the most recent name output file (`outputs/ideas/*-names.md`) or from context:
- **Name** — the chosen brand name
- **Slug** — lowercase, hyphens for spaces (e.g. "tagifly", "cloud-sync")
- **Tagline** — the chosen tagline
- **Positioning** — one sentence on what the brand is and who it's for
- **Personality** — 3–5 adjectives from the brand rationale

### 2. Derive 3 style variants
Apply the color psychology guide to produce 3 variants. Each variant needs:

```json
{
  "id": "minimal|bold|expressive",
  "label": "Human-readable name (e.g. Tag Wing)",
  "style": "minimal|bold|expressive",
  "rationale": "One sentence: visual metaphor and brand connection",
  "icon_concept": "tag-wing|paper-plane|t-mark",
  "colors": {
    "background": "#HEX",
    "background_end": "#HEX",
    "primary": "#ffffff",
    "accent": "#HEX"
  },
  "container": "square|rounded|circle",
  "typography": {
    "weight_name": 700,
    "weight_tagline": 400,
    "case": "lowercase|uppercase",
    "letter_spacing": 0
  }
}
```

**Variant derivation rules:**
- Variant 1 (`minimal`): navy gradient + blue accent, rounded container, lowercase, weight 800
- Variant 2 (`bold`): deep dark gradient + strong accent, square container, uppercase, weight 900, letter-spacing 3
- Variant 3 (`expressive`): single dark tone + accent reflects brand personality, rounded container, lowercase

**Color psychology reference:**

| Color | Brand signal | When to use |
|---|---|---|
| Navy `#0F172A–#1E3A5F` | Trust, stability, professionalism | Fintech, B2B, professional services |
| Blue `#1d4ed8–#3B82F6` | Technology, clarity, reliability | Tech products, SaaS, digital tools |
| Emerald `#059669–#064e3b` | Growth, success, paid/confirmed | Finance, wellness, sustainability |
| Amber `#D97706–#78350F` | Energy, warmth, urgency | Consumer, food, alerts, reminders |
| Indigo `#4f46e5–#1e1b4b` | Innovation, sophistication | Premium, creative tech, AI |
| Crimson `#e11d48–#881337` | Urgency, action, passion | Alerts, entertainment, sports |

**Icon concept selection:**
- `tag-wing` — product deals with invoicing, billing, pricing, or tagging
- `paper-plane` — product deals with sending, delivery, messaging, or speed
- `t-mark` — letterform works for the brand, or when neither concept above fits

### 3. Write the spec JSON
Write to `outputs/logos/.spec.json`:

```json
{
  "brand": {
    "name": "[Name]",
    "slug": "[slug]",
    "tagline": "[Tagline]",
    "positioning": "[one sentence]",
    "personality": ["[adj1]", "[adj2]", "[adj3]"]
  },
  "variants": [ /* 3 variant objects */ ],
  "custom_styles": []
}
```

### 4. Run the script
```bash
node scripts/generate-logo.mjs outputs/logos/.spec.json
```

### 5. Report output
Tell the user:
- How many SVG files were generated
- Output path: `outputs/logos/{slug}/`
- File types generated: icons (3 concepts × 3 shapes), wordmarks (bold, stacked), lockups (horizontal, vertical), emblem

### 6. Offer custom styles
After confirming output:
> "Want more variations with custom style directions? Describe the mood, colors, or style you want and I'll generate an additional set."

If yes — append new variant(s) to `custom_styles` in the spec and re-run:
- Each new variant in `custom_styles` uses the same JSON structure as `variants`
- New files are added alongside the originals (no overwrite)

## SVG Design Principles
All generated logos satisfy:
1. **Simple** — readable at 100px minimum
2. **Memorable** — each variant has a distinct visual concept
3. **Timeless** — subtle gradients only, no trendy effects that date quickly
4. **Versatile** — lockups work on light backgrounds; icons work on dark
5. **Appropriate** — colors and metaphors directly reflect brand positioning

## Output Location
`outputs/logos/{slug}/` — all SVG files, named `{slug}-{concept}-{layout}.svg`
