"use client"

import Image from "next/image"
import Link from "next/link"
import { LayoutGrid, MoveUpRight } from "lucide-react"
import { motion } from "motion/react"

import SectionHeader from "@/common/elements/sectionHeader"
import { Button } from "@/common/shadcnUI/button"
import { Card } from "@/common/shadcnUI/card"
import type { IndustryFrontmatter } from "@/lib/types"
import { cn } from "@/lib/utils"

const EASE_OUT = [0.23, 1, 0.32, 1] as const

function IndustriesFeatured({
  industries,
}: {
  industries: IndustryFrontmatter[]
}) {
  const featured = industries.slice(0, 2)
  const secondary = industries.slice(2)

  return (
    <>
      <section className="hero-padding overflow-hidden">
        <div className="container">
          <SectionHeader
            badge="Industries"
            heading={<>AI voice agents for every industry.</>}
            description="CallKaro AI adapts to how your business actually takes calls, whatever industry you are in."
            mark={
              <LayoutGrid
                aria-hidden
                className="size-10 text-foreground/30"
                strokeWidth={1}
              />
            }
          />

          <div className="mt-10 md:mt-14">
            <Button asChild variant="outline" size="lg">
              <Link href="/contact-us">
                Talk to our team
                <MoveUpRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding overflow-hidden pt-0">
        <div className="container">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5">
            {featured.map((s, i) => (
              <IndustryTile
                key={s.slug}
                industry={s}
                variant="featured"
                delay={i * 0.06}
              />
            ))}
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-5 md:gap-5 lg:grid-cols-3">
            {secondary.map((s, i) => (
              <IndustryTile
                key={s.slug}
                industry={s}
                variant="secondary"
                delay={(i + 2) * 0.06}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function IndustryTile({
  industry,
  variant,
  delay,
}: {
  industry: IndustryFrontmatter
  variant: "featured" | "secondary"
  delay: number
}) {
  const isFeatured = variant === "featured"
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, ease: EASE_OUT, delay }}
    >
      <Link
        href={`/industries/${industry.slug}`}
        className="group/tile block overflow-hidden rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
        aria-label={industry.name}
      >
        <Card
          variant="image"
          className={cn(
            "relative isolate ring-0",
            isFeatured ? "aspect-4/3 md:aspect-21/9" : "aspect-4/3"
          )}
        >
          <Image
            src={industry.image}
            alt=""
            fill
            sizes={
              isFeatured
                ? "(min-width: 768px) 45vw, 100vw"
                : "(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
            }
            className="object-cover transition duration-500 ease-in-out will-change-transform group-hover/tile:scale-[1.04]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-linear-to-t from-black/80 via-black/15 to-black/35"
          />

          <div
            className={cn(
              "absolute inset-0 flex flex-col justify-between text-white",
              isFeatured ? "p-6 md:p-8" : "p-5 md:p-6"
            )}
          >
            <div className="flex items-start justify-end">
              <span className="grid size-9 place-items-center rounded-full bg-white/12 text-white ring-1 ring-white/25 backdrop-blur-sm transition-transform duration-300 group-hover/tile:translate-x-0.5 group-hover/tile:-translate-y-0.5">
                <MoveUpRight className="size-4" strokeWidth={1.5} />
              </span>
            </div>

            <div>
              <h3
                className={cn(
                  "leading-tight font-light tracking-tight",
                  isFeatured
                    ? "text-2xl md:text-3xl lg:text-4xl"
                    : "text-lg md:text-xl"
                )}
              >
                {industry.name}
              </h3>
              <p
                className={cn(
                  "mt-2 max-w-xs leading-snug text-white/85",
                  isFeatured ? "text-sm md:text-base" : "text-xs md:text-sm"
                )}
              >
                {industry.tagline}
              </p>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  )
}

export default IndustriesFeatured
