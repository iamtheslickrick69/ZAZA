"use client";

import { ExpandingCards, CardItem } from "@/components/ui/expanding-cards";
import { Globe, Smartphone, Bot, ShoppingCart, Briefcase, Zap } from "lucide-react";
import { motion } from "framer-motion";

const portfolioItems: CardItem[] = [
  {
    id: "smart-site-1",
    title: "BeeHive Rental",
    description: "Equipment rental company transformed with AI-powered inventory system and instant quote generation.",
    imgSrc: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200",
    icon: <Briefcase size={24} />,
    linkHref: "#",
  },
  {
    id: "ecommerce",
    title: "E-Commerce Platform",
    description: "Full-stack online store with AI product recommendations and automated inventory management.",
    imgSrc: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200",
    icon: <ShoppingCart size={24} />,
    linkHref: "#",
  },
  {
    id: "ai-dashboard",
    title: "AI Analytics Dashboard",
    description: "Real-time business intelligence platform with predictive analytics and custom AI insights.",
    imgSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200",
    icon: <Bot size={24} />,
    linkHref: "#",
  },
  {
    id: "mobile-app",
    title: "Mobile Application",
    description: "Cross-platform mobile app with offline-first architecture and seamless cloud sync.",
    imgSrc: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200",
    icon: <Smartphone size={24} />,
    linkHref: "#",
  },
  {
    id: "saas-platform",
    title: "SaaS Platform",
    description: "Subscription-based software with multi-tenant architecture and automated billing.",
    imgSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200",
    icon: <Zap size={24} />,
    linkHref: "#",
  },
  {
    id: "corporate-site",
    title: "Corporate Website",
    description: "Enterprise-grade website with CMS, multilingual support, and advanced SEO optimization.",
    imgSrc: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200",
    icon: <Globe size={24} />,
    linkHref: "#",
  },
];

export function PortfolioShowcase() {
  return (
    <section className="w-full bg-[#0a0a0a] py-20 px-4">
      <div className="flex w-full flex-col items-center justify-center space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span
            className="text-sm font-medium tracking-wider uppercase mb-4 block"
            style={{
              background: 'linear-gradient(90deg, #006AAA, #C00008)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Our Work
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            Projects That Deliver Results
          </h2>
          <p className="max-w-2xl text-lg text-neutral-400">
            Explore our portfolio of Smart Sites and AI-powered solutions. Hover or click to see what we&apos;ve built.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ExpandingCards items={portfolioItems} defaultActiveIndex={0} />
        </motion.div>
      </div>
    </section>
  );
}

export default PortfolioShowcase;
