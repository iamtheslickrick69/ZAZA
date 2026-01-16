"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Code, Rocket, TrendingUp, Check } from "lucide-react";

const steps = [
  {
    id: 1,
    label: "Connect",
    icon: MessageSquare,
    features: ["30-min strategy call", "Competitor analysis", "AI game plan"],
  },
  {
    id: 2,
    label: "Build",
    icon: Code,
    features: ["Custom design", "AI integration", "Mobile-first"],
  },
  {
    id: 3,
    label: "Launch",
    icon: Rocket,
    features: ["Full deployment", "Performance tuning", "Launch support"],
  },
  {
    id: 4,
    label: "Optimize",
    icon: TrendingUp,
    features: ["Analytics", "A/B testing", "Ongoing AI training"],
  },
];

export function RotatingTestimonials() {
  const [activeStep, setActiveStep] = React.useState(0);

  return (
    <div className="relative flex flex-col items-center justify-center h-full px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="flex flex-col items-center w-full max-w-md"
      >
        {/* Headline */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-2xl md:text-3xl font-display text-foreground leading-tight">
            The Age of Execution
          </h3>
          <p className="text-xl md:text-2xl font-display-light text-muted-foreground italic mt-1">
            (show, don&apos;t tell)
          </p>
        </motion.div>

        {/* Step Tabs - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-1.5 mb-4"
        >
          {steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(index)}
              className={`
                flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body-medium transition-all duration-300
                ${activeStep === index
                  ? "bg-foreground text-background"
                  : "bg-card/50 border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                }
              `}
            >
              <span className={`text-[10px] font-body-semibold ${activeStep === index ? "text-cyan-400" : "text-cyan-500"}`}>
                {step.id}
              </span>
              <span>{step.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Content Card - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="w-full"
        >
          <div className="rounded-xl border border-border bg-card/30 backdrop-blur-sm p-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                {/* Step Header */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-md bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                    {React.createElement(steps[activeStep].icon, {
                      className: "w-3.5 h-3.5 text-cyan-500",
                    })}
                  </div>
                  <h4 className="text-sm font-body-semibold text-foreground">
                    {steps[activeStep].label}
                  </h4>
                </div>

                {/* Features List - Compact */}
                <ul className="space-y-1.5">
                  {steps[activeStep].features.map((feature, index) => (
                    <motion.li
                      key={feature}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className="flex items-center gap-2"
                    >
                      <div className="w-4 h-4 rounded-full bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                        <Check className="w-2.5 h-2.5 text-cyan-500" />
                      </div>
                      <span className="text-xs font-body text-foreground/80">
                        {feature}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Live in 7 Days - Below cards */}
        <motion.div
          className="text-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-lg md:text-xl font-display text-foreground">
            Live in <span className="font-body-semibold">7 Days</span>.
          </p>
          <p className="text-base md:text-lg font-display-light text-muted-foreground mt-0.5">
            Not 7 Months.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
