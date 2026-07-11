"use client"

import { type FormEvent, type ReactNode, useCallback, useState } from "react"
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Mail,
  MoveUpRight,
} from "lucide-react"
import { motion } from "motion/react"

import SectionHeader from "@/common/elements/section-header"
import { Button } from "@/common/shadcnUI/button"
import { Field, FieldLabel } from "@/common/shadcnUI/field"
import { Input } from "@/common/shadcnUI/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/common/shadcnUI/select"
import { Textarea } from "@/common/shadcnUI/textarea"
import {
  PRIMARY_OFFICE,
  SUPPORT_EMAIL,
  SUPPORT_EMAIL_HREF,
} from "@/lib/contact"
import { cn } from "@/lib/utils"

const matters = [
  "Lawsuit",
  "Regulations",
  "Business / Deals",
  "Restructuring",
  "Appeal",
]

const jurisdictions = [
  "New York",
  "Washington D.C.",
  "UK",
  "U.S. Trade",
  "Other",
]

const contactMeta = [
  {
    label: "Email",
    value: SUPPORT_EMAIL,
    href: SUPPORT_EMAIL_HREF,
  },
  {
    label: "Direct",
    value: PRIMARY_OFFICE.phone.display,
    href: PRIMARY_OFFICE.phone.href,
  },
  {
    label: "Office",
    value: `${PRIMARY_OFFICE.address.line1}, ${PRIMARY_OFFICE.city}`,
    href: `https://maps.google.com/?q=${encodeURIComponent(
      `${PRIMARY_OFFICE.address.line1}, ${PRIMARY_OFFICE.city}`
    )}`,
    external: true,
  },
]

const SUCCESS_MESSAGE =
  "Thanks, we got your message. A senior lawyer will review it and get back to you within three days."
const ERROR_MESSAGE = `Something went wrong. Please try again, or email us at ${SUPPORT_EMAIL}.`

const EASE_OUT = [0.23, 1, 0.32, 1] as const

type Status = "idle" | "submitting" | "success" | "error"

/* ────────────────────  ROOT  ──────────────────── */

function Contact() {
  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="container">
        <SectionHeader
          badge="Contact"
          heading={<>Talk to a lawyer.</>}
          description="A senior lawyer takes the call. Conflicts checked within the hour, and a clear plan in your inbox within three days."
          mark={
            <Mail
              aria-hidden
              className="size-10 text-foreground/30"
              strokeWidth={1}
            />
          }
        />
      </div>

      <div className="container mt-12 md:mt-16 lg:mt-20">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr] lg:gap-5">
          <div className="rounded-xl border p-7 md:p-10">
            <ContactForm />
          </div>
          <CtaCard />
        </div>
      </div>
    </section>
  )
}

/* ────────────────────  CTA CARD  ──────────────────── */

