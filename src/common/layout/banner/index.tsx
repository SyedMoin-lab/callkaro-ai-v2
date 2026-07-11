"use client"

import { usePathname } from "next/navigation"
import { X } from "lucide-react"

import { Button } from "@/common/shadcnUI/button"
import { useBannerVisibility } from "@/hooks/use-banner-visibility"
import { cn } from "@/lib/utils"

function Banner({
  url = "#", // TODO: add banner link
  initialVisible = true,
}: {
  url?: string
  initialVisible?: boolean
}) {
  const { isBannerVisible, dismissBanner } = useBannerVisibility(initialVisible)
  const pathname = usePathname()
  const isLight = pathname === "/"

  return (
    <div
      className={cn(
        "relative overflow-hidden transition-all duration-300",
        isLight ? "bg-white text-black" : "bg-black text-white",
        isBannerVisible ? "h-14 opacity-100" : "max-h-0 opacity-0",
        !isBannerVisible && "pointer-events-none"
      )}
    >
      <div className="container flex h-14 items-center justify-between gap-4 pr-12">
        <div className="flex flex-1 items-center justify-center gap-3 sm:gap-4">
          <span className="hidden rounded-full border border-current/40 px-2.5 py-0.5 text-[0.65rem] font-semibold tracking-wider uppercase sm:inline-block">
            Introducing
          </span>
          <span className="text-center text-sm">
            Give every incoming call a smart voice agent that turns callers into
            customers, nonstop.
          </span>
          <Button
            size="sm"
            asChild
            className={cn(
              isLight
                ? "bg-black text-white hover:bg-black/85"
                : "bg-white text-black hover:bg-white/85"
            )}
          >
            <a href={url} target="_blank" rel="noreferrer">
              Take a look
            </a>
          </Button>
        </div>
        <button
          onClick={dismissBanner}
          className={cn(
            "absolute top-1/2 right-4 -translate-y-1/2 rounded-sm p-1.5",
            "transition-all duration-200 hover:scale-110",
            "focus:ring-2 focus:outline-none",
            isLight
              ? "text-black/70 hover:bg-black/10 hover:text-black focus:ring-black/30"
              : "text-white/70 hover:bg-white/10 hover:text-white focus:ring-white/30"
          )}
          aria-label="Close banner"
        >
          <X className="size-3.5" />
        </button>
      </div>
    </div>
  )
}

export default Banner
