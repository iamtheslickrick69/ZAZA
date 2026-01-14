"use client";

import React from "react";
import { Marquee } from "@/components/ui/marquee";

// Reliable tech stack icons using CDN
const TECH_STACK = [
  { name: "Haestus", src: "/icons/haestus-icon.png" },
  { name: "Claude", src: "https://cdn.simpleicons.org/anthropic" },
  { name: "Supabase", src: "https://cdn.simpleicons.org/supabase/3FCF8E" },
  { name: "GitHub", src: "https://cdn.simpleicons.org/github" },
  { name: "Vercel", src: "https://cdn.simpleicons.org/vercel" },
  { name: "Apple", src: "https://cdn.simpleicons.org/apple" },
  { name: "Next.js", src: "https://cdn.simpleicons.org/nextdotjs" },
  { name: "Tailwind CSS", src: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
  { name: "TypeScript", src: "https://cdn.simpleicons.org/typescript/3178C6" },
  { name: "React", src: "https://cdn.simpleicons.org/react/61DAFB" },
  { name: "Figma", src: "https://cdn.simpleicons.org/figma/F24E1E" },
  { name: "OpenAI", src: "https://cdn.simpleicons.org/openai" },
  { name: "Docker", src: "https://cdn.simpleicons.org/docker/2496ED" },
];

export function TechStackScroll() {
  return (
    <section className="relative py-12 overflow-hidden bg-background transition-colors duration-300">
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Marquee Container */}
        <div className="relative">
          <Marquee pauseOnHover speed={35} className="py-4">
            {TECH_STACK.map((tech) => (
              <div
                key={tech.name}
                className="h-16 w-16 flex-shrink-0 rounded-2xl bg-foreground/5 backdrop-blur-sm border border-border flex items-center justify-center transition-all duration-300 hover:bg-foreground/10 hover:scale-110 hover:border-foreground/20"
              >
                <img
                  src={tech.src}
                  alt={tech.name}
                  className="h-8 w-8 object-contain dark:invert-0"
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
