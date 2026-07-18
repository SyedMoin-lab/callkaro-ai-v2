import type { Metadata } from "next"

import Calculator from "./_calculator"
import Plans from "./_plans"

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "CallKaro AI pricing: Fixed, Consumption Based, and Enterprise plans. See how much you save versus a human agent with the replacement cost calculator.",
}

export default function PricingPage() {
  return (
    <>
      <Plans />
      <Calculator />
    </>
  )
}
