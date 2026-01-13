"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView, useMotionValue, useTransform } from "framer-motion";

interface BentoCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  accentColor: "blue" | "red" | "gradient";
  delay: number;
  trend?: "up" | "down" | "neutral";
  prefix?: string;
  suffix?: string;
}

// Count-up animation hook
function useCountUp(end: number, duration: number = 2000, startCounting: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounting) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, startCounting]);

  return count;
}

// Parse numeric value from string
function parseNumericValue(value: string | number): { num: number; prefix: string; suffix: string } {
  if (typeof value === "number") {
    return { num: value, prefix: "", suffix: "" };
  }

  const match = value.match(/^([^\d]*)([0-9,.]+)([^\d]*)$/);
  if (match) {
    const num = parseFloat(match[2].replace(/,/g, ""));
    return { num, prefix: match[1], suffix: match[3] };
  }

  return { num: 0, prefix: "", suffix: value };
}

// Format number with commas
function formatNumber(num: number, originalValue: string | number): string {
  if (typeof originalValue === "string" && originalValue.includes(",")) {
    return num.toLocaleString();
  }
  return num.toString();
}

const BentoCard: React.FC<BentoCardProps> = ({
  title,
  value,
  subtitle,
  accentColor,
  delay,
  trend = "neutral",
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);

  // Parse the value for count-up animation
  const { num, prefix, suffix } = parseNumericValue(value);
  const animatedNum = useCountUp(num, 1500, isInView);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay + 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const borderColor =
    accentColor === "blue" ? "#006AAA" :
    accentColor === "red" ? "#C00008" :
    "linear-gradient(180deg, #006AAA, #C00008)";

  const glowColor =
    accentColor === "blue" ? "rgba(0, 106, 170, 0.5)" :
    accentColor === "red" ? "rgba(192, 0, 8, 0.5)" :
    "rgba(0, 106, 170, 0.3)";

  const TrendIcon = () => {
    if (trend === "up") {
      return (
        <span className="inline-flex items-center ml-2 text-emerald-400 text-lg">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </span>
      );
    }
    if (trend === "down") {
      return (
        <span className="inline-flex items-center ml-2 text-red-400 text-lg">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      );
    }
    return null;
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card with left accent border */}
      <motion.div
        className="relative h-full rounded-lg overflow-hidden border border-white/5 transition-all duration-300"
        animate={{
          backgroundColor: isHovered ? "#1a1a1a" : "#141414",
          y: isHovered ? -4 : 0,
          boxShadow: isHovered
            ? `0 12px 40px rgba(0, 0, 0, 0.4), 0 0 20px ${glowColor}`
            : "0 4px 24px rgba(0, 0, 0, 0.3)",
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Left accent border with glow on hover */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-[3px]"
          style={{
            background: accentColor === "gradient"
              ? "linear-gradient(180deg, #006AAA, #C00008)"
              : borderColor,
          }}
          animate={{
            boxShadow: isHovered
              ? `0 0 15px ${glowColor}, 0 0 30px ${glowColor}`
              : "none",
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Animated top border on hover */}
        <motion.div
          className="absolute left-0 top-0 h-[3px]"
          style={{
            background: accentColor === "gradient"
              ? "linear-gradient(90deg, #006AAA, #C00008)"
              : borderColor,
          }}
          initial={{ width: 0 }}
          animate={{ width: isHovered ? "100%" : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Subtle gradient overlay for depth */}
        <motion.div
          className="absolute inset-0 transition-opacity duration-300"
          animate={{ opacity: isHovered ? 0.5 : 0.3 }}
          style={{
            background: accentColor === "blue"
              ? "radial-gradient(ellipse at top left, rgba(0, 106, 170, 0.15), transparent 50%)"
              : accentColor === "red"
              ? "radial-gradient(ellipse at top left, rgba(192, 0, 8, 0.15), transparent 50%)"
              : "radial-gradient(ellipse at top left, rgba(0, 106, 170, 0.1), rgba(192, 0, 8, 0.1), transparent 60%)",
          }}
        />

        <motion.div
          className="relative z-10 p-6 md:p-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.h3
            className="text-sm md:text-base text-zinc-400 font-body mb-2"
            variants={item}
          >
            {title}
          </motion.h3>
          <motion.div
            className="flex items-baseline"
            variants={item}
          >
            <span className="text-3xl sm:text-4xl md:text-5xl text-white font-display">
              {prefix}{formatNumber(animatedNum, value)}{suffix}
            </span>
            <TrendIcon />
          </motion.div>
          {subtitle && (
            <motion.p
              className="text-sm text-zinc-500 font-body mt-3"
              variants={item}
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const AnimatedGradientDemo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      return () => container.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full bg-[#0a0a0a] py-8 md:py-16 px-4 md:px-8 relative overflow-hidden"
    >
      {/* Cursor follow gradient */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        animate={{
          x: mousePosition.x - 300,
          y: mousePosition.y - 300,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
        style={{
          background: "radial-gradient(circle, rgba(0, 106, 170, 0.06) 0%, rgba(192, 0, 8, 0.04) 40%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Row 1: Total Revenue (large) + New Users */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6">
          <div className="md:col-span-2">
            <BentoCard
              title="Total Revenue"
              value="$1,234,567"
              subtitle="15% increase from last month"
              accentColor="blue"
              delay={0.2}
              trend="up"
            />
          </div>
          <BentoCard
            title="New Users"
            value={1234}
            subtitle="Daily signups"
            accentColor="red"
            delay={0.3}
            trend="up"
          />
        </div>

        {/* Row 2: Conversion Rate + Active Projects + Customer Satisfaction */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <BentoCard
            title="Conversion Rate"
            value="3.45%"
            subtitle="0.5% increase from last week"
            accentColor="blue"
            delay={0.4}
            trend="up"
          />
          <BentoCard
            title="Active Projects"
            value={42}
            subtitle="8 completed this month"
            accentColor="red"
            delay={0.5}
            trend="neutral"
          />
          <BentoCard
            title="Customer Satisfaction"
            value="4.8/5"
            subtitle="1,000+ verified reviews"
            accentColor="gradient"
            delay={0.6}
            trend="up"
          />
        </div>
      </div>
    </div>
  );
};

export { AnimatedGradientDemo, BentoCard };
