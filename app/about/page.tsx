"use client";

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

export default function AboutPage() {
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
            <p className="text-sm text-[#1A1A1A]/50 mb-6 tracking-widest uppercase">About</p>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight mb-12">
              A creative director
              <br />
              and visual designer
              <br />
              based in <span className="italic font-serif">New York</span>.
            </h1>
            
            <div className="grid md:grid-cols-2 gap-12 mt-16">
              <div>
                <p className="text-lg leading-relaxed text-[#1A1A1A]/80 mb-6">
                  I specialize in creating visual narratives that bridge the gap between brand identity and human emotion. With over a decade of experience working with luxury fashion houses, tech startups, and cultural institutions, I bring a unique perspective to every project.
                </p>
                <p className="font-serif text-[#1A1A1A]/70 leading-relaxed">
                  My approach is rooted in the belief that great design should feel inevitable—like it could never have existed any other way. This philosophy guides every decision, from typography to motion to the spaces between.
                </p>
              </div>
              
              <div className="space-y-8">
                <div>
                  <p className="text-sm text-[#1A1A1A]/40 mb-2 tracking-wider uppercase">Services</p>
                  <ul className="space-y-2">
                    {["Art Direction", "Brand Identity", "Visual Design", "Campaign Development", "Creative Strategy"].map((service) => (
                      <li key={service} className="text-[#1A1A1A]/80">{service}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <p className="text-sm text-[#1A1A1A]/40 mb-2 tracking-wider uppercase">Clients</p>
                  <ul className="space-y-2">
                    {["Hermès", "Nike", "Apple", "Vogue", "The New York Times"].map((client) => (
                      <li key={client} className="text-[#1A1A1A]/80">{client}</li>
                    ))}
                  </ul>
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
