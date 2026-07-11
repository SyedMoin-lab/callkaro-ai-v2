#!/usr/bin/env node
// PreToolUse guard: blocks a small set of clearly-destructive shell commands.
// Cross-platform (reads the modern hook stdin JSON, not $TOOL_INPUT) so it works
// on Windows PowerShell and on bash. Exit 2 => Claude Code blocks the tool call.
// Errs toward allowing: only unambiguous, hard-to-undo patterns are blocked.

let raw = ""
process.stdin.setEncoding("utf8")
process.stdin.on("data", (c) => (raw += c))
process.stdin.on("end", () => {
  let cmd = ""
  try {
    cmd = JSON.parse(raw)?.tool_input?.command ?? ""
  } catch {
    process.exit(0) // can't parse -> don't get in the way
  }

  const DANGER = [
    // rm -rf targeting a filesystem root, home, bare dot, glob, or drive root
    /\brm\s+(?:-\S+\s+)*-?[a-z]*[rf]{2}[a-z]*\s+(?:-\S+\s+)*(?:\/|~|\.|\*|[A-Za-z]:\\?)(?:\s|$)/i,
    // PowerShell recursive+forced delete of a root/home
    /\bRemove-Item\b[^\n]*-Recurse[^\n]*-Force[^\n]*(?:\s(?:\/|~|\*|[A-Za-z]:\\?))(?:\s|$)/i,
    // force-push
    /\bgit\s+push\b[^\n]*(?:--force\b|(?<!\S)-f\b)/i,
    // dropping a database/table
    /\bDROP\s+(?:TABLE|DATABASE)\b/i,
  ]

  const hit = DANGER.find((re) => re.test(cmd))
  if (hit) {
    console.error(
      `BLOCKED: command matches a destructive pattern (${hit}). ` +
        `If this is intentional, run it yourself outside Claude Code.`
    )
    process.exit(2)
  }
  process.exit(0)
})
