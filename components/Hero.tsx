"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const pointsRef = useRef<Point[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>();

  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
    const timer = setTimeout(() => setIsLoaded(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    let frameCount = 0;
    
    const animate = () => {
      frameCount++;
      if (frameCount % 2 !== 0) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      const rect = container.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const points = pointsRef.current;
      if (points.length < 2) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      points.forEach(p => p.age++);
      pointsRef.current = points.filter(p => p.age < 30);

      const maxAge = 30;
      
      for (let i = 0; i < pointsRef.current.length; i++) {
        const p = pointsRef.current[i];
        const life = 1 - p.age / maxAge;
        if (life <= 0) continue;

        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const velocityWidth = Math.min(speed * 3, 40);
        const baseWidth = 30 + velocityWidth;
        const width = baseWidth * life * life;

        if (width < 1) continue;

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, width * 1.2);
        gradient.addColorStop(0, `rgba(26, 26, 26, ${life * 0.95})`);
        gradient.addColorStop(0.5, `rgba(26, 26, 26, ${life * 0.5})`);
        gradient.addColorStop(1, "rgba(26, 26, 26, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, width * 1.2, 0, Math.PI * 2);
        ctx.fill();

        if (i > 0) {
          const prev = pointsRef.current[i - 1];
          const dist = Math.hypot(p.x - prev.x, p.y - prev.y);
          if (dist > 1 && dist < 60) {
            ctx.beginPath();
            ctx.moveTo(prev.x, prev.y);
            ctx.lineTo(p.x, p.y);
            ctx.strokeStyle = `rgba(26, 26, 26, ${life * 0.6})`;
            ctx.lineWidth = width * 0.8;
            ctx.lineCap = "round";
            ctx.stroke();
          }
        }
      }

      const head = pointsRef.current[pointsRef.current.length - 1];
      if (head) {
        const headGrad = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 50);
        headGrad.addColorStop(0, "rgba(26, 26, 26, 1)");
        headGrad.addColorStop(0.5, "rgba(26, 26, 26, 0.7)");
        headGrad.addColorStop(1, "rgba(26, 26, 26, 0)");
        ctx.fillStyle = headGrad;
        ctx.beginPath();
        ctx.arc(head.x, head.y, 50, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const vx = x - mouseRef.current.x;
      const vy = y - mouseRef.current.y;
      mouseRef.current.x = x;
      mouseRef.current.y = y;
      pointsRef.current.push({ x, y, vx, vy, age: 0 });
    };

    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", resize);
      container.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isTouchDevice]);

  return (
    <section ref={containerRef} className="relative min-h-screen w-full overflow-hidden bg-[#FAFAFA]">
      <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 lg:px-24 z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 40 }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="max-w-6xl"
        >
          <p className="text-sm md:text-base text-[#1A1A1A]/60 mb-6 tracking-wide">Creative Director & Visual Designer</p>
          
          <h1 className="text-[clamp(2.5rem,8vw,7rem)] leading-[0.95] tracking-tight text-[#1A1A1A]">
            Crafting visual
            <br />
            narratives that
            <br />
            <span className="italic font-serif">resonate</span>.
          </h1>
          
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: isLoaded ? 1 : 0 }} transition={{ delay: 0.5, duration: 0.8 }} className="mt-12 flex items-center gap-6">
            <Link href="/projects" className="group inline-flex items-center gap-3 px-8 py-4 bg-[#1A1A1A] text-white rounded-xl hover:bg-[#333] transition-colors" data-cursor="pointer">
              <span>View Work</span>
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/contact" className="text-[#1A1A1A]/70 hover:text-[#1A1A1A] transition-colors" data-cursor="pointer">Get in touch →</Link>
          </motion.div>
        </motion.div>
      </div>

      {!isTouchDevice && (
        <>
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-20 pointer-events-none" />
          <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 lg:px-24 z-30 pointer-events-none mix-blend-screen">
            <div className="max-w-6xl">
              <p className="text-sm md:text-base text-white/60 mb-6 tracking-wide">Creative Director & Visual Designer</p>
              <h1 className="text-[clamp(2.5rem,8vw,7rem)] leading-[0.95] tracking-tight text-white">
                Crafting visual
                <br />
                narratives that
                <br />
                <span className="italic font-serif">resonate</span>.
              </h1>
              <div className="mt-12 flex items-center gap-6">
                <span className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#1A1A1A] rounded-xl">View Work</span>
                <span className="text-white/70">Get in touch →</span>
              </div>
            </div>
          </div>
        </>
      )}

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: isLoaded ? 1 : 0 }} transition={{ delay: 1, duration: 0.8 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-40">
        <span className="text-xs text-[#1A1A1A]/40 tracking-widest uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} className="w-px h-8 bg-[#1A1A1A]/20" />
      </motion.div>
    </section>
  );
}
