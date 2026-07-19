export const params = {
  eyebrow: "Live Demo",
  heading: "Hear your AI agent in action",
  subheading:
    "Pick a use case, press play, and listen to how CallKaro AI handles a real customer conversation.",
  useCases: [
    {
      id: "receptionist",
      label: "Receptionist",
      tagline:
        "Greets every caller, answers questions, and routes them to the right place — around the clock.",
      capabilities: [
        "Answers common questions instantly",
        "Routes calls to the right team",
        "Takes messages and books callbacks",
        "Never puts a caller on hold",
      ],
      audio: "/audio/receptionist.mp3",
    },
    {
      id: "appointment-setter",
      label: "Appointment Setter",
      tagline:
        "Books, reschedules, and confirms appointments straight into your calendar.",
      capabilities: [
        "Checks real-time availability",
        "Books and reschedules slots",
        "Sends confirmations and reminders",
        "Cuts down no-shows",
      ],
      audio: "/audio/appointment-setter.mp3",
    },
    {
      id: "lead-qualification",
      label: "Lead Qualification",
      tagline:
        "Qualifies inbound leads with the right questions and hands hot ones to sales.",
      capabilities: [
        "Asks smart qualifying questions",
        "Scores and prioritises leads",
        "Captures contact details",
        "Routes hot leads to your team",
      ],
      audio: "/audio/lead-qualification.mp3",
    },
    {
      id: "customer-service",
      label: "Customer Service",
      tagline:
        "Resolves common issues instantly and escalates to a human when it matters.",
      capabilities: [
        "Resolves FAQs and account queries",
        "Checks order and ticket status",
        "Escalates to a human seamlessly",
        "Logs every interaction",
      ],
      audio: "/audio/customer-service.mp3",
    },
    {
      id: "debt-collection",
      label: "Debt Collection",
      tagline:
        "Makes polite, compliant reminder calls and captures payment intent.",
      capabilities: [
        "Delivers compliant reminder scripts",
        "Captures promise-to-pay",
        "Handles objections calmly",
        "Retries on the right schedule",
      ],
      audio: "/audio/debt-collection.mp3",
    },
    {
      id: "survey",
      label: "Survey",
      tagline:
        "Runs friendly phone surveys and captures structured feedback at scale.",
      capabilities: [
        "Asks survey questions naturally",
        "Captures ratings and answers",
        "Branches based on responses",
        "Exports clean, structured results",
      ],
      audio: "/audio/survey.mp3",
    },
  ],
}
