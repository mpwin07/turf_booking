import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export function PremiumButton({ children, to, href, variant = "primary", className = "", icon = true, ...props }) {
  const base =
    "group relative inline-flex min-h-12 items-center justify-center overflow-hidden rounded-md px-6 py-3 text-sm font-black uppercase tracking-normal transition";
  const styles =
    variant === "ghost"
      ? "border border-line/60 bg-black/40 text-line hover:border-line hover:shadow-neon"
      : "bg-line text-black shadow-neon hover:shadow-[0_0_36px_rgba(255,213,0,0.48)]";
  const content = (
    <>
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition duration-700 group-hover:translate-x-full" />
      <span className="relative flex items-center gap-2">
        {children}
        {icon && <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />}
      </span>
    </>
  );

  const motionProps = {
    whileHover: { scale: 1.04 },
    whileTap: { scale: 0.97 },
    className: `${base} ${styles} ${className}`,
    ...props
  };

  if (to) {
    return (
      <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
        <Link to={to} className={`${base} ${styles} ${className}`} {...props}>
          {content}
        </Link>
      </motion.div>
    );
  }

  if (href) {
    return (
      <motion.a href={href} {...motionProps}>
        {content}
      </motion.a>
    );
  }

  return <motion.button {...motionProps}>{content}</motion.button>;
}
