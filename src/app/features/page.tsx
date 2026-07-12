import type { Metadata } from "next"

import { getAllFeatures } from "@/lib/features"

import FeatureGrid from "./_featureGrid"

export const metadata: Metadata = {
  title: "Features",
  description:
    "Explore CallKaro AI's suite of AI-powered voice tools: call transfer, knowledge base, custom functions, calendar booking, batch calling, analytics, and more.",
}

export default async function FeaturesPage() {
  const features = await getAllFeatures()

  return <FeatureGrid features={features} />
}
