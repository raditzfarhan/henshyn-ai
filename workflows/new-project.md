# Workflow: new-project

## Description
Full pipeline from raw idea to validated proposal and system design. Chains 4 agents in sequence. Output of each step feeds the next.

## Trigger
`/workflow new-project {idea description}`

## Steps

### Step 1: Validate the Idea
**Agent:** `idea-analyst` + `validate-idea` skill
**Input:** Raw idea from user
**Process:** Run `/validate` flow
**Output:** Verdict + risk analysis
**Continue if:** Verdict is Proceed or Pivot. Stop if Kill (ask user to refine first).

### Step 2: Write the Proposal
**Agent:** `proposal-writer` + `write-proposal` skill
**Input:** Validated idea + verdict from Step 1
**Process:** Run `/proposal` flow
**Output:** Full structured proposal

### Step 3: Design the Architecture
**Agent:** `dev-architect` + `system-design` skill
**Input:** Proposal from Step 2
**Process:** Run `/arch` flow
**Output:** System architecture + stack recommendation

### Step 4: Review Everything
**Agent:** `reviewer`
**Input:** All outputs from Steps 1–3 combined
**Process:** Run `/review` flow on the full bundle
**Output:** Strengths / Issues / Suggestions / Score

## Auto-save
- Each step's output saved to its respective `outputs/` folder
- Final bundle summary saved to `outputs/proposals/YYYY-MM-DD-{project-slug}-full.md`
- `memory/decisions-log.md` — append: `[YYYY-MM-DD] New Project: {name} — Score: {X}/10`
