"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  inView?: boolean;
}

export default function BlurFade({
  children,
  className,
  delay = 0,
  inView = false,
}: BlurFadeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={inView ? { opacity: 1, filter: "blur(0px)" } : {}}
      transition={{
        delay,
        duration: 0.5,
        ease: "easeOut",
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
} 