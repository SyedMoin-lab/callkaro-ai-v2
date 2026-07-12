import { type ReactNode } from "react"
import Link from "next/link"

import {
  OFFICES,
  PRIMARY_OFFICE,
  SUPPORT_EMAIL,
  SUPPORT_EMAIL_HREF,
} from "@/lib/contact"

const ELEVENLABS_MASK = "url(https://cdn.simpleicons.org/elevenlabs)"

const STATEMENT =
  "AI voice agents that answer every call, day or night, so your team can focus on the conversations that matter most."

const FIRM_LINKS = [
  { label: "About", href: "/about-us" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Case studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact-us" },
]

const CONTACT_LINKS = [
  { label: SUPPORT_EMAIL, href: SUPPORT_EMAIL_HREF },
  { label: PRIMARY_OFFICE.phone.display, href: PRIMARY_OFFICE.phone.href },
  { label: "LinkedIn", href: "#" },
  { label: "Book a demo", href: "/contact-us" },
]

function Footer() {
  return (
    <footer>
      <FooterPartners />

      <div className="dark rounded-[2.5rem] bg-background pt-16 pb-10 text-foreground md:rounded-[3.5rem] md:pt-24 md:pb-14">
        <div className="container">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_0.8fr_1.1fr_1fr] lg:gap-10">
            <div className="flex flex-col gap-5">
              <Link href="/" className="flex w-fit items-center gap-2.5">
                <span className="text-xl font-semibold tracking-tight">
                  CallKaro AI
                </span>
              </Link>
              <p className="max-w-xs text-sm leading-relaxed text-foreground/60">
                {STATEMENT}
              </p>
            </div>

            <FooterColumn label="Company">
              <ul className="space-y-3 text-sm">
                {FIRM_LINKS.map((l) => (
                  <li key={l.label}>
                    <FooterLink href={l.href}>{l.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </FooterColumn>

            <FooterColumn label="Offices">
              <ul className="space-y-5">
                {OFFICES.map((o) => (
                  <li key={o.city}>
                    <p className="text-sm text-foreground/85">{o.city}</p>
                    <p className="mt-1 text-sm leading-relaxed text-foreground/45">
                      {o.address.line1}, {o.address.line2}
                    </p>
                  </li>
                ))}
              </ul>
            </FooterColumn>

            <FooterColumn label="Contact">
              <ul className="space-y-3 text-sm">
                {CONTACT_LINKS.map((l) => (
                  <li key={l.label}>
                    <FooterLink href={l.href}>{l.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </FooterColumn>
          </div>

          <Baseline />
        </div>
      </div>
    </footer>
  )
}

function FooterPartners() {
  return (
    <div className="rounded-t-[2.5rem] bg-muted/60 py-10 md:rounded-t-[3.5rem] md:py-14">
      <div className="container flex flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left">
        <div className="min-w-0">
          <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
            Proud partners in innovation
          </p>
          <a
            href="https://elevenlabs.io"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="ElevenLabs"
            className="mt-5 inline-flex items-center gap-3 text-foreground/70 transition-opacity hover:opacity-70"
          >
            <span
              aria-hidden
              className="block size-7 bg-current mask-contain mask-center mask-no-repeat"
              style={{
                maskImage: ELEVENLABS_MASK,
                WebkitMaskImage: ELEVENLABS_MASK,
              }}
            />
            <span className="text-xl font-semibold tracking-tight">
              ElevenLabs
            </span>
          </a>
        </div>

        <div className="shrink-0">
          <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
            Trusted worldwide
          </p>
          <p className="mt-2 text-2xl font-light tracking-tight">
            1,000+ businesses
          </p>
          <p className="text-sm text-muted-foreground">across 15+ countries</p>
        </div>
      </div>
    </div>
  )
}

function FooterColumn({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <div>
      <p className="text-xs tracking-[0.2em] text-foreground/45 uppercase">
        {label}
      </p>
      <div className="mt-5">{children}</div>
    </div>
  )
}

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group relative inline-flex w-fit text-foreground/65 transition-colors hover:text-foreground"
    >
      {children}
      <span
        aria-hidden
        className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100"
      />
    </Link>
  )
}

function Baseline() {
  return (
    <div className="mt-16 flex flex-col gap-3 border-t border-foreground/12 pt-6 text-xs text-foreground/40 sm:flex-row sm:items-center sm:justify-between md:mt-20">
      <span>© CallKaro AI. All rights reserved.</span>
      <span className="flex items-center gap-2">
        <span
          aria-hidden
          className="size-1.5 animate-pulse rounded-full bg-accent"
        />
        AI voice agents for every business call.
      </span>
    </div>
  )
}

export default Footer
