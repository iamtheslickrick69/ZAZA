"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

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
      className={cn("ember-core group", className)}
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'center',
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow layer */}
      <div className="ember-glow" />

      {/* Hexagon cells */}
      <div className="ember-hex ember-hex-1"><div className="ember-inner" /></div>
      <div className="ember-hex ember-hex-2"><div className="ember-inner" /></div>
      <div className="ember-hex ember-hex-3"><div className="ember-inner" /></div>
      <div className="ember-hex ember-hex-4"><div className="ember-inner" /></div>
      <div className="ember-hex ember-hex-5"><div className="ember-inner" /></div>
      <div className="ember-hex ember-hex-6"><div className="ember-inner" /></div>
      <div className="ember-hex ember-hex-7"><div className="ember-inner" /></div>

      {/* Floating embers */}
      <div className="ember-particle ember-p1" />
      <div className="ember-particle ember-p2" />
      <div className="ember-particle ember-p3" />
    </div>
  );
};

export default HoneycombLoader;
