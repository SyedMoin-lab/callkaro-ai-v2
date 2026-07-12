import PolicyPageContent from "@/common/sections/policyPage"
import { getPolicyPageBySlug } from "@/lib/policy"

export const dynamic = "force-static"

export default async function ReturnRefundPolicyPage() {
  const page = await getPolicyPageBySlug("return-refund-policy")

  return <PolicyPageContent page={page} />
}
