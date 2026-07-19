import type { LucideIcon } from "lucide-react"
import {
  CalendarDays,
  Car,
  GraduationCap,
  HeartPulse,
  Home,
  Landmark,
  ShoppingCart,
  Wifi,
} from "lucide-react"

export const INDUSTRY_ICONS: Record<string, LucideIcon> = {
  GraduationCap,
  ShoppingCart,
  Landmark,
  HeartPulse,
  Car,
  Home,
  Wifi,
  CalendarDays,
}

export function resolveIndustryIcon(name: string): LucideIcon {
  return INDUSTRY_ICONS[name] ?? GraduationCap
}
