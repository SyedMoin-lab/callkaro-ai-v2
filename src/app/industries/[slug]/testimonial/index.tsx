import Link from "next/link"
import { MoveUpRight } from "lucide-react"

import { Button } from "@/common/shadcnUI/button"
import type { IndustryTestimonial } from "@/lib/types"

function Testimonial({
  testimonial,
  name,
}: {
  testimonial: IndustryTestimonial
  name: string
}) {
  return (
    <section className="section-padding border-t">
      <div className="container">
        <div className="dark mx-auto max-w-6xl rounded-2xl bg-background p-10 text-center text-foreground md:p-16 lg:p-20">
          <span
            aria-hidden
            className="block text-6xl leading-none font-light text-accent md:text-7xl"
          >
            &ldquo;
          </span>
          <blockquote className="mx-auto mt-2 max-w-3xl text-xl leading-snug font-light md:text-2xl lg:text-3xl">
            {testimonial.quote}
          </blockquote>
          <footer className="mt-8 flex items-center justify-center gap-3">
            <span aria-hidden className="block h-px w-8 bg-accent" />
            <div>
              <p className="text-sm font-medium">{testimonial.author}</p>
              <p className="mt-0.5 text-xs text-foreground/60">
                {testimonial.role}
              </p>
            </div>
          </footer>

          <div className="mt-10">
            <Button asChild variant="secondary" size="lg">
              <Link href="/case-studies">
                Read more {name.toLowerCase()} stories
                <MoveUpRight />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonial
