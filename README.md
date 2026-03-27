# henshyn-ai

A filesystem-based multi-agent AI operating system for Claude CLI. No backend, no framework — just structured Markdown files that Claude reads to behave like a team of specialized agents.

---

## Quick Start

```bash
# 1. Clone
git clone https://github.com/yourusername/henshyn-ai.git
cd henshyn-ai

# 2. Open in Claude CLI
claude

# 3. Initialize your assistant
/init
```

That's it. `/init` will ask you a few questions and set everything up.

---

## Commands

| Command | What it does |
|---|---|
| `/init` | First-time setup — name your assistant, pick a personality, set your stack |
| `/idea` | Explore and expand a new idea |
| `/validate` | Stress-test an idea — get a proceed/pivot/kill verdict |
| `/proposal` | Write a structured project proposal |
| `/arch` | Design a system architecture |
| `/name` | Generate product or feature names |
| `/review` | Critique any idea, plan, or proposal |
| `/task` | Break a feature into sized, prioritized dev tasks |
| `/stack` | Get a tech stack recommendation |
| `/research` | Deep research on any topic (web-enabled by default) |
| `/sprint` | Plan a focused week of work |
| `/debug` | Reasoning-based debugging assistant |
| `/docs` | Generate documentation |
| `/standup` | Summarize what's done and what's next |
| `/recall` | Search past conversations by topic or date |
| `/learn` | Explicitly teach the assistant something |
| `/upgrade` | Let the assistant upgrade itself based on what it's learned |
| `/workflow new-project` | Full pipeline: validate → propose → design → review |
| `/workflow build-mvp` | Scope → tasks → estimate → refine |

---

## Personalities

Choose during `/init`. Change anytime by editing `memory/preferences.md`.

| Name | Vibe |
|---|---|
| `strategist` | Direct, decisive, cuts to what matters |
| `coach` | Encouraging, asks good questions |
| `hacker` | Technical, opinionated, efficiency-obsessed |
| `advisor` | Professional, thorough, considers all angles |
| `creative` | Exploratory, lateral thinking, unexpected angles |
| `spark` | Playful, witty, makes work feel fun |

---

## How Memory Works

The assistant remembers across sessions automatically.

- **`memory/preferences.md`** — your name, assistant name, personality, tech stack
- **`memory/business-context.md`** — your domain, goals, project types
- **`memory/learnings.md`** — everything the assistant has learned about how you work
- **`memory/conversations/`** — one file per session, auto-written at the end of every conversation
- **`memory/ideas-log.md`** — running log of all ideas and their verdicts
- **`memory/decisions-log.md`** — running log of proposals and architecture decisions

Use `/recall` to search past conversations. Use `/learn` to teach it something explicitly. Use `/upgrade` to let it improve itself.

---

## How to Extend

**Add a new command:**
Drop a file in `commands/`. Name it after the command. It will automatically be available as `/yourcommand`.

**Add a new agent:**
Drop a file in `agents/`. Follow the structure in any existing agent file. Reference it from a command file.

**Add a new skill:**
Drop a file in `skills/`. Follow the structure in any existing skill file. Reference it from a command file.

**Add a new workflow:**
Drop a file in `workflows/`. Reference it via `/workflow yourworkflow`.

**Add a new personality:**
Drop a file in `personalities/`. Set it in `memory/preferences.md` as `personality: yourpersonality`.

---

## Forking This

1. Fork the repo
2. Run `/init` to set up your own identity and preferences
3. Edit `memory/business-context.md` with your domain and goals
4. Start using commands — the assistant will learn your preferences over time

The `memory/` folder is yours. Everything else is the system.

---

## Outputs

All command outputs are saved to `outputs/` organized by type:

```
outputs/
  ideas/          ← /idea, /validate, /name
  proposals/      ← /proposal, /workflow new-project
  architectures/  ← /arch, /stack
  tasks/          ← /task, /workflow build-mvp
  research/       ← /research
  sprints/        ← /sprint
  docs/           ← /docs
  standups/       ← /standup
```

---

## Self-Learning & Growth

The assistant grows alongside you:

- **Passive learning** — every correction and preference you share is captured in `memory/learnings.md` automatically
- **Active learning** — use `/learn` to teach it something explicitly
- **Self-upgrade** — use `/upgrade` to let it review and improve its own skills and agents based on what it's learned

The longer you use it, the more tailored it becomes.
