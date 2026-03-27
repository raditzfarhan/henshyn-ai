---
description: Plan a focused week of work from your active backlog
---

# Command: /sprint

## Description
Plan a focused week of work from the active backlog of ideas and tasks.

## Agent
`mission-control` → load from `agents/mission-control.md`

## Skills
`sprint-planning` → load from `skills/sprint-planning.md`

## Tools
- `TodoWrite` — load the sprint plan into the active task list
- `Read` — read memory/ideas-log.md, memory/decisions-log.md, recent task outputs

## Execution Steps
1. Read `memory/ideas-log.md` and `memory/decisions-log.md` for active context
2. Read any recent `outputs/tasks/` files for existing task lists
3. Apply `sprint-planning` skill: pull active work → filter by priority → fit into hours → daily focus → done criteria
4. Apply `mission-control` output structure with Sprint Goal at top
5. Ask: "Want me to load this sprint into your task list?"
6. If yes: use `TodoWrite`

## Output Format
- Sprint Goal (one sentence)
- Then mission-control output structure

## Auto-save
- `outputs/sprints/YYYY-MM-DD-sprint.md` — full output
- `memory/session-log.md` — append sprint goal + task count
