"use client"

import { useState } from "react"
import { Maximize2, Quote, X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { Dialog as DialogPrimitive } from "radix-ui"

import SectionHeader from "@/common/elements/sectionHeader"
import {
  Dialog,
  DialogClose,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/common/shadcnUI/dialog"
import { cn } from "@/lib/utils"

function AffordanceHint() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute top-2 right-2 z-20 grid size-7 place-items-center rounded-full bg-background/80 text-foreground/80 ring-1 ring-foreground/10 backdrop-blur transition-transform duration-300 group-hover:scale-110"
    >
      <Maximize2 className="size-3.5" strokeWidth={1.5} />
    </span>
  )
}

export const endorsements = [
  {
    quote:
      "CallKaro's voice agents answer every support call the moment it rings, day or night. Our customers get instant answers and our team finally stopped drowning in the queue.",
    role: "Head of Customer Support",
    sector: "E-commerce Brand",
    sectorShort: "E-commerce",
    matter: "Inbound support · 2025",
    portrait:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
  },
  {
    quote:
      "The AI calls every patient to confirm their appointment and reschedules the no-shows on its own. Our front desk went from overwhelmed to calm in a single week.",
    role: "Operations Director",
    sector: "Healthcare Network",
    sectorShort: "Healthcare",
    matter: "Appointment reminders · 2025",
    portrait:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
  },
  {
    quote:
      "We went from a few hundred outbound calls a day to millions a month without adding a single agent. CallKaro simply scaled with us.",
    role: "VP Operations",
    sector: "Logistics Company",
    sectorShort: "Logistics",
    matter: "Outbound · 2025",
    portrait:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
  },
  {
    quote:
      "Ninety percent of our enrollment calls are now handled start to finish by the AI, and it books the demo before the student even hangs up.",
    role: "Founder",
    sector: "EdTech Platform",
    sectorShort: "EdTech",
    matter: "Bookings · 2025",
    portrait:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
  },
  {
    quote:
      "Our callers switch between three languages and the AI never misses a beat. It transfers to a human only when it truly needs to, and that is rare.",
    role: "Customer Experience Lead",
    sector: "Insurance Provider",
    sectorShort: "Insurance",
    matter: "Multilingual · 2025",
    portrait:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
  },
  {
    quote:
      "The payment reminder calls run themselves and our collection rate climbed within the first month. It paid for itself before we even finished onboarding.",
    role: "VP Collections",
    sector: "Lending Firm",
    sectorShort: "Lending",
    matter: "Payment reminders · 2025",
    portrait:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
  },
]

type Endorsement = (typeof endorsements)[number]

const EASE_OUT = [0.23, 1, 0.32, 1] as const
const EASE_IN_OUT = [0.77, 0, 0.175, 1] as const

type Cell =
  | { kind: "portrait"; index: number }
  | { kind: "stat"; idx: number }
  | { kind: "chip"; index: number }
  | { kind: "scene"; idx: number }
  | { kind: "empty" }

const CELLS: Cell[] = [
  { kind: "portrait", index: 0 },
  { kind: "empty" },
  { kind: "chip", index: 3 },
  { kind: "stat", idx: 0 },
  { kind: "portrait", index: 1 },
  { kind: "empty" },
  { kind: "scene", idx: 0 },
  { kind: "empty" },
  { kind: "portrait", index: 4 },
  { kind: "empty" },
  { kind: "chip", index: 5 },
  { kind: "stat", idx: 1 },
  { kind: "empty" },
  { kind: "scene", idx: 1 },
  { kind: "stat", idx: 2 },
]

const STATS = [
  {
    number: "2M+",
    label: "Calls automated",
    sub: "Outbound · 2025",
    tone: "brass" as const,
    linkTo: 2,
  },
  {
    number: "90%",
    label: "Resolved by AI",
    sub: "No human needed",
    tone: "dark" as const,
  },
  {
    number: "24/7",
    label: "Always on",
    sub: "Every call",
    tone: "card" as const,
  },
]

const CHIPS: Array<{ text: string; tone: "card" | "dark" }> = [
  { text: "“Handled start to finish.”", tone: "card" },
  { text: "“Paid for itself in a month.”", tone: "dark" },
]

const SCENES = [
  {
    src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80",
    caption: "Live calls",
  },
  {
    src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80",
    caption: "The result",
  },
]

