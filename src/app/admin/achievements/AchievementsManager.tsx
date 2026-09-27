"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit2, Trash2, X, Eye, EyeOff } from "lucide-react";
import { Achievement } from "@/lib/types";

interface AchievementsManagerProps {
  initialAchievements: Achievement[];
}

export const AchievementsManager: React.FC<AchievementsManagerProps> = ({ initialAchievements }) => {
  const router = useRouter();
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);
  const [editingItem, setEditingItem] = useState<Achievement | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const emptyAchievement: Achievement = {
    id: "",
    title: "",
    category: "Research & Publications",
    date: new Date().getFullYear().toString(),
    description: "",
    certificateUrl: "",
    link: "",
    published: true,
  };

  const handleOpenCreate = () => {
    setIsNew(true);
    setEditingItem({
      ...emptyAchievement,
      id: "ach-" + Date.now(),
    });
  };

  const handleOpenEdit = (item: Achievement) => {
    setIsNew(false);
    setEditingItem(JSON.parse(JSON.stringify(item)));
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this achievement?")) return;

    try {
      const res = await fetch(`/api/cms/achievements?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setAchievements(achievements.filter((a) => a.id !== id));
        router.refresh();
      }
    } catch {
      alert("Failed to delete achievement");
    }
  };

  const handleTogglePublished = async (item: Achievement) => {
    const updated = { ...item, published: !item.published };
    try {
      await fetch("/api/cms/achievements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      setAchievements(achievements.map((a) => (a.id === item.id ? updated : a)));
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/cms/achievements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem),
      });

      const data = await res.json();
      if (res.ok) {
        if (isNew) {
          setAchievements([data, ...achievements]);
        } else {
          setAchievements(achievements.map((a) => (a.id === data.id ? data : a)));
        }
        setEditingItem(null);
        router.refresh();
      } else {
        setError(data.error || "Failed to save achievement");
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E4E3DC]">
        <div>
          <h1 className="text-2xl font-serif font-medium text-[#111418]">
            Manage Achievements ({achievements.length})
          </h1>
          <p className="text-xs text-[#5F6978] mt-0.5">
            Add awards, certifications, research milestones, and verified credentials.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#111418] hover:bg-[#1E293B] text-white text-xs font-medium rounded-lg transition-colors shadow-subtle self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Achievement</span>
        </button>
      </div>

      {/* List */}
      <div className="space-y-4">
        {achievements.map((item) => (
          <div
            key={item.id}
            className="p-5 bg-white border border-[#E4E3DC] rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-subtle hover:border-[#111418]/30 transition-all"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-[10px] font-mono bg-[#F4F3EE] text-[#111418] rounded">
                  {item.category}
                </span>
                <span className="text-xs font-mono text-[#8C96A5]">{item.date}</span>
                <span
                  className={`px-2 py-0.5 text-[10px] font-mono rounded ${
                    item.published
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {item.published ? "Published" : "Hidden"}
                </span>
              </div>
              <h3 className="text-base font-serif font-medium text-[#111418]">
                {item.title}
              </h3>
              <p className="text-xs text-[#5F6978] max-w-2xl leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="flex items-center gap-2 self-end md:self-center flex-shrink-0">
              <button
                onClick={() => handleTogglePublished(item)}
                className={`p-2 rounded-lg border transition-colors ${
                  item.published
                    ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                    : "bg-[#FAF9F6] border-[#E4E3DC] text-[#8C96A5] hover:text-[#111418]"
                }`}
              >
                {item.published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={() => handleOpenEdit(item)}
                className="p-2 bg-[#FAF9F6] hover:bg-[#F4F3EE] border border-[#E4E3DC] text-[#111418] rounded-lg transition-colors text-xs font-mono inline-flex items-center gap-1"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>

              <button
                onClick={() => handleDelete(item.id)}
                className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-xl bg-white border border-[#E4E3DC] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E4E3DC] bg-[#FAF9F6]">
              <h2 className="text-base font-serif font-medium text-[#111418]">
                {isNew ? "Add Achievement" : "Edit Achievement"}
              </h2>
              <button onClick={() => setEditingItem(null)} className="p-1.5 text-[#8C96A5] hover:text-[#111418]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
                  {error}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#5F6978] block">Title *</label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E4E3DC] rounded-lg text-xs text-[#111418] focus:outline-none focus:ring-1 focus:ring-[#111418]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#5F6978] block">Category</label>
                  <select
                    value={editingItem.category}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        category: e.target.value as Achievement["category"],
                      })
                    }
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E4E3DC] rounded-lg text-xs text-[#111418] focus:outline-none focus:ring-1 focus:ring-[#111418]"
                  >
                    <option value="Research & Publications">Research & Publications</option>
                    <option value="Competitions & Hackathons">Competitions & Hackathons</option>
                    <option value="Certifications">Certifications</option>
                    <option value="Milestones">Milestones</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#5F6978] block">Date / Period</label>
                  <input
                    type="text"
                    value={editingItem.date}
                    onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E4E3DC] rounded-lg text-xs text-[#111418] focus:outline-none focus:ring-1 focus:ring-[#111418]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#5F6978] block">Description *</label>
                <textarea
                  required
                  rows={3}
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E4E3DC] rounded-lg text-xs text-[#111418] focus:outline-none focus:ring-1 focus:ring-[#111418] resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#5F6978] block">Link / Certificate URL</label>
                <input
                  type="text"
                  value={editingItem.link || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, link: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E4E3DC] rounded-lg text-xs text-[#111418] focus:outline-none focus:ring-1 focus:ring-[#111418]"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 text-xs font-mono text-[#111418] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingItem.published}
                    onChange={(e) => setEditingItem({ ...editingItem, published: e.target.checked })}
                    className="rounded border-[#E4E3DC] text-[#111418] focus:ring-0"
                  />
                  <span>Published on public website</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E4E3DC]">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 bg-[#FAF9F6] hover:bg-[#F4F3EE] border border-[#E4E3DC] text-xs font-medium rounded-lg text-[#111418]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-[#111418] hover:bg-[#1E293B] text-white text-xs font-medium rounded-lg transition-colors shadow-subtle disabled:opacity-50"
                >
                  {saving ? "Saving..." : isNew ? "Add Achievement" : "Update Achievement"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
