import { getAllServices } from "@/lib/services"

import ServicesGrid from "./grid"
import ServicesHero from "./hero"

export default async function ServicesPage() {
  const services = await getAllServices()

  return (
    <>
      <ServicesHero />
      <ServicesGrid services={services} />
    </>
  )
}
