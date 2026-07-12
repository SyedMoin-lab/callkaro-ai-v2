import ReactMarkdown from "react-markdown"
import { notFound } from "next/navigation"
import remarkGfm from "remark-gfm"

import {
  getAllCaseStudies,
  getCaseStudyBySlug,
  getCaseStudySlugs,
} from "@/lib/case-studies"

import CaseStudyArticleHero from "./article-hero"
import CaseStudyTestimonialCard from "./testimonial"
import YouAlsoMightLike from "./you-also-might-like"

export const dynamic = "force-static"
export const dynamicParams = true
export const revalidate = 60

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
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {study.content}
          </ReactMarkdown>
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
