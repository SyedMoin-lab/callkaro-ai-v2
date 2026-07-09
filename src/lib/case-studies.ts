import { compileMDX } from "next-mdx-remote/rsc"
import fs from "fs/promises"
import path from "path"

import type { CaseStudy, CaseStudyFrontmatter } from "@/lib/types"

const caseStudiesDirectory = path.join(process.cwd(), "content/case-studies")

export async function getCaseStudySlugs(): Promise<string[]> {
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

export async function getCaseStudyBySlug(
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
      content: fileContents,
      frontmatter,
    }
  } catch (error) {
    console.error(`Error reading case study ${slug}:`, error)
    return null
  }
}

export async function getAllCaseStudies(): Promise<CaseStudyFrontmatter[]> {
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
