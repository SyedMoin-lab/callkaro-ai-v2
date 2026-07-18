import Contact from "@/common/sections/contact"
import Endorsements from "@/common/sections/endorsements"
import { getAllCaseStudies } from "@/lib/case-studies"

import About from "./_about"
import CaseStudies from "./_caseStudies"
import Faq from "./_faq"
import Hero from "./_hero"
import Integrations from "./_integrations"
import Process from "./_process"
import PromptDemo from "./_promptDemo"
import Services from "./_services"
import Team from "./_team"

export default async function Page() {
  const cases = await getAllCaseStudies()

  return (
    <>
      <Hero />
      <PromptDemo />
      <About />
      <Services />
      <CaseStudies cases={cases} />
      <Process />
      <Team />
      <Integrations />
      <Endorsements />
      <Faq />
      <Contact />
    </>
  )
}
