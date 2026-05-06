import { motion } from "framer-motion";
import React from "react";

export function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -18, filter: "blur(8px)" }}
      transition={{ duration: 0.42, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}


