import { createElement } from "react"

import { resolveFeatureIcon } from "@/app/features/_featureGrid"
import type { FeatureItem } from "@/lib/types"
import { cn } from "@/lib/utils"

// Wider cells create the bento rhythm (mirrors the /features grid): the
// first card in the row carries the big content, the rest sit narrow.
const WIDE = new Set([0])

function MainFeatures({ features }: { features: FeatureItem[] }) {
  if (features.length === 0) return null

  return (
    <section className="section-padding border-t">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl leading-tight font-light tracking-tight md:text-4xl">
            Everything your team needs, in every call.
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            The same core platform, tuned to how your industry actually
            answers the phone.
          </p>
        </div>

        <div className="mt-12 grid grid-flow-dense grid-cols-1 gap-4 sm:grid-cols-2 md:mt-16 md:gap-5 lg:grid-cols-3">
          {features.map((f, index) => (
            <FeatureCard
              key={f.label}
              feature={f}
              wide={f.wide ?? WIDE.has(index)}
            />
          ))}
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
        wide && "lg:col-span-2 lg:p-8"
      )}
    >
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

export default MainFeatures
