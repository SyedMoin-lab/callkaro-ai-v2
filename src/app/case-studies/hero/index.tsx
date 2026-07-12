import Link from "next/link"
import { FolderOpen, MoveUpRight } from "lucide-react"

import { Badge } from "@/common/shadcnUI/badge"
import { Button } from "@/common/shadcnUI/button"

function CaseStudiesHero() {
  return (
    <section className="hero-padding overflow-hidden">
      <div className="container mx-auto max-w-2xl text-center">
        <Badge variant="outline" size="lg">
          <FolderOpen aria-hidden className="size-3" strokeWidth={2} />
          Case Studies
        </Badge>

        <h1 className="mt-8 text-4xl leading-[1.05] font-light tracking-tight md:text-5xl lg:text-6xl">
          Real results for <span className="text-accent">real businesses</span>.
        </h1>

        <p className="mx-auto mt-6 max-w-lg text-base text-muted-foreground md:text-lg">
          A record of how CallKaro AI performs in the field: the calls it
          handles, and the results our customers see.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button size="lg" asChild>
            <Link href="/contact-us">
              Talk to our team
              <MoveUpRight />
            </Link>
          </Button>
          <Button size="lg" variant="secondary" asChild>
            <Link href="#browse">Browse case studies</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default CaseStudiesHero
