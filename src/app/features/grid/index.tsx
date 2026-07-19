import { createElement } from "react"
import {
  BadgeCheck,
  BarChart3,
  BookOpen,
  CalendarClock,
  Check,
  ChevronLeft,
  ChevronRight,
  Code2,
  FileText,
  type LucideIcon,
  Megaphone,
  Phone,
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
            <FeatureCard key={`${feature.label}-${index}`} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ feature }: { feature: FeatureItem }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card ring-1 ring-foreground/5 transition-colors hover:border-accent/40">
      <div className="relative h-60 border-b border-border bg-muted/40 p-4">
        <FeatureMock feature={feature} />
      </div>

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

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col justify-between gap-2 font-mono text-[0.7rem] leading-tight">
      {children}
    </div>
  )
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
        "rounded-lg border border-border bg-background/80 shadow-sm backdrop-blur-sm",
        className
      )}
    >
      {children}
    </div>
  )
}

function Avatar({ initials }: { initials: string }) {
  return (
    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-accent/15 text-[0.6rem] font-semibold text-accent">
      {initials}
    </span>
  )
}

const KW = "text-accent"
const STR = "text-emerald-600 dark:text-emerald-400"
const MUT = "text-muted-foreground"

function FeatureMock({ feature }: { feature: FeatureItem }) {
  switch (normalizeIconName(feature.icon)) {
    case "phone-forwarded":
      return <TransferMock />
    case "book-open":
      return <KnowledgeMock />
    case "code-2":
      return <FunctionsMock />
    case "calendar-clock":
      return <CalendarMock />
    case "megaphone":
      return <BatchMock />
    case "badge-check":
      return <VerifiedMock />
    case "voicemail":
      return <VoicemailMock />
    case "phone-incoming":
      return <CallbackMock />
    case "webhook":
      return <WebhookMock />
    default:
      return <AnalyticsMock />
  }
}

function TransferMock() {
  return (
    <Shell>
      <div className="flex items-center justify-between text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-accent motion-safe:animate-pulse" />
          <span className="text-foreground/80">Live call</span>
        </span>
        <span>02:14</span>
      </div>

      <Panel className="flex items-center gap-2 px-2.5 py-2">
        <Avatar initials="RS" />
        <div className="min-w-0">
          <p className="truncate text-foreground/80">Rahul Sharma</p>
          <p className="truncate text-muted-foreground">+91 98••• 210</p>
        </div>
        <span className="ml-auto shrink-0 rounded bg-muted px-1.5 py-0.5 text-muted-foreground">
          Billing
        </span>
      </Panel>

      <Panel className="space-y-1.5 px-2.5 py-2">
        <div className="flex items-center justify-between text-muted-foreground">
          <span>AI confidence</span>
          <span className="text-foreground/70">38%</span>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full w-[38%] rounded-full bg-accent" />
        </div>
      </Panel>

      <Panel className="flex items-center justify-between px-2.5 py-2">
        <span className="flex items-center gap-1.5 text-foreground/80">
          <Sparkles className="size-3 text-accent" strokeWidth={1.75} />
          Escalate to human
        </span>
        <span className="flex h-3.5 w-6 items-center rounded-full bg-accent px-0.5">
          <span className="ml-auto block size-2.5 rounded-full bg-background motion-safe:animate-pulse" />
        </span>
      </Panel>

      <Panel className="flex items-center gap-2 px-2.5 py-2">
        <Avatar initials="PK" />
        <span className="text-foreground/80">Priya K.</span>
        <span className="ml-auto flex items-center gap-1 text-accent">
          <PhoneForwarded className="size-3" strokeWidth={1.75} />
          connecting…
        </span>
      </Panel>
    </Shell>
  )
}

