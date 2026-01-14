"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import RuixenQueryBox from "@/components/ui/ruixen-query-box";

export function HeroBranding() {
  return (
    <section className="relative pt-32 pb-16 bg-background">
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

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl text-muted-foreground font-light tracking-wide"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Design Systems & Digital Experiences for Visionary Brands
        </motion.p>

        {/* Decorative Line */}
        <motion.div
          className="w-12 h-px bg-foreground/20 mt-8"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        />
      </motion.div>
    </section>
  );
}
