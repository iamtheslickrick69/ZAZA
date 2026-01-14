"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ServiceCards } from "@/components/ServiceCards";
import DatabaseWithRestApi from "@/components/ui/database-with-rest-api";
import { SocialIcons } from "@/components/ui/social-icons";
import { HoneycombLoader } from "@/components/ui/honeycomb-loader";

export function HeroSectionAnimated() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const words = document.querySelectorAll<HTMLElement>(".word");
    words.forEach((word) => {
      const delay = parseInt(word.getAttribute("data-delay") || "0", 10);
      setTimeout(() => {
        word.style.animation = "word-appear 0.8s ease-out forwards";
      }, delay);
    });
  }, []);

  return (
    <div className="bg-background text-foreground overflow-hidden relative w-full transition-colors duration-300">
      {/* Subtle grid */}
      <svg className="absolute inset-0 w-full h-full opacity-30 dark:opacity-30" xmlns="http://www.w3.org/2000/svg">
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
        {/* Brand colored intersection dots */}
        <circle cx="20%" cy="20%" r="2" className="brand-dot-blue" />
        <circle cx="80%" cy="20%" r="2" className="brand-dot-red" />
        <circle cx="20%" cy="80%" r="2" className="brand-dot-red" />
        <circle cx="80%" cy="80%" r="2" className="brand-dot-blue" />
      </svg>

      {/* Content - Unified Flow */}
      <div className="relative z-10 flex flex-col items-center pt-32 pb-20">

        {/* SECTION 1: Hero Content */}
        <div className="flex flex-col justify-center items-center px-6 md:px-16 max-w-6xl mx-auto mb-32">

            {/* Top badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-8 flex justify-center"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl border border-border bg-foreground/5 text-sm text-muted-foreground font-nav">
                <span className="w-2 h-2 rounded-full bg-[#006AAA] animate-pulse"></span>
                Design Systems & Web Development
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl leading-tight text-foreground mb-6 font-display text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              The Age of Execution.
              <br />
              <span className="text-muted-foreground lowercase">show, don&apos;t tell.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-xl md:text-2xl text-muted-foreground mb-16 font-display-light text-center max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              We design, develop, and deploy for the new game.
            </motion.p>

            {/* Logo - Brand Anchor */}
            <motion.div
              className="flex items-center justify-center gap-4 mb-12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <HoneycombLoader size={48} className="opacity-90" />
              <Image
                src="/logo/white.png"
                alt="Haestus"
                width={200}
                height={40}
                className="h-10 w-auto dark:hidden"
                priority
              />
              <Image
                src="/logo/black.png"
                alt="Haestus"
                width={200}
                height={40}
                className="h-10 w-auto hidden dark:block"
                priority
              />
            </motion.div>

            {/* Service Cards */}
            <motion.div
              className="w-full mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <ServiceCards />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              {/* Primary CTA */}
              <div className="group relative rounded-2xl">
                <motion.div
                  className="absolute -inset-[2px] rounded-2xl z-0"
                  style={{
                    backgroundImage: 'linear-gradient(90deg, #006AAA, #C00008, #006AAA)',
                    backgroundSize: '200% 100%',
                  }}
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
                  }}
                  transition={{
                    duration: 3,
                    ease: 'linear',
                    repeat: Infinity,
                  }}
                />
                <motion.div
                  className="absolute -inset-[2px] rounded-2xl z-0 blur-lg"
                  style={{
                    backgroundImage: 'linear-gradient(90deg, #006AAA, #C00008, #006AAA)',
                    backgroundSize: '200% 100%',
                  }}
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    ease: 'easeInOut',
                    repeat: Infinity,
                  }}
                />
                <Button size="lg" className="relative z-10 rounded-2xl px-8 py-6 text-base bg-foreground text-background hover:bg-foreground/90 border-0 font-body-medium">
                  Start Your Project
                </Button>
              </div>

              {/* Secondary CTA */}
              <Button
                size="lg"
                variant="outline"
                className="rounded-2xl px-8 py-6 text-base bg-transparent text-foreground border-border hover:bg-foreground/5 hover:border-foreground/30 font-body-medium"
              >
                View Our Work
              </Button>
            </motion.div>

            {/* Visual Connector - Animated flowing line */}
            <motion.div
              className="w-px h-24 mx-auto relative"
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: 0.8, delay: 1.3 }}
            >
              <motion.div
                className="absolute inset-0 w-full"
                style={{
                  background: 'linear-gradient(180deg, transparent, #006AAA, #C00008, transparent)',
                }}
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
        </div>

        {/* SECTION 2: Seamless Integrations */}
        <motion.div
          className="w-full flex flex-col items-center justify-center px-6 mb-32"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <motion.span
              className="text-sm font-medium tracking-wider uppercase mb-4 block"
              style={{
                background: 'linear-gradient(90deg, #006AAA, #C00008)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Seamless Integrations
            </motion.span>
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Connect Everything
            </motion.h2>
            <motion.p
              className="max-w-2xl text-lg text-muted-foreground mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Your Smart Site integrates with any tool, platform, or API your business needs.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <DatabaseWithRestApi
              circleText="API"
              title="We connect to any API you need"
              buttonTexts={{ first: "Haestus", second: "Your Stack" }}
              badgeTexts={{
                first: "GET",
                second: "POST",
                third: "PUT",
                fourth: "DELETE",
                fifth: "PATCH",
                sixth: "HEAD",
                seventh: "WS",
                eighth: "GQL"
              }}
              lightColor="#006AAA"
            />
          </motion.div>
        </motion.div>

        {/* SECTION 3: Social Icons at Bottom */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SocialIcons />
        </motion.div>
      </div>
    </div>
  );
}

export default HeroSectionAnimated;
