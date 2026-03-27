# Skill: Research Deep Dive

## Purpose
Answer complex questions by finding, reading, and synthesizing real information from the web.

## Process
1. **Decompose the query** — break the main question into 3–5 specific sub-questions that can each be searched.
2. **Run targeted searches** — 3–5 searches, each with a specific search query. Avoid broad queries.
3. **Fetch top sources** — for each search, read the most relevant 1–2 results in full.
4. **Cross-reference** — do sources agree? Where do they conflict? What's missing?
5. **Synthesize** — write findings per sub-question, then a unified summary.
6. **Flag gaps** — what couldn't be found? What would need primary research?

## Output Format
Follow the researcher agent output structure exactly. Always include the Sources section.

## Offline Mode
When called with `--offline` flag: skip steps 2–3. Reason from training knowledge only. Note at top: "⚠️ Offline mode — no web sources consulted."
