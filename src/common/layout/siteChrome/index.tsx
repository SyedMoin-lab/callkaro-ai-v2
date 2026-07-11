"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"

// Routes rendered "bare", without the marketing chrome (banner/navbar/footer).
// Signup is a focused, standalone conversion page.
const BARE_ROUTES = ["/sign-up"]

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
      {banner}
      {navbar}
      <main className="relative flex-1">{children}</main>
      {footer}
    </>
  )
}
