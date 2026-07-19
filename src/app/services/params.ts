import type { ServiceFrontmatter } from "@/lib/types"

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80"

export const params = {
  // Used when no CMS/MDX content is present, so /services is never blank.
  services: [
    {
      slug: "multilingual",
      id: "01",
      name: "Multilingual & Accent-Adaptive",
      tagline: "20+ languages, every regional accent understood",
      description:
        "Our AI voice agent supports 20+ languages and understands diverse regional accents for seamless, inclusive conversations.",
      icon: "Languages",
      order: 1,
      image: PLACEHOLDER_IMAGE,
      subAreas: ["Language detection", "Accent adaptation", "Code-switching"],
    },
    {
      slug: "low-latency",
      id: "02",
      name: "Low Latency",
      tagline: "Real-time responses with near-zero delay",
      description:
        "Fast responses, no matter the query. Experience real-time interactions with near-zero delay.",
      icon: "Zap",
      order: 2,
      image: PLACEHOLDER_IMAGE,
      subAreas: ["Streaming responses", "Edge routing", "Instant pickup"],
    },
    {
      slug: "natural-voice",
      id: "03",
      name: "Natural, Human-Sounding Voice",
      tagline: "Warmth, clarity, and emotion on every call",
      description:
        "No robotic tones. Our voice agents sound genuinely human, engaging customers with warmth, clarity, and emotion.",
      icon: "Mic",
      order: 3,
      image: PLACEHOLDER_IMAGE,
      subAreas: ["Natural prosody", "Emotional tone", "Custom voices"],
    },
    {
      slug: "interrupt-friendly",
      id: "04",
      name: "Interrupt-Friendly & Intuitive",
      tagline: "Handles interruptions just like a human would",
      description:
        "Just like a real human, the AI can handle interruptions mid-sentence, adapt, and pick up the conversation naturally.",
      icon: "MessageSquare",
      order: 4,
      image: PLACEHOLDER_IMAGE,
      subAreas: ["Barge-in handling", "Turn taking", "Context recovery"],
    },
    {
      slug: "context-aware",
      id: "05",
      name: "Context-Aware & Customisable",
      tagline: "Adapts to your business logic, intent, and tone",
      description:
        "Tailor every conversation to suit your business logic. Our AI adapts fluidly to user intent, context, and tone.",
      icon: "Sparkles",
      order: 5,
      image: PLACEHOLDER_IMAGE,
      subAreas: ["Knowledge base", "Intent routing", "Custom scripts"],
    },
    {
      slug: "api-integration",
      id: "06",
      name: "Simple API Integration",
      tagline: "Plug into your CRM, database, and knowledge base",
      description:
        "Plug into your existing CRM, databases, and knowledge bases effortlessly, with flexible, developer-friendly APIs.",
      icon: "Code2",
      order: 6,
      image: PLACEHOLDER_IMAGE,
      subAreas: ["REST APIs", "Webhooks", "CRM connectors"],
    },
  ] satisfies ServiceFrontmatter[],
}
