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
  IndustriesPageHero,
  IndustryArticle,
  IndustryFrontmatter,
  IndustryStatItem,
  IndustryUseCase,
} from "@/lib/types"

const industriesDirectory = path.join(process.cwd(), "content/industries")

const FALLBACK_INDUSTRIES_PAGE_HERO: IndustriesPageHero = {
  badgeLabel: "Industries",
  heading: "AI voice agents for",
  headingAccent: "every industry.",
  description:
    "CallKaro AI adapts to how your business actually takes calls, whatever industry you are in.",
  primaryCtaLabel: "Talk to our team",
  primaryCtaHref: "/contact-us",
  secondaryCtaLabel: "Browse industries",
  secondaryCtaHref: "#browse",
  detailHeroBadgeLabel: "Powered by CallKaro AI Voice Agents",
  detailHeroPrimaryCtaLabel: "Book a demo",
  detailHeroPrimaryCtaHref: "/contact-us",
  detailHeroSecondaryCtaLabel: "See how it works",
  detailHeroSecondaryCtaHref: "/features",
  trustBarText: "Trusted by 1,000+ businesses across 15+ countries",
  statsItems: [
    {
      number: 24,
      prefix: "",
      suffix: "/7",
      labelLine1: "Calls answered",
      labelLine2: "day and night",
    },
    {
      number: 3,
      prefix: "<",
      suffix: "s",
      labelLine1: "Average pickup",
      labelLine2: "on every call",
    },
    {
      number: 3,
      prefix: "",
      suffix: "x",
      labelLine1: "More leads",
      labelLine2: "captured and booked",
    },
    {
      number: 60,
      prefix: "",
      suffix: "%",
      labelLine1: "Lower cost",
      labelLine2: "than a call center",
    },
  ],
  mainFeaturesHeading: "Everything your team needs, in every call.",
  mainFeaturesSubheading:
    "The same core platform, tuned to how your industry actually answers the phone.",
  useCasesHeadingTemplate: "{industry} use cases.",
  useCasesSubheadingTemplate:
    "Where CallKaro AI fits into your {industry} team's daily calls.",
  testimonialCtaLabelTemplate: "Read more {industry} stories",
  testimonialCtaHref: "/case-studies",
  moreIndustriesHeading: "Other industries.",
  moreIndustriesViewAllLabel: "View all",
}

interface StrapiIndustryUseCase {
  title?: string
  description?: string
}

interface StrapiIndustryPage {
  tagline?: string
  description?: string
  image?: unknown
  imageUrl?: string
  useCases?: StrapiIndustryUseCase[]
  testimonialQuote?: string
  testimonialAuthor?: string
  testimonialRole?: string
  content?: string
}

interface StrapiIndustry {
  name?: string
  slug?: string
  industryId?: string
  icon?: string
  order?: number
  page?: StrapiIndustryPage
}

interface StrapiIndustryStatItem {
  number?: number
  prefix?: string
  suffix?: string
  labelLine1?: string
  labelLine2?: string
}

interface StrapiIndustriesPageHero {
  badgeLabel?: string
  heading?: string
  headingAccent?: string
  description?: string
  primaryCtaLabel?: string
  primaryCtaHref?: string
  secondaryCtaLabel?: string
  secondaryCtaHref?: string
  detailHeroBadgeLabel?: string
  detailHeroPrimaryCtaLabel?: string
  detailHeroPrimaryCtaHref?: string
  detailHeroSecondaryCtaLabel?: string
  detailHeroSecondaryCtaHref?: string
  trustBarText?: string
  statsItems?: StrapiIndustryStatItem[]
  mainFeaturesHeading?: string
  mainFeaturesSubheading?: string
  useCasesHeadingTemplate?: string
  useCasesSubheadingTemplate?: string
  testimonialCtaLabelTemplate?: string
  testimonialCtaHref?: string
  moreIndustriesHeading?: string
  moreIndustriesViewAllLabel?: string
}

