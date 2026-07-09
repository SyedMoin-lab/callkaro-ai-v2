import { compileMDX } from "next-mdx-remote/rsc"
import fs from "fs/promises"
import path from "path"

import type { ServiceArticle, ServiceFrontmatter } from "@/lib/types"

const servicesDirectory = path.join(process.cwd(), "content/services")

export async function getServiceSlugs(): Promise<string[]> {
  try {
    const files = await fs.readdir(servicesDirectory)
    return files
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => file.replace(".mdx", ""))
  } catch (error) {
    console.error("Error reading services directory:", error)
    return []
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
    return null
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

    return services.sort((a, b) => a.order - b.order)
  } catch (error) {
    console.error("Error reading all services:", error)
    return []
  }
}
