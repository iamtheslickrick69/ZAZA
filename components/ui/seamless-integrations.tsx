"use client";

import { motion } from "framer-motion";
import DatabaseWithRestApi from "@/components/ui/database-with-rest-api";

export function SeamlessIntegrations() {
  return (
    <section className="w-full bg-background py-20">
      <motion.div
        className="w-full flex flex-col items-center justify-center px-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Title at top */}
        <div className="text-center mb-8">
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            AEO is the new SEO
          </motion.h2>
        </div>

        {/* Icons + YOUR SITE container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <DatabaseWithRestApi
            circleText=""
            title="YOUR SITE"
            buttonTexts={{ first: "", second: "" }}
            badgeTexts={{
              first: "ChatGPT",
              second: "Perplexity",
              third: "Claude",
              fourth: "Gemini",
              fifth: "Copilot",
              sixth: "Grok"
            }}
            lightColor="#00a8cc"
            showImage
            imageSrc="/yo.png"
          />
        </motion.div>

        {/* Subtitle at bottom */}
        <motion.p
          className="max-w-2xl text-base md:text-lg text-muted-foreground mx-auto text-center mt-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          AI has completely changed the game. Make platforms redirect back to you instead of your competition.
        </motion.p>
      </motion.div>
    </section>
  );
}

export default SeamlessIntegrations;
