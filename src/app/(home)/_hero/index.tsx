import Link from "next/link"
import { ArrowDown } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/common/shadcnUI/avatar"
import { Badge } from "@/common/shadcnUI/badge"
import { Button } from "@/common/shadcnUI/button"
import { AnimatedGridPattern } from "@/common/customUI/animatedGridPattern"

import { params } from "./params"

function Hero() {
  return (
    <section className="dark relative flex min-h-[max(100svh,800px)] flex-col bg-background text-foreground">
      <div className="relative isolate flex flex-1 flex-col overflow-hidden">
        <AnimatedGridPattern
          numSquares={40}
          maxOpacity={0.25}
          duration={3}
          repeatDelay={1}
          className="-z-10 [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-linear-to-b from-transparent to-background"
        />

        <div className="container flex flex-1 flex-col">
          <div className="hero-padding max-w-5xl">
            <Badge variant="outline" size="lg">
              {params.badge}
            </Badge>

            <h1 className="mt-8 text-5xl leading-[1.05] font-medium tracking-tight md:text-6xl lg:text-7xl">
              {params.heading.line1} <br className="hidden md:block" />
              {params.heading.line2}
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-foreground/70">
              {params.body}
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link href={params.ctaPrimary.href}>
                  {params.ctaPrimary.label}
                </Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link href={params.ctaSecondary.href}>
                  {params.ctaSecondary.label}
                </Link>
              </Button>
            </div>
          </div>

          <div className="mt-auto flex justify-between gap-2 border-t border-foreground/10 py-6 text-sm">
            <div className="flex items-center gap-3">
              <span className="size-1.5 rounded-full bg-foreground" />
              <span>{params.bottomBar.text}</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-foreground/60">
              <span>{params.bottomBar.scrollLabel}</span>
              <ArrowDown className="size-4" strokeWidth={1.25} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card">
        <div className="container grid grid-cols-1 items-center gap-10 py-10 lg:grid-cols-[1fr_2fr]">
          <div className="space-y-4">
            <p className="text-base">
              <span className="font-semibold">{params.trustedLabel.prefix}</span>
              <span className="ml-3 text-foreground/80">
                {params.trustedLabel.suffix}
              </span>
            </p>
            <div className="flex items-center gap-4">
              <AvatarGroup>
                {params.trustAvatars.map((a) => (
                  <Avatar key={a.name}>
                    <AvatarImage src={a.src} alt={a.name} />
                    <AvatarFallback>
                      {a.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </AvatarGroup>
              <div>
                <p className="text-2xl leading-none font-semibold">
                  {params.businesses.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {params.businesses.label}
                </p>
              </div>
            </div>
          </div>

          <ul className="grid grid-cols-3 text-center lg:w-fit lg:justify-self-end lg:text-end">
            {params.stats.map((s, i) => (
              <li
                key={s.label}
                className="relative px-3 last:pr-0 sm:px-5 md:px-6 lg:px-8"
              >
                {i > 0 && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 left-0 w-px bg-linear-to-b from-transparent from-15% via-foreground via-50% to-transparent to-85%"
                  />
                )}
                <p className="text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                  {s.value}
                </p>
                <p className="mt-2 text-xs text-muted-foreground sm:mt-3 sm:text-sm">
                  {s.label}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Hero
