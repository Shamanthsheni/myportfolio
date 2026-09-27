import React from "react";
import { Metadata } from "next";
import { getProjects, getProfile } from "@/lib/cms-store";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WorkClient } from "./WorkClient";

export const metadata: Metadata = {
  title: "Selected Work & Research Projects — Shamanth S",
  description: "Explore AI, Computer Vision, Computational Pathology, and Deep Learning case studies by Shamanth S.",
};

export const revalidate = 0;

export default async function WorkPage() {
  const [projects, profile] = await Promise.all([
    getProjects(),
    getProfile(),
  ]);

  const publishedProjects = projects
    .filter((p) => p.published)
    .sort((a, b) => (a.order || 99) - (b.order || 99));

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#111418]">
      <Navigation profile={profile} />

      <main className="pt-28 md:pt-36 pb-24 max-w-6xl mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-12 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#8C96A5]">
            Engineering Portfolio
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif text-[#111418] tracking-tight">
            Selected Work
          </h1>
          <p className="text-base sm:text-lg text-[#5F6978] leading-relaxed">
            A collection of deep learning architectures, computational pathology pipelines, and AI research intelligence systems.
          </p>
        </div>

        {/* Client filterable list */}
        <WorkClient projects={publishedProjects} />
      </main>

      <Footer profile={profile} />
    </div>
  );
}
