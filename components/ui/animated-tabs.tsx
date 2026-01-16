"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface AnimatedTabsProps {
  tabs?: Tab[];
  defaultTab?: string;
  className?: string;
}

const defaultTabs: Tab[] = [
  {
    id: "smart-sites",
    label: "Smart Sites",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-full">
        <img
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
          alt="Smart Sites"
          className="rounded-lg w-full h-60 object-cover mt-0 !m-0 shadow-[0_0_20px_rgba(0,0,0,0.2)] border-none"
        />
        <div className="flex flex-col gap-y-2">
          <h2 className="text-2xl font-bold mb-0 text-white mt-0 !m-0">
            AI-Powered Websites
          </h2>
          <p className="text-sm text-gray-200 mt-0">
            Your website becomes a 24/7 digital employee. Trained on your business,
            it engages visitors, answers questions, and drives conversions while you sleep.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "ai-chat",
    label: "AI Chat",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-full">
        <img
          src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80"
          alt="AI Chat"
          className="rounded-lg w-full h-60 object-cover mt-0 !m-0 shadow-[0_0_20px_rgba(0,0,0,0.2)] border-none"
        />
        <div className="flex flex-col gap-y-2">
          <h2 className="text-2xl font-bold mb-0 text-white mt-0 !m-0">
            Intelligent Conversations
          </h2>
          <p className="text-sm text-gray-200 mt-0">
            Custom AI assistants that know your products, services, and brand voice.
            Handle support, qualify leads, and book appointments automatically.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "integrations",
    label: "Integrations",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-full">
        <img
          src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80"
          alt="Integrations"
          className="rounded-lg w-full h-60 object-cover mt-0 !m-0 shadow-[0_0_20px_rgba(0,0,0,0.2)] border-none"
        />
        <div className="flex flex-col gap-y-2">
          <h2 className="text-2xl font-bold mb-0 text-white mt-0 !m-0">
            Seamless Connections
          </h2>
          <p className="text-sm text-gray-200 mt-0">
            Connect to your existing tools—CRMs, payment processors, booking systems.
            If it has an API, we can integrate it into your Smart Site.
          </p>
        </div>
      </div>
    ),
  },
];

const AnimatedTabs = ({
  tabs = defaultTabs,
  defaultTab,
  className,
}: AnimatedTabsProps) => {
  const [activeTab, setActiveTab] = useState<string>(defaultTab || tabs[0]?.id);

  if (!tabs?.length) return null;

  return (
    <div className={cn("w-full max-w-2xl flex flex-col gap-y-2", className)}>
      <div className="flex gap-2 flex-wrap bg-[#11111198] bg-opacity-50 backdrop-blur-sm p-1.5 rounded-xl justify-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "relative px-4 py-2 text-sm font-medium rounded-lg text-white outline-none transition-colors"
            )}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 bg-[#00a8cc]/30 shadow-[0_0_20px_rgba(0,168,204,0.3)] backdrop-blur-sm !rounded-lg border border-[#00a8cc]/50"
                transition={{ type: "spring", duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="p-5 bg-[#11111198] shadow-[0_0_20px_rgba(0,0,0,0.2)] text-white bg-opacity-50 backdrop-blur-sm rounded-xl border border-white/10 min-h-60 h-full">
        {tabs.map(
          (tab) =>
            activeTab === tab.id && (
              <motion.div
                key={tab.id}
                initial={{
                  opacity: 0,
                  scale: 0.95,
                  x: -10,
                  filter: "blur(10px)",
                }}
                animate={{ opacity: 1, scale: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.95, x: -10, filter: "blur(10px)" }}
                transition={{
                  duration: 0.5,
                  ease: "circInOut",
                  type: "spring",
                }}
              >
                {tab.content}
              </motion.div>
            )
        )}
      </div>
    </div>
  );
};

export { AnimatedTabs };
