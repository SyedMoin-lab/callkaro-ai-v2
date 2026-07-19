"use client"

import { motion, useScroll, useSpring } from "motion/react"

/**
 * Thin reading-progress bar pinned to the very top of the viewport.
 * The native scrollbar is hidden site-wide, so this restores the sense of
 * "how far through the page am I" without adding scroll-linked layout work.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    restDelta: 0.001,
  })

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-accent"
    />
  )
}
