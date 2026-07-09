import AboutHero from "@/components/sections/about-page/hero"
import AboutMission from "@/components/sections/about-page/mission"
import AboutPractice from "@/components/sections/about-page/practice"
import AboutStory from "@/components/sections/about-page/story"
import AboutTeam from "@/components/sections/about-page/team"
import AboutValues from "@/components/sections/about-page/values"
import Awards from "@/components/sections/awards"
import Contact from "@/components/sections/contact"

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
