"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Plus, Edit2, Trash2, Check, X, Star, Eye, EyeOff, Upload, ExternalLink, ArrowUpDown } from "lucide-react";
import { Project, ProjectMetric, ProjectPipelineStep, ProjectResult } from "@/lib/types";

interface ProjectsManagerProps {
  initialProjects: Project[];
}

export const ProjectsManager: React.FC<ProjectsManagerProps> = ({ initialProjects }) => {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const emptyProject: Project = {
    id: "",
    slug: "",
    title: "",
    shortDescription: "",
    category: "Computer Vision",
    year: new Date().getFullYear().toString(),
    technologies: ["PyTorch", "Python", "OpenCV"],
    thumbnail: "/images/nuclear-pleomorphism.jpg",
    githubUrl: "https://github.com/Shamanthsheni",
    demoUrl: "",
    featured: false,
    published: true,
    order: projects.length + 1,
    metrics: [
      { label: "Accuracy / IoU", value: "92%", subtext: "Validation set" },
      { label: "Throughput", value: "3.5x", subtext: "Faster inference" },
    ],
    caseStudy: {
      problem: "",
      approach: ["Initial exploratory baseline", "Introduced custom attention mechanism"],
      technologies: ["PyTorch", "Python"],
      process: [
        { step: "01", title: "Data Ingestion", description: "Standardizing dataset", tech: "Preprocessing" },
        { step: "02", title: "Model Inference", description: "Deep learning pipeline", tech: "PyTorch" },
      ],
      results: [
        { metric: "Error Rate (MAE)", baseline: "75.0", ours: "62.0", delta: "17.3% Reduction" },
      ],
      learned: "",
    },
  };

  const handleOpenCreate = () => {
    setIsNew(true);
    setEditingProject({
      ...emptyProject,
      id: "proj-" + Date.now(),
      slug: "new-project-" + Date.now(),
    });
  };

  const handleOpenEdit = (project: Project) => {
    setIsNew(false);
    setEditingProject(JSON.parse(JSON.stringify(project)));
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(`/api/cms/projects?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects(projects.filter((p) => p.id !== id));
        router.refresh();
      }
    } catch (e) {
      alert("Failed to delete project");
    }
  };

  const handleToggleFeatured = async (project: Project) => {
    const updated = { ...project, featured: !project.featured };
    try {
      await fetch("/api/cms/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      setProjects(projects.map((p) => (p.id === project.id ? updated : p)));
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  };

  const handleTogglePublished = async (project: Project) => {
    const updated = { ...project, published: !project.published };
    try {
      await fetch("/api/cms/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      setProjects(projects.map((p) => (p.id === project.id ? updated : p)));
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingProject) return;

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
        setEditingProject({ ...editingProject, thumbnail: data.url });
      }
    } catch (err) {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/cms/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProject),
      });

      const data = await res.json();
      if (res.ok) {
        if (isNew) {
          setProjects([...projects, data]);
        } else {
          setProjects(projects.map((p) => (p.id === data.id ? data : p)));
        }
        setEditingProject(null);
        router.refresh();
      } else {
        setError(data.error || "Failed to save project");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E4E3DC]">
        <div>
          <h1 className="text-2xl font-serif font-medium text-[#111418]">
            Manage Projects ({projects.length})
          </h1>
          <p className="text-xs text-[#5F6978] mt-0.5">
            Create, edit, reorder, and configure case studies for all your work.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#111418] hover:bg-[#1E293B] text-white text-xs font-medium rounded-lg transition-colors shadow-subtle self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Projects List Table / Cards */}
      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="p-5 bg-white border border-[#E4E3DC] rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-subtle hover:border-[#111418]/30 transition-all"
          >
            <div className="flex items-start gap-4 min-w-0">
              <div className="relative w-20 h-14 rounded-lg overflow-hidden border border-[#E4E3DC] bg-[#FAF9F6] flex-shrink-0">
                <Image
                  src={project.thumbnail || "/images/nuclear-pleomorphism.jpg"}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 py-0.5 text-[10px] font-mono bg-[#F4F3EE] text-[#111418] rounded">
                    {project.category}
                  </span>
                  <span className="text-xs font-mono text-[#8C96A5]">{project.year}</span>
                  {project.featured && (
                    <span className="px-2 py-0.5 text-[10px] font-mono bg-amber-50 text-amber-700 border border-amber-200 rounded">
                      Featured
                    </span>
                  )}
                  <span
                    className={`px-2 py-0.5 text-[10px] font-mono rounded ${
                      project.published
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {project.published ? "Published" : "Draft"}
                  </span>
                </div>

                <h3 className="text-base font-serif font-medium text-[#111418] truncate">
                  {project.title}
                </h3>
                <p className="text-xs text-[#5F6978] truncate max-w-xl">
                  {project.shortDescription}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 self-end md:self-center flex-shrink-0">
              <button
                onClick={() => handleToggleFeatured(project)}
                title={project.featured ? "Remove from Featured" : "Mark as Featured"}
                className={`p-2 rounded-lg border transition-colors ${
                  project.featured
                    ? "bg-amber-50 border-amber-200 text-amber-600"
                    : "bg-[#FAF9F6] border-[#E4E3DC] text-[#8C96A5] hover:text-[#111418]"
                }`}
              >
                <Star className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => handleTogglePublished(project)}
                title={project.published ? "Unpublish Project" : "Publish Project"}
                className={`p-2 rounded-lg border transition-colors ${
                  project.published
                    ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                    : "bg-[#FAF9F6] border-[#E4E3DC] text-[#8C96A5] hover:text-[#111418]"
                }`}
              >
                {project.published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={() => handleOpenEdit(project)}
                className="p-2 bg-[#FAF9F6] hover:bg-[#F4F3EE] border border-[#E4E3DC] text-[#111418] rounded-lg transition-colors text-xs font-mono inline-flex items-center gap-1"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>

              <button
                onClick={() => handleDelete(project.id)}
                className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                title="Delete Project"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Create Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-3xl my-8 bg-white border border-[#E4E3DC] rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E4E3DC] bg-[#FAF9F6]">
              <h2 className="text-lg font-serif font-medium text-[#111418]">
                {isNew ? "Create New Project" : `Edit Project: ${editingProject.title}`}
              </h2>
              <button
                onClick={() => setEditingProject(null)}
                className="p-1.5 text-[#8C96A5] hover:text-[#111418] rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveProject} className="p-6 overflow-y-auto space-y-6">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
                  {error}
                </div>
              )}

              {/* Core Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#5F6978] block">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.title}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        title: e.target.value,
                        slug: isNew
                          ? e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
                          : editingProject.slug,
                      })
                    }
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E4E3DC] rounded-lg text-xs text-[#111418] focus:outline-none focus:ring-1 focus:ring-[#111418]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#5F6978] block">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.slug}
                    onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E4E3DC] rounded-lg text-xs text-[#111418] focus:outline-none focus:ring-1 focus:ring-[#111418]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#5F6978] block">Category</label>
                  <input
                    type="text"
                    value={editingProject.category}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E4E3DC] rounded-lg text-xs text-[#111418] focus:outline-none focus:ring-1 focus:ring-[#111418]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#5F6978] block">Year</label>
                  <input
                    type="text"
                    value={editingProject.year}
                    onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E4E3DC] rounded-lg text-xs text-[#111418] focus:outline-none focus:ring-1 focus:ring-[#111418]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#5F6978] block">Short Summary Description *</label>
                <textarea
                  required
                  rows={2}
                  value={editingProject.shortDescription}
                  onChange={(e) => setEditingProject({ ...editingProject, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E4E3DC] rounded-lg text-xs text-[#111418] focus:outline-none focus:ring-1 focus:ring-[#111418] resize-none"
                />
              </div>

              {/* Media Thumbnail & Upload */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#5F6978] block">Thumbnail Image URL / Upload</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingProject.thumbnail}
                    onChange={(e) => setEditingProject({ ...editingProject, thumbnail: e.target.value })}
                    className="flex-1 px-3 py-2 bg-[#FAF9F6] border border-[#E4E3DC] rounded-lg text-xs text-[#111418] focus:outline-none focus:ring-1 focus:ring-[#111418]"
                  />
                  <label className="px-3 py-2 bg-[#F4F3EE] hover:bg-[#EAE8E0] border border-[#E4E3DC] rounded-lg text-xs font-mono cursor-pointer flex items-center gap-1.5 text-[#111418]">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploading ? "Uploading..." : "Upload File"}</span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>
              </div>

              {/* Technologies */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#5F6978] block">
                  Technologies (comma separated)
                </label>
                <input
                  type="text"
                  value={editingProject.technologies.join(", ")}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      technologies: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E4E3DC] rounded-lg text-xs text-[#111418] focus:outline-none focus:ring-1 focus:ring-[#111418]"
                />
              </div>

              {/* Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#5F6978] block">GitHub Repository URL</label>
                  <input
                    type="text"
                    value={editingProject.githubUrl || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E4E3DC] rounded-lg text-xs text-[#111418] focus:outline-none focus:ring-1 focus:ring-[#111418]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#5F6978] block">Live Demo URL</label>
                  <input
                    type="text"
                    value={editingProject.demoUrl || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, demoUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E4E3DC] rounded-lg text-xs text-[#111418] focus:outline-none focus:ring-1 focus:ring-[#111418]"
                  />
                </div>
              </div>

              {/* Case Study Problem & Learnings */}
              <div className="space-y-4 pt-4 border-t border-[#E4E3DC]">
                <h3 className="text-xs font-mono uppercase tracking-wider font-semibold text-[#111418]">
                  Case Study Details
                </h3>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#5F6978] block">The Problem</label>
                  <textarea
                    rows={3}
                    value={editingProject.caseStudy.problem}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        caseStudy: { ...editingProject.caseStudy, problem: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E4E3DC] rounded-lg text-xs text-[#111418] focus:outline-none focus:ring-1 focus:ring-[#111418]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#5F6978] block">
                    Architectural Approach (one per line)
                  </label>
                  <textarea
                    rows={3}
                    value={editingProject.caseStudy.approach.join("\n")}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        caseStudy: {
                          ...editingProject.caseStudy,
                          approach: e.target.value.split("\n").filter(Boolean),
                        },
                      })
                    }
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E4E3DC] rounded-lg text-xs text-[#111418] focus:outline-none focus:ring-1 focus:ring-[#111418]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#5F6978] block">Personal Reflection / What I Learned</label>
                  <textarea
                    rows={2}
                    value={editingProject.caseStudy.learned}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        caseStudy: { ...editingProject.caseStudy, learned: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E4E3DC] rounded-lg text-xs text-[#111418] focus:outline-none focus:ring-1 focus:ring-[#111418]"
                  />
                </div>
              </div>

              {/* Status Toggles */}
              <div className="flex items-center gap-6 pt-4 border-t border-[#E4E3DC]">
                <label className="flex items-center gap-2 text-xs font-mono text-[#111418] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.published}
                    onChange={(e) => setEditingProject({ ...editingProject, published: e.target.checked })}
                    className="rounded border-[#E4E3DC] text-[#111418] focus:ring-0"
                  />
                  <span>Published on site</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-mono text-[#111418] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.featured}
                    onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                    className="rounded border-[#E4E3DC] text-[#111418] focus:ring-0"
                  />
                  <span>Featured on Homepage</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-6 border-t border-[#E4E3DC]">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 bg-[#FAF9F6] hover:bg-[#F4F3EE] border border-[#E4E3DC] text-xs font-medium rounded-lg text-[#111418]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-[#111418] hover:bg-[#1E293B] text-white text-xs font-medium rounded-lg transition-colors shadow-subtle disabled:opacity-50"
                >
                  {saving ? "Saving..." : isNew ? "Create Project" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
