import { createElement, type ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { MoveUpRight, Zap } from "lucide-react"

import { Badge } from "@/common/shadcnUI/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/common/shadcnUI/breadCrumb"
import { Button } from "@/common/shadcnUI/button"
import { Card } from "@/common/shadcnUI/card"
import type { IndustriesPageHero, IndustryFrontmatter } from "@/lib/types"

import { resolveIndustryIcon } from "../data"

function IndustryHero({
  frontmatter,
  hero,
  children,
}: {
  frontmatter: IndustryFrontmatter
  hero: IndustriesPageHero
  children?: ReactNode
}) {
  const Icon = resolveIndustryIcon(frontmatter.icon)

  return (
    <section className="hero-padding">
      <div className="container">
        <Breadcrumb className="overflow-hidden">
          <BreadcrumbList className="flex-nowrap">
            <BreadcrumbItem className="shrink-0">
              <BreadcrumbLink asChild>
                <Link href="/industries">Industries</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="shrink-0" />
            <BreadcrumbItem className="min-w-0 flex-1">
              <BreadcrumbPage className="block truncate">
                {frontmatter.name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mt-10 grid grid-cols-1 items-center gap-10 md:mt-14 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div className="min-w-0">
            <Badge variant="outline" size="lg">
              <Zap aria-hidden className="size-3" strokeWidth={2} />
              {hero.detailHeroBadgeLabel}
            </Badge>

            <h1 className="mt-8 text-4xl leading-[1.05] font-light tracking-tight md:text-5xl lg:text-6xl">
              Transform <span className="text-accent">{frontmatter.name}</span>{" "}
              with AI voice agents.
            </h1>

            <p className="mt-6 max-w-lg text-base wrap-break-word text-muted-foreground md:text-lg">
              {frontmatter.description}
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link href={hero.detailHeroPrimaryCtaHref}>
                  {hero.detailHeroPrimaryCtaLabel}
                  <MoveUpRight />
                </Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link href={hero.detailHeroSecondaryCtaHref}>
                  {hero.detailHeroSecondaryCtaLabel}
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <Card variant="image" className="aspect-4/3">
              <Image
                src={frontmatter.image}
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </Card>

            <div className="absolute bottom-5 left-1/2 flex w-[calc(100%-2.5rem)] -translate-x-1/2 items-center gap-3 rounded-xl bg-background/95 p-4 shadow-lg ring-1 ring-foreground/10 backdrop-blur-sm">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-muted/60 text-foreground/85">
                {createElement(Icon, { className: "size-5", strokeWidth: 1.5 })}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">
                  {frontmatter.tagline}
                </p>
                <p className="text-xs text-muted-foreground">
                  {`Industry ${frontmatter.id} · CallKaro AI`}
                </p>
              </div>
            </div>
          </div>
        </div>

        {children && <div className="mt-14 md:mt-20">{children}</div>}
      </div>
    </section>
  )
}

export default IndustryHero
