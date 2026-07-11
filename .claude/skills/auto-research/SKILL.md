---
name: auto-research
description: Trigger on "auto research", "optimize metric", "run experiments", "karpathy method", "improvement loop".
disable-model-invocation: true
---

# Auto Research (Karpathy Method)

Needs three things, each measurable in <60s:

1. **Metric** — e.g. Lighthouse score, `next build` output bundle size, LCP, build time.
2. **Change method** — edit one thing (component, config, image, font strategy).
3. **Assessment** — how to read the score back (build output, `next build --profile`, Lighthouse CLI).

## Setup

`mkdir -p ./active/auto-research` and keep a log of experiment → delta.

## Loop (default 20 iterations)

```
1. Hypothesize ONE small change that could move the metric.
2. Apply it (one isolated change).
3. git add -A && git commit -m "experiment: <desc>"
4. Measure the metric.
5. Better -> keep + log. Worse -> git revert HEAD --no-edit + log.
6. Never repeat a logged failure.
7. Every 5 iterations -> review patterns, adjust strategy.
```

## Status every 5 iterations

```
AUTO RESEARCH — <metric>
Baseline: <start>  Current: <now>  Change: <%>
Kept: <n>  Reverted: <n>  Total: <n>
Top improvements: <list>
```
