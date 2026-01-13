"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { SparkIconInteractive } from "@/components/ui/spark-icon";
import { MissionModal } from "@/components/MissionModal";

export function HeroSectionAnimated() {
  const [isMissionModalOpen, setIsMissionModalOpen] = useState(false);
  const [sparkIconRect, setSparkIconRect] = useState<DOMRect | null>(null);
  const sparkIconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const words = document.querySelectorAll<HTMLElement>(".word");
    words.forEach((word) => {
      const delay = parseInt(word.getAttribute("data-delay") || "0", 10);
      setTimeout(() => {
        word.style.animation = "word-appear 0.8s ease-out forwards";
      }, delay);
    });
  }, []);

  const handleOpenMission = () => {
    if (sparkIconRef.current) {
      setSparkIconRect(sparkIconRef.current.getBoundingClientRect());
    }
    setIsMissionModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden relative w-full">
      {/* Subtle grid - pure gray, no green */}
      <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid-clean" width="60" height="60" patternUnits="userSpaceOnUse">
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="rgba(255,255,255,0.03)"
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

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center px-6 md:px-16 pt-20">

        {/* Official Logo + Lambda Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-12 flex items-center gap-4"
        >
          {/* Lambda Icon - clickable for mission modal */}
          <div ref={sparkIconRef}>
            <SparkIconInteractive
              size={56}
              color="#C00008"
              className="opacity-70 hover:opacity-100 transition-opacity"
              onClick={handleOpenMission}
            />
          </div>
          <Image
            src="/logo/white.png"
            alt="Haestus"
            width={300}
            height={60}
            className="h-12 md:h-16 lg:h-20 w-auto"
            priority
          />
        </motion.div>

        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-zinc-400 font-nav">
            <span className="w-2 h-2 rounded-full bg-[#006AAA] animate-pulse"></span>
            Design Systems & Web Development
          </span>
        </motion.div>

        {/* Main headline */}
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl leading-tight text-white mb-6 font-display"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            We Build Digital Experiences
            <br />
            <span className="text-zinc-500">for Visionary Brands</span>
          </motion.h1>

          {/* Animated gradient line */}
          <motion.div
            className="w-32 h-[3px] mx-auto my-8 rounded-full"
            style={{
              backgroundImage: 'linear-gradient(90deg, #006AAA, #C00008, #006AAA)',
              backgroundSize: '200% 100%',
            }}
            animate={{
              backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
            }}
            transition={{
              duration: 4,
              ease: 'easeInOut',
              repeat: Infinity,
            }}
          />
          <motion.div
            className="w-24 h-[6px] mx-auto -mt-6 mb-8 rounded-full blur-md"
            style={{
              backgroundImage: 'linear-gradient(90deg, #006AAA, #C00008, #006AAA)',
              backgroundSize: '200% 100%',
            }}
            animate={{
              backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              ease: 'easeInOut',
              repeat: Infinity,
            }}
          />

          {/* Subheadline - the David vs Goliath message */}
          <motion.p
            className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-4 font-display-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            The age of AI is the rematch between David and Goliath.
          </motion.p>
          <motion.p
            className="text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto mb-12 font-display-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            We&apos;re crafting slingshots.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            {/* Primary CTA */}
            <div className="group relative rounded-xl">
              <motion.div
                className="absolute -inset-[2px] rounded-xl z-0"
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
                className="absolute -inset-[2px] rounded-xl z-0 blur-lg"
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
              <Button size="lg" className="relative z-10 rounded-xl px-8 py-6 text-base bg-white text-black hover:bg-zinc-100 border-0 font-body-medium">
                Start Your Project
              </Button>
            </div>

            {/* Secondary CTA */}
            <Button
              size="lg"
              variant="outline"
              className="rounded-xl px-8 py-6 text-base bg-transparent text-white border-zinc-700 hover:bg-white/5 hover:border-zinc-600 font-body-medium"
            >
              View Our Work
            </Button>
          </motion.div>
        </div>

        {/* What we do - quick value props */}
        <motion.div
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <div className="p-6">
            <div className="w-10 h-10 mx-auto mb-4 rounded-lg bg-[#006AAA]/10 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-[#006AAA]"></div>
            </div>
            <h3 className="text-white mb-2 font-body-semibold">Design Systems</h3>
            <p className="text-zinc-500 text-sm font-body">Scalable component libraries that grow with your brand</p>
          </div>
          <div className="p-6">
            <div className="w-10 h-10 mx-auto mb-4 rounded-lg bg-[#C00008]/10 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-[#C00008]"></div>
            </div>
            <h3 className="text-white mb-2 font-body-semibold">Web Development</h3>
            <p className="text-zinc-500 text-sm font-body">High-performance sites built with modern technology</p>
          </div>
          <div className="p-6">
            <div className="w-10 h-10 mx-auto mb-4 rounded-lg bg-gradient-to-r from-[#006AAA]/10 to-[#C00008]/10 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#006AAA] to-[#C00008]"></div>
            </div>
            <h3 className="text-white mb-2 font-body-semibold">Brand Identity</h3>
            <p className="text-zinc-500 text-sm font-body">Visual systems that make your brand unforgettable</p>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-zinc-700 flex items-start justify-center p-2"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-2 rounded-full bg-zinc-500"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Mission Modal */}
      <MissionModal
        isOpen={isMissionModalOpen}
        onClose={() => setIsMissionModalOpen(false)}
        originRect={sparkIconRect}
      />
    </div>
  );
}

export default HeroSectionAnimated;
