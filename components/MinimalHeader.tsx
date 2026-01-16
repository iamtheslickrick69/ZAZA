'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { HoneycombLoader } from '@/components/ui/honeycomb-loader';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useTheme } from 'next-themes';

export function MinimalHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Services', href: '#services', hasDropdown: true },
    { label: 'Work', href: '#work', hasDropdown: true },
    { label: 'About', href: '#about', hasDropdown: false },
    { label: 'Blog', href: '#blog', hasDropdown: false },
    { label: 'Vault', href: '/vault', hasDropdown: false },
  ];

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-4 pt-4"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Floating Pill Container */}
      <div className="max-w-5xl mx-auto">
        <div className="bg-zinc-900/90 backdrop-blur-xl rounded-full border border-white/10 px-6 py-3 flex items-center justify-between">

          {/* Left - Logo */}
          <a href="/" className="flex items-center gap-2 group flex-shrink-0">
            <HoneycombLoader size={28} className="opacity-90 group-hover:opacity-100 transition-opacity" />
            <Image
              src="/logo/haestus.png"
              alt="Haestus"
              width={100}
              height={24}
              className="h-5 w-auto"
              priority
            />
          </a>

          {/* Center - Navigation (Desktop) */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-1 px-4 py-2 text-sm text-zinc-300 hover:text-white transition-colors rounded-full hover:bg-white/5"
              >
                {item.label}
                {item.hasDropdown && <ChevronDown className="w-3.5 h-3.5 opacity-60" />}
              </a>
            ))}
          </nav>

          {/* Right - CTA */}
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-zinc-300 hover:text-white transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* CTA Button */}
            <button className="hidden sm:block bg-foreground text-background px-5 py-2 text-sm font-semibold rounded-full hover:bg-foreground/90 transition-colors uppercase tracking-wide">
              Contact
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mt-2 bg-zinc-900/95 backdrop-blur-xl rounded-2xl border border-white/10 p-4"
          >
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center justify-between px-4 py-3 text-sm text-zinc-300 hover:text-white transition-colors rounded-xl hover:bg-white/5"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                  {item.hasDropdown && <ChevronDown className="w-4 h-4 opacity-60" />}
                </a>
              ))}
              <button className="mt-2 w-full bg-foreground text-background px-5 py-3 text-sm font-semibold rounded-xl hover:bg-foreground/90 transition-colors uppercase tracking-wide">
                Contact
              </button>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
