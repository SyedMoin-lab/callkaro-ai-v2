import Link from "next/link"
import { Calculator as CalculatorIcon, Check } from "lucide-react"

import { Badge } from "@/common/shadcnUI/badge"
import { Button } from "@/common/shadcnUI/button"
import { Card } from "@/common/shadcnUI/card"
import { cn } from "@/lib/utils"

type Plan = {
  name: string
  pricePrefix?: string
  price: string
  period?: string
  description: string
  features: string[]
  cta: { label: string; href: string }
  secondaryLink?: { label: string; href: string }
  popular?: boolean
}

const PLANS: Plan[] = [
  {
    name: "Fixed",
    pricePrefix: "Starts at",
    price: "₹4.5",
    period: "/min",
    description:
      "A flat, predictable rate for every connected minute — simple to forecast, no surprises.",
    features: [
      "Access to gpt-4.1-mini",
      "Post-call analysis (summary & sentiment)",
      "Batch calling",
      "Knowledge base access",
      "Call transfer",
      "Voice mail detection",
      "Email support",
    ],
    cta: { label: "Get Started", href: "/sign-up" },
  },
  {
    name: "Dynamic",
    price: "Usage-based",
    description:
      "Pay as per model usage — you're billed for the AI model your calls actually consume. Ideal for variable or premium workloads.",
    features: [
      "Billed on real model usage",
      "Post-call analysis (summary & sentiment)",
      "Batch calling",
      "Knowledge base access",
      "Call transfer",
      "Voice mail detection",
      "Email support",
    ],
    cta: { label: "Start Pay-as-you-go", href: "/sign-up" },
    secondaryLink: { label: "Compare to a human agent", href: "#calculator" },
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description:
      "Contact us to explore a plan built around your scale, support, and integration needs.",
    features: [
      "Custom minutes & pricing",
      "Everything in Fixed & Dynamic, plus...",
      "Truecaller number verification",
      "WhatsApp chatbot",
      "On-site / in-office support",
      "Dedicated account manager & SLA",
      "Full suite CRM & help-desk integrations",
      "Custom Telephony Integration",
    ],
    cta: { label: "Contact us to explore", href: "/contact-us" },
  },
]

export default function Plans() {
  return (
    <section className="pt-32 pb-16 md:pt-44 md:pb-20">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl leading-[1.05] font-light tracking-tight text-balance md:text-5xl">
            <span className="text-accent">Flexible</span> Pricing Plans
          </h1>
          <p className="mt-5 text-balance text-muted-foreground md:text-lg">
            Choose the perfect plan for your business needs, with scalable
            options that grow with you.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl items-start gap-6 md:mt-16 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  )
}

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div className={cn("relative", plan.popular && "lg:-mt-4")}>
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2">
          <Badge className="bg-accent text-accent-foreground shadow-sm">
            Most Popular
          </Badge>
        </div>
      )}

      <Card
        variant="image"
        className={cn(
          "h-full p-6 md:p-8",
          plan.popular && "ring-2 ring-accent"
        )}
      >
        <p className="text-sm font-medium text-muted-foreground">{plan.name}</p>

        <div className="mt-3">
          {plan.pricePrefix && (
            <p className="text-xs text-muted-foreground">{plan.pricePrefix}</p>
          )}
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-light tracking-tight">
              {plan.price}
            </span>
            {plan.period && (
              <span className="text-sm text-muted-foreground">
                {plan.period}
              </span>
            )}
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {plan.description}
        </p>

        <ul className="mt-6 space-y-3">
          {plan.features.map((feature) => (
            <li key={feature} className="flex gap-2.5 text-sm">
              <Check
                className="mt-0.5 size-4 shrink-0 text-accent"
                strokeWidth={2.5}
              />
              <span className="text-foreground/80">{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 pt-2">
          <Button
            size="lg"
            variant={plan.popular ? "default" : "secondary"}
            className="w-full"
            asChild
          >
            <Link href={plan.cta.href}>{plan.cta.label}</Link>
          </Button>

          {plan.secondaryLink && (
            <Link
              href={plan.secondaryLink.href}
              className="mt-3 flex items-center justify-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <CalculatorIcon className="size-3.5" strokeWidth={2} />
              {plan.secondaryLink.label}
            </Link>
          )}
        </div>
      </Card>
    </div>
  )
}
