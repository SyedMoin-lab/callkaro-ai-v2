"use client"

import { createElement, useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ArrowRight,
  BookOpen,
  Bot,
  ChevronDown,
  Grid3x3,
  Headphones,
  LayoutDashboard,
  LayoutGrid,
  Menu,
  MessageSquare,
  Mic,
  Network,
  Phone,
  PhoneForwarded,
  PhoneIncoming,
  PhoneOutgoing,
  PieChart,
  Plug,
  Sparkles,
  Workflow,
  X,
} from "lucide-react"
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react"

import { Button } from "@/common/shadcnUI/button"
import { useBannerVisibility } from "@/hooks/use-banner-visibility"
import { resolveIndustryIcon } from "@/lib/industry-icons"
import type { IndustryFrontmatter } from "@/lib/types"
import { cn } from "@/lib/utils"

const EASE_OUT = [0.16, 1, 0.3, 1] as const

const navItems = [
  { label: "Products", href: "/products", megaMenu: true },
  { label: "About", href: "/about-us" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries", dropdown: true },
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
]

const productsCategories = [
  { label: "Cloud Phone System", icon: Phone, active: true },
  { label: "Messaging", icon: MessageSquare },
  { label: "AI Agents", icon: Bot, badge: "New" },
  { label: "AI Copilot", icon: Sparkles },
  { label: "Automation & Workflows", icon: Workflow },
  { label: "Integrations", icon: Plug },
  { label: "Platform Overview", icon: LayoutDashboard },
]

const productsSpotlight = {
  label: "AI Voice Agent",
  badge: "New",
  description: "Resolve calls, qualify leads, and route smarter, 24x7",
}

const productsFeatures = [
  {
    label: "Inbound Contact Center",
    description: "Build superior customer experiences",
    icon: PhoneIncoming,
  },
  {
    label: "Sales Dialer",
    description: "Maximize sales outreach with dialing automation",
    icon: Grid3x3,
  },
  {
    label: "Business Phone System",
    description: "Build seamless voice and SMS workflows on a single platform",
    icon: BookOpen,
  },
  {
    label: "Outbound Call Center",
    description: "Reach customers with seamless outbound calling capabilities",
    icon: PhoneOutgoing,
  },
  {
    label: "IVR (Call Menu)",
    description: "Guide your customers to the right solution with interactive options",
    icon: Headphones,
  },
  {
    label: "Call Recording",
    description: "Automatically record calls and improve customer interactions",
    icon: Mic,
  },
  {
    label: "Call Forwarding",
    description: "Redirect incoming calls for faster handling and resolution",
    icon: PhoneForwarded,
  },
  {
    label: "Advanced Analytics",
    description: "Monitor real-time performance of agents with meaningful metrics",
    icon: PieChart,
  },
  {
    label: "Automated Call Distribution",
    description: "Automatically receive and distribute calls to the right agents",
    icon: Network,
  },
]

const productsFeatured = {
  eyebrow: "Featured",
  heading: "Is CallKaro AI the right fit for you?",
  body: "Get hands-on with our interactive demo.",
  cta: "Learn More",
  href: "/contact-us",
}

function Navbar({
  initialBannerVisible = true,
  industries = [],
}: {
  initialBannerVisible?: boolean
  industries?: IndustryFrontmatter[]
}) {
  const industriesMenu = [
    {
      label: "All Industries",
      description: "Browse every industry we serve",
      href: "/industries",
      icon: LayoutGrid,
    },
    ...industries.map((industry) => ({
      label: industry.name,
      description: industry.tagline,
      href: `/industries/${industry.slug}`,
      icon: resolveIndustryIcon(industry.icon),
    })),
  ]
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)
  const [industriesOpen, setIndustriesOpen] = useState(false)
  const [industriesMobileOpen, setIndustriesMobileOpen] = useState(false)
  const industriesRef = useRef<HTMLLIElement>(null)
  const [productsOpen, setProductsOpen] = useState(false)
  const [productsMobileOpen, setProductsMobileOpen] = useState(false)
  const productsRef = useRef<HTMLLIElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const [megaMenuTop, setMegaMenuTop] = useState(0)
  const { scrollY } = useScroll()
  const { isBannerVisible } = useBannerVisibility(initialBannerVisible)
  const pathname = usePathname()
  const isDarkHero = pathname === "/"
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/")
  const activeHref = navItems.find((item) => isActive(item.href))?.href

  // Drives the compact/pill style and reclaims the banner's space once
  // scrolled — the header itself always stays pinned in place, never hides.
  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y >= 20)
  })

  // Close the mobile menu and industries dropdown when the route changes.
  const [lastPathname, setLastPathname] = useState(pathname)
  if (pathname !== lastPathname) {
    setLastPathname(pathname)
    setMenuOpen(false)
    setIndustriesOpen(false)
    setIndustriesMobileOpen(false)
    setProductsOpen(false)
    setProductsMobileOpen(false)
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

  // Close the products mega menu on outside click or Escape.
  useEffect(() => {
    if (!productsOpen) return
    const onPointerDown = (e: PointerEvent) => {
      if (!productsRef.current?.contains(e.target as Node)) {
        setProductsOpen(false)
      }
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setProductsOpen(false)
    }
    window.addEventListener("pointerdown", onPointerDown)
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("pointerdown", onPointerDown)
      window.removeEventListener("keydown", onKey)
    }
  }, [productsOpen])

  // Track the nav bar's bottom edge so the full-width mega menu panels can
  // hang flush beneath it, even while the pill's size animates on scroll.
  useEffect(() => {
    if ((!productsOpen && !industriesOpen) || !navRef.current) return
    const update = () => {
      if (navRef.current) {
        setMegaMenuTop(navRef.current.getBoundingClientRect().bottom)
      }
    }
    update()
    const observer = new ResizeObserver(update)
    observer.observe(navRef.current)
    window.addEventListener("resize", update)
    return () => {
      observer.disconnect()
      window.removeEventListener("resize", update)
    }
  }, [productsOpen, industriesOpen])

  const openProducts = () => {
    if (navRef.current) {
      setMegaMenuTop(navRef.current.getBoundingClientRect().bottom)
    }
    setProductsOpen(true)
  }

  const openIndustries = () => {
    if (navRef.current) {
      setMegaMenuTop(navRef.current.getBoundingClientRect().bottom)
    }
    setIndustriesOpen(true)
  }

  return (
    <>
      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-50 text-foreground transition-[margin] duration-300",
          (isDarkHero || scrolled) && "dark",
          scrolled ? "mt-4" : isBannerVisible ? "mt-14" : "mt-0"
        )}
      >
        <div
          className={cn(
            "container transition-[max-width] duration-300",
            scrolled && "max-w-6xl"
          )}
        >
          <nav
            ref={navRef}
            className={cn(
              "flex items-center gap-6 rounded-xl border transition-all duration-300",
              scrolled
                ? "bg-background/85 px-3 py-3 shadow-lg backdrop-blur-2xl sm:px-5"
                : "border-transparent bg-transparent py-5 shadow-none"
            )}
          >
            <div className="flex flex-1 items-center">
              <Link href="/" className="flex items-center gap-2.5">
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

                if (item.megaMenu) {
                  return (
                    <li
                      key={item.label}
                      ref={productsRef}
                      className="relative"
                      onMouseEnter={() => {
                        setHovered(item.href)
                        openProducts()
                      }}
                      onMouseLeave={() => setProductsOpen(false)}
                    >
                      <button
                        type="button"
                        onClick={openProducts}
                        aria-haspopup="true"
                        aria-expanded={productsOpen}
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
                            productsOpen && "rotate-180"
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
                        {productsOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.18, ease: EASE_OUT }}
                            style={{ top: megaMenuTop }}
                            className="dark fixed inset-x-0 z-50 border-b border-foreground/10 bg-background text-foreground shadow-2xl"
                          >
                            <div className="container grid grid-cols-[13rem_1fr] gap-8 py-8 lg:grid-cols-[15rem_1fr_18rem] lg:gap-10">
                              <ul className="space-y-1 border-r border-foreground/10 pr-6 lg:pr-8">
                                {productsCategories.map((cat) => (
                                  <li key={cat.label}>
                                    <div
                                      className={cn(
                                        "flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm",
                                        cat.active
                                          ? "bg-foreground/5 font-medium text-foreground"
                                          : "text-foreground/75"
                                      )}
                                    >
                                      <span className="flex items-center gap-1.5">
                                        {cat.label}
                                        {cat.badge && (
                                          <span className="rounded-full bg-accent/15 px-1.5 py-0.5 text-[10px] font-medium text-accent">
                                            {cat.badge}
                                          </span>
                                        )}
                                      </span>
                                      {cat.active && (
                                        <ArrowRight
                                          aria-hidden
                                          strokeWidth={1.75}
                                          className="size-3.5 shrink-0"
                                        />
                                      )}
                                    </div>
                                  </li>
                                ))}
                                <li className="mt-2 border-t border-foreground/10 pt-3">
                                  <Link
                                    href="/features"
                                    onClick={() => setProductsOpen(false)}
                                    className="flex items-center gap-1 rounded-lg px-3 py-2.5 text-sm text-foreground/75 transition-colors hover:bg-foreground/5 hover:text-foreground"
                                  >
                                    See all features
                                    <ArrowRight
                                      aria-hidden
                                      strokeWidth={1.75}
                                      className="size-3.5"
                                    />
                                  </Link>
                                </li>
                              </ul>

                              <div>
                                <div className="flex items-center justify-between gap-3 rounded-xl border border-foreground/15 px-5 py-4">
                                  <div>
                                    <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                                      {productsSpotlight.label}
                                      <span className="rounded-full bg-accent/15 px-1.5 py-0.5 text-[10px] font-medium text-accent">
                                        {productsSpotlight.badge}
                                      </span>
                                    </span>
                                    <span className="mt-1 block text-sm leading-snug text-muted-foreground">
                                      {productsSpotlight.description}
                                    </span>
                                  </div>
                                  <ArrowRight
                                    aria-hidden
                                    strokeWidth={1.75}
                                    className="size-4 shrink-0 text-foreground/60"
                                  />
                                </div>

                                <ul className="mt-2 grid grid-cols-2 gap-x-6">
                                  {productsFeatures.map((feature) => (
                                    <li key={feature.label}>
                                      <div className="flex items-start gap-3 rounded-lg px-3 py-3">
                                        <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-muted/60 text-foreground/85">
                                          {createElement(feature.icon, {
                                            className: "size-4",
                                            strokeWidth: 1.5,
                                          })}
                                        </span>
                                        <span>
                                          <span className="block text-sm font-medium text-foreground">
                                            {feature.label}
                                          </span>
                                          <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
                                            {feature.description}
                                          </span>
                                        </span>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div className="hidden border-l border-foreground/10 pl-8 lg:block">
                                <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                                  {productsFeatured.eyebrow}
                                </span>
                                <div className="relative mt-3 aspect-video w-full overflow-hidden rounded-lg bg-muted/60">
                                  <Image
                                    src="/images/hero/office.webp"
                                    alt="CallKaro AI demo preview"
                                    fill
                                    sizes="288px"
                                    className="object-cover"
                                  />
                                </div>
                                <p className="mt-4 text-sm leading-snug text-foreground">
                                  {productsFeatured.heading}
                                </p>
                                <p className="mt-1 text-sm leading-snug text-muted-foreground">
                                  {productsFeatured.body}
                                </p>
                                <Link
                                  href={productsFeatured.href}
                                  onClick={() => setProductsOpen(false)}
                                  className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent transition-opacity hover:opacity-80"
                                >
                                  {productsFeatured.cta}
                                  <ArrowRight aria-hidden className="size-3.5" />
                                </Link>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  )
                }

                if (item.dropdown) {
                  return (
                    <li
                      key={item.label}
                      ref={industriesRef}
                      className="relative"
                      onMouseEnter={() => {
                        setHovered(item.href)
                        openIndustries()
                      }}
                      onMouseLeave={() => setIndustriesOpen(false)}
                    >
                      <button
                        type="button"
                        onClick={openIndustries}
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
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.18, ease: EASE_OUT }}
                            style={{ top: megaMenuTop }}
                            className="dark fixed inset-x-0 z-50 border-b border-foreground/10 bg-background text-foreground shadow-2xl"
                          >
                            <div className="container py-8">
                              <ul className="grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-3 lg:grid-cols-4">
                                {industriesMenu.map((it) => (
                                  <li key={it.href}>
                                    <Link
                                      href={it.href}
                                      onClick={() => setIndustriesOpen(false)}
                                      className="flex items-start gap-3 rounded-lg px-3 py-3 transition-colors hover:bg-foreground/5"
                                    >
                                      <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-muted/60 text-foreground/85">
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
                            </div>
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

                  if (item.megaMenu) {
                    return (
                      <li key={item.label} className="border-b">
                        <button
                          type="button"
                          onClick={() => setProductsMobileOpen((v) => !v)}
                          aria-expanded={productsMobileOpen}
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
                              productsMobileOpen && "rotate-180"
                            )}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {productsMobileOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: EASE_OUT }}
                              className="overflow-hidden"
                            >
                              <ul className="flex flex-col gap-0.5 pb-4">
                                {productsCategories.map((cat) => (
                                  <li key={cat.label}>
                                    <span className="flex items-center gap-1.5 py-2 text-sm text-foreground/70">
                                      {cat.label}
                                      {cat.badge && (
                                        <span className="rounded-full bg-accent/15 px-1.5 py-0.5 text-[10px] font-medium text-accent">
                                          {cat.badge}
                                        </span>
                                      )}
                                    </span>
                                  </li>
                                ))}
                                <li>
                                  <Link
                                    href="/features"
                                    onClick={() => setMenuOpen(false)}
                                    className="block py-2 text-sm font-medium text-foreground"
                                  >
                                    See all features
                                  </Link>
                                </li>
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </li>
                    )
                  }

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
