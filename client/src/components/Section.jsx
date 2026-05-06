import { motion } from "framer-motion";
import React from "react";

export function Section({ id, eyebrow, title, children, className = "" }) {
  return (
    <section id={id} className={`relative scroll-mt-24 px-4 py-20 sm:py-28 ${className}`}>
      <motion.div
        className="mx-auto max-w-7xl"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
      >
        <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-line">{eyebrow}</p>
        <h2 className="mb-10 max-w-4xl font-display text-4xl uppercase leading-none sm:text-6xl">
          {title}
        </h2>
        {children}
      </motion.div>
    </section>
  );
}


