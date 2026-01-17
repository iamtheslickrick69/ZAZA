"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";
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
  };
  buttonTexts?: {
    first: string;
    second: string;
  };
  title?: string;
  lightColor?: string;
  showImage?: boolean;
  imageSrc?: string;
}

// Official AI Platform Icons - Larger size (12x12)
const ChatGPTIcon = ({ x = "0", y = "0" }: { x: string; y: string }) => (
  <svg x={x} y={y} width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-foreground">
    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364l2.0201-1.1685a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
  </svg>
);

const PerplexityIcon = ({ x = "0", y = "0" }: { x: string; y: string }) => (
  <svg x={x} y={y} width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-foreground">
    <path d="M12 0L2.4 6v12l9.6 6 9.6-6V6L12 0zm7.2 16.8L12 21.6l-7.2-4.8V7.2L12 2.4l7.2 4.8v9.6zM12 6.6L7.2 9.6v4.8l4.8 3 4.8-3V9.6L12 6.6zm0 2.4l2.4 1.5v3L12 15l-2.4-1.5v-3L12 9z"/>
  </svg>
);

const ClaudeIcon = ({ x = "0", y = "0" }: { x: string; y: string }) => (
  <svg x={x} y={y} width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-foreground">
    <path d="M4.603 15.326c-.19-.14-.298-.347-.298-.573V9.247c0-.226.107-.432.298-.573l5.088-3.794c.19-.142.432-.142.622 0L12 6.247l1.687-1.367c.19-.142.432-.142.622 0l5.088 3.794c.19.14.298.347.298.573v5.506c0 .226-.107.432-.298.573l-5.088 3.794c-.19.142-.432.142-.622 0L12 17.753l-1.687 1.367c-.19.142-.432.142-.622 0l-5.088-3.794zM12 8.82L8.165 11.68v2.64L12 17.18l3.835-2.86v-2.64L12 8.82z"/>
  </svg>
);

const GeminiIcon = ({ x = "0", y = "0" }: { x: string; y: string }) => (
  <svg x={x} y={y} width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-foreground">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 3.6c.612 0 1.188.306 1.53.816L18 12l-4.47 7.584c-.342.51-.918.816-1.53.816s-1.188-.306-1.53-.816L6 12l4.47-7.584c.342-.51.918-.816 1.53-.816z"/>
  </svg>
);

const CopilotIcon = ({ x = "0", y = "0" }: { x: string; y: string }) => (
  <svg x={x} y={y} width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-foreground">
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 2c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zm-2 4v8l6-4-6-4z"/>
  </svg>
);