function KnowledgeMock() {
  const sources = [
    { icon: FileText, name: "handbook.pdf", size: "2.4 MB" },
    { icon: FileText, name: "pricing.md", size: "12 KB" },
    { icon: FileText, name: "faqs.csv", size: "88 KB" },
  ]
  return (
    <Shell>
      <div className="flex items-center justify-between text-muted-foreground">
        <span className="flex items-center gap-1.5 text-foreground/80">
          <BookOpen className="size-3.5 text-accent" strokeWidth={1.75} />
          Knowledge base
        </span>
        <span>3 sources</span>
      </div>

      <Panel className="divide-y divide-border">
        {sources.map((s) => (
          <div key={s.name} className="flex items-center gap-2 px-2.5 py-1.5">
            <s.icon className="size-3 text-accent" strokeWidth={1.75} />
            <span className="truncate text-foreground/75">{s.name}</span>
            <span className="ml-auto text-muted-foreground">{s.size}</span>
            <Check className="size-3 text-accent" strokeWidth={2.5} />
          </div>
        ))}
      </Panel>

      <Panel className="space-y-1.5 px-2.5 py-2">
        <p className="text-foreground/70">
          <span className={MUT}>Q&nbsp;</span>&ldquo;What are your hours?&rdquo;
        </p>
        <p className="flex items-start gap-1.5">
          <span className="mt-0.5 text-accent motion-safe:animate-pulse">
            A
          </span>
          <span className="text-foreground/80">
            Mon–Sat, 9am–7pm IST.{" "}
            <span className="text-muted-foreground">[handbook.pdf]</span>
          </span>
        </p>
      </Panel>
    </Shell>
  )
}

function FunctionsMock() {
  const code = [
    <>
      <span className={MUT}>{"// invoked mid-conversation"}</span>
    </>,
    <>
      <span className={KW}>export async function</span>{" "}
      <span className="text-foreground/90">bookSlot</span>
      <span className={MUT}>(time) {"{"}</span>
    </>,
    <>
      {"  "}
      <span className={KW}>const</span> res = <span className={KW}>await</span>{" "}
      fetch(
    </>,
    <>
      {"    "}
      <span className={STR}>&quot;/api/calendar/book&quot;</span>
      <span className={MUT}>,</span>
    </>,
    <>{"    {"}</>,
    <>
      {"      method: "}
      <span className={STR}>&quot;POST&quot;</span>
      {","}
    </>,
    <>
      {"      body: JSON."}
      <span className="text-foreground/90">stringify</span>
      {"({ time }),"}
    </>,
    <>{"    }"}</>,
    <>{"  )"}</>,
    <>
      {"  "}
      <span className={KW}>return</span> res.
      <span className="text-foreground/90">json</span>()
    </>,
    <>{"}"}</>,
    <>
      <span className={MUT}>{"// → { booked: true, id: "}</span>
      <span className={STR}>&quot;bk_92a&quot;</span>
      <span className={MUT}>{" }"}</span>
    </>,
  ]
  return (
    <Shell>
      <Panel className="flex h-full flex-col overflow-hidden">
        <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
          <span className="size-2 rounded-full bg-accent/70" />
          <span className="size-2 rounded-full bg-muted-foreground/40" />
          <span className="size-2 rounded-full bg-muted-foreground/40" />
          <span className="ml-2 flex items-center gap-1 text-muted-foreground">
            <Code2 className="size-3" strokeWidth={1.75} />
            bookSlot.ts
          </span>
        </div>
        <div className="flex-1 overflow-hidden px-2 py-2 text-[0.66rem] leading-[1.55]">
          {code.map((line, i) => (
            <div key={i} className="grid grid-cols-[1.1rem_1fr] gap-x-2">
              <span className="text-right text-muted-foreground/40 select-none">
                {i + 1}
              </span>
              <code className="whitespace-pre text-foreground/70">{line}</code>
            </div>
          ))}
        </div>
      </Panel>
    </Shell>
  )
}

function CalendarMock() {
  const days = Array.from({ length: 14 }, (_, i) => i + 8)
  return (
    <Shell>
      <div className="flex items-center justify-between text-foreground/80">
        <ChevronLeft
          className="size-3.5 text-muted-foreground"
          strokeWidth={1.75}
        />
        <span className="flex items-center gap-1.5">
          <CalendarClock className="size-3.5 text-accent" strokeWidth={1.75} />
          October 2025
        </span>
        <ChevronRight
          className="size-3.5 text-muted-foreground"
          strokeWidth={1.75}
        />
      </div>

      <Panel className="p-2.5">
        <div className="grid grid-cols-7 gap-1 text-center text-[0.6rem] text-muted-foreground">
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
            <span key={i}>{d}</span>
          ))}
        </div>
        <div className="mt-1 grid grid-cols-7 gap-1 text-center">
          {days.map((d) => {
            const selected = d === 14
            return (
              <span
                key={d}
                className={cn(
                  "rounded py-1 text-[0.6rem]",
                  selected
                    ? "bg-accent font-semibold text-accent-foreground motion-safe:animate-pulse"
                    : "text-foreground/70"
                )}
              >
                {d}
              </span>
            )
          })}
        </div>
      </Panel>

      <Panel className="flex items-center justify-between px-2.5 py-2">
        <span className="text-foreground/80">Tue 14 · 2:30 PM</span>
        <span className="flex items-center gap-1 text-accent">
          <Check className="size-3" strokeWidth={2.5} />
          Booked
        </span>
      </Panel>
    </Shell>
  )
}

