import Contact from "@/common/sections/contact"
import Endorsements from "@/common/sections/endorsements"
import { getAllPosts } from "@/lib/blog"
import { getAllCaseStudies } from "@/lib/case-studies"
import { getAllFeatures } from "@/lib/features"

import About from "./_about"
import Blog from "./_blog"
import CaseStudies from "./_caseStudies"
import Faq from "./_faq"
import Features from "./_features"
import Hero from "./_hero"
import Integrations from "./_integrations"
import LiveDemo from "./_liveDemo"
import Process from "./_process"
import PromptDemo from "./_promptDemo"
import Services from "./_services"
import Team from "./_team"

export default async function Page() {
  const [cases, posts, features] = await Promise.all([
    getAllCaseStudies(),
    getAllPosts(),
    getAllFeatures(),
  ])

  return (
    <>
      <Hero />
      <PromptDemo />
      <About />
      <LiveDemo />
      <Services />
      <Features features={features} />
      <CaseStudies cases={cases} />
      <Process />
      <Team />
      <Integrations />
      <Endorsements />
      <Blog posts={posts} />
      <Faq />
      <Contact />
    </>
  )
}
