import { notFound } from "next/navigation"
import { compileMDX } from "next-mdx-remote/rsc"

import { getAllPosts, getPostBySlug, getPostSlugs } from "@/lib/blog"
import { getAllServices } from "@/lib/services"
import type { BlogFrontmatter } from "@/lib/types"

import BlogArticleHero from "./article-hero"
import MorePosts from "./more-posts"

export const dynamic = "force-static"
export const dynamicParams = false

export async function generateStaticParams() {
  const slugs = await getPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [post, all, services] = await Promise.all([
    getPostBySlug(slug),
    getAllPosts(),
    getAllServices(),
  ])

  if (!post) {
    notFound()
  }

  const others = all.filter((p) => p.slug !== slug).slice(0, 3)

  const { content } = await compileMDX<BlogFrontmatter>({
    source: post.content,
    options: { parseFrontmatter: true },
  })

  return (
    <>
      <BlogArticleHero frontmatter={post.frontmatter} services={services}>
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
      </BlogArticleHero>

      <MorePosts posts={others} />
    </>
  )
}
