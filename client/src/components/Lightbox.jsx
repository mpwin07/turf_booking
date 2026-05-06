import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import React from "react";
import { SmartImage } from "./SmartImage";

export function Lightbox({ item, onClose }) {
  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-black"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              aria-label="Close preview"
              className="absolute right-4 top-4 z-10 rounded-full bg-black/70 p-3 text-white transition hover:bg-line hover:text-black"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </button>
            <SmartImage
              src={item.image}
              fallback={item.fallback}
              alt={item.title}
              className="max-h-[78vh] w-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black p-6">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-line">{item.type}</p>
              <h3 className="font-display text-4xl uppercase">{item.title}</h3>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


