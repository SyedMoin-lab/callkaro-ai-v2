import BlogFeatured from "@/components/sections/blog-page/featured"
import { getAllPosts } from "@/lib/blog"

export default async function BlogPage() {
  const posts = await getAllPosts()

  return <BlogFeatured posts={posts} />
}
