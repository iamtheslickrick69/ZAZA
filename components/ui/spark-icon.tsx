"use client";

import React from "react";

interface SparkIconProps {
  className?: string;
  size?: number;
  color?: string;
  animated?: boolean;
}

// Lambda (Λ) Icon - Clean, minimal Greek letter
export function SparkIcon({
  className = "",
  size = 24,
  color = "currentColor",
  animated = false
}: SparkIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${animated ? "animate-pulse" : ""} ${className}`}
    >
      {/* Lambda (Λ) shape - sharp, modern */}
      <path
        d="M16 4L6 28H11L16 16L21 28H26L16 4Z"
        fill={color}
      />
    </svg>
  );
}

// Animated version with glow effect
export function SparkIconAnimated({
  className = "",
  size = 24,
  color = "currentColor"
}: SparkIconProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Glow layer */}
      <div
        className="absolute inset-0 blur-sm opacity-50"
        style={{ filter: "blur(4px)" }}
      >
        <SparkIcon size={size} color={color} />
      </div>
      {/* Main icon */}
      <SparkIcon size={size} color={color} />
    </div>
  );
}

// Interactive version with hover effects for clickable instances
export function SparkIconInteractive({
  className = "",
  size = 24,
  color = "currentColor",
  onClick,
}: SparkIconProps & { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`relative group cursor-pointer transition-transform hover:scale-110 ${className}`}
      aria-label="Learn about our mission"
    >
      {/* Glow layer that intensifies on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-70 transition-opacity duration-300"
        style={{ filter: "blur(8px)" }}
      >
        <SparkIcon size={size} color={color} />
      </div>

      {/* Main Lambda with subtle shimmer */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10"
      >
        <defs>
          {/* Shimmer gradient that animates */}
          <linearGradient id="lambda-shimmer" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="1">
              <animate
                attributeName="stopOpacity"
                values="1;0.6;1"
                dur="3s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor={color} stopOpacity="0.7">
              <animate
                attributeName="stopOpacity"
                values="0.7;1;0.7"
                dur="3s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
        </defs>

        {/* Lambda (Λ) shape */}
        <path
          d="M16 4L6 28H11L16 16L21 28H26L16 4Z"
          fill="url(#lambda-shimmer)"
        />
      </svg>
    </button>
  );
}

export default SparkIcon;
