"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { animate, svg } from 'animejs';
import {
  MessageSquare,
  Hammer,
  Rocket,
  TrendingUp,
  CheckCircle,
} from "lucide-react";

const CheckItem = ({ children }: { children: React.ReactNode }) => (
  <div className="flex gap-2 items-center text-neutral-300 text-sm">
    <CheckCircle className="w-4 h-4 text-[#00a8cc] flex-shrink-0" />
    {children}
  </div>
);

const steps = [
  {
    id: "1",
    label: "Connect",
    icon: MessageSquare,
    description: "30 minutes. That's all we need to understand your business, your customers, and exactly how AI can work for you.",
    items: [
      "30-minute strategy session",
      "Competitor breakdown",
      "AI game plan tailored to you",
      "Clear roadmap & timeline",
    ],
  },
  {
    id: "2",
    label: "Build",
    icon: Hammer,
    description: "Your brand. Your AI. Your rules. We design and build everything from scratch - no templates, no compromises.",
    items: [
      "Custom design that's 100% yours",
      "AI trained on your business",
      "Lightning-fast performance",
      "Mobile-perfect on every device",
    ],
  },
  {
    id: "3",
    label: "Launch",
    icon: Rocket,
    description: "You're live. Your AI is answering questions, booking calls, and converting visitors - while you sleep.",
    items: [
      "Your site goes live",
      "Custom domain connected",
      "Analytics tracking every conversion",
      "Team walkthrough so you're confident",
    ],
  },
  {
    id: "4",
    label: "Optimize",
    icon: TrendingUp,
    description: "Your AI gets smarter every day. We monitor, tweak, and scale - so your site grows as fast as your business.",
    items: [
      "24/7 AI monitoring",
      "Monthly performance insights",
      "Continuous improvements",
      "Priority support whenever you need it",
    ],
  },
];

// Animated Icon component with stroke drawing effect
function AnimatedIcon({ icon: Icon, isActive }: { icon: React.ComponentType<any>; isActive: boolean }) {
  const iconRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<any>(null);

  useEffect(() => {
    if (iconRef.current && isActive) {
      // Small delay to ensure SVG is rendered
      const timer = setTimeout(() => {
        const svgElements = iconRef.current?.querySelectorAll('svg path, svg circle, svg polyline, svg line, svg rect');
        if (svgElements && svgElements.length > 0) {
          // Add unique class for this icon instance
          const uniqueClass = `icon-drawer-${Date.now()}`;
          svgElements.forEach((element) => {
            element.classList.add(uniqueClass);
          });

          // Create animation - slower at 2500ms
          animationRef.current = animate(svg.createDrawable(`.${uniqueClass}`), {
            draw: ['0 0', '0 1'],
            ease: 'inOutQuad',
            duration: 2500,
            loop: true,
            alternate: true,
          });
        }
      }, 50);

      return () => {
        clearTimeout(timer);
        if (animationRef.current) {
          animationRef.current.pause();
        }
      };
    }
  }, [isActive]);

  return (
    <div ref={iconRef}>
      <Icon className="w-5 h-5 text-[#00a8cc]" strokeWidth={1.5} />
    </div>
  );
}

export function LaunchTimeline() {
  const [activeStep, setActiveStep] = useState("1");

  const currentStep = steps.find((s) => s.id === activeStep) || steps[0];

  return (
    <section className="relative w-full bg-neutral-950 py-20">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        {/* Header - Left Aligned */}
        <div className="mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs uppercase tracking-widest text-neutral-400 mb-4">
            Our Process
          </span>
          <h2 className="text-3xl md:text-5xl font-display mb-4 text-white">
            Live in 7 Days. Not 7 Months.
          </h2>
          <p className="text-neutral-400 text-sm md:text-base max-w-xl">
            While others are still scheduling meetings, your AI-powered site is already
            converting visitors into customers.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {steps.map((step) => {
            const isActive = activeStep === step.id;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className="relative px-4 py-3 rounded-xl text-sm font-medium transition-colors outline-none"
              >
                {isActive && (
                  <motion.div
                    layoutId="active-process-tab"
                    className="absolute inset-0 bg-[#00a8cc]/20 border border-[#00a8cc]/50 rounded-xl"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
                <span className={`relative z-10 flex items-center gap-2 ${isActive ? "text-white" : "text-neutral-500"}`}>
                  <span className="text-[#00a8cc] font-bold">{step.id}</span>
                  {step.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-[#00a8cc]/20">
              <AnimatedIcon icon={currentStep.icon} isActive={true} />
            </div>
            <h4 className="text-xl font-bold text-white">{currentStep.label}</h4>
          </div>

          <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
            {currentStep.description}
          </p>

          <div className="p-4 rounded-xl border border-[#00a8cc]/30 bg-[#004a58]/10">
            <div className="space-y-2">
              {currentStep.items.map((item, idx) => (
                <CheckItem key={idx}>{item}</CheckItem>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
