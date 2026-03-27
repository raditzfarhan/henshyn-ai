# Command: /research

## Description
Deep research on any topic using web search and synthesis. Default: web-enabled. Use `--offline` for knowledge-only mode.

## Agent
`researcher` → load from `agents/researcher.md`

## Skills
`research-deep-dive` → load from `skills/research-deep-dive.md`

## Tools
- `WebSearch` — run targeted searches (default mode)
- `WebFetch` — read full source content (default mode)
- Both disabled in `--offline` mode

## Execution Steps
1. Read the research question
2. Check for `--offline` flag
3. Apply `research-deep-dive` skill:
   - Default: decompose → search → fetch → cross-reference → synthesize → flag gaps
   - Offline: skip search/fetch steps, note "⚠️ Offline mode" at top
4. Apply `researcher` agent output structure

## Output Format
Follow researcher agent output structure:
- Research Question
- Sources (omitted in offline mode)
- Findings
- Contradictions & Gaps
- Summary
- Recommendations

## Auto-save
- `outputs/research/YYYY-MM-DD-{topic-slug}.md` — full output
- Sources automatically appended via `PostToolUse(WebFetch/WebSearch)` hook
