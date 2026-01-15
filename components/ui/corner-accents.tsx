"use client";

import { motion } from "framer-motion";

interface CornerAccentsProps {
  color?: string;
  opacity?: number;
}

export function CornerAccents({
  color = "#ffffff",
  opacity = 0.6
}: CornerAccentsProps) {
  return (
    <>
      {/* Top Left Corner */}
      <div className="absolute top-8 left-8 w-32 h-32 pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 120 120"
          fill="none"
        >
          {/* Static line (faint) */}
          <path
            d="M 0 80 L 0 12 Q 0 0 12 0 L 80 0"
            stroke={color}
            strokeWidth="1"
            strokeOpacity={opacity * 0.3}
            fill="none"
          />
          {/* Animated glow */}
          <g mask="url(#corner-mask-tl)">
            <circle
              className="corner-light corner-light-tl"
              cx="0"
              cy="0"
              r="16"
              fill="url(#corner-glow-tl)"
            />
          </g>
          <defs>
            <mask id="corner-mask-tl">
              <path
                d="M 0 80 L 0 12 Q 0 0 12 0 L 80 0"
                stroke="white"
                strokeWidth="2"
                fill="none"
              />
            </mask>
            <radialGradient id="corner-glow-tl" fx="0.5" fy="0.5">
              <stop offset="0%" stopColor={color} stopOpacity={opacity} />
              <stop offset="40%" stopColor={color} stopOpacity={opacity * 0.5} />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Top Right Corner */}
      <div className="absolute top-8 right-8 w-32 h-32 pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 120 120"
          fill="none"
        >
          <path
            d="M 40 0 L 108 0 Q 120 0 120 12 L 120 80"
            stroke={color}
            strokeWidth="1"
            strokeOpacity={opacity * 0.3}
            fill="none"
          />
          <g mask="url(#corner-mask-tr)">
            <circle
              className="corner-light corner-light-tr"
              cx="0"
              cy="0"
              r="16"
              fill="url(#corner-glow-tr)"
            />
          </g>
          <defs>
            <mask id="corner-mask-tr">
              <path
                d="M 40 0 L 108 0 Q 120 0 120 12 L 120 80"
                stroke="white"
                strokeWidth="2"
                fill="none"
              />
            </mask>
            <radialGradient id="corner-glow-tr" fx="0.5" fy="0.5">
              <stop offset="0%" stopColor={color} stopOpacity={opacity} />
              <stop offset="40%" stopColor={color} stopOpacity={opacity * 0.5} />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Bottom Left Corner */}
      <div className="absolute bottom-8 left-8 w-32 h-32 pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 120 120"
          fill="none"
        >
          <path
            d="M 0 40 L 0 108 Q 0 120 12 120 L 80 120"
            stroke={color}
            strokeWidth="1"
            strokeOpacity={opacity * 0.3}
            fill="none"
          />
          <g mask="url(#corner-mask-bl)">
            <circle
              className="corner-light corner-light-bl"
              cx="0"
              cy="0"
              r="16"
              fill="url(#corner-glow-bl)"
            />
          </g>
          <defs>
            <mask id="corner-mask-bl">
              <path
                d="M 0 40 L 0 108 Q 0 120 12 120 L 80 120"
                stroke="white"
                strokeWidth="2"
                fill="none"
              />
            </mask>
            <radialGradient id="corner-glow-bl" fx="0.5" fy="0.5">
              <stop offset="0%" stopColor={color} stopOpacity={opacity} />
              <stop offset="40%" stopColor={color} stopOpacity={opacity * 0.5} />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Bottom Right Corner */}
      <div className="absolute bottom-8 right-8 w-32 h-32 pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 120 120"
          fill="none"
        >
          <path
            d="M 120 40 L 120 108 Q 120 120 108 120 L 40 120"
            stroke={color}
            strokeWidth="1"
            strokeOpacity={opacity * 0.3}
            fill="none"
          />
          <g mask="url(#corner-mask-br)">
            <circle
              className="corner-light corner-light-br"
              cx="0"
              cy="0"
              r="16"
              fill="url(#corner-glow-br)"
            />
          </g>
          <defs>
            <mask id="corner-mask-br">
              <path
                d="M 120 40 L 120 108 Q 120 120 108 120 L 40 120"
                stroke="white"
                strokeWidth="2"
                fill="none"
              />
            </mask>
            <radialGradient id="corner-glow-br" fx="0.5" fy="0.5">
              <stop offset="0%" stopColor={color} stopOpacity={opacity} />
              <stop offset="40%" stopColor={color} stopOpacity={opacity * 0.5} />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      <style jsx global>{`
        .corner-light {
          offset-anchor: 50% 50%;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
        }

        .corner-light-tl {
          offset-path: path("M 0 80 L 0 12 Q 0 0 12 0 L 80 0");
          animation: corner-trace 4s linear infinite;
        }

        .corner-light-tr {
          offset-path: path("M 40 0 L 108 0 Q 120 0 120 12 L 120 80");
          animation: corner-trace 4s linear infinite;
          animation-delay: 1s;
        }

        .corner-light-bl {
          offset-path: path("M 0 40 L 0 108 Q 0 120 12 120 L 80 120");
          animation: corner-trace 4s linear infinite;
          animation-delay: 2s;
        }

        .corner-light-br {
          offset-path: path("M 120 40 L 120 108 Q 120 120 108 120 L 40 120");
          animation: corner-trace 4s linear infinite;
          animation-delay: 3s;
        }

        @keyframes corner-trace {
          0% {
            offset-distance: 0%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            offset-distance: 100%;
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}

export default CornerAccents;
