import Link from "next/link"

import ReviewsRow from "@/common/elements/reviewsRow"
import { Badge } from "@/common/shadcnUI/badge"
import { Button } from "@/common/shadcnUI/button"
import { Separator } from "@/common/shadcnUI/separator"

const stats = [
  { value: "24/7", label: ["Calls answered", "day and night"] },
  { value: "<3s", label: ["Average pickup", "on every call"] },
  { value: "3x", label: ["More leads", "captured and booked"] },
  { value: "60%", label: ["Lower cost", "than a call center"] },
]

function About() {
  return (
    <section className="section-padding">
      <div className="container space-y-12 md:space-y-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_2.6fr] md:gap-16">
          <div>
            <Badge variant="outline" size="lg">
              <span className="size-1 rounded-full bg-foreground/40" />
              About Us
              <span className="size-1 rounded-full bg-foreground/40" />
            </Badge>
          </div>

          <div>
            <h2 className="text-4xl leading-[1.1] font-medium tracking-tight md:text-5xl lg:text-6xl">
              Voice AI agents that answer every call the way your best employee
              would.
            </h2>
            <p className="mt-8 max-w-3xl text-base text-muted-foreground">
              CallKaro AI builds intelligent voice agents that pick up
              instantly, understand what every caller wants, and book
              appointments automatically. From busy front desks to after-hours
              calls, we make sure every customer is heard, every lead is
              captured, and no opportunity slips away, for startups, growing
              teams, and enterprises alike.
            </p>
            <Link
              href="/about-us"
              className="mt-10 inline-flex items-center gap-1.5 text-sm underline underline-offset-4 transition-colors hover:text-muted-foreground"
            >
              Learn more
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_2.6fr] md:gap-16">
          <div className="dark relative flex flex-col overflow-hidden rounded-xl bg-card text-foreground">
            <div
              aria-hidden
              className="relative aspect-[4/3] bg-[url(/images/about/team.webp)] bg-cover bg-center"
            >
              <div className="absolute inset-0 bg-linear-to-t from-card via-card/40 to-transparent" />
            </div>

            <div className="space-y-6 p-6">
              <div>
                <p className="text-lg font-medium">
                  1,000+ businesses on CallKaro AI
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Answering calls across 15+ countries
                </p>
              </div>
              <Button asChild size="lg" className="w-full">
                <Link href="#testimonials">Read reviews</Link>
              </Button>
            </div>
          </div>

          <div className="flex min-w-0 flex-col justify-end gap-10">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
              {stats.map((s) => (
                <li key={s.value}>
                  <p className="text-4xl font-medium tracking-tight md:text-5xl">
                    {s.value}
                  </p>
                  <p className="mt-3 text-sm leading-snug text-muted-foreground">
                    {s.label[0]}
                    <br />
                    {s.label[1]}
                  </p>
                </li>
              ))}
            </ul>

            <Separator />

            <ReviewsRow />
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
