"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface TrailPoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
  time: number;
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const maskCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [maskUrl, setMaskUrl] = useState("");
  
  const trailRef = useRef<TrailPoint[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>();

  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
    const timer = setTimeout(() => setIsLoaded(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Render fluid trail to mask canvas
  const renderMask = useCallback(() => {
    const canvas = maskCanvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    // Set canvas size
    if (canvas.width !== rect.width * dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
    }

    const now = Date.now();
    const trail = trailRef.current;

    // Clear with fade for trail persistence
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
    ctx.fillRect(0, 0, rect.width, rect.height);

    if (trail.length >= 2) {
      for (let i = 1; i < trail.length; i++) {
        const curr = trail[i];
        const prev = trail[i - 1];
        const age = now - curr.time;
        
        if (age > 600) continue;

        const life = 1 - age / 600;
        const velocity = Math.sqrt(curr.vx * curr.vx + curr.vy * curr.vy);
        const speed = Math.min(velocity / 15, 1);
        
        // Width: thick at head, tapering to thin tail
        const maxWidth = 60 + speed * 50;
        const width = maxWidth * life * life;
        
        if (width < 2) continue;

        // Draw soft white blob
        const gradient = ctx.createRadialGradient(
          curr.x, curr.y, 0,
          curr.x, curr.y, width
        );
        
        const alpha = life * 0.95;
        gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
        gradient.addColorStop(0.5, `rgba(255, 255, 255, ${alpha * 0.5})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(curr.x, curr.y, width, 0, Math.PI * 2);
        ctx.fill();

        // Connect points
        const dist = Math.hypot(curr.x - prev.x, curr.y - prev.y);
        if (dist > 2 && dist < 100) {
          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(curr.x, curr.y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.4})`;
          ctx.lineWidth = width * 0.7;
          ctx.lineCap = "round";
          ctx.stroke();
        }
      }

      // Bright head
      const head = trail[trail.length - 1];
      if (head) {
        const headGrad = ctx.createRadialGradient(
          head.x, head.y, 0,
          head.x, head.y, 80
        );
        headGrad.addColorStop(0, "rgba(255, 255, 255, 1)");
        headGrad.addColorStop(0.4, "rgba(255, 255, 255, 0.7)");
        headGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
        
        ctx.fillStyle = headGrad;
        ctx.beginPath();
        ctx.arc(head.x, head.y, 80, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Clean old points
    trailRef.current = trail.filter(p => now - p.time < 600);

    // Update mask URL
    setMaskUrl(canvas.toDataURL());
  }, []);

  // Animation loop
  useEffect(() => {
    if (isTouchDevice) return;

    const animate = () => {
      renderMask();
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isTouchDevice, renderMask]);

  // Mouse tracking
  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const vx = x - mouseRef.current.x;
      const vy = y - mouseRef.current.y;
      
      mouseRef.current.x = x;
      mouseRef.current.y = y;

      trailRef.current.push({ x, y, vx, vy, time: Date.now() });

      if (trailRef.current.length > 25) {
        trailRef.current.shift();
      }
    };

    containerRef.current?.addEventListener("mousemove", handleMouseMove);

    return () => {
      containerRef.current?.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isTouchDevice]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#FAFAFA]"
    >
      {/* Light theme layer */}
      <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 lg:px-24">
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
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-12 flex items-center gap-6"
          >
            <Link href="/projects" className="group inline-flex items-center gap-3 px-8 py-4 bg-[#1A1A1A] text-white rounded-xl hover:bg-[#333] transition-colors" data-cursor="pointer">
              <span>View Work</span>
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            
            <Link href="/contact" className="text-[#1A1A1A]/70 hover:text-[#1A1A1A] transition-colors" data-cursor="pointer">
              Get in touch →
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Dark theme layer with canvas mask */}
      {!isTouchDevice && (
        <>
          {/* Hidden canvas for mask generation */}
          <canvas
            ref={maskCanvasRef}
            className="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
          />
          
          {/* Dark theme content with dynamic mask */}
          <div
            className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 lg:px-24 pointer-events-none"
            style={{
              background: "#1A1A1A",
              maskImage: maskUrl ? `url(${maskUrl})` : undefined,
              WebkitMaskImage: maskUrl ? `url(${maskUrl})` : undefined,
              maskSize: "cover",
              WebkitMaskSize: "cover",
            }}
          >
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
                <span className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#1A1A1A] rounded-xl">
                  View Work
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <span className="text-white/70">Get in touch →</span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-[#1A1A1A]/40 tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-[#1A1A1A]/20"
        />
      </motion.div>
    </section>
  );
}
