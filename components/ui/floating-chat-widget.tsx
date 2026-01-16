"use client";

import { X, SendHorizonal, Loader2, DollarSign, Zap, Calendar, HelpCircle, Mic, Upload } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [typedText, setTypedText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const greetingText = "Hi, I'm Slick!";

  // Typewriter effect on hover
  useEffect(() => {
    if (isHovered) {
      setTypedText("");
      let i = 0;
      const interval = setInterval(() => {
        if (i < greetingText.length) {
          setTypedText(greetingText.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 50);
      return () => clearInterval(interval);
    } else {
      setTypedText("");
    }
  }, [isHovered]);

  // Listen for custom event to open chat
  useEffect(() => {
    const handleOpenChat = () => {
      setIsOpen(true);
    };

    window.addEventListener('openChatWidget', handleOpenChat);
    return () => window.removeEventListener('openChatWidget', handleOpenChat);
  }, []);

  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 56,
    maxHeight: 150,
  });

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;
    console.log("Uploaded files:", files);
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue("");
    adjustHeight(true);

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      // Add assistant message
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (error: any) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Error: ${error.message || 'Failed to connect to AI'}`
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button with Animated Teal Glow */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="fixed bottom-6 right-6 z-50 w-32 h-32 overflow-visible"
          >
            {/* Main button - just the bot icon */}
            <div
              className="relative w-full h-full flex items-center justify-center"
            >
              <img src="/slickai.png" alt="Slick AI" className="w-32 h-32 object-contain" />
            </div>

            {/* Hover tooltip - Glassmorphism with typewriter */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: 10 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 15,
                    mass: 0.8
                  }}
                  className="absolute right-full mr-4 top-1/2 -translate-y-1/2 pointer-events-none"
                >
                  <div
                    className="relative px-5 py-3 rounded-2xl whitespace-nowrap shadow-2xl border border-sky-500/30"
                    style={{
                      background: 'rgba(10, 26, 31, 0.85)',
                      backdropFilter: 'blur(12px)',
                      boxShadow: '0 0 20px rgba(14, 165, 233, 0.15), 0 8px 32px rgba(0, 0, 0, 0.4)',
                    }}
                  >
                    {/* Animated glow on appear */}
                    <motion.div
                      initial={{ opacity: 0.8 }}
                      animate={{ opacity: 0 }}
                      transition={{ duration: 0.8 }}
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        background: 'radial-gradient(circle, rgba(14, 165, 233, 0.3) 0%, transparent 70%)',
                      }}
                    />

                    {/* Typewriter text */}
                    <span className="relative text-white text-sm font-medium tracking-wide">
                      {typedText}
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="text-sky-400"
                      >
                        |
                      </motion.span>
                    </span>

                    {/* Speech bubble tail */}
                    <div
                      className="absolute right-[-8px] top-1/2 -translate-y-1/2 w-4 h-4 rotate-45 border-r border-t border-sky-500/30"
                      style={{
                        background: 'rgba(10, 26, 31, 0.85)',
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window - Premium Glassmorphism */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[400px] h-[600px] max-h-[85vh] flex flex-col rounded-3xl shadow-2xl overflow-hidden"
            style={{
              background: 'rgba(10, 20, 25, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(14, 165, 233, 0.2)',
              boxShadow: '0 0 40px rgba(14, 165, 233, 0.1), 0 25px 50px rgba(0, 0, 0, 0.5)',
            }}
          >
            {/* Header - Simplified */}
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{
                background: 'rgba(14, 165, 233, 0.05)',
                borderBottom: '1px solid rgba(14, 165, 233, 0.15)',
              }}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl font-bold text-white tracking-tight">Slick</span>
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium text-sky-400 bg-sky-500/10 border border-sky-500/20">
                  <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-pulse" />
                  Online
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {messages.length === 0 && (
                <div className="flex flex-col h-full">
                  {/* Animated Bot Avatar with idle float */}
                  <motion.div
                    className="flex justify-center pt-4 pb-6"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="relative">
                      <img src="/slickai.png" alt="Slick AI" className="w-20 h-20 object-contain" />
                      {/* Subtle glow ring */}
                      <div
                        className="absolute inset-0 rounded-full -z-10 scale-125"
                        style={{
                          background: 'radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, transparent 70%)',
                        }}
                      />
                    </div>
                  </motion.div>

                  {/* Intro Message - Chat style */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-6"
                  >
                    <div
                      className="rounded-2xl rounded-tl-sm px-5 py-4 max-w-[90%]"
                      style={{
                        background: 'rgba(14, 165, 233, 0.08)',
                        border: '1px solid rgba(14, 165, 233, 0.15)',
                      }}
                    >
                      <p className="text-white text-[15px] leading-relaxed">
                        Hey! What can I help you build today? 👋
                      </p>
                    </div>
                  </motion.div>

                  {/* Quick Actions - Horizontal Chips */}
                  <div className="space-y-2">
                    <p className="text-[11px] uppercase tracking-wider text-white/40 font-medium px-1">Quick questions</p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { icon: DollarSign, text: "Pricing" },
                        { icon: Zap, text: "Smart Sites" },
                        { icon: Calendar, text: "Book a demo" },
                        { icon: HelpCircle, text: "How AI works" },
                      ].map(({ icon: Icon, text }) => (
                        <motion.button
                          key={text}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setInputValue(text === "Pricing" ? "What's your pricing?" : text === "Smart Sites" ? "Tell me about Smart Sites" : text === "Book a demo" ? "I'd like to schedule a demo" : "How does the AI work?");
                            setTimeout(() => handleSend(), 100);
                          }}
                          className="group flex items-center gap-2 px-4 py-2.5 text-sm text-white/80 rounded-full transition-all"
                          style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(14, 165, 233, 0.15)';
                            e.currentTarget.style.border = '1px solid rgba(14, 165, 233, 0.4)';
                            e.currentTarget.style.boxShadow = '0 0 20px rgba(14, 165, 233, 0.2)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                            e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.08)';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        >
                          <Icon className="w-4 h-4 text-sky-400" />
                          <span>{text}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    "flex gap-3",
                    msg.role === 'user' ? "justify-end" : "justify-start"
                  )}
                >
                  {/* Bot icon for assistant */}
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 flex-shrink-0 mt-1">
                      <img src="/slickai.png" alt="Slick AI" className="w-7 h-7 object-contain" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-3",
                      msg.role === 'user'
                        ? "rounded-br-sm"
                        : "rounded-tl-sm"
                    )}
                    style={msg.role === 'user' ? {
                      background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.9) 0%, rgba(14, 165, 233, 0.9) 100%)',
                      boxShadow: '0 4px 15px rgba(14, 165, 233, 0.3)',
                    } : {
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                  >
                    <p className="text-sm text-white whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 justify-start"
                >
                  <div className="w-7 h-7 flex-shrink-0 mt-1">
                    <img src="/slickai.png" alt="Slick AI" className="w-7 h-7 object-contain" />
                  </div>
                  <div
                    className="rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                  >
                    <motion.div
                      className="w-2 h-2 bg-sky-400 rounded-full"
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-sky-400 rounded-full"
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-sky-400 rounded-full"
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
                    />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input - Animated Gradient Border */}
            <div className="p-4 pt-2">
              <div className="relative rounded-2xl overflow-hidden">
                {/* Animated gradient border */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: 'linear-gradient(90deg, rgba(14, 165, 233, 0.5), rgba(14, 165, 233, 0.8), rgba(14, 165, 233, 0.5))',
                    backgroundSize: '200% 100%',
                  }}
                  animate={{
                    backgroundPosition: ['0% 0%', '200% 0%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
                {/* Inner container */}
                <div
                  className="relative m-[1px] rounded-2xl"
                  style={{
                    background: 'rgba(10, 20, 25, 0.95)',
                  }}
                >
                  <Textarea
                    ref={textareaRef}
                    placeholder="Ask anything..."
                    className={cn(
                      "w-full resize-none border-none bg-transparent",
                      "text-[15px] text-white placeholder:text-white/40",
                      "px-5 py-4 pr-24 rounded-2xl leading-[1.4]",
                      "transition-all focus-visible:ring-0 focus-visible:ring-offset-0"
                    )}
                    value={inputValue}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                      adjustHeight();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    disabled={isLoading}
                  />

                  {/* Send Button Only */}
                  <div className="absolute bottom-3 right-3">
                    <motion.button
                      type="button"
                      onClick={handleSend}
                      disabled={!inputValue.trim() || isLoading}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                        inputValue.trim() && !isLoading
                          ? "bg-sky-500 text-white shadow-lg shadow-sky-500/30"
                          : "bg-white/10 text-white/30 cursor-not-allowed"
                      )}
                    >
                      {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <SendHorizonal className="w-5 h-5" />
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
