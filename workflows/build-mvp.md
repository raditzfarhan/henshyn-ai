# Workflow: build-mvp

## Description
Takes a defined project or feature and produces a ruthlessly scoped MVP task list ready to build.

## Trigger
`/workflow build-mvp {project or feature description}`

## Steps

### Step 1: Define MVP Scope
**Agent:** `dev-architect` + `system-design` skill
**Input:** Project or feature description
**Process:** Define the minimum viable version — what is the smallest thing that delivers core value? Cut everything else.
**Output:** MVP scope definition (2–3 sentences + explicit out-of-scope list)

### Step 2: Break Into Tasks
**Agent:** `dev-architect` + `task-breakdown` skill
**Input:** MVP scope from Step 1
**Process:** Decompose into epics and 1–4h tasks with acceptance criteria
**Output:** Full task list with dependencies

### Step 3: Estimate and Schedule
**Agent:** `task-manager` + `sprint-planning` skill
**Input:** Task list from Step 2
**Process:** Estimate total effort, suggest build order, identify parallel work
**Output:** Estimated timeline + recommended build sequence

### Step 4: Refine the Task List
**Agent:** `reviewer`
**Input:** All outputs from Steps 1–3
**Process:** Cut anything that's not truly MVP. Flag hidden complexity.
**Output:** Final refined task list

## Auto-save
- `outputs/tasks/YYYY-MM-DD-{project-slug}-mvp.md` — final task list
- Load into `TodoWrite` automatically after Step 4
- `memory/decisions-log.md` — append: `[YYYY-MM-DD] MVP: {name} — {N} tasks`
