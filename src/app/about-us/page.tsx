import Awards from "@/common/sections/awards"
import Contact from "@/common/sections/contact"

import AboutHero from "./hero"
import AboutMission from "./mission"
import AboutPractice from "./practice"
import AboutStory from "./story"
import AboutTeam from "./team"
import AboutValues from "./values"

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      <AboutMission />
      <AboutPractice />
      <AboutValues />
      <AboutTeam />
      <Awards />
      <Contact />
    </>
  )
}
