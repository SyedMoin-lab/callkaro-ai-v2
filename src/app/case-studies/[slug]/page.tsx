import { notFound } from "next/navigation"
import { compileMDX } from "next-mdx-remote/rsc"

import CaseStudyArticleHero from "@/components/sections/case-studies-page/article-hero"
import CaseStudyTestimonialCard from "@/components/sections/case-studies-page/testimonial"
import YouAlsoMightLike from "@/components/sections/case-studies-page/you-also-might-like"
import {
  getAllCaseStudies,
  getCaseStudyBySlug,
  getCaseStudySlugs,
} from "@/lib/case-studies"
import type { CaseStudyFrontmatter } from "@/lib/types"

export const dynamic = "force-static"
export const dynamicParams = false

export async function generateStaticParams() {
  const slugs = await getCaseStudySlugs()
  return slugs.map((slug) => ({ slug }))
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [study, all] = await Promise.all([
    getCaseStudyBySlug(slug),
    getAllCaseStudies(),
  ])

  if (!study) {
    notFound()
  }

  const currentIndex = all.findIndex((c) => c.slug === slug)
  const next =
    currentIndex >= 0 && all.length > 1
      ? all[(currentIndex + 1) % all.length]
      : null

  const { content } = await compileMDX<CaseStudyFrontmatter>({
    source: study.content,
    options: { parseFrontmatter: true },
  })

  return (
    <>
      <CaseStudyArticleHero frontmatter={study.frontmatter}>
        <div
          className={[
            "prose max-w-none prose-neutral md:prose-lg",
            "prose-p:my-6 prose-p:leading-relaxed prose-p:text-muted-foreground",
            "prose-strong:font-medium prose-strong:text-foreground",
            "prose-a:text-foreground prose-a:decoration-foreground/30 prose-a:underline-offset-4 hover:prose-a:decoration-foreground",
          ].join(" ")}
        >
          {content}
        </div>

        {study.frontmatter.testimonial && (
          <CaseStudyTestimonialCard
            testimonial={study.frontmatter.testimonial}
          />
        )}
      </CaseStudyArticleHero>

      <YouAlsoMightLike next={next} />
    </>
  )
}
