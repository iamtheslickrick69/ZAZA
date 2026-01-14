'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

interface DaybreakTextRevealProps {
  text?: string;
  className?: string;
}

export function DaybreakTextReveal({ text = "Haestus", className }: DaybreakTextRevealProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Trigger animation on mount
    const timer = setTimeout(() => setIsAnimating(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`flex items-center justify-center w-full max-w-4xl mx-auto overflow-hidden ${className || ''}`}
    >
      {/* Text Container - expands from 0 to full width */}
      <div
        className="overflow-hidden transition-all duration-[2000ms] ease-out"
        style={{
          width: isAnimating ? '70%' : '0%',
        }}
      >
        <span
          className="block text-[clamp(2.5rem,10vw,7rem)] font-black tracking-tighter uppercase whitespace-nowrap text-foreground"
          style={{ fontWeight: 900 }}
        >
          {text}
        </span>
      </div>

      {/* Scrim / Spacer */}
      <div className="w-[5%] flex-shrink-0" />

      {/* Logo - rotates in */}
      <div
        className="w-[20%] flex-shrink-0 transition-transform duration-[2000ms] ease-out flex items-center justify-center"
        style={{
          transform: isAnimating ? 'rotate(0deg)' : 'rotate(-360deg)',
        }}
      >
        <Image
          src="/logo/haestus.png"
          alt="Haestus Logo"
          width={120}
          height={120}
          className="w-full h-auto max-w-[100px] md:max-w-[120px]"
          priority
        />
      </div>
    </div>
  );
}

// Default export for demo page
export default function DaybreakTextRevealDemo() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-8">
      <DaybreakTextReveal text="Haestus" />
    </div>
  );
}
