import {
  fetchStrapi,
  type StrapiCollectionResponse,
  unwrapStrapiEntity,
} from "@/lib/strapi"
import type { FeatureItem } from "@/lib/types"

const FALLBACK_FEATURES: FeatureItem[] = [
  {
    label: "Call Transfer",
    icon: "PhoneForwarded",
    title: "Seamless Call Transfer to Human Agents",
    description:
      "Automatically route calls to a human agent when your AI reaches its limit or the situation requires a personal touch.",
    order: 1,
    wide: true,
  },
  {
    label: "Knowledge Base",
    icon: "BookOpen",
    title: "Custom Knowledge Base for Contextual Conversations",
    description:
      "Upload your own content to give your AI agent the context it needs to respond accurately and intelligently.",
    order: 2,
  },
  {
    label: "Custom Functions",
    icon: "Code2",
    title: "Custom Functions for API-Based Actions",
    description:
      "Enable your voice agent to call your own APIs at any stage of the conversation: before, during, or after the call.",
    order: 3,
  },
  {
    label: "Calendar Booking",
    icon: "CalendarClock",
    title: "Calendar Booking Integration",
    description:
      "Connect your Cal.com account to let CallKaro AI schedule appointments directly on your calendar.",
    order: 4,
  },
  {
    label: "Batch Calls",
    icon: "Megaphone",
    title: "Batch Calling: Reach Thousands in One Go",
    description:
      "Send thousands of AI-powered calls simultaneously by uploading a CSV or using batch call APIs.",
    order: 5,
  },
  {
    label: "Truecaller Verification",
    icon: "BadgeCheck",
    title: "Truecaller Verified Numbers: Build Instant Trust",
    description:
      "Get your CallKaro AI phone numbers verified on Truecaller to increase call pickup rates and brand credibility.",
    order: 6,
  },
  {
    label: "Voicemail Detection",
    icon: "Voicemail",
    title: "Voicemail Detection: Smart Handling for Missed Calls",
    description:
      "Detect when a call reaches voicemail and automate the next step: either end the call or leave a custom message.",
    order: 7,
  },
  {
    label: "Auto Callback",
    icon: "PhoneIncoming",
    title: "Auto Callback on User Request",
    description:
      "Automatically schedule a follow-up call when a user says they're busy and requests a specific time.",
    order: 8,
  },
  {
    label: "Post Call Analysis",
    icon: "BarChart3",
    title: "Post Call Analysis: Structured Insights from Every Conversation",
    description:
      "Automatically analyze every call or campaign with rich insights across Boolean, Text, Number, and Selector data types.",
    order: 9,
    wide: true,
  },
  {
    label: "Webhook Integration",
    icon: "Webhook",
    title: "Post-call Webhooks for Real-Time Call Data Visibility",
    description:
      "Automatically trigger a webhook to your server at the end of every call to receive detailed call insights.",
    order: 10,
  },
]

interface StrapiFeature {
  label?: string
  icon?: string
  title?: string
  description?: string
  order?: number
  wide?: boolean
}

function mapFeature(feature: StrapiFeature): FeatureItem | null {
  if (
    !feature.label ||
    !feature.icon ||
    !feature.title ||
    !feature.description
  ) {
    return null
  }

  return {
    label: feature.label,
    icon: feature.icon,
    title: feature.title,
    description: feature.description,
    order: feature.order ?? 0,
    wide: feature.wide ?? false,
  }
}

async function getStrapiFeatures(): Promise<FeatureItem[] | null> {
  const params = new URLSearchParams()
  params.set("sort[0]", "order:asc")

  const response = await fetchStrapi<StrapiCollectionResponse<StrapiFeature>>(
    "/api/features",
    params
  )

  if (!response) return null

  return response.data
    .map((item) => mapFeature(unwrapStrapiEntity(item)))
    .filter((item): item is FeatureItem => Boolean(item))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
}

export async function getAllFeatures(): Promise<FeatureItem[]> {
  const cmsFeatures = await getStrapiFeatures()
  return cmsFeatures && cmsFeatures.length > 0 ? cmsFeatures : FALLBACK_FEATURES
}
