import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageComparisonSliderProps extends React.HTMLAttributes<HTMLDivElement> {
  leftImage: string;
  rightImage: string;
  altLeft?: string;
  altRight?: string;
  initialPosition?: number;
}

export const ImageComparisonSlider = React.forwardRef<
  HTMLDivElement,
  ImageComparisonSliderProps
>(
  (
    {
      className,
      leftImage,
      rightImage,
      altLeft = "Before",
      altRight = "After",
      initialPosition = 50,
      ...props
    },
    ref
  ) => {
    const [position, setPosition] = React.useState(initialPosition);
    const [isLocked, setIsLocked] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    // Calculate position from mouse/touch X coordinate
    const getPosition = (clientX: number) => {
      if (!containerRef.current) return position;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      return Math.max(0, Math.min(100, (x / rect.width) * 100));
    };

    // Handle click - toggle lock state
    const handleClick = (e: React.MouseEvent) => {
      if (isLocked) {
        // Unlock - keep position where it is
        setIsLocked(false);
      } else {
        // Lock at click position
        setPosition(getPosition(e.clientX));
        setIsLocked(true);
      }
    };

    // Handle mouse move - only when locked
    const handleMouseMove = (e: React.MouseEvent) => {
      if (isLocked) {
        setPosition(getPosition(e.clientX));
      }
    };

    // Handle touch move - only when locked
    const handleTouchMove = (e: React.TouchEvent) => {
      if (isLocked && e.touches[0]) {
        setPosition(getPosition(e.touches[0].clientX));
      }
    };

    return (
      <div
        ref={containerRef}
        className={cn(
          "relative w-full h-full overflow-hidden select-none rounded-2xl",
          isLocked ? "cursor-ew-resize" : "cursor-pointer",
          className
        )}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        {...props}
      >
        {/* Right Image (bottom layer) */}
        <img
          src={rightImage}
          alt={altRight}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          draggable={false}
        />

        {/* Left Image (top layer, clipped) */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <img
            src={leftImage}
            alt={altLeft}
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>

        {/* Divider Line */}
        <div
          className="absolute top-0 h-full w-0.5 bg-foreground pointer-events-none"
          style={{
            left: `${position}%`,
            boxShadow: isLocked ? '0 0 10px rgba(255,255,255,0.8)' : 'none'
          }}
        />

        {/* Handle */}
        <div
          className={cn(
            "absolute top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none",
            "w-10 h-10 rounded-full bg-foreground shadow-lg",
            "flex items-center justify-center",
            isLocked && "scale-110"
          )}
          style={{ left: `${position}%` }}
        >
          <ChevronLeft className="h-4 w-4 text-background" />
          <ChevronRight className="h-4 w-4 text-background" />
        </div>
      </div>
    );
  }
);

ImageComparisonSlider.displayName = "ImageComparisonSlider";
