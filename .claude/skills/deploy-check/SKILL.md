---
name: deploy-check
description: Trigger on "deploy", "push to prod", "ship", "release", "go live", "push this". THE single quality gate — runs ALL checks including a fresh-eyes code review before pushing. Package manager is pnpm.
disable-model-invocation: true
---

# Deploy — The Single Quality Gate

Zero overhead while coding. Everything runs here, once, before code leaves the machine.
This project uses **pnpm**. There is **no test framework** — the test step is skipped, not failed.

## Stage 1: Automated checks (fast). STOP at the first failure.

1. `pnpm format` — Prettier writes all changed files.
2. `pnpm typecheck` — `tsc --noEmit`, zero errors.
3. `pnpm lint` — ESLint, zero errors.
4. `pnpm build` — `next build` succeeds (this is the real gate for an RSC/Next app; it type-checks and compiles every route).
5. Tests — none configured. Skip (note it in the report).
6. Debug-leftover scan (flag, don't block):
   `git diff --cached -U0 | grep -nE '^\+.*(console\.log|debugger)' | grep -v node_modules`
   (`console.error` in `src/lib/*` content loaders is expected — ignore.)
7. No env file staged (BLOCK if found):
   `git diff --cached --name-only | grep -E '(^|/)\.env($|\.)'`

If ANY of 1–4 or 7 fail → list ALL failures, do NOT proceed. Fix first.

## Stage 2: Fresh-eyes code review (only if Stage 1 passed)

Run the built-in review of the working diff, or spawn the `code-reviewer` agent:
"Use the code-reviewer agent to review the changes on this branch."

- CRITICAL issue → list it, do NOT push. Fix first.
- MAJOR only → list it, ask: "Push with known issues, or fix first?"
- Clean → proceed.

## Stage 3: Secret scan on changed files only

`git diff --cached --name-only | xargs grep -nEi 'password|secret|api_key|sk-|sk_live|Bearer ' 2>/dev/null | grep -v node_modules`
Any real secret in a changed file → BLOCK. (Tailwind `mask-*` classes and prose like "trade secrets" are false positives — ignore.)

## Stage 4: Ship

```
git add -A
git commit -m "<imperative summary of the change>"
git push origin HEAD
```

Report: "Shipped. <one line>. Passed: format, types, lint, build, review, secret scan. (No tests configured.)"

## When to use

- Small confident fix → `git add -A && git commit -m "…" && git push` directly.
- End of a feature / multiple files / before a PR or merge to main → `/deploy-check`.
