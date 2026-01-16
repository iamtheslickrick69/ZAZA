"use client";

import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Globe, DollarSign, Bot, HeadphonesIcon, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

/** Noise overlay component */
interface NoiseProps {
  patternRefreshInterval?: number;
  patternAlpha?: number;
}

const Noise: React.FC<NoiseProps> = ({
  patternRefreshInterval = 2,
  patternAlpha = 15,
}) => {
  const grainRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = grainRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let frame = 0;
    let animationId = 0;
    const canvasSize = 1024;

    const resize = () => {
      if (!canvas) return;
      canvas.width = canvasSize;
      canvas.height = canvasSize;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
    };

    const drawGrain = () => {
      const imageData = ctx.createImageData(canvasSize, canvasSize);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = patternAlpha;
      }
      ctx.putImageData(imageData, 0, 0);
    };

    const loop = () => {
      if (frame % patternRefreshInterval === 0) drawGrain();
      frame++;
      animationId = window.requestAnimationFrame(loop);
    };

    window.addEventListener("resize", resize);
    resize();
    loop();

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationId);
    };
  }, [patternRefreshInterval, patternAlpha]);

  return (
    <canvas
      ref={grainRef}
      className="pointer-events-none absolute inset-0 w-full h-full"
      style={{ imageRendering: "pixelated" }}
    />
  );
};

// Types
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  label: string;
  icon: LucideIcon;
}

interface FAQProps {
  title?: string;
  subtitle?: string;
  categories: Record<string, FAQCategory>;
  faqData: Record<string, FAQItem[]>;
  className?: string;
}

// Brand colors
const BRAND_RED = '#6b7280';
const BRAND_BLUE = '#6b7280';

// Main reusable FAQ component
export const FAQ = ({
  title = "FAQs",
  subtitle = "Everything you need to know",
  categories,
  faqData,
  className,
  ...props
}: FAQProps) => {
  const categoryKeys = Object.keys(categories);
  const [selectedCategory, setSelectedCategory] = useState(categoryKeys[0]);

  return (
    <section
      className={cn(
        "relative overflow-hidden bg-black px-4 py-20 text-foreground transition-colors duration-300",
        className
      )}
      {...props}
    >
      <div className="relative z-10">
        <FAQHeader title={title} subtitle={subtitle} />
        <FAQTabs
          categories={categories}
          selected={selectedCategory}
          setSelected={setSelectedCategory}
          faqData={faqData}
        />
        <FAQList
          faqData={faqData}
          selected={selectedCategory}
        />
      </div>
    </section>
  );
};

const FAQHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="relative z-10 flex flex-col items-center justify-center">
    <motion.span
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs uppercase tracking-widest text-neutral-400 mb-4"
    >
      {subtitle}
    </motion.span>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="text-3xl md:text-4xl font-display text-center text-white mb-3"
    >
      {title}
    </motion.h2>
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="text-neutral-400 text-sm md:text-base max-w-xl text-center mb-12"
    >
      Got questions? We've got answers. Find everything you need below.
    </motion.p>
  </div>
);

const FAQTabs = ({
  categories,
  selected,
  setSelected,
  faqData
}: {
  categories: Record<string, FAQCategory>;
  selected: string;
  setSelected: (key: string) => void;
  faqData: Record<string, FAQItem[]>;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
    className="relative z-10 flex flex-wrap items-center justify-center gap-3"
  >
    {Object.entries(categories).map(([key, { label, icon: Icon }]) => {
      const isSelected = selected === key;
      const questionCount = faqData[key]?.length || 0;

      return (
        <motion.button
          key={key}
          onClick={() => setSelected(key)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            "relative overflow-hidden whitespace-nowrap rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-300 flex items-center gap-2",
            isSelected
              ? "border-transparent bg-gray-600 text-white"
              : "border-gray-700 bg-transparent text-gray-400 hover:text-white hover:border-gray-500"
          )}
        >
          <Icon className="w-4 h-4 relative z-10" />
          <span className="relative z-10">{label}</span>
          {/* Question count badge */}
          <span className={cn(
            "ml-1 px-1.5 py-0.5 text-xs rounded-lg transition-colors relative z-10",
            isSelected ? "bg-gray-500 text-white" : "bg-gray-800 text-gray-400"
          )}>
            {questionCount}
          </span>
        </motion.button>
      );
    })}
  </motion.div>
);

const FAQList = ({ faqData, selected }: { faqData: Record<string, FAQItem[]>; selected: string }) => (
  <div className="mx-auto mt-12 max-w-3xl">
    <AnimatePresence mode="wait">
      {Object.entries(faqData).map(([category, questions]) => {
        if (selected === category) {
          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {questions.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <FAQItemCard {...faq} />
                </motion.div>
              ))}
            </motion.div>
          );
        }
        return null;
      })}
    </AnimatePresence>
  </div>
);

const FAQItemCard = ({ question, answer }: FAQItem) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      animate={isOpen ? "open" : "closed"}
      whileHover={{ scale: 1.01 }}
      className={cn(
        "rounded-2xl border transition-all duration-300 cursor-pointer",
        isOpen
          ? "bg-gray-900/80 border-gray-700 shadow-xl"
          : "bg-gray-900/50 border-gray-800 hover:border-gray-700"
      )}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-4 p-5 text-left"
      >
        <span
          className={cn(
            "text-base md:text-lg font-medium transition-colors",
            isOpen ? "text-white" : "text-gray-200"
          )}
        >
          {question}
        </span>
        <motion.span
          variants={{
            open: { rotate: 45, scale: 1.1 },
            closed: { rotate: 0, scale: 1 },
          }}
          transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
          className={cn(
            "flex-shrink-0 p-1.5 rounded-full transition-colors",
            isOpen ? "bg-gray-700" : "bg-gray-800"
          )}
        >
          <Plus
            className={cn(
              "h-5 w-5 transition-colors",
              isOpen ? "text-white" : "text-gray-400"
            )}
          />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
        className="overflow-hidden"
      >
        <p className="px-5 pb-5 text-gray-400 leading-relaxed">{answer}</p>
      </motion.div>
    </motion.div>
  );
};

// Pre-configured FAQ for Haestus - Now "Ask Slick" CTA
export const HaestusFAQ = () => {
  const handleOpenChat = () => {
    // Dispatch custom event to open the chat widget
    window.dispatchEvent(new CustomEvent('openChatWidget'));
  };

  return (
    <section className="relative overflow-hidden bg-black px-4 py-20 text-foreground">
      <div className="relative z-10 flex flex-col items-center justify-center max-w-3xl mx-auto">
        {/* Badge */}
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs uppercase tracking-widest text-neutral-400 mb-8"
        >
          Need Help?
        </motion.span>

        {/* Slick AI Icon with subtle glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="relative mb-8"
        >
          <div className="relative">
            <img
              src="/slickai.png"
              alt="Slick AI"
              className="w-24 h-24 object-contain"
            />
            {/* Subtle animated glow */}
            <motion.div
              className="absolute inset-0 rounded-full -z-10"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                background: 'radial-gradient(circle, rgba(14, 165, 233, 0.4) 0%, transparent 70%)',
              }}
            />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-display text-center text-white mb-4"
        >
          Ask Slick
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-neutral-400 text-base md:text-lg text-center mb-10 max-w-xl"
        >
          Get instant answers about Smart Sites, pricing, and more
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleOpenChat}
          className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-base transition-all overflow-hidden bg-sky-500 text-white shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50"
        >
          <Bot className="w-5 h-5" strokeWidth={2} />
          <span>Start Chatting</span>
          <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>
    </section>
  );
};

export default FAQ;
