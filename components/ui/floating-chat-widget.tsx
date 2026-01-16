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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
            className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-2xl overflow-visible group"
          >
            {/* Outer animated glow rings */}
            <motion.span
              className="absolute inset-[-8px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(0, 168, 204, 0.4) 0%, rgba(0, 168, 204, 0) 70%)',
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.8, 0.3, 0.8],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.span
              className="absolute inset-[-4px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(0, 168, 204, 0.6) 0%, rgba(0, 168, 204, 0) 70%)',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.6, 0.2, 0.6],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            />

            {/* Main button */}
            <div
              className="relative w-full h-full rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,168,204,0.5)] overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #004a58 0%, #006d7a 50%, #00a8cc 100%)',
              }}
            >
              <img src="/slickai.png" alt="Slick AI" className="w-10 h-10 object-contain" />
            </div>

            {/* Online indicator */}
            <span className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-3 border-gray-900 shadow-lg z-10" />

            {/* Hover tooltip */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              whileHover={{ opacity: 1, x: 0 }}
              className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg pointer-events-none"
            >
              Chat with Slick AI
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window - Full Dark/Teal Theme */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[400px] h-[580px] max-h-[85vh] flex flex-col rounded-3xl shadow-2xl overflow-hidden border border-[#00a8cc]/30"
            style={{
              background: 'linear-gradient(180deg, #0a1a1f 0%, #0d2830 50%, #0a1a1f 100%)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#00a8cc]/20">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #004a58 0%, #00a8cc 100%)',
                  }}
                >
                  <img src="/slickai.png" alt="Slick AI" className="w-7 h-7 object-contain" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Slick AI</h3>
                  <p className="text-xs text-green-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    Online now
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white/80 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {messages.length === 0 && (
                <div className="text-center py-6">
                  <div
                    className="w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #004a58 0%, #00a8cc 100%)',
                      boxShadow: '0 0 30px rgba(0, 168, 204, 0.3)',
                    }}
                  >
                    <img src="/slickai.png" alt="Slick AI" className="w-14 h-14 object-contain" />
                  </div>
                  <h4 className="font-bold text-white text-xl mb-2">Slick AI</h4>
                  <p className="text-sm text-gray-400 max-w-[280px] mx-auto leading-relaxed">
                    Hey! I'm here to help answer any questions about Haestus and our services.
                  </p>

                  {/* Quick actions grid */}
                  <div className="grid grid-cols-2 gap-3 mt-6 px-2">
                    {[
                      { icon: DollarSign, text: "What's your pricing?", color: "text-emerald-400" },
                      { icon: Zap, text: "Tell me about Smart Sites", color: "text-[#00a8cc]" },
                      { icon: Calendar, text: "Schedule a demo", color: "text-purple-400" },
                      { icon: HelpCircle, text: "How does the AI work?", color: "text-amber-400" },
                    ].map(({ icon: Icon, text, color }) => (
                      <motion.button
                        key={text}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setInputValue(text);
                          setTimeout(() => handleSend(), 100);
                        }}
                        className="flex items-center gap-2.5 px-4 py-3 text-sm bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl transition-all border border-white/10 hover:border-[#00a8cc]/50 text-left"
                      >
                        <Icon className={cn("w-5 h-5 flex-shrink-0", color)} />
                        <span className="leading-tight">{text}</span>
                      </motion.button>
                    ))}
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
                    "flex gap-2",
                    msg.role === 'user' ? "justify-end" : "justify-start"
                  )}
                >
                  {/* Bot icon for assistant */}
                  {msg.role === 'assistant' && (
                    <div
                      className="w-8 h-8 rounded-full flex-shrink-0 mt-1 flex items-center justify-center overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, #004a58 0%, #00a8cc 100%)',
                      }}
                    >
                      <img src="/slickai.png" alt="Slick AI" className="w-5 h-5 object-contain" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[75%] rounded-2xl px-4 py-2.5",
                      msg.role === 'user'
                        ? "bg-[#00a8cc] text-white rounded-br-sm"
                        : "bg-white/10 text-gray-200 rounded-bl-sm border border-white/10"
                    )}
                  >
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2 justify-start"
                >
                  <div
                    className="w-8 h-8 rounded-full flex-shrink-0 mt-1 flex items-center justify-center overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #004a58 0%, #00a8cc 100%)',
                    }}
                  >
                    <img src="/slickai.png" alt="Slick AI" className="w-5 h-5 object-contain" />
                  </div>
                  <div className="bg-white/10 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5 border border-white/10">
                    <motion.div
                      className="w-2.5 h-2.5 bg-[#00a8cc] rounded-full"
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div
                      className="w-2.5 h-2.5 bg-[#00a8cc] rounded-full"
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
                    />
                    <motion.div
                      className="w-2.5 h-2.5 bg-[#00a8cc] rounded-full"
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
                    />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input - Gradient Style */}
            <div className="p-3">
              <div
                className="relative rounded-2xl border border-[#00a8cc]/30 shadow-lg overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #004a58 0%, #006d7a 50%, #00a8cc 100%)',
                }}
              >
                <Textarea
                  ref={textareaRef}
                  placeholder="Ask anything..."
                  className={cn(
                    "w-full resize-none border-none bg-transparent",
                    "text-base text-white placeholder:text-white/60",
                    "px-5 py-4 pr-32 rounded-2xl leading-[1.4]",
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

                {/* Icon Buttons */}
                <div className="absolute bottom-3 right-3 flex items-center gap-2">
                  <button
                    type="button"
                    className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
                  >
                    <Mic className="w-4 h-4" />
                  </button>

                  {/* File Upload Popover */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
                      >
                        <Upload className="w-4 h-4" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-60 p-4 bg-gray-900 border-gray-700">
                      <p className="text-sm mb-2 text-white">Upload files:</p>
                      <input
                        type="file"
                        multiple
                        ref={fileInputRef}
                        onChange={(e) => handleFileUpload(e.target.files)}
                        className="w-full border border-gray-600 rounded p-1 text-sm text-white bg-gray-800"
                      />
                      <Button
                        className="mt-2 w-full bg-[#00a8cc] hover:bg-[#00a8cc]/80"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Choose Files
                      </Button>
                    </PopoverContent>
                  </Popover>

                  <button
                    type="button"
                    onClick={handleSend}
                    disabled={!inputValue.trim() || isLoading}
                    className={cn(
                      "p-2 rounded-full transition-all",
                      inputValue.trim() && !isLoading
                        ? "bg-white text-[#004a58] hover:scale-105"
                        : "bg-white/20 text-white/50 cursor-not-allowed"
                    )}
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <SendHorizonal className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
