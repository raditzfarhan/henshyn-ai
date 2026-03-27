# Command: /debug

## Description
Reasoning-based debugging assistant. Helps identify the root cause of a bug or unexpected behavior.

## Agent
`dev-architect` → load from `agents/dev-architect.md`

## Skills
None.

## Tools
None.

## Execution Steps
1. Read the bug description, error message, and any relevant code or context provided
2. Ask clarifying questions if critical information is missing (one question at a time)
3. Hypothesize: list the 3 most likely root causes, ranked by probability
4. For each hypothesis: describe what evidence would confirm or rule it out
5. Give a recommended debugging path: what to check first, second, third
6. If the fix is obvious from the information given, provide it

## Output Format
- Bug Summary (one sentence)
- Hypotheses (ranked list with evidence needed per hypothesis)
- Recommended Debug Path (ordered steps)
- Fix (if determinable from available info)

## Auto-save
None. Inline terminal output only.
