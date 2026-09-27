"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Download, Mail, Phone, MapPin, Briefcase, BookOpen, Code, Check, Printer } from "lucide-react";
import { ProfileData } from "@/lib/types";

interface ResumeViewProps {
  profile: ProfileData;
}

export const ResumeView: React.FC<ResumeViewProps> = ({ profile }) => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between p-4 bg-white border border-[#E4E3DC] rounded-xl shadow-subtle print:hidden">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-mono text-[#5F6978]">Curriculum Vitae</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-[#111418] bg-[#FAF9F6] hover:bg-[#F4F3EE] border border-[#E4E3DC] rounded-lg transition-colors shadow-subtle"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Structured CV Document */}
      <div className="p-8 md:p-14 bg-white border border-[#E4E3DC] rounded-2xl shadow-editorial space-y-10 print:border-none print:shadow-none print:p-0">
        {/* Header */}
        <div className="border-b border-[#E4E3DC] pb-8">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif text-[#111418] tracking-tight">{profile.name}</h1>
              <p className="text-sm md:text-base font-mono text-[#5F6978] mt-1 tracking-wide">
                {profile.headline}
              </p>
            </div>
            <div className="flex flex-col gap-1 text-xs font-mono text-[#5F6978]">
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
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#8C96A5]">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Research & Engineering Experience</span>
          </div>
          <div className="space-y-6">
            {profile.experience.map((exp, idx) => (
              <div key={idx} className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <h3 className="text-base font-serif font-medium text-[#111418]">{exp.role}</h3>
                  <span className="text-xs font-mono text-[#8C96A5]">{exp.period}</span>
                </div>
                <div className="text-xs font-medium text-[#5F6978]">
                  {exp.organization} — {exp.location}
                </div>
                <p className="text-xs text-[#333A44] leading-relaxed">
                  {exp.description}
                </p>
                <ul className="space-y-1 text-xs text-[#5F6978] list-disc list-inside">
                  {exp.keyContributions.map((c, cIdx) => (
                    <li key={cIdx}>{c}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="space-y-4 border-t border-[#E4E3DC] pt-8">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#8C96A5]">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Education</span>
          </div>
          <div className="space-y-4">
            {profile.education.map((edu, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <h3 className="text-base font-serif font-medium text-[#111418]">{edu.degree}</h3>
                  <span className="text-xs font-mono text-[#8C96A5]">{edu.period}</span>
                </div>
                <div className="text-xs text-[#5F6978]">
                  {edu.institution}
                </div>
                <p className="text-xs text-[#333A44]">
                  {edu.highlight}
                </p>
                <div className="text-xs text-[#5F6978]">
                  <span className="font-medium text-[#111418]">Coursework:</span> {edu.coursework.join(", ")}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="space-y-4 border-t border-[#E4E3DC] pt-8">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#8C96A5]">
            <Code className="w-3.5 h-3.5" />
            <span>Technical Skills</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {profile.skills.map((skillCat, idx) => (
              <div key={idx} className="p-3 bg-[#FAF9F6] border border-[#E4E3DC] rounded-lg">
                <h4 className="font-mono uppercase text-[#111418] font-semibold mb-1.5">
                  {skillCat.category}
                </h4>
                <div className="space-y-1">
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
  );
};
