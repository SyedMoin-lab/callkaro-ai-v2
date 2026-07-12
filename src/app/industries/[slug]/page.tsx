import { notFound } from "next/navigation"
import { compileMDX } from "next-mdx-remote/rsc"

import { getAllFeatures } from "@/lib/features"
import {
  getAllIndustries,
  getIndustriesPageHero,
  getIndustryBySlug,
  getIndustrySlugs,
} from "@/lib/industries"
import type { IndustryFrontmatter } from "@/lib/types"

import IndustryHero from "./article-hero"
import MainFeatures from "./main-features"
import MoreIndustries from "./more-industries"
import IndustryStats from "./stats"
import Testimonial from "./testimonial"
import TrustBar from "./trust-bar"
import UseCases from "./use-cases"

export const dynamic = "force-static"
export const dynamicParams = false

export async function generateStaticParams() {
  const slugs = await getIndustrySlugs()
  return slugs.map((slug) => ({ slug }))
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [industry, all, features, hero] = await Promise.all([
    getIndustryBySlug(slug),
    getAllIndustries(),
    getAllFeatures(),
    getIndustriesPageHero(),
  ])

  if (!industry) {
    notFound()
  }

  const others = all.filter((s) => s.slug !== slug)

  const { content } = await compileMDX<IndustryFrontmatter>({
    source: industry.content,
    options: { parseFrontmatter: true },
  })

  return (
    <>
      <IndustryHero frontmatter={industry.frontmatter} hero={hero}>
        <div
          className={[
            "prose mx-auto max-w-2xl text-center prose-neutral",
            "prose-p:text-base prose-p:leading-relaxed prose-p:text-muted-foreground md:prose-p:text-lg",
          ].join(" ")}
        >
          {content}
        </div>
      </IndustryHero>

      <TrustBar text={hero.trustBarText} />
      <MainFeatures
        features={features.slice(0, 4)}
        heading={hero.mainFeaturesHeading}
        subheading={hero.mainFeaturesSubheading}
      />
      <UseCases
        frontmatter={industry.frontmatter}
        headingTemplate={hero.useCasesHeadingTemplate}
        subheadingTemplate={hero.useCasesSubheadingTemplate}
      />
      <Testimonial
        testimonial={industry.frontmatter.testimonial}
        name={industry.frontmatter.name}
        ctaLabelTemplate={hero.testimonialCtaLabelTemplate}
        ctaHref={hero.testimonialCtaHref}
      />
      <IndustryStats items={hero.statsItems} />
      <MoreIndustries
        industries={others}
        heading={hero.moreIndustriesHeading}
        viewAllLabel={hero.moreIndustriesViewAllLabel}
      />
    </>
  )
}
