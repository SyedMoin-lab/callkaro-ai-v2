"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Badge } from "@/common/shadcnUI/badge"
import { Button } from "@/common/shadcnUI/button"
import { Checkbox } from "@/common/shadcnUI/checkbox"
import { RadioGroup, RadioGroupItem } from "@/common/shadcnUI/radioGroup"
import { Slider } from "@/common/shadcnUI/slider"

// ── Model ────────────────────────────────────────────────────────
// "With CallKaro AI" is your real plan price (Starter/Growth) or a
// clearly-labelled Scale estimate. The other two cards are typical
// market minimums, shown so people see what they'd save with us.
const STARTER = { price: 10_000, minutes: 1_000 }
const GROWTH = { price: 30_000, minutes: 4_000 }
const SCALE_PER_MINUTE = 6 // beyond Growth's 4,000 min → custom estimate

const ADDONS = [
  { key: "crm", label: "CRM integrations", price: 4_000 },
  { key: "truecaller", label: "Truecaller verified numbers", price: 3_000 },
  { key: "whatsapp", label: "WhatsApp chatbot", price: 3_500 },
] as const

// Outbound / both are more labour-intensive the old way → bigger savings.
const COMPETITORS: Record<string, { centre: number; vendor: number; note: string }> = {
  inbound: { centre: 2.6, vendor: 1.6, note: "inbound support" },
  outbound: { centre: 3.0, vendor: 1.8, note: "outbound campaigns" },
  both: { centre: 3.3, vendor: 1.9, note: "inbound + outbound" },
}

const CALL_TYPES = [
  { value: "inbound", label: "Inbound calls" },
  { value: "outbound", label: "Outbound calls" },
  { value: "both", label: "Inbound + Outbound" },
]

const ANNUAL_FREE_MONTHS = 2
const MAX_MINUTES = 12_000

function inr(value: number) {
  return "₹" + Math.round(value).toLocaleString("en-IN")
}

function round100(value: number) {
  return Math.round(value / 100) * 100
}

function planPrice(minutes: number) {
  if (minutes <= STARTER.minutes) return { price: STARTER.price, custom: false }
  if (minutes <= GROWTH.minutes) return { price: GROWTH.price, custom: false }
  const price = GROWTH.price + (minutes - GROWTH.minutes) * SCALE_PER_MINUTE
  return { price, custom: true }
}

