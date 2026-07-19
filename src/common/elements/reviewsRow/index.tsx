"use client"

import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"

import { Marquee } from "@/common/customUI/marquee"
import { endorsements } from "@/common/sections/endorsements"
import { cn } from "@/lib/utils"

type Platform = {
  name: string
}

function ReviewsRow() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="inline-flex items-center gap-1.5">
          <span className="text-sm font-semibold tabular-nums">4.9</span>
          <Stars />
        </span>
        <span aria-hidden className="hidden h-4 w-px bg-border sm:block" />
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {PLATFORMS.map((p) => (
            <li
              key={p.name}
              className="text-sm font-medium text-muted-foreground"
            >
              {p.name}
            </li>
          ))}
        </ul>
      </div>

      <Marquee pauseOnHover className="mask-x-from-88% [--duration:50s]">
        {endorsements.map((e) => (
          <Link
            key={e.portrait}
            href="#testimonials"
            className="group flex w-80 items-center gap-2.5"
          >
            <Image
              src={e.portrait}
              alt=""
              width={28}
              height={28}
              className="size-7 shrink-0 rounded-full object-cover grayscale transition-[filter] duration-200 group-hover:grayscale-0"
            />
            <p className="truncate text-xs text-muted-foreground">
              <span className="text-foreground">&ldquo;{e.quote}&rdquo;</span>,{" "}
              {e.sectorShort}
            </p>
          </Link>
        ))}
      </Marquee>
    </div>
  )
}

function Stars({ className }: { className?: string }) {
  return (
    <div className={cn("flex gap-0.5 text-chart-1", className)}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="size-3" fill="currentColor" strokeWidth={0} />
      ))}
    </div>
  )
}

const PLATFORMS: Platform[] = [{ name: "Google" }, { name: "G2" }]

export default ReviewsRow
