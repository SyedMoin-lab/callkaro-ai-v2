"use client"

import { Mail, Phone } from "lucide-react"
import { motion } from "motion/react"

import { type Office, OFFICES } from "@/lib/contact"

const EASE_OUT = [0.23, 1, 0.32, 1] as const

function ContactOffices() {
  return (
    <section className="section-padding">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-4xl leading-[1.05] font-light tracking-tight md:text-5xl lg:text-6xl">
            Our offices.
          </h2>
          <p className="mt-6 text-base text-muted-foreground md:text-lg">
            Real people behind the AI, based right here in Greater Noida. Walk
            in, write in, or call, the response is the same.
          </p>
        </motion.div>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="mx-auto mt-12 max-w-4xl md:mt-16 lg:mt-20"
        >
          {OFFICES.filter((office) => office.city === "Greater Noida").map(
            (office) => (
              <OfficeCard key={office.city} office={office} />
            )
          )}
        </motion.ul>
      </div>
    </section>
  )
}

function OfficeCard({ office }: { office: Office }) {
  return (
    <motion.li
      variants={{
        hidden: { opacity: 0, y: 16 },
        show: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.7, ease: EASE_OUT }}
      className="group/office grid grid-cols-1 items-center gap-10 sm:grid-cols-2 sm:gap-14"
    >
      <div className="relative aspect-4/5 overflow-hidden rounded-xl ring-1 ring-foreground/10 sm:aspect-square">
        <iframe
          src={office.mapSrc}
          title={`Map of the ${office.city} office`}
          loading="lazy"
          className="absolute inset-0 size-full saturate-50"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-accent/15 mix-blend-multiply"
        />
        <div className="pointer-events-none absolute inset-x-6 bottom-6 rounded-lg bg-background/85 px-5 py-4 text-center shadow-sm backdrop-blur-md">
          <div className="text-xl leading-tight font-light tracking-tight md:text-2xl">
            {office.city}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            {office.region}
          </div>
        </div>
      </div>

      <div className="border-t pt-5 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-14">
        <div className="text-sm text-muted-foreground">Contact information</div>

        <address className="mt-3 text-base leading-snug text-foreground not-italic">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              `${office.address.line1}, ${office.address.line2}`
            )}`}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-accent"
          >
            {office.address.line1}
            <br />
            {office.address.line2}
          </a>
        </address>

        <div className="mt-5 space-y-2 text-sm">
          <a
            href={office.phone.href}
            className="group/row flex items-center gap-2.5 text-foreground transition-colors hover:text-accent"
          >
            <Phone className="size-3.5 text-accent" />
            {office.phone.display}
          </a>
          <a
            href={`mailto:${office.email}`}
            className="group/row flex items-center gap-2.5 text-foreground transition-colors hover:text-accent"
          >
            <Mail className="size-3.5 text-accent" />
            {office.email}
          </a>
        </div>
      </div>
    </motion.li>
  )
}

export default ContactOffices
