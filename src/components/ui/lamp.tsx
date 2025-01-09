import React from "react";
import { cn } from "../../utils/cn";
import { motion } from "framer-motion";

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex min-h-[400px] flex-col items-center justify-center overflow-hidden bg-background w-full rounded-md z-0",
        className
      )}
    >
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--neon-yellow) 0deg, transparent 360deg)`,
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-hidden bg-gradient-to-r from-transparent to-neon-yellow blur-2xl"
        />
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--neon-yellow) 0deg, transparent 360deg)`,
          }}
          className="absolute inset-auto left-1/2 h-56 overflow-hidden bg-gradient-to-l from-transparent to-neon-yellow blur-2xl"
        />
        {children}
      </div>
    </div>
  );
}; 