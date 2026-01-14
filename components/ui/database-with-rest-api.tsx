"use client";

import React from "react";
import { motion } from "framer-motion";
import { Folder, HeartHandshakeIcon, SparklesIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DatabaseWithRestApiProps {
  className?: string;
  circleText?: string;
  badgeTexts?: {
    first: string;
    second: string;
    third: string;
    fourth: string;
    fifth?: string;
    sixth?: string;
    seventh?: string;
    eighth?: string;
  };
  buttonTexts?: {
    first: string;
    second: string;
  };
  title?: string;
  lightColor?: string;
}

const DatabaseWithRestApi = ({
  className,
  circleText,
  badgeTexts,
  buttonTexts,
  title,
  lightColor,
}: DatabaseWithRestApiProps) => {
  return (
    <div
      className={cn(
        "relative flex h-[420px] w-full max-w-[700px] flex-col items-center",
        className
      )}
    >
      {/* SVG Paths - 8 Endpoints */}
      <svg
        className="h-full sm:w-full text-muted"
        width="100%"
        height="100%"
        viewBox="0 0 280 120"
      >
        <g
          stroke="currentColor"
          fill="none"
          strokeWidth="0.4"
          strokeDasharray="100 100"
          pathLength="100"
        >
          {/* Row 1 - 4 endpoints */}
          <path d="M 22 10 v 15 q 0 5 5 5 h 108 q 5 0 5 5 v 10" />
          <path d="M 62 10 v 10 q 0 5 5 5 h 63 q 5 0 5 5 v 15" />
          <path d="M 102 10 v 10 q 0 5 5 5 h 28 q 5 0 5 5 v 15" />
          <path d="M 142 10 v 15 q 0 5 -2 5 h -0 q -5 0 -5 5 v 10" />
          {/* Row 2 - 4 more endpoints */}
          <path d="M 182 10 v 15 q 0 5 -5 5 h -32 q -5 0 -5 5 v 10" />
          <path d="M 218 10 v 10 q 0 5 -5 5 h -68 q -5 0 -5 5 v 15" />
          <path d="M 252 10 v 10 q 0 5 -5 5 h -102 q -5 0 -5 5 v 15" />
          <path d="M 275 10 v 15 q 0 5 -5 5 h -125 q -5 0 -5 5 v 10" />
          <animate
            attributeName="stroke-dashoffset"
            from="100"
            to="0"
            dur="1s"
            fill="freeze"
            calcMode="spline"
            keySplines="0.25,0.1,0.5,1"
            keyTimes="0; 1"
          />
        </g>
        {/* Blue Lights - 8 total */}
        <g mask="url(#db-mask-1)">
          <circle className="database db-light-1" cx="0" cy="0" r="12" fill="url(#db-blue-grad)" />
        </g>
        <g mask="url(#db-mask-2)">
          <circle className="database db-light-2" cx="0" cy="0" r="12" fill="url(#db-blue-grad)" />
        </g>
        <g mask="url(#db-mask-3)">
          <circle className="database db-light-3" cx="0" cy="0" r="12" fill="url(#db-blue-grad)" />
        </g>
        <g mask="url(#db-mask-4)">
          <circle className="database db-light-4" cx="0" cy="0" r="12" fill="url(#db-blue-grad)" />
        </g>
        <g mask="url(#db-mask-5)">
          <circle className="database db-light-5" cx="0" cy="0" r="12" fill="url(#db-red-grad)" />
        </g>
        <g mask="url(#db-mask-6)">
          <circle className="database db-light-6" cx="0" cy="0" r="12" fill="url(#db-red-grad)" />
        </g>
        <g mask="url(#db-mask-7)">
          <circle className="database db-light-7" cx="0" cy="0" r="12" fill="url(#db-red-grad)" />
        </g>
        <g mask="url(#db-mask-8)">
          <circle className="database db-light-8" cx="0" cy="0" r="12" fill="url(#db-red-grad)" />
        </g>
        {/* Buttons - 8 total */}
        <g stroke="currentColor" fill="none" strokeWidth="0.4">
          {/* Row 1 */}
          <g>
            <rect className="fill-card" x="5" y="3" width="34" height="10" rx="5"></rect>
            <DatabaseIcon x="9" y="5.5"></DatabaseIcon>
            <text className="fill-foreground" x="19" y="10" stroke="none" fontSize="5" fontWeight="500">
              {badgeTexts?.first || "GET"}
            </text>
          </g>
          <g>
            <rect className="fill-card" x="45" y="3" width="34" height="10" rx="5"></rect>
            <DatabaseIcon x="49" y="5.5"></DatabaseIcon>
            <text className="fill-foreground" x="59" y="10" stroke="none" fontSize="5" fontWeight="500">
              {badgeTexts?.second || "POST"}
            </text>
          </g>
          <g>
            <rect className="fill-card" x="85" y="3" width="34" height="10" rx="5"></rect>
            <DatabaseIcon x="89" y="5.5"></DatabaseIcon>
            <text className="fill-foreground" x="99" y="10" stroke="none" fontSize="5" fontWeight="500">
              {badgeTexts?.third || "PUT"}
            </text>
          </g>
          <g>
            <rect className="fill-card" x="125" y="3" width="34" height="10" rx="5"></rect>
            <DatabaseIcon x="129" y="5.5"></DatabaseIcon>
            <text className="fill-foreground" x="139" y="10" stroke="none" fontSize="5" fontWeight="500">
              {badgeTexts?.fourth || "DELETE"}
            </text>
          </g>
          {/* Row 2 */}
          <g>
            <rect className="fill-card" x="165" y="3" width="34" height="10" rx="5"></rect>
            <DatabaseIcon x="169" y="5.5"></DatabaseIcon>
            <text className="fill-foreground" x="179" y="10" stroke="none" fontSize="5" fontWeight="500">
              {badgeTexts?.fifth || "PATCH"}
            </text>
          </g>
          <g>
            <rect className="fill-card" x="205" y="3" width="30" height="10" rx="5"></rect>
            <DatabaseIcon x="209" y="5.5"></DatabaseIcon>
            <text className="fill-foreground" x="219" y="10" stroke="none" fontSize="5" fontWeight="500">
              {badgeTexts?.sixth || "HEAD"}
            </text>
          </g>
          <g>
            <rect className="fill-card" x="241" y="3" width="24" height="10" rx="5"></rect>
            <DatabaseIcon x="244" y="5.5"></DatabaseIcon>
            <text className="fill-foreground" x="253" y="10" stroke="none" fontSize="5" fontWeight="500">
              {badgeTexts?.seventh || "WS"}
            </text>
          </g>
          <g>
            <rect className="fill-card" x="268" y="3" width="24" height="10" rx="5"></rect>
            <DatabaseIcon x="271" y="5.5"></DatabaseIcon>
            <text className="fill-foreground" x="279" y="10" stroke="none" fontSize="5" fontWeight="500">
              {badgeTexts?.eighth || "GQL"}
            </text>
          </g>
        </g>
        <defs>
          <mask id="db-mask-1">
            <path d="M 22 10 v 15 q 0 5 5 5 h 108 q 5 0 5 5 v 10" strokeWidth="0.5" stroke="white" />
          </mask>
          <mask id="db-mask-2">
            <path d="M 62 10 v 10 q 0 5 5 5 h 63 q 5 0 5 5 v 15" strokeWidth="0.5" stroke="white" />
          </mask>
          <mask id="db-mask-3">
            <path d="M 102 10 v 10 q 0 5 5 5 h 28 q 5 0 5 5 v 15" strokeWidth="0.5" stroke="white" />
          </mask>
          <mask id="db-mask-4">
            <path d="M 142 10 v 15 q 0 5 -2 5 h -0 q -5 0 -5 5 v 10" strokeWidth="0.5" stroke="white" />
          </mask>
          <mask id="db-mask-5">
            <path d="M 182 10 v 15 q 0 5 -5 5 h -32 q -5 0 -5 5 v 10" strokeWidth="0.5" stroke="white" />
          </mask>
          <mask id="db-mask-6">
            <path d="M 218 10 v 10 q 0 5 -5 5 h -68 q -5 0 -5 5 v 15" strokeWidth="0.5" stroke="white" />
          </mask>
          <mask id="db-mask-7">
            <path d="M 252 10 v 10 q 0 5 -5 5 h -102 q -5 0 -5 5 v 15" strokeWidth="0.5" stroke="white" />
          </mask>
          <mask id="db-mask-8">
            <path d="M 275 10 v 15 q 0 5 -5 5 h -125 q -5 0 -5 5 v 10" strokeWidth="0.5" stroke="white" />
          </mask>
          <radialGradient id="db-blue-grad" fx="1">
            <stop offset="0%" stopColor={lightColor || "#006AAA"} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <radialGradient id="db-red-grad" fx="1">
            <stop offset="0%" stopColor="#C00008" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
      </svg>
      {/* Main Box */}
      <div className="absolute bottom-10 flex w-full flex-col items-center">
        <div className="absolute -bottom-4 h-[100px] w-[62%] rounded-lg bg-accent/30" />
        <div className="absolute -top-3 z-20 flex items-center justify-center rounded-lg border border-border bg-card px-2 py-1 sm:-top-4 sm:py-1.5">
          <SparklesIcon className="size-3 text-[#006AAA]" />
          <span className="ml-2 text-[10px] text-foreground">
            {title || "We connect to any API you need"}
          </span>
        </div>
        <div className="absolute -bottom-8 z-30 grid h-[60px] w-[60px] place-items-center rounded-full border-t border-border bg-card font-semibold text-xs text-foreground">
          {circleText || "API"}
        </div>
        <div className="relative z-10 flex h-[150px] w-full items-center justify-center overflow-hidden rounded-lg border border-border bg-background shadow-md">
          <div className="absolute bottom-8 left-12 z-10 h-7 rounded-full bg-card px-3 text-xs border border-border flex items-center gap-2 text-foreground">
            <HeartHandshakeIcon className="size-4 text-[#C00008]" />
            <span>{buttonTexts?.first || "Haestus"}</span>
          </div>
          <div className="absolute right-16 z-10 hidden h-7 rounded-full bg-card px-3 text-xs sm:flex border border-border items-center gap-2 text-foreground">
            <Folder className="size-4 text-[#006AAA]" />
            <span>{buttonTexts?.second || "Your Stack"}</span>
          </div>
          <motion.div
            className="absolute -bottom-14 h-[100px] w-[100px] rounded-full border-t border-border bg-accent/5"
            animate={{ scale: [0.98, 1.02, 0.98, 1, 1, 1, 1, 1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-20 h-[145px] w-[145px] rounded-full border-t border-border bg-accent/5"
            animate={{ scale: [1, 1, 1, 0.98, 1.02, 0.98, 1, 1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-[100px] h-[190px] w-[190px] rounded-full border-t border-border bg-accent/5"
            animate={{ scale: [1, 1, 1, 1, 1, 0.98, 1.02, 0.98, 1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-[120px] h-[235px] w-[235px] rounded-full border-t border-border bg-accent/5"
            animate={{ scale: [1, 1, 1, 1, 1, 1, 0.98, 1.02, 0.98, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </div>
    </div>
  );
};

export default DatabaseWithRestApi;

const DatabaseIcon = ({ x = "0", y = "0" }: { x: string; y: string }) => {
  return (
    <svg
      x={x}
      y={y}
      xmlns="http://www.w3.org/2000/svg"
      width="5"
      height="5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-foreground"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  );
};
