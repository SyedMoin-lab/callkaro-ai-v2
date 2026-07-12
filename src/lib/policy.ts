import {
  fetchStrapi,
  type StrapiCollectionResponse,
  unwrapStrapiEntity,
} from "@/lib/strapi"
import type { PolicyPage } from "@/lib/types"

interface StrapiPolicyPage {
  title?: string
  slug?: string
  lastUpdated?: string
  metaDescription?: string
  content?: string
}

const FALLBACK_POLICY_PAGES: Record<string, PolicyPage> = {
  "privacy-policy": {
    slug: "privacy-policy",
    title: "Privacy Policy",
    lastUpdated: "2026-07-12",
    metaDescription:
      "How CallKaro AI collects, uses, and protects your personal data and call information.",
    content: `Last updated: July 12, 2026

CallKaro AI ("CallKaro AI," "we," "us," or "our") provides AI voice agent software that helps businesses answer, place, and manage phone calls. This Privacy Policy explains what personal data we collect, how we use it, and the choices you have.

## 1. Information We Collect

### Information you provide
- Account details: name, email, phone number, company name, and billing information when you sign up or contact us.
- Call configuration data: scripts, knowledge base documents, and business information you upload to train your AI voice agent.
- Support communications: anything you send us via email, chat, or our contact form.

### Information collected automatically
- Call data: call recordings, transcripts, call metadata (duration, timestamp, outcome, disposition), and caller phone numbers processed through our platform on your behalf.
- Usage data: pages visited, features used, and general analytics collected via cookies and similar technologies.
- Device and log data: IP address, browser type, and device identifiers.

### Information from third parties
- Voice synthesis and speech-to-text providers that process audio to power the agent.
- Payment processors that confirm successful transactions.
- Integration partners (CRMs, calendars, telephony providers) you choose to connect.

## 2. How We Use Your Information

We use the information we collect to:
- Provide, operate, and maintain the CallKaro AI platform, including running your voice agents and placing/receiving calls.
- Process payments and manage your subscription.
- Improve our AI models, call quality, and product features using aggregated or de-identified data.
- Send you service updates, security alerts, and administrative messages.
- Detect, prevent, and address fraud, abuse, or violations of our Terms & Conditions.
- Comply with legal obligations, including telecom and data protection regulations.

## 3. How We Share Your Information

We do not sell your personal data. We may share information with:
- Sub-processors and vendors who help us operate the service (e.g. cloud hosting, voice synthesis, telephony carriers, payment processors), bound by confidentiality and data protection obligations.
- Integration partners you explicitly connect to your account.
- Law enforcement or regulators when required by law, or to protect the rights, property, or safety of CallKaro AI, our customers, or the public.
- A successor entity in the event of a merger, acquisition, or sale of assets.

## 4. Call Recordings and Transcripts

Calls placed or received through CallKaro AI may be recorded and transcribed to power the AI agent, generate analytics, and improve call quality. You are responsible for providing any legally required notice or consent to call participants under the laws applicable to your business and the jurisdictions in which you operate.

## 5. Data Retention

We retain personal data, call recordings, and transcripts for as long as your account is active or as needed to provide the service, comply with legal obligations, resolve disputes, and enforce our agreements. You can request deletion of your data as described in Section 7.

## 6. Data Security

We use industry-standard technical and organizational safeguards, including encryption in transit and at rest, access controls, and regular security reviews, to protect your data. No system is completely secure, and we cannot guarantee absolute security.

## 7. Your Rights

Depending on your location, you may have the right to access, correct, export, or delete your personal data, or to object to or restrict certain processing. Indian residents have rights under the Digital Personal Data Protection Act, 2023. To exercise these rights, contact us at hello@callkaro.ai.

## 8. Cookies

We use cookies and similar technologies to keep you signed in, remember preferences, and understand how our website is used. You can control cookies through your browser settings.

## 9. International Transfers

Your information may be processed in countries other than your own, including India, where our servers and vendors operate. We take steps to ensure appropriate safeguards are in place for such transfers.

## 10. Children's Privacy

CallKaro AI is not directed at individuals under 18, and we do not knowingly collect personal data from children.

## 11. Changes to This Policy

We may update this Privacy Policy from time to time. We will post the updated version on this page and update the "Last updated" date above. Material changes will be communicated via email or an in-product notice.

## 12. Contact Us

If you have questions about this Privacy Policy or how we handle your data, contact us at hello@callkaro.ai or write to us at our Bengaluru office: Koramangala, 5th Block, Bengaluru, KA 560095, India.`,
  },
  "terms-conditions": {
    slug: "terms-conditions",
    title: "Terms & Conditions",
    lastUpdated: "2026-07-12",
    metaDescription:
      "The terms that govern your access to and use of the CallKaro AI website and services.",
    content: `Last updated: July 12, 2026

Please read these Terms & Conditions ("Terms") carefully before using CallKaro AI's website and services (collectively, the "Service"). By accessing or using the Service, you agree to be bound by these Terms. If you do not agree, do not use the Service.

## 1. Who We Are

CallKaro AI provides AI-powered voice agents that answer, place, and manage phone calls for businesses, along with related dashboards, analytics, and integrations.

## 2. Eligibility and Accounts

You must be at least 18 years old and able to form a binding contract to use the Service. You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. Notify us immediately at hello@callkaro.ai if you suspect unauthorized use.

## 3. Description of Service

CallKaro AI licenses access to its software platform on a subscription basis. Features, call minutes, number of agents, and integrations available to you depend on your selected plan. We may modify, add, or remove features at our discretion, with reasonable notice for material changes.

## 4. Acceptable Use

You agree not to use the Service to:
- Place unsolicited, fraudulent, deceptive, or harassing calls, or violate applicable telemarketing, robocalling, or do-not-call regulations (including TRAI regulations in India, TCPA in the United States, or equivalent laws elsewhere).
- Transmit unlawful, defamatory, obscene, or infringing content.
- Attempt to reverse-engineer, resell, or white-label the Service without our written consent.
- Interfere with or disrupt the integrity or performance of the Service.
- Use the Service to collect personal data unlawfully or without appropriate consent from call participants.

We may suspend or terminate accounts that violate this section without prior notice.

## 5. Your Content and Data

You retain ownership of the scripts, knowledge base content, call data, and other materials you upload or generate through the Service ("Customer Data"). You grant CallKaro AI a limited license to use Customer Data to provide, maintain, and improve the Service. You represent that you have all rights and consents necessary to provide Customer Data to us, including consents required to record and process calls.

## 6. Fees and Payment

Subscription fees are billed in advance on a recurring basis (monthly or annually, as selected) unless otherwise agreed in writing. Call minutes, phone numbers, and add-ons may be billed based on usage. All fees are exclusive of applicable taxes unless stated otherwise. Failure to pay may result in suspension or termination of your account. See our Return & Refund Policy for details on refunds.

## 7. Intellectual Property

The Service, including all software, models, designs, and trademarks, is owned by CallKaro AI and its licensors. These Terms do not grant you any rights to our intellectual property except the limited right to use the Service as permitted herein.

## 8. Third-Party Services

The Service may integrate with third-party tools (e.g. CRMs, calendars, telephony carriers, voice technology providers). We are not responsible for the availability, accuracy, or practices of third-party services, which are governed by their own terms.

## 9. Disclaimers

The Service is provided "as is" and "as available" without warranties of any kind, whether express or implied, including warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not guarantee that the Service will be uninterrupted, error-free, or that AI-generated responses will always be accurate.

## 10. Limitation of Liability

To the maximum extent permitted by law, CallKaro AI shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, revenue, data, or goodwill, arising from your use of the Service. Our total liability for any claim arising out of these Terms shall not exceed the amount you paid us in the twelve (12) months preceding the claim.

## 11. Indemnification

You agree to indemnify and hold CallKaro AI harmless from any claims, damages, or expenses arising from your use of the Service, your Customer Data, or your violation of these Terms or applicable law.

## 12. Termination

You may cancel your subscription at any time through your account settings or by contacting us. We may suspend or terminate your access to the Service for breach of these Terms, non-payment, or as required by law. Upon termination, your right to use the Service ceases immediately; certain provisions of these Terms (including Sections 7, 9, 10, and 11) survive termination.

## 13. Governing Law

These Terms are governed by the laws of India, without regard to conflict of law principles. Any disputes shall be subject to the exclusive jurisdiction of the courts of Bengaluru, Karnataka, India.

## 14. Changes to These Terms

We may update these Terms from time to time. Continued use of the Service after changes take effect constitutes acceptance of the revised Terms. Material changes will be communicated via email or an in-product notice.

## 15. Contact Us

Questions about these Terms can be sent to hello@callkaro.ai.`,
  },
  "return-refund-policy": {
    slug: "return-refund-policy",
    title: "Return & Refund Policy",
    lastUpdated: "2026-07-12",
    metaDescription:
      "How refunds work for CallKaro AI subscriptions, call minutes, and usage-based charges.",
    content: `Last updated: July 12, 2026

This Return & Refund Policy explains how refunds work for CallKaro AI subscriptions and usage-based charges. It should be read together with our Terms & Conditions.

## 1. Subscription Plans

CallKaro AI subscriptions are billed in advance on a monthly or annual basis, depending on the plan you choose. Subscription fees are non-refundable except as described in this policy.

## 2. Free Trial and Cancellations

If your plan includes a free trial, you can cancel at any time before the trial ends without being charged. Once a paid subscription begins, you can cancel anytime through your account settings or by emailing hello@callkaro.ai; cancellation stops future billing but does not refund the current billing period unless required by law.

## 3. Monthly Plans

Monthly subscription fees are non-refundable once the billing period has started. If you cancel mid-cycle, you will retain access to the Service until the end of the current billing period.

## 4. Annual Plans

If you are on an annual plan, you may request a prorated refund for the unused portion of your subscription within 14 days of the most recent annual renewal charge. After 14 days, annual fees are non-refundable, though you will retain access for the remainder of the paid term.

## 5. Call Minutes and Usage-Based Charges

Call minutes, phone number rentals, and other usage-based charges are billed based on actual consumption and are non-refundable once used. Unused prepaid call minutes tied to a cancelled account are non-refundable unless required by applicable law.

## 6. Billing Errors

If you believe you were charged in error (e.g. duplicate charge, incorrect amount), contact us at hello@callkaro.ai within 30 days of the charge. We will investigate and, where an error is confirmed, issue a full refund of the incorrect amount.

## 7. Service Issues

If a verified, sustained outage or defect on our end prevented you from using a material part of the Service, contact our support team. We will review the issue and may issue a partial credit or refund at our discretion, proportional to the impact.

## 8. How Refunds Are Processed

Approved refunds are issued to the original payment method within 7-10 business days. Depending on your bank or card issuer, it may take additional time for the refund to appear on your statement.

## 9. Non-Refundable Items

The following are not eligible for refunds under any circumstances:
- Charges for services already rendered or call minutes already used.
- Fees for third-party integrations, phone numbers, or add-ons once provisioned, except where the third party's own policy allows a refund.
- Accounts terminated for violation of our Terms & Conditions or Acceptable Use provisions.

## 10. How to Request a Refund

To request a refund, email hello@callkaro.ai with your account details, invoice number, and the reason for your request. We aim to respond within 3 business days.

## 11. Changes to This Policy

We may update this Return & Refund Policy from time to time. The updated version will be posted on this page along with a revised "Last updated" date.

## 12. Contact Us

For any questions about this policy, reach out to hello@callkaro.ai or write to us at our Bengaluru office: Koramangala, 5th Block, Bengaluru, KA 560095, India.`,
  },
}

function mapStrapiPolicyPage(page: StrapiPolicyPage): PolicyPage | null {
  if (!page.title || !page.slug || !page.lastUpdated || !page.content) {
    return null
  }

  return {
    slug: page.slug,
    title: page.title,
    lastUpdated: page.lastUpdated,
    metaDescription: page.metaDescription,
    content: page.content,
  }
}

async function getStrapiPolicyPageBySlug(
  slug: string
): Promise<PolicyPage | null | undefined> {
  const params = new URLSearchParams()
  params.set("filters[slug][$eq]", slug)
  params.set("pagination[pageSize]", "1")

  const response = await fetchStrapi<StrapiCollectionResponse<StrapiPolicyPage>>(
    "/api/policy-pages",
    params
  )

  if (!response) return undefined

  const page = response.data[0]
  return page ? mapStrapiPolicyPage(unwrapStrapiEntity(page)) : null
}

export async function getPolicyPageBySlug(slug: string): Promise<PolicyPage> {
  const cmsPage = await getStrapiPolicyPageBySlug(slug)
  if (cmsPage) return cmsPage

  return FALLBACK_POLICY_PAGES[slug]
}
