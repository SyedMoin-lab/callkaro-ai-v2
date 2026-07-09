import ServicesFeatured from "@/components/sections/services-page/featured"
import { getAllServices } from "@/lib/services"

export default async function ServicesPage() {
  const services = await getAllServices()

  return <ServicesFeatured services={services} />
}