function Endorsements() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const active = activeIndex !== null ? endorsements[activeIndex] : null

  return (
    <section id="testimonials" className="section-padding overflow-hidden">
      <div className="container">
        <SectionHeader
          badge="Testimonials"
          heading={<>What our customers say.</>}
          description="Most of our calls run without a human in the loop. With permission, these are some of the customers CallKaro AI helps every day, in their own words."
          mark={
            <Quote
              aria-hidden
              className="size-10 text-foreground/30"
              strokeWidth={1}
            />
          }
        />
      </div>

      <div className="container mt-12 md:mt-16 lg:mt-20">
        <div className="grid grid-cols-3 gap-2.5 md:grid-cols-5 md:gap-3">
          {CELLS.map((cell, i) => {
            const delay = (i % 5) * 0.04 + Math.floor(i / 5) * 0.06
            if (cell.kind === "portrait") {
              return (
                <PortraitTile
                  key={i}
                  index={cell.index}
                  activeIndex={activeIndex}
                  onOpen={setActiveIndex}
                  staggerDelay={delay}
                />
              )
            }
            if (cell.kind === "stat") {
              const s = STATS[cell.idx]
              const linkTo = "linkTo" in s ? s.linkTo : undefined
              return (
                <StatTile
                  key={i}
                  number={s.number}
                  label={s.label}
                  sub={s.sub}
                  tone={s.tone}
                  layoutId={
                    linkTo !== undefined ? `endorsement-${linkTo}` : undefined
                  }
                  onClick={
                    linkTo !== undefined
                      ? () => setActiveIndex(linkTo)
                      : undefined
                  }
                  isActive={linkTo !== undefined && activeIndex === linkTo}
                  isDimmed={
                    linkTo !== undefined &&
                    activeIndex !== null &&
                    activeIndex !== linkTo
                  }
                  staggerDelay={delay}
                  showHint={linkTo !== undefined}
                />
              )
            }
            if (cell.kind === "chip") {
              const c = CHIPS[cell.index === 3 ? 0 : 1]
              return (
                <ChipTile
                  key={i}
                  index={cell.index}
                  text={c.text}
                  tone={c.tone}
                  activeIndex={activeIndex}
                  onOpen={setActiveIndex}
                  staggerDelay={delay}
                />
              )
            }
            if (cell.kind === "scene") {
              const s = SCENES[cell.idx]
              return (
                <SceneTile
                  key={i}
                  src={s.src}
                  caption={s.caption}
                  staggerDelay={delay}
                />
              )
            }
            return <EmptyCell key={i} />
          })}
        </div>
      </div>

      <Dialog
        open={activeIndex !== null}
        onOpenChange={(open) => {
          if (!open) setActiveIndex(null)
        }}
      >
        <DialogPortal forceMount>
          <AnimatePresence>
            {active && activeIndex !== null && (
              <QuoteModal e={active} index={activeIndex} />
            )}
          </AnimatePresence>
        </DialogPortal>
      </Dialog>
    </section>
  )
}

function PortraitTile({
  index,
  activeIndex,
  onOpen,
  staggerDelay,
}: {
  index: number
  activeIndex: number | null
  onOpen: (i: number) => void
  staggerDelay: number
}) {
  const e = endorsements[index]
  const isActive = activeIndex === index
  const isDimmed = activeIndex !== null && !isActive

  return (
    <motion.button
      type="button"
      layoutId={`endorsement-${index}`}
      onClick={() => onOpen(index)}
      aria-pressed={isActive}
      aria-label={`Endorsement from ${e.role}, ${e.sector}`}
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      animate={{ opacity: isDimmed ? 0.3 : 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        opacity: { duration: 0.3, ease: EASE_OUT },
        y: { duration: 0.4, ease: EASE_OUT, delay: staggerDelay },
        layout: { duration: 0.5, ease: EASE_IN_OUT },
      }}
      whileHover={{ scale: isActive ? 1 : 1.05 }}
      whileTap={{ scale: 0.96 }}
      className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl ring-1 ring-foreground/8 outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <motion.div
        layoutId={`endorsement-image-${index}`}
        transition={{ duration: 0.5, ease: EASE_IN_OUT }}
        className="absolute inset-0 overflow-hidden"
      >
        <motion.img
          layout
          src={e.portrait}
          alt=""
          transition={{ duration: 0.5, ease: EASE_IN_OUT }}
          className="size-full object-cover grayscale transition-[filter] duration-300 group-hover:grayscale-0"
        />
      </motion.div>
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-t from-black/70 via-black/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-1.5 text-center font-mono text-[0.5rem] tracking-[0.2em] text-white uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      >
        {e.sectorShort}
      </span>
      <AffordanceHint />
    </motion.button>
  )
}

