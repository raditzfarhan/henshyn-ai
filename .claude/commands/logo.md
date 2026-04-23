---
description: Generate SVG logo variations for a brand name
---

# Command: /logo

## Description
Generate polished SVG logos on demand for any project name or brand.

## Skill
`generate-logo` → load from `skills/generate-logo/SKILL.md`

## Execution Steps
1. If an argument is provided (e.g. `/logo myapp`), use it as the brand name
2. If no argument, check context for a recently chosen brand name (from `/name` output or conversation)
3. If still unclear, ask: "Which project are you generating logos for?"
4. Apply `generate-logo` skill: gather brand data → derive 3 variants → write spec → run script → report

## Auto-save
Output files are saved automatically by the script to `outputs/logos/{slug}/`