function BatchMock() {
  const rows = [
    { num: "+91 98••• 01", status: "Answered", done: true },
    { num: "+91 98••• 24", status: "Voicemail", done: true },
    { num: "+91 98••• 57", status: "Dialing", done: false },
  ]
  return (
    <Shell>
      <div className="flex items-center justify-between text-foreground/80">
        <span className="flex items-center gap-1.5">
          <Megaphone className="size-3.5 text-accent" strokeWidth={1.75} />
          Outreach campaign
        </span>
        <span className="text-muted-foreground">342 / 500</span>
      </div>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div className="h-full w-[68%] origin-left rounded-full bg-accent motion-safe:animate-[feature-bar-grow_1.6s_ease-out]" />
      </div>

      <Panel className="divide-y divide-border">
        {rows.map((row, i) => (
          <div key={row.num} className="flex items-center gap-2 px-2.5 py-1.5">
            <span className="text-foreground/70">{row.num}</span>
            <span className="ml-auto text-muted-foreground">{row.status}</span>
            {row.done ? (
              <Check className="size-3 text-accent" strokeWidth={2.5} />
            ) : (
              <span
                style={{ animationDelay: `${i * 0.2}s` }}
                className="size-2 rounded-full bg-accent motion-safe:animate-ping"
              />
            )}
          </div>
        ))}
      </Panel>

      <div className="grid grid-cols-3 gap-1.5 text-center">
        {[
          ["210", "Answered"],
          ["84", "Voicemail"],
          ["48", "Missed"],
        ].map(([n, l]) => (
          <Panel key={l} className="py-1.5">
            <p className="text-foreground/85">{n}</p>
            <p className="text-[0.6rem] text-muted-foreground">{l}</p>
          </Panel>
        ))}
      </div>
    </Shell>
  )
}

function VerifiedMock() {
  return (
    <Shell>
      <Panel className="flex flex-1 flex-col items-center justify-center gap-1.5 p-3 text-center">
        <span className="relative flex size-12 items-center justify-center rounded-2xl bg-accent/15">
          <Phone className="size-5 text-accent" strokeWidth={1.75} />
          <span className="absolute -right-1.5 -bottom-1.5">
            <span className="absolute inset-0 rounded-full bg-accent/40 motion-safe:animate-ping" />
            <BadgeCheck
              className="relative size-5 text-accent"
              strokeWidth={2}
            />
          </span>
        </span>
        <p className="text-sm font-semibold text-foreground">CallKaro AI</p>
        <p className="text-muted-foreground">+91 98••• 210</p>
        <span className="rounded-full bg-accent/15 px-2 py-0.5 text-accent">
          Verified Business
        </span>
      </Panel>

      <Panel className="flex items-center justify-between px-2.5 py-2">
        <span className="text-muted-foreground">Pickup rate</span>
        <span className="flex items-center gap-1 text-accent">
          ↑ 34% this month
        </span>
      </Panel>
    </Shell>
  )
}

function VoicemailMock() {
  const bars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  return (
    <Shell>
      <div className="flex items-center justify-between text-foreground/80">
        <span className="flex items-center gap-1.5">
          <Voicemail className="size-3.5 text-accent" strokeWidth={1.75} />
          Voicemail detected
        </span>
        <span className="text-muted-foreground">0:07</span>
      </div>

      <Panel className="flex flex-1 items-center justify-center gap-1 px-3">
        {bars.map((b) => (
          <span
            key={b}
            style={{ animationDelay: `${b * 0.07}s` }}
            className="h-10 w-1.5 origin-center rounded-full bg-accent/70 motion-safe:animate-[feature-eq_0.9s_ease-in-out_infinite]"
          />
        ))}
      </Panel>

      <Panel className="px-2.5 py-2 text-muted-foreground">
        &ldquo;Hi, you&apos;ve reached…&rdquo;
      </Panel>

      <Panel className="flex items-center justify-between px-2.5 py-2">
        <span className="text-foreground/80">Drop pre-recorded VM</span>
        <Check className="size-3 text-accent" strokeWidth={2.5} />
      </Panel>
    </Shell>
  )
}

