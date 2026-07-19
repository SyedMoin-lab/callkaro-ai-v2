import Image from "next/image"
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

const LINK_GROUPS = [
  {
    group: "Product",
    items: [
      { title: "Features", href: "/features" },
      { title: "Pricing", href: "/pricing" },
      { title: "Industries", href: "/industries" },
      { title: "Case studies", href: "/case-studies" },
    ],
  },
  {
    group: "Company",
    items: [
      { title: "About", href: "/about-us" },
      { title: "Services", href: "/services" },
      { title: "Blog", href: "/blog" },
      { title: "Contact", href: "/contact-us" },
    ],
  },
  {
    group: "Offices",
    items: OFFICES.map((o) => ({ title: o.city, href: "/contact-us" })),
  },
  {
    group: "Contact",
    items: [
      { title: SUPPORT_EMAIL, href: SUPPORT_EMAIL_HREF },
      {
        title: PRIMARY_OFFICE.phone.display,
        href: PRIMARY_OFFICE.phone.href,
      },
      {
        title: "LinkedIn",
        href: "https://www.linkedin.com/company/callkaro-ai/",
      },
      { title: "Book a demo", href: "/contact-us" },
    ],
  },
]

const LEGAL_LINKS = [
  { title: "Privacy Policy", href: "/privacy-policy" },
  { title: "Terms & Conditions", href: "/terms-conditions" },
  { title: "Return & Refund Policy", href: "/return-refund-policy" },
]

const SOCIAL_LINKS = [
  {
    label: "X",
    href: "https://x.com",
    icon: (
      <path
        fill="currentColor"
        d="M10.488 14.651L15.25 21h7l-7.858-10.478L20.93 3h-2.65l-5.117 5.886L8.75 3h-7l7.51 10.015L2.32 21h2.65zM16.25 19L5.75 5h2l10.5 14z"
      />
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/callkaro-ai/",
    icon: (
      <path
        fill="currentColor"
        d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"
      />
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <path
        fill="currentColor"
        d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"
      />
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: (
      <path
        fill="currentColor"
        d="M23.498 6.186a2.994 2.994 0 0 0-2.088-2.088C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.41.553A2.994 2.994 0 0 0 .502 6.186C0 8.09 0 12 0 12s0 3.91.502 5.814a2.994 2.994 0 0 0 2.088 2.088c1.905.553 9.41.553 9.41.553s7.505 0 9.41-.553a2.994 2.994 0 0 0 2.088-2.088C24 15.91 24 12 24 12s0-3.91-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
      />
    ),
  },
]

function Footer() {
  return (
    <footer>
      <FooterPartners />

      <div className="dark rounded-t-[3rem] bg-background pt-20 pb-12 text-foreground md:rounded-t-[5rem] md:pt-32 md:pb-20">
        <div className="container">
          <div className="grid gap-12 md:grid-cols-5">
            <div className="md:col-span-2">
              <Link
                href="/"
                aria-label="CallKaro AI home"
                className="flex w-fit items-center gap-2.5"
              >
                <Image
                  src="/callkaro-logo.png"
                  alt=""
                  width={192}
                  height={192}
                  className="size-9 shrink-0 rounded-lg"
                />
                <span className="text-xl font-semibold tracking-tight">
                  CallKaro AI
                </span>
              </Link>
              <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
                {STATEMENT}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 md:col-span-3">
              {LINK_GROUPS.map((link) => (
                <div key={link.group} className="space-y-4 text-sm">
                  <span className="block font-medium">{link.group}</span>
                  {link.items.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="block text-muted-foreground duration-150 hover:text-foreground"
                    >
                      <span>{item.title}</span>
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-foreground/12 py-6">
            <span className="order-last block text-center text-sm text-muted-foreground md:order-first">
              © {new Date().getFullYear()} CallKaro AI, All rights reserved
            </span>
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
              {LEGAL_LINKS.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="text-muted-foreground duration-150 hover:text-foreground"
                >
                  {item.title}
                </Link>
              ))}
            </nav>
            <div className="order-first flex flex-wrap justify-center gap-6 text-sm md:order-last">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="block text-muted-foreground hover:text-foreground"
                >
                  <svg
                    className="size-6"
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    {s.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>
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
          <p className="text-xs font-medium text-muted-foreground">
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
          <p className="text-xs font-medium text-muted-foreground">
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

export default Footer
