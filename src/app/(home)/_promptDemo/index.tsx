"use client"

import { useEffect, useState } from "react"
import { ArrowUp, Plus } from "lucide-react"

import { params } from "./params"

const EXAMPLES = params.examples

function PromptDemo() {
  const [text, setText] = useState("")
  const [exampleIndex, setExampleIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = EXAMPLES[exampleIndex]
    const atFull = !deleting && text === current
    const atEmpty = deleting && text === ""
    const delay = atFull ? 2200 : atEmpty ? 400 : deleting ? 25 : 55

    const timeout = setTimeout(() => {
      if (atFull) {
        setDeleting(true)
      } else if (atEmpty) {
        setDeleting(false)
        setExampleIndex((i) => (i + 1) % EXAMPLES.length)
      } else {
        setText(
          deleting
            ? current.slice(0, text.length - 1)
            : current.slice(0, text.length + 1)
        )
      }
    }, delay)

    return () => clearTimeout(timeout)
  }, [text, deleting, exampleIndex])

  return (
    <section id="chat" className="flex min-h-[85svh] scroll-mt-24 flex-col">
      <div className="container flex flex-1 flex-col justify-center py-16 md:py-24">
        <div className="mx-auto w-full max-w-2xl text-center">
          <h2 className="text-4xl leading-[1.05] font-medium tracking-tight text-balance md:text-5xl">
            {params.heading}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-balance text-muted-foreground md:text-lg">
            {params.subheading}
          </p>
        </div>

        <div className="mx-auto mt-10 w-full max-w-3xl">
          <div className="flex h-40 flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-xs ring-1 ring-foreground/5 md:h-44">
            <p className="h-14 overflow-hidden text-left text-sm text-muted-foreground md:text-base">
              {text}
              <span className="ml-0.5 inline-block h-[1.1em] w-px translate-y-[0.15em] animate-pulse bg-foreground/70" />
            </p>

            <div className="mt-4 flex items-center justify-between">
              <button
                type="button"
                aria-label="Add attachment"
                className="grid size-9 place-items-center rounded-full border border-border text-foreground/70 transition-colors hover:bg-foreground/5"
              >
                <Plus className="size-4" strokeWidth={2} />
              </button>
              <button
                type="button"
                aria-label="Send prompt"
                className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90"
              >
                <ArrowUp className="size-4" strokeWidth={2.25} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="h-px w-full bg-linear-to-r from-transparent via-border to-transparent" />
      </div>
    </section>
  )
}

export default PromptDemo
