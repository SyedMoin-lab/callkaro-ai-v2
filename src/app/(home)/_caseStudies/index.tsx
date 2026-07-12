import Link from "next/link"
import { MoveRight, TrendingUp } from "lucide-react"

import SectionHeader from "@/common/elements/sectionHeader"
import FolioList from "@/common/sections/folioList"
import { Button } from "@/common/shadcnUI/button"
import type { CaseStudyFrontmatter } from "@/lib/types"

import { params } from "./params"

function CaseStudies({ cases }: { cases: CaseStudyFrontmatter[] }) {
  const featured = cases.slice(0, 4)

  return (
    <section className="section-padding overflow-x-clip">
      <div className="container">
        <SectionHeader
          badge={params.badge}
          heading={<>{params.heading}</>}
          description={params.description}
          mark={
            <TrendingUp
              aria-hidden
              className="size-10 text-foreground/30"
              strokeWidth={1}
            />
          }
        />
      </div>

      <div className="container">
        <FolioList cases={featured} stacked />

        <div className="mt-10 flex justify-center md:mt-14">
          <Button size="lg" variant="secondary" asChild>
            <Link href={params.cta.href}>
              {params.cta.label}
              <MoveRight className="size-5" strokeWidth={1.25} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default CaseStudies
