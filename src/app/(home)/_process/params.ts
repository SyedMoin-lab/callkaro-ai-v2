const OFFICE =
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80"
const TEAM =
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80"

export const params = {
  badge: "Our Process",
  heading: {
    line1: "Five steps from first",
    line2: "call to a live voice agent.",
  },
  description:
    "Five steps to a working AI calling agent. The same team guides you from the first call to launch, and you can be live in days, not months.",
  phases: [
    {
      title: "Discovery",
      body: "We start with a call to understand your goals, your call flows, and the outcomes you want to automate. No generic templates.",
      image: { src: OFFICE },
    },
    {
      title: "Build",
      body: "We configure your voice agent: the script, a knowledge base built from your own content, custom functions, and clear rules for when to hand off.",
      image: { src: TEAM },
    },
    {
      title: "Connect",
      body: "We connect your phone numbers, CRM, and calendar, then test the agent on real scenarios until it sounds right and handles the edge cases.",
      image: { src: OFFICE },
    },
    {
      title: "Go live",
      body: "Your agent goes live on inbound and outbound calls, answering in seconds and transferring to a human whenever a call genuinely needs one.",
      image: { src: TEAM },
    },
    {
      title: "Optimize",
      body: "Post-call analytics show what is working. We keep tuning answer rates, resolution, and conversions so your results improve every week.",
      image: { src: OFFICE },
    },
  ],
}
