---
name: codebase-review
description: Trigger on "codebase review", "review codebase", "audit codebase", "full review", "code audit", "review everything", "check code quality". Full codebase audit with scores across 8 categories.
disable-model-invocation: true
---

# Codebase Review — Full Audit

Unlike /deploy (staged changes before push), this reviews the ENTIRE codebase.

## Stage 1: Codebase Overview

Count total source files and lines. Identify the 15 largest files by line count. Report: total files, total lines, top 5 largest files.

## Stage 2: Type Safety Audit

Search for type safety violations using grep with --include="*.ts" --include="*.tsx":
- Search for `: any` and `as any` (TypeScript) or equivalent type bypasses for the detected language
- Search for `@ts-ignore`, `@ts-expect-error` (TypeScript), `# type: ignore` (Python), or equivalent suppressions
- Count total violations. List each with file path and line number

Grading:
- A = 0 violations
- B = 1-5 violations
- C = 6-15 violations
- D = 16-30 violations
- F = 31+ violations

## Stage 3: Security Audit

Search across ALL source files (not just the primary language):
- Grep for: sk-, sk_live, sk_test, api_key, apiKey, API_KEY, secret, SECRET, password, PASSWORD, token (exclude node_modules, .git, .example files, markdown files, lock files)
- Check if .gitignore contains .env entries
- Check git history for accidentally committed .env files: git log --all --oneline -20 --diff-filter=A -- "*.env*"
- Check for SQL injection patterns: raw string concatenation in queries

Grading:
- A = 0 issues, .env in gitignore, no .env in git history
- B = 1-2 minor issues (e.g., a TODO mentioning a token name but no actual secret)
- C = 3-5 issues or .env not in gitignore
- D = hardcoded secrets found or .env committed in history
- F = active credentials exposed in source code

## Stage 4: Error Handling Audit

Search with --include="*.ts" --include="*.tsx":
- Empty catch blocks (catch followed immediately by closing brace)
- Async functions without try-catch or .catch()
- Read the top 3 largest async files (first 80 lines only) and check for unhandled async operations

Grading:
- A = all async operations handled, no empty catches
- B = 1-3 empty catches or minor gaps
- C = 4-10 gaps
- D = 11-20 gaps or critical paths unhandled
- F = widespread missing error handling

## Stage 5: Code Quality Scan

Search with --include="*.ts" --include="*.tsx" (exclude test files and node_modules):
- console.log, console.debug, debugger, print() in production code
- TODO, FIXME, HACK, XXX, TEMP, WORKAROUND comments
- Count each category separately

Grading:
- A = 0 debug logs, 0-2 TODOs
- B = 1-3 debug logs, 3-5 TODOs
- C = 4-10 debug logs or 6-15 TODOs
- D = 11-20 debug logs or 16+ TODOs
- F = 21+ debug logs

## Stage 6: Architecture Review

- Find all files over 300 lines (god files) using wc -l
- Find over-engineering indicators: files named Factory*, *Abstract*, *Base.*, *Interface.* (exclude .d.ts and type definition files)
- Check directory depth: files nested more than 5 levels deep

Grading:
- A = 0 god files, 0 unnecessary abstractions
- B = 1-2 god files or 1 abstraction pattern
- C = 3-5 god files or 2-3 abstraction patterns
- D = 6-10 god files or heavy abstraction layer
- F = 11+ god files or deeply nested architecture theater

## Stage 7: Dependency Health

- Run pnpm audit and capture output
- Count total dependencies from the manifest file
- Flag any critical or high severity vulnerabilities

Grading:
- A = 0 vulnerabilities, reasonable dep count (< 30 prod deps)
- B = 0 critical, 1-3 high, or 30-50 prod deps
- C = 1 critical or 4-10 high
- D = 2-5 critical or 11+ high
- F = 6+ critical vulnerabilities

## Stage 8: Testing Coverage

- Count source files (excluding tests, configs, type definitions)
- Count test files (.test.*, .spec.*, test_*)
- Calculate ratio: test files / source files
- Identify critical paths WITHOUT tests: grep for payment, auth, login, checkout, transaction, mutation keywords in source files, then check if matching test files exist

Grading:
- A = ratio > 0.8, all critical paths tested
- B = ratio 0.5-0.8 or 1-2 critical paths untested
- C = ratio 0.3-0.5 or 3-5 critical paths untested
- D = ratio 0.1-0.3 or most critical paths untested
- F = ratio < 0.1 or no tests at all

## Stage 9: Database Patterns (skip if no database detected)

Search with --include="*.ts" --include="*.tsx":
- Raw SQL via string concatenation (injection risk)
- MongoDB: .find() or .findOne() without .lean() on read paths
- N+1 patterns: await inside for/forEach/map loops with DB calls
- Missing index hints on frequently queried fields

Grading:
- A = no injection risk, optimized queries
- B = 1-2 minor optimization gaps
- C = 3-5 gaps or 1 potential injection
- D = multiple injection risks or severe N+1 patterns
- F = active SQL injection vulnerabilities

## Stage 10: Code Reviewer Agent

After all grep-based scans, spawn the code-reviewer agent:
"Use the code-reviewer agent to review the 5 most critical files identified in this audit. Focus on logic bugs, race conditions, and edge cases that grep cannot catch."

## FINAL REPORT

Output this exact format:

CODEBASE REVIEW — [project name]

Overview:
  Files: [n] | Lines: [n] | Largest: [file] ([n] lines)

CRITICAL (fix immediately):
  [list all CRITICAL issues — security vulns, hardcoded secrets, injection, data exposure]

HIGH (fix soon):
  [list HIGH — missing error handling, type safety gaps, untested critical paths]

MEDIUM (fix when touching):
  [list MEDIUM — debug logs, TODOs, minor code smells, optimization gaps]

LOW (nice to have):
  [list LOW — style, minor refactoring]

SCORES:
  Type Safety:      [A/B/C/D/F] — [n] any types, [n] suppressions
  Security:         [A/B/C/D/F] — [n] issues
  Error Handling:   [A/B/C/D/F] — [n] gaps
  Code Quality:     [A/B/C/D/F] — [n] debug logs, [n] TODOs
  Architecture:     [A/B/C/D/F] — [n] god files, [n] abstractions
  Dependencies:     [A/B/C/D/F] — [n] vulnerabilities
  Test Coverage:    [A/B/C/D/F] — ratio [n], [n] critical untested
  Database:         [A/B/C/D/F] — [n] issues (or N/A)

  OVERALL:          [average of all applicable scores]

TOP 5 PRIORITIES:
  1. [highest impact — file — effort: quick/medium/large]
  2. [second]
  3. [third]
  4. [fourth]
  5. [fifth]

AGENT FINDINGS:
  [code-reviewer agent output on critical files]
