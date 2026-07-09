import { compileMDX } from "next-mdx-remote/rsc"
import fs from "fs/promises"
import path from "path"

import type { BlogFrontmatter, BlogPost } from "@/lib/types"

const blogDirectory = path.join(process.cwd(), "content/blog")

export async function getPostSlugs(): Promise<string[]> {
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

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(blogDirectory, `${slug}.mdx`)
    const fileContents = await fs.readFile(fullPath, "utf8")

    const { frontmatter } = await compileMDX<BlogFrontmatter>({
      source: fileContents,
      options: { parseFrontmatter: true },
    })

    return {
      slug,
      content: fileContents,
      frontmatter,
    }
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error)
    return null
  }
}

export async function getAllPosts(): Promise<BlogFrontmatter[]> {
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
