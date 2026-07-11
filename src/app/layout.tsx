import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { cookies } from "next/headers"

import Banner from "@/common/layout/banner"
import Footer from "@/common/layout/footer"
import Navbar from "@/common/layout/navbar"
import { StyleGlideProvider } from "@/common/providers/styleglide-provider"
import { ThemeProvider } from "@/common/providers/theme-provider"
import { cn } from "@/lib/utils"

import "./globals.css"

const SITE_URL = "https://verdict-nextjs-template.vercel.app"
const SITE_NAME = "CallKaro AI"
const SITE_TITLE = "CallKaro AI, trusted legal help when it matters most"
const SITE_DESCRIPTION =
  "Senior lawyers on every case. Proven results in court. Clear fees, no surprises."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Next.js",
    "React",
    "TypeScript",
    "TailwindCSS",
    "Template",
    "Shadcn/UI",
    "Landing Page",
    "Law Firm",
    "Litigation",
    "Legal",
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
  const cookieStore = await cookies()
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
          <Banner initialVisible={!bannerDismissed} />
          <Navbar initialBannerVisible={!bannerDismissed} />
          <main className="relative flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
