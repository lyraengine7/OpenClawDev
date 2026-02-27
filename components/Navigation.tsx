"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";

const navItems = [
  { label: "Work", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.8, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        scrolled ? "top-4" : "top-6"
      }`}
    >
      <div
        className={`flex items-center gap-1 px-2 py-2 rounded-full transition-all duration-500 ${
          scrolled
            ? "bg-[#1A1A1A]/90 backdrop-blur-md shadow-lg"
            : "bg-[#1A1A1A]"
        }`}
      >
        {navItems.map((item, index) => (
          <Link
            key={item.label}
            href={item.href}
            className="px-5 py-2 text-sm text-white/90 hover:text-white transition-colors duration-300 rounded-full hover:bg-white/10"
            data-cursor="pointer"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </motion.nav>
  );
}
