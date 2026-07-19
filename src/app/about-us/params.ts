export type HeroCell =
  | { type: "stat"; eyebrow: string; value: string; body: string }
  | { type: "image"; src: string; alt: string }

export type StoryPart =
  { type: "word"; text: string } | { type: "image"; src: string; alt: string }

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
        src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80",
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
        src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80",
        alt: "",
      },
    ] as HeroCell[],
    rowWarm: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
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
        src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80",
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
        src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80",
        alt: "",
      },
      { type: "word", text: "to" },
      { type: "word", text: "millions" },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80",
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
        src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80",
        alt: "",
      },
      { type: "word", text: "and" },
      { type: "word", text: "conversations" },
      { type: "word", text: "that" },
      { type: "word", text: "always" },
      { type: "word", text: "connect." },
    ] as StoryPart[],
    trustAvatars: [
      {
        name: "Jane Anderson",
        src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Marcus Klein",
        src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Rachel Lee",
        src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Tom Singh",
        src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Anna Petrova",
        src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
      },
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
      src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
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
        image:
          "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80",
      },
      {
        roman: "II",
        slug: "low-latency",
        title: "Outbound Campaigns",
        summary: "Reach every lead at real scale.",
        image:
          "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80",
      },
      {
        roman: "III",
        slug: "natural-voice",
        title: "Reminders & Bookings",
        summary: "Confirm visits, fill the calendar.",
        image:
          "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80",
      },
      {
        roman: "IV",
        slug: "interrupt-friendly",
        title: "Batch & Payment Calls",
        summary: "Bulk dialing and gentle payment nudges.",
        image:
          "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80",
      },
      {
        roman: "V",
        slug: "context-aware",
        title: "Analytics & Integrations",
        summary: "Call insights synced to your CRM.",
        image:
          "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80",
      },
    ],
    team: [
      {
        name: "Jane Anderson",
        src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Marcus Klein",
        src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Rachel Lee",
        src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Tom Singh",
        src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
      },
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
      src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80",
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
        portrait:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Neha Kapoor",
        role: "Head of AI & Voice",
        portrait:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Rohan Iyer",
        role: "Head of Engineering",
        portrait:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Priya Nair",
        role: "Head of Product",
        portrait:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Ananya Rao",
        role: "Head of Customer Success",
        portrait:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Vikram Sharma",
        role: "Head of Growth",
        portrait:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
}
