import FolioCard from "@/common/sections/folio-card"
import type { CaseStudyFrontmatter } from "@/lib/types"

function FolioList({
  cases,
  stacked = false,
}: {
  cases: CaseStudyFrontmatter[]
  stacked?: boolean
}) {
  return (
    <ul className="mt-12 md:mt-16 lg:mt-20">
      {cases.map((c, i) => (
        <FolioCard
          key={c.slug}
          c={c}
          index={i}
          total={cases.length}
          stacked={stacked}
        />
      ))}
    </ul>
  )
}

export default FolioList
