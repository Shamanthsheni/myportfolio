"use client";

import React, { useState } from "react";
import { X, Download, Mail, Phone, MapPin, BookOpen, Briefcase, Code } from "lucide-react";
import { ProfileData } from "@/lib/types";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, profile }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#FAF9F6] border border-[#E4E3DC] rounded-xl shadow-2xl overflow-hidden flex flex-col">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E4E3DC] bg-white/80 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-wider text-[#5F6978]">Curriculum Vitae</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={profile.resumeUrl || "/shamanth_s.pdf"}
              download="Shamanth_S_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-[#111418] hover:bg-[#1E293B] rounded-md transition-colors shadow-subtle"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>
            <button
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#111418] bg-[#F4F3EE] hover:bg-[#EAE8E0] border border-[#E4E3DC] rounded-md transition-colors"
            >
              Print / Save
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#5F6978] hover:text-[#111418] hover:bg-[#F4F3EE] rounded-md transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Resume Content */}
        <div className="p-8 md:p-12 overflow-y-auto space-y-10 bg-[#FAF9F6] print:p-0 print:bg-white">
          {/* Header */}
          <div className="border-b border-[#E4E3DC] pb-8">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-serif text-[#111418] tracking-tight">{profile.name}</h1>
                <p className="text-sm md:text-base font-mono text-[#5F6978] mt-1 tracking-wide">
                  {profile.headline}
                </p>
              </div>
              <div className="flex flex-col gap-1.5 text-xs font-mono text-[#5F6978]">
                <button
                  onClick={copyEmail}
                  className="inline-flex items-center gap-2 hover:text-[#111418] text-left transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  {profile.email} {copied && <span className="text-emerald-600 font-sans text-[10px]">(Copied!)</span>}
                </button>
                <span className="inline-flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  {profile.phone}
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {profile.location}
                </span>
              </div>
            </div>
            <p className="mt-6 text-sm text-[#333A44] leading-relaxed max-w-3xl">
              {profile.bio}
            </p>
          </div>

          {/* Research Experience */}
          <section>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#8C96A5] mb-4">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Research Experience</span>
            </div>
            <div className="space-y-6">
              {profile.experience.map((exp, idx) => (
                <div key={idx} className="p-5 bg-white border border-[#E4E3DC] rounded-lg shadow-subtle">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="text-base font-serif font-medium text-[#111418]">{exp.role}</h3>
                    <span className="text-xs font-mono text-[#8C96A5]">{exp.period}</span>
                  </div>
                  <div className="text-xs font-medium text-[#5F6978] mt-0.5">
                    {exp.organization} — {exp.location}
                  </div>
                  <p className="text-xs text-[#333A44] mt-3 leading-relaxed">
                    {exp.description}
                  </p>
                  <ul className="mt-3 space-y-1.5 text-xs text-[#5F6978] list-disc list-inside">
                    {exp.keyContributions.map((c, cIdx) => (
                      <li key={cIdx}>{c}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {exp.tags.map((t, tIdx) => (
                      <span key={tIdx} className="px-2 py-0.5 text-[11px] font-mono bg-[#F4F3EE] text-[#333A44] rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#8C96A5] mb-4">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Education</span>
            </div>
            <div className="space-y-4">
              {profile.education.map((edu, idx) => (
                <div key={idx} className="p-5 bg-white border border-[#E4E3DC] rounded-lg shadow-subtle">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="text-base font-serif font-medium text-[#111418]">{edu.degree}</h3>
                    <span className="text-xs font-mono text-[#8C96A5]">{edu.period}</span>
                  </div>
                  <div className="text-xs text-[#5F6978] mt-0.5">
                    {edu.institution}
                  </div>
                  <p className="text-xs text-[#333A44] mt-2">
                    {edu.highlight}
                  </p>
                  <div className="mt-3 text-xs text-[#5F6978]">
                    <span className="font-medium text-[#111418]">Relevant Coursework:</span> {edu.coursework.join(", ")}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#8C96A5] mb-4">
              <Code className="w-3.5 h-3.5" />
              <span>Technical Skills</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profile.skills.map((skillCat, idx) => (
                <div key={idx} className="p-4 bg-white border border-[#E4E3DC] rounded-lg">
                  <h4 className="text-xs font-mono uppercase tracking-wider font-semibold text-[#111418] mb-2">
                    {skillCat.category}
                  </h4>
                  <div className="space-y-1.5 text-xs">
                    {skillCat.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="text-[#333A44]">
                        <span className="font-medium text-[#111418]">{item.name}:</span>{" "}
                        <span className="text-[#5F6978]">{item.context}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
