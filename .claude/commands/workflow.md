---
description: Run a named multi-step workflow that chains agents in sequence
---

# Command: /workflow

## Description
Run a multi-step workflow that chains multiple agents in sequence. Each workflow is defined in `workflows/`.

## Execution Steps
1. Extract the workflow name from the command argument: `/workflow {name}`
2. Load `workflows/{name}.md`
3. Execute the workflow steps in sequence as defined in that file
4. Pass output of each step as input to the next

## Sub-argument Routing
`/workflow {name}` → `workflows/{name}.md`

If no matching file exists, respond:
"No workflow found for '{name}'. Available workflows: [list .md files in workflows/ directory]"

## Output Format
Defined per workflow file.

## Auto-save
Defined per workflow file.
