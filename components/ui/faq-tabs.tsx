"use client";

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Globe, DollarSign, Bot, HeadphonesIcon, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

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
const BRAND_RED = '#C00008';
const BRAND_BLUE = '#006AAA';

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
        "relative overflow-hidden bg-background px-4 py-20 text-foreground transition-colors duration-300",
        className
      )}
      {...props}
    >
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
    </section>
  );
};

const FAQHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="relative z-10 flex flex-col items-center justify-center">
    <motion.span
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-4 text-sm font-medium tracking-wider uppercase"
      style={{
        background: `linear-gradient(90deg, ${BRAND_BLUE}, ${BRAND_RED})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}
    >
      {subtitle}
    </motion.span>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="mb-12 text-4xl md:text-5xl font-bold text-center"
    >
      {title}
    </motion.h2>
    {/* Gradient glow */}
    <span
      className="absolute -top-[300px] left-[50%] z-0 h-[500px] w-[700px] -translate-x-[50%] rounded-full blur-3xl opacity-30"
      style={{ background: `radial-gradient(circle, ${BRAND_BLUE}40, ${BRAND_RED}20, transparent)` }}
    />
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
            "relative overflow-hidden whitespace-nowrap rounded-2xl border px-4 py-2.5 text-sm font-medium transition-all duration-300 flex items-center gap-2",
            isSelected
              ? "border-transparent text-white shadow-lg"
              : "border-border bg-card/50 text-muted-foreground hover:text-foreground hover:border-foreground/30"
          )}
          style={{
            boxShadow: isSelected ? `0 8px 30px ${BRAND_BLUE}40` : undefined
          }}
        >
          <Icon className="w-4 h-4" />
          <span className="relative z-10">{label}</span>
          {/* Question count badge */}
          <span className={cn(
            "ml-1 px-1.5 py-0.5 text-xs rounded-lg transition-colors",
            isSelected ? "bg-white/20" : "bg-muted text-muted-foreground"
          )}>
            {questionCount}
          </span>
          <AnimatePresence>
            {isSelected && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 z-0"
                style={{
                  background: `linear-gradient(135deg, ${BRAND_BLUE}, ${BRAND_RED})`
                }}
              />
            )}
          </AnimatePresence>
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
          ? "bg-card/50 border-border shadow-xl"
          : "bg-card/30 border-border hover:border-foreground/20 hover:shadow-lg"
      )}
      style={{
        boxShadow: isOpen ? `0 10px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)` : undefined
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-4 p-5 text-left"
      >
        <span
          className={cn(
            "text-base md:text-lg font-medium transition-colors",
            isOpen ? "text-foreground" : "text-foreground/80"
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
            "flex-shrink-0 p-1 rounded-full transition-colors",
            isOpen ? "bg-foreground/10" : "bg-muted"
          )}
        >
          <Plus
            className={cn(
              "h-5 w-5 transition-colors",
              isOpen ? "text-foreground" : "text-muted-foreground"
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
        <p className="px-5 pb-5 text-muted-foreground leading-relaxed">{answer}</p>
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
