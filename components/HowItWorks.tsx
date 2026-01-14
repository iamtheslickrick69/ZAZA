"use client";

import { cn } from "@/lib/utils";
import { ShineBorder } from "@/components/ui/shine-border";
import { Button } from "@/components/ui/button";
import {
  Lightbulb,
  Send,
  CheckCircle,
  RefreshCw,
  Download,
  ChevronRight,
  LucideIcon
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface TimelineEvent {
  label: string;
  message: string;
  icon: LucideIcon;
  color: string;
  borderColor: string;
}

const timeline: TimelineEvent[] = [
  {
    label: "Discovery Call",
    message: "We learn about your business, goals, and vision to understand exactly what you need.",
    icon: Lightbulb,
    color: "text-orange-500",
    borderColor: "border-orange-500/40",
  },
  {
    label: "Strategy & Design",
    message: "We create a custom strategy and design mockups tailored to your brand.",
    icon: Send,
    color: "text-amber-500",
    borderColor: "border-amber-500/40",
  },
  {
    label: "Build Your Smart Site",
    message: "Your AI-powered website comes to life with all the features you need.",
    icon: CheckCircle,
    color: "text-blue-500",
    borderColor: "border-blue-500/40",
  },
  {
    label: "Review & Refine",
    message: "We iterate until it's perfect—unlimited revisions until you're 100% satisfied.",
    icon: RefreshCw,
    color: "text-green-500",
    borderColor: "border-green-500/40",
  },
  {
    label: "Launch & Support",
    message: "Go live and get ongoing support. Your Smart Site evolves with your business.",
    icon: Download,
    color: "text-emerald-500",
    borderColor: "border-emerald-500/40",
  },
];

function TimelineItem({
  event,
  isLast,
  index
}: {
  event: TimelineEvent;
  isLast: boolean;
  index: number;
}) {
  const Icon = event.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative flex gap-4"
    >
      <div className="relative">
        <div
          className={cn(
            "rounded-full border-2 bg-background p-2.5 transition-all duration-300 group-hover:scale-110",
            event.borderColor
          )}
        >
          <Icon className={cn("h-5 w-5", event.color)} />
        </div>
        {!isLast && (
          <div className="absolute left-1/2 top-12 h-full w-[2px] -translate-x-1/2 bg-border" />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 pb-8">
        <p className={cn("text-lg font-semibold text-foreground transition-colors", event.color.replace('text-', 'group-hover:text-'))}>
          {event.label}
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {event.message}
        </p>
      </div>
    </motion.div>
  );
}

export function HowItWorks() {
  return (
    <section className="w-full bg-background py-20 px-4 transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        <ShineBorder
          borderWidth={2}
          borderRadius={24}
          className="border border-border bg-background/80 shadow-2xl backdrop-blur-md"
          color={["#6b7280", "#6b7280", "#6b7280"]}
        >
          <div className="w-full py-8 px-6 md:px-12">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span
                className="text-sm font-medium tracking-wider uppercase mb-4 block"
                style={{
                  background: 'linear-gradient(90deg, #6b7280, #6b7280)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Our Process
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                How It Works
              </h2>
            </motion.div>

            {/* Timeline */}
            <div className="mx-auto max-w-md">
              {timeline.map((event, i) => (
                <TimelineItem
                  key={event.label}
                  event={event}
                  isLast={i === timeline.length - 1}
                  index={i}
                />
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-8 flex flex-col items-center text-center"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Ready to Get Started?
              </h3>
              <p className="text-muted-foreground mb-6">
                Let&apos;s build something amazing together.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="#contact">
                  <Button
                    size="lg"
                    className="group rounded-2xl px-6 bg-foreground text-background hover:bg-foreground/90"
                  >
                    Start Your Project
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="#contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="group rounded-2xl px-6 border-border text-foreground hover:bg-foreground/5"
                  >
                    Book a Call
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </ShineBorder>
      </div>
    </section>
  );
}

export default HowItWorks;
