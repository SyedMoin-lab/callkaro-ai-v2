import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { cookies } from "next/headers"

import Banner from "@/common/layout/banner"
import Footer from "@/common/layout/footer"
import Navbar from "@/common/layout/navbar"
import SiteChrome from "@/common/layout/siteChrome"
import { StyleGlideProvider } from "@/common/providers/styleglideProvider"
import { ThemeProvider } from "@/common/providers/themeProvider"
import { getAllIndustries } from "@/lib/industries"
import { cn } from "@/lib/utils"

import "./globals.css"

const SITE_URL = "https://verdict-nextjs-template.vercel.app"
const SITE_NAME = "CallKaro AI"
const SITE_TITLE = "CallKaro AI, AI voice agents for every business call"
const SITE_DESCRIPTION =
  "CallKaro AI automates your inbound and outbound calls with human-sounding AI voice agents. Answer every call, book more, and cut costs. Live in days."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "AI Voice Agent",
    "Voice AI",
    "Call Automation",
    "Conversational AI",
    "AI Calling",
    "Outbound Calling",
    "Customer Support Automation",
    "Appointment Reminders",
    "Batch Calling",
    "CallKaro AI",
  ],
  authors: [{ name: "CallKaro AI" }],
  creator: "CallKaro AI",
  publisher: SITE_NAME,
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "48x48" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      {
        url: "/favicon/favicon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: [{ url: "/favicon/favicon.ico" }],
  },
  manifest: "/favicon/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: SITE_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image.jpg"],
    creator: "@callkaroai",
  },
}

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [cookieStore, industries] = await Promise.all([
    cookies(),
    getAllIndustries(),
  ])
  const bannerDismissed = cookieStore.get("banner-dismissed")?.value === "true"

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(geistSans.variable, geistMono.variable)}
    >
      <body className="flex min-h-screen flex-col">
        <ThemeProvider>
          <StyleGlideProvider />
          <SiteChrome
            banner={<Banner initialVisible={!bannerDismissed} />}
            navbar={
              <Navbar
                initialBannerVisible={!bannerDismissed}
                industries={industries}
              />
            }
            footer={<Footer />}
          >
            {children}
          </SiteChrome>
        </ThemeProvider>
      </body>
    </html>
  )
}
