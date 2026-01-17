"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SparklesCore } from "@/components/ui/sparkles";
import { Eye, Layers, Zap, Target, Calendar, Quote as QuoteIcon, Music, Share2 } from "lucide-react";
import { PixelCanvas } from "@/components/ui/pixel-canvas";
import { useEffect, useRef, useCallback, useState, useMemo } from "react";
import { getCalApi } from "@calcom/embed-react";
import { LiveClock } from "@/components/ui/live-clock";
import { useDailyContent } from "@/hooks/use-daily-content";
import { AnimatedTabs } from "@/components/ui/animated-tabs";
import { ShareableCard } from "@/components/ui/shareable-card";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*";

export function HeroBranding() {
  const subtitleText = "AND WE'RE CRAFTING SLINGSHOTS.";
  const [displayText, setDisplayText] = useState(subtitleText);
  const [isScrambling, setIsScrambling] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const frameRef = useRef(0);
  const hasAnimated = useRef(false);

  // Daily content hook
  const { content, isTransitioning, handleMidnightTransition } = useDailyContent();

  // Share card state
  const [shareCardType, setShareCardType] = useState<"quote" | "song" | null>(null);

  const scramble = useCallback(() => {
    setIsScrambling(true);
    frameRef.current = 0;
    const duration = subtitleText.length * 3;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      frameRef.current++;

      const progress = frameRef.current / duration;
      const revealedLength = Math.floor(progress * subtitleText.length);

      const newText = subtitleText
        .split("")
        .map((char, i) => {
          if (char === " " || char === "'") return char;
          if (i < revealedLength) return subtitleText[i];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setDisplayText(newText);

      if (frameRef.current >= duration) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(subtitleText);
        setIsScrambling(false);
      }
    }, 30);
  }, [subtitleText]);

  useEffect(() => {
    if (!hasAnimated.current) {
      hasAnimated.current = true;
      const timer = setTimeout(() => {
        scramble();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [scramble]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Initialize Cal.com
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        styles: { branding: { brandColor: "#000000" } },
        hideEventTypeDetails: false,
        layout: "month_view"
      });
    })();
  }, []);

  const handleBookCall = async () => {
    const cal = await getCalApi();
    cal("modal", {
      calLink: "rocky-bunker-n2hayf/15min",
      config: {
        layout: "month_view",
        theme: "dark"
      }
    });
  };

  return (
    <section className="relative pt-32 pb-16">
      <div className="max-w-6xl mx-auto px-6">

        {/* Live Clock - Top Right */}
        <div className="absolute top-8 right-8">
          <LiveClock onMidnight={handleMidnightTransition} />
        </div>

        {/* LAYER 1: Logo + Sparkles (Centered) */}
        <motion.div
          className="flex flex-col items-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Logo */}
          <motion.a
            href="/"
            className="block mb-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Image
              src="/haestus1.png"
              alt="HAESTUS"
              width={380}
              height={56}
              priority
              className="brightness-0 invert"
            />
          </motion.a>

          {/* Sparkles */}
          <div className="relative w-96 h-10">
            <SparklesCore
              id="hero-sparkles"
              background="transparent"
              minSize={0.4}
              maxSize={1.2}
              particleDensity={60}
              className="w-full h-full"
              particleColor="#FFFFFF"
              speed={0.4}
            />
          </div>
        </motion.div>

        {/* LAYER 2: Title + Subtitle (Side by Side with Vertical Divider) */}
        <motion.div
          className="relative flex items-center justify-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-12 items-center w-full max-w-7xl">
            {/* LEFT SIDE */}
            <div className="flex flex-col items-center text-center">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-display text-foreground leading-tight mb-6 max-w-xl">
                AI is the rematch between{" "}
                <span className="font-body-semibold">David and Goliath</span>.
              </h1>

              {/* Scramble Subtitle */}
              <div className="flex flex-col items-center">
                <p className="font-mono text-lg md:text-xl tracking-widest">
                  {displayText.split("").map((char, i) => (
                    <span
                      key={i}
                      className={`inline-block transition-all duration-150 ${
                        isScrambling && char !== subtitleText[i]
                          ? "text-amber-500 scale-110"
                          : "text-muted-foreground"
                      }`}
                      style={{ transitionDelay: `${i * 10}ms` }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))}
                </p>
              </div>
            </div>

            {/* CENTER: Vertical Divider */}
            <motion.div
              className="hidden lg:flex flex-col items-center h-64"
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="w-px h-full bg-gradient-to-b from-transparent via-white to-transparent" />
            </motion.div>

            {/* RIGHT SIDE - Daily Content with AnimatedTabs */}
            <div className="flex flex-col items-center w-full max-w-md">
              <AnimatedTabs
                defaultTab="song"
                tabs={[
                  {
                    id: "song",
                    label: "Song of the Day",
                    accentColor: "rgba(14, 165, 233, 0.8)",
                    pixelColors: ["#0ea5e9", "#7dd3fc", "#0ea5e9"],
                    content: content.song ? (
                      <div className="flex flex-col items-center text-center relative py-4">
                        {/* Album Cover */}
                        <div className="h-32 w-32 rounded-xl overflow-hidden border-2 border-white/20 shadow-lg mb-5">
                          {content.song.albumCover ? (
                            <Image
                              src={content.song.albumCover}
                              alt={content.song.title}
                              width={128}
                              height={128}
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                              <Music className="h-10 w-10 text-white/70" />
                            </div>
                          )}
                        </div>

                        {/* Song Title */}
                        <p className="text-base text-white/90 font-medium mb-1">
                          {content.song.title}
                        </p>

                        {/* Artist */}
                        <p className="text-sm text-white/50">
                          {content.song.artist}
                        </p>

                        {/* Share button */}
                        <button
                          onClick={() => setShareCardType("song")}
                          className="absolute -bottom-2 right-0 p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all hover:scale-110"
                          title="Share"
                        >
                          <Share2 size={14} className="text-white/70" />
                        </button>
                      </div>
                    ) : (
                      <div className="text-gray-400">Loading...</div>
                    ),
                  },
                  {
                    id: "quote",
                    label: "Quote of the Day",
                    accentColor: "rgba(245, 158, 11, 0.8)",
                    pixelColors: ["#D97706", "#F59E0B", "#D97706"],
                    content: content.quote ? (
                      <div className="flex flex-col items-center text-center relative py-4">
                        {/* Author Image */}
                        <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-white/20 shadow-lg mb-5">
                          {content.quote.authorImage ? (
                            <Image
                              src={content.quote.authorImage}
                              alt={content.quote.author}
                              width={96}
                              height={96}
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                              <QuoteIcon className="h-10 w-10 text-white/70" />
                            </div>
                          )}
                        </div>

                        {/* Quote Text */}
                        <p className="text-base text-white/90 font-medium italic leading-relaxed mb-4 max-w-xs">
                          &ldquo;{content.quote.text}&rdquo;
                        </p>

                        {/* Author */}
                        <p className="text-sm text-white/50">
                          — {content.quote.author}
                        </p>

                        {/* Share button */}
                        <button
                          onClick={() => setShareCardType("quote")}
                          className="absolute -bottom-2 right-0 p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all hover:scale-110"
                          title="Share"
                        >
                          <Share2 size={14} className="text-white/70" />
                        </button>
                      </div>
                    ) : (
                      <div className="text-gray-400">Loading...</div>
                    ),
                  },
                ]}
              />
            </div>
          </div>
        </motion.div>

        {/* LAYER 3: Subtle Divider */}
        <motion.div
          className="flex justify-center mb-20"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </motion.div>

        {/* LAYER 4: Three Service Cards (Left-aligned design) */}
        <motion.div
          className="flex justify-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 w-full max-w-5xl">
            {/* Card 1 - Smart Sites (Cyan) */}
            <div className="group relative overflow-hidden p-8 md:border-r border-border rounded-lg">
              <PixelCanvas
                gap={10}
                speed={25}
                colors={["#0ea5e9", "#7dd3fc", "#0ea5e9"]}
                variant="default"
              />
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:bg-sky-500/20">
                  <Layers className="w-5 h-5 text-sky-500" strokeWidth={1.5} />
                </div>
                {/* Title with accent line */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-1 h-6 bg-sky-500 rounded-full" />
                  <h3 className="text-xl font-body-semibold text-foreground">Smart Sites</h3>
                </div>
                {/* Description */}
                <p className="text-sm text-muted-foreground font-body leading-relaxed pl-4">
                  Your site shouldn&apos;t be a PDF<br />— it should think, respond, and sell
                </p>
              </div>
            </div>

            {/* Card 2 - AI Agents (White) */}
            <div className="group relative overflow-hidden p-8 md:border-r border-border rounded-lg">
              <PixelCanvas
                gap={10}
                speed={25}
                colors={["#e2e8f0", "#f1f5f9", "#ffffff"]}
                variant="default"
              />
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20">
                  <Zap className="w-5 h-5 text-white" strokeWidth={1.5} />
                </div>
                {/* Title with accent line */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-1 h-6 bg-white rounded-full" />
                  <h3 className="text-xl font-body-semibold text-foreground">AI Agents</h3>
                </div>
                {/* Description */}
                <p className="text-sm text-muted-foreground font-body leading-relaxed pl-4">
                  Custom-built AI that actually moves the needle — not hype, not demos
                </p>
              </div>
            </div>

            {/* Card 3 - AEO (Orange) */}
            <div className="group relative overflow-hidden p-8 rounded-lg">
              <PixelCanvas
                gap={10}
                speed={25}
                colors={["#D97706", "#F59E0B", "#D97706"]}
                variant="default"
              />
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-10 h-10 rounded-lg bg-amber-600/10 border border-amber-600/20 flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:bg-amber-600/20">
                  <Target className="w-5 h-5 text-amber-600" strokeWidth={1.5} />
                </div>
                {/* Title with accent line */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-1 h-6 bg-amber-600 rounded-full" />
                  <h3 className="text-xl font-body-semibold text-foreground">AEO</h3>
                </div>
                {/* Description */}
                <p className="text-sm text-muted-foreground font-body leading-relaxed pl-4">
                  Don&apos;t get left behind — make sure AI search engines put you above your competition
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* LAYER 5: Two CTAs (Centered) */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {/* Primary CTA - Book a call */}
          <motion.button
            onClick={handleBookCall}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-base transition-all overflow-hidden bg-foreground text-background"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Calendar className="w-5 h-5" strokeWidth={1.5} />
            <span>Book a call</span>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </motion.button>

          {/* Secondary CTA */}
          <motion.button
            onClick={() => {
              const projectsSection = document.getElementById('projects');
              if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl font-medium text-base transition-all overflow-hidden bg-background text-foreground border-2 border-border hover:border-foreground/30"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Eye className="w-5 h-5" strokeWidth={1.5} />
            <span>Recent Projects</span>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </motion.button>
        </motion.div>

      </div>

      {/* Share Card Modal */}
      {shareCardType && (
        <ShareableCard
          type={shareCardType}
          data={
            shareCardType === "quote"
              ? {
                  text: content.quote?.text,
                  author: content.quote?.author,
                  authorImage: content.quote?.authorImage,
                }
              : {
                  title: content.song?.title,
                  artist: content.song?.artist,
                  albumCover: content.song?.albumCover,
                }
          }
          onClose={() => setShareCardType(null)}
        />
      )}
    </section>
  );
}
