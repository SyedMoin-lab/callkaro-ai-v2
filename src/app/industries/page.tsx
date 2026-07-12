import { getAllIndustries, getIndustriesPageHero } from "@/lib/industries"

import IndustriesGrid from "./grid"
import IndustriesHero from "./hero"

export default async function IndustriesPage() {
  const [industries, hero] = await Promise.all([
    getAllIndustries(),
    getIndustriesPageHero(),
  ])

  return (
    <>
      <IndustriesHero hero={hero} />
      <IndustriesGrid industries={industries} />
    </>
  )
}
