import type { Metadata } from "next"

import { getAllFeatures } from "@/lib/features"

import FeatureGrid from "./grid"
import FeaturesHero from "./hero"

export const metadata: Metadata = {
  title: "Features",
  description:
    "Explore CallKaro AI's suite of AI-powered voice tools: call transfer, knowledge base, custom functions, calendar booking, batch calling, analytics, and more.",
}

export default async function FeaturesPage() {
  const features = await getAllFeatures()

  return (
    <>
      <FeaturesHero />
      <FeatureGrid features={features} />
    </>
  )
}
