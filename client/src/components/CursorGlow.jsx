import { motion, useMotionValue, useSpring } from "framer-motion";
import React, { useEffect } from "react";

export function CursorGlow() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const springX = useSpring(x, { stiffness: 120, damping: 28 });
  const springY = useSpring(y, { stiffness: 120, damping: 28 });

  useEffect(() => {
    const onMove = (event) => {
      x.set(event.clientX - 160);
      y.set(event.clientY - 160);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed z-[60] hidden h-80 w-80 rounded-full bg-line/10 blur-3xl lg:block"
      style={{ x: springX, y: springY }}
    />
  );
}
