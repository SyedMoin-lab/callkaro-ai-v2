import { compileMDX } from "next-mdx-remote/rsc"
import fs from "fs/promises"
import path from "path"

import {
  fetchStrapi,
  getStrapiMediaUrl,
  type StrapiCollectionResponse,
  unwrapStrapiEntity,
} from "@/lib/strapi"
import type {
  IndustryArticle,
  IndustryFrontmatter,
  IndustryUseCase,
} from "@/lib/types"

const industriesDirectory = path.join(process.cwd(), "content/industries")

interface StrapiIndustryUseCase {
  title?: string
  description?: string
}

interface StrapiIndustry {
  name?: string
  slug?: string
  industryId?: string
  tagline?: string
  description?: string
  icon?: string
  order?: number
  image?: unknown
  imageUrl?: string
  useCases?: StrapiIndustryUseCase[]
  testimonialQuote?: string
  testimonialAuthor?: string
  testimonialRole?: string
  content?: string
}

function mapUseCases(useCases?: StrapiIndustryUseCase[]): IndustryUseCase[] {
  if (!useCases) return []

  return useCases
    .filter((useCase) => Boolean(useCase.title && useCase.description))
    .map((useCase) => ({
      title: useCase.title as string,
      description: useCase.description as string,
    }))
}

function mapStrapiIndustry(industry: StrapiIndustry): IndustryArticle | null {
  if (
    !industry.name ||
    !industry.slug ||
    !industry.industryId ||
    !industry.tagline ||
    !industry.description ||
    !industry.icon ||
    !industry.testimonialQuote ||
    !industry.testimonialAuthor ||
    !industry.testimonialRole
  ) {
    return null
  }

  return {
    slug: industry.slug,
    content: industry.content ?? "",
    frontmatter: {
      slug: industry.slug,
      id: industry.industryId,
      name: industry.name,
      tagline: industry.tagline,
      description: industry.description,
      icon: industry.icon,
      order: industry.order ?? 0,
      image: getStrapiMediaUrl(industry.image, industry.imageUrl) ?? "/og-image.jpg",
      useCases: mapUseCases(industry.useCases),
      testimonial: {
        quote: industry.testimonialQuote,
        author: industry.testimonialAuthor,
        role: industry.testimonialRole,
      },
    },
  }
}

function industryPopulateParams(): URLSearchParams {
  const params = new URLSearchParams()
  params.set("populate[0]", "image")
  params.set("populate[1]", "useCases")
  return params
}

async function getStrapiIndustries(): Promise<IndustryArticle[] | null> {
  const params = industryPopulateParams()
  params.set("sort[0]", "order:asc")

  const response = await fetchStrapi<StrapiCollectionResponse<StrapiIndustry>>(
    "/api/industries",
    params
  )

  if (!response) return null

  return response.data
    .map((item) => mapStrapiIndustry(unwrapStrapiEntity(item)))
    .filter((item): item is IndustryArticle => Boolean(item))
    .sort((a, b) => a.frontmatter.order - b.frontmatter.order)
}

async function getStrapiIndustryBySlug(
  slug: string
): Promise<IndustryArticle | null | undefined> {
  const params = industryPopulateParams()
  params.set("filters[slug][$eq]", slug)
  params.set("pagination[pageSize]", "1")

  const response = await fetchStrapi<StrapiCollectionResponse<StrapiIndustry>>(
    "/api/industries",
    params
  )

  if (!response) return undefined

  const industry = response.data[0]
  return industry ? mapStrapiIndustry(unwrapStrapiEntity(industry)) : null
}

async function getLocalIndustrySlugs(): Promise<string[]> {
  try {
    const files = await fs.readdir(industriesDirectory)
    return files
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => file.replace(".mdx", ""))
  } catch (error) {
    console.error("Error reading industries directory:", error)
    return []
  }
}

async function getLocalIndustryBySlug(
  slug: string
): Promise<IndustryArticle | null> {
  try {
    const fullPath = path.join(industriesDirectory, `${slug}.mdx`)
    const fileContents = await fs.readFile(fullPath, "utf8")

    const { frontmatter } = await compileMDX<IndustryFrontmatter>({
      source: fileContents,
      options: { parseFrontmatter: true },
    })

    return {
      slug,
      content: fileContents,
      frontmatter,
    }
  } catch (error) {
    console.error(`Error reading industry ${slug}:`, error)
    return null
  }
}

async function getLocalAllIndustries(): Promise<IndustryFrontmatter[]> {
  try {
    const files = await fs.readdir(industriesDirectory)
    const mdxFiles = files.filter((file) => file.endsWith(".mdx"))

    const industries = await Promise.all(
      mdxFiles.map(async (file) => {
        const fullPath = path.join(industriesDirectory, file)
        const fileContents = await fs.readFile(fullPath, "utf8")
        const { frontmatter } = await compileMDX<IndustryFrontmatter>({
          source: fileContents,
          options: { parseFrontmatter: true },
        })
        return frontmatter
      })
    )

    return industries.sort((a, b) => a.order - b.order)
  } catch (error) {
    console.error("Error reading all industries:", error)
    return []
  }
}

export async function getIndustrySlugs(): Promise<string[]> {
  const cmsIndustries = await getStrapiIndustries()
  if (cmsIndustries && cmsIndustries.length > 0) {
    return cmsIndustries.map((industry) => industry.slug)
  }

  return getLocalIndustrySlugs()
}

export async function getIndustryBySlug(
  slug: string
): Promise<IndustryArticle | null> {
  const cmsIndustry = await getStrapiIndustryBySlug(slug)
  if (cmsIndustry) return cmsIndustry

  return getLocalIndustryBySlug(slug)
}

export async function getAllIndustries(): Promise<IndustryFrontmatter[]> {
  const cmsIndustries = await getStrapiIndustries()
  if (cmsIndustries && cmsIndustries.length > 0) {
    return cmsIndustries.map((industry) => industry.frontmatter)
  }

  return getLocalAllIndustries()
}
