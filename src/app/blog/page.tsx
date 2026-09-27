import React from "react";
import { Metadata } from "next";
import { getBlogs, getProfile } from "@/lib/cms-store";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BlogClient } from "./BlogClient";

export const metadata: Metadata = {
  title: "Technical Writing & Research Notes — Shamanth S",
  description: "Technical articles, architecture breakdowns, deep learning experiments, and computer vision tutorials by Shamanth S.",
};

export const revalidate = 0;

export default async function BlogPage() {
  const [blogs, profile] = await Promise.all([
    getBlogs(),
    getProfile(),
  ]);

  const publishedBlogs = blogs
    .filter((b) => b.published)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#111418]">
      <Navigation profile={profile} />

      <main className="pt-28 md:pt-36 pb-24 max-w-6xl mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-12 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#8C96A5]">
            Engineering & Research Journal
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif text-[#111418] tracking-tight">
            Technical Writing
          </h1>
          <p className="text-base sm:text-lg text-[#5F6978] leading-relaxed">
            Essays, architecture breakdowns, and notes on Deep Learning, Computer Vision, Computational Pathology, and scalable AI systems.
          </p>
        </div>

        <BlogClient blogs={publishedBlogs} />
      </main>

      <Footer profile={profile} />
    </div>
  );
}
