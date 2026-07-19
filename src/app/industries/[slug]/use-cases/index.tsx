import { createElement } from "react"

import { interpolateIndustryTemplate } from "@/lib/industries"
import type { IndustryFrontmatter } from "@/lib/types"
import { cn } from "@/lib/utils"

import { resolveIndustryIcon } from "../data"

function UseCases({
  frontmatter,
  headingTemplate,
  subheadingTemplate,
}: {
  frontmatter: IndustryFrontmatter
  headingTemplate: string
  subheadingTemplate: string
}) {
  const { useCases } = frontmatter
  if (useCases.length === 0) return null

  const Icon = resolveIndustryIcon(frontmatter.icon)

  return (
    <section className="section-padding border-t">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl leading-tight font-light tracking-tight md:text-4xl">
            {interpolateIndustryTemplate(headingTemplate, frontmatter.name)}
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            {interpolateIndustryTemplate(subheadingTemplate, frontmatter.name)}
          </p>
        </div>

        <ul className="mt-14 flex flex-col gap-14 md:mt-20 md:gap-20">
          {useCases.map((uc, i) => {
            const reversed = i % 2 === 1
            return (
              <li
                key={uc.title}
                className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16"
              >
                <div className={cn("min-w-0", reversed && "lg:order-2")}>
                  <span className="font-mono text-sm text-accent tabular-nums">
                    0{i + 1}
                  </span>
                  <h3 className="mt-3 text-2xl leading-tight font-light tracking-tight wrap-break-word md:text-3xl">
                    {uc.title}
                  </h3>
                  <p className="mt-4 max-w-md text-base leading-relaxed wrap-break-word text-muted-foreground">
                    {uc.description}
                  </p>
                </div>

                <div
                  className={cn(
                    "relative aspect-4/3 overflow-hidden rounded-xl bg-muted/50 ring-1 ring-foreground/10",
                    reversed && "lg:order-1"
                  )}
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 grid place-items-center"
                  >
                    {createElement(Icon, {
                      className: "size-24 text-foreground/10",
                      strokeWidth: 1,
                    })}
                  </div>
                  <span className="absolute top-5 left-5 font-mono text-xs tracking-widest text-muted-foreground uppercase">
                    0{i + 1} / 0{useCases.length}
                  </span>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default UseCases