function StatTile({
  number,
  label,
  sub,
  tone,
  layoutId,
  onClick,
  isActive,
  isDimmed,
  staggerDelay,
  showHint,
}: {
  number: string
  label: string
  sub?: string
  tone: "brass" | "dark" | "card"
  layoutId?: string
  onClick?: () => void
  isActive?: boolean
  isDimmed?: boolean
  staggerDelay: number
  showHint?: boolean
}) {
  const Cmp = onClick ? motion.button : motion.div
  return (
    <Cmp
      type={onClick ? "button" : undefined}
      layoutId={layoutId}
      onClick={onClick}
      aria-label={onClick ? `${label}, open quote` : undefined}
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      animate={{ opacity: isDimmed ? 0.3 : 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        opacity: { duration: 0.3, ease: EASE_OUT },
        y: { duration: 0.4, ease: EASE_OUT, delay: staggerDelay },
        layout: { duration: 0.5, ease: EASE_IN_OUT },
      }}
      whileHover={onClick ? { scale: isActive ? 1 : 1.015 } : undefined}
      whileTap={onClick ? { scale: 0.985 } : undefined}
      className={cn(
        "group relative flex aspect-square flex-col justify-between rounded-xl p-4 text-left ring-1 outline-none md:p-5",
        onClick &&
          "cursor-pointer focus-visible:ring-2 focus-visible:ring-ring",
        tone === "brass" &&
          "bg-[oklch(0.8_0.08_16)] text-foreground ring-foreground/10",
        tone === "dark" && "bg-black text-white ring-white/10",
        tone === "card" && "bg-card text-foreground ring-foreground/8"
      )}
    >
      <span
        className={cn(
          "font-mono text-[0.5rem] tracking-[0.25em] uppercase",
          tone === "dark" ? "text-white/65" : "text-foreground/65"
        )}
      >
        {label}
      </span>
      <span className="text-4xl leading-[0.85] font-light tracking-tight md:text-5xl lg:text-6xl">
        {number}
      </span>
      {sub && (
        <span
          className={cn(
            "flex items-center gap-1.5 font-mono text-[0.5rem] tracking-[0.2em] uppercase",
            tone === "dark" ? "text-white/65" : "text-foreground/65"
          )}
        >
          <span
            aria-hidden
            className={cn(
              "block h-px w-4",
              tone === "dark" ? "bg-accent" : "bg-foreground/40"
            )}
          />
          {sub}
        </span>
      )}
      {showHint && <AffordanceHint />}
    </Cmp>
  )
}

function ChipTile({
  index,
  text,
  tone,
  activeIndex,
  onOpen,
  staggerDelay,
}: {
  index: number
  text: string
  tone: "card" | "dark"
  activeIndex: number | null
  onOpen: (i: number) => void
  staggerDelay: number
}) {
  const e = endorsements[index]
  const isActive = activeIndex === index
  const isDimmed = activeIndex !== null && !isActive
  const isDark = tone === "dark"

  return (
    <motion.button
      type="button"
      layoutId={`endorsement-${index}`}
      onClick={() => onOpen(index)}
      aria-pressed={isActive}
      aria-label={`Endorsement from ${e.role}, ${e.sector}`}
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      animate={{ opacity: isDimmed ? 0.3 : 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        opacity: { duration: 0.3, ease: EASE_OUT },
        y: { duration: 0.4, ease: EASE_OUT, delay: staggerDelay },
        layout: { duration: 0.5, ease: EASE_IN_OUT },
      }}
      whileHover={{ scale: isActive ? 1 : 1.015 }}
      whileTap={{ scale: 0.985 }}
      className={cn(
        "group relative flex aspect-square cursor-pointer flex-col justify-between rounded-xl p-4 text-left ring-1 outline-none focus-visible:ring-2 focus-visible:ring-ring md:p-5",
        isDark
          ? "bg-black text-white ring-white/10"
          : "bg-card text-foreground ring-foreground/8"
      )}
    >
      <span
        aria-hidden
        className={cn(
          "block leading-none font-light",
          isDark ? "text-accent" : "text-foreground/70"
        )}
        style={{ fontSize: "1.5rem" }}
      >
        &ldquo;
      </span>
      <span
        className={cn(
          "text-base leading-snug font-light lg:text-lg",
          isDark ? "text-white" : "text-foreground"
        )}
      >
        {text}
      </span>
      <span
        className={cn(
          "flex items-center gap-1.5 font-mono text-[0.5rem] tracking-[0.2em] uppercase",
          isDark ? "text-white/65" : "text-foreground/65"
        )}
      >
        <span
          aria-hidden
          className={cn(
            "block h-px w-4",
            isDark ? "bg-accent" : "bg-foreground/40"
          )}
        />
        {e.sectorShort}
      </span>
      <AffordanceHint />
    </motion.button>
  )
}

