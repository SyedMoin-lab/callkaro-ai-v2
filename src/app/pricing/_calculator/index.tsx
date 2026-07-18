"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Badge } from "@/common/shadcnUI/badge"
import { Button } from "@/common/shadcnUI/button"
import { Slider } from "@/common/shadcnUI/slider"

// ── Model ────────────────────────────────────────────────────────
// Replacement cost of a human agent, from real assumptions:
//   ₹30,000 salary · 25 working days · 150 min/day → 3,750 min/mo → ₹8/min
// CallKaro AI: ₹4.5/min (Fixed plan), and only for connected calls.
const HUMAN = { salary: 30_000, days: 25, minsPerDay: 150 }
const HUMAN_MINS_PER_MONTH = HUMAN.days * HUMAN.minsPerDay // 3,750
const HUMAN_PER_MIN = HUMAN.salary / HUMAN_MINS_PER_MONTH // ₹8
const PLATFORM_PER_MIN = 4.5
const PLATFORM_RATE_LABEL = "₹4.5"

const MIN_MINUTES = 500
const MAX_MINUTES = 20_000

function inr(value: number) {
  return "₹" + Math.round(value).toLocaleString("en-IN")
}

export default function Calculator() {
  const [minutes, setMinutes] = useState(HUMAN_MINS_PER_MONTH)

  const result = useMemo(() => {
    const human = minutes * HUMAN_PER_MIN
    const platform = minutes * PLATFORM_PER_MIN
    const agents = Math.max(1, Math.round(minutes / HUMAN_MINS_PER_MONTH))
    return {
      human,
      platform,
      agents,
      saving: human - platform,
      savingPct: Math.round(((human - platform) / human) * 100),
    }
  }, [minutes])

  return (
    <section id="calculator" className="scroll-mt-24 pb-24 md:pb-32">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
            Replacement cost calculator
          </p>
          <h2 className="mt-4 text-3xl leading-tight font-light tracking-tight text-balance md:text-4xl">
            What a human agent costs you vs CallKaro AI
          </h2>
          <p className="mt-4 text-balance text-muted-foreground md:text-lg">
            A human agent runs about {inr(HUMAN_PER_MIN)}/min. CallKaro AI is{" "}
            {PLATFORM_RATE_LABEL}/min — and only for connected calls.
          </p>
        </div>

        <div className="mx-auto mt-12 overflow-hidden rounded-2xl border border-border bg-card shadow-xs ring-1 ring-foreground/5">
          <div className="grid lg:grid-cols-2">
            {/* Inputs */}
            <div className="border-b border-border p-6 md:p-8 lg:border-r lg:border-b-0">
              <Fieldset label="Monthly call minutes">
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-light tracking-tight tabular-nums text-accent">
                    {minutes.toLocaleString("en-IN")}
                    {minutes >= MAX_MINUTES ? "+" : ""}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    ≈ {result.agents} human agent
                    {result.agents > 1 ? "s" : ""}
                  </span>
                </div>
                <Slider
                  className="mt-3"
                  value={[minutes]}
                  min={MIN_MINUTES}
                  max={MAX_MINUTES}
                  step={100}
                  onValueChange={([v]) => setMinutes(v)}
                  aria-label="Monthly call minutes"
                />
                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  <span>{MIN_MINUTES.toLocaleString("en-IN")}</span>
                  <span>{MAX_MINUTES.toLocaleString("en-IN")}</span>
                </div>
              </Fieldset>

              <div className="mt-8 rounded-xl bg-muted/40 p-5 ring-1 ring-border">
                <p className="text-sm font-medium">How we get to {inr(HUMAN_PER_MIN)}/min</p>
                <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                  <li className="flex justify-between gap-3">
                    <span>Monthly salary</span>
                    <span className="tabular-nums text-foreground/80">
                      {inr(HUMAN.salary)}
                    </span>
                  </li>
                  <li className="flex justify-between gap-3">
                    <span>Working days</span>
                    <span className="tabular-nums text-foreground/80">
                      {HUMAN.days}
                    </span>
                  </li>
                  <li className="flex justify-between gap-3">
                    <span>Talk-time per day</span>
                    <span className="tabular-nums text-foreground/80">
                      {HUMAN.minsPerDay} min
                    </span>
                  </li>
                  <li className="flex justify-between gap-3 border-t border-border pt-1.5">
                    <span>= {HUMAN_MINS_PER_MONTH.toLocaleString("en-IN")} min/month</span>
                    <span className="tabular-nums font-medium text-foreground">
                      {inr(HUMAN_PER_MIN)}/min
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Estimated cost */}
            <div className="p-6 md:p-8">
              <h3 className="text-xl font-medium tracking-tight">Estimated Cost</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Monthly cost for {minutes.toLocaleString("en-IN")} minutes of
                calling.
              </p>

              <div className="mt-6 space-y-4">
                <CompareCard
                  label="Human agent(s)"
                  amount={inr(result.human)}
                  note={`${inr(HUMAN_PER_MIN)}/min · salaries, training & overhead`}
                />

                {/* Highlight */}
                <div className="relative overflow-hidden rounded-xl bg-linear-to-br from-accent to-[oklch(0.401_0.151_10)] p-5 text-accent-foreground shadow-lg">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">With CallKaro AI</p>
                    <Badge className="bg-accent-foreground/15 text-accent-foreground">
                      Best value
                    </Badge>
                  </div>
                  <p className="mt-1 text-3xl font-semibold tracking-tight tabular-nums md:text-4xl">
                    {inr(result.platform)}
                    <span className="text-base font-normal">/mo</span>
                  </p>
                  <p className="mt-1 text-sm text-accent-foreground/80">
                    {PLATFORM_RATE_LABEL}/min, connected calls only — save{" "}
                    {inr(result.saving)}/mo ({result.savingPct}%).
                  </p>
                  <Button
                    size="lg"
                    className="mt-4 w-full bg-foreground text-background hover:bg-foreground/90"
                    asChild
                  >
                    <Link href="/sign-up">
                      Get Started
                      <ArrowRight />
                    </Link>
                  </Button>
                </div>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                Human-agent figures are based on a ₹30,000/month salary across
                25 working days at 150 talk-minutes per day. Actual savings
                vary with your connect rate and call volume.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Fieldset({
  label,
  className,
  children,
}: {
  label: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={className}>
      <p className="mb-3 text-sm font-medium">{label}</p>
      {children}
    </div>
  )
}

function CompareCard({
  label,
  amount,
  note,
}: {
  label: string
  amount: string
  note: string
}) {
  return (
    <div className="rounded-xl bg-muted/40 p-5 ring-1 ring-border">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-semibold tracking-tight tabular-nums">
        {amount}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">{note}</p>
    </div>
  )
}
