"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const projects = [
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
];

export function FeaturedWork() {
  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="flex justify-between items-end mb-20"
        >
          <div>
            <p className="text-sm text-[#1A1A1A]/50 mb-3 tracking-widest uppercase">Selected Work</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight">
              Featured
              <br />
              Projects
            </h2>
          </div>
          
          <Link
            href="/projects"
            className="hidden md:flex items-center gap-2 text-sm text-[#1A1A1A]/70 hover:text-[#1A1A1A] transition-colors"
            data-cursor="pointer"
          >
            View all projects
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>

        {/* Projects grid */}
        <div className="space-y-8">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.76, 0, 0.24, 1],
              }}
            >
              <Link
                href={`/projects/${project.id}`}
                className="group block"
                data-cursor="pointer"
              >
                <div
                  className={`grid md:grid-cols-2 gap-8 p-6 md:p-10 rounded-2xl transition-all duration-500 hover:bg-[${project.color}]`}
                  style={{ backgroundColor: index % 2 === 0 ? "#F5F5F5" : "transparent" }}
                >
                  {/* Image placeholder */}
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#E5E5E5]">
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                    >
                      <div
                        className="w-full h-full"
                        style={{ backgroundColor: project.color }}
                      />
                    </motion.div>
                    
                    {/* Project number */}
                    <div className="absolute top-4 left-4 px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full">
                      <span className="text-xs text-[#1A1A1A]/60">0{index + 1}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs text-[#1A1A1A]/50 tracking-wider uppercase">{project.category}</span>
                      <span className="w-1 h-1 rounded-full bg-[#1A1A1A]/30" />
                      <span className="text-xs text-[#1A1A1A]/50">{project.year}</span>
                    </div>

                    <h3 className="text-3xl md:text-4xl lg:text-5xl tracking-tight mb-2">
                      {project.title}
                    </h3>
                    
                    <p className="text-lg text-[#1A1A1A]/60 mb-4">{project.subtitle}</p>
                    
                    <p className="font-serif text-[#1A1A1A]/70 leading-relaxed max-w-md">
                      {project.description}
                    </p>

                    <div className="mt-8 flex items-center gap-2 text-sm text-[#1A1A1A]/60 group-hover:text-[#1A1A1A] transition-colors">
                      <span>View case study</span>
                      <motion.svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        initial={{ x: 0 }}
                        whileHover={{ x: 4 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </motion.svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
