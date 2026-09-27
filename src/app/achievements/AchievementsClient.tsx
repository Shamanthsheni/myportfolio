"use client";

import React, { useState } from "react";
import { Award, ExternalLink, ShieldCheck, Trophy, Sparkles } from "lucide-react";
import { Achievement } from "@/lib/types";

interface AchievementsClientProps {
  achievements: Achievement[];
}

export const AchievementsClient: React.FC<AchievementsClientProps> = ({ achievements }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(achievements.map((a) => a.category)))];

  const filteredAchievements =
    selectedCategory === "All"
      ? achievements
      : achievements.filter((a) => a.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Research & Publications":
        return <Award className="w-5 h-5 text-indigo-600" />;
      case "Competitions & Hackathons":
        return <Trophy className="w-5 h-5 text-amber-600" />;
      case "Certifications":
        return <ShieldCheck className="w-5 h-5 text-emerald-600" />;
      default:
        return <Sparkles className="w-5 h-5 text-slate-700" />;
    }
  };

  return (
    <div className="space-y-12">
      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 pb-4 border-b border-[#E4E3DC]">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 text-xs font-mono rounded-full transition-colors ${
              selectedCategory === cat
                ? "bg-[#111418] text-white shadow-subtle"
                : "bg-white text-[#5F6978] hover:text-[#111418] border border-[#E4E3DC]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Achievements Cards */}
      <div className="space-y-6">
        {filteredAchievements.map((item) => (
          <div
            key={item.id}
            className="group bg-white border border-[#E4E3DC] hover:border-[#111418]/30 rounded-2xl p-6 sm:p-8 transition-all duration-300 shadow-subtle hover:shadow-editorial flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="p-3 bg-[#FAF9F6] border border-[#E4E3DC] rounded-xl flex-shrink-0 mt-1">
                {getCategoryIcon(item.category)}
              </div>
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 text-[11px] font-mono bg-[#F4F3EE] text-[#111418] rounded border border-[#E4E3DC]">
                    {item.category}
                  </span>
                  <span className="text-xs font-mono text-[#8C96A5]">{item.date}</span>
                </div>

                <h3 className="text-lg sm:text-xl font-serif font-medium text-[#111418] tracking-tight">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#5F6978] leading-relaxed max-w-3xl">
                  {item.description}
                </p>
              </div>
            </div>

            {/* Link / Certificate CTA if available */}
            {(item.link || item.certificateUrl) && (
              <div className="flex items-center gap-3 md:self-center flex-shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#E4E3DC]">
                <a
                  href={item.link || item.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#FAF9F6] hover:bg-[#F4F3EE] border border-[#E4E3DC] text-xs font-mono text-[#111418] rounded-lg transition-colors"
                >
                  <span>Verification / Link</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
