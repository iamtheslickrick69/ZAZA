"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

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
  return (
    <div
      className={cn("relative group", className)}
      style={{
        width: size,
        height: size,
      }}
      onClick={onClick}
    >
      <Image
        src="/anvil.png"
        alt="Haestus"
        width={size}
        height={size}
        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
      />
    </div>
  );
};

export default HoneycombLoader;
