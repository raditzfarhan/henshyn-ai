---
description: Stress-test an idea — find fatal flaws, get a proceed/pivot/kill verdict
---

# Command: /validate

## Description
Stress-test an existing idea to find fatal flaws and get a clear proceed/pivot/kill verdict.

## Agent
`wish-analyst` → load from `agents/wish-analyst.md`

## Skills
`validate-idea` → load from `skills/validate-idea.md`

## Execution Steps
1. Read the user's idea or description
2. Apply `validate-idea` skill: target user → problem clarity → market → kill risks → verdict
3. Apply `wish-analyst` agent output structure

## Output Format
Follow wish-analyst agent output structure. Emphasis on Risks and Verdict sections.

## Auto-save
- `outputs/ideas/YYYY-MM-DD-{idea-slug}-validation.md` — full output
