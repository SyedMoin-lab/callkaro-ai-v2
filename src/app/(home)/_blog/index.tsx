import Image from "next/image"
import Link from "next/link"
import { MoveRight, MoveUpRight, Newspaper } from "lucide-react"

import SectionHeader from "@/common/elements/sectionHeader"
import { Button } from "@/common/shadcnUI/button"
import type { BlogFrontmatter } from "@/lib/types"

import { params } from "./params"

function formatDate(value: string) {
  if (!value) return null
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

function Blog({ posts }: { posts: BlogFrontmatter[] }) {
  const latest = posts.slice(0, 2)
  if (latest.length === 0) return null

  return (
    <section className="section-padding">
      <div className="container">
        <SectionHeader
          badge={params.badge}
          heading={
            <>
              {params.heading.line1}
              <br />
              {params.heading.line2}
            </>
          }
          description={params.description}
          mark={
            <Newspaper
              aria-hidden
              className="size-10 text-foreground/30"
              strokeWidth={1}
            />
          }
        />

        <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2 md:gap-8">
          {latest.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

        <div className="mt-10 flex justify-center md:mt-14">
          <Button size="lg" variant="secondary" asChild>
            <Link href={params.cta.href}>
              {params.cta.label}
              <MoveRight className="size-5" strokeWidth={1.25} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

function PostCard({ post }: { post: BlogFrontmatter }) {
  const date = formatDate(post.date)

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card ring-1 ring-foreground/5 transition-colors hover:border-accent/40"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={post.image}
          alt=""
          fill
          sizes="(min-width: 768px) 45vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span className="font-medium text-accent">{post.category}</span>
          {date && (
            <>
              <span aria-hidden>·</span>
              <span>{date}</span>
            </>
          )}
          {post.readTime && (
            <>
              <span aria-hidden>·</span>
              <span>{post.readTime}</span>
            </>
          )}
        </div>

        <h3 className="mt-3 text-xl leading-tight font-medium tracking-tight text-balance md:text-2xl">
          {post.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>

        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
          Read article
          <MoveUpRight
            className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={1.5}
          />
        </span>
      </div>
    </Link>
  )
}

export default Blog
