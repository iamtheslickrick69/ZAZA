"use client"

export function CTAButton() {
  return (
    <button
      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
      className="group relative inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background font-semibold text-lg rounded-full hover:scale-105 transition-transform duration-300"
    >
      Book a Free Strategy Call
      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </button>
  )
}
