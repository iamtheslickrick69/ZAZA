"use client";

import React, { useRef, useState } from "react";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import { Share2, Download, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ShareableCardProps {
  type: "quote" | "song";
  data: {
    // Quote data
    text?: string;
    author?: string;
    authorImage?: string;
    // Song data
    title?: string;
    artist?: string;
    albumCover?: string;
  };
  onClose: () => void;
}

export function ShareableCard({ type, data, onClose }: ShareableCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [sharedBy, setSharedBy] = useState("");
  const [showNameInput, setShowNameInput] = useState(true);

  const today = new Date().toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
  });

  const generateImage = async (): Promise<Blob | null> => {
    if (!cardRef.current) return null;

    setIsGenerating(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3, // High resolution
        backgroundColor: "#0a0a0a",
        useCORS: true,
        allowTaint: true,
      });

      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          resolve(blob);
        }, "image/png", 1.0);
      });
    } catch (error) {
      console.error("Failed to generate image:", error);
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = async () => {
    const blob = await generateImage();
    if (!blob) return;

    const file = new File([blob], `haestus-${type}-${today.replace(/\//g, "-")}.png`, {
      type: "image/png",
    });

    // Try native share first
    if (navigator.share && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: `${type === "quote" ? "Quote" : "Song"} of the Day`,
          text: "Check out today's inspiration from Haestus",
        });
        return;
      } catch (err) {
        // User cancelled or share failed, fall through to download
        if ((err as Error).name !== "AbortError") {
          console.error("Share failed:", err);
        }
      }
    }

    // Fallback to download
    handleDownload();
  };

  const handleDownload = async () => {
    const blob = await generateImage();
    if (!blob) return;

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `haestus-${type}-${today.replace(/\//g, "-")}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative flex flex-col items-center gap-6 max-w-sm w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute -top-2 -right-2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X size={20} className="text-white" />
          </button>

          {/* Name input */}
          {showNameInput && (
            <div className="w-full flex gap-2">
              <input
                type="text"
                placeholder="Your name (optional)"
                value={sharedBy}
                onChange={(e) => setSharedBy(e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-white/40"
              />
              <button
                onClick={() => setShowNameInput(false)}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm transition-colors"
              >
                Set
              </button>
            </div>
          )}

          {/* The Card - Using inline styles to avoid oklab color issues with html2canvas */}
          <div
            ref={cardRef}
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "9/16",
              borderRadius: "16px",
              overflow: "hidden",
              background: "linear-gradient(180deg, #0a0a0a 0%, #111111 50%, #0a0a0a 100%)",
            }}
          >
            {/* Subtle gradient overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                opacity: 0.3,
                background: type === "quote"
                  ? "radial-gradient(ellipse at 50% 30%, rgba(245, 158, 11, 0.3) 0%, transparent 60%)"
                  : "radial-gradient(ellipse at 50% 30%, rgba(14, 165, 233, 0.3) 0%, transparent 60%)",
              }}
            />

            {/* Content */}
            <div
              style={{
                position: "relative",
                zIndex: 10,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                height: "100%",
                padding: "32px",
              }}
            >
              {/* Top: Logo */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                <img
                  src="/haestus1.png"
                  alt="HAESTUS"
                  style={{ width: "140px", height: "auto", filter: "brightness(0) invert(1)", opacity: 0.8 }}
                />
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  {type === "quote" ? "Quote" : "Song"} of the Day
                </p>
              </div>

              {/* Middle: Content */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "24px", padding: "32px 0" }}>
                {type === "quote" ? (
                  <>
                    {/* Author image */}
                    {data.authorImage && (
                      <div style={{ width: "96px", height: "96px", borderRadius: "50%", overflow: "hidden", border: "2px solid rgba(255,255,255,0.2)" }}>
                        <img
                          src={data.authorImage}
                          alt={data.author || ""}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </div>
                    )}
                    {/* Quote text */}
                    <p style={{ color: "#ffffff", fontSize: "20px", fontWeight: 500, fontStyle: "italic", textAlign: "center", lineHeight: 1.6, padding: "0 16px" }}>
                      &ldquo;{data.text}&rdquo;
                    </p>
                    {/* Author */}
                    <p style={{ color: "#f59e0b", fontSize: "16px", fontWeight: 500 }}>
                      — {data.author}
                    </p>
                  </>
                ) : (
                  <>
                    {/* Album cover */}
                    {data.albumCover && (
                      <div style={{ width: "160px", height: "160px", borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.2)", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }}>
                        <img
                          src={data.albumCover}
                          alt={data.title || ""}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </div>
                    )}
                    {/* Song info */}
                    <div style={{ textAlign: "center" }}>
                      <p style={{ color: "#ffffff", fontSize: "24px", fontWeight: 600, marginBottom: "8px" }}>
                        {data.title}
                      </p>
                      <p style={{ color: "#0ea5e9", fontSize: "18px" }}>
                        {data.artist}
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Bottom: QR + Info */}
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", width: "100%" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px" }}>
                    {today}
                  </p>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>
                    haestus.com
                  </p>
                  {sharedBy && (
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", marginTop: "4px" }}>
                      Shared by {sharedBy}
                    </p>
                  )}
                </div>
                <div style={{ backgroundColor: "#ffffff", padding: "8px", borderRadius: "8px" }}>
                  <QRCode
                    value="https://haestus.com"
                    size={56}
                    level="M"
                    bgColor="#ffffff"
                    fgColor="#0a0a0a"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 w-full">
            <button
              onClick={handleShare}
              disabled={isGenerating}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition-colors disabled:opacity-50"
            >
              {isGenerating ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <Share2 size={20} />
              )}
              Share
            </button>
            <button
              onClick={handleDownload}
              disabled={isGenerating}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 transition-colors disabled:opacity-50"
            >
              {isGenerating ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <Download size={20} />
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
