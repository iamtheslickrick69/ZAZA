"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface HaestusLogoProps {
  className?: string;
  width?: number;
  height?: number;
  scrolled?: boolean;
}

export function HaestusLogo({ className = "", width = 120, height = 40, scrolled = false }: HaestusLogoProps) {
  return (
    <div className={`relative flex items-center ${className}`}>
      <Image
        src="/haestus-logo.png"
        alt="HAESTUS"
        width={width}
        height={height}
        className="brightness-0 invert"
        priority
        style={{
          filter: 'brightness(0) invert(1)',
          display: 'block',
        }}
      />
    </div>
  );
}
