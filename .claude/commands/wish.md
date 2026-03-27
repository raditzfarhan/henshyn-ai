---
description: Explore and develop a rough idea into something worth evaluating
---

# Command: /wish

## Description
Explore and expand a new idea. Takes a rough concept and develops it into something worth evaluating.

## Agent
`wish-analyst` → load from `agents/wish-analyst.md`

## Skills
`imagine` → load from `skills/imagine.md`

## Execution Steps
1. Read the user's input (the idea, however rough)
2. Apply `imagine` skill: reframe the problem 3 ways, generate 10 raw ideas, cluster, pick top 3
3. Apply `wish-analyst` agent: analyze the top idea through Problem / Solution / Opportunity / Risks / Verdict
4. Display full output

## Output Format
- Problem
- Solution
- Opportunity
- Risks
- Verdict

## Auto-save
- `outputs/ideas/YYYY-MM-DD-{idea-slug}.md` — full output
- `memory/ideas-log.md` — append: `[YYYY-MM-DD] {Idea Title} — {Verdict}`
