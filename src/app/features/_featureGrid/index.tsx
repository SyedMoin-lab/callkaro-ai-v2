import Link from "next/link"
import {
  BadgeCheck,
  BarChart3,
  BookOpen,
  CalendarClock,
  ChevronRight,
  Code2,
  type LucideIcon,
  Megaphone,
  PhoneForwarded,
  PhoneIncoming,
  SquareDashedMousePointer,
  Voicemail,
  Webhook,
} from "lucide-react"

import { Separator } from "@/common/shadcnUI/separator"
import { cn } from "@/lib/utils"

type Feature = {
  label: string
  icon: LucideIcon
  title: string
  description: string
}

const FEATURES: Feature[] = [
  {
    label: "Call Transfer",
    icon: PhoneForwarded,
    title: "Seamless Call Transfer to Human Agents",
    description:
      "Automatically route calls to a human agent when your AI reaches its limit or the situation requires a personal touch.",
  },
  {
    label: "Knowledge Base",
    icon: BookOpen,
    title: "Custom Knowledge Base for Contextual Conversations",
    description:
      "Upload your own content to give your AI agent the context it needs to respond accurately and intelligently.",
  },
  {
    label: "Custom Functions",
    icon: Code2,
    title: "Custom Functions for API-Based Actions",
    description:
      "Enable your voice agent to call your own APIs at any stage of the conversation: before, during, or after the call.",
  },
  {
    label: "Calendar Booking",
    icon: CalendarClock,
    title: "Calendar Booking Integration",
    description:
      "Connect your Cal.com account to let CallKaro AI schedule appointments directly on your calendar.",
  },
  {
    label: "Batch Calls",
    icon: Megaphone,
    title: "Batch Calling: Reach Thousands in One Go",
    description:
      "Send thousands of AI-powered calls simultaneously by uploading a CSV or using batch call APIs.",
  },
  {
    label: "Truecaller Verification",
    icon: BadgeCheck,
    title: "Truecaller Verified Numbers: Build Instant Trust",
    description:
      "Get your CallKaro AI phone numbers verified on Truecaller to increase call pickup rates and brand credibility.",
  },
  {
    label: "Voicemail Detection",
    icon: Voicemail,
    title: "Voicemail Detection: Smart Handling for Missed Calls",
    description:
      "Detect when a call reaches voicemail and automate the next step: either end the call or leave a custom message.",
  },
  {
    label: "Auto Callback",
    icon: PhoneIncoming,
    title: "Auto Callback on User Request",
    description:
      "Automatically schedule a follow-up call when a user says they're busy and requests a specific time.",
  },
  {
    label: "Post Call Analysis",
    icon: BarChart3,
    title: "Post Call Analysis: Structured Insights from Every Conversation",
    description:
      "Automatically analyze every call or campaign with rich insights across Boolean, Text, Number, and Selector data types.",
  },
  {
    label: "Webhook Integration",
    icon: Webhook,
    title: "Post-call Webhooks for Real-Time Call Data Visibility",
    description:
      "Automatically trigger a webhook to your server at the end of every call to receive detailed call insights.",
  },
]

// Wider cells create the bento rhythm on large screens (these hold the
// longest titles so nothing wraps awkwardly).
const WIDE = new Set([0, 8])

export default function FeatureGrid() {
  return (
    <section className="pt-32 pb-20 md:pt-44 md:pb-28">
      <div className="container">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <SquareDashedMousePointer className="size-5 text-accent" />
              <p>Features</p>
            </div>
            <Link
              href="/services"
              className="flex items-center gap-1 transition-colors hover:text-accent hover:underline"
            >
              Learn more
              <ChevronRight className="inline-block size-4" />
            </Link>
          </div>

          <Separator className="mt-3 mb-8" />

          <div className="mb-9 flex flex-col justify-between gap-6 md:flex-row lg:mb-14">
            <h2 className="text-3xl font-light tracking-tight text-balance md:w-1/2 md:text-4xl">
              Powerful Features
            </h2>
            <p className="text-balance text-muted-foreground md:w-1/2">
              Explore our comprehensive suite of AI-powered tools designed to
              transform your business communication strategy.
            </p>
          </div>

          <div className="grid grid-flow-dense grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature, index) => (
              <FeatureCard
                key={feature.label}
                feature={feature}
                wide={WIDE.has(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ feature, wide }: { feature: Feature; wide: boolean }) {
  const Icon = feature.icon
  return (
    <div
      className={cn(
        "group flex flex-col rounded-2xl border border-border bg-card p-6 ring-1 ring-foreground/5 transition-colors hover:border-accent/40",
        // Wide bento cards carry the big content: larger type, more room.
        wide && "lg:col-span-2 lg:p-8"
      )}
    >
      {/* Icon (no background) sits on one row with its label. */}
      <div className="flex items-center gap-2.5 text-accent">
        <Icon
          className={cn("shrink-0", wide ? "size-6" : "size-5")}
          strokeWidth={1.75}
        />
        <span
          className={cn(
            "font-semibold tracking-tight text-foreground",
            wide ? "text-base" : "text-sm"
          )}
        >
          {feature.label}
        </span>
      </div>

      <h3
        className={cn(
          "mt-4 font-medium tracking-tight text-balance",
          wide ? "text-2xl md:text-3xl" : "min-h-14 text-lg"
        )}
      >
        {feature.title}
      </h3>
      <p
        className={cn(
          "mt-2 leading-relaxed text-muted-foreground",
          wide ? "max-w-2xl text-base" : "text-sm"
        )}
      >
        {feature.description}
      </p>
    </div>
  )
}
