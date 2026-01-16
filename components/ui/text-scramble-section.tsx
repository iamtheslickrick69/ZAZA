"use client"

import { TextScramble } from "@/components/ui/text-scramble"

export function TextScrambleSection() {
  return (
    <section className="relative py-8 overflow-hidden bg-background transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col items-center">
          {/* Text Scramble Component */}
          <TextScramble text="Recent Projects" className="text-6xl md:text-8xl lg:text-9xl" />
        </div>
      </div>
    </section>
  )
}
