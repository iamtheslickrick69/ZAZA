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
        <div className="text-center mb-12">
          <motion.span
            className="text-sm font-medium tracking-wider uppercase mb-4 block"
            style={{
              background: 'linear-gradient(90deg, #6b7280, #6b7280)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Seamless Integrations
          </motion.span>
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Connect Everything
          </motion.h2>
          <motion.p
            className="max-w-2xl text-lg text-muted-foreground mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Your Smart Site integrates with any tool, platform, or API your business needs.
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <DatabaseWithRestApi
            circleText="API"
            title="We connect to any API you need"
            buttonTexts={{ first: "Haestus", second: "Your Stack" }}
            badgeTexts={{
              first: "GET",
              second: "POST",
              third: "PUT",
              fourth: "DELETE",
              fifth: "PATCH",
              sixth: "HEAD",
              seventh: "WS",
              eighth: "GQL"
            }}
            lightColor="#6b7280"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default SeamlessIntegrations;
