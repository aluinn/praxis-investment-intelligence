"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

/** Eases a large image into place as it scrolls into view. */
export function ScrollImage({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.35"] });
  const eased = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.6 });
  const scale = useTransform(eased, [0, 1], [0.94, 1]);
  const y = useTransform(eased, [0, 1], [48, 0]);
  const opacity = useTransform(eased, [0, 0.5], [0.3, 1]);
  return (
    <motion.div ref={ref} className={className} style={reduce ? undefined : { scale, y, opacity }}>
      {children}
    </motion.div>
  );
}
