import { createElement } from "react"
import Link from "next/link"
import {
  BadgeCheck,
  BarChart3,
  BookOpen,
  CalendarClock,
  ChevronRight,
  Code2,
  type LucideIcon,
  Megaphone,
  PhoneForwarded,
  PhoneIncoming,
  SquareDashedMousePointer,
  Voicemail,
  Webhook,
} from "lucide-react"

import { Separator } from "@/common/shadcnUI/separator"
import type { FeatureItem } from "@/lib/types"
import { cn } from "@/lib/utils"

const FEATURE_ICONS: Record<string, LucideIcon> = {
  BadgeCheck,
  BarChart3,
  BookOpen,
  CalendarClock,
  Code2,
  Megaphone,
  PhoneForwarded,
  PhoneIncoming,
  Voicemail,
  Webhook,
  "badge-check": BadgeCheck,
  "bar-chart-3": BarChart3,
  "book-open": BookOpen,
  "calendar-clock": CalendarClock,
  "code-2": Code2,
  megaphone: Megaphone,
  "phone-forwarded": PhoneForwarded,
  "phone-incoming": PhoneIncoming,
  voicemail: Voicemail,
  webhook: Webhook,
}

// Wider cells create the bento rhythm on large screens (these hold the
// longest titles so nothing wraps awkwardly).
const WIDE = new Set([0, 8])

function normalizeIconName(name: string): string {
  return name
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Za-z])(\d)/g, "$1-$2")
    .replace(/\s+/g, "-")
    .toLowerCase()
}

export function resolveFeatureIcon(name: string): LucideIcon {
  return (
    FEATURE_ICONS[name] ?? FEATURE_ICONS[normalizeIconName(name)] ?? BookOpen
  )
}

export default function FeatureGrid({ features }: { features: FeatureItem[] }) {
  return (
    <section className="pt-32 pb-20 md:pt-44 md:pb-28">
      <div className="container">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <SquareDashedMousePointer className="size-5 text-accent" />
              <p>Features</p>
            </div>
            <Link
              href="/services"
              className="flex items-center gap-1 transition-colors hover:text-accent hover:underline"
            >
              Learn more
              <ChevronRight className="inline-block size-4" />
            </Link>
          </div>

          <Separator className="mt-3 mb-8" />

          <div className="mb-9 flex flex-col justify-between gap-6 md:flex-row lg:mb-14">
            <h2 className="text-3xl font-light tracking-tight text-balance md:w-1/2 md:text-4xl">
              Powerful Features
            </h2>
            <p className="text-balance text-muted-foreground md:w-1/2">
              Explore our comprehensive suite of AI-powered tools designed to
              transform your business communication strategy.
            </p>
          </div>

          <div className="grid grid-flow-dense grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <FeatureCard
                key={`${feature.label}-${index}`}
                feature={feature}
                wide={feature.wide ?? WIDE.has(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function FeatureCard({
  feature,
  wide,
}: {
  feature: FeatureItem
  wide: boolean
}) {
  return (
    <div
      className={cn(
        "group flex flex-col rounded-2xl border border-border bg-card p-6 ring-1 ring-foreground/5 transition-colors hover:border-accent/40",
        // Wide bento cards carry the big content: larger type, more room.
        wide && "lg:col-span-2 lg:p-8"
      )}
    >
      {/* Icon (no background) sits on one row with its label. */}
      <div className="flex items-center gap-2.5 text-accent">
        {createElement(resolveFeatureIcon(feature.icon), {
          className: cn("shrink-0", wide ? "size-6" : "size-5"),
          strokeWidth: 1.75,
        })}
        <span
          className={cn(
            "font-semibold tracking-tight text-foreground",
            wide ? "text-base" : "text-sm"
          )}
        >
          {feature.label}
        </span>
      </div>

      <h3
        className={cn(
          "mt-4 font-medium tracking-tight text-balance",
          wide ? "text-2xl md:text-3xl" : "min-h-14 text-lg"
        )}
      >
        {feature.title}
      </h3>
      <p
        className={cn(
          "mt-2 leading-relaxed text-muted-foreground",
          wide ? "max-w-2xl text-base" : "text-sm"
        )}
      >
        {feature.description}
      </p>
    </div>
  )
}
