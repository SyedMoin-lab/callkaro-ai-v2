export type HeroCell =
  | { type: "stat"; eyebrow: string; value: string; body: string }
  | { type: "image"; src: string; alt: string }

export type StoryPart =
  | { type: "word"; text: string }
  | { type: "image"; src: string; alt: string }

export const params = {
  hero: {
    eyebrow: "About",
    heading: {
      line1: "Voice AI that",
      line2: "answers & delivers.",
    },
    body: "CallKaro AI builds human-sounding voice agents that handle every business call, so teams stop losing calls and stop wasting time on repetitive phone work.",
    rowDark: [
      {
        type: "stat",
        eyebrow: "Calls handled",
        value: "10M+",
        body: "Conversations handled end to end by our AI voice agents, from first ring to final follow-up.",
      },
      {
        type: "image",
        src: "/images/about/hero-1.webp",
        alt: "",
      },
      {
        type: "stat",
        eyebrow: "Businesses",
        value: "500+",
        body: "Teams that trust CallKaro AI to answer inbound support, run campaigns, and book appointments.",
      },
      {
        type: "image",
        src: "/images/about/hero-2.webp",
        alt: "",
      },
    ] as HeroCell[],
    rowWarm: [
      {
        type: "image",
        src: "/images/about/team.webp",
        alt: "",
      },
      {
        type: "stat",
        eyebrow: "Languages",
        value: "20+",
        body: "Natural, human-sounding conversations in the language each of your customers speaks best.",
      },
      {
        type: "image",
        src: "/images/about/hero-3.webp",
        alt: "",
      },
      {
        type: "stat",
        eyebrow: "Uptime",
        value: "99.9%",
        body: "Always-on voice agents that pick up every call, day or night, so no opportunity slips away.",
      },
    ] as HeroCell[],
  },

  story: {
    eyebrow: "Our Story",
    headlineParts: [
      { type: "word", text: "From" },
      { type: "word", text: "one" },
      { type: "word", text: "missed" },
      { type: "word", text: "customer" },
      { type: "word", text: "call," },
      {
        type: "image",
        src: "/images/process/001-intake.webp",
        alt: "",
      },
      { type: "word", text: "to" },
      { type: "word", text: "millions" },
      {
        type: "image",
        src: "/images/process/005-verdict.webp",
        alt: "",
      },
      { type: "word", text: "of" },
      { type: "word", text: "calls" },
      { type: "word", text: "answered" },
      { type: "word", text: "instantly" },
      { type: "word", text: ", " },
      { type: "word", text: "our" },
      { type: "word", text: "mission" },
      { type: "word", text: "is" },
      { type: "word", text: "built" },
      { type: "word", text: "on" },
      { type: "word", text: "natural" },
      { type: "word", text: "voice," },
      {
        type: "image",
        src: "/images/about/hero-1.webp",
        alt: "",
      },
      { type: "word", text: "and" },
      { type: "word", text: "conversations" },
      { type: "word", text: "that" },
      { type: "word", text: "always" },
      { type: "word", text: "connect." },
    ] as StoryPart[],
    trustAvatars: [
      { name: "Jane Anderson", src: "/images/partners/01-anderson.webp" },
      { name: "Marcus Klein", src: "/images/partners/02-klein.webp" },
      { name: "Rachel Lee", src: "/images/partners/03-lee.webp" },
      { name: "Tom Singh", src: "/images/partners/04-singh.webp" },
      { name: "Anna Petrova", src: "/images/partners/05-petrova.webp" },
    ],
    trustLabel: "Trusted by modern teams",
    cta: {
      label: "Book a demo",
      href: "/contact-us",
    },
  },

  mission: {
    eyebrow: "Our Mission",
    heading:
      "Guided by purpose, driven by technology, dedicated to making every business call effortless.",
    body: "Our mission is simple, every business call should be answered instantly, sound genuinely human, and move people forward. We go beyond automation to build trust, real conversations, and outcomes our customers can stand behind, so no lead or customer is ever left waiting.",
    image: {
      src: "/images/about/team-photo.webp",
      alt: "",
    },
    valuePairs: [
      "Instant. Natural. Effortless.",
      "Trust. Commitment. Results.",
      "Respect. Care. Honesty.",
      "Presence. Patience. Calm.",
      "Service. Skill. Empathy.",
      "Honesty. Reliability. Clarity.",
    ],
  },

  practice: {
    eyebrow: "What We Do",
    heading: {
      prefix: "When our AI picks up your calls,",
      highlight: "we mean it.",
    },
    subheading:
      "Five core capabilities, one standard, natural, reliable, and in 20+ languages.",
    practiceAreas: [
      {
        roman: "I",
        slug: "multilingual",
        title: "Inbound Support",
        summary: "Every call answered, day or night.",
        image: "/images/services/i-corporate.webp",
      },
      {
        roman: "II",
        slug: "low-latency",
        title: "Outbound Campaigns",
        summary: "Reach every lead at real scale.",
        image: "/images/services/ii-litigation.webp",
      },
      {
        roman: "III",
        slug: "natural-voice",
        title: "Reminders & Bookings",
        summary: "Confirm visits, fill the calendar.",
        image: "/images/services/iii-compliance.webp",
      },
      {
        roman: "IV",
        slug: "interrupt-friendly",
        title: "Batch & Payment Calls",
        summary: "Bulk dialing and gentle payment nudges.",
        image: "/images/services/iv-ip.webp",
      },
      {
        roman: "V",
        slug: "context-aware",
        title: "Analytics & Integrations",
        summary: "Call insights synced to your CRM.",
        image: "/images/services/v-restructuring.webp",
      },
    ],
    team: [
      { name: "Jane Anderson", src: "/images/partners/01-anderson.webp" },
      { name: "Marcus Klein", src: "/images/partners/02-klein.webp" },
      { name: "Rachel Lee", src: "/images/partners/03-lee.webp" },
      { name: "Tom Singh", src: "/images/partners/04-singh.webp" },
    ],
    peopleCard: {
      text: "Meet the team behind the voice agents.",
      ctaLabel: "Our people",
    },
  },

  values: {
    eyebrow: "Values",
    heading: "Every conversation, natural and reliable.",
    body: "Business calls should feel effortless: answered in seconds, spoken in a genuinely human voice, and handled with care. We build AI voice agents customers trust, backed by dependable uptime, transparent pricing, and strict privacy.",
    image: {
      src: "/images/process/005-verdict.webp",
      alt: "",
    },
    stats: [
      { value: "50+", label: "Enterprise clients" },
      { value: "200+", label: "Businesses onboarded" },
      { value: "1,000+", label: "Calls handled daily" },
    ],
  },

  team: {
    eyebrow: "Our Team",
    heading: "The people making every business call effortless.",
    team: [
      {
        name: "Aarav Mehta",
        role: "Founder & CEO",
        portrait: "/images/partners/01-anderson.webp",
      },
      {
        name: "Neha Kapoor",
        role: "Head of AI & Voice",
        portrait: "/images/partners/02-klein.webp",
      },
      {
        name: "Rohan Iyer",
        role: "Head of Engineering",
        portrait: "/images/partners/03-lee.webp",
      },
      {
        name: "Priya Nair",
        role: "Head of Product",
        portrait: "/images/partners/04-singh.webp",
      },
      {
        name: "Ananya Rao",
        role: "Head of Customer Success",
        portrait: "/images/partners/05-petrova.webp",
      },
      {
        name: "Vikram Sharma",
        role: "Head of Growth",
        portrait: "/images/partners/06-okonkwo.webp",
      },
    ],
  },
}
