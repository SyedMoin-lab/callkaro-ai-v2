"use client"

import Image from "next/image"
import { motion } from "motion/react"

import Eyebrow from "@/common/elements/eyebrow"
import { cn } from "@/lib/utils"

import { type HeroCell as Cell, params as pageParams } from "../params"

const params = pageParams.hero

const EASE_OUT = [0.23, 1, 0.32, 1] as const

function AboutHero() {
  return (
    <section>
      <div className="hero-padding container">
        <div className="grid items-end gap-10 lg:grid-cols-[1.8fr_1fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE_OUT }}
          >
            <Eyebrow>{params.eyebrow}</Eyebrow>
            <h1 className="mt-8 text-5xl leading-[0.95] font-light tracking-tight md:text-7xl lg:text-8xl">
              {params.heading.line1} <br className="hidden md:block" />
              {params.heading.line2}
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE_OUT, delay: 0.15 }}
            className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            {params.body}
          </motion.p>
        </div>
      </div>

      <CellRow tone="dark" cells={params.rowDark} />
      <CellRow tone="warm" cells={params.rowWarm} />
    </section>
  )
}

function CellRow({ tone, cells }: { tone: "dark" | "warm"; cells: Cell[] }) {
  const isDark = tone === "dark"
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
        isDark
          ? "dark bg-background text-foreground"
          :
            "bg-[oklch(0.92_0.05_18)] text-foreground [--foreground:oklch(0.24_0.06_12)]"
      )}
    >
      {cells.map((cell, i) =>
        cell.type === "stat" ? (
          <StatCell key={i} cell={cell} index={i} />
        ) : (
          <ImageCell key={i} cell={cell} index={i} />
        )
      )}
    </div>
  )
}

function StatCell({
  cell,
  index,
}: {
  cell: Extract<Cell, { type: "stat" }>
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: EASE_OUT, delay: index * 0.08 }}
      className="flex aspect-square flex-col justify-between gap-10 p-8 md:p-10 lg:p-12"
    >
      <Eyebrow tone="muted">{cell.eyebrow}</Eyebrow>
      <div>
        <p className="text-5xl leading-none font-light tracking-tight md:text-6xl lg:text-7xl">
          {cell.value}
        </p>
        <p className="mt-6 max-w-[32ch] text-sm leading-relaxed text-foreground/70 md:text-base">
          {cell.body}
        </p>
      </div>
    </motion.div>
  )
}

function ImageCell({
  cell,
  index,
}: {
  cell: Extract<Cell, { type: "image" }>
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.75, ease: EASE_OUT, delay: index * 0.08 }}
      className="relative aspect-square overflow-hidden"
    >
      <Image
        src={cell.src}
        alt={cell.alt}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover"
      />
    </motion.div>
  )
}

export default AboutHero
