# Command: /learn

## Description
Explicitly teach the assistant something. Stores it in memory/learnings.md and applies immediately.

## Agent
None — runs directly.

## Skills
None.

## Tools
- `Write` / `Edit` — appends to memory/learnings.md

## Execution Steps
1. Read the instruction: `/learn I prefer Tailwind over Bootstrap`
2. Parse into category and content:
   - "I prefer X" → category: `preference`
   - "X is wrong / actually Y" → category: `correction`
   - "In this domain, X means Y" → category: `domain-knowledge`
   - "Always do X when Y" → category: `pattern`
3. Append to `memory/learnings.md`: `[YYYY-MM-DD] {category}: {content}`
4. Respond: "Got it. I've noted that: [{category}] {content}"
5. Apply the learning immediately in the current session

## Output Format
Inline confirmation only.

## Auto-save
- `memory/learnings.md` — append new learning entry
