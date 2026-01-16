"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Code, Rocket, TrendingUp, Check } from "lucide-react";

const steps = [
  {
    id: 1,
    label: "Connect",
    icon: MessageSquare,
    title: "Connect",
    description: "30 minutes. That's all we need to understand your business, your customers, and exactly how AI can work for you.",
    features: [
      "30-minute strategy session",
      "Competitor breakdown",
      "AI game plan tailored to you",
      "Clear roadmap & timeline",
    ],
  },
  {
    id: 2,
    label: "Build",
    icon: Code,
    title: "Build",
    description: "Our team crafts your custom AI-powered website with conversion-focused design and smart automation built in.",
    features: [
      "Custom design & development",
      "AI chatbot integration",
      "Lead capture automation",
      "Mobile-first optimization",
    ],
  },
  {
    id: 3,
    label: "Launch",
    icon: Rocket,
    title: "Launch",
    description: "Go live with confidence. We handle deployment, testing, and ensure everything runs perfectly from day one.",
    features: [
      "Full deployment & hosting",
      "Performance optimization",
      "Security configuration",
      "Launch day support",
    ],
  },
  {
    id: 4,
    label: "Optimize",
    icon: TrendingUp,
    title: "Optimize",
    description: "Your site gets smarter over time. We continuously refine based on real data and user behavior.",
    features: [
      "Analytics & reporting",
      "A/B testing",
      "Conversion optimization",
      "Ongoing AI training",
    ],
  },
];

export function OurProcess() {
  const [activeStep, setActiveStep] = React.useState(0);

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <span className="inline-flex items-center px-4 py-2 rounded-full border border-border bg-foreground/5 text-xs text-muted-foreground font-nav uppercase tracking-wider">
            Our Process
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-display text-foreground text-center mb-6"
        >
          Live in 7 Days. Not 7 Months.
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl font-body text-muted-foreground text-center max-w-2xl mx-auto mb-12"
        >
          While others are still scheduling meetings, your AI-powered site is already
          converting visitors into customers.
        </motion.p>

        {/* Step Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10"
        >
          {steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(index)}
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-body-medium transition-all duration-300
                ${activeStep === index
                  ? "bg-foreground text-background shadow-lg"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                }
              `}
            >
              <span className={`text-xs font-body-semibold ${activeStep === index ? "text-cyan-400" : "text-cyan-500"}`}>
                {step.id}
              </span>
              <span>{step.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative"
        >
          <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {/* Step Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                    {React.createElement(steps[activeStep].icon, {
                      className: "w-5 h-5 text-cyan-500",
                    })}
                  </div>
                  <h3 className="text-xl md:text-2xl font-body-semibold text-foreground">
                    {steps[activeStep].title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-base md:text-lg font-body text-muted-foreground mb-6">
                  {steps[activeStep].description}
                </p>

                {/* Features List */}
                <div className="rounded-xl border border-border bg-background/50 p-5">
                  <ul className="space-y-3">
                    {steps[activeStep].features.map((feature, index) => (
                      <motion.li
                        key={feature}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-5 h-5 rounded-full bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-cyan-500" />
                        </div>
                        <span className="text-sm md:text-base font-body text-foreground/90">
                          {feature}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
