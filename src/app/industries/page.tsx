import { getAllIndustries } from "@/lib/industries"

import IndustriesGrid from "./grid"
import IndustriesHero from "./hero"

export default async function IndustriesPage() {
  const industries = await getAllIndustries()

  return (
    <>
      <IndustriesHero />
      <IndustriesGrid industries={industries} />
    </>
  )
}
