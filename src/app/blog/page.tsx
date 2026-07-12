import { getAllPosts } from "@/lib/blog"

import BlogGrid from "./grid"
import BlogHero from "./hero"

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <>
      <BlogHero />
      <BlogGrid posts={posts} />
    </>
  )
}
