"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Check, Settings as SettingsIcon } from "lucide-react";
import { SiteSettings, Project, BlogPost } from "@/lib/types";

interface SettingsManagerProps {
  initialSettings: SiteSettings;
  projects: Project[];
  blogs: BlogPost[];
}

export const SettingsManager: React.FC<SettingsManagerProps> = ({
  initialSettings,
  projects,
  blogs,
}) => {
  const router = useRouter();
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    try {
      const res = await fetch("/api/cms/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
        router.refresh();
      } else {
        alert("Failed to save settings");
      }
    } catch (e) {
      alert("Error saving settings");
    } finally {
      setSaving(false);
    }
  };

  const toggleFeaturedProject = (id: string) => {
    const current = settings.featuredProjectIds || [];
    const updated = current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id];
    setSettings({ ...settings, featuredProjectIds: updated });
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E4E3DC]">
        <div>
          <h1 className="text-2xl font-serif font-medium text-[#111418]">
            Site Settings & SEO
          </h1>
          <p className="text-xs text-[#5F6978] mt-0.5">
            Configure homepage highlights, SEO metadata, and contact preferences.
          </p>
        </div>

        {success && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-mono">
            <Check className="w-3.5 h-3.5" />
            <span>Settings Saved!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Homepage Hero Copy */}
        <div className="p-6 bg-white border border-[#E4E3DC] rounded-2xl shadow-subtle space-y-4">
          <h2 className="text-sm font-mono uppercase tracking-wider font-semibold text-[#111418]">
            01 / Homepage Hero Copy
          </h2>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#5F6978] block">Hero Sub-Tagline</label>
            <input
              type="text"
              value={settings.heroTagline}
              onChange={(e) => setSettings({ ...settings, heroTagline: e.target.value })}
              className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E4E3DC] rounded-lg text-xs text-[#111418] focus:outline-none focus:ring-1 focus:ring-[#111418]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#5F6978] block">Personal Statement</label>
            <textarea
              rows={3}
              value={settings.heroStatement}
              onChange={(e) => setSettings({ ...settings, heroStatement: e.target.value })}
              className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E4E3DC] rounded-lg text-xs text-[#111418] focus:outline-none focus:ring-1 focus:ring-[#111418]"
            />
          </div>
        </div>

        {/* Featured Homepage Selection */}
        <div className="p-6 bg-white border border-[#E4E3DC] rounded-2xl shadow-subtle space-y-6">
          <h2 className="text-sm font-mono uppercase tracking-wider font-semibold text-[#111418]">
            02 / Homepage Featured Projects & Blog
          </h2>

          {/* Featured Projects Checkboxes */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-[#5F6978] block">
              Featured Projects on Homepage (Max 4 selected):
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {projects.map((proj) => {
                const isChecked = (settings.featuredProjectIds || []).includes(proj.id) || (settings.featuredProjectIds || []).includes(proj.slug);
                return (
                  <label
                    key={proj.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      isChecked
                        ? "bg-[#FAF9F6] border-[#111418]/40"
                        : "bg-white border-[#E4E3DC] hover:bg-[#FAF9F6]"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleFeaturedProject(proj.id)}
                      className="rounded border-[#E4E3DC] text-[#111418] focus:ring-0"
                    />
                    <div className="text-xs min-w-0">
                      <div className="font-medium text-[#111418] truncate">{proj.title}</div>
                      <div className="text-[10px] font-mono text-[#8C96A5]">{proj.category}</div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Featured Blog Selector */}
          <div className="space-y-1.5 pt-2">
            <label className="text-xs font-mono text-[#5F6978] block">Featured Homepage Article</label>
            <select
              value={settings.featuredBlogSlug}
              onChange={(e) => setSettings({ ...settings, featuredBlogSlug: e.target.value })}
              className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E4E3DC] rounded-lg text-xs text-[#111418] focus:outline-none focus:ring-1 focus:ring-[#111418]"
            >
              {blogs.map((b) => (
                <option key={b.id} value={b.slug}>
                  {b.title} ({b.category})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Global SEO Settings */}
        <div className="p-6 bg-white border border-[#E4E3DC] rounded-2xl shadow-subtle space-y-4">
          <h2 className="text-sm font-mono uppercase tracking-wider font-semibold text-[#111418]">
            03 / SEO Metadata
          </h2>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#5F6978] block">Default Meta Title</label>
            <input
              type="text"
              value={settings.seoTitle}
              onChange={(e) => setSettings({ ...settings, seoTitle: e.target.value })}
              className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E4E3DC] rounded-lg text-xs text-[#111418] focus:outline-none focus:ring-1 focus:ring-[#111418]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#5F6978] block">Default Meta Description</label>
            <textarea
              rows={2}
              value={settings.seoDescription}
              onChange={(e) => setSettings({ ...settings, seoDescription: e.target.value })}
              className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E4E3DC] rounded-lg text-xs text-[#111418] focus:outline-none focus:ring-1 focus:ring-[#111418]"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-[#111418] hover:bg-[#1E293B] text-white text-xs font-medium rounded-lg transition-colors shadow-subtle flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saving ? "Saving Settings..." : "Save Site Settings"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