function CallbackMock() {
  return (
    <Shell>
      <Panel className="flex flex-1 flex-col items-center justify-center gap-1 px-3 text-center">
        <span className="relative mb-1 flex size-11 items-center justify-center rounded-full bg-accent/15">
          <span className="absolute inset-0 rounded-full bg-accent/30 motion-safe:animate-ping" />
          <PhoneIncoming
            className="relative size-5 text-accent"
            strokeWidth={1.75}
          />
        </span>
        <p className="text-muted-foreground">Callback scheduled</p>
        <p className="text-2xl font-semibold tracking-tight text-foreground">
          3:00 PM
        </p>
        <p className="text-muted-foreground">Rahul S. · +91 98••• 210</p>
      </Panel>

      <Panel className="flex items-center justify-between px-2.5 py-2">
        <span className="text-muted-foreground">Reminder</span>
        <span className="text-accent">in 2h 15m</span>
      </Panel>
    </Shell>
  )
}

function WebhookMock() {
  const endpoints = [
    { name: "CRM", code: "200", ok: true },
    { name: "Slack", code: "200", ok: true },
    { name: "Zapier", code: "retry", ok: false },
  ]
  return (
    <Shell>
      <div className="flex items-center justify-between text-foreground/80">
        <span className="flex items-center gap-1.5">
          <Webhook className="size-3.5 text-accent" strokeWidth={1.75} />
          Event fired
        </span>
        <span className="size-2 rounded-full bg-accent motion-safe:animate-pulse" />
      </div>

      <Panel className="space-y-0.5 px-2.5 py-2 text-[0.66rem]">
        <p className={MUT}>{"{"}</p>
        <p>
          {"  event: "}
          <span className={STR}>&quot;call.completed&quot;</span>,
        </p>
        <p>
          {"  id: "}
          <span className={STR}>&quot;cl_92a7&quot;</span>
        </p>
        <p className={MUT}>{"}"}</p>
      </Panel>

      <Panel className="divide-y divide-border">
        {endpoints.map((e) => (
          <div key={e.name} className="flex items-center gap-2 px-2.5 py-1.5">
            <span className="text-foreground/75">{e.name}</span>
            <span
              className={cn(
                "ml-auto rounded px-1.5 py-0.5",
                e.ok
                  ? "bg-accent/15 text-accent"
                  : "bg-muted text-muted-foreground motion-safe:animate-pulse"
              )}
            >
              {e.code}
            </span>
          </div>
        ))}
      </Panel>
    </Shell>
  )
}

function AnalyticsMock() {
  return (
    <Shell>
      <div className="flex items-center justify-between text-foreground/80">
        <span className="flex items-center gap-1.5">
          <BarChart3 className="size-3.5 text-accent" strokeWidth={1.75} />
          Call analytics
        </span>
        <span className="text-muted-foreground">Today</span>
      </div>

      <div className="grid grid-cols-2 gap-1.5">
        {[
          ["1,240", "Calls"],
          ["4.6", "Avg. CSAT"],
        ].map(([n, l]) => (
          <Panel key={l} className="px-2.5 py-2">
            <p className="text-base font-semibold text-foreground">{n}</p>
            <p className="text-[0.6rem] text-muted-foreground">{l}</p>
          </Panel>
        ))}
      </div>

      <Panel className="space-y-1.5 px-2.5 py-2">
        <div className="flex items-center justify-between text-muted-foreground">
          <span>Positive sentiment</span>
          <span className="text-foreground/80">92%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full w-[92%] origin-left rounded-full bg-accent motion-safe:animate-[feature-bar-grow_1.6s_ease-out]" />
        </div>
      </Panel>

      <div className="flex flex-wrap gap-1">
        {["pricing", "demo", "support", "refund"].map((t) => (
          <span
            key={t}
            className="rounded border border-border bg-background/70 px-1.5 py-0.5 text-muted-foreground"
          >
            {t}
          </span>
        ))}
      </div>
    </Shell>
  )
}
