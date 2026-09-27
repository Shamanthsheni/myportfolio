import React from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { isAuthenticated } from "@/lib/auth";
import { getFullCMSData } from "@/lib/cms-store";
import { FolderGit2, BookOpen, Award, User, Plus, ArrowRight, CheckCircle2, FileText, Sparkles } from "lucide-react";

export const revalidate = 0;

export default async function AdminDashboardPage() {
  if (!isAuthenticated()) {
    redirect("/admin/login");
  }

  const cmsData = await getFullCMSData();
  const { projects, blogs, achievements, profile } = cmsData;

  const publishedProjects = projects.filter((p) => p.published).length;
  const featuredProjects = projects.filter((p) => p.featured).length;

  const publishedBlogs = blogs.filter((b) => b.published).length;
  const draftBlogs = blogs.filter((b) => !b.published).length;

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-8 bg-white border border-[#E4E3DC] rounded-2xl shadow-editorial">
        <div className="space-y-1">
          <span className="text-xs font-mono uppercase tracking-widest text-[#8C96A5]">
            Control Center
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-medium text-[#111418]">
            Welcome back, {profile.name}
          </h1>
          <p className="text-xs text-[#5F6978]">
            All updates made here will instantly sync to your live website and database.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/blogs?action=new"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#111418] hover:bg-[#1E293B] text-white text-xs font-medium rounded-lg transition-colors shadow-subtle"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Blog Post</span>
          </Link>
          <Link
            href="/admin/projects?action=new"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#FAF9F6] hover:bg-[#F4F3EE] border border-[#E4E3DC] text-[#111418] text-xs font-medium rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Project</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Projects Card */}
        <Link
          href="/admin/projects"
          className="p-6 bg-white border border-[#E4E3DC] hover:border-[#111418]/30 rounded-2xl transition-all duration-200 shadow-subtle hover:shadow-editorial group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-[#FAF9F6] border border-[#E4E3DC] rounded-xl text-[#111418]">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono text-[#8C96A5] group-hover:text-[#111418] transition-colors">
              Manage &rarr;
            </span>
          </div>
          <div className="text-3xl font-serif font-semibold text-[#111418]">
            {projects.length}
          </div>
          <div className="text-xs font-medium text-[#111418] mt-1">Total Projects</div>
          <div className="text-[11px] font-mono text-[#8C96A5] mt-1">
            {publishedProjects} published · {featuredProjects} featured on home
          </div>
        </Link>

        {/* Blogs Card */}
        <Link
          href="/admin/blogs"
          className="p-6 bg-white border border-[#E4E3DC] hover:border-[#111418]/30 rounded-2xl transition-all duration-200 shadow-subtle hover:shadow-editorial group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-[#FAF9F6] border border-[#E4E3DC] rounded-xl text-[#111418]">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono text-[#8C96A5] group-hover:text-[#111418] transition-colors">
              Manage &rarr;
            </span>
          </div>
          <div className="text-3xl font-serif font-semibold text-[#111418]">
            {blogs.length}
          </div>
          <div className="text-xs font-medium text-[#111418] mt-1">Blog Articles</div>
          <div className="text-[11px] font-mono text-[#8C96A5] mt-1">
            {publishedBlogs} published · {draftBlogs} drafts
          </div>
        </Link>

        {/* Achievements Card */}
        <Link
          href="/admin/achievements"
          className="p-6 bg-white border border-[#E4E3DC] hover:border-[#111418]/30 rounded-2xl transition-all duration-200 shadow-subtle hover:shadow-editorial group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-[#FAF9F6] border border-[#E4E3DC] rounded-xl text-[#111418]">
              <Award className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono text-[#8C96A5] group-hover:text-[#111418] transition-colors">
              Manage &rarr;
            </span>
          </div>
          <div className="text-3xl font-serif font-semibold text-[#111418]">
            {achievements.length}
          </div>
          <div className="text-xs font-medium text-[#111418] mt-1">Achievements</div>
          <div className="text-[11px] font-mono text-[#8C96A5] mt-1">
            Research, honors & certifications
          </div>
        </Link>

        {/* Profile Card */}
        <Link
          href="/admin/profile"
          className="p-6 bg-white border border-[#E4E3DC] hover:border-[#111418]/30 rounded-2xl transition-all duration-200 shadow-subtle hover:shadow-editorial group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-[#FAF9F6] border border-[#E4E3DC] rounded-xl text-[#111418]">
              <User className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono text-[#8C96A5] group-hover:text-[#111418] transition-colors">
              Edit &rarr;
            </span>
          </div>
          <div className="text-lg font-serif font-semibold text-[#111418] truncate">
            {profile.name}
          </div>
          <div className="text-xs font-medium text-[#111418] mt-1">Profile & Skills</div>
          <div className="text-[11px] font-mono text-[#8C96A5] mt-1 truncate">
            {profile.skills.reduce((acc, cat) => acc + cat.items.length, 0)} skills listed
          </div>
        </Link>
      </div>

      {/* Quick Access Overview Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Projects */}
        <div className="bg-white border border-[#E4E3DC] rounded-2xl p-6 shadow-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E4E3DC]">
            <h3 className="text-base font-serif font-medium text-[#111418]">Projects</h3>
            <Link
              href="/admin/projects"
              className="text-xs font-mono text-[#5F6978] hover:text-[#111418]"
            >
              View all ({projects.length})
            </Link>
          </div>

          <div className="space-y-3">
            {projects.slice(0, 4).map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-3 bg-[#FAF9F6] border border-[#E4E3DC] rounded-xl"
              >
                <div>
                  <div className="text-xs font-medium text-[#111418]">{p.title}</div>
                  <div className="text-[10px] font-mono text-[#8C96A5]">
                    {p.category} · {p.year}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {p.featured && (
                    <span className="px-2 py-0.5 text-[9px] font-mono bg-amber-50 text-amber-700 border border-amber-200 rounded">
                      Featured
                    </span>
                  )}
                  <span
                    className={`px-2 py-0.5 text-[9px] font-mono rounded ${
                      p.published
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {p.published ? "Published" : "Draft"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Articles */}
        <div className="bg-white border border-[#E4E3DC] rounded-2xl p-6 shadow-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E4E3DC]">
            <h3 className="text-base font-serif font-medium text-[#111418]">Articles & Blogs</h3>
            <Link
              href="/admin/blogs"
              className="text-xs font-mono text-[#5F6978] hover:text-[#111418]"
            >
              View all ({blogs.length})
            </Link>
          </div>

          <div className="space-y-3">
            {blogs.slice(0, 4).map((b) => (
              <div
                key={b.id}
                className="flex items-center justify-between p-3 bg-[#FAF9F6] border border-[#E4E3DC] rounded-xl"
              >
                <div className="min-w-0 pr-2">
                  <div className="text-xs font-medium text-[#111418] truncate">{b.title}</div>
                  <div className="text-[10px] font-mono text-[#8C96A5]">
                    {b.category} · {b.readingTime}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {b.featured && (
                    <span className="px-2 py-0.5 text-[9px] font-mono bg-amber-50 text-amber-700 border border-amber-200 rounded">
                      Featured
                    </span>
                  )}
                  <span
                    className={`px-2 py-0.5 text-[9px] font-mono rounded ${
                      b.published
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}
                  >
                    {b.published ? "Published" : "Draft"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
