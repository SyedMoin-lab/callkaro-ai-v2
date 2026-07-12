import Link from "next/link"
import { LayoutGrid, MoveUpRight } from "lucide-react"

import { Badge } from "@/common/shadcnUI/badge"
import { Button } from "@/common/shadcnUI/button"
import type { IndustriesPageHero } from "@/lib/types"

function IndustriesHero({ hero }: { hero: IndustriesPageHero }) {
  return (
    <section className="hero-padding overflow-hidden">
      <div className="container mx-auto max-w-2xl text-center">
        <Badge variant="outline" size="lg">
          <LayoutGrid aria-hidden className="size-3" strokeWidth={2} />
          {hero.badgeLabel}
        </Badge>

        <h1 className="mt-8 text-4xl leading-[1.05] font-light tracking-tight md:text-5xl lg:text-6xl">
          {hero.heading} <br />
          <span className="text-accent">{hero.headingAccent}</span>
        </h1>

        <p className="mx-auto mt-6 max-w-lg text-base text-muted-foreground md:text-lg">
          {hero.description}
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button size="lg" asChild>
            <Link href={hero.primaryCtaHref}>
              {hero.primaryCtaLabel}
              <MoveUpRight />
            </Link>
          </Button>
          <Button size="lg" variant="secondary" asChild>
            <Link href={hero.secondaryCtaHref}>{hero.secondaryCtaLabel}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default IndustriesHero
