import { NumberTicker } from "@/common/customUI/number-ticker"
import type { IndustryStatItem } from "@/lib/types"

function IndustryStats({ items }: { items: IndustryStatItem[] }) {
  if (items.length === 0) return null

  return (
    <section className="section-padding border-t">
      <div className="container">
        <ul className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
          {items.map((s) => (
            <li key={s.labelLine1} className="text-center">
              <p className="flex items-baseline justify-center text-4xl font-medium tracking-tight md:text-5xl">
                {s.prefix}
                <NumberTicker
                  value={s.number}
                  className="text-4xl font-medium tracking-tight text-foreground md:text-5xl"
                />
                {s.suffix}
              </p>
              <p className="mt-3 text-sm leading-snug text-muted-foreground">
                {s.labelLine1}
                <br />
                {s.labelLine2}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default IndustryStats
