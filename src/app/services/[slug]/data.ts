import type { LucideIcon } from "lucide-react"
import {
  AudioLines,
  Languages,
  MessagesSquare,
  Plug,
  SlidersHorizontal,
  Zap,
} from "lucide-react"

/**
 * Icon registry keyed by the `icon` value in each service MDX file's
 * frontmatter. Add a new lucide import here when a new service goes in.
 */
export const SERVICE_ICONS: Record<string, LucideIcon> = {
  Languages,
  Zap,
  AudioLines,
  MessagesSquare,
  SlidersHorizontal,
  Plug,
}

export function resolveServiceIcon(name: string): LucideIcon {
  return SERVICE_ICONS[name] ?? Languages
}
