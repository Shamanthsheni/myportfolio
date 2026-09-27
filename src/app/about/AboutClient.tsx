"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FileText } from "lucide-react";
import { ProfileData } from "@/lib/types";
import { ResumeModal } from "@/components/ResumeModal";

interface AboutClientProps {
  profile: ProfileData;
}

export const AboutClient: React.FC<AboutClientProps> = ({ profile }) => {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [activeSkillCategory, setActiveSkillCategory] = useState<string>(
    profile.skills[0]?.category || "Programming"
  );

  return (
    <div className="space-y-24">
      {/* 1. Header & Editorial Portrait + Story */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Editorial Portrait */}
        <div className="lg:col-span-5">
          <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-[#E4E3DC] shadow-editorial bg-[#F4F3EE]">
            <Image
              src={profile.avatarUrl || "/images/shamanth_portrait.jpg"}
              alt="Shamanth S — Portrait"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="mt-6 p-5 bg-white border border-[#E4E3DC] rounded-xl shadow-subtle space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-[#8C96A5]">
              Quick Details
            </div>
            <div className="space-y-2 text-xs text-[#333A44]">
              <div className="flex justify-between py-1 border-b border-[#E4E3DC]">
                <span className="text-[#5F6978]">Location:</span>
                <span className="font-medium text-[#111418]">{profile.location}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#E4E3DC]">
                <span className="text-[#5F6978]">Current Role:</span>
                <span className="font-medium text-[#111418]">Research Intern @ CIIRC</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#E4E3DC]">
                <span className="text-[#5F6978]">Education:</span>
                <span className="font-medium text-[#111418]">B.E. AI & ML (2027)</span>
              </div>

            </div>

            <div className="pt-2">
              <button
                onClick={() => setResumeOpen(true)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#111418] hover:bg-[#1E293B] text-white text-xs font-medium rounded-lg transition-colors shadow-subtle"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View Full Curriculum Vitae</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Story & Background */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#8C96A5]">
              About Shamanth S
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif text-[#111418] tracking-tight leading-tight">
              Curious engineer, builder-oriented researcher.
            </h1>
          </div>

          <div className="space-y-5 text-base sm:text-lg text-[#333A44] leading-relaxed font-sans">
            <p>
              I am an AI / ML developer and researcher based in Bengaluru. My work centers on the intersection of deep learning architectures, computer vision pipelines, and scalable research intelligence systems.
            </p>
            <p>
              Rather than treating machine learning as an opaque black box or stopping at training loss curves in a Jupyter notebook, I enjoy breaking down the underlying mathematics, understanding the physical data distribution, and engineering practical systems that solve concrete problems.
            </p>
            <p>
              Currently, I am conducting deep learning research as a Research Intern at the <strong>Computational Engineering Lab (CIIRC)</strong>, investigating cell instance segmentation and nuclear morphometry algorithms for automated cancer histopathology grading.
            </p>
          </div>

          {/* Core Mindset Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#E4E3DC]">
            <div className="p-4 bg-white border border-[#E4E3DC] rounded-xl shadow-subtle">
              <h4 className="text-sm font-serif font-medium text-[#111418] mb-1">
                Builder-Oriented
              </h4>
              <p className="text-xs text-[#5F6978] leading-relaxed">
                From PyTorch model development to Dockerized deployment and Next.js interfaces, I take pride in end-to-end execution.
              </p>
            </div>
            <div className="p-4 bg-white border border-[#E4E3DC] rounded-xl shadow-subtle">
              <h4 className="text-sm font-serif font-medium text-[#111418] mb-1">
                Hypothesis-Driven
              </h4>
              <p className="text-xs text-[#5F6978] leading-relaxed">
                Evaluating ideas against clean baselines and domain-meaningful metrics (MAE, IoU, Pearson r) rather than hype.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Research Experience Timeline */}
      <section className="space-y-8 pt-8 border-t border-[#E4E3DC]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#8C96A5] block mb-1">
              Career Trajectory
            </span>
            <h2 className="text-3xl font-serif text-[#111418] tracking-tight">
              Research & Engineering Experience
            </h2>
          </div>
        </div>

        <div className="space-y-6">
          {profile.experience.map((exp, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E4E3DC] rounded-2xl p-6 sm:p-8 md:p-10 shadow-subtle space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 border-b border-[#E4E3DC] pb-5">
                <div>
                  <h3 className="text-2xl font-serif font-medium text-[#111418]">
                    {exp.role}
                  </h3>
                  <div className="text-sm font-medium text-[#5F6978] mt-1">
                    {exp.organization} · <span className="font-mono text-xs">{exp.location}</span>
                  </div>
                </div>
                <span className="inline-flex px-3 py-1 bg-[#F4F3EE] text-[#111418] border border-[#E4E3DC] rounded-full text-xs font-mono">
                  {exp.period}
                </span>
              </div>

              <div>
                <h4 className="text-sm font-mono uppercase tracking-wider text-[#111418] font-semibold mb-2">
                  Focus: {exp.focusTitle}
                </h4>
                <p className="text-sm sm:text-base text-[#333A44] leading-relaxed">
                  {exp.description}
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-mono text-[#8C96A5] uppercase tracking-wider">
                  Key Research Contributions
                </div>
                <ul className="space-y-2 text-sm text-[#5F6978] list-disc list-inside">
                  {exp.keyContributions.map((contrib, cIdx) => (
                    <li key={cIdx} className="leading-relaxed">
                      {contrib}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {exp.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-1 text-xs font-mono bg-[#F4F3EE] text-[#333A44] rounded-md border border-[#E4E3DC]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Education Section */}
      <section className="space-y-8 pt-8 border-t border-[#E4E3DC]">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#8C96A5] block mb-1">
            Academic Foundation
          </span>
          <h2 className="text-3xl font-serif text-[#111418] tracking-tight">
            Education
          </h2>
        </div>

        <div className="space-y-6">
          {profile.education.map((edu, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E4E3DC] rounded-2xl p-6 sm:p-8 md:p-10 shadow-subtle space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif font-medium text-[#111418]">
                    {edu.degree}
                  </h3>
                  <div className="text-sm text-[#5F6978] mt-1">
                    {edu.institution} · <span className="font-mono text-xs">{edu.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex px-3 py-1 bg-[#F4F3EE] text-[#111418] border border-[#E4E3DC] rounded-full text-xs font-mono">
                    {edu.period}
                  </span>
                  <div className="text-xs font-mono text-[#111418] font-semibold mt-1">

                  </div>
                </div>
              </div>

              <p className="text-sm text-[#333A44] leading-relaxed">
                {edu.highlight}
              </p>

              <div className="pt-2 border-t border-[#E4E3DC]">
                <span className="text-xs font-mono text-[#8C96A5] uppercase tracking-wider block mb-2">
                  Key Coursework
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {edu.coursework.map((course, cIdx) => (
                    <span
                      key={cIdx}
                      className="px-2.5 py-1 text-xs font-mono bg-[#FAF9F6] text-[#5F6978] rounded border border-[#E4E3DC]"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Categorized Skills Section */}
      <section className="space-y-8 pt-8 border-t border-[#E4E3DC]">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#8C96A5] block mb-1">
            Technical Stack
          </span>
          <h2 className="text-3xl font-serif text-[#111418] tracking-tight">
            Skills & Core Tooling
          </h2>
          <p className="mt-2 text-sm text-[#5F6978]">
            Categorized overview of the technologies, libraries, and frameworks I use to build and experiment.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 pb-2">
          {profile.skills.map((skillCat) => (
            <button
              key={skillCat.category}
              onClick={() => setActiveSkillCategory(skillCat.category)}
              className={`px-4 py-2 text-xs font-mono rounded-lg transition-colors ${
                activeSkillCategory === skillCat.category
                  ? "bg-[#111418] text-white shadow-subtle font-medium"
                  : "bg-white text-[#5F6978] hover:text-[#111418] border border-[#E4E3DC]"
              }`}
            >
              {skillCat.category}
            </button>
          ))}
        </div>

        {profile.skills
          .filter((s) => s.category === activeSkillCategory)
          .map((cat, idx) => (
            <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cat.items.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  className="p-5 bg-white border border-[#E4E3DC] rounded-xl shadow-subtle space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-serif font-medium text-[#111418]">
                      {item.name}
                    </h4>
                    <span className="text-[10px] font-mono text-[#8C96A5] uppercase">
                      {cat.category}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#5F6978] leading-relaxed">
                    {item.context}
                  </p>
                </div>
              ))}
            </div>
          ))}
      </section>

      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
        profile={profile}
      />
    </div>
  );
};
