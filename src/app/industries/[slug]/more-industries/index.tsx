import { createElement } from "react"
import Image from "next/image"
import Link from "next/link"
import { MoveUpRight } from "lucide-react"

import { Card } from "@/common/shadcnUI/card"
import type { IndustryFrontmatter } from "@/lib/types"

import { resolveIndustryIcon } from "../data"

function MoreIndustries({
  industries,
  heading,
  viewAllLabel,
}: {
  industries: IndustryFrontmatter[]
  heading: string
  viewAllLabel: string
}) {
  if (industries.length === 0) return null

  return (
    <section className="section-padding border-t">
      <div className="container">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-2xl leading-tight font-light tracking-tight md:text-3xl">
            {heading}
          </h2>
          <Link
            href="/industries"
            className="group/all inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {viewAllLabel}
            <MoveUpRight className="size-3.5 transition-transform group-hover/all:translate-x-0.5 group-hover/all:-translate-y-0.5" />
          </Link>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-14 md:gap-5 lg:grid-cols-4">
          {industries.map((s) => (
            <li key={s.slug}>
              <Card asChild className="h-full">
                <Link href={`/industries/${s.slug}`}>
                  <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
                    <Image
                      src={s.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 22vw, 50vw"
                      className="object-cover transition duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform group-hover/card:scale-[1.04]"
                    />
                  </div>
                  <div className="mt-5 flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-muted/60 text-foreground/85">
                        {createElement(resolveIndustryIcon(s.icon), {
                          className: "size-4",
                          strokeWidth: 1.5,
                        })}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground tabular-nums">
                        {s.id}
                      </span>
                    </div>
                    <h3 className="mt-4 text-lg leading-tight font-light tracking-tight wrap-break-word md:text-xl">
                      {s.name}.
                    </h3>
                    <p className="mt-2 text-sm leading-snug wrap-break-word text-muted-foreground">
                      {s.tagline}
                    </p>
                  </div>
                </Link>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default MoreIndustries
