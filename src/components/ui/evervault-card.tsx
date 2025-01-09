import { cn } from "../../utils/cn";
import React, { useEffect, useRef, useState } from "react";

export const EvervaultCard = ({
  text,
  children,
  className,
}: {
  text?: string;
  children?: React.ReactNode;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      const rotateX = ((mouseY - centerY) / (rect.height / 2)) * 20;
      const rotateY = ((mouseX - centerX) / (rect.width / 2)) * 20;

      setRotationX(-rotateX);
      setRotationY(rotateY);
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", () => {
      setRotationX(0);
      setRotationY(0);
    });

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", () => {
        setRotationX(0);
        setRotationY(0);
      });
    };
  }, []);

  const style = {
    transform: `perspective(1000px) rotateX(${rotationX}deg) rotateY(${rotationY}deg) scale3d(1, 1, 1)`,
    transition: "all 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s",
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative group/card w-full h-full p-px rounded-lg overflow-hidden",
        className
      )}
      style={style}
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-slate-800 to-neutral-900" />
        <div className="absolute inset-0 opacity-0 mix-blend-overlay group-hover/card:opacity-100 transition-opacity" />
        <div className="absolute rounded-lg inset-0 opacity-0 group-hover/card:opacity-100 bg-slate-800/[0.1] transition-opacity" />
      </div>

      <div className="relative bg-neutral-900 rounded-lg h-full p-4">
        {text && (
          <span className="inline-block text-base text-slate-500 mb-4">
            {text}
          </span>
        )}
        {children}
      </div>
    </div>
  );
}; 