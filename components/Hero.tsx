"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 30, stiffness: 200 };
  const maskX = useSpring(mouseX, springConfig);
  const maskY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    const container = containerRef.current;
    container?.addEventListener("mousemove", handleMouseMove);
    return () => container?.removeEventListener("mousemove", handleMouseMove);
  }, [isTouchDevice, mouseX, mouseY]);

  const maskImage = useTransform(
    [maskX, maskY],
    ([x, y]) => `radial-gradient(circle 200px at ${x}px ${y}px, black 0%, transparent 100%)`
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#FAFAFA]"
    >
      {/* Light theme layer (default) */}
      <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="max-w-6xl"
        >
          <p className="text-sm md:text-base text-[#1A1A1A]/60 mb-6 tracking-wide">
            Creative Director & Visual Designer
          </p>
          
          <h1 className="text-[clamp(2.5rem,8vw,7rem)] leading-[0.95] tracking-tight text-[#1A1A1A]">
            Crafting visual
            <br />
            narratives that
            <br />
            <span className="italic font-serif">resonate</span>.
          </h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5, duration: 0.8 }}
            className="mt-12 flex items-center gap-6"
          >
            <Link
              href="/projects"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-[#1A1A1A] text-white rounded-xl hover:bg-[#333] transition-colors duration-300"
              data-cursor="pointer"
            >
              <span>View Work</span>
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
            
            <Link
              href="/contact"
              className="text-[#1A1A1A]/70 hover:text-[#1A1A1A] transition-colors duration-300"
              data-cursor="pointer"
            >
              Get in touch →
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Dark theme mask layer (cursor reveal) */}
      {!isTouchDevice && (
        <motion.div
          className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 lg:px-24 pointer-events-none"
          style={{
            background: "#1A1A1A",
            maskImage,
            WebkitMaskImage: maskImage,
          }}
        >
          <div className="max-w-6xl">
            <p className="text-sm md:text-base text-white/60 mb-6 tracking-wide">
              Creative Director & Visual Designer
            </p>
            
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
        </motion.div>
      )}

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 0.8 }}
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
