import type { LucideIcon } from "lucide-react"
import {
  AudioLines,
  Languages,
  MessagesSquare,
  Plug,
  SlidersHorizontal,
  Zap,
} from "lucide-react"

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
