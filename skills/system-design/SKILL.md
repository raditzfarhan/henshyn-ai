---
name: system-design
description: Use when translating product requirements into a concrete technical architecture — with components, data flow, stack rationale, and bottleneck analysis.
---

# System Design

## Overview
Translate product requirements into a concrete technical architecture. "Use a database" is not a recommendation — "Use PostgreSQL because X" is.

## Process
1. **List requirements** — functional (what it does) and non-functional (scale, speed, reliability).
2. **Define components** — what are the main building blocks? Each has one job.
3. **Map data flow** — walk through the primary user action step by step. Where does data go?
4. **Identify bottlenecks** — what will break first? What's the hard engineering problem?
5. **Recommend stack** — pick specific tools with explicit rationale.
6. **Diagrams** — for every diagram, output two consecutive blocks: an untagged ASCII art block first (for plain-text readability), then a ` ```mermaid ` block with the equivalent diagram. Use `graph TD` for architecture flows, `sequenceDiagram` for data flows, `flowchart LR` for horizontal pipelines.

## Output Format
Follow the dev-architect agent output structure exactly.
