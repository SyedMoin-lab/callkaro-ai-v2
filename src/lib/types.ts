export interface CaseStudyTestimonial {
  quote: string
  author: string
  role: string
  avatar?: string
}

export interface CaseStudyFrontmatter {
  title: string
  slug: string
  description: string
  id: string
  sector: string
  practice: string
  outcome: string
  metric: string
  metricLabel: string
  forum: string
  year: string
  date: string
  image: string
  pinned?: boolean
  testimonial?: CaseStudyTestimonial
}

export interface CaseStudy {
  slug: string
  content: string
  frontmatter: CaseStudyFrontmatter
}

export interface ServiceFrontmatter {
  slug: string
  id: string
  name: string
  tagline: string
  description: string
  icon: string
  order: number
  image: string
  subAreas: string[]
}

export interface ServiceArticle {
  slug: string
  content: string
  frontmatter: ServiceFrontmatter
}

export interface IndustryUseCase {
  title: string
  description: string
}

export interface IndustryTestimonial {
  quote: string
  author: string
  role: string
}

export interface IndustryFrontmatter {
  slug: string
  id: string
  name: string
  tagline: string
  description: string
  icon: string
  order: number
  image: string
  useCases: IndustryUseCase[]
  testimonial: IndustryTestimonial
}

export interface IndustryArticle {
  slug: string
  content: string
  frontmatter: IndustryFrontmatter
}

export interface IndustryStatItem {
  number: number
  prefix: string
  suffix: string
  labelLine1: string
  labelLine2: string
}

export interface IndustriesPageHero {
  badgeLabel: string
  heading: string
  headingAccent: string
  description: string
  primaryCtaLabel: string
  primaryCtaHref: string
  secondaryCtaLabel: string
  secondaryCtaHref: string
  detailHeroBadgeLabel: string
  detailHeroPrimaryCtaLabel: string
  detailHeroPrimaryCtaHref: string
  detailHeroSecondaryCtaLabel: string
  detailHeroSecondaryCtaHref: string
  trustBarText: string
  statsItems: IndustryStatItem[]
  mainFeaturesHeading: string
  mainFeaturesSubheading: string
  useCasesHeadingTemplate: string
  useCasesSubheadingTemplate: string
  testimonialCtaLabelTemplate: string
  testimonialCtaHref: string
  moreIndustriesHeading: string
  moreIndustriesViewAllLabel: string
}

export interface BlogAuthor {
  name: string
  role: string
  avatar?: string
}

export interface BlogFrontmatter {
  title: string
  slug: string
  excerpt: string
  date: string
  image: string
  category: string
  tags?: string[]
  author: BlogAuthor
  readTime?: string
  pinned?: boolean
}

export interface BlogPost {
  slug: string
  content: string
  frontmatter: BlogFrontmatter
}

export interface FeatureItem {
  label: string
  icon: string
  title: string
  description: string
  order?: number
  wide?: boolean
}

export interface PolicyPage {
  slug: string
  title: string
  lastUpdated: string
  metaDescription?: string
  content: string
}
