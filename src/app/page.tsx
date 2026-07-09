import About from "@/components/sections/about"
import Awards from "@/components/sections/awards"
import CaseStudies from "@/components/sections/case-studies"
import Contact from "@/components/sections/contact"
import Endorsements from "@/components/sections/endorsements"
import Faq from "@/components/sections/faq"
import Hero from "@/components/sections/hero"
import Process from "@/components/sections/process"
import Services from "@/components/sections/services"
import Team from "@/components/sections/team"
import { getAllCaseStudies } from "@/lib/case-studies"

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
