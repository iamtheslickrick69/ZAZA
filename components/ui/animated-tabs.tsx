"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
  accentColor?: string;
  pixelColors?: string[];
}

interface AnimatedTabsProps {
  tabs?: Tab[];
  defaultTab?: string;
  className?: string;
}

const AnimatedTabs = ({
  tabs = [],
  defaultTab,
  className,
}: AnimatedTabsProps) => {
  const [activeTab, setActiveTab] = useState<string>(defaultTab || tabs[0]?.id);

  if (!tabs?.length) return null;

  return (
    <div className={cn("w-full max-w-md flex flex-col gap-y-3 items-center", className)}>
      {/* Compact centered tabs */}
      <div className="relative p-1 rounded-xl inline-flex">
        <div className="relative z-10 flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative px-4 py-2 text-sm font-medium rounded-lg text-white outline-none transition-colors whitespace-nowrap"
              )}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="active-tab-indicator"
                  className="absolute inset-0 !rounded-lg"
                  style={{
                    backgroundColor: tab.accentColor || "rgba(14, 165, 233, 0.8)",
                    boxShadow: `0 0 16px ${tab.accentColor || "rgba(14, 165, 233, 0.3)"}`,
                  }}
                  transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content - no border, centered */}
      <div className="relative p-5 text-white rounded-xl min-h-[140px] w-full flex items-center justify-center">
        <div className="relative z-10 w-full">
          {tabs.map(
            (tab) =>
              activeTab === tab.id && (
                <motion.div
                  key={tab.id}
                  initial={{
                    opacity: 0,
                    scale: 0.95,
                    y: 10,
                    filter: "blur(8px)",
                  }}
                  animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.95, y: -10, filter: "blur(8px)" }}
                  transition={{
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                >
                  {tab.content}
                </motion.div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export { AnimatedTabs };
export type { Tab, AnimatedTabsProps };
