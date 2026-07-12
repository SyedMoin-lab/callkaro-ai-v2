import FolioList from "@/common/sections/folioList"
import type { CaseStudyFrontmatter } from "@/lib/types"

function CaseStudiesGrid({ cases }: { cases: CaseStudyFrontmatter[] }) {
  return (
    <section id="browse" className="section-padding overflow-hidden pt-0">
      <div className="container">
        <FolioList cases={cases} />
      </div>
    </section>
  )
}

export default CaseStudiesGrid
