import CaseStudiesFolio from "@/components/sections/case-studies-page/folio"
import { getAllCaseStudies } from "@/lib/case-studies"

export default async function CaseStudiesPage() {
  const cases = await getAllCaseStudies()

  return <CaseStudiesFolio cases={cases} />
}
