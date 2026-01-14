"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface HoneycombLoaderProps {
  size?: number;
  className?: string;
  onClick?: () => void;
}

export const HoneycombLoader = ({
  size = 40,
  className,
  onClick
}: HoneycombLoaderProps) => {
  const scale = size / 40;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn("liquid-slant-logo group", className)}
      style={{
        transform: `scale(${scale}) rotate(15deg)`,
        transformOrigin: 'center',
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ambient glow */}
      <div className="liquid-glow" />

      {/* Hexagon cells - wave cascade */}
      <div className="liquid-hex liquid-hex-1"><div className="liquid-inner" /></div>
      <div className="liquid-hex liquid-hex-2"><div className="liquid-inner" /></div>
      <div className="liquid-hex liquid-hex-3"><div className="liquid-inner" /></div>
      <div className="liquid-hex liquid-hex-4"><div className="liquid-inner" /></div>
      <div className="liquid-hex liquid-hex-5"><div className="liquid-inner" /></div>
      <div className="liquid-hex liquid-hex-6"><div className="liquid-inner" /></div>
      <div className="liquid-hex liquid-hex-7"><div className="liquid-inner" /></div>
    </div>
  );
};

export default HoneycombLoader;