const GrokIcon = ({ x = "0", y = "0" }: { x: string; y: string }) => (
  <svg x={x} y={y} width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-foreground">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const DatabaseWithRestApi = ({
  className,
  circleText,
  badgeTexts,
  buttonTexts,
  title,
  lightColor,
  showImage,
  imageSrc,
}: DatabaseWithRestApiProps) => {
  return (
    <div
      className={cn(
        "relative flex h-[400px] w-full max-w-[700px] flex-col items-center",
        className
      )}
    >
      {/* SVG Paths - 6 Endpoints */}
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
          {/* 6 paths for 6 AI platforms - evenly spaced */}
          <path d="M 30 10 v 15 q 0 5 5 5 h 100 q 5 0 5 5 v 10" />
          <path d="M 75 10 v 10 q 0 5 5 5 h 55 q 5 0 5 5 v 15" />
          <path d="M 120 10 v 10 q 0 5 5 5 h 10 q 5 0 5 5 v 15" />
          <path d="M 160 10 v 15 q 0 5 -5 5 h -10 q -5 0 -5 5 v 10" />
          <path d="M 205 10 v 10 q 0 5 -5 5 h -55 q -5 0 -5 5 v 15" />
          <path d="M 250 10 v 15 q 0 5 -5 5 h -100 q -5 0 -5 5 v 10" />
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
        {/* Animated Lights - all using teal */}
        <g mask="url(#db-mask-1)">
          <circle className="database db-light-1" cx="0" cy="0" r="12" fill="url(#db-teal-grad)" />
        </g>
        <g mask="url(#db-mask-2)">
          <circle className="database db-light-2" cx="0" cy="0" r="12" fill="url(#db-teal-grad)" />
        </g>
        <g mask="url(#db-mask-3)">
          <circle className="database db-light-3" cx="0" cy="0" r="12" fill="url(#db-teal-grad)" />
        </g>
        <g mask="url(#db-mask-4)">
          <circle className="database db-light-4" cx="0" cy="0" r="12" fill="url(#db-teal-grad)" />
        </g>
        <g mask="url(#db-mask-5)">
          <circle className="database db-light-5" cx="0" cy="0" r="12" fill="url(#db-teal-grad)" />
        </g>
        <g mask="url(#db-mask-6)">
          <circle className="database db-light-6" cx="0" cy="0" r="12" fill="url(#db-teal-grad)" />
        </g>
        {/* Icon-only Badges - 6 AI Platforms */}
        <g stroke="currentColor" fill="none" strokeWidth="0.4">
          {/* ChatGPT */}
          <g>
            <rect className="fill-card" x="18" y="1" width="24" height="16" rx="4"></rect>
            <ChatGPTIcon x="24" y="3" />
          </g>
          {/* Perplexity */}
          <g>
            <rect className="fill-card" x="63" y="1" width="24" height="16" rx="4"></rect>
            <PerplexityIcon x="69" y="3" />
          </g>
          {/* Claude */}
          <g>
            <rect className="fill-card" x="108" y="1" width="24" height="16" rx="4"></rect>
            <ClaudeIcon x="114" y="3" />
          </g>
          {/* Gemini */}
          <g>
            <rect className="fill-card" x="148" y="1" width="24" height="16" rx="4"></rect>
            <GeminiIcon x="154" y="3" />
          </g>
          {/* Copilot */}
          <g>
            <rect className="fill-card" x="193" y="1" width="24" height="16" rx="4"></rect>
            <CopilotIcon x="199" y="3" />
          </g>
          {/* Grok */}
          <g>
            <rect className="fill-card" x="238" y="1" width="24" height="16" rx="4"></rect>
            <GrokIcon x="244" y="3" />
          </g>
        </g>
        <defs>
          <mask id="db-mask-1">
            <path d="M 30 10 v 15 q 0 5 5 5 h 100 q 5 0 5 5 v 10" strokeWidth="0.5" stroke="white" />
          </mask>
          <mask id="db-mask-2">
            <path d="M 75 10 v 10 q 0 5 5 5 h 55 q 5 0 5 5 v 15" strokeWidth="0.5" stroke="white" />
          </mask>
          <mask id="db-mask-3">
            <path d="M 120 10 v 10 q 0 5 5 5 h 10 q 5 0 5 5 v 15" strokeWidth="0.5" stroke="white" />
          </mask>
          <mask id="db-mask-4">
            <path d="M 160 10 v 15 q 0 5 -5 5 h -10 q -5 0 -5 5 v 10" strokeWidth="0.5" stroke="white" />
          </mask>
          <mask id="db-mask-5">
            <path d="M 205 10 v 10 q 0 5 -5 5 h -55 q -5 0 -5 5 v 15" strokeWidth="0.5" stroke="white" />
          </mask>
          <mask id="db-mask-6">
            <path d="M 250 10 v 15 q 0 5 -5 5 h -100 q -5 0 -5 5 v 10" strokeWidth="0.5" stroke="white" />
          </mask>
          <radialGradient id="db-teal-grad" fx="1">
            <stop offset="0%" stopColor={lightColor || "#0ea5e9"} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
      </svg>
      {/* Main Box */}
      <div className="absolute bottom-6 flex w-full flex-col items-center">
        <div className="absolute -bottom-4 h-[100px] w-[62%] rounded-lg bg-accent/30" />
        <div className="absolute -top-3 z-20 flex items-center justify-center rounded-lg border border-border bg-card px-3 py-1.5 sm:-top-4 sm:py-2">
          <Globe className="size-3.5 text-[#0ea5e9]" />
          <span className="ml-2 text-xs font-medium text-foreground">
            {title || "YOUR SITE"}
          </span>
        </div>
        {circleText && (
          <div className="absolute -bottom-8 z-30 grid h-[60px] w-[60px] place-items-center rounded-full border-t border-border bg-card font-semibold text-xs text-foreground">
            {circleText}
          </div>
        )}
        <div className="relative z-10 flex h-[170px] w-full items-center justify-center overflow-hidden rounded-lg border border-border bg-background shadow-md">
          {showImage && imageSrc ? (
            <img
              src={imageSrc}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DatabaseWithRestApi;
