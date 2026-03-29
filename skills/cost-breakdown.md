# Skill: Cost Breakdown

## Purpose
Generate a detailed, client-ready cost breakdown for a software project — covering development, setup, and ongoing operational costs.

## Process
1. **Identify project type** — custom build for a client, or SaaS product? This determines cost structure.
2. **Estimate development hours per phase** — use the proposal timeline as the source. If no proposal exists, estimate from scope.
3. **Suggest or apply a rate** — if the user has a rate, use it. If not, suggest a market-appropriate rate based on stack and region.
4. **Calculate development cost** — hours × rate per phase, then total. Recommend a fixed project price rounded to a clean number.
5. **List one-time setup costs** — domain, server config, third-party account setup, SSL, etc.
6. **List monthly operational costs** — hosting, email, APIs, storage, domain amortised. Separate fixed from variable.
7. **List optional add-ons** — maintenance retainer, feature additions, annual management.

## Output Format
Follow this structure exactly:

### Development Cost
Table: Phase | Scope | Est. Hours | Rate | Cost
Subtotal + recommended fixed project price with note.

### One-Time Setup Costs
Table: Item | Cost
Total.

### Monthly Operational Costs
Table: Service | Provider | Monthly Cost
Fixed monthly total.
Variable costs (e.g. payment gateway %) listed separately.

### Full Cost Summary
Table: Category | Cost
Four rows: Development (one-time), Setup (one-time), Monthly running, Variable fees.

### Optional Add-ons
Table: Add-on | Est. Cost

## Notes
- Always separate fixed from variable costs — clients get confused when they're mixed
- Payment gateway fees are always variable — show as % with a worked example
- Suggest a maintenance retainer as an optional line item, not a hard requirement
- Round fixed project price to a clean number for client presentation
