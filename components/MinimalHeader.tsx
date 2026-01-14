'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { HoneycombLoader } from '@/components/ui/honeycomb-loader';
import { Menu, X } from 'lucide-react';

export function MinimalHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-md border-b border-white/10'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left - Logo */}
        <a href="/" className="flex items-center gap-3 group">
          <HoneycombLoader size={32} className="opacity-90 group-hover:opacity-100 transition-opacity" />
          <Image
            src="/logo/white.png"
            alt="Haestus"
            width={140}
            height={28}
            className="h-7 w-auto"
            priority
          />
        </a>

        {/* Right - CTA */}
        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="hidden sm:block text-sm text-zinc-400 hover:text-white transition-colors"
          >
            hello@haestus.com
          </a>
          <button
            className="px-4 py-2 text-sm rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all text-white"
          >
            Start Project
          </button>
        </div>
      </div>
    </motion.header>
  );
}
