import { notFound } from "next/navigation"
import { compileMDX } from "next-mdx-remote/rsc"

import {
  getAllServices,
  getServiceBySlug,
  getServiceSlugs,
} from "@/lib/services"
import type { ServiceFrontmatter } from "@/lib/types"

import ServiceArticleHero from "./article-hero"
import MoreServices from "./more-services"

export const dynamic = "force-static"
export const dynamicParams = false

export async function generateStaticParams() {
  const slugs = await getServiceSlugs()
  return slugs.map((slug) => ({ slug }))
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [service, all] = await Promise.all([
    getServiceBySlug(slug),
    getAllServices(),
  ])

  if (!service) {
    notFound()
  }

  const others = all.filter((s) => s.slug !== slug)

  const { content } = await compileMDX<ServiceFrontmatter>({
    source: service.content,
    options: { parseFrontmatter: true },
  })

  return (
    <>
      <ServiceArticleHero frontmatter={service.frontmatter}>
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
      </ServiceArticleHero>

      <MoreServices services={others} />
    </>
  )
}
