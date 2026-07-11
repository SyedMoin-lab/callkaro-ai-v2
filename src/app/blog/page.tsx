import { getAllPosts } from "@/lib/blog"

import BlogFeatured from "./featured"

export default async function BlogPage() {
  const posts = await getAllPosts()

  return <BlogFeatured posts={posts} />
}
