import PolicyPageContent from "@/common/sections/policyPage"
import { getPolicyPageBySlug } from "@/lib/policy"

export const dynamic = "force-static"

export default async function TermsConditionsPage() {
  const page = await getPolicyPageBySlug("terms-conditions")

  return <PolicyPageContent page={page} />
}
