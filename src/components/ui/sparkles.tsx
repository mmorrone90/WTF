"use client";
import React, { useEffect, useRef } from "react";
import { cn } from "../../utils/cn";

export const SparklesCore = ({
  id,
  className,
  background,
  minSize,
  maxSize,
  speed,
  particleColor,
  particleDensity,
}: {
  id: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<any[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const createParticles = () => {
      const particles = [];
      const density = particleDensity || 50;
      const colors = [particleColor || "#E6FB04", "#3A30FA", "#FFFFFF"];
      
      for (let i = 0; i < density; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * ((maxSize || 2) - (minSize || 0.5)) + (minSize || 0.5);
        const opacity = Math.random();
        const speedFactor = (speed || 1) * (Math.random() * 0.5 + 0.5);
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push({ x, y, size, opacity, speedFactor, color });
      }
      return particles;
    };

    particlesRef.current = createParticles();

    const render = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (background) {
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      particlesRef.current.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, "0")}`;
        ctx.fill();

        particle.y -= 0.8 * particle.speedFactor;
        particle.opacity -= 0.003;

        if (particle.opacity <= 0 || particle.y < -20) {
          particle.y = canvas.height + 20;
          particle.x = Math.random() * canvas.width;
          particle.opacity = 1;
        }
      });

      requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [background, maxSize, minSize, particleColor, particleDensity, speed]);

  return (
    <canvas
      ref={canvasRef}
      id={id}
      className={cn("", className)}
    />
  );
}; 