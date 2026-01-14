"use client";

import { useState } from "react";

import { motion } from "framer-motion";
import {
  Home,
  Briefcase,
  Info,
  Wrench,
  Mail,
  Calendar,
  ArrowRight,
} from "lucide-react";

import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", icon: Home, href: "/" },
  { label: "Portfolio", icon: Briefcase, href: "#projects" },
  { label: "About", icon: Info, href: "#about" },
  { label: "Services", icon: Wrench, href: "#showcase" },
  { label: "Contact", icon: Mail, href: "#contact" },
];

const MOBILE_LABEL_WIDTH = 72;

type BottomNavBarProps = {
  className?: string;
  defaultIndex?: number;
  stickyTop?: boolean;
};

export function BottomNavBar({
  className,
  defaultIndex = 0,
  stickyTop = true,
}: BottomNavBarProps) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  const handleClick = (idx: number, href: string) => {
    setActiveIndex(idx);

    // Smooth scroll to section
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      window.location.href = href;
    }
  };

  return (
    <motion.nav
      initial={{ scale: 0.9, opacity: 0, y: -20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      role="navigation"
      aria-label="Top Navigation"
      className={cn(
        "bg-card/95 dark:bg-card/95 backdrop-blur-xl border border-border dark:border-sidebar-border rounded-full flex items-center p-2 shadow-2xl space-x-1 min-w-[320px] max-w-[95vw] h-[52px]",
        stickyTop && "fixed inset-x-0 top-4 mx-auto z-50 w-fit",
        className,
      )}
    >
      {navItems.map((item, idx) => {
        const Icon = item.icon;
        const isActive = activeIndex === idx;

        return (
          <motion.button
            key={item.label}
            whileTap={{ scale: 0.97 }}
            className={cn(
              "flex items-center gap-0 px-3 py-2 rounded-full transition-colors duration-200 relative h-10 min-w-[44px] min-h-[40px] max-h-[44px]",
              isActive
                ? "bg-primary/10 dark:bg-primary/15 text-primary dark:text-primary gap-2"
                : "bg-transparent text-muted-foreground dark:text-muted-foreground hover:bg-muted dark:hover:bg-muted",
              "focus:outline-none focus-visible:ring-0",
            )}
            onClick={() => handleClick(idx, item.href)}
            aria-label={item.label}
            type="button"
          >
            <Icon
              size={22}
              strokeWidth={2}
              aria-hidden
              className="transition-colors duration-200"
            />

            <motion.div
              initial={false}
              animate={{
                width: isActive ? `${MOBILE_LABEL_WIDTH}px` : "0px",
                opacity: isActive ? 1 : 0,
                marginLeft: isActive ? "8px" : "0px",
              }}
              transition={{
                width: { type: "spring", stiffness: 350, damping: 32 },
                opacity: { duration: 0.19 },
                marginLeft: { duration: 0.19 },
              }}
              className={cn("overflow-hidden flex items-center max-w-[72px]")}
            >
              <span
                className={cn(
                  "font-medium text-xs whitespace-nowrap select-none transition-opacity duration-200 overflow-hidden text-ellipsis text-[clamp(0.625rem,0.5263rem+0.5263vw,1rem)] leading-[1.9]",
                  isActive ? "text-primary dark:text-primary" : "opacity-0",
                )}
                title={item.label}
              >
                {item.label}
              </span>
            </motion.div>
          </motion.button>
        );
      })}

      {/* Book a Call Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => {
          // Scroll to booking section
          const element = document.querySelector('#book');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 h-10",
          "bg-foreground dark:bg-foreground text-background dark:text-background",
          "border border-foreground/20",
          "hover:bg-foreground/90 dark:hover:bg-foreground/90",
          "ml-2 font-medium text-sm whitespace-nowrap"
        )}
        aria-label="Book a call"
        type="button"
      >
        <Calendar size={18} strokeWidth={2} />
        <span>Book a call</span>
        <ArrowRight size={18} strokeWidth={2} />
      </motion.button>
    </motion.nav>
  );
}

export default BottomNavBar;
