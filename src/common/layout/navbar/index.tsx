"use client"

import { createElement, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  CalendarDays,
  Car,
  ChevronDown,
  GraduationCap,
  HeartPulse,
  Home,
  Landmark,
  LayoutGrid,
  type LucideIcon,
  Menu,
  ShoppingCart,
  Wifi,
  X,
} from "lucide-react"
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react"

import { CallKaroLogo } from "@/common/layout/logo"
import { Button } from "@/common/shadcnUI/button"
import { useBannerVisibility } from "@/hooks/use-banner-visibility"
import { cn } from "@/lib/utils"

const EASE_OUT = [0.16, 1, 0.3, 1] as const

const navItems = [
  { label: "About", href: "/about-us" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries", dropdown: true },
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
]

const industriesMenu: {
  label: string
  description: string
  href: string
  icon: LucideIcon
}[] = [
  {
    label: "All Industries",
    description: "Browse every industry we serve",
    href: "/industries",
    icon: LayoutGrid,
  },
  {
    label: "Education",
    description: "Admissions, fees, and class scheduling",
    href: "/industries/education",
    icon: GraduationCap,
  },
  {
    label: "E-commerce",
    description: "Order status, returns, and cart recovery",
    href: "/industries/e-commerce",
    icon: ShoppingCart,
  },
  {
    label: "Finance & Insurance",
    description: "Payment reminders and claims intake",
    href: "/industries/finance-insurance",
    icon: Landmark,
  },
  {
    label: "Healthcare",
    description: "Appointment booking and patient follow-ups",
    href: "/industries/healthcare",
    icon: HeartPulse,
  },
  {
    label: "Automobile",
    description: "Test-drive booking and service scheduling",
    href: "/industries/automobile",
    icon: Car,
  },
  {
    label: "Real Estate",
    description: "Viewing scheduling and lead screening",
    href: "/industries/real-estate",
    icon: Home,
  },
  {
    label: "IT Services & Internet",
    description: "Outage triage and first-line support",
    href: "/industries/it-services-internet",
    icon: Wifi,
  },
  {
    label: "Events & Webinar",
    description: "RSVP confirmations and reminder calls",
    href: "/industries/events-webinar",
    icon: CalendarDays,
  },
]

function Navbar({
  initialBannerVisible = true,
}: {
  initialBannerVisible?: boolean
}) {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)
  const [industriesOpen, setIndustriesOpen] = useState(false)
  const [industriesMobileOpen, setIndustriesMobileOpen] = useState(false)
  const industriesRef = useRef<HTMLLIElement>(null)
  const { scrollY } = useScroll()
  const { isBannerVisible } = useBannerVisibility(initialBannerVisible)
  const lastY = useRef(0)
  const pathname = usePathname()
  const isDarkHero = pathname === "/"
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/")
  const activeHref = navItems.find((item) => isActive(item.href))?.href

  useMotionValueEvent(scrollY, "change", (y) => {
    const delta = y - lastY.current
    lastY.current = y
    if (y < 20) {
      setHidden(false)
      setScrolled(false)
    } else if (delta > 3) {
      setHidden(true)
      setScrolled(true)
    } else if (delta < -3) {
      setHidden(false)
    }
  })

  // Close the mobile menu and industries dropdown when the route changes.
  const [lastPathname, setLastPathname] = useState(pathname)
  if (pathname !== lastPathname) {
    setLastPathname(pathname)
    setMenuOpen(false)
    setIndustriesOpen(false)
    setIndustriesMobileOpen(false)
  }

  // While the menu is open: lock scroll and close on Escape.
  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener("keydown", onKey)
    }
  }, [menuOpen])

  // Close the industries dropdown on outside click or Escape.
  useEffect(() => {
    if (!industriesOpen) return
    const onPointerDown = (e: PointerEvent) => {
      if (!industriesRef.current?.contains(e.target as Node)) {
        setIndustriesOpen(false)
      }
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndustriesOpen(false)
    }
    window.addEventListener("pointerdown", onPointerDown)
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("pointerdown", onPointerDown)
      window.removeEventListener("keydown", onKey)
    }
  }, [industriesOpen])

  return (
    <>
      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-50 text-foreground transition-[margin] duration-300",
          (isDarkHero || scrolled) && "dark",
          scrolled ? "mt-4" : isBannerVisible ? "mt-14" : "mt-0"
        )}
        animate={{ y: hidden ? "-150%" : "0%" }}
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
      >
        <div
          className={cn(
            "container transition-[max-width] duration-300",
            scrolled && "max-w-6xl"
          )}
        >
          <nav
            className={cn(
              "flex items-center gap-6 rounded-xl border transition-all duration-300",
              scrolled
                ? "bg-background/85 px-3 py-3 shadow-lg backdrop-blur-2xl sm:px-5"
                : "border-transparent bg-transparent py-5 shadow-none"
            )}
          >
            <div className="flex flex-1 items-center">
              <Link href="/" className="flex items-center gap-2.5">
                <CallKaroLogo className="size-9" />
                <span className="text-xl font-semibold tracking-tight">
                  CallKaro AI
                </span>
              </Link>
            </div>

            <ul
              className="hidden items-center gap-9 md:flex"
              onMouseLeave={() => setHovered(null)}
            >
              {navItems.map((item) => {
                const active = isActive(item.href)
                const highlighted = (hovered ?? activeHref) === item.href

                if (item.dropdown) {
                  return (
                    <li
                      key={item.label}
                      ref={industriesRef}
                      className="relative"
                      onMouseEnter={() => {
                        setHovered(item.href)
                        setIndustriesOpen(true)
                      }}
                      onMouseLeave={() => setIndustriesOpen(false)}
                    >
                      <button
                        type="button"
                        onClick={() => setIndustriesOpen(true)}
                        aria-haspopup="true"
                        aria-expanded={industriesOpen}
                        className={cn(
                          "relative flex items-center gap-1 text-sm transition-colors hover:text-foreground",
                          active ? "text-foreground" : "text-foreground/75"
                        )}
                      >
                        {item.label}
                        <ChevronDown
                          aria-hidden
                          strokeWidth={1.75}
                          className={cn(
                            "size-3.5 transition-transform duration-200",
                            industriesOpen && "rotate-180"
                          )}
                        />
                        {highlighted && (
                          <motion.span
                            layoutId="nav-underline"
                            aria-hidden
                            className="absolute -bottom-1.5 left-0 h-px w-full bg-accent"
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 35,
                            }}
                          />
                        )}
                      </button>

                      <AnimatePresence>
                        {industriesOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 6 }}
                            transition={{ duration: 0.18, ease: EASE_OUT }}
                            className="dark absolute top-full left-1/2 z-50 mt-4 w-88 -translate-x-1/3 rounded-xl border bg-background/95 p-2 text-foreground shadow-xl ring-1 ring-foreground/10 backdrop-blur-2xl"
                          >
                            <ul>
                              {industriesMenu.map((it) => (
                                <li key={it.href}>
                                  <Link
                                    href={it.href}
                                    onClick={() => setIndustriesOpen(false)}
                                    className="flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-foreground/5"
                                  >
                                    <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-muted/60 text-foreground/85">
                                      {createElement(it.icon, {
                                        className: "size-4",
                                        strokeWidth: 1.5,
                                      })}
                                    </span>
                                    <span>
                                      <span className="block text-sm font-medium text-foreground">
                                        {it.label}
                                      </span>
                                      <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
                                        {it.description}
                                      </span>
                                    </span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  )
                }

                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onMouseEnter={() => setHovered(item.href)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative text-sm transition-colors hover:text-foreground",
                        active ? "text-foreground" : "text-foreground/75"
                      )}
                    >
                      {item.label}
                      {highlighted && (
                        <motion.span
                          layoutId="nav-underline"
                          aria-hidden
                          className="absolute -bottom-1.5 left-0 h-px w-full bg-accent"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 35,
                          }}
                        />
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>

            <div className="flex flex-1 items-center justify-end gap-2">
              <Button size="lg" className="hidden md:inline-flex" asChild>
                <Link href="/contact-us">Book Free Consultation</Link>
              </Button>
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={menuOpen}
                className="grid size-10 place-items-center rounded-lg text-foreground transition-colors hover:bg-foreground/5 md:hidden"
              >
                <Menu className="size-6" strokeWidth={1.5} />
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[60] md:hidden"
          >
            <motion.button
              type="button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="absolute inset-y-0 right-0 flex w-[min(20rem,85vw)] flex-col bg-background p-6 shadow-2xl ring-1 ring-foreground/10"
            >
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2.5"
                >
                  <CallKaroLogo className="size-8" />
                  <span className="text-lg font-semibold tracking-tight">
                    CallKaro AI
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="grid size-10 place-items-center rounded-lg text-foreground transition-colors hover:bg-foreground/5"
                >
                  <X className="size-5" strokeWidth={1.5} />
                </button>
              </div>

              <ul className="mt-8 flex flex-col overflow-y-auto">
                {navItems.map((item) => {
                  const active = isActive(item.href)

                  if (item.dropdown) {
                    return (
                      <li key={item.label} className="border-b">
                        <button
                          type="button"
                          onClick={() =>
                            setIndustriesMobileOpen((v) => !v)
                          }
                          aria-expanded={industriesMobileOpen}
                          className={cn(
                            "flex w-full items-center justify-between py-4 text-lg font-medium tracking-tight transition-colors hover:text-foreground",
                            active ? "text-accent" : "text-foreground/85"
                          )}
                        >
                          {item.label}
                          <ChevronDown
                            aria-hidden
                            strokeWidth={1.5}
                            className={cn(
                              "size-5 transition-transform duration-200",
                              industriesMobileOpen && "rotate-180"
                            )}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {industriesMobileOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: EASE_OUT }}
                              className="overflow-hidden"
                            >
                              <ul className="flex flex-col gap-0.5 pb-4">
                                {industriesMenu.map((it) => (
                                  <li key={it.href}>
                                    <Link
                                      href={it.href}
                                      onClick={() => setMenuOpen(false)}
                                      className="block py-2 text-sm text-foreground/70"
                                    >
                                      {it.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </li>
                    )
                  }

                  return (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "block border-b py-4 text-lg font-medium tracking-tight transition-colors hover:text-foreground",
                          active ? "text-accent" : "text-foreground/85"
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>

              <div className="mt-auto pt-8">
                <Button size="lg" className="w-full" asChild>
                  <Link href="/contact-us" onClick={() => setMenuOpen(false)}>
                    Book Free Consultation
                  </Link>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
