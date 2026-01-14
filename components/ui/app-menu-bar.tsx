"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { HoneycombLoader } from "@/components/ui/honeycomb-loader";
import {
  Sun,
  Moon,
  Menu,
  X,
  Github,
} from "lucide-react";

// X (Twitter) icon component
const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function AppMenuBar() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const isDark = mounted && resolvedTheme === "dark";

  const navItems = [
    { label: "Services", href: "#services" },
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Blog", href: "#blog" },
  ];

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-4 pt-3"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Ultra-Minimal Floating Card - 2x Larger */}
      <div className="max-w-4xl mx-auto">
        <motion.nav
          className={`flex items-center justify-between px-6 py-4 rounded-xl transition-all duration-300 ${
            isDark
              ? "bg-zinc-900/80 border-zinc-800"
              : "bg-white/60 border-zinc-200/80"
          } backdrop-blur-md border`}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {/* Left - Logo */}
          <a href="/" className="flex items-center gap-3 group flex-shrink-0 pr-6 border-r border-zinc-200 dark:border-zinc-700">
            <HoneycombLoader size={32} className="opacity-90 group-hover:opacity-100 transition-opacity" />
            <Image
              src="/logo/haestus.png"
              alt="Haestus"
              width={120}
              height={30}
              className="h-6 w-auto"
              priority
            />
          </a>

          {/* Center - Navigation */}
          <div className="hidden md:flex items-center gap-2 px-6 border-r border-zinc-200 dark:border-zinc-700">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isDark
                    ? "text-zinc-400 hover:text-white hover:bg-zinc-800"
                    : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right - Actions */}
          <div className="flex items-center gap-2 pl-6">
            {/* Social Links */}
            <a
              href="https://github.com/haestus"
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden sm:flex p-2 rounded-lg transition-colors ${
                isDark ? "text-zinc-400 hover:text-white hover:bg-zinc-800" : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
              }`}
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://x.com/haestus"
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden sm:flex p-2 rounded-lg transition-colors ${
                isDark ? "text-zinc-400 hover:text-white hover:bg-zinc-800" : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
              }`}
              aria-label="X (Twitter)"
            >
              <XIcon className="w-5 h-5" />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                isDark ? "text-zinc-400 hover:text-white hover:bg-zinc-800" : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
              }`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors ${
                  isDark ? "text-zinc-400 hover:text-white hover:bg-zinc-800" : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
                }`}
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isDark ? (
                    <motion.div
                      key="moon"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Moon className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="sun"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Sun className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            )}

            {/* CTA Button */}
            <button
              className={`hidden sm:block px-5 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                isDark
                  ? "bg-white text-zinc-900 hover:bg-zinc-100"
                  : "bg-zinc-900 text-white hover:bg-zinc-800"
              }`}
            >
              Contact
            </button>
          </div>
        </motion.nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className={`md:hidden mt-2 rounded-lg border p-3 ${
                isDark ? "bg-zinc-900/95 border-zinc-800" : "bg-white/95 border-zinc-200"
              } backdrop-blur-md`}
            >
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`px-3 py-2 text-sm rounded-md transition-colors ${
                      isDark ? "text-zinc-300 hover:text-white hover:bg-zinc-800" : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <button className={`mt-2 w-full px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isDark
                    ? "bg-white text-zinc-900 hover:bg-zinc-100"
                    : "bg-zinc-900 text-white hover:bg-zinc-800"
                }`}>
                  Contact
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
