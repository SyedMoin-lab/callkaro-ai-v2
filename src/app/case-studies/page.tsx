import { getAllCaseStudies } from "@/lib/case-studies"

import CaseStudiesGrid from "./grid"
import CaseStudiesHero from "./hero"

export default async function CaseStudiesPage() {
  const cases = await getAllCaseStudies()

  return (
    <>
      <CaseStudiesHero />
      <CaseStudiesGrid cases={cases} />
    </>
  )
}
