import { Plug } from "lucide-react"

import SectionHeader from "@/common/elements/sectionHeader"

import { params } from "./params"

function Integrations() {
  return (
    <section className="section-padding overflow-hidden">
      <div className="container">
        <SectionHeader
          badge={params.badge}
          heading={<>{params.heading}</>}
          description={params.description}
          mark={
            <Plug
              aria-hidden
              className="size-10 text-foreground/30"
              strokeWidth={1}
            />
          }
        />
      </div>

      <div className="container mt-12 md:mt-16 lg:mt-20">
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-5">
          {params.integrations.map((it) => (
            <li key={it.name} className="rounded-xl bg-muted/60 p-7 md:p-8">
              <img src={it.icon} alt="" className="size-10" />
              <h3 className="mt-5 text-lg font-medium tracking-tight">
                {it.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {it.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Integrations
