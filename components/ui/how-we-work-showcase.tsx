"use client";

import React from "react";
import { motion } from "framer-motion";
import { Lightbulb, Palette, Rocket, Trophy } from "lucide-react";

interface Step {
  id: number;
  number: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number; style?: React.CSSProperties }>;
  image: string;
}

const steps: Step[] = [
  {
    id: 1,
    number: "01",
    title: "STRATEGY",
    description: "Deep dive into your vision, market, and goals",
    icon: Lightbulb,
    image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=1920&q=80", // Dramatic chess board
  },
  {
    id: 2,
    number: "02",
    title: "DESIGN",
    description: "Transforming strategy into stunning experiences",
    icon: Palette,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1920&q=80", // MacBook Pro clean desk
  },
  {
    id: 3,
    number: "03",
    title: "DEPLOY",
    description: "Launching with cutting-edge technology",
    icon: Rocket,
    image: "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=1920&q=80", // SpaceX rocket launch
  },
  {
    id: 4,
    number: "04",
    title: "WIN TOGETHER",
    description: "Celebrating success and scaling impact",
    icon: Trophy,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80", // Mountain summit victory
  },
];

function CinematicStep({ step, index }: { step: Step; index: number }) {
  const [isHovered, setIsHovered] = React.useState(false);
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="relative h-[140px] md:h-[180px] overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${step.image})` }}
        animate={{
          scale: isHovered ? 1.05 : 1,
          filter: isHovered ? "grayscale(0%)" : "grayscale(100%)",
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />

      {/* Dark Overlay */}
      <motion.div
        className="absolute inset-0 bg-black"
        animate={{
          opacity: isHovered ? 0.3 : 0.85,
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center px-8 md:px-16">
        <div className="flex items-center gap-6 md:gap-12 w-full">
          {/* Number */}
          <motion.span
            className="font-mono text-sm md:text-base tracking-wider"
            animate={{
              color: isHovered ? "#ffffff" : "#525252",
            }}
            transition={{ duration: 0.3 }}
          >
            {step.number}
          </motion.span>

          {/* Icon */}
          <motion.div
            animate={{
              scale: isHovered ? 1.1 : 1,
              filter: isHovered ? "drop-shadow(0 0 8px rgba(255,255,255,0.4))" : "none",
            }}
            transition={{ duration: 0.3 }}
          >
            <Icon
              className="w-5 h-5 md:w-6 md:h-6"
              strokeWidth={1}
              style={{ color: isHovered ? "#ffffff" : "#525252" }}
            />
          </motion.div>

          {/* Title */}
          <motion.h3
            className="text-3xl md:text-5xl lg:text-6xl font-display tracking-tight"
            animate={{
              color: isHovered ? "#ffffff" : "#404040",
              x: isHovered ? 10 : 0,
              textShadow: isHovered ? "0 0 40px rgba(255,255,255,0.3)" : "none",
            }}
            transition={{ duration: 0.4 }}
          >
            {step.title}
          </motion.h3>

          {/* Description - slides in on hover */}
          <motion.p
            className="hidden lg:block text-sm max-w-xs ml-auto"
            animate={{
              opacity: isHovered ? 1 : 0,
              x: isHovered ? 0 : 30,
              color: "#e5e5e5",
            }}
            transition={{ duration: 0.4, delay: isHovered ? 0.1 : 0 }}
          >
            {step.description}
          </motion.p>

          {/* Step Progress Dots */}
          <motion.div
            className="hidden md:flex items-center gap-2 ml-8"
            animate={{ opacity: isHovered ? 1 : 0.3 }}
          >
            {[1, 2, 3, 4].map((dot) => (
              <motion.div
                key={dot}
                className="w-2 h-2 rounded-full"
                animate={{
                  backgroundColor: dot <= step.id
                    ? (isHovered ? "#ffffff" : "#525252")
                    : "#262626",
                  scale: dot === step.id && isHovered ? 1.4 : 1,
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-0 h-[3px] bg-white"
        initial={{ width: 0 }}
        animate={{
          width: isHovered ? "100%" : "0%",
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />

      {/* Top accent line - subtle */}
      <motion.div
        className="absolute top-0 right-0 h-[1px] bg-white/30"
        initial={{ width: 0 }}
        animate={{
          width: isHovered ? "100%" : "0%",
        }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
      />
    </motion.div>
  );
}

export function HowWeWorkShowcase() {
  return (
    <section className="relative py-16 bg-black">
      <div className="max-w-[1800px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 px-8 md:px-16 text-center"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs uppercase tracking-widest text-neutral-400 mb-4">
            Our Process
          </span>
          <h2 className="text-3xl md:text-4xl font-display text-white mb-3">
            How We Work
          </h2>
          <p className="text-neutral-400 text-sm md:text-base">
            From strategy to victory, we're with you every step.
          </p>
        </motion.div>

        {/* Cinematic Steps */}
        <div className="space-y-[2px]">
          {steps.map((step, index) => (
            <CinematicStep key={step.id} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
