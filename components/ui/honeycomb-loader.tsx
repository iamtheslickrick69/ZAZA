"use client";

import { cn } from "@/lib/utils";

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
  // Scale factor based on default size of 40
  const scale = size / 40;

  return (
    <div
      className={cn("honeycomb", className)}
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'center',
      }}
      onClick={onClick}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default HoneycombLoader;