export default function Calculator() {
  const [callType, setCallType] = useState("both")
  const [minutes, setMinutes] = useState(2_000)
  const [addons, setAddons] = useState<Record<string, boolean>>({})
  const [billing, setBilling] = useState("monthly")

  const result = useMemo(() => {
    const plan = planPrice(minutes)
    const addonTotal = ADDONS.reduce(
      (sum, a) => sum + (addons[a.key] ? a.price : 0),
      0
    )
    const base = plan.price + addonTotal
    const displayed =
      billing === "annual" ? (base * (12 - ANNUAL_FREE_MONTHS)) / 12 : base

    const factors = COMPETITORS[callType] ?? COMPETITORS.both
    const centre = round100(base * factors.centre)
    const vendor = round100(base * factors.vendor)

    return {
      custom: plan.custom,
      displayed,
      centre,
      vendor,
      saving: centre - displayed,
      note: factors.note,
    }
  }, [callType, minutes, addons, billing])

  return (
    <section id="calculator" className="scroll-mt-24 pb-24 md:pb-32">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
            Try the cost calculator
          </p>
          <h2 className="mt-4 text-3xl leading-tight font-light tracking-tight text-balance md:text-4xl">
            Get premium AI calling within your budget
          </h2>
        </div>

        <div className="mx-auto mt-12 overflow-hidden rounded-2xl border border-border bg-card shadow-xs ring-1 ring-foreground/5">
          <div className="grid lg:grid-cols-2">
            {/* Inputs */}
            <div className="border-b border-border p-6 md:p-8 lg:border-r lg:border-b-0">
              <Fieldset label="What are you automating?">
                <RadioGroup
                  value={callType}
                  onValueChange={setCallType}
                  className="gap-2.5"
                >
                  {CALL_TYPES.map((option) => (
                    <label
                      key={option.value}
                      htmlFor={`ct-${option.value}`}
                      className="flex cursor-pointer items-center gap-3 text-sm"
                    >
                      <RadioGroupItem id={`ct-${option.value}`} value={option.value} />
                      {option.label}
                    </label>
                  ))}
                </RadioGroup>
              </Fieldset>

              <Fieldset label="Monthly call minutes" className="mt-8">
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-light tracking-tight tabular-nums text-accent">
                    {minutes.toLocaleString("en-IN")}
                    {minutes >= MAX_MINUTES ? "+" : ""}
                  </span>
                </div>
                <Slider
                  className="mt-3"
                  value={[minutes]}
                  min={100}
                  max={MAX_MINUTES}
                  step={100}
                  onValueChange={([v]) => setMinutes(v)}
                  aria-label="Monthly call minutes"
                />
                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  <span>100</span>
                  <span>{MAX_MINUTES.toLocaleString("en-IN")}</span>
                </div>
              </Fieldset>

              <Fieldset label="Add-ons" className="mt-8">
                <div className="space-y-3">
                  {ADDONS.map((addon) => (
                    <label
                      key={addon.key}
                      htmlFor={`addon-${addon.key}`}
                      className="flex cursor-pointer items-center justify-between gap-3 text-sm"
                    >
                      <span className="flex items-center gap-3">
                        <Checkbox
                          id={`addon-${addon.key}`}
                          checked={!!addons[addon.key]}
                          onCheckedChange={(checked) =>
                            setAddons((prev) => ({
                              ...prev,
                              [addon.key]: checked === true,
                            }))
                          }
                        />
                        {addon.label}
                      </span>
                      <span className="whitespace-nowrap text-accent">
                        +{inr(addon.price)}/mo
                      </span>
                    </label>
                  ))}
                </div>
              </Fieldset>

              <Fieldset label="Billing" className="mt-8">
                <RadioGroup
                  value={billing}
                  onValueChange={setBilling}
                  className="gap-2.5"
                >
                  <label
                    htmlFor="billing-monthly"
                    className="flex cursor-pointer items-center gap-3 text-sm"
                  >
                    <RadioGroupItem id="billing-monthly" value="monthly" />
                    Monthly
                  </label>
                  <label
                    htmlFor="billing-annual"
                    className="flex cursor-pointer items-center justify-between gap-3 text-sm"
                  >
                    <span className="flex items-center gap-3">
                      <RadioGroupItem id="billing-annual" value="annual" />
                      Annual
                    </span>
                    <span className="whitespace-nowrap text-accent">Save 17%</span>
                  </label>
                </RadioGroup>
              </Fieldset>
            </div>

            {/* Estimated cost */}
            <div className="p-6 md:p-8">
              <h3 className="text-xl font-medium tracking-tight">Estimated Cost</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                An instant estimate for {result.note}. See how much you save
                with CallKaro AI.
              </p>

              <div className="mt-6 space-y-4">
                <CompareCard
                  label="Traditional call centre charges from"
                  amount={inr(result.centre)}
                  note="Salaries, training, attrition & overhead"
                />
                <CompareCard
                  label="Other AI voice platforms charge from"
                  amount={inr(result.vendor)}
                  note="Metered per-minute billing adds up fast"
                />

                {/* Highlight */}
                <div className="relative overflow-hidden rounded-xl bg-linear-to-br from-accent to-[oklch(0.74_0.14_48)] p-5 text-accent-foreground shadow-lg">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">With CallKaro AI</p>
                    <Badge className="bg-accent-foreground/15 text-accent-foreground">
                      Best value
                    </Badge>
                  </div>
                  <p className="mt-1 text-3xl font-semibold tracking-tight tabular-nums md:text-4xl">
                    {inr(result.displayed)}
                    <span className="text-base font-normal">
                      /mo{result.custom ? " est." : ""}
                    </span>
                  </p>
                  <p className="mt-1 text-sm text-accent-foreground/80">
                    Save {inr(result.saving)}/mo, plus the time and headache.
                  </p>
                  <Button
                    size="lg"
                    className="mt-4 w-full bg-foreground text-background hover:bg-foreground/90"
                    asChild
                  >
                    <Link href={result.custom ? "/contact-us" : "/sign-up"}>
                      {result.custom ? "Contact Sales" : "Get Started"}
                      <ArrowRight />
                    </Link>
                  </Button>
                </div>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                Call-centre and vendor figures are typical market minimums, shown
                for comparison. Scale usage is custom, so talk to sales for
                exact pricing.
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
