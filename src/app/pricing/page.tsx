import type { Metadata } from "next"

import Calculator from "./_calculator"
import Plans from "./_plans"

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Flexible CallKaro AI pricing across Starter, Growth, and Scale plans. Use the real-time calculator to estimate your monthly cost.",
}

export default function PricingPage() {
  return (
    <>
      <Plans />
      <Calculator />
    </>
  )
}
