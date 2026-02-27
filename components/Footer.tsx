"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-20 px-6 md:px-12 lg:px-24 bg-[#1A1A1A] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 mb-20">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6">
              Let&apos;s create
              <br />
              something
              <br />
              <span className="italic font-serif">together</span>.
            </h2>
            
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#1A1A1A] rounded-xl hover:bg-[#FAFAFA] transition-colors duration-300 mt-4"
              data-cursor="pointer"
            >
              <span>Start a project</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>

          {/* Right column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
            className="flex flex-col justify-between"
          >
            <div className="space-y-8">
              <div>
                <p className="text-white/40 text-sm mb-2 tracking-wider uppercase">Email</p>
                <a
                  href="mailto:hello@mizolla.studio"
                  className="text-lg hover:text-white/80 transition-colors"
                  data-cursor="pointer"
                >
                  hello@mizolla.studio
                </a>
              </div>

              <div>
                <p className="text-white/40 text-sm mb-2 tracking-wider uppercase">Social</p>
                <div className="flex gap-6">
                  {["Instagram", "Twitter", "LinkedIn", "Behance"].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="text-white/70 hover:text-white transition-colors"
                      data-cursor="pointer"
                    >
                      {social}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-white/40 text-sm">© 2024 Mizolla. All rights reserved.</p>
          
          <div className="flex gap-6 text-sm text-white/40"
          >
            <Link href="/" className="hover:text-white/70 transition-colors" data-cursor="pointer">Home</Link>
            <Link href="/about" className="hover:text-white/70 transition-colors" data-cursor="pointer">About</Link>
            <Link href="/projects" className="hover:text-white/70 transition-colors" data-cursor="pointer">Work</Link>
            <Link href="/contact" className="hover:text-white/70 transition-colors" data-cursor="pointer">Contact</Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
