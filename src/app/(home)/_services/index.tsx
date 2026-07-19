"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { MoveUpRight, Plus } from "lucide-react"
import { motion, type MotionValue, useScroll, useTransform } from "motion/react"

import SectionHeader from "@/common/elements/sectionHeader"

import { params } from "./params"

const services = params.services

type Service = (typeof services)[number]

function Services() {
  const stackRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start start", "end end"],
  })

  return (
    <section id="capabilities" className="section-padding">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
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
          </div>

          <div ref={stackRef} className="space-y-8 lg:space-y-10">
            {services.map((service, index) => (
              <StackCard
                key={service.roman}
                service={service}
                index={index}
                total={services.length}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function StackCard({
  service,
  index,
  total,
  progress,
}: {
  service: Service
  index: number
  total: number
  progress: MotionValue<number>
}) {
  const targetScale = 1 - (total - 1 - index) * 0.035
  const scale = useTransform(progress, [index / total, 1], [1, targetScale])

  return (
    <div
      className="lg:sticky"
      style={{ top: `calc(7rem + ${index * 1.25}rem)` }}
    >
      <motion.article
        style={{ scale }}
        className="origin-top overflow-hidden border border-border bg-card shadow-xl ring-1 ring-foreground/5"
      >
        <div className="relative aspect-[16/10]">
          <Image
            src={service.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl leading-tight font-medium tracking-tight text-balance md:text-2xl">
              {service.title}
            </h3>
            <Link
              href={`/services/${service.slug}`}
              aria-label={`Read more about ${service.title}`}
              className="group/cta mt-0.5 grid size-9 shrink-0 place-items-center rounded-full border border-border text-foreground transition-colors hover:bg-foreground/5"
            >
              <MoveUpRight
                className="size-4 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                strokeWidth={1.5}
              />
            </Link>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
            {service.summary}
          </p>
        </div>
      </motion.article>
    </div>
  )
}

export default Services
