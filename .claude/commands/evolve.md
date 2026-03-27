---
description: Review accumulated learnings and upgrade agent/skill files to match
---

# Command: /evolve

## Description
Claude reviews its own skills and agents against accumulated learnings and proposes targeted improvements. Writes approved changes directly to the relevant files.

## Agent
`reviewer` → load from `agents/reviewer.md`

## Tools
- `Read` — read memory/learnings.md and all files in agents/ and skills/
- `Edit` — write approved changes to agent or skill files

## Execution Steps
1. Read `memory/learnings.md`
2. Read all files in `agents/` and `skills/`
3. Apply `reviewer` agent to identify improvements:
   - Does any learning conflict with current agent/skill behavior?
   - Are any steps outdated given learned preferences?
   - Are any patterns missing from skill processes?
4. Present proposed changes as a numbered list:
   "I've identified {N} potential upgrades:
   1. Update `skills/naming.md` step 2 — add 'made-up compound words' direction (learned: user prefers invented names)
   2. Update `agents/dev-architect.md` stack defaults — lead with Laravel not Rails (learned: user preference)
   [etc.]
   Shall I apply all, some, or none? (reply with 'all', 'none', or list the numbers)"
5. On approval: use `Edit` to write each approved change to the relevant file
6. Log each applied upgrade to `memory/learnings.md`: `[YYYY-MM-DD] upgrade: Updated {file} — {reason}`
7. Confirm: "Applied {N} upgrades. Your assistant has been updated."

## Output Format
- Upgrade proposals (numbered list)
- Confirmation of what was applied

## Auto-save
- Updates to relevant `agents/` or `skills/` files
- `memory/learnings.md` — append upgrade log entries
