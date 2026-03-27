---
description: Write a structured project proposal with goals, scope, stack, and timeline
---

# Command: /proposal

## Description
Write a structured project proposal for an idea or feature.

## Agent
`proposal-writer` → load from `agents/proposal-writer.md`

## Skills
`write-proposal` → load from `skills/write-proposal.md`

## Execution Steps
1. Read the user's project description or reference a previous idea output
2. Apply `write-proposal` skill: goal → scope → stakeholders → stack → phases
3. Apply `proposal-writer` agent output structure

## Output Format
- Executive Summary
- Goals
- Scope (in/out)
- Tech Stack
- Timeline
- Success Metrics

## Auto-save
- `outputs/proposals/YYYY-MM-DD-{project-slug}.md` — full output
- `memory/decisions-log.md` — append: `[YYYY-MM-DD] Proposal: {Title} — {one-line summary}`
