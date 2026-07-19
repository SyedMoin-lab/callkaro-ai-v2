"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"

import { ScrollProgress } from "@/common/customUI/scrollProgress"

const BARE_ROUTES = ["/sign-up", "/login"]

function isBare(pathname: string) {
  return BARE_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  )
}

export default function SiteChrome({
  banner,
  navbar,
  footer,
  children,
}: {
  banner: ReactNode
  navbar: ReactNode
  footer: ReactNode
  children: ReactNode
}) {
  const pathname = usePathname()

  if (isBare(pathname)) {
    return <main className="relative flex-1">{children}</main>
  }

  return (
    <>
      <ScrollProgress />
      {banner}
      {navbar}
      <main className="relative flex-1">{children}</main>
      {footer}
    </>
  )
}
