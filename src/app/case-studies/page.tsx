import { getAllCaseStudies } from "@/lib/case-studies"

import CaseStudiesFolio from "./folio"

export default async function CaseStudiesPage() {
  const cases = await getAllCaseStudies()

  return <CaseStudiesFolio cases={cases} />
}
