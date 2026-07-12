"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MoveUpRight, Plus } from "lucide-react"

import SectionHeader from "@/common/elements/sectionHeader"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/common/shadcnUI/accordion"
import { cn } from "@/lib/utils"

import { params } from "./params"

const services = params.services

const EASE_LAYOUT = "cubic-bezier(0, 0, 0.2, 1)"

function Services() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)

  const shownIndex = hoverIndex ?? activeIndex
  const gridTemplate = services
    .map((_, i) => (i === shownIndex ? "3fr" : "1fr"))
    .join(" ")

  return (
    <section id="practice-areas" className="section-padding">
      <div className="container">
        <SectionHeader
          badge={params.badge}
          heading={params.heading}
          description={params.description}
          mark={
            <Plus
              aria-hidden
              className="size-10 text-foreground/30"
              strokeWidth={1}
            />
          }
        />

        <div className="dark mt-12 hidden overflow-hidden rounded-xl bg-background text-foreground md:mt-16 md:block lg:mt-20">
          <ul
            role="tablist"
            aria-label="Capabilities"
            className="relative grid h-[28rem] gap-[3px] motion-safe:transition-[grid-template-columns] motion-safe:duration-500 md:h-[36rem]"
            style={{
              gridTemplateColumns: gridTemplate,
              transitionTimingFunction: EASE_LAYOUT,
            }}
            onMouseLeave={() => setHoverIndex(null)}
          >
            {services.map((s, i) => {
              const isActive = i === activeIndex
              const isShown = i === shownIndex
              return (
                <li
                  key={s.roman}
                  className="relative h-full min-w-0 overflow-hidden"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Volume ${s.roman}: ${s.title}`}
                    onClick={() => setActiveIndex(i)}
                    onMouseEnter={() => setHoverIndex(i)}
                    onFocus={() => setHoverIndex(i)}
                    onBlur={() => setHoverIndex(null)}
                    className="relative block size-full text-left focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:outline-none focus-visible:ring-inset"
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-0 z-10 bg-linear-to-b from-card via-card to-background transition-opacity duration-300 ease-out",
                        isShown
                          ? "pointer-events-none opacity-0"
                          : "opacity-100"
                      )}
                    >
                      <span
                        aria-hidden
                        className="absolute inset-y-0 left-0 w-px bg-foreground/15"
                      />
                      <span
                        aria-hidden
                        className="absolute inset-y-0 right-0 w-px bg-background/40"
                      />
                      <span
                        aria-hidden
                        className="absolute inset-x-2 top-10 h-px bg-foreground/15"
                      />
                      <span
                        aria-hidden
                        className="absolute inset-x-2 top-12 h-px bg-foreground/15"
                      />
                      <span
                        aria-hidden
                        className="absolute inset-x-2 bottom-10 h-px bg-foreground/15"
                      />
                      <span
                        aria-hidden
                        className="absolute inset-x-2 bottom-12 h-px bg-foreground/15"
                      />

                      <span className="absolute top-16 left-1/2 -translate-x-1/2 text-xl font-light tracking-widest text-foreground/70 md:text-2xl">
                        {s.roman}
                      </span>

                      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-180 text-sm font-light tracking-[0.25em] whitespace-nowrap text-foreground/90 uppercase [writing-mode:vertical-rl] md:text-base">
                        {s.title}
                      </span>

                      <span className="absolute bottom-16 left-1/2 -translate-x-1/2 font-mono text-[0.625rem] tracking-widest text-foreground/40">
                        CALLKARO &middot; {String(i + 1).padStart(2, "0")}
                      </span>
                    </span>

                    <span aria-hidden={!isShown} className="absolute inset-0">
                      <Image
                        src={s.image}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 60vw, 100vw"
                        className="object-cover"
                      />
                      <span
                        aria-hidden
                        className="absolute inset-0 [mask-image:linear-gradient(to_top,black,transparent_85%)] backdrop-blur-md"
                      />
                      <span
                        aria-hidden
                        className="absolute inset-0 bg-linear-to-t from-background/85 via-background/40 to-transparent"
                      />
                      <span className="absolute inset-x-0 bottom-0 overflow-hidden">
                        <span
                          className={cn(
                            "block space-y-2 p-5 transition-transform duration-500 ease-out",
                            isShown
                              ? "translate-y-0"
                              : "motion-safe:translate-y-full"
                          )}
                        >
                          <span
                            className={cn(
                              "block font-mono text-[0.625rem] tracking-widest text-foreground/60 uppercase transition-[opacity,transform] duration-500 ease-out",
                              isShown
                                ? "translate-y-0 opacity-100 delay-100"
                                : "opacity-0 motion-safe:translate-y-6"
                            )}
                          >
                            {isActive ? "Selected" : "Volume"} {s.roman}
                          </span>
                          <span
                            className={cn(
                              "block text-xl leading-tight font-medium tracking-tight transition-[opacity,transform] duration-500 ease-out md:text-2xl",
                              isShown
                                ? "translate-y-0 opacity-100"
                                : "opacity-0 motion-safe:translate-y-8"
                            )}
                          >
                            {s.title}
                          </span>
                          <span
                            className={cn(
                              "block max-w-md text-xs leading-snug text-foreground/75 transition-[opacity,transform] duration-500 ease-out md:text-sm",
                              isShown
                                ? "translate-y-0 opacity-100 delay-200"
                                : "opacity-0 motion-safe:translate-y-8"
                            )}
                          >
                            {s.summary}
                          </span>
                        </span>
                      </span>
                    </span>
                  </button>

                  {isShown && (
                    <Link
                      href={`/services/${s.slug}`}
                      aria-label={`Read more about ${s.title}`}
                      className="group/cta absolute top-5 right-5 z-10 grid size-10 place-items-center rounded-full bg-foreground/10 text-foreground backdrop-blur-sm transition-colors hover:bg-foreground/20 focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:outline-none"
                    >
                      <MoveUpRight
                        className="size-4 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                        strokeWidth={1.5}
                      />
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>

          <div
            aria-hidden
            className="relative mt-1 h-2 bg-linear-to-b from-foreground/30 via-foreground/10 to-transparent"
          />
        </div>

        <div className="dark mt-12 overflow-hidden rounded-xl bg-background text-foreground md:hidden">
          <ServicesAccordion
            activeIndex={activeIndex}
            onSelect={setActiveIndex}
          />
        </div>

        <p className="mt-12 hidden max-w-md font-mono text-[0.625rem] tracking-widest text-muted-foreground uppercase md:block">
          {params.hoverHint.desktop}
        </p>
        <p className="mt-8 max-w-md font-mono text-[0.625rem] tracking-widest text-muted-foreground uppercase md:hidden">
          {params.hoverHint.mobile}
        </p>
      </div>
    </section>
  )
}

type MobileProps = {
  activeIndex: number
  onSelect: (i: number) => void
}

function ServicesAccordion({ activeIndex, onSelect }: MobileProps) {
  const activeValue = services[activeIndex]?.roman ?? services[0].roman
  return (
    <Accordion
      type="single"
      value={activeValue}
      onValueChange={(v) => {
        if (!v) return
        const i = services.findIndex((s) => s.roman === v)
        if (i >= 0) onSelect(i)
      }}
      className="rounded-none border-0"
    >
      {services.map((s) => (
        <AccordionItem
          key={s.roman}
          value={s.roman}
          className="border-foreground/10"
        >
          <AccordionTrigger className="items-center gap-4 px-5 py-5 text-base font-medium tracking-tight hover:no-underline">
            <span className="inline-block min-w-[1.75rem] shrink-0 font-mono text-xs tracking-widest text-foreground/55 group-aria-expanded/accordion-trigger:text-foreground">
              {s.roman}
            </span>
            <span className="flex-1 text-left text-foreground/80 group-aria-expanded/accordion-trigger:text-foreground">
              {s.title}
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-0 pb-0">
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={s.image}
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
              />
              <Link
                href={`/services/${s.slug}`}
                aria-label={`Read more about ${s.title}`}
                className="group/cta absolute top-4 right-4 z-10 grid size-10 place-items-center rounded-full bg-foreground/10 text-foreground backdrop-blur-sm transition-colors hover:bg-foreground/20 focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:outline-none"
              >
                <MoveUpRight
                  className="size-4 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                  strokeWidth={1.5}
                />
              </Link>
            </div>
            <div className="space-y-3 p-5">
              <span className="block font-mono text-[0.625rem] tracking-widest text-foreground/55 uppercase">
                Selected &middot; Volume {s.roman}
              </span>
              <p className="text-sm leading-relaxed text-foreground/80">
                {s.summary}
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default Services
