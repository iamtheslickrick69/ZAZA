"use client"

import { useEffect, useRef } from "react"

interface TerminalProps {
  capsLock: boolean
  lines: string[]
  typedText: string
}

export function Terminal({ capsLock, lines, typedText }: TerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [lines, typedText])

  return (
    <div className="w-full h-24 flex flex-col rounded-lg overflow-hidden border border-neutral-700/50 bg-black/70 backdrop-blur-md font-mono shadow-2xl">
      {/* Compact Header */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-neutral-800/50 bg-neutral-900/50">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex items-center gap-2">
          {capsLock && (
            <span className="text-[9px] font-bold text-amber-400 bg-amber-400/20 px-1.5 py-0.5 rounded">CAPS</span>
          )}
          <span className="text-[10px] text-neutral-500">terminal</span>
        </div>
        <div className="w-[44px]" />
      </div>

      <div ref={terminalRef} className="flex-1 overflow-y-auto px-3 py-3 text-xs leading-relaxed">
        {/* Previous lines - replaced $ with > */}
        {lines.map((line, index) => (
          <div key={index} className="flex">
            <span className="text-green-500 mr-2">{">"}</span>
            <span className="text-white">{line}</span>
          </div>
        ))}

        {/* Current input line - replaced $ with > */}
        <div className="flex">
          <span className="text-green-500 mr-2">{">"}</span>
          <span className="text-white">{typedText}</span>
          <span className="inline-block w-1.5 h-4 bg-white ml-0.5 animate-blink" />
        </div>
      </div>
    </div>
  )
}
