import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

import type { PolicyPage } from "@/lib/types"

function PolicyPageContent({ page }: { page: PolicyPage }) {
  const lastUpdated = new Date(page.lastUpdated).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <section className="hero-padding section-padding">
      <div className="container max-w-3xl">
        <h1 className="text-4xl leading-tight font-light tracking-tight md:text-5xl">
          {page.title}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Last updated {lastUpdated}
        </p>

        <div
          className={[
            "prose mt-10 max-w-none wrap-break-word prose-neutral md:prose-lg",
            "prose-p:leading-relaxed prose-p:text-muted-foreground",
            "prose-li:text-muted-foreground",
            "prose-strong:font-medium prose-strong:text-foreground",
            "prose-a:text-foreground prose-a:decoration-foreground/30 prose-a:underline-offset-4 hover:prose-a:decoration-foreground",
          ].join(" ")}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {page.content}
          </ReactMarkdown>
        </div>
      </div>
    </section>
  )
}

export default PolicyPageContent
