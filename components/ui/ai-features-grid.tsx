"use client";

import { cn } from "@/lib/utils";
import {
  Robot,
  ChartLineUp,
  Envelope,
  ShieldCheck,
  Users,
  Target,
} from "@phosphor-icons/react";
import { PixelCanvas } from "./pixel-canvas";

const features = [
  {
    title: "AI Chatbot",
    description:
      "Trained on your business DNA. Answers like you would—books appointments, captures leads, closes while you sleep.",
    icon: <Robot weight="thin" className="w-6 h-6" />,
  },
  {
    title: "AEO",
    description:
      "Answer Engine Optimization. Get found by ChatGPT, Perplexity, and the AI search engines replacing Google.",
    icon: <Target weight="thin" className="w-6 h-6" />,
  },
  {
    title: "Smart Analytics",
    description:
      "Know exactly what's working. Real-time insights on every click, conversion, and dollar earned.",
    icon: <ChartLineUp weight="thin" className="w-6 h-6" />,
  },
  {
    title: "Lead Scoring",
    description:
      "AI ranks every lead by buying intent. Focus on the closers—skip the tire kickers.",
    icon: <Users weight="thin" className="w-6 h-6" />,
  },
  {
    title: "Auto Responses",
    description:
      "Instant replies that sound human. Email, SMS, DMs—no lead waits more than 60 seconds.",
    icon: <Envelope weight="thin" className="w-6 h-6" />,
  },
  {
    title: "Data & Security",
    description:
      "Bank-level security. Your data encrypted, backed up, and locked down—no exceptions.",
    icon: <ShieldCheck weight="thin" className="w-6 h-6" />,
  },
];

export function AIFeaturesGrid() {
  return (
    <section className="w-full bg-neutral-950 py-20">
      {/* Header - Centered */}
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs uppercase tracking-widest text-neutral-400 mb-4">
          AI-Powered Features
        </span>
        <h2 className="text-3xl md:text-5xl font-display mb-4 text-white">
          AI Implementation: Results not Excuses
        </h2>
        <p className="text-neutral-400 text-sm md:text-base max-w-2xl mx-auto">
          Every business is unique. We build custom AI solutions that fit your processes—not the other way around.
        </p>
      </div>

      {/* Features Grid - 3 columns for 6 cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10 max-w-6xl mx-auto">
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
        (index === 0 || index === 3) && "lg:border-l border-neutral-800",
        index < 3 && "lg:border-b border-neutral-800"
      )}
    >
      {/* Pixel Canvas Effect */}
      <PixelCanvas
        colors={["#0ea5e9", "#7dd3fc", "#0ea5e9"]}
        gap={6}
        speed={40}
        noFocus
      />

      {/* Icon */}
      <div className="mb-4 relative z-10 px-10 text-neutral-400 group-hover/feature:text-[#0ea5e9] transition-colors duration-200">
        {icon}
      </div>

      {/* Title with animated bar */}
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-700 group-hover/feature:bg-[#0ea5e9] transition-all duration-200 origin-center" />
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
