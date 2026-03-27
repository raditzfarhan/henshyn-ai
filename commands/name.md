# Command: /name

## Description
Generate name options for a product, feature, or project.

## Agent
`branding-agent` → load from `agents/branding-agent.md`

## Skills
`naming` → load from `skills/naming.md`

## Tools
None.

## Execution Steps
1. Read what needs naming and any context (tone, audience, existing brand)
2. Apply `naming` skill: core concept → 15 raw candidates → filter → top 5
3. Apply `branding-agent` output structure

## Output Format
Follow branding-agent output structure:
- Core Concept
- 5 Name Options (each with type, rationale, domain check, tagline)
- Recommendation

## Auto-save
- `outputs/ideas/YYYY-MM-DD-{context}-names.md` — full output
