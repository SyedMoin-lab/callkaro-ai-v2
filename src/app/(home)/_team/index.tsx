"use client"

import { useState } from "react"
import Link from "next/link"
import { MoveRight, Scan } from "lucide-react"
import { motion } from "motion/react"

import SectionHeader from "@/common/elements/sectionHeader"
import { Button } from "@/common/shadcnUI/button"
import { cn } from "@/lib/utils"

import { params } from "./params"

const team = params.team

type Member = (typeof team)[number]

const EASE = [0.22, 1, 0.36, 1] as const

const slots = [
  "md:col-start-1 md:row-start-1",
  "md:col-start-7 md:row-start-1",
  "md:col-start-10 md:row-start-1",
  "md:col-start-1 md:row-start-2",
  "md:col-start-4 md:row-start-2",
  "md:col-start-10 md:row-start-2",
]

function Team() {
  return (
    <section className="section-padding overflow-hidden">
      <div className="container">
        <SectionHeader
          badge={params.badge}
          heading={<>{params.heading}</>}
          description={params.description}
          mark={
            <Scan
              aria-hidden
              className="size-10 text-foreground/30"
              strokeWidth={1}
            />
          }
        />
      </div>

      <div className="container mt-12 md:mt-16 lg:mt-20">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-12 md:gap-5">
          {team.map((p, i) => (
            <MemberCard key={p.id} p={p} index={i} className={slots[i]} />
          ))}
        </div>

        <div className="mt-10 flex justify-center md:mt-14">
          <Button size="lg" variant="secondary" asChild>
            <Link href={params.cta.href}>
              {params.cta.label}
              <MoveRight className="size-5" strokeWidth={1.25} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

function MemberCard({
  p,
  index,
  className,
}: {
  p: Member
  index: number
  className?: string
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: EASE, delay: (index % 3) * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      tabIndex={0}
      aria-label={`${p.name}, ${p.role}, ${p.practice}`}
      className={cn(
        "group relative aspect-[3/4] overflow-hidden rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:col-span-3",
        className
      )}
    >
      <motion.img
        src={p.portrait}
        alt={p.name}
        animate={{ scale: hovered ? 1.04 : 1 }}
        transition={{ duration: 0.3, ease: EASE }}
        className="absolute inset-0 size-full object-cover"
      />

      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-t from-black/95 via-black/30 to-transparent"
      />

      <div className="absolute inset-x-0 bottom-0 p-3 text-white sm:p-5 md:p-6">
        <motion.div
          animate={{ y: hovered ? -6 : 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <h3 className="text-sm leading-tight font-light tracking-tight sm:text-xl md:text-2xl lg:text-[1.75rem]">
            {p.name}
          </h3>
          <p className="mt-1 font-mono text-[0.55rem] tracking-[0.15em] text-white/70 uppercase sm:mt-2 sm:text-[0.625rem] sm:tracking-[0.2em]">
            {p.role}
          </p>
        </motion.div>

        <motion.div
          aria-hidden={!hovered}
          initial={false}
          animate={{
            height: hovered ? "auto" : 0,
            opacity: hovered ? 1 : 0,
            marginTop: hovered ? "0.6rem" : 0,
          }}
          transition={{ duration: 0.45, ease: EASE }}
          className="overflow-hidden"
        >
          <div className="flex items-center gap-2.5 font-mono text-[0.625rem] tracking-[0.2em] text-white/85 uppercase">
            <span aria-hidden className="block h-px w-5 bg-accent" />
            {p.practice}
          </div>
        </motion.div>
      </div>
    </motion.article>
  )
}

export default Team
