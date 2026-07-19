export const params = {
  badge: "Integrations",
  heading: {
    line1: "Powerful integrations for",
    line2: "every call.",
  },
  description:
    "Connect CallKaro AI to the tools your team already runs on, and keep every call, booking, and follow-up in sync automatically.",
  integrations: [
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
  ] as const,
}
