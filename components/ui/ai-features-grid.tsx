"use client";

import { cn } from "@/lib/utils";
import {
  Robot,
  MagnifyingGlass,
  ChartLineUp,
  ChatCircleDots,
  Envelope,
  Calendar,
  ShieldCheck,
  Lightning,
  Brain,
  Translate,
  FileText,
  Users,
  Bell,
  Database,
  Gauge,
  Sparkle,
} from "@phosphor-icons/react";
import { PixelCanvas } from "./pixel-canvas";

const features = [
  {
    title: "AI Chatbot",
    description:
      "Trained on your business. Answers questions, books appointments, captures leads 24/7.",
    icon: <Robot weight="thin" className="w-6 h-6" />,
  },
  {
    title: "SEO Content Writer",
    description:
      "AI writes blog posts, meta descriptions, and landing pages optimized for search.",
    icon: <FileText weight="thin" className="w-6 h-6" />,
  },
  {
    title: "Smart Analytics",
    description:
      "Real-time insights on visitor behavior, conversion paths, and revenue attribution.",
    icon: <ChartLineUp weight="thin" className="w-6 h-6" />,
  },
  {
    title: "Lead Scoring",
    description:
      "AI ranks leads by intent. Know who's ready to buy before you pick up the phone.",
    icon: <Users weight="thin" className="w-6 h-6" />,
  },
  {
    title: "Auto Responses",
    description:
      "Instant email and SMS replies. Never leave a prospect waiting again.",
    icon: <Envelope weight="thin" className="w-6 h-6" />,
  },
  {
    title: "Smart Scheduling",
    description:
      "AI handles availability, time zones, and reminders. Zero back-and-forth.",
    icon: <Calendar weight="thin" className="w-6 h-6" />,
  },
  {
    title: "Performance Monitor",
    description:
      "Lighthouse scores, Core Web Vitals, uptime alerts. Always optimized.",
    icon: <Gauge weight="thin" className="w-6 h-6" />,
  },
  {
    title: "Self-Improving AI",
    description:
      "Learns from every interaction. Gets smarter and more accurate over time.",
    icon: <Brain weight="thin" className="w-6 h-6" />,
  },
];

export function AIFeaturesGrid() {
  return (
    <section className="w-full bg-neutral-950 py-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs uppercase tracking-widest text-neutral-400 mb-4">
          AI-Powered Features
        </span>
        <h2 className="text-3xl md:text-5xl font-display mb-4 text-white max-w-3xl">
          50+ Features. Zero Extra Work.
        </h2>
        <p className="text-neutral-400 text-sm md:text-base max-w-xl">
          Every site comes loaded with AI capabilities that work while you sleep.
          Here are just a few.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <Feature key={feature.title} {...feature} index={index} />
        ))}
      </div>
    </section>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature border-neutral-800 overflow-hidden",
        (index === 0 || index === 4) && "lg:border-l border-neutral-800",
        index < 4 && "lg:border-b border-neutral-800"
      )}
    >
      {/* Pixel Canvas Effect */}
      <PixelCanvas
        colors={["#004a58", "#00a8cc", "#006d7a"]}
        gap={6}
        speed={40}
        noFocus
      />

      {/* Icon */}
      <div className="mb-4 relative z-10 px-10 text-neutral-400 group-hover/feature:text-[#00a8cc] transition-colors duration-200">
        {icon}
      </div>

      {/* Title with animated bar */}
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-700 group-hover/feature:bg-[#00a8cc] transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-100">
          {title}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-neutral-400 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};

export default AIFeaturesGrid;
