"use client";

import React from "react";
import { motion } from "framer-motion";
import { RotatingTestimonials } from '@/components/ui/rotating-testimonials';

export function HeroSectionAnimated() {

  return (
    <div className="bg-background text-foreground overflow-hidden relative w-full transition-colors duration-300" suppressHydrationWarning>
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

      {/* Main Container - Centered */}
      <div className="relative z-10 flex items-center justify-center">
        <div className="w-full max-w-2xl mx-auto px-6 md:px-12 py-12">
          {/* Centered Process Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex items-center justify-center"
          >
            <RotatingTestimonials />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default HeroSectionAnimated;
