import Link from "next/link"

import { NumberTicker } from "@/common/customUI/number-ticker"
import ReviewsRow from "@/common/elements/reviewsRow"
import { Badge } from "@/common/shadcnUI/badge"
import { Button } from "@/common/shadcnUI/button"
import { Separator } from "@/common/shadcnUI/separator"

import { params } from "./params"

function About() {
  return (
    <section className="section-padding">
      <div className="container space-y-12 md:space-y-16">
        <div className="flex flex-col items-start gap-6 text-left">
          <Badge variant="outline" size="lg">
            <span className="size-1 rounded-full bg-foreground/40" />
            {params.badge}
            <span className="size-1 rounded-full bg-foreground/40" />
          </Badge>

          <div className="max-w-3xl">
            <h2 className="text-4xl leading-[1.1] font-medium tracking-tight md:text-5xl lg:text-6xl">
              {params.heading.line1}
              <br />
              {params.heading.line2}
            </h2>
            <p className="mt-8 text-base text-muted-foreground">
              {params.body}
            </p>
            <Link
              href={params.learnMore.href}
              className="mt-10 inline-flex items-center gap-1.5 text-sm underline underline-offset-4 transition-colors hover:text-muted-foreground"
            >
              {params.learnMore.label}
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_2.6fr] md:gap-16">
          <div className="dark relative flex flex-col overflow-hidden rounded-xl bg-card text-foreground">
            <div
              aria-hidden
              className="relative aspect-[4/3] bg-cover bg-center"
              style={{ backgroundImage: `url(${params.card.image})` }}
            >
              <div className="absolute inset-0 bg-linear-to-t from-card via-card/40 to-transparent" />
            </div>

            <div className="space-y-6 p-6">
              <div>
                <p className="text-lg font-medium">{params.card.stat}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {params.card.subStat}
                </p>
              </div>
              <Button asChild size="lg" className="w-full">
                <Link href={params.card.cta.href}>{params.card.cta.label}</Link>
              </Button>
            </div>
          </div>

          <div className="flex min-w-0 flex-col justify-end gap-10">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
              {params.stats.map((s) => (
                <li key={s.label[0]}>
                  <p className="flex items-baseline text-4xl font-medium tracking-tight md:text-5xl">
                    {s.prefix}
                    <NumberTicker
                      value={s.number}
                      className="text-4xl font-medium tracking-tight text-foreground md:text-5xl"
                    />
                    {s.suffix}
                  </p>
                  <p className="mt-3 text-sm leading-snug text-muted-foreground">
                    {s.label[0]}
                    <br />
                    {s.label[1]}
                  </p>
                </li>
              ))}
            </ul>

            <Separator />

            <ReviewsRow />
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
