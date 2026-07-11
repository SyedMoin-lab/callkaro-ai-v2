---
name: refactor-scan
description: Trigger on "tech debt", "refactor", "clean up", "code smells", "what needs fixing", "improve quality".
---

# Refactor Scan (Next.js / React / TS)

Read-only. Rank findings by impact; only surface what's worth fixing.

1. Type escape hatches: `grep -rnE ':\s*any\b|as any|@ts-(ignore|expect-error)' src/`
2. Large files (split candidates): `find src -name '*.tsx' -o -name '*.ts' | xargs wc -l | sort -rn | head -15`
3. `"use client"` on components that don't need interactivity (should stay server components).
4. `async` server components missing error/empty handling around `fs`/MDX reads.
5. Data fetched in a client component that a server component could pass down.
6. Duplicated section/layout markup that's been copied 3+ times (extract on the 3rd).
7. Dead code / unused exports / unused deps (e.g. stray lockfiles, packages replaceable by <20 lines).
8. Over-engineering: single-use abstractions, indirection with one caller, patterns without a trigger.

Output ≤10 items:
`1. [HIGH] <what> — <files> — effort: quick/medium/large`