function CtaCard() {
  return (
    <div className="brass-mesh dark relative flex min-h-[30rem] flex-col justify-between overflow-hidden rounded-xl p-8 text-foreground md:p-12">
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent"
      />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-12%" }}
        transition={{ duration: 0.7, ease: EASE_OUT }}
        className="relative"
      >
        <Eyebrow className="text-foreground/80">Start your case</Eyebrow>
        <h3 className="mt-6 text-4xl leading-[1.04] font-light tracking-tight md:text-5xl">
          Ready to get started?
        </h3>
      </motion.div>

      <ul className="relative mt-12 divide-y divide-white/10 border-t border-white/10">
        {contactMeta.map((m) => (
          <li key={m.label}>
            <a
              href={m.href}
              {...(m.external && { target: "_blank", rel: "noreferrer" })}
              className="group flex items-baseline justify-between gap-6 py-4 outline-none"
            >
              <span className="text-[0.5625rem] tracking-[0.25em] text-foreground/50 uppercase transition-colors group-hover:text-foreground/70">
                {m.label}
              </span>
              <span className="inline-flex items-center gap-2 text-sm font-light tracking-tight text-foreground/90 transition-colors group-hover:text-foreground group-focus-visible:text-foreground">
                {m.value}
                <MoveUpRight className="size-3.5 -translate-x-1 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ────────────────────  FORM  ──────────────────── */

function ContactForm() {
  const [status, setStatus] = useState<Status>("idle")

  const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = String(new FormData(e.currentTarget).get("email") ?? "")
    setStatus("submitting")
    window.setTimeout(() => {
      setStatus(email.toLowerCase().includes("fail") ? "error" : "success")
    }, 1200)
  }, [])

  return (
    <>
      <Eyebrow>Private &amp; secure</Eyebrow>
      <h3 className="mt-4 text-2xl leading-tight font-light tracking-tight md:text-3xl">
        Tell us about your case.
      </h3>

      <form onSubmit={onSubmit} className="mt-8">
        <FormFields locked={status === "submitting" || status === "success"} />
        <div className="mt-6 space-y-4">
          {status === "success" && (
            <Banner tone="success">{SUCCESS_MESSAGE}</Banner>
          )}
          {status === "error" && <Banner tone="error">{ERROR_MESSAGE}</Banner>}
          <SubmitButton status={status} />
        </div>
      </form>
    </>
  )
}

function Banner({
  tone,
  children,
}: {
  tone: "success" | "error"
  children: ReactNode
}) {
  const success = tone === "success"
  return (
    <motion.div
      role="status"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: EASE_OUT }}
      className={cn(
        "flex items-start gap-3 rounded-md border p-4 text-sm",
        success
          ? "border-accent/30 bg-accent/10 text-foreground"
          : "border-destructive/30 bg-destructive/10 text-destructive"
      )}
    >
      {success ? (
        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" />
      ) : (
        <AlertCircle className="mt-0.5 size-4 shrink-0" />
      )}
      <span>{children}</span>
    </motion.div>
  )
}

function SubmitButton({ status }: { status: Status }) {
  const busy = status === "submitting"
  const locked = busy || status === "success"
  return (
    <Button type="submit" size="lg" disabled={locked}>
      {busy ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          Sending…
        </>
      ) : (
        <>
          Send message
          <MoveUpRight />
        </>
      )}
    </Button>
  )
}

const labelClass =
  "gap-2 text-[0.5625rem] tracking-[0.25em] text-foreground/65 uppercase"

function FormFields({ locked }: { locked?: boolean }) {
  return (
    <fieldset
      disabled={locked}
      className="grid grid-cols-1 gap-6 transition-opacity disabled:opacity-60 sm:grid-cols-2"
    >
      <Field>
        <FieldLabel htmlFor="name" className={labelClass}>
          <FieldTick /> Name <Required />
        </FieldLabel>
        <Input id="name" name="name" placeholder="Your full name" required />
      </Field>

      <Field>
        <FieldLabel htmlFor="email" className={labelClass}>
          <FieldTick /> Email <Required />
        </FieldLabel>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@email.com"
          required
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="matter" className={labelClass}>
          <FieldTick /> Type of case <Required />
        </FieldLabel>
        <Select name="matter" required>
          <SelectTrigger id="matter" className="w-full">
            <SelectValue placeholder="Pick a case type" />
          </SelectTrigger>
          <SelectContent>
            {matters.map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field>
        <FieldLabel htmlFor="jurisdiction" className={labelClass}>
          <FieldTick /> Location
        </FieldLabel>
        <Select name="jurisdiction">
          <SelectTrigger id="jurisdiction" className="w-full">
            <SelectValue placeholder="Pick a location" />
          </SelectTrigger>
          <SelectContent>
            {jurisdictions.map((j) => (
              <SelectItem key={j} value={j}>
                {j}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field className="sm:col-span-full">
        <FieldLabel htmlFor="brief" className={labelClass}>
          <FieldTick /> Your message <Required />
        </FieldLabel>
        <Textarea
          id="brief"
          name="brief"
          rows={3}
          placeholder="A short note about your case. Kept private."
          required
          className="resize-none"
        />
      </Field>
    </fieldset>
  )
}

function FieldTick() {
  return <span aria-hidden className="block h-px w-4 bg-accent" />
}

function Required() {
  return (
    <span aria-hidden className="text-accent">
      *
    </span>
  )
}

/* ────────────────────  SHARED  ──────────────────── */

function Eyebrow({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        "flex items-center gap-2.5 text-[0.5625rem] tracking-[0.25em] text-foreground/65 uppercase",
        className
      )}
    >
      <span aria-hidden className="block h-px w-5 bg-accent" />
      {children}
    </span>
  )
}

export default Contact
