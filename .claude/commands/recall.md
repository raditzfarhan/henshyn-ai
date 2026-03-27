---
description: Search past sessions by topic, keyword, or date
---

# Command: /recall

## Description
Search past conversations by topic, keyword, or date. Answers questions about previous sessions in context.

## Tools
- `Read` — reads memory/conversations/index.md and specific conversation files
- `Glob` — lists available conversation files if needed

## Execution Steps
1. Read the query: natural language (`/recall what did we discuss about pricing`) or date (`/recall 2026-03-27`)
2. Read `memory/conversations/index.md` to find matching sessions
3. For date queries: load `memory/conversations/{date}.md` directly
4. For topic queries: find sessions with matching topics in the index, load those files
5. Answer the query in context, quoting relevant decisions or outputs from the conversation files
6. If nothing found: "No conversation found matching '{query}'. Earliest session: {date from index}."

## Output Format
- Matched session(s): date + topic summary
- Relevant content: quoted from the conversation file
- Direct answer to the query

## Auto-save
None. Inline terminal output only.
