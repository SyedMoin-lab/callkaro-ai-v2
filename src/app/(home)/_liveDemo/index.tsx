"use client"

import { useRef, useState } from "react"
import { Check, Pause, Play } from "lucide-react"

import { Orb } from "@/common/customUI/orb"
import { Button } from "@/common/shadcnUI/button"
import { cn } from "@/lib/utils"

import { params } from "./params"

export default function LiveDemo() {
  const [activeId, setActiveId] = useState(params.useCases[0].id)
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const active =
    params.useCases.find((u) => u.id === activeId) ?? params.useCases[0]

  function selectUseCase(id: string) {
    if (id === activeId) return
    audioRef.current?.pause()
    setActiveId(id)
  }

  function togglePlay() {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
    } else {
      audio.currentTime = 0
      audio.play().catch(() => setPlaying(false))
    }
  }

  return (
    <section id="use-cases" className="section-padding scroll-mt-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
            {params.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl leading-tight font-light tracking-tight text-balance md:text-4xl">
            {params.heading}
          </h2>
          <p className="mt-4 text-balance text-muted-foreground md:text-lg">
            {params.subheading}
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="flex flex-col items-center justify-center gap-8 rounded-2xl border border-border bg-card p-8 ring-1 ring-foreground/5">
            <Orb
              className="relative aspect-square w-full max-w-[18rem]"
              colors={["#EE6983", "#FFC4C4"]}
              agentState={playing ? "talking" : null}
            />

            <div className="flex flex-wrap justify-center gap-2">
              {params.useCases.map((u) => (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => selectUseCase(u.id)}
                  aria-pressed={u.id === activeId}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                    u.id === activeId
                      ? "border-accent bg-accent text-accent-foreground"
                      : "border-border text-foreground/70 hover:border-accent/50 hover:text-foreground"
                  )}
                >
                  {u.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col rounded-2xl border border-border bg-card p-8 ring-1 ring-foreground/5">
            <h3 className="text-2xl font-medium tracking-tight">
              {active.label}
            </h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              {active.tagline}
            </p>

            <ul className="mt-6 space-y-3">
              {active.capabilities.map((c) => (
                <li key={c} className="flex gap-2.5 text-sm">
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-accent"
                    strokeWidth={2.5}
                  />
                  <span className="text-foreground/80">{c}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-8">
              <Button
                size="lg"
                onClick={togglePlay}
                className="w-full sm:w-auto"
              >
                {playing ? (
                  <>
                    <Pause className="fill-current" />
                    Playing…
                  </>
                ) : (
                  <>
                    <Play className="fill-current" />
                    Play sample call
                  </>
                )}
              </Button>
              <p className="mt-3 text-xs text-muted-foreground">
                Sample recording · {active.label.toLowerCase()} agent
              </p>
            </div>

            <audio
              ref={audioRef}
              src={active.audio}
              preload="none"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onEnded={() => setPlaying(false)}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
