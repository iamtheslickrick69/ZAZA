"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { RotatingTestimonials } from '@/components/ui/rotating-testimonials';
import { PremiumCTA } from '@/components/ui/premium-cta';
import { Rocket, Eye } from 'lucide-react';

export function HeroSectionAnimated() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <div className="bg-background text-foreground overflow-hidden relative w-full min-h-screen transition-colors duration-300" suppressHydrationWarning>
      {/* Subtle grid background */}
      <svg className="absolute inset-0 w-full h-full opacity-20 dark:opacity-30" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid-clean" width="60" height="60" patternUnits="userSpaceOnUse">
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              className="stroke-foreground/[0.03]"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-clean)" />
      </svg>

      {/* Main Split Container */}
      <div className="relative z-10 flex items-center">
        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative">
            {/* Center Divider Line */}
            <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[70%] w-px bg-gradient-to-b from-transparent via-border to-transparent" />

            {/* LEFT SIDE - Content (50%) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Top badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-foreground/5 text-xs text-muted-foreground font-nav uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-foreground/40 animate-pulse"></span>
                  Design Systems & Web Development
                </span>
              </motion.div>

              {/* Main Headline */}
              <div className="space-y-2">
                <motion.h1
                  className="text-5xl md:text-6xl xl:text-7xl leading-[1.1] text-foreground font-display"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  The Age of Execution
                </motion.h1>
                <motion.h2
                  className="text-4xl md:text-5xl xl:text-6xl leading-[1.1] text-muted-foreground font-display-light lowercase italic"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  (show, don&apos;t tell)
                </motion.h2>
              </div>

              {/* Tagline */}
              <motion.p
                className="text-lg md:text-xl text-muted-foreground font-display-light max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                We design, develop, and deploy for the new game.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row items-start gap-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                {/* Primary CTA */}
                <motion.button
                  className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-base transition-all overflow-hidden bg-foreground text-background"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: "-100%", skewX: -20 }}
                    whileHover={{ x: "200%" }}
                    transition={{ duration: 0.8 }}
                  />

                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Rocket className="w-5 h-5 relative z-10" />
                  </motion.div>

                  <span className="relative z-10">Start Your Project</span>

                  <motion.div
                    whileHover={{ x: 4, y: -4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <motion.svg
                      className="w-5 h-5 relative z-10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </motion.svg>
                  </motion.div>

                  {/* Glow */}
                  <motion.div
                    className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-30 bg-foreground"
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>

                {/* Secondary CTA */}
                <motion.button
                  className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium text-base transition-all overflow-hidden bg-background text-foreground border-2 border-border hover:border-foreground/30"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-foreground/5"
                    initial={{ x: "-100%", skewX: -20 }}
                    whileHover={{ x: "200%" }}
                    transition={{ duration: 0.8 }}
                  />

                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Eye className="w-5 h-5 relative z-10" />
                  </motion.div>

                  <span className="relative z-10">View Our Work</span>

                  <motion.div
                    whileHover={{ x: 4, y: -4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <motion.svg
                      className="w-5 h-5 relative z-10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </motion.svg>
                  </motion.div>

                  {/* Glow */}
                  <motion.div
                    className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-20 bg-foreground/20"
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </motion.div>
            </motion.div>

            {/* RIGHT SIDE - Rotating Testimonials (50%) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:flex h-[500px] items-center justify-center"
            >
              <RotatingTestimonials />
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSectionAnimated;
