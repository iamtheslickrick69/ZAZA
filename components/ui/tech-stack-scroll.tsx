"use client";

import React from "react";
import { Marquee } from "@/components/ui/marquee";

// Official colorful tech stack icons from svgl.app
const TECH_STACK = [
  { name: "Claude", src: "https://svgl.app/library/anthropic.svg" },
  { name: "Supabase", src: "https://svgl.app/library/supabase.svg" },
  { name: "GitHub", src: "https://svgl.app/library/github-light.svg" },
  { name: "Vercel", src: "https://svgl.app/library/vercel_wordmark.svg" },
  { name: "Apple", src: "https://svgl.app/library/apple.svg" },
  { name: "Next.js", src: "https://svgl.app/library/nextjs_icon_dark.svg" },
  { name: "Tailwind CSS", src: "https://svgl.app/library/tailwindcss.svg" },
  { name: "TypeScript", src: "https://svgl.app/library/typescript.svg" },
  { name: "React", src: "https://svgl.app/library/react.svg" },
  { name: "Figma", src: "https://svgl.app/library/figma.svg" },
  { name: "Stripe", src: "https://svgl.app/library/stripe.svg" },
  { name: "OpenAI", src: "https://svgl.app/library/openai.svg" },
  { name: "Docker", src: "https://svgl.app/library/docker.svg" },
];

export function TechStackScroll() {
  return (
    <section className="relative py-16 overflow-hidden bg-background transition-colors duration-300">
      <div className="relative max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-12">
          Tech Stack
        </h2>

        {/* Marquee Container */}
        <div className="relative">
          <Marquee pauseOnHover speed={35} className="py-4">
            {TECH_STACK.map((tech) => (
              <div
                key={tech.name}
                className="h-16 w-16 flex-shrink-0 rounded-2xl bg-foreground/10 backdrop-blur-sm border border-border flex items-center justify-center transition-all duration-300 hover:bg-foreground/20 hover:scale-110 hover:border-foreground/20"
              >
                <img
                  src={tech.src}
                  alt={tech.name}
                  className="h-8 w-8 object-contain"
                  title={tech.name}
                />
              </div>
            ))}
          </Marquee>

          {/* Fade overlays */}
          <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
        </div>
      </div>
    </section>
  );
}

export default TechStackScroll;
