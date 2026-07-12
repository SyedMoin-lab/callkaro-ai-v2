import Link from "next/link"
import { MoveUpRight, Newspaper } from "lucide-react"

import { Badge } from "@/common/shadcnUI/badge"
import { Button } from "@/common/shadcnUI/button"

function BlogHero() {
  return (
    <section className="hero-padding overflow-hidden">
      <div className="container mx-auto max-w-2xl text-center">
        <Badge variant="outline" size="lg">
          <Newspaper aria-hidden className="size-3" strokeWidth={2} />
          Blog
        </Badge>

        <h1 className="mt-8 text-4xl leading-[1.05] font-light tracking-tight md:text-5xl lg:text-6xl">
          Notes on <span className="text-accent">every call</span>.
        </h1>

        <p className="mx-auto mt-6 max-w-lg text-base text-muted-foreground md:text-lg">
          Field notes, product updates, and playbooks on getting the most
          out of your AI voice agent.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button size="lg" asChild>
            <Link href="/contact-us">
              Talk to our team
              <MoveUpRight />
            </Link>
          </Button>
          <Button size="lg" variant="secondary" asChild>
            <Link href="#browse">Browse articles</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default BlogHero
