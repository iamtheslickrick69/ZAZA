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
        <div className="text-center mb-8 flex flex-col items-center">
          <span className="inline-block px-4 py-1.5 rounded-full border border-foreground/10 bg-foreground/5 text-xs uppercase tracking-widest text-muted-foreground mb-4">
            Answer Engine Optimization
          </span>
          <motion.h2
            className="text-3xl md:text-4xl font-display text-foreground mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            AEO is the new SEO
          </motion.h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-xl">
            Get found by AI search engines before your competition does.
          </p>
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
            lightColor="#0ea5e9"
            showImage
            imageSrc="/yo.png"
          />
        </motion.div>

      </motion.div>
    </section>
  );
}

export default SeamlessIntegrations;
