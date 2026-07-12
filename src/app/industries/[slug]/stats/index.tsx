import { NumberTicker } from "@/common/customUI/number-ticker"

const STATS = [
  {
    number: 24,
    prefix: "",
    suffix: "/7",
    label: ["Calls answered", "day and night"],
  },
  {
    number: 3,
    prefix: "<",
    suffix: "s",
    label: ["Average pickup", "on every call"],
  },
  {
    number: 3,
    prefix: "",
    suffix: "x",
    label: ["More leads", "captured and booked"],
  },
  {
    number: 60,
    prefix: "",
    suffix: "%",
    label: ["Lower cost", "than a call center"],
  },
] as const

function IndustryStats() {
  return (
    <section className="section-padding border-t">
      <div className="container">
        <ul className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
          {STATS.map((s) => (
            <li key={s.label[0]} className="text-center">
              <p className="flex items-baseline justify-center text-4xl font-medium tracking-tight md:text-5xl">
                {s.prefix}
                <NumberTicker
                  value={s.number}
                  className="text-4xl font-medium tracking-tight text-foreground md:text-5xl"
                />
                {s.suffix}
              </p>
              <p className="mt-3 text-sm leading-snug text-muted-foreground">
                {s.label[0]}
                <br />
                {s.label[1]}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default IndustryStats
