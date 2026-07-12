import PolicyPageContent from "@/common/sections/policyPage"
import { getPolicyPageBySlug } from "@/lib/policy"

export const dynamic = "force-static"

export default async function PrivacyPolicyPage() {
  const page = await getPolicyPageBySlug("privacy-policy")

  return <PolicyPageContent page={page} />
}
