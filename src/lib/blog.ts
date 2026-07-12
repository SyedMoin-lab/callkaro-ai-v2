import { compileMDX } from "next-mdx-remote/rsc"
import fs from "fs/promises"
import path from "path"

import {
  fetchStrapi,
  getStrapiMediaUrl,
  type StrapiCollectionResponse,
  unwrapStrapiEntity,
} from "@/lib/strapi"
import type { BlogFrontmatter, BlogPost } from "@/lib/types"

const blogDirectory = path.join(process.cwd(), "content/blog")
const FRONTMATTER_PATTERN = /^---\s*[\r\n]+[\s\S]*?[\r\n]+---\s*[\r\n]?/

interface StrapiBlogPost {
  Title?: string
  ShortDescription?: string
  Slug?: string
  Content?: string
  CoverImage?: unknown
  ReadTime?: number
  author?: unknown
  BlogFaq?: unknown
  MetaTitle?: string
  MetaDescription?: string
  OgImage?: unknown
  createdAt?: string
  publishedAt?: string
  updatedAt?: string
}

interface StrapiAuthor {
  Name?: string
  Role?: string
  Avatar?: unknown
}

function stripFrontmatter(source: string): string {
  return source.replace(FRONTMATTER_PATTERN, "").trim()
}

function unwrapStrapiRelation<T>(relation: unknown): T | null {
  const value =
    relation &&
    typeof relation === "object" &&
    "data" in relation &&
    (relation as { data?: unknown }).data
      ? (relation as { data?: unknown }).data
      : relation

  const single = Array.isArray(value) ? value[0] : value
  if (!single || typeof single !== "object") return null

  return unwrapStrapiEntity(single as never) as T
}

function mapStrapiPost(post: StrapiBlogPost): BlogPost | null {
  if (!post.Title || !post.Slug) {
    return null
  }

  const author = unwrapStrapiRelation<StrapiAuthor>(post.author)
  const date = post.publishedAt ?? post.createdAt ?? post.updatedAt ?? ""
  const image =
    getStrapiMediaUrl(post.CoverImage) ??
    getStrapiMediaUrl(post.OgImage) ??
    "/og-image.jpg"

  return {
    slug: post.Slug,
    content: post.Content ?? "",
    frontmatter: {
      title: post.Title,
      slug: post.Slug,
      excerpt: post.ShortDescription ?? "",
      date,
      image,
      category: "Voice AI",
      tags: undefined,
      author: {
        name: author?.Name ?? "CallKaro AI",
        role: author?.Role ?? "Editorial Team",
        avatar: getStrapiMediaUrl(author?.Avatar),
      },
      readTime:
        typeof post.ReadTime === "number" ? `${post.ReadTime} min` : undefined,
      pinned: false,
    },
  }
}

function postPopulateParams(): URLSearchParams {
  const params = new URLSearchParams()
  params.set("populate[CoverImage]", "true")
  params.set("populate[OgImage]", "true")
  params.set("populate[BlogFaq]", "true")
  params.set("populate[author][populate][0]", "Avatar")
  return params
}

async function getStrapiPosts(): Promise<BlogPost[] | null> {
  const params = postPopulateParams()
  params.set("sort[0]", "createdAt:desc")

  const response = await fetchStrapi<StrapiCollectionResponse<StrapiBlogPost>>(
    "/api/blogs",
    params
  )

  if (!response) return null

  return response.data
    .map((item) => mapStrapiPost(unwrapStrapiEntity(item)))
    .filter((item): item is BlogPost => Boolean(item))
}

async function getStrapiPostBySlug(
  slug: string
): Promise<BlogPost | null | undefined> {
  const params = postPopulateParams()
  params.set("filters[Slug][$eq]", slug)
  params.set("pagination[pageSize]", "1")

  const response = await fetchStrapi<StrapiCollectionResponse<StrapiBlogPost>>(
    "/api/blogs",
    params
  )

  if (!response) return undefined

  const post = response.data[0]
  return post ? mapStrapiPost(unwrapStrapiEntity(post)) : null
}

async function getLocalPostSlugs(): Promise<string[]> {
  try {
    const files = await fs.readdir(blogDirectory)
    return files
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => file.replace(".mdx", ""))
  } catch (error) {
    console.error("Error reading blog directory:", error)
    return []
  }
}

async function getLocalPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(blogDirectory, `${slug}.mdx`)
    const fileContents = await fs.readFile(fullPath, "utf8")

    const { frontmatter } = await compileMDX<BlogFrontmatter>({
      source: fileContents,
      options: { parseFrontmatter: true },
    })

    return {
      slug,
      content: stripFrontmatter(fileContents),
      frontmatter,
    }
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error)
    return null
  }
}

async function getLocalAllPosts(): Promise<BlogFrontmatter[]> {
  try {
    const files = await fs.readdir(blogDirectory)
    const mdxFiles = files.filter((file) => file.endsWith(".mdx"))

    const posts = await Promise.all(
      mdxFiles.map(async (file) => {
        const fullPath = path.join(blogDirectory, file)
        const fileContents = await fs.readFile(fullPath, "utf8")
        const { frontmatter } = await compileMDX<BlogFrontmatter>({
          source: fileContents,
          options: { parseFrontmatter: true },
        })
        return frontmatter
      })
    )

    return posts.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1
      if (!a.pinned && b.pinned) return 1
      const aTime = a.date ? new Date(a.date).getTime() : 0
      const bTime = b.date ? new Date(b.date).getTime() : 0
      return bTime - aTime
    })
  } catch (error) {
    console.error("Error reading all blog posts:", error)
    return []
  }
}

export async function getPostSlugs(): Promise<string[]> {
  const cmsPosts = await getStrapiPosts()
  if (cmsPosts && cmsPosts.length > 0) return cmsPosts.map((post) => post.slug)

  return getLocalPostSlugs()
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const cmsPost = await getStrapiPostBySlug(slug)
  if (cmsPost) return cmsPost

  return getLocalPostBySlug(slug)
}

export async function getAllPosts(): Promise<BlogFrontmatter[]> {
  const cmsPosts = await getStrapiPosts()
  if (cmsPosts && cmsPosts.length > 0) {
    return cmsPosts.map((post) => post.frontmatter)
  }

  return getLocalAllPosts()
}
