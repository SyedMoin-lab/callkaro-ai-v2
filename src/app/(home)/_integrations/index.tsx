import { Plug } from "lucide-react"

import SectionHeader from "@/common/elements/sectionHeader"

const INTEGRATIONS = [
  {
    name: "Google Calendar",
    icon: "https://svgl.app/library/google-calendar.svg",
    description:
      "Book, confirm, and reschedule appointments in real time while the agent is still on the call.",
  },
  {
    name: "WhatsApp",
    icon: "https://svgl.app/library/whatsapp-icon.svg",
    description:
      "Send call summaries, confirmations, and follow-ups straight to your customer's chat.",
  },
  {
    name: "Twilio",
    icon: "https://svgl.app/library/twilio.svg",
    description:
      "Provision numbers and route SMS and voice on infrastructure built to scale with call volume.",
  },
  {
    name: "Slack",
    icon: "https://svgl.app/library/slack.svg",
    description:
      "Push live call transcripts and handoff alerts to the channel your team already watches.",
  },
  {
    name: "Salesforce",
    icon: "https://svgl.app/library/salesforce.svg",
    description:
      "Log every call, update contact records, and keep deal stages current without manual entry.",
  },
  {
    name: "n8n",
    icon: "https://svgl.app/library/n8n.svg",
    description:
      "Trigger AI calls, sync records, and connect CallKaro AI to your whole workflow with no code.",
  },
] as const

function Integrations() {
  return (
    <section className="section-padding overflow-hidden">
      <div className="container">
        <SectionHeader
          badge="Integrations"
          heading={<>Powerful integrations for every call.</>}
          description="Connect CallKaro AI to the tools your team already runs on, and keep every call, booking, and follow-up in sync automatically."
          mark={
            <Plug
              aria-hidden
              className="size-10 text-foreground/30"
              strokeWidth={1}
            />
          }
        />
      </div>

      <div className="container mt-12 md:mt-16 lg:mt-20">
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-5">
          {INTEGRATIONS.map((it) => (
            <li key={it.name} className="rounded-xl bg-muted/60 p-7 md:p-8">
              <img src={it.icon} alt="" className="size-10" />
              <h3 className="mt-5 text-lg font-medium tracking-tight">
                {it.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {it.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Integrations
