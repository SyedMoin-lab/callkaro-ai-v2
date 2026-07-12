import { type ReactNode } from "react"

import { Badge } from "@/common/shadcnUI/badge"

type SectionHeaderProps = {
  badge: ReactNode
  heading: ReactNode
  description: ReactNode
  mark?: ReactNode
}

function SectionHeader({
  badge,
  heading,
  description,
  mark,
}: SectionHeaderProps) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <Badge variant="outline" size="lg">
          <span className="size-1 rounded-full bg-foreground/40" />
          {badge}
          <span className="size-1 rounded-full bg-foreground/40" />
        </Badge>
        {mark}
      </div>
      <h2 className="mt-8 max-w-4xl text-4xl leading-[1.05] font-light tracking-tight md:text-5xl lg:text-6xl">
        {heading}
      </h2>
      <p className="mt-8 max-w-2xl text-base text-muted-foreground">
        {description}
      </p>
    </div>
  )
}

export default SectionHeader
