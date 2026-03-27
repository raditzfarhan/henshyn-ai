---
description: Deep research on any topic — web search, synthesis, and recommendations
---

# Command: /scan

## Description
Deep research on any topic using web search and synthesis. Default: web-enabled. Use `--offline` for knowledge-only mode.

## Agent
`scanner` → load from `agents/scanner.md`

## Skills
`deep-scan` → load from `skills/deep-scan.md`

## Tools
- `WebSearch` — run targeted searches (default mode)
- `WebFetch` — read full source content (default mode)
- Both disabled in `--offline` mode

## Execution Steps
1. Read the research question
2. Check for `--offline` flag
3. Apply `deep-scan` skill:
   - Default: decompose → search → fetch → cross-reference → synthesize → flag gaps
   - Offline: skip search/fetch steps, note "⚠️ Offline mode" at top
4. Apply `scanner` agent output structure

## Output Format
- Research Question
- Sources (omitted in offline mode)
- Findings
- Contradictions & Gaps
- Summary
- Recommendations

## Auto-save
- `outputs/research/YYYY-MM-DD-{topic-slug}.md` — full output
- Sources automatically appended via `PostToolUse(WebFetch/WebSearch)` hook
