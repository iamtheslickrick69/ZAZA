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
            Data Collection & Integration
          </motion.span>
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Collect Every Customer Touchpoint
          </motion.h2>
          <motion.p
            className="max-w-2xl text-lg text-muted-foreground mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Most businesses lose 60% of their data because tools don't talk. We build systems that capture <span className="font-semibold text-foreground">EVERYTHING</span>—so you can actually make data-driven decisions.
          </motion.p>

          {/* Data Types Grid */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            {[
              { icon: "👥", label: "Customer Data" },
              { icon: "💳", label: "Payment Data" },
              { icon: "📊", label: "Marketing Data" },
              { icon: "📦", label: "Product Data" }
            ].map((item, idx) => (
              <motion.div
                key={item.label}
                className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border bg-card/50 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-3xl">{item.icon}</span>
                <span className="text-sm font-medium text-foreground">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            className="text-base text-muted-foreground font-medium"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9 }}
          >
            → All in <span className="text-foreground font-bold">ONE PLACE</span>
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
