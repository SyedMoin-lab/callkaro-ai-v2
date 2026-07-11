---
name: research
description: Trigger on "research", "investigate", "compare", "find best", "evaluate", "fan out", "consensus", "debate this".
---

# Research — Three Modes

## Mode 1: Fan-out / fan-in (default — "research X", "find best X")

Spawn 3–5 parallel agents, each on a different angle → synthesize.

## Mode 2: Stochastic consensus ("best approach", "decide between")

5 agents, same question, different perspectives → count votes → consensus + outliers.

## Mode 3: Debate ("analyze deeply", "nuanced take")

3 agents, multi-round; each sees the others' answers → converge → synthesize.

## Output (all modes)

```
RECOMMENDATION: <pick> (confidence: high/medium/low)
WHY: <2-3 sentences>
TRADE-OFFS: <what you give up>
ALTERNATIVES: <ranked>
CODE EXAMPLE: <minimal, matches this repo's stack: Next 16 RSC, React 19, TW v4>
GOTCHAS: <non-obvious>
```

Fan-out on cheaper models; synthesize on the strongest. Keep under 500 words.
