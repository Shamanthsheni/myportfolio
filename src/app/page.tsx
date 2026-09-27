import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";
import { getProjects, getBlogs, getProfile, getSettings } from "@/lib/cms-store";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export const revalidate = 0;

export default async function HomePage() {
  const [allProjects, allBlogs, profile, settings] = await Promise.all([
    getProjects(),
    getBlogs(),
    getProfile(),
    getSettings(),
  ]);

  // Featured projects from settings or fallback to first 4 published
  const featuredIds = settings.featuredProjectIds || [];
  let featuredProjects = allProjects.filter(
    (p) => p.published && (p.featured || featuredIds.includes(p.id) || featuredIds.includes(p.slug))
  );
  if (featuredProjects.length === 0) {
    featuredProjects = allProjects.filter((p) => p.published).slice(0, 4);
  }
  featuredProjects = featuredProjects.slice(0, 4);

  // Featured blog
  const featuredBlog =
    allBlogs.find((b) => b.published && (b.slug === settings.featuredBlogSlug || b.featured)) ||
    allBlogs.find((b) => b.published) ||
    allBlogs[0];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#111418] selection:bg-[#E4E3DC] selection:text-[#111418]">
      <Navigation profile={profile} />

      <main className="pt-28 md:pt-36 pb-20">
        {/* ========================================================================= */}
        {/* 1. HERO SECTION — Asymmetric, Editorial & Spacious */}
        {/* ========================================================================= */}
        <section className="max-w-6xl mx-auto px-6 md:px-8 mb-28 md:mb-36">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-8 animate-fade-in">
              {/* Status Pill */}
              {profile.statusBadge && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-[#E4E3DC] rounded-full text-xs font-mono text-[#333A44] shadow-subtle">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{profile.statusBadge}</span>
                </div>
              )}

              {/* Title & Headline */}
              <div className="space-y-3">
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif text-[#111418] tracking-tight leading-[1.05]">
                  SHAMANTH S
                </h1>
                <div className="text-xs sm:text-sm font-mono tracking-widest uppercase text-[#5F6978]">
                  {settings.heroTagline || profile.headline}
                </div>
              </div>

              {/* Personal Statement */}
              <p className="text-lg sm:text-xl text-[#333A44] leading-relaxed font-sans max-w-xl font-normal">
                {settings.heroStatement ||
                  "I build intelligent systems, experiment with machine learning, and explore ideas that sit between AI research and real-world applications."}
              </p>

              {/* Action CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#111418] hover:bg-[#1E293B] text-white text-xs font-medium rounded-lg transition-all duration-200 shadow-subtle hover:shadow"
                >
                  <span>Explore Selected Work</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-[#F4F3EE] border border-[#E4E3DC] text-[#111418] text-xs font-medium rounded-lg transition-colors shadow-subtle"
                >
                  <span>About & Research</span>
                </Link>
              </div>

              {/* Social Channels */}
              <div className="flex items-center gap-5 pt-4 border-t border-[#E4E3DC]/80 text-xs font-mono text-[#5F6978]">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-[#111418] transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-[#111418] transition-colors"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 hover:text-[#111418] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Contact</span>
                </Link>
              </div>
            </div>

            {/* Right Editorial Portrait */}
            <div className="lg:col-span-5 animate-fade-in-up">
              <div className="relative mx-auto max-w-sm lg:max-w-none">
                <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-[#E4E3DC] shadow-editorial bg-[#F4F3EE] group">
                  <Image
                    src={profile.avatarUrl || "/images/shamanth_portrait.jpg"}
                    alt="Shamanth S — AI & Machine Learning Engineer"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl" />
                </div>

                <div className="absolute -bottom-4 -left-4 sm:bottom-6 sm:-left-6 bg-white/95 backdrop-blur-md border border-[#E4E3DC] p-3.5 rounded-xl shadow-editorial max-w-[220px]">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#8C96A5]">
                    Current Focus
                  </div>
                  <div className="text-xs font-serif font-medium text-[#111418] mt-0.5 leading-snug">
                    Computational Pathology @ CIIRC
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. SELECTED WORK (Only 3-4 Major Projects) */}
        {/* ========================================================================= */}
        <section className="max-w-6xl mx-auto px-6 md:px-8 mb-28 md:mb-36">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-4 border-b border-[#E4E3DC] gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#8C96A5] block mb-1">
                Portfolio Highlights
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#111418] tracking-tight">
                Selected Work
              </h2>
            </div>
            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#5F6978] hover:text-[#111418] transition-colors group"
            >
              <span>View all projects</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="space-y-12">
            {featuredProjects.map((project, idx) => (
              <div
                key={project.id}
                className="group relative bg-white border border-[#E4E3DC] hover:border-[#111418]/30 rounded-2xl p-6 sm:p-8 md:p-10 transition-all duration-300 shadow-subtle hover:shadow-editorial"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-5">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-xs font-mono font-medium text-[#8C96A5]">
                        0{idx + 1}
                      </span>
                      <span className="px-2.5 py-0.5 text-[11px] font-mono bg-[#F4F3EE] text-[#111418] rounded border border-[#E4E3DC]">
                        {project.category}
                      </span>
                      <span className="text-xs font-mono text-[#8C96A5]">
                        {project.year}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-serif font-medium text-[#111418] tracking-tight group-hover:text-[#111418]">
                      <Link href={`/work/${project.slug}`} className="hover:underline">
                        {project.title}
                      </Link>
                    </h3>

                    <p className="text-sm sm:text-base text-[#5F6978] leading-relaxed line-clamp-3">
                      {project.shortDescription}
                    </p>

                    {project.metrics && project.metrics.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                        {project.metrics.slice(0, 3).map((m, mIdx) => (
                          <div key={mIdx} className="p-3 bg-[#FAF9F6] border border-[#E4E3DC] rounded-lg">
                            <div className="text-base sm:text-lg font-serif font-semibold text-[#111418]">
                              {m.value}
                            </div>
                            <div className="text-[11px] font-mono text-[#5F6978] mt-0.5">
                              {m.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#E4E3DC]">
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 4).map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[11px] font-mono text-[#5F6978] bg-[#FAF9F6] px-2 py-0.5 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <Link
                        href={`/work/${project.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#111418] group-hover:text-blue-600 transition-colors"
                      >
                        <span>Read Case Study</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>

                  <div className="lg:col-span-5">
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. APPROACH / PHILOSOPHY HIGHLIGHT */}
        {/* ========================================================================= */}
        <section className="max-w-6xl mx-auto px-6 md:px-8 mb-28 md:mb-36">
          <div className="border border-[#E4E3DC] rounded-3xl p-8 sm:p-12 md:p-16 bg-white shadow-subtle">
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-mono uppercase tracking-widest text-[#8C96A5] block mb-2">
                Engineering Philosophy
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#111418] tracking-tight">
                Curious, technical, and builder-oriented.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#5F6978] leading-relaxed">
                Rather than jumping to complex models blindly, I build systems grounded in domain understanding, rigorous baselines, and measurable evaluation.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: "01",
                  title: "Understand",
                  desc: "Investigate raw data distributions, scanner variations, and true domain failure modes first.",
                },
                {
                  step: "02",
                  title: "Experiment",
                  desc: "Formulate crisp hypotheses. Benchmark simple baselines before introducing architectural complexity.",
                },
                {
                  step: "03",
                  title: "Measure",
                  desc: "Evaluate against domain-meaningful metrics: MAE, IoU, Pearson correlation, and edge cases.",
                },
                {
                  step: "04",
                  title: "Build",
                  desc: "Bridge research into production through containerization, low-latency APIs, and clean interfaces.",
                },
              ].map((item, idx) => (
                <div key={idx} className="p-5 bg-[#FAF9F6] border border-[#E4E3DC] rounded-xl space-y-2">
                  <div className="text-xs font-mono font-bold text-[#8C96A5]">
                    {item.step}
                  </div>
                  <h4 className="text-base font-serif font-medium text-[#111418]">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#5F6978] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. FEATURED BLOG */}
        {/* ========================================================================= */}
        {featuredBlog && (
          <section className="max-w-6xl mx-auto px-6 md:px-8 mb-28 md:mb-36">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#E4E3DC] gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#8C96A5] block mb-1">
                  Technical Writing
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif text-[#111418] tracking-tight">
                  Featured Article
                </h2>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#5F6978] hover:text-[#111418] transition-colors group"
              >
                <span>Read all articles</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="group bg-white border border-[#E4E3DC] hover:border-[#111418]/30 rounded-2xl p-6 sm:p-8 md:p-10 shadow-subtle hover:shadow-editorial transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-2.5 py-0.5 text-[11px] font-mono bg-[#F4F3EE] text-[#111418] rounded border border-[#E4E3DC]">
                      {featuredBlog.category}
                    </span>
                    <span className="text-xs font-mono text-[#8C96A5]">
                      {featuredBlog.publishedAt}
                    </span>
                    <span className="text-xs font-mono text-[#8C96A5]">
                      · {featuredBlog.readingTime}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-serif font-medium text-[#111418] tracking-tight">
                    <Link href={`/blog/${featuredBlog.slug}`} className="hover:underline">
                      {featuredBlog.title}
                    </Link>
                  </h3>

                  <p className="text-sm sm:text-base text-[#5F6978] leading-relaxed">
                    {featuredBlog.excerpt}
                  </p>

                  <div className="pt-2">
                    <Link
                      href={`/blog/${featuredBlog.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#111418] group-hover:text-blue-600 transition-colors"
                    >
                      <span>Read Full Article</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

                {featuredBlog.coverImage && (
                  <div className="lg:col-span-4">
                    <Link
                      href={`/blog/${featuredBlog.slug}`}
                      className="block relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-[#E4E3DC] bg-[#FAF9F6]"
                    >
                      <Image
                        src={featuredBlog.coverImage}
                        alt={featuredBlog.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* 5. CONTACT BANNER */}
        {/* ========================================================================= */}
        <section className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="p-8 sm:p-12 md:p-16 bg-[#F4F3EE] border border-[#E4E3DC] rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <span className="text-xs font-mono uppercase tracking-widest text-[#8C96A5]">
                Get In Touch
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#111418] tracking-tight">
                Let&apos;s build something intelligent together.
              </h3>
              <p className="text-sm text-[#5F6978] leading-relaxed">
                Always open to discussions on AI research, machine learning engineering, and ambitious collaborations.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#111418] hover:bg-[#1E293B] text-white text-xs font-medium rounded-lg transition-colors shadow-subtle text-center"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email Shamanth</span>
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-[#FAF9F6] border border-[#E4E3DC] text-[#111418] text-xs font-medium rounded-lg transition-colors shadow-subtle text-center"
              >
                <span>Contact Page</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer profile={profile} />
    </div>
  );
}
