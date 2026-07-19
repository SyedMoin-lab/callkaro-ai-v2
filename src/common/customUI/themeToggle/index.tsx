"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

import { cn } from "@/lib/utils"

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={cn(
        "grid size-10 place-items-center rounded-lg text-foreground transition-colors hover:bg-foreground/5",
        className
      )}
    >
      {/* resolvedTheme is only known on the client — the icon settles after
          hydration, so suppress the expected first-paint mismatch. */}
      <Sun
        suppressHydrationWarning
        className={cn("hidden size-5", isDark && "block")}
        strokeWidth={1.75}
      />
      <Moon
        suppressHydrationWarning
        className={cn("size-5", isDark && "hidden")}
        strokeWidth={1.75}
      />
    </button>
  )
}
