import Link from "next/link"
import { MoveUpRight } from "lucide-react"

import { Button } from "@/common/shadcnUI/button"
import { interpolateIndustryTemplate } from "@/lib/industries"
import type { IndustryTestimonial } from "@/lib/types"

function Testimonial({
  testimonial,
  name,
  ctaLabelTemplate,
  ctaHref,
}: {
  testimonial: IndustryTestimonial
  name: string
  ctaLabelTemplate: string
  ctaHref: string
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
          <blockquote className="mx-auto mt-2 max-w-3xl text-xl leading-snug font-light wrap-break-word md:text-2xl lg:text-3xl">
            {testimonial.quote}
          </blockquote>
          <footer className="mt-8 flex items-center justify-center gap-3">
            <span aria-hidden className="block h-px w-8 shrink-0 bg-accent" />
            <div className="max-w-sm min-w-0">
              <p className="text-sm font-medium wrap-break-word">
                {testimonial.author}
              </p>
              <p className="mt-0.5 text-xs wrap-break-word text-foreground/60">
                {testimonial.role}
              </p>
            </div>
          </footer>

          <div className="mt-10">
            <Button asChild variant="secondary" size="lg">
              <Link href={ctaHref}>
                {interpolateIndustryTemplate(
                  ctaLabelTemplate,
                  name.toLowerCase()
                )}
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
