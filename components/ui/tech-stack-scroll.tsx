"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimationFrame } from "framer-motion";
import { useTheme } from "next-themes";

// Curated tech stack - 11 icons for seamless loop
const TECH_STACK = [
  { name: "Haestus", src: "/icons/haestus-icon.png", invert: false },
  { name: "Claude", src: "https://cdn.simpleicons.org/anthropic", invert: true },
  { name: "Supabase", src: "https://cdn.simpleicons.org/supabase/3FCF8E", invert: false },
  { name: "GitHub", src: "https://cdn.simpleicons.org/github", invert: true },
  { name: "Vercel", src: "https://cdn.simpleicons.org/vercel", invert: true },
  { name: "Apple", src: "https://cdn.simpleicons.org/apple", invert: true },
  { name: "Next.js", src: "https://cdn.simpleicons.org/nextdotjs", invert: true },
  { name: "Tailwind", src: "https://cdn.simpleicons.org/tailwindcss/06B6D4", invert: false },
  { name: "TypeScript", src: "https://cdn.simpleicons.org/typescript/3178C6", invert: false },
  { name: "React", src: "https://cdn.simpleicons.org/react/61DAFB", invert: false },
  { name: "Figma", src: "https://cdn.simpleicons.org/figma/F24E1E", invert: false },
];

export function TechStackScroll() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [offset, setOffset] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastTimeRef = useRef(0);

  const isDark = mounted && resolvedTheme === "dark";
  const iconSize = 64; // Larger icons
  const gap = 32; // More spacing
  const totalWidth = (iconSize + gap) * TECH_STACK.length;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Smooth infinite scroll animation with pause on hover
  useAnimationFrame((time) => {
    if (isPaused) {
      lastTimeRef.current = time - (offset / 0.012);
      return;
    }
    const elapsed = time - lastTimeRef.current;
    setOffset((elapsed * 0.012) % totalWidth); // Slower speed
  });

  // Calculate scale based on distance from hovered icon
  const getScale = (index: number) => {
    if (hoveredIndex === null) return 1;
    const distance = Math.abs(index - hoveredIndex);
    if (distance === 0) return 1.4;
    if (distance === 1) return 1.2;
    if (distance === 2) return 1.05;
    return 1;
  };

  // Double the icons for seamless loop
  const doubledStack = [...TECH_STACK, ...TECH_STACK];

  // Container width for ~6 icons: (iconSize + gap) * 6 = (64 + 32) * 6 = 576px
  const containerWidth = (iconSize + gap) * 6;

  return (
    <section className="relative py-16 overflow-hidden bg-background transition-colors duration-300">
      <div className="relative mx-auto px-6" style={{ maxWidth: containerWidth + 48 }}>
        {/* Liquid Glass Dock Container */}
        <div
          className={`relative mx-auto rounded-2xl p-4 ${
            isDark
              ? "bg-white/5 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]"
              : "bg-white/70 border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.8)]"
          } backdrop-blur-xl`}
          style={{ overflow: "hidden" }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Inner glow */}
          <div className={`absolute inset-0 rounded-2xl ${
            isDark
              ? "bg-gradient-to-b from-white/5 to-transparent"
              : "bg-gradient-to-b from-white/50 to-transparent"
          } pointer-events-none`} />

          {/* Scrolling Icons Container */}
          <div
            ref={containerRef}
            className="relative flex items-center justify-center"
            style={{ height: iconSize + 24 }}
          >
            <motion.div
              className="flex items-end absolute"
              style={{ x: -offset, gap: gap }}
            >
              {doubledStack.map((tech, index) => {
                const actualIndex = index % TECH_STACK.length;
                const scale = getScale(actualIndex);

                return (
                  <motion.div
                    key={`${tech.name}-${index}`}
                    className="flex flex-col items-center"
                    onMouseEnter={() => setHoveredIndex(actualIndex)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    animate={{ scale }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    {/* Icon Container */}
                    <div
                      className={`flex items-center justify-center rounded-xl transition-all duration-200 cursor-pointer ${
                        isDark
                          ? "bg-transparent border border-zinc-700/30 shadow-lg"
                          : "bg-transparent border border-zinc-200/50 shadow-md"
                      }`}
                      style={{ width: iconSize, height: iconSize }}
                    >
                      <img
                        src={tech.src}
                        alt={tech.name}
                        className={`w-9 h-9 object-contain ${
                          tech.invert && isDark ? "invert" : ""
                        }`}
                        title={tech.name}
                      />
                    </div>

                    {/* Reflection */}
                    <div
                      className="mt-1 opacity-20 blur-[1px] scale-y-[-1]"
                      style={{
                        width: iconSize,
                        height: iconSize / 3,
                        background: `linear-gradient(to bottom, ${isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)'}, transparent)`,
                        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)',
                        WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)',
                      }}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Soft edge fades */}
        <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
}

export default TechStackScroll;
