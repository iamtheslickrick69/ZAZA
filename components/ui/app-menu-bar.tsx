"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { getCalApi } from "@calcom/embed-react";
import {
  Sun,
  Moon,
  Menu,
  X,
  Github,
  Calendar,
  ArrowUpRight,
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
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize Cal.com embed
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        theme: "light",
        styles: { branding: { brandColor: "#000000" } },
        hideEventTypeDetails: false,
      });
    })();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const isDark = mounted && resolvedTheme === "dark";

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Process", href: "#process" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Blog", href: "#blog" },
  ];

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-4 pt-4"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Compact Box Nav with Logo */}
      <div className="max-w-3xl mx-auto px-4">
        <motion.nav
          className="relative flex items-center justify-between border rounded-2xl transition-all duration-500 overflow-visible px-5 py-3"
          style={{
            background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(20, 20, 20, 0.95) 100%)',
            borderColor: 'rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(48px)',
            boxShadow: '0 8px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
          }}
          initial={{ scale: 0.95, opacity: 0, y: -20 }}
          animate={{
            scale: scrolled ? 0.95 : 1,
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.3,
            ease: [0.19, 1, 0.22, 1],
          }}
        >
          {/* Left Side - Icon + Nav Links */}
          <div className="relative z-10 flex items-center gap-3">
            {/* Home Icon */}
            <motion.a
              href="/"
              className="flex items-center justify-center p-1.5 rounded-xl hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Home"
            >
              <svg width="36" height="36" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M128 96 L384 96 L464 256 L384 416 L128 416 L48 256 Z"
                  fill="white"
                />
              </svg>
            </motion.a>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="relative px-4 py-2 font-medium text-white/70 hover:text-white transition-all duration-300 group rounded-full text-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -1 }}
              >
                <span className="relative z-10">{item.label}</span>

                {/* Background glow on hover */}
                <motion.div
                  className="absolute inset-0 bg-white/5 rounded-full opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.2 }}
                />

                {/* Animated underline - slides from center */}
                <motion.div
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-white/0 via-white to-white/0 rounded-full"
                  initial={{ width: '0%' }}
                  whileHover={{ width: '70%' }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </motion.a>
            ))}
            </div>
          </div>

          {/* Actions - RIGHT */}
          <div className="relative z-10 flex items-center gap-1">
            {/* Social Links */}
            <motion.a
              href="https://github.com/haestus"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all"
              aria-label="GitHub"
              whileHover={{ scale: 1.1, y: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="https://x.com/haestus"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all"
              aria-label="X (Twitter)"
              whileHover={{ scale: 1.1, y: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              <XIcon className="w-4 h-4" />
            </motion.a>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-4 h-4" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-4 h-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Theme Toggle */}
            {mounted && (
              <motion.button
                onClick={toggleTheme}
                className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all"
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                whileHover={{ scale: 1.1, y: -1 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isDark ? (
                    <motion.div
                      key="moon"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="sun"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun className="w-4 h-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            )}

            {/* CTA Button - "Book a call" */}
            <motion.button
              className="hidden sm:flex items-center gap-2 font-medium rounded-2xl whitespace-nowrap px-5 py-2.5 text-sm cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
                color: '#000',
                boxShadow: '0 2px 12px rgba(255, 255, 255, 0.2)',
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 4px 20px rgba(255, 255, 255, 0.35)',
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => alert('Connect your Cal.com account to enable booking!')}
            >
              <Calendar className="w-4 h-4" />
              <span>Book a call</span>
              <ArrowUpRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-2 rounded-2xl border p-6 backdrop-blur-md"
              style={{
                background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(20, 20, 20, 0.95) 100%)',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
              }}
            >
              {/* Mobile Logo */}
              <div className="mb-6 flex justify-center">
                <Image
                  src="/haestus1.png"
                  alt="HAESTUS"
                  width={180}
                  height={26}
                  className="brightness-0 invert"
                  priority
                />
              </div>

              <nav className="flex flex-col gap-1">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    className="px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
                <motion.button
                  className="mt-4 w-full px-6 py-4 text-base font-semibold rounded-2xl transition-all relative overflow-hidden flex items-center justify-center gap-2.5 whitespace-nowrap cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(245, 245, 245, 0.98) 100%)',
                    color: '#000',
                    boxShadow: '0 8px 24px rgba(255, 255, 255, 0.3), 0 4px 12px rgba(0, 0, 0, 0.1)',
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.2 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => alert('Connect your Cal.com account to enable booking!')}
                >
                  <Calendar className="w-5 h-5 relative z-10 flex-shrink-0" />
                  <span className="relative z-10">Book a call</span>
                  <ArrowUpRight className="w-5 h-5 relative z-10 flex-shrink-0" />
                </motion.button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </motion.header>
  );
}
