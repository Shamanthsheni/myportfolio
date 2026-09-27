import React from "react";
import { Metadata } from "next";
import { getAchievements, getProfile } from "@/lib/cms-store";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AchievementsClient } from "./AchievementsClient";

export const metadata: Metadata = {
  title: "Achievements & Milestones — Shamanth S",
  description: "Research milestones, academic benchmarks, competitions, and technical achievements by Shamanth S.",
};

export const revalidate = 0;

export default async function AchievementsPage() {
  const [achievements, profile] = await Promise.all([
    getAchievements(),
    getProfile(),
  ]);

  const published = achievements.filter((a) => a.published);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#111418]">
      <Navigation profile={profile} />

      <main className="pt-28 md:pt-36 pb-24 max-w-6xl mx-auto px-6 md:px-8">
        <div className="max-w-2xl mb-12 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#8C96A5]">
            Milestones & Honors
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif text-[#111418] tracking-tight">
            Achievements
          </h1>
          <p className="text-base sm:text-lg text-[#5F6978] leading-relaxed">
            A chronological record of research appointments, architectural benchmarks, and notable project milestones.
          </p>
        </div>

        <AchievementsClient achievements={published} />
      </main>

      <Footer profile={profile} />
    </div>
  );
}
