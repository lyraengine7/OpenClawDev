"use client";

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";

const allProjects = [
  {
    id: 1,
    title: "Hermès",
    subtitle: "Visual Storytelling Campaign",
    description: "A comprehensive ad campaign exploring character development and visual narrative through meticulous style sheets and art direction.",
    category: "Campaign / Art Direction",
    year: "2024",
    color: "#E8D5C4",
  },
  {
    id: 2,
    title: "Nike",
    subtitle: "Urban Archeology",
    description: "Mineral-knit athlete concept blending geological textures with high-performance sportswear. A study in material innovation.",
    category: "Concept / Product",
    year: "2024",
    color: "#D4E4E0",
  },
  {
    id: 3,
    title: "5/5",
    subtitle: "Event Branding",
    description: "Circularity and mutual exchange visualized through geometric precision. A logo system that breathes and adapts.",
    category: "Identity / Event",
    year: "2023",
    color: "#E4D4E0",
  },
  {
    id: 4,
    title: "Vogue",
    subtitle: "Editorial Redesign",
    description: "Digital-first editorial experience reimagining how fashion stories are told in the modern age.",
    category: "Editorial / Digital",
    year: "2023",
    color: "#F0E4D4",
  },
  {
    id: 5,
    title: "Aesop",
    subtitle: "Spatial Identity",
    description: "Environmental graphics and wayfinding system for flagship retail locations.",
    category: "Spatial / Identity",
    year: "2023",
    color: "#E0E4D4",
  },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <Navigation />
      
      <section className="pt-40 pb-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="mb-20"
          >
            <p className="text-sm text-[#1A1A1A]/50 mb-6 tracking-widest uppercase">All Projects</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight">
              Selected work
              <br />
              from <span className="italic font-serif">2020—2024</span>.
            </h1>
          </motion.div>

          <div className="space-y-6">
            {allProjects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: [0.76, 0, 0.24, 1],
                }}
              >
                <Link
                  href={`/projects/${project.id}`}
                  className="group block"
                  data-cursor="pointer"
                >
                  <div className="grid md:grid-cols-12 gap-6 p-6 md:p-8 rounded-2xl hover:bg-[#F5F5F5] transition-colors duration-500 items-center">
                    <div className="md:col-span-1">
                      <span className="text-sm text-[#1A1A1A]/40">0{index + 1}</span>
                    </div>
                    
                    <div className="md:col-span-4">
                      <div
                        className="aspect-[16/10] rounded-lg"
                        style={{ backgroundColor: project.color }}
                      />
                    </div>
                    
                    <div className="md:col-span-5">
                      <h3 className="text-2xl md:text-3xl tracking-tight mb-1">{project.title}</h3>
                      <p className="text-[#1A1A1A]/60">{project.subtitle}</p>
                    </div>
                    
                    <div className="md:col-span-2 flex justify-between items-center">
                      <span className="text-sm text-[#1A1A1A]/40">{project.year}</span>
                      <svg
                        className="w-5 h-5 text-[#1A1A1A]/40 group-hover:text-[#1A1A1A] transition-colors"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
