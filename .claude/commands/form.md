---
description: Get a tech stack recommendation for your project type and constraints
---

# Command: /form

## Description
Get a tech stack recommendation for a given problem, project type, or set of constraints.

## Agent
`dev-architect` → load from `agents/dev-architect.md`

## Skills
`system-design` → load from `skills/system-design.md`

## Execution Steps
1. Read the project type, constraints, and requirements
2. Also read `memory/preferences.md` for known stack preferences
3. Apply `system-design` skill focused on stack selection
4. Apply `dev-architect` output structure, emphasizing Stack Rationale section
5. Present 2 options if trade-offs are meaningful, otherwise give one clear recommendation

## Output Format
- Requirements (derived from input)
- Stack Recommendation (table: layer / choice / why)
- Trade-offs (when presenting 2 options)
- Next Steps

## Auto-save
- `outputs/architectures/YYYY-MM-DD-{project-slug}-stack.md` — full output
