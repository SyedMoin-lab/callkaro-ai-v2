import Awards from "@/common/sections/awards"
import Contact from "@/common/sections/contact"
import Endorsements from "@/common/sections/endorsements"
import { getAllCaseStudies } from "@/lib/case-studies"

import About from "./_about"
import CaseStudies from "./_caseStudies"
import Faq from "./_faq"
import Hero from "./_hero"
import Process from "./_process"
import Services from "./_services"
import Team from "./_team"

export default async function Page() {
  const cases = await getAllCaseStudies()

  return (
    <>
      <Hero />
      <About />
      <Services />
      <CaseStudies cases={cases} />
      <Process />
      <Team />
      <Awards />
      <Endorsements />
      <Faq />
      <Contact />
    </>
  )
}
