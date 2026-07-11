import Image from "next/image"
import Link from "next/link"
import { MoveUpRight } from "lucide-react"

import Eyebrow from "@/components/elements/eyebrow"
import { Button } from "@/components/ui/button"

function Cta() {
  return (
    <section className="section-padding bg-[oklch(0.97_0.012_85)]">
      <div className="container">
        <div className="grid gap-10 overflow-hidden rounded-lg border border-foreground/10 bg-[oklch(0.99_0.008_90)] shadow-md md:grid-cols-[1.2fr_1fr]">
          <div className="flex flex-col justify-between p-8 md:p-14">
            <Eyebrow>Let&apos;s talk</Eyebrow>

            <div className="mt-10 md:mt-14">
              <h2 className="text-4xl leading-[1.05] font-light tracking-tight md:text-5xl lg:text-6xl">
                Take the first step today.
              </h2>
              <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
                The sooner you start, the more options you have &mdash; and the
                better prepared you&apos;ll be to protect what matters.
              </p>
            </div>

            <div className="mt-12 md:mt-16">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Book a consultation
                  <MoveUpRight className="size-4" strokeWidth={1.5} />
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative min-h-72 md:min-h-[32rem]">
            <Image
              src="/images/cta/seal-01.png"
              alt="Burgundy wax seal embossed with a serif V on a cream envelope, beside a brass fountain pen"
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
