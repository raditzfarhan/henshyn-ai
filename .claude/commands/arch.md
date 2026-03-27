---
description: Design the technical architecture for a system or feature
---

# Command: /arch

## Description
Design the technical architecture for a system or feature.

## Agent
`dev-architect` → load from `agents/dev-architect.md`

## Skills
`system-design` → load from `skills/system-design.md`

## Execution Steps
1. Read the user's system description or feature requirements
2. Apply `system-design` skill: requirements → components → data flow → bottlenecks → stack
3. Apply `dev-architect` agent output structure

## Output Format
- Architecture
- Components
- Data Flow
- Stack Rationale
- Bottlenecks & Risks
- Next Steps

## Auto-save
- `outputs/architectures/YYYY-MM-DD-{system-slug}.md` — full output
- `memory/decisions-log.md` — append: `[YYYY-MM-DD] Architecture: {System Name} — Stack: {stack}`
