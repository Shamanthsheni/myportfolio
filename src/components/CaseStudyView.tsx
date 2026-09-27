"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, ExternalLink, ChevronRight } from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";
import { Project } from "@/lib/types";

interface CaseStudyViewProps {
  project: Project;
  nextProject?: Project | null;
  prevProject?: Project | null;
}

export const CaseStudyView: React.FC<CaseStudyViewProps> = ({
  project,
  nextProject,
  prevProject,
}) => {
  return (
    <article className="pt-28 pb-24 max-w-4xl mx-auto px-6 md:px-8 animate-fade-in">
      {/* Back to Work Link */}
      <div className="mb-8">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#5F6978] hover:text-[#111418] transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Selected Work</span>
        </Link>
      </div>

      {/* Case Study Header */}
      <header className="space-y-6 pb-10 border-b border-[#E4E3DC]">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 text-xs font-mono bg-[#F4F3EE] text-[#111418] border border-[#E4E3DC] rounded-full">
            {project.category}
          </span>
          <span className="text-xs font-mono text-[#8C96A5]">{project.year}</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-serif text-[#111418] tracking-tight leading-tight">
          {project.title}
        </h1>

        <p className="text-lg md:text-xl text-[#5F6978] font-sans leading-relaxed">
          {project.shortDescription}
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#111418] hover:bg-[#1E293B] text-white text-xs font-medium rounded-lg transition-colors shadow-subtle"
            >
              <GithubIcon className="w-4 h-4" />
              <span>View Source on GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-[#F4F3EE] border border-[#E4E3DC] text-[#111418] text-xs font-medium rounded-lg transition-colors shadow-subtle"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Demonstration</span>
            </a>
          )}
        </div>
      </header>

      {/* Large Featured Visual */}
      {project.thumbnail && (
        <div className="my-10 relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-[#E4E3DC] shadow-editorial bg-[#F4F3EE]">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Quantitative Metrics Highlight */}
      {project.metrics && project.metrics.length > 0 && (
        <section className="my-12">
          <h3 className="text-xs font-mono uppercase tracking-widest text-[#8C96A5] mb-4">
            Key Impact & Quantitative Metrics
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {project.metrics.map((m, idx) => (
              <div
                key={idx}
                className="p-4 bg-white border border-[#E4E3DC] rounded-xl shadow-subtle"
              >
                <div className="text-2xl md:text-3xl font-serif font-semibold text-[#111418]">
                  {m.value}
                </div>
                <div className="text-xs font-mono text-[#111418] font-medium mt-1">
                  {m.label}
                </div>
                {m.subtext && (
                  <div className="text-[11px] text-[#8C96A5] mt-1 leading-snug">
                    {m.subtext}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* The Problem */}
      <section className="my-12 space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-widest text-[#8C96A5]">
          01 / The Problem
        </h2>
        <div className="p-6 md:p-8 bg-white border border-[#E4E3DC] rounded-xl shadow-subtle">
          <p className="text-[#333A44] leading-relaxed text-base md:text-lg">
            {project.caseStudy.problem}
          </p>
        </div>
      </section>

      {/* Architectural Approach */}
      <section className="my-12 space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-widest text-[#8C96A5]">
          02 / Architectural Approach
        </h2>
        <div className="space-y-3">
          {project.caseStudy.approach.map((item, idx) => (
            <div
              key={idx}
              className="p-5 bg-white border border-[#E4E3DC] rounded-xl flex items-start gap-4 shadow-subtle"
            >
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#F4F3EE] border border-[#E4E3DC] flex items-center justify-center text-xs font-mono font-medium text-[#111418]">
                {idx + 1}
              </span>
              <p className="text-sm md:text-base text-[#333A44] leading-relaxed pt-0.5">
                {item}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Technologies Used */}
      <section className="my-12 space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-widest text-[#8C96A5]">
          03 / Technologies & Tooling
        </h2>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, idx) => (
            <span
              key={idx}
              className="px-3.5 py-1.5 bg-white border border-[#E4E3DC] text-xs font-mono text-[#333A44] rounded-lg shadow-subtle"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Process / End-to-End Pipeline */}
      {project.caseStudy.process && project.caseStudy.process.length > 0 && (
        <section className="my-12 space-y-6">
          <h2 className="text-xs font-mono uppercase tracking-widest text-[#8C96A5]">
            04 / End-to-End Pipeline & Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.caseStudy.process.map((p, idx) => (
              <div
                key={idx}
                className="p-5 bg-white border border-[#E4E3DC] rounded-xl relative shadow-subtle"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono font-bold text-[#8C96A5]">
                    STAGE {p.step}
                  </span>
                  {p.tech && (
                    <span className="text-[11px] font-mono px-2 py-0.5 bg-[#F4F3EE] text-[#5F6978] rounded">
                      {p.tech}
                    </span>
                  )}
                </div>
                <h4 className="text-base font-serif font-medium text-[#111418] mb-1">
                  {p.title}
                </h4>
                <p className="text-xs md:text-sm text-[#5F6978] leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Quantitative Results Table */}
      {project.caseStudy.results && project.caseStudy.results.length > 0 && (
        <section className="my-12 space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-widest text-[#8C96A5]">
            05 / Quantitative Benchmarks & Results
          </h2>
          <div className="border border-[#E4E3DC] rounded-xl overflow-hidden bg-white shadow-subtle">
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="bg-[#F4F3EE] border-b border-[#E4E3DC] font-mono text-[#5F6978]">
                  <th className="p-4 font-medium">Evaluation Metric</th>
                  <th className="p-4 font-medium">Baseline</th>
                  <th className="p-4 font-medium">Our Approach</th>
                  <th className="p-4 font-medium">Improvement / Delta</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4E3DC]">
                {project.caseStudy.results.map((res, idx) => (
                  <tr key={idx} className="hover:bg-[#FAF9F6] transition-colors">
                    <td className="p-4 font-medium text-[#111418]">{res.metric}</td>
                    <td className="p-4 font-mono text-[#5F6978]">{res.baseline || "—"}</td>
                    <td className="p-4 font-mono font-semibold text-[#111418]">{res.ours}</td>
                    <td className="p-4 font-mono text-emerald-700 font-medium">
                      {res.delta || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* What I Learned */}
      {project.caseStudy.learned && (
        <section className="my-12 space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-widest text-[#8C96A5]">
            06 / Personal Engineering Reflection
          </h2>
          <div className="p-6 md:p-8 bg-[#F4F3EE] border border-[#E4E3DC] rounded-xl">
            <p className="text-[#333A44] leading-relaxed text-sm md:text-base italic">
              &ldquo;{project.caseStudy.learned}&rdquo;
            </p>
          </div>
        </section>
      )}

      {/* Next/Prev Navigation */}
      <nav className="mt-16 pt-8 border-t border-[#E4E3DC] flex flex-col sm:flex-row items-center justify-between gap-4">
        {prevProject ? (
          <Link
            href={`/work/${prevProject.slug}`}
            className="flex items-center gap-2 text-sm text-[#5F6978] hover:text-[#111418] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <div className="text-left">
              <span className="text-[10px] font-mono uppercase text-[#8C96A5] block">Previous</span>
              <span className="font-serif font-medium">{prevProject.title}</span>
            </div>
          </Link>
        ) : <div />}

        {nextProject ? (
          <Link
            href={`/work/${nextProject.slug}`}
            className="flex items-center gap-2 text-sm text-[#5F6978] hover:text-[#111418] transition-colors group sm:text-right"
          >
            <div>
              <span className="text-[10px] font-mono uppercase text-[#8C96A5] block">Next Project</span>
              <span className="font-serif font-medium">{nextProject.title}</span>
            </div>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        ) : <div />}
      </nav>
    </article>
  );
};
