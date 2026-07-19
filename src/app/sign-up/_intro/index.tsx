import { Check } from "lucide-react"

const FEATURES = [
  {
    title: "Run Click to WhatsApp Ads",
    description:
      "Create, Run, Analyse & Connect Ads to WhatsApp Chatbot Flows Seamlessly",
  },
  {
    title: "Advanced Analytics Dashboard",
    description:
      "Track message delivery, open rates, and customer engagement metrics",
  },
  {
    title: "Seamless CRM Integration",
    description:
      "Connect with your existing business tools for streamlined operations",
  },
  {
    title: "Multi-agent Support System",
    description:
      "Manage customer conversations with team collaboration features",
  },
]

export default function SignupIntro() {
  return (
    <div className="relative flex flex-col justify-center overflow-y-auto bg-gradient-to-br from-accent/[0.08] via-background to-background px-6 py-10 md:px-12 lg:px-16">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 size-72 rounded-full bg-accent/10 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-lg">
        <div className="flex items-center gap-2.5">
          <span className="text-xl font-medium tracking-tight">
            CallKaro AI
          </span>
        </div>

        <h1 className="mt-8 text-3xl leading-[1.08] font-light tracking-tight text-balance md:text-4xl lg:text-5xl">
          Your First Step to <span className="text-accent">5x</span> Business
          Engagement with AI
        </h1>

        <h2 className="mt-7 text-base font-medium tracking-tight md:text-lg">
          Why Choose CallKaro AI for WhatsApp Business?
        </h2>

        <ul className="mt-5 space-y-4">
          {FEATURES.map((feature) => (
            <li key={feature.title} className="flex gap-3">
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                <Check className="size-3" strokeWidth={3} />
              </span>
              <div className="space-y-0.5">
                <p className="leading-snug font-medium text-foreground">
                  {feature.title}
                </p>
                <p className="text-sm leading-snug text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
