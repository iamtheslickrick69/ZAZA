"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MacBookKeyboardProps {
  onCodeComplete: (code: string) => void;
  correctCode: string;
}

const MacBookKeyboard = ({ onCodeComplete, correctCode }: MacBookKeyboardProps) => {
  const [enteredCode, setEnteredCode] = useState("");
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [showDenied, setShowDenied] = useState(false);

  const handleKeyClick = useCallback(
    (key: string) => {
      setPressedKey(key);
      setTimeout(() => setPressedKey(null), 150);

      if (key === "delete") {
        setEnteredCode((prev) => prev.slice(0, -1));
        setError(false);
        setShowDenied(false);
      } else if (key === "return") {
        if (enteredCode.toLowerCase() === correctCode.toLowerCase()) {
          onCodeComplete(enteredCode);
        } else {
          setError(true);
          setShowDenied(true);
          setTimeout(() => {
            setError(false);
            setShowDenied(false);
            setEnteredCode("");
          }, 1500);
        }
      } else if (enteredCode.length < 20 && key.length === 1) {
        setEnteredCode((prev) => prev + key);
        setError(false);
        setShowDenied(false);
      }
    },
    [enteredCode, correctCode, onCodeComplete]
  );

  // Handle physical keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      if (key === "Backspace") {
        handleKeyClick("delete");
      } else if (key === "Enter") {
        handleKeyClick("return");
      } else if (/^[a-zA-Z0-9]$/.test(key)) {
        handleKeyClick(key.toLowerCase());
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyClick]);

  const isKeyPressed = (key: string) => pressedKey === key;

  const KeyWrapper = ({
    children,
    keyValue,
    className = "",
  }: {
    children: React.ReactNode;
    keyValue: string;
    className?: string;
  }) => (
    <motion.div
      onClick={() => handleKeyClick(keyValue)}
      whileTap={{ scale: 0.95 }}
      className={`p-[1px] rounded-[5px] bg-white/[0.15] cursor-pointer transition-all duration-100 ${
        isKeyPressed(keyValue) ? "scale-[0.95]" : ""
      } ${className}`}
      style={{
        boxShadow: isKeyPressed(keyValue)
          ? "0 0 20px rgba(255,255,255,0.3), inset 0 0 10px rgba(255,255,255,0.1)"
          : "0 2px 4px rgba(0,0,0,0.3)",
      }}
    >
      {children}
    </motion.div>
  );

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Full MacBook Keyboard */}
      <div className="relative">
        {/* Ambient backlight glow */}
        <div
          className="absolute inset-0 blur-3xl opacity-20 pointer-events-none"
          style={{
            background: error
              ? "radial-gradient(ellipse at center, #ef4444 0%, transparent 70%)"
              : "radial-gradient(ellipse at center, #ffffff 0%, transparent 70%)",
          }}
        />

        <div className="relative rounded-xl bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900 p-3 shadow-2xl border border-white/30">
          {/* Touch Bar with Code Display */}
          <div className="mb-2 mx-1">
            <div className="h-10 bg-black rounded-md flex items-center px-4 gap-3 border border-white/10">
              <div className="flex-1 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {showDenied ? (
                    <motion.span
                      key="denied"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-red-500 font-mono text-sm tracking-wider"
                    >
                      Access Denied.
                    </motion.span>
                  ) : (
                    <motion.span
                      key="code"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-white/80 font-mono text-sm tracking-wider"
                    >
                      {enteredCode || (
                        <span className="text-white/30">Enter access code...</span>
                      )}
                      {enteredCode && (
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                          className="text-white/80"
                        >
                          |
                        </motion.span>
                      )}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <motion.div
            className="rounded-lg bg-zinc-800 p-2"
            animate={error ? { x: [-8, 8, -8, 8, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            {/* Function Row */}
            <div className="flex gap-[3px] mb-[3px] w-full">
              <KeyWrapper keyValue="esc">
                <div
                  className="h-10 bg-[#0A090D] rounded-[4px] flex w-16 items-end justify-start pl-[6px] pb-[4px]"
                  style={{
                    boxShadow: "inset 0 -1px 3px rgba(13,13,15,0.8), inset -1px 0 3px rgba(13,13,15,0.8)",
                  }}
                >
                  <span className="text-[9px] text-white/80">esc</span>
                </div>
              </KeyWrapper>
              {["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"].map((fKey) => (
                <KeyWrapper key={fKey} keyValue={fKey}>
                  <div
                    className="h-10 w-10 bg-[#0A090D] rounded-[4px] flex items-center justify-center"
                    style={{
                      boxShadow: "inset 0 -1px 3px rgba(13,13,15,0.8), inset -1px 0 3px rgba(13,13,15,0.8)",
                    }}
                  >
                    <span className="text-[9px] text-white/80">{fKey}</span>
                  </div>
                </KeyWrapper>
              ))}
              <KeyWrapper keyValue="power">
                <div
                  className="h-10 w-10 bg-[#0A090D] rounded-[4px] flex items-center justify-center"
                  style={{
                    boxShadow: "inset 0 -1px 3px rgba(13,13,15,0.8), inset -1px 0 3px rgba(13,13,15,0.8)",
                  }}
                >
                  <div className="h-6 w-6 rounded-full bg-gradient-to-b from-neutral-900 via-black to-neutral-900 p-[2px]">
                    <div className="bg-black h-full w-full rounded-full" />
                  </div>
                </div>
              </KeyWrapper>
            </div>

            {/* Number Row */}
            <div className="flex gap-[3px] mb-[3px] w-full">
              {[
                { top: "~", bottom: "`" },
                { top: "!", bottom: "1" },
                { top: "@", bottom: "2" },
                { top: "#", bottom: "3" },
                { top: "$", bottom: "4" },
                { top: "%", bottom: "5" },
                { top: "^", bottom: "6" },
                { top: "&", bottom: "7" },
                { top: "*", bottom: "8" },
                { top: "(", bottom: "9" },
                { top: ")", bottom: "0" },
                { top: "—", bottom: "-" },
                { top: "+", bottom: "=" },
              ].map((key, i) => (
                <KeyWrapper key={i} keyValue={key.bottom}>
                  <div
                    className="h-10 w-10 bg-[#0A090D] rounded-[4px] flex items-center justify-center flex-col"
                    style={{
                      boxShadow: "inset 0 -1px 3px rgba(13,13,15,0.8), inset -1px 0 3px rgba(13,13,15,0.8)",
                    }}
                  >
                    <span className="text-[8px] text-white/60 leading-tight">{key.top}</span>
                    <span className="text-[10px] text-white/90 leading-tight">{key.bottom}</span>
                  </div>
                </KeyWrapper>
              ))}
              <KeyWrapper keyValue="delete">
                <div
                  className="h-10 bg-[#0A090D] rounded-[4px] flex w-16 items-center justify-end pr-[8px]"
                  style={{
                    boxShadow: "inset 0 -1px 3px rgba(13,13,15,0.8), inset -1px 0 3px rgba(13,13,15,0.8)",
                  }}
                >
                  <span className="text-[9px] text-white/80">delete</span>
                </div>
              </KeyWrapper>
            </div>

            {/* QWERTY Row */}
            <div className="flex gap-[3px] mb-[3px] w-full">
              <KeyWrapper keyValue="tab">
                <div
                  className="h-10 bg-[#0A090D] rounded-[4px] flex w-16 items-center justify-start pl-[8px]"
                  style={{
                    boxShadow: "inset 0 -1px 3px rgba(13,13,15,0.8), inset -1px 0 3px rgba(13,13,15,0.8)",
                  }}
                >
                  <span className="text-[9px] text-white/80">tab</span>
                </div>
              </KeyWrapper>
              {["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"].map((letter) => (
                <KeyWrapper key={letter} keyValue={letter}>
                  <div
                    className="h-10 w-10 bg-[#0A090D] rounded-[4px] flex items-center justify-center"
                    style={{
                      boxShadow: "inset 0 -1px 3px rgba(13,13,15,0.8), inset -1px 0 3px rgba(13,13,15,0.8)",
                    }}
                  >
                    <span className="text-[11px] text-white/90 font-medium uppercase">{letter}</span>
                  </div>
                </KeyWrapper>
              ))}
              {[
                { top: "{", bottom: "[" },
                { top: "}", bottom: "]" },
                { top: "|", bottom: "\\" },
              ].map((key, i) => (
                <KeyWrapper key={i} keyValue={key.bottom}>
                  <div
                    className="h-10 w-10 bg-[#0A090D] rounded-[4px] flex items-center justify-center flex-col"
                    style={{
                      boxShadow: "inset 0 -1px 3px rgba(13,13,15,0.8), inset -1px 0 3px rgba(13,13,15,0.8)",
                    }}
                  >
                    <span className="text-[8px] text-white/60 leading-tight">{key.top}</span>
                    <span className="text-[10px] text-white/90 leading-tight">{key.bottom}</span>
                  </div>
                </KeyWrapper>
              ))}
            </div>

            {/* ASDF Row */}
            <div className="flex gap-[3px] mb-[3px] w-full">
              <KeyWrapper keyValue="caps">
                <div
                  className="h-10 bg-[#0A090D] rounded-[4px] flex w-[4.5rem] items-center justify-start pl-[8px]"
                  style={{
                    boxShadow: "inset 0 -1px 3px rgba(13,13,15,0.8), inset -1px 0 3px rgba(13,13,15,0.8)",
                  }}
                >
                  <span className="text-[9px] text-white/80">caps lock</span>
                </div>
              </KeyWrapper>
              {["a", "s", "d", "f", "g", "h", "j", "k", "l"].map((letter) => (
                <KeyWrapper key={letter} keyValue={letter}>
                  <div
                    className="h-10 w-10 bg-[#0A090D] rounded-[4px] flex items-center justify-center"
                    style={{
                      boxShadow: "inset 0 -1px 3px rgba(13,13,15,0.8), inset -1px 0 3px rgba(13,13,15,0.8)",
                    }}
                  >
                    <span className="text-[11px] text-white/90 font-medium uppercase">{letter}</span>
                  </div>
                </KeyWrapper>
              ))}
              {[
                { top: ":", bottom: ";" },
                { top: '"', bottom: "'" },
              ].map((key, i) => (
                <KeyWrapper key={i} keyValue={key.bottom}>
                  <div
                    className="h-10 w-10 bg-[#0A090D] rounded-[4px] flex items-center justify-center flex-col"
                    style={{
                      boxShadow: "inset 0 -1px 3px rgba(13,13,15,0.8), inset -1px 0 3px rgba(13,13,15,0.8)",
                    }}
                  >
                    <span className="text-[8px] text-white/60 leading-tight">{key.top}</span>
                    <span className="text-[10px] text-white/90 leading-tight">{key.bottom}</span>
                  </div>
                </KeyWrapper>
              ))}
              <KeyWrapper keyValue="return">
                <div
                  className="h-10 bg-[#0A090D] rounded-[4px] flex w-[4.5rem] items-center justify-end pr-[8px]"
                  style={{
                    boxShadow: "inset 0 -1px 3px rgba(13,13,15,0.8), inset -1px 0 3px rgba(13,13,15,0.8)",
                  }}
                >
                  <span className="text-[9px] text-white/80">return</span>
                </div>
              </KeyWrapper>
            </div>

            {/* ZXCV Row */}
            <div className="flex gap-[3px] mb-[3px] w-full">
              <KeyWrapper keyValue="shift">
                <div
                  className="h-10 bg-[#0A090D] rounded-[4px] flex w-[5.8rem] items-center justify-start pl-[8px]"
                  style={{
                    boxShadow: "inset 0 -1px 3px rgba(13,13,15,0.8), inset -1px 0 3px rgba(13,13,15,0.8)",
                  }}
                >
                  <span className="text-[9px] text-white/80">shift</span>
                </div>
              </KeyWrapper>
              {["z", "x", "c", "v", "b", "n", "m"].map((letter) => (
                <KeyWrapper key={letter} keyValue={letter}>
                  <div
                    className="h-10 w-10 bg-[#0A090D] rounded-[4px] flex items-center justify-center"
                    style={{
                      boxShadow: "inset 0 -1px 3px rgba(13,13,15,0.8), inset -1px 0 3px rgba(13,13,15,0.8)",
                    }}
                  >
                    <span className="text-[11px] text-white/90 font-medium uppercase">{letter}</span>
                  </div>
                </KeyWrapper>
              ))}
              {[
                { top: "<", bottom: "," },
                { top: ">", bottom: "." },
                { top: "?", bottom: "/" },
              ].map((key, i) => (
                <KeyWrapper key={i} keyValue={key.bottom}>
                  <div
                    className="h-10 w-10 bg-[#0A090D] rounded-[4px] flex items-center justify-center flex-col"
                    style={{
                      boxShadow: "inset 0 -1px 3px rgba(13,13,15,0.8), inset -1px 0 3px rgba(13,13,15,0.8)",
                    }}
                  >
                    <span className="text-[8px] text-white/60 leading-tight">{key.top}</span>
                    <span className="text-[10px] text-white/90 leading-tight">{key.bottom}</span>
                  </div>
                </KeyWrapper>
              ))}
              <KeyWrapper keyValue="shift2">
                <div
                  className="h-10 bg-[#0A090D] rounded-[4px] flex w-[5.8rem] items-center justify-end pr-[8px]"
                  style={{
                    boxShadow: "inset 0 -1px 3px rgba(13,13,15,0.8), inset -1px 0 3px rgba(13,13,15,0.8)",
                  }}
                >
                  <span className="text-[9px] text-white/80">shift</span>
                </div>
              </KeyWrapper>
            </div>

            {/* Bottom Row */}
            <div className="flex gap-[3px] w-full items-end">
              <KeyWrapper keyValue="fn">
                <div
                  className="h-10 w-10 bg-[#0A090D] rounded-[4px] flex items-end justify-start pl-[6px] pb-[4px]"
                  style={{
                    boxShadow: "inset 0 -1px 3px rgba(13,13,15,0.8), inset -1px 0 3px rgba(13,13,15,0.8)",
                  }}
                >
                  <span className="text-[9px] text-white/80">fn</span>
                </div>
              </KeyWrapper>
              <KeyWrapper keyValue="control">
                <div
                  className="h-10 w-10 bg-[#0A090D] rounded-[4px] flex items-end justify-center pb-[4px]"
                  style={{
                    boxShadow: "inset 0 -1px 3px rgba(13,13,15,0.8), inset -1px 0 3px rgba(13,13,15,0.8)",
                  }}
                >
                  <span className="text-[8px] text-white/80">control</span>
                </div>
              </KeyWrapper>
              <KeyWrapper keyValue="option">
                <div
                  className="h-10 w-10 bg-[#0A090D] rounded-[4px] flex items-end justify-center pb-[4px]"
                  style={{
                    boxShadow: "inset 0 -1px 3px rgba(13,13,15,0.8), inset -1px 0 3px rgba(13,13,15,0.8)",
                  }}
                >
                  <span className="text-[8px] text-white/80">option</span>
                </div>
              </KeyWrapper>
              <KeyWrapper keyValue="command">
                <div
                  className="h-10 w-14 bg-[#0A090D] rounded-[4px] flex items-end justify-center pb-[4px]"
                  style={{
                    boxShadow: "inset 0 -1px 3px rgba(13,13,15,0.8), inset -1px 0 3px rgba(13,13,15,0.8)",
                  }}
                >
                  <span className="text-[8px] text-white/80">⌘ cmd</span>
                </div>
              </KeyWrapper>
              <KeyWrapper keyValue=" ">
                <div
                  className="h-10 bg-[#0A090D] rounded-[4px] flex items-center justify-center w-[13rem]"
                  style={{
                    boxShadow: "inset 0 -1px 3px rgba(13,13,15,0.8), inset -1px 0 3px rgba(13,13,15,0.8)",
                  }}
                />
              </KeyWrapper>
              <KeyWrapper keyValue="command2">
                <div
                  className="h-10 w-14 bg-[#0A090D] rounded-[4px] flex items-end justify-center pb-[4px]"
                  style={{
                    boxShadow: "inset 0 -1px 3px rgba(13,13,15,0.8), inset -1px 0 3px rgba(13,13,15,0.8)",
                  }}
                >
                  <span className="text-[8px] text-white/80">⌘ cmd</span>
                </div>
              </KeyWrapper>
              <KeyWrapper keyValue="option2">
                <div
                  className="h-10 w-10 bg-[#0A090D] rounded-[4px] flex items-end justify-center pb-[4px]"
                  style={{
                    boxShadow: "inset 0 -1px 3px rgba(13,13,15,0.8), inset -1px 0 3px rgba(13,13,15,0.8)",
                  }}
                >
                  <span className="text-[8px] text-white/80">option</span>
                </div>
              </KeyWrapper>

              {/* Arrow Keys */}
              <div className="flex flex-col gap-[2px] ml-1">
                <KeyWrapper keyValue="up">
                  <div
                    className="bg-[#0A090D] rounded-[4px] flex items-center justify-center w-10 h-[19px]"
                    style={{
                      boxShadow: "inset 0 -1px 3px rgba(13,13,15,0.8), inset -1px 0 3px rgba(13,13,15,0.8)",
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3 text-white/80">
                      <path d="M12 8l6 6H6z" />
                    </svg>
                  </div>
                </KeyWrapper>
                <div className="flex gap-[2px]">
                  <KeyWrapper keyValue="left">
                    <div
                      className="bg-[#0A090D] rounded-[4px] flex items-center justify-center w-10 h-[19px]"
                      style={{
                        boxShadow: "inset 0 -1px 3px rgba(13,13,15,0.8), inset -1px 0 3px rgba(13,13,15,0.8)",
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3 text-white/80">
                        <path d="M14 6l-6 6 6 6z" />
                      </svg>
                    </div>
                  </KeyWrapper>
                  <KeyWrapper keyValue="down">
                    <div
                      className="bg-[#0A090D] rounded-[4px] flex items-center justify-center w-10 h-[19px]"
                      style={{
                        boxShadow: "inset 0 -1px 3px rgba(13,13,15,0.8), inset -1px 0 3px rgba(13,13,15,0.8)",
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3 text-white/80">
                        <path d="M12 16l-6-6h12z" />
                      </svg>
                    </div>
                  </KeyWrapper>
                  <KeyWrapper keyValue="right">
                    <div
                      className="bg-[#0A090D] rounded-[4px] flex items-center justify-center w-10 h-[19px]"
                      style={{
                        boxShadow: "inset 0 -1px 3px rgba(13,13,15,0.8), inset -1px 0 3px rgba(13,13,15,0.8)",
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3 text-white/80">
                        <path d="M10 6l6 6-6 6z" />
                      </svg>
                    </div>
                  </KeyWrapper>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MacBookKeyboard;
