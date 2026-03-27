# Command: /task

## Description
Break a feature or project into prioritized, sized development tasks with acceptance criteria.

## Agent
`task-manager` → load from `agents/task-manager.md`

## Skills
`task-breakdown` → load from `skills/task-breakdown.md`

## Tools
- `TodoWrite` — load approved tasks into the active todo list

## Execution Steps
1. Read the feature or project description
2. Apply `task-breakdown` skill: epics → tasks (1-4h each) → acceptance criteria → dependencies → priorities
3. Apply `task-manager` agent output structure
4. After displaying, ask: "Want me to load these into your active task list?"
5. If yes: use `TodoWrite` to add each task

## Output Format
Follow task-manager agent output structure:
- Epics
- Tasks (with size, priority, acceptance criteria, dependencies)
- Dependencies Map
- Recommended Order

## Auto-save
- `outputs/tasks/YYYY-MM-DD-{feature-slug}.md` — full output
