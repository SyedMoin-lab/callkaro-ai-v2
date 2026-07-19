"use client"

import Image from "next/image"
import Link from "next/link"
import { MoveUpRight } from "lucide-react"
import { motion } from "motion/react"

import Eyebrow from "@/common/elements/eyebrow"
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/common/shadcnUI/avatar"

import { params as pageParams } from "../params"

const params = pageParams.practice

const EASE_OUT = [0.23, 1, 0.32, 1] as const

function AboutPractice() {
  return (
    <section className="section-padding bg-card">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <Eyebrow>{params.eyebrow}</Eyebrow>
            <h2 className="mt-8 max-w-2xl text-4xl leading-[1.05] font-light tracking-tight md:text-5xl">
              {params.heading.prefix}{" "}
              <span className="text-accent">{params.heading.highlight}</span>
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-muted-foreground md:text-right">
            {params.subheading}
          </p>
        </motion.div>

        <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
          {params.practiceAreas.map((area, i) => (
            <motion.li
              key={area.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, ease: EASE_OUT, delay: i * 0.06 }}
            >
              <Link
                href={`/services/${area.slug}`}
                className="group/card flex h-full flex-col overflow-hidden rounded-xl bg-background ring-1 ring-foreground/10 transition-colors hover:ring-foreground/25"
              >
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src={area.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover/card:scale-105"
                  />
                  <span className="absolute top-4 left-4 font-display text-sm leading-none font-light text-background">
                    {area.roman}
                  </span>
                </div>
                <div className="flex flex-1 items-start justify-between gap-4 p-6">
                  <div>
                    <h3 className="text-lg leading-tight font-light tracking-tight transition-colors group-hover/card:text-accent md:text-xl">
                      {area.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {area.summary}
                    </p>
                  </div>
                  <MoveUpRight
                    className="size-5 shrink-0 text-foreground/30 transition-all group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 group-hover/card:text-accent"
                    strokeWidth={1.5}
                  />
                </div>
              </Link>
            </motion.li>
          ))}

          <motion.li
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.3 }}
          >
            <Link
              href="#team"
              className="group/people flex h-full flex-col justify-between gap-8 rounded-xl bg-foreground p-6 text-background transition-colors hover:bg-foreground/90"
            >
              <p className="text-lg leading-snug font-light tracking-tight transition-transform duration-300 group-hover/people:-translate-y-0.5 md:text-xl">
                {params.peopleCard.text}
              </p>
              <div className="flex items-center justify-between gap-4">
                <AvatarGroup className="translate-x-1 opacity-0 transition-all duration-300 group-hover/people:translate-x-0 group-hover/people:opacity-100">
                  {params.team.map((p) => (
                    <Avatar key={p.name} size="sm">
                      <AvatarImage src={p.src} alt={p.name} />
                      <AvatarFallback>
                        {p.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </AvatarGroup>

                <span className="inline-flex items-center gap-3 text-sm tracking-tight">
                  {params.peopleCard.ctaLabel}
                  <span className="grid size-10 place-items-center rounded-full bg-accent text-accent-foreground transition-transform group-hover/people:translate-x-0.5 group-hover/people:-translate-y-0.5">
                    <MoveUpRight className="size-4" strokeWidth={1.5} />
                  </span>
                </span>
              </div>
            </Link>
          </motion.li>
        </ul>
      </div>
    </section>
  )
}

export default AboutPractice
