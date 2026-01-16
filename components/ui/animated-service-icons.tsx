"use client";

import { Zap, Brain, Rocket, Code2 } from 'lucide-react';
import { useLucideDrawerAnimation } from "@/components/ui/lucide-icon-drawer";

export function AnimatedServiceIcons() {
  const root = useLucideDrawerAnimation();

  return (
    <div className="py-12 bg-background">
      <div ref={root} className="flex flex-col items-center gap-6">
        <div className="flex flex-row gap-8 md:gap-12">
          <Zap size={48} className="text-[#00a8cc]" />
          <Brain size={48} className="text-[#00a8cc]" />
          <Rocket size={48} className="text-[#00a8cc]" />
          <Code2 size={48} className="text-[#00a8cc]" />
        </div>
        <span className="text-sm text-muted-foreground">AI-Powered Solutions</span>
      </div>
    </div>
  );
}
