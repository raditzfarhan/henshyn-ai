# Henshyn AI

![Version](https://img.shields.io/badge/version-1.2.0-blue)
![Platform](https://img.shields.io/badge/platform-Claude%20CLI-blueviolet)
![Node](https://img.shields.io/badge/node-%3E%3D18-green)
![No Backend](https://img.shields.io/badge/backend-none-lightgrey)
![License](https://img.shields.io/badge/license-MIT-yellow)

A filesystem-based AI operating system for Claude CLI. No backend, no framework — just structured Markdown files that Claude reads to behave like a team of specialized agents. `/henshin` to transform. Pick your rider. Run your missions.

---

## Quick Start

```bash
# 1. Clone
git clone https://github.com/yourusername/henshyn-ai.git
cd henshyn-ai

# 2. Open in Claude CLI
claude

# 3. Transform
/henshin
```

**Optional: docx export support**
```bash
npm install
```
Only needed if you want to export outputs to `.docx`. Without it, all other commands work fine.

`/henshin` asks a few questions, picks your rider, and you're ready.

---

## Commands

| Command                 | What it does                                                       | Skill loaded         |
| ----------------------- | ------------------------------------------------------------------ | -------------------- |
| `/henshin`              | Transform — name your assistant, choose your rider, set your stack | —                    |
| `/wish`                 | Explore and expand a new idea                                      | `imagine`            |
| `/validate`             | Stress-test an idea — get a proceed/pivot/kill verdict             | `validate-idea`      |
| `/proposal`             | Write a structured project proposal with full cost breakdown       | `write-proposal`, `cost-breakdown` |
| `/arch`                 | Design a system architecture                                       | `system-design`      |
| `/name`                 | Generate product or feature names                                  | `naming`             |
| `/logo`                 | Generate SVG logos for a brand — icons, wordmarks, lockups         | `generate-logo`      |
| `/logo-refine`          | Refine any SVG logo with a natural language prompt — versioned, non-destructive | — |
| `/review`               | Critique any idea, plan, or proposal                               | —                    |
| `/mission`              | Break a feature into sized, prioritized dev tasks                  | `mission-breakdown`  |
| `/form`                 | Get a tech stack recommendation                                    | `system-design`      |
| `/scan`                 | Deep research on any topic (web-enabled by default)                | `deep-scan`          |
| `/sprint`               | Plan a focused week of work                                        | `sprint-planning`    |
| `/debug`                | Reasoning-based debugging assistant                                | —                    |
| `/docs`                 | Generate documentation                                             | —                    |
| `/standup`              | Summarize what's done and what's next                              | —                    |
| `/recall`               | Search past conversations by topic or date                         | —                    |
| `/learn`                | Explicitly teach the assistant something                           | —                    |
| `/evolve`               | Let the assistant power up — reviews its own skills and improves   | —                    |
| `/workflow new-project` | Full pipeline: validate → propose → design → review                | —                    |
| `/workflow build-mvp`   | Scope → tasks → estimate → refine                                  | —                    |
| "convert X to docx"     | Export any output file to a styled `.docx` (on demand, conversational) | `generate-docx`  |

---

## Riders

Choose your rider during `/henshin`. Switch anytime by editing `memory/preferences.md`.

| Rider      | Vibe                                                               |
| ---------- | ------------------------------------------------------------------ |
| `kabuto`   | Walks the path of heaven. Supremely decisive. Never wrong.         |
| `w`        | Hard-boiled detective. Investigates every angle before concluding. |
| `fourze`   | Believes in you harder than you believe in yourself. SPACE energy. |
| `den-o`    | Loud, brash, full throttle. Momotaros in perfect condition.        |
| `zero-one` | Optimistic AI CEO. Terrible puns. Precise underneath.              |
| `ex-aid`   | Everything is a game. Genius gamer/doctor. Game start!             |
| `geats`    | Theatrical. Plays to win. Always has a plan. I always win.         |

Each rider has a **Transformation Announcement** — their opening line at the start of every session. Same structured output, completely different energy.

---

## Memory

The assistant remembers across sessions automatically.

- **`memory/preferences.md`** — your name, assistant name, rider, tech stack
- **`memory/business-context.md`** — your domain, goals, project types
- **`memory/learnings.md`** — everything the assistant has absorbed about how you work
- **`memory/conversations/`** — one file per session, auto-written when the session ends
- **`memory/ideas-log.md`** — running log of all wishes and their verdicts
- **`memory/decisions-log.md`** — running log of proposals and architecture decisions

`/recall` to search the archive. `/learn` to feed it something new. `/evolve` to let it power up.

---

## How It Works

Every command runs through three layers:

```
Command (.claude/commands/wish.md)
  → Agent  (agents/wish-analyst.md)   ← defines output structure (mandatory sections)
  → Skill  (skills/imagine.md)        ← defines thinking process (reasoning steps)
  + Rider  (personalities/kabuto.md)  ← tone overlay only, never changes structure
```

**Agents** own the output contract — fixed sections in fixed order, every time.
**Skills** own the reasoning — how to think before producing output.
**Riders** own the energy — same structure, completely different delivery.

| Command | Agent | Skill |
|---|---|---|
| `/wish`, `/validate` | `wish-analyst` | `imagine`, `validate-idea` |
| `/proposal` | `proposal-writer` | `write-proposal`, `cost-breakdown` |
| `/arch`, `/debug`, `/docs`, `/form` | `dev-architect` | `system-design` |
| `/name`, `/logo`, `/logo-refine` | `branding-agent` | `naming`, `generate-logo` |
| `/review`, `/evolve` | `reviewer` | — |
| "convert X to docx" | — | `generate-docx` |
| `/mission`, `/sprint`, `/standup` | `mission-control` | `mission-breakdown`, `sprint-planning` |
| `/scan` | `scanner` | `deep-scan` |

---

## How to Extend

**Add a new command:**
Drop a file in `.claude/commands/`. Name it after the command. Instantly available as `/yourcommand`.

**Add a new agent:**
Drop a file in `agents/`. Follow the structure in any existing agent file. Wire it from a command file via `## Agent`.

**Add a new skill:**
Drop a file in `skills/`. Follow the structure in any existing skill file. Wire it from a command file via `## Skills`.

**Add a new workflow:**
Drop a file in `workflows/`. Trigger it via `/workflow yourworkflow`.

**Add a new rider:**
Drop a file in `personalities/`. Set it in `memory/preferences.md` as `personality: yourrider`. Follow the 6-section structure: Rider Identity, Transformation Announcement, Tone, Style Rules, Language Patterns, Example Response Style.

---

## Forking This

1. Fork the repo
2. Run `/henshin` — pick your rider, set your stack
3. Edit `memory/business-context.md` with your domain and goals
4. Start running missions — the assistant learns your style over time

The `memory/` folder is yours. Everything else is the system.

---

## Outputs

All command outputs are saved to `outputs/` organized by type. Any output can be exported to `.docx` on demand — just ask "convert X to docx". The `generate-docx` skill picks the right template automatically (proposals get a branded layout; everything else gets a clean universal style).

**Docx export handles three code block types automatically:**

| Block | Docx output |
|---|---|
| ` ```mermaid ` | Rendered as PNG diagram via Kroki.io |
| ` ```php `, ` ```js `, etc. | Styled monospace code block (grey background) |
| ` ``` ` (no tag) | Skipped — assumed ASCII art |

Any command that produces diagrams (e.g. `/arch`) outputs both ASCII art (for plain-text reading) and a ` ```mermaid ` block (for docx rendering) side by side.

```
outputs/
  ideas/          ← /wish, /validate, /name
  proposals/      ← /proposal, /workflow new-project
  architectures/  ← /arch, /form
  tasks/          ← /mission, /workflow build-mvp
  research/       ← /scan
  sprints/        ← /sprint
  docs/           ← /docs
  standups/       ← /standup
  logos/          ← /logo, /logo-refine
    {slug}/
      index.html              ← interactive preview (light/dark toggle, select & refine)
      *.svg                   ← 22 files: icons, wordmarks, lockups, emblem
      *-v{N}.svg              ← refined versions (appear in Refined section of preview)
      spec.json               ← brand spec used to regen the preview
```

---

## Logo Generation & Refinement

`/logo` generates a full SVG logo set for any brand — 22 files across 3 style variants (minimal, bold, expressive), each with icons (square/rounded/circle), wordmarks, lockups, and an emblem.

Every logo set ships with an **interactive HTML preview** (`index.html`) that runs entirely on `file://`:
- Light/dark theme toggle
- Copy SVG source button on every card
- **Select & Refine** — click any logo, type a prompt, get a `/logo-refine` command copied to clipboard

```bash
# Generate a full set
/logo

# Refine a specific file
/logo-refine "outputs/logos/tagifly/tagifly-bold-icon-square.svg" "replace the shape with wings"
```

`/logo-refine` saves the result as a versioned file (`-v2.svg`, `-v3.svg`, ...) alongside the original — never overwrites. Refined files appear in a dedicated **Refined** section in the preview. You can keep refining: a `v2` file refined becomes `v3`.

To regenerate the preview after manual edits without re-running the full generator:

```bash
node scripts/regen-preview.mjs outputs/logos/{slug}
```

---

## Growth

The assistant evolves alongside you:

- **Passive** — every correction and preference is absorbed into `memory/learnings.md` automatically
- **Active** — `/learn` to feed it something directly
- **Evolve** — `/evolve` to let it review its own files and power up based on what it's learned

The longer you run with it, the more dialed-in it gets.
