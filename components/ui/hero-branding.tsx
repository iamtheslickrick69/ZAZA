"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import RuixenQueryBox from "@/components/ui/ruixen-query-box";
import { SparklesCore } from "@/components/ui/sparkles";

export function HeroBranding() {
  return (
    <section className="relative pt-32 pb-6">
      <motion.div
        className="max-w-4xl mx-auto flex flex-col items-center text-center px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      >
        {/* Logo - Hero Title */}
        <a href="/" className="block mb-6">
          <Image
            src="/haestus1.png"
            alt="HAESTUS"
            width={320}
            height={46}
            priority
            className="brightness-0 invert"
          />
        </a>

        {/* AI Chat Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full"
        >
          <RuixenQueryBox />
        </motion.div>

        {/* Sparkles underneath the text box */}
        <div className="relative w-full h-24 -mt-4">
          <SparklesCore
            id="hero-sparkles"
            background="transparent"
            minSize={0.3}
            maxSize={1}
            particleDensity={50}
            className="w-full h-full"
            particleColor="#FFFFFF"
            speed={0.4}
          />
          {/* Fade mask at top to blend with chat box */}
          <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-background to-transparent pointer-events-none" />
        </div>
      </motion.div>
    </section>
  );
}
