"use client"

import { TextScramble } from "@/components/ui/text-scramble"

export function TextScrambleSection() {
  return (
    <section className="relative py-20 overflow-hidden bg-background transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col items-center gap-12">
          {/* Header */}
          <div className="text-center space-y-3">
            <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground font-mono">
              Hover to decode
            </p>
          </div>

          {/* Text Scramble Component */}
          <TextScramble text="VIEW WORK" className="text-4xl md:text-5xl" />

          {/* Footer */}
          <p className="text-xs text-muted-foreground font-mono tracking-wide">
            [ kinetic typography ]
          </p>
        </div>
      </div>
    </section>
  )
}
