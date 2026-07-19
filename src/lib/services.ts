import { compileMDX } from "next-mdx-remote/rsc"
import fs from "fs/promises"
import path from "path"

import { params } from "@/app/services/params"
import type { ServiceArticle, ServiceFrontmatter } from "@/lib/types"

const servicesDirectory = path.join(process.cwd(), "content/services")

// Body used for the fallback detail pages, built from the params entry so the
// capability pages still read as real pages without any MDX on disk.
function fallbackContent(service: ServiceFrontmatter): string {
  return [
    service.description,
    "",
    "## What it covers",
    "",
    ...service.subAreas.map((area) => `- ${area}`),
  ].join("\n")
}

export async function getServiceSlugs(): Promise<string[]> {
  try {
    const files = await fs.readdir(servicesDirectory)
    const slugs = files
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => file.replace(".mdx", ""))
    return slugs.length > 0 ? slugs : params.services.map((s) => s.slug)
  } catch (error) {
    console.error("Error reading services directory:", error)
    return params.services.map((s) => s.slug)
  }
}

export async function getServiceBySlug(
  slug: string
): Promise<ServiceArticle | null> {
  try {
    const fullPath = path.join(servicesDirectory, `${slug}.mdx`)
    const fileContents = await fs.readFile(fullPath, "utf8")

    const { frontmatter } = await compileMDX<ServiceFrontmatter>({
      source: fileContents,
      options: { parseFrontmatter: true },
    })

    return {
      slug,
      content: fileContents,
      frontmatter,
    }
  } catch (error) {
    console.error(`Error reading service ${slug}:`, error)
    const fallback = params.services.find((s) => s.slug === slug)
    if (!fallback) return null
    return {
      slug,
      content: fallbackContent(fallback),
      frontmatter: fallback,
    }
  }
}

export async function getAllServices(): Promise<ServiceFrontmatter[]> {
  try {
    const files = await fs.readdir(servicesDirectory)
    const mdxFiles = files.filter((file) => file.endsWith(".mdx"))

    const services = await Promise.all(
      mdxFiles.map(async (file) => {
        const fullPath = path.join(servicesDirectory, file)
        const fileContents = await fs.readFile(fullPath, "utf8")
        const { frontmatter } = await compileMDX<ServiceFrontmatter>({
          source: fileContents,
          options: { parseFrontmatter: true },
        })
        return frontmatter
      })
    )

    if (services.length === 0) return params.services
    return services.sort((a, b) => a.order - b.order)
  } catch (error) {
    console.error("Error reading all services:", error)
    return params.services
  }
}
