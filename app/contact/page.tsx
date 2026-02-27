"use client";

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <Navigation />
      
      <section className="pt-40 pb-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <p className="text-sm text-[#1A1A1A]/50 mb-6 tracking-widest uppercase">Contact</p>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6">
              Let&apos;s discuss
              <br />
              your <span className="italic font-serif">next project</span>.
            </h1>
            
            <p className="text-lg text-[#1A1A1A]/70 max-w-xl mb-16">
              I&apos;m currently available for select projects and collaborations. If you have a project in mind, I&apos;d love to hear about it.
            </p>

            <div className="grid md:grid-cols-2 gap-16">
              {/* Contact form */}
              <form className="space-y-6">
                <div>
                  <label className="block text-sm text-[#1A1A1A]/60 mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-[#1A1A1A]/20 focus:border-[#1A1A1A] focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-[#1A1A1A]/60 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-[#1A1A1A]/20 focus:border-[#1A1A1A] focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-[#1A1A1A]/60 mb-2">Project details</label>
                  <textarea
                    rows={4}
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-[#1A1A1A]/20 focus:border-[#1A1A1A] focus:outline-none transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="mt-8 inline-flex items-center gap-3 px-8 py-4 bg-[#1A1A1A] text-white rounded-xl hover:bg-[#333] transition-colors duration-300"
                  data-cursor="pointer"
                >
                  <span>Send message</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </form>

              {/* Contact info */}
              <div className="space-y-12">
                <div>
                  <p className="text-sm text-[#1A1A1A]/40 mb-3 tracking-wider uppercase">Email</p>
                  <a
                    href="mailto:hello@mizolla.studio"
                    className="text-xl hover:text-[#1A1A1A]/70 transition-colors"
                    data-cursor="pointer"
                  >
                    hello@mizolla.studio
                  </a>
                </div>

                <div>
                  <p className="text-sm text-[#1A1A1A]/40 mb-3 tracking-wider uppercase">Location</p>
                  <p className="text-xl">New York, NY</p>
                  <p className="text-[#1A1A1A]/60 mt-1">Available worldwide</p>
                </div>

                <div>
                  <p className="text-sm text-[#1A1A1A]/40 mb-3 tracking-wider uppercase">Social</p>
                  <div className="space-y-2">
                    {["Instagram", "Twitter", "LinkedIn", "Behance"].map((social) => (
                      <a
                        key={social}
                        href="#"
                        className="block text-lg hover:text-[#1A1A1A]/70 transition-colors"
                        data-cursor="pointer"
                      >
                        {social} →
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
