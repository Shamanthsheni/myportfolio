"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Upload, Check, Save, Plus, Trash2, User, FileText } from "lucide-react";
import { ProfileData } from "@/lib/types";

interface ProfileManagerProps {
  initialProfile: ProfileData;
}

export const ProfileManager: React.FC<ProfileManagerProps> = ({ initialProfile }) => {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileData>(initialProfile);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/cms/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        setProfile({ ...profile, avatarUrl: data.url });
      }
    } catch (err) {
      alert("Photo upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    try {
      const res = await fetch("/api/cms/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
        router.refresh();
      } else {
        alert("Failed to save profile");
      }
    } catch (err) {
      alert("Error saving profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E4E3DC]">
        <div>
          <h1 className="text-2xl font-serif font-medium text-[#111418]">
            Edit Profile & Bio
          </h1>
          <p className="text-xs text-[#5F6978] mt-0.5">
            Update your personal identity, bio, portrait photograph, contact info, and skills.
          </p>
        </div>

        {success && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-mono">
            <Check className="w-3.5 h-3.5" />
            <span>Profile Saved!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Photo & Core Identity */}
        <div className="p-6 bg-white border border-[#E4E3DC] rounded-2xl shadow-subtle space-y-6">
          <h2 className="text-sm font-mono uppercase tracking-wider font-semibold text-[#111418]">
            01 / Identity & Photography
          </h2>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative w-24 h-28 rounded-xl overflow-hidden border border-[#E4E3DC] bg-[#FAF9F6] shadow-subtle flex-shrink-0">
              <Image
                src={profile.avatarUrl || "/images/shamanth_portrait.jpg"}
                alt={profile.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-2 flex-1">
              <label className="text-xs font-mono text-[#5F6978] block">Profile Photo URL / Upload</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={profile.avatarUrl}
                  onChange={(e) => setProfile({ ...profile, avatarUrl: e.target.value })}
                  className="flex-1 px-3 py-2 bg-[#FAF9F6] border border-[#E4E3DC] rounded-lg text-xs text-[#111418] focus:outline-none focus:ring-1 focus:ring-[#111418]"
                />
                <label className="px-3.5 py-2 bg-[#F4F3EE] hover:bg-[#EAE8E0] border border-[#E4E3DC] rounded-lg text-xs font-mono cursor-pointer flex items-center gap-1.5 text-[#111418] whitespace-nowrap">
                  <Upload className="w-3.5 h-3.5" />
                  <span>{uploading ? "Uploading..." : "Upload Photo"}</span>
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>
              <p className="text-[11px] text-[#8C96A5]">
                Upload your professional photograph here. It will instantly update across the site.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#E4E3DC]">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#5F6978] block">Full Name</label>
              <input
                type="text"
                required
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E4E3DC] rounded-lg text-xs text-[#111418] focus:outline-none focus:ring-1 focus:ring-[#111418]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#5F6978] block">Hero Sub-Headline</label>
              <input
                type="text"
                required
                value={profile.headline}
                onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
                className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E4E3DC] rounded-lg text-xs text-[#111418] focus:outline-none focus:ring-1 focus:ring-[#111418]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#5F6978] block">Availability Status Badge</label>
            <input
              type="text"
              value={profile.statusBadge}
              onChange={(e) => setProfile({ ...profile, statusBadge: e.target.value })}
              className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E4E3DC] rounded-lg text-xs text-[#111418] focus:outline-none focus:ring-1 focus:ring-[#111418]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#5F6978] block">Biography Statement</label>
            <textarea
              rows={4}
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E4E3DC] rounded-lg text-xs text-[#111418] focus:outline-none focus:ring-1 focus:ring-[#111418]"
            />
          </div>
        </div>

        {/* Contact & Social Channels */}
        <div className="p-6 bg-white border border-[#E4E3DC] rounded-2xl shadow-subtle space-y-4">
          <h2 className="text-sm font-mono uppercase tracking-wider font-semibold text-[#111418]">
            02 / Contact & Social Channels
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#5F6978] block">Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E4E3DC] rounded-lg text-xs text-[#111418] focus:outline-none focus:ring-1 focus:ring-[#111418]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#5F6978] block">Phone</label>
              <input
                type="text"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E4E3DC] rounded-lg text-xs text-[#111418] focus:outline-none focus:ring-1 focus:ring-[#111418]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#5F6978] block">Location</label>
              <input
                type="text"
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E4E3DC] rounded-lg text-xs text-[#111418] focus:outline-none focus:ring-1 focus:ring-[#111418]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#5F6978] block">GitHub Profile URL</label>
              <input
                type="text"
                value={profile.github}
                onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E4E3DC] rounded-lg text-xs text-[#111418] focus:outline-none focus:ring-1 focus:ring-[#111418]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#5F6978] block">LinkedIn Profile URL</label>
              <input
                type="text"
                value={profile.linkedin}
                onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E4E3DC] rounded-lg text-xs text-[#111418] focus:outline-none focus:ring-1 focus:ring-[#111418]"
              />
            </div>
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
            <span>{saving ? "Saving Changes..." : "Save Profile Changes"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
