"use client";

import React from "react";
import { Timeline } from "@/components/ui/timeline";
import {
  MessageSquare,
  Palette,
  Code2,
  Brain,
  Rocket,
  Sparkles,
  CheckCircle,
  Zap
} from "lucide-react";

const TimelineCard = ({
  children,
  accent = "blue"
}: {
  children: React.ReactNode;
  accent?: "blue" | "orange"
}) => {
  const colors = accent === "blue"
    ? "border-[#00a8cc]/30 bg-[#004a58]/10"
    : "border-[#FF8C42]/30 bg-[#FF8C42]/10";

  return (
    <div className={`p-4 rounded-xl border ${colors} backdrop-blur-sm`}>
      {children}
    </div>
  );
};

const CheckItem = ({ children }: { children: React.ReactNode }) => (
  <div className="flex gap-2 items-center text-neutral-300 text-sm">
    <CheckCircle className="w-4 h-4 text-[#00a8cc] flex-shrink-0" />
    {children}
  </div>
);

export function LaunchTimeline() {
  const data = [
    {
      title: "Day 1",
      content: (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-[#00a8cc]/20">
              <MessageSquare className="w-5 h-5 text-[#00a8cc]" />
            </div>
            <h4 className="text-xl font-bold text-white">Discovery Call</h4>
          </div>
          <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
            We dive deep into your business. Your customers, your competitors, your goals.
            This isn't a sales call - it's a strategy session.
          </p>
          <TimelineCard>
            <div className="space-y-2">
              <CheckItem>60-minute deep-dive session</CheckItem>
              <CheckItem>Competitor analysis review</CheckItem>
              <CheckItem>AI feature recommendations</CheckItem>
              <CheckItem>Custom project roadmap</CheckItem>
            </div>
          </TimelineCard>
        </div>
      ),
    },
    {
      title: "Day 2-3",
      content: (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-[#00a8cc]/20">
              <Palette className="w-5 h-5 text-[#00a8cc]" />
            </div>
            <h4 className="text-xl font-bold text-white">Design & Architecture</h4>
          </div>
          <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
            Your brand, elevated. We craft a visual system that's uniquely yours -
            no templates, no cookie-cutter layouts.
          </p>
          <TimelineCard>
            <div className="space-y-2">
              <CheckItem>Custom UI/UX design</CheckItem>
              <CheckItem>Mobile-first responsive layouts</CheckItem>
              <CheckItem>Brand identity integration</CheckItem>
              <CheckItem>AI interaction flows mapped</CheckItem>
            </div>
          </TimelineCard>
        </div>
      ),
    },
    {
      title: "Day 4-5",
      content: (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-[#00a8cc]/20">
              <Code2 className="w-5 h-5 text-[#00a8cc]" />
            </div>
            <h4 className="text-xl font-bold text-white">Development Sprint</h4>
          </div>
          <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
            Our team builds at startup speed. Modern tech stack, clean code,
            blazing performance. No bloat, no shortcuts.
          </p>
          <TimelineCard>
            <div className="space-y-2">
              <CheckItem>Next.js / React development</CheckItem>
              <CheckItem>Database & API integration</CheckItem>
              <CheckItem>Performance optimization</CheckItem>
              <CheckItem>Security hardening</CheckItem>
            </div>
          </TimelineCard>
        </div>
      ),
    },
    {
      title: "Day 6",
      content: (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-[#FF8C42]/20">
              <Brain className="w-5 h-5 text-[#FF8C42]" />
            </div>
            <h4 className="text-xl font-bold text-white">AI Training</h4>
          </div>
          <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
            This is where the magic happens. We train your AI on YOUR business -
            your products, your FAQs, your voice.
          </p>
          <TimelineCard accent="orange">
            <div className="space-y-2">
              <CheckItem>Custom AI model configuration</CheckItem>
              <CheckItem>Knowledge base ingestion</CheckItem>
              <CheckItem>Conversation flow testing</CheckItem>
              <CheckItem>Edge case handling</CheckItem>
            </div>
          </TimelineCard>
        </div>
      ),
    },
    {
      title: "Day 7",
      content: (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-[#00a8cc]/20">
              <Rocket className="w-5 h-5 text-[#00a8cc]" />
            </div>
            <h4 className="text-xl font-bold text-white">Launch Day</h4>
          </div>
          <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
            You're live. Your AI-powered site is converting visitors while you focus
            on running your business. We handle the rest.
          </p>
          <TimelineCard>
            <div className="space-y-2">
              <CheckItem>Production deployment</CheckItem>
              <CheckItem>DNS & SSL configuration</CheckItem>
              <CheckItem>Analytics setup</CheckItem>
              <CheckItem>Team training session</CheckItem>
            </div>
          </TimelineCard>

          {/* Launch CTA */}
          <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-[#004a58] to-[#00556a] border border-[#00a8cc]/30">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-[#00a8cc]" />
              <div>
                <p className="text-white font-semibold">Ready to launch?</p>
                <p className="text-[#00a8cc] text-sm">Your competitors are still waiting on their developer.</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Ongoing",
      content: (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-[#00a8cc]/20">
              <Sparkles className="w-5 h-5 text-[#00a8cc]" />
            </div>
            <h4 className="text-xl font-bold text-white">Continuous Evolution</h4>
          </div>
          <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
            Your site isn't static. It learns, adapts, and improves. We monitor,
            optimize, and add features as your business grows.
          </p>
          <TimelineCard>
            <div className="space-y-2">
              <CheckItem>24/7 AI monitoring</CheckItem>
              <CheckItem>Monthly performance reports</CheckItem>
              <CheckItem>Continuous AI improvements</CheckItem>
              <CheckItem>Priority support access</CheckItem>
            </div>
          </TimelineCard>
        </div>
      ),
    },
  ];

  return (
    <section className="relative w-full bg-neutral-950">
      {/* Header */}
      <div className="max-w-7xl mx-auto pt-20 px-4 md:px-8 lg:px-10">
        <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs uppercase tracking-widest text-neutral-400 mb-4">
          Our Process
        </span>
        <h2 className="text-3xl md:text-5xl font-display mb-4 text-white max-w-4xl">
          Live in 7 Days. Not 7 Months.
        </h2>
        <p className="text-neutral-400 text-sm md:text-base max-w-xl">
          While others are still scheduling meetings, your AI-powered site is already
          converting visitors into customers.
        </p>
      </div>

      <Timeline data={data} />
    </section>
  );
}
