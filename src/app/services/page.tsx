import { getAllServices } from "@/lib/services"

import ServicesFeatured from "./featured"

export default async function ServicesPage() {
  const services = await getAllServices()

  return <ServicesFeatured services={services} />
}
