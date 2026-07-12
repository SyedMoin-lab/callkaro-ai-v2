import { compileMDX } from "next-mdx-remote/rsc"
import fs from "fs/promises"
import path from "path"

import {
  fetchStrapi,
  getStrapiMediaUrl,
  type StrapiCollectionResponse,
  unwrapStrapiEntity,
} from "@/lib/strapi"
import type { CaseStudy, CaseStudyFrontmatter } from "@/lib/types"

const caseStudiesDirectory = path.join(process.cwd(), "content/case-studies")
const FRONTMATTER_PATTERN = /^---\s*[\r\n]+[\s\S]*?[\r\n]+---\s*[\r\n]?/

interface StrapiCaseStudy {
  title?: string
  slug?: string
  description?: string
  caseId?: string
  sector?: string
  practice?: string
  outcome?: string
  metric?: string
  metricLabel?: string
  forum?: string
  year?: string
  date?: string
  image?: unknown
  imageUrl?: string
  pinned?: boolean
  testimonialQuote?: string
  testimonialAuthor?: string
  testimonialRole?: string
  testimonialAvatar?: unknown
  testimonialAvatarUrl?: string
  content?: string
}

function stripFrontmatter(source: string): string {
  return source.replace(FRONTMATTER_PATTERN, "").trim()
}

function mapStrapiCaseStudy(study: StrapiCaseStudy): CaseStudy | null {
  if (
    !study.title ||
    !study.slug ||
    !study.description ||
    !study.caseId ||
    !study.sector ||
    !study.practice ||
    !study.outcome ||
    !study.metric ||
    !study.metricLabel ||
    !study.forum ||
    !study.year ||
    !study.date
  ) {
    return null
  }

  const testimonial =
    study.testimonialQuote && study.testimonialAuthor && study.testimonialRole
      ? {
          quote: study.testimonialQuote,
          author: study.testimonialAuthor,
          role: study.testimonialRole,
          avatar: getStrapiMediaUrl(
            study.testimonialAvatar,
            study.testimonialAvatarUrl
          ),
        }
      : undefined

  return {
    slug: study.slug,
    content: study.content ?? "",
    frontmatter: {
      title: study.title,
      slug: study.slug,
      description: study.description,
      id: study.caseId,
      sector: study.sector,
      practice: study.practice,
      outcome: study.outcome,
      metric: study.metric,
      metricLabel: study.metricLabel,
      forum: study.forum,
      year: study.year,
      date: study.date,
      image: getStrapiMediaUrl(study.image, study.imageUrl) ?? "/og-image.jpg",
      pinned: study.pinned ?? false,
      testimonial,
    },
  }
}

function caseStudyPopulateParams(): URLSearchParams {
  const params = new URLSearchParams()
  params.set("populate[0]", "image")
  params.set("populate[1]", "testimonialAvatar")
  return params
}

async function getStrapiCaseStudies(): Promise<CaseStudy[] | null> {
  const params = caseStudyPopulateParams()
  params.set("sort[0]", "pinned:desc")
  params.set("sort[1]", "date:desc")

  const response = await fetchStrapi<StrapiCollectionResponse<StrapiCaseStudy>>(
    "/api/case-studies",
    params
  )

  if (!response) return null

  return response.data
    .map((item) => mapStrapiCaseStudy(unwrapStrapiEntity(item)))
    .filter((item): item is CaseStudy => Boolean(item))
}

async function getStrapiCaseStudyBySlug(
  slug: string
): Promise<CaseStudy | null | undefined> {
  const params = caseStudyPopulateParams()
  params.set("filters[slug][$eq]", slug)
  params.set("pagination[pageSize]", "1")

  const response = await fetchStrapi<StrapiCollectionResponse<StrapiCaseStudy>>(
    "/api/case-studies",
    params
  )

  if (!response) return undefined

  const study = response.data[0]
  return study ? mapStrapiCaseStudy(unwrapStrapiEntity(study)) : null
}

async function getLocalCaseStudySlugs(): Promise<string[]> {
  try {
    const files = await fs.readdir(caseStudiesDirectory)
    return files
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => file.replace(".mdx", ""))
  } catch (error) {
    console.error("Error reading case studies directory:", error)
    return []
  }
}

async function getLocalCaseStudyBySlug(
  slug: string
): Promise<CaseStudy | null> {
  try {
    const fullPath = path.join(caseStudiesDirectory, `${slug}.mdx`)
    const fileContents = await fs.readFile(fullPath, "utf8")

    const { frontmatter } = await compileMDX<CaseStudyFrontmatter>({
      source: fileContents,
      options: { parseFrontmatter: true },
    })

    return {
      slug,
      content: stripFrontmatter(fileContents),
      frontmatter,
    }
  } catch (error) {
    console.error(`Error reading case study ${slug}:`, error)
    return null
  }
}

async function getLocalAllCaseStudies(): Promise<CaseStudyFrontmatter[]> {
  try {
    const files = await fs.readdir(caseStudiesDirectory)
    const mdxFiles = files.filter((file) => file.endsWith(".mdx"))

    const studies = await Promise.all(
      mdxFiles.map(async (file) => {
        const fullPath = path.join(caseStudiesDirectory, file)
        const fileContents = await fs.readFile(fullPath, "utf8")
        const { frontmatter } = await compileMDX<CaseStudyFrontmatter>({
          source: fileContents,
          options: { parseFrontmatter: true },
        })
        return frontmatter
      })
    )

    return studies.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1
      if (!a.pinned && b.pinned) return 1
      const aTime = a.date ? new Date(a.date).getTime() : 0
      const bTime = b.date ? new Date(b.date).getTime() : 0
      return bTime - aTime
    })
  } catch (error) {
    console.error("Error reading all case studies:", error)
    return []
  }
}

export async function getCaseStudySlugs(): Promise<string[]> {
  const cmsStudies = await getStrapiCaseStudies()
  if (cmsStudies && cmsStudies.length > 0) {
    return cmsStudies.map((study) => study.slug)
  }

  return getLocalCaseStudySlugs()
}

export async function getCaseStudyBySlug(
  slug: string
): Promise<CaseStudy | null> {
  const cmsStudy = await getStrapiCaseStudyBySlug(slug)
  if (cmsStudy) return cmsStudy

  return getLocalCaseStudyBySlug(slug)
}

export async function getAllCaseStudies(): Promise<CaseStudyFrontmatter[]> {
  const cmsStudies = await getStrapiCaseStudies()
  if (cmsStudies && cmsStudies.length > 0) {
    return cmsStudies.map((study) => study.frontmatter)
  }

  return getLocalAllCaseStudies()
}
