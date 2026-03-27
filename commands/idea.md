# Command: /idea

## Description
Explore and expand a new idea. Takes a rough concept and develops it into something worth evaluating.

## Agent
`idea-analyst` → load from `agents/idea-analyst.md`

## Skills
`brainstorm` → load from `skills/brainstorm.md`

## Tools
None.

## Execution Steps
1. Read the user's input (the idea, however rough)
2. Apply `brainstorm` skill: reframe the problem 3 ways, generate 10 raw ideas, cluster, pick top 3
3. Apply `idea-analyst` agent: analyze the top idea through Problem / Solution / Opportunity / Risks / Verdict
4. Display full output

## Output Format
Follow idea-analyst agent output structure:
- Problem
- Solution
- Opportunity
- Risks
- Verdict

## Auto-save
- `outputs/ideas/YYYY-MM-DD-{idea-slug}.md` — full output
- `memory/ideas-log.md` — append: `[YYYY-MM-DD] {Idea Title} — {Verdict}`
