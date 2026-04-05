# Changelog

All notable changes to henshyn-ai are documented here.

Format: [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)

---

## [1.1.0] — 2026-04-05

### Added
- `/logo` command — on-demand SVG logo generation for any brand
- `generate-logo` skill — derives brand spec (colors, icon concept, typography) and invokes script
- `scripts/generate-logo.mjs` — generates 22 SVG files per run: icons (3 concepts × 3 shapes), wordmarks (bold, stacked), lockups (horizontal, vertical), emblem
- Logo prompt after `/name` — asks to generate logos after user picks a name
- Color psychology guide in skill — maps colors to brand signals (fintech, wellness, energy, etc.)
- 3 icon concepts: Tag Wing, Invoice in Flight, T Lettermark with velocity arcs
- SVG best practices: viewBox scalability, namespaced gradient IDs, semantic groups, `role="img"` accessibility

---

## [1.0.0] — 2026-04-05

### Core System
- Multi-agent assistant system built entirely on structured Markdown files — no backend, no framework
- Command routing via `.claude/commands/` — any `/command` maps to a file, instantly available
- Three-layer execution: Command → Agent (output structure) → Skill (reasoning process) + Rider (tone overlay)
- Memory system: `preferences.md`, `business-context.md`, `learnings.md`, `conversations/`, `ideas-log.md`, `decisions-log.md`
- Self-learning: passive absorption of corrections, preferences, domain knowledge into `memory/learnings.md`
- Claude Code hooks: PostToolUse(Write) session logging, Stop hook conversation summaries
- Session log with HH:MM timestamps

### Riders (Personalities)
- 7 Kamen Rider personality overlays: `kabuto`, `w`, `fourze`, `den-o`, `zero-one`, `ex-aid`, `geats`
- Each rider has a Transformation Announcement, tone rules, language patterns, and example response style
- Personality shapes energy only — never changes output structure

### Commands
- `/henshin` — first-time setup: name your assistant, choose your rider, set your stack
- `/wish` — explore and expand a new idea
- `/validate` — stress-test an idea, get proceed/pivot/kill verdict
- `/proposal` — structured project proposal with full cost breakdown
- `/arch` — system architecture design
- `/name` — product and feature name generation
- `/review` — critique any idea, plan, code, or writing
- `/mission` — break a feature into sized, prioritized dev tasks
- `/form` — tech stack recommendation
- `/scan` — deep research on any topic (web-enabled)
- `/sprint` — plan a focused week of work
- `/debug` — reasoning-based debugging assistant
- `/docs` — generate documentation
- `/standup` — session summary: done, next, blockers
- `/recall` — search past conversations by topic or date
- `/learn` — explicitly teach the assistant something
- `/evolve` — assistant reviews its own files and proposes upgrades
- `/workflow new-project` — full pipeline: validate → propose → design → review
- `/workflow build-mvp` — scope → tasks → estimate → refine

### Skills
- `imagine` — idea exploration and expansion
- `validate-idea` — proceed/pivot/kill framework
- `write-proposal` — structured proposal with phases and stakeholders
- `cost-breakdown` — development cost, setup, operational, and add-on pricing
- `system-design` — component-based architecture with bottleneck analysis
- `naming` — portmanteau blends, positioning, tagline generation
- `mission-breakdown` — feature decomposition into sized tasks
- `sprint-planning` — weekly work planning from backlog
- `deep-scan` — multi-source research and synthesis
- `generate-docx` — on-demand Markdown to `.docx` export

### Docx Export Pipeline
- On-demand `.docx` export — "convert X to docx" triggers the `generate-docx` skill
- Single entry point: `scripts/generate-docx.mjs` with automatic type detection from output path
- Template system: `scripts/templates/` — type-specific or universal fallback
- `proposal.mjs` — branded template: dark navy/blue palette, title page, styled tables
- `universal.mjs` — neutral fallback for any output type
- `shared.mjs` — shared inline parser, block builders, markdown parser
- Three-way code block routing:
  - ` ```mermaid ` → rendered as PNG via Kroki.io, embedded as image
  - ` ```<lang> ` → styled monospace code block (Courier New, grey background)
  - ` ``` ` (untagged) → skipped (assumed ASCII art diagram)
- Mermaid diagram rendering via Kroki.io API — no Puppeteer/Chromium required
- Graceful fallback on render failure — placeholder paragraph, no export abort
- `npm install` optional — only required for docx export feature
