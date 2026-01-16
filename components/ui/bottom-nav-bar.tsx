"use client";

import { useState, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Briefcase,
  Info,
  Wrench,
  Mail,
  Calendar,
  ArrowRight,
  Lock,
} from "lucide-react";
import { getCalApi } from "@calcom/embed-react";

import { cn } from "@/lib/utils";
import { VaultModal } from "./vault-modal";

const navItems = [
  { label: "Home", icon: Home, href: "/" },
  { label: "Portfolio", icon: Briefcase, href: "#projects" },
  { label: "About", icon: Info, href: "#about" },
  { label: "Services", icon: Wrench, href: "#showcase" },
  { label: "Contact", icon: Mail, href: "#contact" },
  { label: "Vault", icon: Lock, href: "/vault" },
];

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
  const [vaultModalOpen, setVaultModalOpen] = useState(false);

  // Initialize Cal.com
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        styles: { branding: { brandColor: "#00a8cc" } },
        hideEventTypeDetails: false,
        layout: "month_view"
      });
    })();
  }, []);

  const handleConnect = async () => {
    const cal = await getCalApi();
    cal("modal", {
      calLink: "rocky-bunker-n2hayf/15min",
      config: {
        layout: "month_view",
        theme: "dark"
      }
    });
  };

  const handleClick = (idx: number, href: string, label: string) => {
    // If clicking Vault, open modal instead of navigating
    if (label === "Vault") {
      setVaultModalOpen(true);
      return;
    }

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
    <>
    <motion.nav
      initial={{ scale: 0.9, opacity: 0, y: -20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      role="navigation"
      aria-label="Top Navigation"
      className={cn(
        "bg-card/95 dark:bg-card/95 backdrop-blur-xl border border-border dark:border-sidebar-border rounded-2xl flex items-center p-2 shadow-2xl space-x-1 min-w-[320px] max-w-[95vw] h-[52px]",
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
              "flex items-center gap-2 px-3 py-2 rounded-full transition-colors duration-200 relative h-10 min-h-[40px] max-h-[44px]",
              isActive
                ? "bg-[#00a8cc]/10 dark:bg-[#00a8cc]/15 text-[#00a8cc]"
                : "bg-transparent text-muted-foreground dark:text-muted-foreground hover:bg-muted dark:hover:bg-muted",
              "focus:outline-none focus-visible:ring-0",
            )}
            onClick={() => handleClick(idx, item.href, item.label)}
            aria-label={item.label}
            type="button"
          >
            {/* Icon only shows when active */}
            <AnimatePresence mode="wait">
              {isActive && (
                <motion.span
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "auto", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <Icon
                    size={20}
                    strokeWidth={2}
                    aria-hidden
                    className="transition-colors duration-200 text-[#00a8cc]"
                  />
                </motion.span>
              )}
            </AnimatePresence>

            {/* Label always shows */}
            <span
              className={cn(
                "font-medium text-sm whitespace-nowrap select-none transition-colors duration-200",
                isActive ? "text-[#00a8cc]" : "text-muted-foreground",
              )}
            >
              {item.label}
            </span>
          </motion.button>
        );
      })}

      {/* Connect Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleConnect}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 h-10",
          "bg-foreground dark:bg-foreground text-background dark:text-background",
          "border border-foreground/20",
          "hover:bg-foreground/90 dark:hover:bg-foreground/90",
          "ml-2 font-medium text-sm whitespace-nowrap"
        )}
        aria-label="Connect"
        type="button"
      >
        <Calendar size={18} strokeWidth={2} />
        <span>Connect</span>
        <ArrowRight size={18} strokeWidth={2} />
      </motion.button>
    </motion.nav>

    {/* Vault Authentication Modal */}
    <VaultModal
      isOpen={vaultModalOpen}
      onClose={() => setVaultModalOpen(false)}
    />
    </>
  );
}

export default BottomNavBar;
