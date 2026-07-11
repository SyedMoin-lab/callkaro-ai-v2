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

const FAQS = [
  {
    q: "How fast can we go live?",
    a: "Most teams launch in days, not months. We help you script your first agent, connect your systems, and run test calls, so you can be handling real conversations within a week.",
  },
  {
    q: "Does it actually sound human?",
    a: "Our voices are natural and low latency, so callers hear real pauses, interruptions, and back-and-forth instead of a rigid menu. Most people carry on a normal conversation without realizing they are talking to an AI agent.",
  },
  {
    q: "Which languages and accents are supported?",
    a: "The platform speaks 20+ languages and can switch mid-call when a caller does. You can also choose regional accents so the voice sounds local to the people you are calling.",
  },
  {
    q: "How does it connect to our CRM and calendar?",
    a: "Agents connect to your CRM, calendar, and internal tools through APIs and custom functions. That lets them book appointments, look up account details, and log every call automatically, with no manual data entry.",
  },
  {
    q: "What happens when the AI can't handle a call?",
    a: "When a call needs a person, the agent transfers it to the right team member and passes along full context, including the transcript and reason for the handoff. Nobody has to repeat themselves and no lead falls through the cracks.",
  },
  {
    q: "How is our call data and compliance handled?",
    a: "Every call is recorded, transcribed, and stored securely, so you have a full audit trail. Agents stay on-script and follow your compliance rules, and access is limited to the people on your team who need it.",
  },
]

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
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.7, ease: EASE_OUT }}
      className="relative lg:sticky lg:top-28 lg:self-start"
    >
      <div className="flex items-start justify-between gap-4">
        <Badge variant="outline" size="lg">
          <span className="size-1 rounded-full bg-foreground/40" />
          FAQ
          <span className="size-1 rounded-full bg-foreground/40" />
        </Badge>
        <FaqMark />
      </div>

      <h2 className="mt-8 text-3xl leading-[1.05] font-light tracking-tight md:text-4xl lg:text-5xl">
        Answers about AI calling.
      </h2>

      <p className="mt-6 max-w-md text-base text-muted-foreground">
        Bringing AI voice agents into your business can raise a lot of
        questions, especially if you&apos;re not sure where to start. Here are
        the ones teams ask us most often before getting in touch.
      </p>

      <ContactBridge />
    </motion.div>
  )
}

function ContactBridge() {
  return (
    <div className="mt-10 border-t pt-6">
      <p className="text-sm text-muted-foreground">
        Don&apos;t see your question?
      </p>
      <Link
        href="/contact-us"
        className="group/bridge mt-1.5 inline-flex items-center gap-2 text-sm tracking-tight text-foreground transition-colors"
      >
        <span className="border-b border-transparent transition-colors group-hover/bridge:border-foreground">
          Talk to our team directly
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
      {FAQS.map((f, i) => (
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
