import { getAllIndustries } from "@/lib/industries"

import IndustriesFeatured from "./featured"

export default async function IndustriesPage() {
  const industries = await getAllIndustries()

  return <IndustriesFeatured industries={industries} />
}
