import { createElement } from "react"
import Link from "next/link"
import { MoveRight, Sparkles } from "lucide-react"

import { resolveFeatureIcon } from "@/app/features/grid"
import SectionHeader from "@/common/elements/sectionHeader"
import { Button } from "@/common/shadcnUI/button"
import type { FeatureItem } from "@/lib/types"

import { params } from "./params"

function Features({ features }: { features: FeatureItem[] }) {
  const highlighted = features.slice(0, 2)
  if (highlighted.length === 0) return null

  return (
    <section className="section-padding">
      <div className="container">
        <SectionHeader
          badge={params.badge}
          heading={
            <>
              {params.heading.line1}
              <br />
              {params.heading.line2}
            </>
          }
          description={params.description}
          mark={
            <Sparkles
              aria-hidden
              className="size-10 text-foreground/30"
              strokeWidth={1}
            />
          }
        />

        <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2 md:gap-8">
          {highlighted.map((feature) => (
            <FeatureCard key={feature.label} feature={feature} />
          ))}
        </div>

        <div className="mt-10 flex justify-center md:mt-14">
          <Button size="lg" variant="secondary" asChild>
            <Link href={params.cta.href}>
              {params.cta.label}
              <MoveRight className="size-5" strokeWidth={1.25} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ feature }: { feature: FeatureItem }) {
  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card p-6 ring-1 ring-foreground/5 transition-colors hover:border-accent/40 md:p-8">
      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
        {createElement(resolveFeatureIcon(feature.icon), {
          className: "size-5",
          strokeWidth: 1.75,
        })}
      </span>

      <h3 className="mt-5 text-xl leading-tight font-medium tracking-tight text-balance md:text-2xl">
        {feature.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
        {feature.description}
      </p>
    </div>
  )
}

export default Features
