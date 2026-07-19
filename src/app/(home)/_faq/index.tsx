"use client"

import Link from "next/link"
import { CircleHelp, MoveUpRight } from "lucide-react"
import { motion } from "motion/react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/common/shadcnUI/accordion"
import { Badge } from "@/common/shadcnUI/badge"

import { params } from "./params"

const EASE_OUT = [0.23, 1, 0.32, 1] as const

function Faq() {
  return (
    <section id="faq" className="section-padding">
      <div className="container">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <FaqHeader />
          <FaqList />
        </div>
      </div>
    </section>
  )
}

function FaqHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: EASE_OUT }}
      className="relative lg:sticky lg:top-28 lg:self-start"
    >
      <div className="flex items-start justify-between gap-4">
        <Badge variant="outline" size="lg">
          <span className="size-1 rounded-full bg-foreground/40" />
          {params.badge}
          <span className="size-1 rounded-full bg-foreground/40" />
        </Badge>
        <FaqMark />
      </div>

      <h2 className="mt-8 text-3xl leading-[1.05] font-light tracking-tight md:text-4xl lg:text-5xl">
        {params.heading}
      </h2>

      <p className="mt-6 max-w-md text-base text-muted-foreground">
        {params.description}
      </p>

      <ContactBridge />
    </motion.div>
  )
}

function ContactBridge() {
  return (
    <div className="mt-10 border-t pt-6">
      <p className="text-sm text-muted-foreground">
        {params.contactBridge.prompt}
      </p>
      <Link
        href={params.contactBridge.href}
        className="group/bridge mt-1.5 inline-flex items-center gap-2 text-sm tracking-tight text-foreground transition-colors"
      >
        <span className="border-b border-transparent transition-colors group-hover/bridge:border-foreground">
          {params.contactBridge.ctaLabel}
        </span>
        <MoveUpRight className="size-3.5 text-accent transition-transform group-hover/bridge:translate-x-0.5 group-hover/bridge:-translate-y-0.5" />
      </Link>
    </div>
  )
}

function FaqList() {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="item-0"
      variant="stacked"
    >
      {params.faqs.map((f, i) => (
        <AccordionItem key={i} value={`item-${i}`}>
          <AccordionTrigger>{f.q}</AccordionTrigger>
          <AccordionContent>{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

function FaqMark() {
  return (
    <CircleHelp
      aria-hidden
      className="size-6 text-foreground/40"
      strokeWidth={1}
    />
  )
}

export default Faq
