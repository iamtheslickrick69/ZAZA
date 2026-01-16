"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ArrowUpRight, Rocket } from "lucide-react"
import { getCalApi } from "@calcom/embed-react"
import { SparklesCore } from "@/components/ui/sparkles"
import { motion } from "framer-motion"

export function LetsWorkTogether() {
  const [isProjectButtonHovered, setIsProjectButtonHovered] = useState(false)

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
        {/* Start Your Project button */}
        <motion.button
          onClick={handleBookCall}
          onMouseEnter={() => setIsProjectButtonHovered(true)}
          onMouseLeave={() => setIsProjectButtonHovered(false)}
          className="group relative flex items-center gap-3 cursor-pointer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Button content - filled style */}
          <div
            className="relative flex items-center gap-3 overflow-hidden rounded-2xl border px-6 py-3 transition-all duration-500 sm:px-8 sm:py-4"
            style={{
              borderColor: isProjectButtonHovered ? "var(--foreground)" : "var(--foreground)",
              backgroundColor: isProjectButtonHovered ? "transparent" : "var(--foreground)",
              boxShadow: isProjectButtonHovered ? "none" : "0 0 30px rgba(255,255,255,0.1), 0 10px 40px rgba(0,0,0,0.2)",
              transform: isProjectButtonHovered ? "scale(1)" : "scale(1.02)",
            }}
          >
            <Rocket
              className="size-4 transition-all duration-500 sm:size-5"
              strokeWidth={1.5}
              style={{
                color: isProjectButtonHovered ? "var(--foreground)" : "var(--background)",
              }}
            />
            <span
              className="text-sm font-medium tracking-wide transition-all duration-500 sm:text-base"
              style={{
                color: isProjectButtonHovered ? "var(--foreground)" : "var(--background)",
              }}
            >
              Start Your Project
            </span>
            <ArrowUpRight
              className="size-4 transition-all duration-500 sm:size-5"
              strokeWidth={1.5}
              style={{
                color: isProjectButtonHovered ? "var(--foreground)" : "var(--background)",
                transform: isProjectButtonHovered ? "translate(2px, -2px)" : "translate(0, 0)",
              }}
            />
          </div>
        </motion.button>
      </div>
    </section>
  )
}
