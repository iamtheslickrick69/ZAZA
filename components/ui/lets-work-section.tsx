"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ArrowUpRight, Calendar } from "lucide-react"
import { getCalApi } from "@calcom/embed-react"
import { SparklesCore } from "@/components/ui/sparkles"
import { motion } from "framer-motion"

export function LetsWorkTogether() {
  const [isButtonHovered, setIsButtonHovered] = useState(false)

  // Initialize Cal.com
  useEffect(() => {
    (async function () {
      const cal = await getCalApi()
      cal("ui", {
        styles: { branding: { brandColor: "#000000" } },
        hideEventTypeDetails: false,
        layout: "month_view"
      })
    })()
  }, [])

  const handleBookCall = async () => {
    const cal = await getCalApi()
    cal("modal", {
      calLink: "rocky-bunker-n2hayf/15min",
      config: {
        layout: "month_view",
        theme: "dark"
      }
    })
  }

  return (
    <section className="relative flex items-center justify-center px-6 py-24 overflow-hidden">
      {/* Sparkles background - slow & gentle */}
      <div className="absolute inset-0 pointer-events-none">
        <SparklesCore
          id="lets-work-sparkles"
          background="transparent"
          minSize={0.2}
          maxSize={0.8}
          particleDensity={40}
          className="w-full h-full"
          particleColor="#FFFFFF"
          speed={0.3}
        />
      </div>

      <div className="relative flex flex-col items-center gap-10">
        {/* Available badge */}
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
            Available for projects
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h2
          className="text-center text-5xl font-light tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="block">Let&apos;s work</span>
          <span className="block text-muted-foreground/60">together</span>
        </motion.h2>

        {/* Book a call button */}
        <motion.button
          onClick={handleBookCall}
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
          className="group relative flex items-center gap-4 mt-4 cursor-pointer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Left line */}
          <div
            className="h-px w-8 bg-border transition-all duration-500 sm:w-12"
            style={{
              transform: isButtonHovered ? "scaleX(0)" : "scaleX(1)",
              opacity: isButtonHovered ? 0 : 0.5,
            }}
          />

          {/* Button content */}
          <div
            className="relative flex items-center gap-3 overflow-hidden rounded-2xl border px-6 py-3 transition-all duration-500 sm:px-8 sm:py-4"
            style={{
              borderColor: isButtonHovered ? "var(--foreground)" : "var(--border)",
              backgroundColor: isButtonHovered ? "var(--foreground)" : "transparent",
              boxShadow: isButtonHovered ? "0 0 30px rgba(255,255,255,0.1), 0 10px 40px rgba(0,0,0,0.2)" : "none",
              transform: isButtonHovered ? "scale(1.02)" : "scale(1)",
            }}
          >
            <Calendar
              className="size-4 transition-all duration-500 sm:size-5"
              strokeWidth={1.5}
              style={{
                color: isButtonHovered ? "var(--background)" : "var(--foreground)",
              }}
            />
            <span
              className="text-sm font-medium tracking-wide transition-all duration-500 sm:text-base"
              style={{
                color: isButtonHovered ? "var(--background)" : "var(--foreground)",
              }}
            >
              Book a call
            </span>
            <ArrowUpRight
              className="size-4 transition-all duration-500 sm:size-5"
              strokeWidth={1.5}
              style={{
                color: isButtonHovered ? "var(--background)" : "var(--foreground)",
                transform: isButtonHovered ? "translate(2px, -2px)" : "translate(0, 0)",
              }}
            />
          </div>

          {/* Right line */}
          <div
            className="h-px w-8 bg-border transition-all duration-500 sm:w-12"
            style={{
              transform: isButtonHovered ? "scaleX(0)" : "scaleX(1)",
              opacity: isButtonHovered ? 0 : 0.5,
            }}
          />
        </motion.button>

        {/* Subtitle */}
        <motion.p
          className="max-w-md text-center text-sm leading-relaxed text-muted-foreground mt-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Have a project in mind? I&apos;d love to hear about it. Let&apos;s create something exceptional together.
        </motion.p>

        {/* Email as secondary option */}
        <motion.a
          href="mailto:hello@haestus.com"
          className="text-xs tracking-widest uppercase text-muted-foreground/60 hover:text-foreground transition-colors duration-300"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          hello@haestus.com
        </motion.a>
      </div>
    </section>
  )
}
