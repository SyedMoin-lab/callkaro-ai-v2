"use client"

import Image from "next/image"
import { motion } from "motion/react"

import Eyebrow from "@/common/elements/eyebrow"

import { params as pageParams } from "../params"

const params = pageParams.values

const EASE_OUT = [0.23, 1, 0.32, 1] as const

function AboutValues() {
  return (
    <section className="section-padding">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{ duration: 0.9, ease: EASE_OUT }}
          className="relative aspect-[16/9] overflow-hidden rounded-xl ring-1 ring-foreground/10"
        >
          <Image
            src={params.image.src}
            alt={params.image.alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-12 md:mt-16 lg:mt-20 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
          >
            <Eyebrow>{params.eyebrow}</Eyebrow>
            <h2 className="mt-8 text-4xl leading-[1.05] font-light tracking-tight md:text-5xl lg:text-6xl">
              {params.heading}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.1 }}
          >
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {params.body}
            </p>

            <ul className="mt-10 grid grid-cols-3 gap-x-6 border-t pt-8">
              {params.stats.map((s) => (
                <li key={s.label}>
                  <p className="text-3xl leading-none font-light tracking-tight md:text-4xl lg:text-5xl">
                    {s.value}
                  </p>
                  <p className="mt-3 font-mono text-[0.625rem] tracking-[0.2em] text-foreground/55 uppercase">
                    {s.label}
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutValues
