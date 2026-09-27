"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Project } from "@/lib/types";

interface WorkClientProps {
  projects: Project[];
}

export const WorkClient: React.FC<WorkClientProps> = ({ projects }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-12">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2 pb-4 border-b border-[#E4E3DC]">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 text-xs font-mono rounded-full transition-all duration-200 ${
              selectedCategory === cat
                ? "bg-[#111418] text-white shadow-subtle"
                : "bg-white text-[#5F6978] hover:text-[#111418] border border-[#E4E3DC]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project, idx) => (
          <div
            key={project.id}
            className="group bg-white border border-[#E4E3DC] hover:border-[#111418]/30 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-subtle hover:shadow-editorial"
          >
            <div className="space-y-5">
              {/* Thumbnail */}
              <Link
                href={`/work/${project.slug}`}
                className="block relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-[#E4E3DC] bg-[#FAF9F6]"
              >
                <Image
                  src={project.thumbnail || "/images/nuclear-pleomorphism.jpg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </Link>

              {/* Badges */}
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-0.5 text-[11px] font-mono bg-[#F4F3EE] text-[#111418] rounded border border-[#E4E3DC]">
                  {project.category}
                </span>
                <span className="text-xs font-mono text-[#8C96A5]">{project.year}</span>
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-serif font-medium text-[#111418] tracking-tight">
                <Link href={`/work/${project.slug}`} className="hover:underline">
                  {project.title}
                </Link>
              </h3>

              <p className="text-sm text-[#5F6978] leading-relaxed line-clamp-3">
                {project.shortDescription}
              </p>

              {/* Metrics */}
              {project.metrics && project.metrics.length > 0 && (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {project.metrics.slice(0, 2).map((m, mIdx) => (
                    <div key={mIdx} className="p-2.5 bg-[#FAF9F6] border border-[#E4E3DC] rounded-lg">
                      <div className="text-sm font-serif font-semibold text-[#111418]">
                        {m.value}
                      </div>
                      <div className="text-[10px] font-mono text-[#5F6978] mt-0.5 truncate">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Tech and Action */}
            <div className="pt-6 mt-6 border-t border-[#E4E3DC] flex items-center justify-between gap-4">
              <div className="flex flex-wrap gap-1">
                {project.technologies.slice(0, 3).map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10px] font-mono text-[#8C96A5] bg-[#FAF9F6] px-2 py-0.5 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <Link
                href={`/work/${project.slug}`}
                className="inline-flex items-center gap-1 text-xs font-mono font-medium text-[#111418] group-hover:text-blue-600 transition-colors"
              >
                <span>Case Study</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
