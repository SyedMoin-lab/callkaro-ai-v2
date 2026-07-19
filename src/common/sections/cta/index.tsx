import Image from "next/image"
import Link from "next/link"
import { MoveUpRight } from "lucide-react"

import Eyebrow from "@/common/elements/eyebrow"
import { Button } from "@/common/shadcnUI/button"

function Cta() {
  return (
    <section className="section-padding bg-[oklch(0.955_0.02_30)]">
      <div className="container">
        <div className="grid gap-10 overflow-hidden rounded-lg border border-foreground/10 bg-[oklch(0.99_0.006_40)] shadow-md md:grid-cols-[1.2fr_1fr]">
          <div className="flex flex-col justify-between p-8 md:p-14">
            <Eyebrow>Let&apos;s talk</Eyebrow>

            <div className="mt-10 md:mt-14">
              <h2 className="text-4xl leading-[1.05] font-light tracking-tight md:text-5xl lg:text-6xl">
                Take the first step today.
              </h2>
              <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
                The sooner you start, the more options you have, and the better
                prepared you&apos;ll be to protect what matters.
              </p>
            </div>

            <div className="mt-12 md:mt-16">
              <Button size="lg" asChild>
                <Link href="/contact-us">
                  Book a consultation
                  <MoveUpRight className="size-4" strokeWidth={1.5} />
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative min-h-72 md:min-h-[32rem]">
            <Image
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80"
              alt="A team at work in a modern office"
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Cta