function SceneTile({
  src,
  caption,
  staggerDelay,
}: {
  src: string
  caption: string
  staggerDelay: number
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.4, ease: EASE_OUT, delay: staggerDelay }}
      className="group relative aspect-square overflow-hidden rounded-xl ring-1 ring-foreground/8"
    >
      <motion.img
        src={src}
        alt=""
        whileHover={{ scale: 1.04 }}
        transition={{ duration: 0.4, ease: EASE_OUT }}
        className="absolute inset-0 size-full object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent"
      />
      <figcaption className="absolute inset-x-0 bottom-0 flex items-center gap-1.5 p-3 font-mono text-[0.5rem] tracking-[0.2em] text-white/85 uppercase md:p-4">
        <span aria-hidden className="block h-px w-3 bg-accent" />
        {caption}
      </figcaption>
    </motion.figure>
  )
}

function EmptyCell() {
  return (
    <div
      aria-hidden
      className="aspect-square rounded-xl ring-1 ring-foreground/[0.07]"
    />
  )
}

function QuoteModal({ e, index }: { e: Endorsement; index: number }) {
  return (
    <>
      <DialogOverlay asChild forceMount>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE_OUT }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        />
      </DialogOverlay>

      <DialogPrimitive.Content
        asChild
        forceMount
        aria-describedby={undefined}
        onOpenAutoFocus={(ev) => ev.preventDefault()}
      >
        <motion.article
          layoutId={`endorsement-${index}`}
          transition={{ layout: { duration: 0.5, ease: EASE_IN_OUT } }}
          className="fixed top-1/2 left-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl bg-foreground shadow-2xl ring-1 ring-foreground/10 outline-none"
        >
          <DialogTitle className="sr-only">
            Endorsement from {e.role}, {e.sector}
          </DialogTitle>

          <motion.div
            layoutId={`endorsement-image-${index}`}
            className="absolute inset-0 overflow-hidden"
            transition={{ duration: 0.5, ease: EASE_IN_OUT }}
          >
            <motion.img
              layout
              src={e.portrait}
              alt=""
              transition={{ duration: 0.5, ease: EASE_IN_OUT }}
              className="size-full object-cover object-top"
            />
          </motion.div>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 max-h-[400px]"
          >
            <div className="absolute inset-0 mask-t-from-58% backdrop-blur-[1px]" />
            <div className="absolute inset-0 mask-t-from-38% backdrop-blur-[3px]" />
            <div className="absolute inset-0 mask-t-from-20% backdrop-blur-[5px]" />
            <div className="absolute inset-0 mask-t-from-6% backdrop-blur-[8px]" />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/45 via-45% to-transparent" />
          </div>

          <DialogClose
            aria-label="Close"
            className="absolute top-4 right-4 z-20 grid size-9 place-items-center rounded-full bg-white/15 text-white shadow-md ring-1 ring-white/25 backdrop-blur transition-transform duration-150 hover:bg-white/25 active:scale-95"
          >
            <X aria-hidden className="size-4" strokeWidth={1.5} />
          </DialogClose>

          <div className="relative flex flex-col justify-end">
            <div aria-hidden className="aspect-[16/9]" />
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.2 }}
              className="p-8 md:p-12"
            >
              <span
                aria-hidden
                className="block text-5xl leading-none font-light text-accent md:text-6xl lg:text-7xl"
              >
                &ldquo;
              </span>
              <blockquote className="mt-2 text-lg leading-snug font-light text-white md:text-xl lg:text-2xl">
                {e.quote}
              </blockquote>
              <footer className="mt-8 flex items-center gap-4">
                <span aria-hidden className="block h-px w-10 bg-accent" />
                <div className="space-y-1">
                  <div className="font-mono text-[0.625rem] tracking-[0.2em] text-white uppercase">
                    {e.role}
                  </div>
                  <div className="font-mono text-[0.5625rem] tracking-[0.2em] text-white/60 uppercase">
                    {e.sector} &middot; {e.matter}
                  </div>
                </div>
              </footer>
            </motion.div>
          </div>
        </motion.article>
      </DialogPrimitive.Content>
    </>
  )
}

export default Endorsements
