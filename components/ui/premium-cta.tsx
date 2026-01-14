/**
 * PREMIUM CTA COMPONENT
 *
 * World-class call-to-action button component designed for professional use throughout the app.
 * Based on the "Let's talk / Book a call" design pattern.
 *
 * USAGE EXAMPLES:
 *
 * 1. Full CTA Section with Label, Headline, and Subtitle:
 * ```tsx
 * <PremiumCTA
 *   label="PERFECT"
 *   headline="Let's talk"
 *   buttonText="Book a call"
 *   subtitle="15 MIN INTRO CALL"
 *   icon={Calendar}
 *   variant="primary"
 * />
 * ```
 *
 * 2. Simple CTA without extras:
 * ```tsx
 * <PremiumCTA
 *   headline="Ready to start?"
 *   buttonText="Get Started"
 *   icon={Rocket}
 * />
 * ```
 *
 * 3. Secondary variant:
 * ```tsx
 * <PremiumCTA
 *   headline="View our work"
 *   buttonText="See Portfolio"
 *   variant="secondary"
 *   icon={Eye}
 * />
 * ```
 */

"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface PremiumCTAProps {
  label?: string;
  headline: string;
  buttonText: string;
  subtitle?: string;
  icon?: LucideIcon;
  variant?: "primary" | "secondary";
  href?: string;
  onClick?: () => void;
  className?: string;
}

export function PremiumCTA({
  label = "PERFECT",
  headline,
  buttonText,
  subtitle,
  icon: Icon = Calendar,
  variant = "primary",
  href,
  onClick,
  className = "",
}: PremiumCTAProps) {
  const ButtonComponent = href ? motion.a : motion.button;

  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      {/* Label */}
      {label && (
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-6"
        >
          {label}
        </motion.span>
      )}

      {/* Headline */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 max-w-3xl"
      >
        {headline}
      </motion.h2>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <ButtonComponent
          href={href}
          onClick={onClick}
          className={`group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium text-base transition-all overflow-hidden ${
            variant === "primary"
              ? "bg-foreground text-background hover:bg-foreground/90"
              : "bg-background text-foreground border-2 border-border hover:border-foreground/30"
          }`}
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {/* Shimmer effect on hover */}
          <motion.div
            className={`absolute inset-0 ${
              variant === "primary" ? "bg-white/20" : "bg-foreground/5"
            }`}
            initial={{ x: "-100%", skewX: -20 }}
            whileHover={{ x: "200%" }}
            transition={{ duration: 0.8 }}
          />

          {/* Icon */}
          <motion.div
            className="relative z-10"
            whileHover={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
          >
            <Icon className="w-5 h-5" />
          </motion.div>

          {/* Button Text */}
          <span className="relative z-10">{buttonText}</span>

          {/* Arrow */}
          <motion.div
            className="relative z-10"
            whileHover={{ x: 4, y: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <ArrowUpRight className="w-5 h-5" />
          </motion.div>

          {/* Glow effect */}
          <motion.div
            className={`absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-30 ${
              variant === "primary" ? "bg-foreground" : "bg-foreground/20"
            }`}
            transition={{ duration: 0.3 }}
          />
        </ButtonComponent>
      </motion.div>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-sm tracking-[0.15em] uppercase text-muted-foreground mt-6"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
