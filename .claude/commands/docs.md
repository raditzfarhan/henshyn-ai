---
description: Generate documentation for a feature, API, system, or workflow
---

# Command: /docs

## Description
Generate documentation for a feature, API, system, or workflow.

## Agent
`dev-architect` → load from `agents/dev-architect.md`

## Execution Steps
1. Read what needs documenting and the target audience (developer? end user? API consumer?)
2. Identify the documentation type: API reference / user guide / architecture doc / README / runbook
3. Generate the appropriate structure and content
4. Use code blocks for examples, tables for reference data

## Output Format
Varies by documentation type. Always includes:
- Title and one-line description
- Prerequisites / requirements (if any)
- Main content (structured by type)
- Examples

## Auto-save
- `outputs/docs/YYYY-MM-DD-{subject-slug}.md` — full output