function mapStatsItems(items?: StrapiIndustryStatItem[]): IndustryStatItem[] {
  if (!items) return []

  return items
    .filter((item) => Boolean(item.labelLine1 && item.labelLine2))
    .map((item) => ({
      number: item.number ?? 0,
      prefix: item.prefix ?? "",
      suffix: item.suffix ?? "",
      labelLine1: item.labelLine1 as string,
      labelLine2: item.labelLine2 as string,
    }))
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
  const page = industry.page

  if (
    !industry.name ||
    !industry.slug ||
    !industry.industryId ||
    !industry.icon ||
    !page ||
    !page.tagline ||
    !page.description ||
    !page.testimonialQuote ||
    !page.testimonialAuthor ||
    !page.testimonialRole
  ) {
    return null
  }

  return {
    slug: industry.slug,
    content: page.content ?? "",
    frontmatter: {
      slug: industry.slug,
      id: industry.industryId,
      name: industry.name,
      tagline: page.tagline,
      description: page.description,
      icon: industry.icon,
      order: industry.order ?? 0,
      image: getStrapiMediaUrl(page.image, page.imageUrl) ?? "/og-image.jpg",
      useCases: mapUseCases(page.useCases),
      testimonial: {
        quote: page.testimonialQuote,
        author: page.testimonialAuthor,
        role: page.testimonialRole,
      },
    },
  }
}

function industryPopulateParams(): URLSearchParams {
  const params = new URLSearchParams()
  params.set("populate[page][populate][0]", "useCases")
  params.set("populate[page][populate][1]", "image")
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

async function getStrapiIndustriesPageHero(): Promise<IndustriesPageHero | null> {
  const params = new URLSearchParams()
  params.set("populate[0]", "statsItems")

  const response = await fetchStrapi<{ data: StrapiIndustriesPageHero | null }>(
    "/api/industries-page",
    params
  )

  if (!response?.data) return null

  const hero = response.data
  const statsItems = mapStatsItems(hero.statsItems)

  if (
    !hero.badgeLabel ||
    !hero.heading ||
    !hero.headingAccent ||
    !hero.description ||
    !hero.primaryCtaLabel ||
    !hero.primaryCtaHref ||
    !hero.secondaryCtaLabel ||
    !hero.secondaryCtaHref ||
    !hero.detailHeroBadgeLabel ||
    !hero.detailHeroPrimaryCtaLabel ||
    !hero.detailHeroPrimaryCtaHref ||
    !hero.detailHeroSecondaryCtaLabel ||
    !hero.detailHeroSecondaryCtaHref ||
    !hero.trustBarText ||
    statsItems.length === 0 ||
    !hero.mainFeaturesHeading ||
    !hero.mainFeaturesSubheading ||
    !hero.useCasesHeadingTemplate ||
    !hero.useCasesSubheadingTemplate ||
    !hero.testimonialCtaLabelTemplate ||
    !hero.testimonialCtaHref ||
    !hero.moreIndustriesHeading ||
    !hero.moreIndustriesViewAllLabel
  ) {
    return null
  }

  return {
    badgeLabel: hero.badgeLabel,
    heading: hero.heading,
    headingAccent: hero.headingAccent,
    description: hero.description,
    primaryCtaLabel: hero.primaryCtaLabel,
    primaryCtaHref: hero.primaryCtaHref,
    secondaryCtaLabel: hero.secondaryCtaLabel,
    secondaryCtaHref: hero.secondaryCtaHref,
    detailHeroBadgeLabel: hero.detailHeroBadgeLabel,
    detailHeroPrimaryCtaLabel: hero.detailHeroPrimaryCtaLabel,
    detailHeroPrimaryCtaHref: hero.detailHeroPrimaryCtaHref,
    detailHeroSecondaryCtaLabel: hero.detailHeroSecondaryCtaLabel,
    detailHeroSecondaryCtaHref: hero.detailHeroSecondaryCtaHref,
    trustBarText: hero.trustBarText,
    statsItems,
    mainFeaturesHeading: hero.mainFeaturesHeading,
    mainFeaturesSubheading: hero.mainFeaturesSubheading,
    useCasesHeadingTemplate: hero.useCasesHeadingTemplate,
    useCasesSubheadingTemplate: hero.useCasesSubheadingTemplate,
    testimonialCtaLabelTemplate: hero.testimonialCtaLabelTemplate,
    testimonialCtaHref: hero.testimonialCtaHref,
    moreIndustriesHeading: hero.moreIndustriesHeading,
    moreIndustriesViewAllLabel: hero.moreIndustriesViewAllLabel,
  }
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

export function interpolateIndustryTemplate(
  template: string,
  industryName: string
): string {
  return template.replaceAll("{industry}", industryName)
}

export async function getIndustriesPageHero(): Promise<IndustriesPageHero> {
  const cmsHero = await getStrapiIndustriesPageHero()
  return cmsHero ?? FALLBACK_INDUSTRIES_PAGE_HERO
}
