# Command: /standup

## Description
Generate a standup summary: what was done, what's next, and any blockers. Reads from recent memory and session context.

## Agent
`mission-control` → load from `agents/mission-control.md`

## Skills
None.

## Tools
- `Read` — reads memory/session-log.md and memory/conversations/index.md for recent activity

## Execution Steps
1. Read `memory/session-log.md` for recent commands and outputs
2. Read `memory/conversations/index.md` for recent session topics
3. Synthesize into standup format
4. If nothing in memory yet, ask: "What did you work on? What's next?"

## Output Format
**Yesterday / Last Session:**
- [what was done]

**Today / Next:**
- [what's planned]

**Blockers:**
- [any blockers, or "None"]

## Auto-save
- `outputs/standups/YYYY-MM-DD-standup.md` — full output
- `memory/session-log.md` — append standup entry
