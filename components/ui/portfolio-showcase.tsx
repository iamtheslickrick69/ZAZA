"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface Project {
  id: number;
  number: string;
  category: string;
  title: string;
  year: string;
  image: string;
  description: string;
}

const projects: Project[] = [
  {
    id: 1,
    number: "01",
    category: "WEB APPLICATION",
    title: "PULSE FINANCE",
    year: "2024",
    image: "/portfolio/pulse-finance.png",
    description: "Real-time financial analytics platform with AI-powered insights",
  },
  {
    id: 2,
    number: "02",
    category: "FINTECH",
    title: "QUANTUM LEDGER",
    year: "2024",
    image: "/portfolio/quantum-ledger.png",
    description: "Next-gen blockchain infrastructure for institutional trading",
  },
  {
    id: 3,
    number: "03",
    category: "WEB DEV",
    title: "NEURAL COMMERCE",
    year: "2025",
    image: "/portfolio/neural-commerce.png",
    description: "E-commerce platform that learns customer behavior patterns",
  },
  {
    id: 4,
    number: "04",
    category: "AI PLATFORM",
    title: "APEX INTELLIGENCE",
    year: "2025",
    image: "/portfolio/apex-intelligence.png",
    description: "Enterprise AI orchestration and workflow automation suite",
  },
];

export function PortfolioShowcase() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <section className="relative py-24 px-6 bg-background transition-colors duration-300" suppressHydrationWarning>
      {/* Background grid */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="portfolio-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                className="stroke-foreground/[0.03]"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#portfolio-grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm font-mono text-muted-foreground">[ SELECTED WORK ]</span>
            <div className="flex-1 h-px bg-border"></div>
          </div>
          <h2 className="text-4xl md:text-6xl font-display text-foreground">
            Portfolio
          </h2>
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-px">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              className="group relative"
            >
              <div
                className={`relative overflow-hidden border-y transition-all duration-500 cursor-pointer ${
                  isDark
                    ? "bg-zinc-900/50 border-white/5 hover:bg-zinc-900/80"
                    : "bg-white/50 border-zinc-200/50 hover:bg-white/80"
                }`}
              >
                {/* Background Image - shows on hover */}
                <AnimatePresence>
                  {hoveredProject === project.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 0.15, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 pointer-events-none"
                    >
                      <div className="relative w-full h-full">
                        <div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-background/50"
                          style={{
                            background: isDark
                              ? "linear-gradient(90deg, rgba(0,0,0,0.8) 0%, transparent 50%, rgba(0,0,0,0.8) 100%)"
                              : "linear-gradient(90deg, rgba(255,255,255,0.8) 0%, transparent 50%, rgba(255,255,255,0.8) 100%)",
                          }}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Content */}
                <div className="relative grid grid-cols-12 gap-4 md:gap-8 items-center py-8 md:py-12 px-6 md:px-12">
                  {/* Number */}
                  <div className="col-span-2 md:col-span-1">
                    <span
                      className={`font-mono text-sm transition-colors duration-300 ${
                        hoveredProject === project.id
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {project.number}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="col-span-10 md:col-span-6">
                    <motion.h3
                      className="text-2xl md:text-4xl lg:text-5xl font-display text-foreground tracking-tight"
                      animate={{
                        x: hoveredProject === project.id ? 10 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {project.title}
                    </motion.h3>
                    <p className="text-sm text-muted-foreground mt-2 hidden md:block">
                      {project.description}
                    </p>
                  </div>

                  {/* Category & Year */}
                  <div className="col-span-12 md:col-span-4 flex items-center justify-between md:justify-end gap-8">
                    <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                      {project.category}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">
                      {project.year}
                    </span>
                  </div>

                  {/* Arrow Icon */}
                  <div className="col-span-12 md:col-span-1 flex justify-end">
                    <motion.div
                      animate={{
                        x: hoveredProject === project.id ? 5 : 0,
                        y: hoveredProject === project.id ? -5 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowUpRight
                        className={`w-6 h-6 transition-colors duration-300 ${
                          hoveredProject === project.id
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Hover accent line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-[2px] bg-foreground"
                  initial={{ width: 0 }}
                  animate={{
                    width: hoveredProject === project.id ? "100%" : "0%",
                  }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 flex justify-center"
        >
          <motion.button
            className={`group relative px-8 py-4 rounded-full border transition-all duration-300 ${
              isDark
                ? "border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10"
                : "border-zinc-300 hover:border-zinc-400 bg-zinc-100/50 hover:bg-zinc-200/50"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center gap-2 text-sm font-medium text-foreground">
              View All Projects
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
