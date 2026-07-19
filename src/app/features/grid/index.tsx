import { createElement } from "react"
import {
  BadgeCheck,
  BarChart3,
  BookOpen,
  Bot,
  CalendarClock,
  ChevronDown,
  Code2,
  type LucideIcon,
  Megaphone,
  Mic,
  PhoneForwarded,
  PhoneIncoming,
  Sparkles,
  Voicemail,
  Webhook,
} from "lucide-react"

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
    <section id="browse" className="section-padding overflow-hidden pt-0">
      <div className="container">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard
              key={`${feature.label}-${index}`}
              feature={feature}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({
  feature,
  index,
}: {
  feature: FeatureItem
  index: number
}) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card ring-1 ring-foreground/5 transition-colors hover:border-accent/40">
      {/* Demo panel */}
      <div className="relative aspect-[4/3] border-b border-border bg-muted/40 p-5">
        <FeatureMock index={index} feature={feature} />
      </div>

      {/* Copy */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2 text-accent">
          {createElement(resolveFeatureIcon(feature.icon), {
            className: "size-4 shrink-0",
            strokeWidth: 1.75,
          })}
          <h3 className="font-semibold tracking-tight text-foreground">
            {feature.label}
          </h3>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {feature.description}
        </p>
      </div>
    </div>
  )
}

// ── Demo mockups ─────────────────────────────────────────────────
// Three illustrative panels rotate across the feature cards to echo the
// product UI without shipping a bespoke mock for every single feature.

function FeatureMock({
  index,
  feature,
}: {
  index: number
  feature: FeatureItem
}) {
  switch (index % 3) {
    case 0:
      return <EscalateMock />
    case 1:
      return <AgentChatMock label={feature.label} />
    default:
      return <AnalyticsMock />
  }
}

function Panel({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-background/70 shadow-sm backdrop-blur-sm",
        className
      )}
    >
      {children}
    </div>
  )
}

function EscalateMock() {
  return (
    <div className="flex h-full flex-col justify-center gap-2.5 font-mono text-xs">
      <Panel className="flex items-center gap-2 px-3 py-2">
        <PhoneIncoming
          className="size-4 shrink-0 text-accent"
          strokeWidth={1.75}
        />
        <span className="truncate text-foreground/80">
          Incoming call · +91 98•••
        </span>
      </Panel>

      <ChevronDown
        className="mx-auto size-4 text-muted-foreground motion-safe:animate-bounce"
        strokeWidth={1.75}
      />

      <Panel className="flex items-center justify-between px-3 py-2">
        <span className="flex items-center gap-2 text-foreground/80">
          <Sparkles className="size-3.5 text-accent" strokeWidth={1.75} />
          Escalate to human
        </span>
        <span className="flex h-4 w-7 items-center rounded-full bg-accent px-0.5">
          <span className="ml-auto block size-3 rounded-full bg-background motion-safe:animate-pulse" />
        </span>
      </Panel>

      <div className="rounded-lg border border-dashed border-border px-3 py-2 text-center text-muted-foreground">
        Transfer to agent
      </div>
    </div>
  )
}

function AgentChatMock({ label }: { label: string }) {
  const chips = [label, "Book appointment", "Qualify lead", "Answer FAQ"]
  return (
    <div className="flex h-full flex-col justify-center gap-2 font-mono text-[0.7rem]">
      <Panel className="flex items-center gap-2 px-3 py-2">
        <Bot className="size-3.5 text-accent" strokeWidth={1.75} />
        <span className="text-foreground/80">Meet your voice agent</span>
      </Panel>

      <div className="flex flex-wrap gap-1.5">
        {chips.map((chip, i) => (
          <span
            key={chip}
            style={{ animationDelay: `${i * 0.15}s` }}
            className="truncate rounded-md border border-border bg-background/70 px-2 py-1 text-foreground/70 motion-safe:animate-pulse"
          >
            {chip}
          </span>
        ))}
      </div>

      <Panel className="flex items-center gap-2 px-3 py-2 text-muted-foreground">
        <span className="flex items-center">
          Ask anything…
          <span className="ml-0.5 inline-block h-3 w-px bg-foreground/70 motion-safe:animate-pulse" />
        </span>
        <Mic className="ml-auto size-3.5" strokeWidth={1.75} />
      </Panel>
    </div>
  )
}

function AnalyticsMock() {
  return (
    <div className="flex h-full items-center">
      <Panel className="w-full p-4 font-mono text-xs">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Call Summary</span>
          <BarChart3 className="size-4 text-accent" strokeWidth={1.75} />
        </div>
        <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
          1,240{" "}
          <span className="text-sm font-normal text-muted-foreground">
            calls
          </span>
        </p>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full w-3/4 origin-left rounded-full bg-accent motion-safe:animate-[feature-bar-grow_1.6s_ease-out]" />
        </div>
        <div className="mt-3 flex items-center justify-between text-muted-foreground">
          <span>Positive sentiment</span>
          <span className="text-foreground">92%</span>
        </div>
      </Panel>
    </div>
  )
}
