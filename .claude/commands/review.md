---
description: Critique any input — idea, plan, code, or writing — with a score
---

# Command: /review

## Description
Critique any input — idea, proposal, plan, code, writing — for gaps, quality, and improvements.

## Agent
`reviewer` → load from `agents/reviewer.md`

## Execution Steps
1. Read what the user has provided for review
2. Apply `reviewer` agent: strengths → issues → suggestions → score
3. Display output inline

## Output Format
- Strengths
- Issues (ranked by severity)
- Suggestions
- Score /10

## Auto-save
None. Inline terminal output only.
