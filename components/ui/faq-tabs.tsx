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
      className="mb-4 text-sm font-medium tracking-wider uppercase text-gray-400"
    >
      {subtitle}
    </motion.span>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="mb-12 text-4xl md:text-5xl font-bold text-center text-white"
    >
      {title}
    </motion.h2>
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

// Pre-configured FAQ for Haestus
export const HaestusFAQ = () => {
  const categories: Record<string, FAQCategory> = {
    "smart-sites": { label: "Smart Sites", icon: Globe },
    "pricing": { label: "Pricing & Process", icon: DollarSign },
    "ai": { label: "AI & Integrations", icon: Bot },
    "support": { label: "Support & Updates", icon: HeadphonesIcon },
  };

  const faqData: Record<string, FAQItem[]> = {
    "smart-sites": [
      {
        question: "What exactly is a Smart Site?",
        answer: "A Smart Site is an AI-powered website that acts as your 24/7 digital employee. Unlike static websites that just sit there, Smart Sites are trained on YOUR business—they learn, adapt, and work around the clock to engage visitors, answer questions, and drive conversions."
      },
      {
        question: "How is this different from a regular website?",
        answer: "Traditional websites are like digital brochures—static and lifeless. Smart Sites use AGI (Artificial General Intelligence) trained specifically on your business. They can hold conversations, recommend products, write personalized content, and get smarter every single day."
      },
      {
        question: "How fast can I get my Smart Site launched?",
        answer: "Most Smart Sites launch within days, not months. We've streamlined the entire process so you're not waiting around. While traditional agencies take 3-6 months, we get you live and generating results in a fraction of the time."
      },
      {
        question: "Do I need technical skills to manage it?",
        answer: "Absolutely not. We handle everything—updates, maintenance, new features. You focus on running your business, we focus on making your website work harder for you. No tickets, no waiting, no developer hostage situations."
      },
      {
        question: "Will my Smart Site work on mobile devices?",
        answer: "100%. Every Smart Site is built mobile-first with responsive design that looks stunning on any device. Whether your visitors are on desktop, tablet, or phone, the experience is seamless."
      }
    ],
    "pricing": [
      {
        question: "How much does a Smart Site cost?",
        answer: "Pricing depends on your specific needs and the complexity of AI features required. We offer flexible packages starting from basic Smart Sites to full enterprise solutions. Book a call and we'll give you a transparent quote with no hidden fees."
      },
      {
        question: "Are there ongoing monthly fees?",
        answer: "Yes, Smart Sites include a monthly subscription that covers hosting, AI operations, continuous updates, and support. Think of it as having a full-time digital employee for a fraction of the cost of hiring someone."
      },
      {
        question: "What's included in the monthly fee?",
        answer: "Everything. Hosting, SSL, AI model costs, content updates, security patches, performance optimization, and priority support. We don't nickel-and-dime you for every little change."
      },
      {
        question: "Do you offer payment plans?",
        answer: "Yes, we offer flexible payment options to fit your budget. We can discuss monthly, quarterly, or annual billing during our consultation call."
      },
      {
        question: "What's your refund policy?",
        answer: "We're confident you'll love your Smart Site. If for any reason you're not satisfied within the first 30 days, we'll work with you to make it right or provide a refund. Your success is our success."
      }
    ],
    "ai": [
      {
        question: "What AI features are included?",
        answer: "Smart Sites can include AI-powered chat, automated content generation, SEO optimization, lead qualification, personalized recommendations, and custom AI features built specifically for your business needs."
      },
      {
        question: "Can you integrate with my existing tools?",
        answer: "Absolutely. We integrate with virtually any API—CRMs, payment processors, booking systems, inventory management, email platforms, and more. If it has an API, we can connect it."
      },
      {
        question: "How does the AI learn about my business?",
        answer: "We train the AI on your specific business data—your products, services, FAQs, brand voice, and customer interactions. It's not generic AI; it's YOUR AI, speaking in YOUR voice."
      },
      {
        question: "Is my business data secure?",
        answer: "100%. We use enterprise-grade security, encrypted connections, and never share your data with third parties. Your business information stays private and protected."
      },
      {
        question: "Can the AI handle customer support?",
        answer: "Yes! The AI can answer common questions, qualify leads, book appointments, and handle support inquiries 24/7. Complex issues can be seamlessly escalated to your team."
      }
    ],
    "support": [
      {
        question: "What kind of support do you provide?",
        answer: "Priority support via email and chat, typically responding within hours, not days. For urgent issues, we have expedited response times. We're partners in your success, not just vendors."
      },
      {
        question: "Who handles updates and maintenance?",
        answer: "We do—completely. Content updates, feature additions, security patches, performance optimization. You tell us what you need, we make it happen. No tickets, no waiting weeks."
      },
      {
        question: "What if I need a new feature added?",
        answer: "Just ask. We continuously evolve your Smart Site based on your needs. New AI features, integrations, pages—we build what you need to stay ahead of your competition."
      },
      {
        question: "Do you provide training?",
        answer: "Yes, we provide comprehensive onboarding and training so you understand how to get the most out of your Smart Site. Plus, we're always available for questions."
      },
      {
        question: "What happens if something breaks?",
        answer: "We monitor your site 24/7 and typically catch and fix issues before you even notice them. If something does go wrong, we're on it immediately—no finger-pointing, just solutions."
      }
    ]
  };

  return (
    <FAQ
      title="Frequently Asked Questions"
      subtitle="Everything you need to know"
      categories={categories}
      faqData={faqData}
    />
  );
};

export default FAQ;
