"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Plus, Edit2, Trash2, X, Star, Eye, EyeOff, Upload } from "lucide-react";
import { BlogPost } from "@/lib/types";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";

interface BlogsManagerProps {
  initialBlogs: BlogPost[];
}

export const BlogsManager: React.FC<BlogsManagerProps> = ({ initialBlogs }) => {
  const router = useRouter();
  const [blogs, setBlogs] = useState<BlogPost[]>(initialBlogs);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [previewMode, setPreviewMode] = useState<"write" | "preview" | "split">("write");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const emptyBlog: BlogPost = {
    id: "",
    slug: "",
    title: "",
    excerpt: "",
    content: `## Introduction\n\nWrite your technical article here in markdown...\n\n### Mathematical Formulation\n\n$$\\mathcal{L}_{total} = \\mathcal{L}_{cls} + \\lambda \\mathcal{L}_{reg}$$\n\n### Implementation in PyTorch\n\n\`\`\`python\nimport torch\nimport torch.nn as nn\n\nclass CustomModel(nn.Module):\n    def __init__(self):\n        super().__init__()\n\`\`\`\n`,
    coverImage: "/images/nuclear-pleomorphism.jpg",
    category: "Computer Vision",
    tags: ["Deep Learning", "PyTorch"],
    publishedAt: new Date().toISOString().split("T")[0],
    published: true,
    featured: false,
    readingTime: "5 min read",
    seo: {
      title: "",
      description: "",
    },
  };

  const handleOpenCreate = () => {
    setIsNew(true);
    setEditingBlog({
      ...emptyBlog,
      id: "blog-" + Date.now(),
      slug: "new-article-" + Date.now(),
    });
  };

  const handleOpenEdit = (blog: BlogPost) => {
    setIsNew(false);
    setEditingBlog(JSON.parse(JSON.stringify(blog)));
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    try {
      const res = await fetch(`/api/cms/blogs?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setBlogs(blogs.filter((b) => b.id !== id));
        router.refresh();
      }
    } catch {
      alert("Failed to delete blog post");
    }
  };

  const handleTogglePublished = async (blog: BlogPost) => {
    const updated = { ...blog, published: !blog.published };
    try {
      await fetch("/api/cms/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      setBlogs(blogs.map((b) => (b.id === blog.id ? updated : b)));
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggleFeatured = async (blog: BlogPost) => {
    const updated = { ...blog, featured: !blog.featured };
    try {
      await fetch("/api/cms/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      setBlogs(blogs.map((b) => (b.id === blog.id ? updated : b)));
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingBlog) return;

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
        setEditingBlog({ ...editingBlog, coverImage: data.url });
      }
    } catch {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog) return;

    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/cms/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingBlog),
      });

      const data = await res.json();
      if (res.ok) {
        if (isNew) {
          setBlogs([data, ...blogs]);
        } else {
          setBlogs(blogs.map((b) => (b.id === data.id ? data : b)));
        }
        setEditingBlog(null);
        router.refresh();
      } else {
        setError(data.error || "Failed to save blog post");
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
            Manage Articles & Blogs ({blogs.length})
          </h1>
          <p className="text-xs text-[#5F6978] mt-0.5">
            Write, edit, draft, and publish rich markdown technical articles without touching code.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#111418] hover:bg-[#1E293B] text-white text-xs font-medium rounded-lg transition-colors shadow-subtle self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Write New Article</span>
        </button>
      </div>

      {/* Blogs List */}
      <div className="space-y-4">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="p-5 bg-white border border-[#E4E3DC] rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-subtle hover:border-[#111418]/30 transition-all"
          >
            <div className="flex items-start gap-4 min-w-0">
              {blog.coverImage && (
                <div className="relative w-20 h-14 rounded-lg overflow-hidden border border-[#E4E3DC] bg-[#FAF9F6] flex-shrink-0">
                  <Image
                    src={blog.coverImage}
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="min-w-0 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 py-0.5 text-[10px] font-mono bg-[#F4F3EE] text-[#111418] rounded">
                    {blog.category}
                  </span>
                  <span className="text-xs font-mono text-[#8C96A5]">{blog.publishedAt}</span>
                  <span className="text-xs font-mono text-[#8C96A5]">· {blog.readingTime}</span>
                  {blog.featured && (
                    <span className="px-2 py-0.5 text-[10px] font-mono bg-amber-50 text-amber-700 border border-amber-200 rounded">
                      Featured
                    </span>
                  )}
                  <span
                    className={`px-2 py-0.5 text-[10px] font-mono rounded ${
                      blog.published
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}
                  >
                    {blog.published ? "Published" : "Draft"}
                  </span>
                </div>

                <h3 className="text-base font-serif font-medium text-[#111418] truncate">
                  {blog.title}
                </h3>
                <p className="text-xs text-[#5F6978] truncate max-w-xl">
                  {blog.excerpt}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 self-end md:self-center flex-shrink-0">
              <button
                onClick={() => handleToggleFeatured(blog)}
                title={blog.featured ? "Remove from Featured" : "Mark as Featured"}
                className={`p-2 rounded-lg border transition-colors ${
                  blog.featured
                    ? "bg-amber-50 border-amber-200 text-amber-600"
                    : "bg-[#FAF9F6] border-[#E4E3DC] text-[#8C96A5] hover:text-[#111418]"
                }`}
              >
                <Star className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => handleTogglePublished(blog)}
                title={blog.published ? "Unpublish (Move to Draft)" : "Publish Article"}
                className={`p-2 rounded-lg border transition-colors ${
                  blog.published
                    ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                    : "bg-amber-50 border-amber-200 text-amber-600"
                }`}
              >
                {blog.published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={() => handleOpenEdit(blog)}
                className="p-2 bg-[#FAF9F6] hover:bg-[#F4F3EE] border border-[#E4E3DC] text-[#111418] rounded-lg transition-colors text-xs font-mono inline-flex items-center gap-1"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>

              <button
                onClick={() => handleDelete(blog.id)}
                className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                title="Delete Article"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Editor Modal */}
      {editingBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-5xl my-8 bg-white border border-[#E4E3DC] rounded-2xl shadow-2xl flex flex-col max-h-[92vh]">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E4E3DC] bg-[#FAF9F6]">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-serif font-medium text-[#111418]">
                  {isNew ? "Write New Article" : `Edit Article: ${editingBlog.title}`}
                </h2>
                <span className="text-xs font-mono text-[#8C96A5]">
                  ({editingBlog.readingTime})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditingBlog(null)}
                  className="p-1.5 text-[#8C96A5] hover:text-[#111418] rounded-md"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveBlog} className="p-6 overflow-y-auto space-y-6">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
                  {error}
                </div>
              )}

              {/* Title & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#5F6978] block">Article Title *</label>
                  <input
                    type="text"
                    required
                    value={editingBlog.title}
                    onChange={(e) =>
                      setEditingBlog({
                        ...editingBlog,
                        title: e.target.value,
                        slug: isNew
                          ? e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
                          : editingBlog.slug,
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
                    value={editingBlog.slug}
                    onChange={(e) => setEditingBlog({ ...editingBlog, slug: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E4E3DC] rounded-lg text-xs text-[#111418] focus:outline-none focus:ring-1 focus:ring-[#111418]"
                  />
                </div>
              </div>

              {/* Category, Date & Tags */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#5F6978] block">Category</label>
                  <input
                    type="text"
                    value={editingBlog.category}
                    onChange={(e) => setEditingBlog({ ...editingBlog, category: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E4E3DC] rounded-lg text-xs text-[#111418] focus:outline-none focus:ring-1 focus:ring-[#111418]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#5F6978] block">Publish Date</label>
                  <input
                    type="text"
                    value={editingBlog.publishedAt}
                    onChange={(e) => setEditingBlog({ ...editingBlog, publishedAt: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E4E3DC] rounded-lg text-xs text-[#111418] focus:outline-none focus:ring-1 focus:ring-[#111418]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#5F6978] block">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={editingBlog.tags?.join(", ") || ""}
                    onChange={(e) =>
                      setEditingBlog({
                        ...editingBlog,
                        tags: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                      })
                    }
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E4E3DC] rounded-lg text-xs text-[#111418] focus:outline-none focus:ring-1 focus:ring-[#111418]"
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#5F6978] block">Summary Excerpt *</label>
                <textarea
                  required
                  rows={2}
                  value={editingBlog.excerpt}
                  onChange={(e) => setEditingBlog({ ...editingBlog, excerpt: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E4E3DC] rounded-lg text-xs text-[#111418] focus:outline-none focus:ring-1 focus:ring-[#111418] resize-none"
                />
              </div>

              {/* Cover Image */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#5F6978] block">Cover Image URL / Upload</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingBlog.coverImage}
                    onChange={(e) => setEditingBlog({ ...editingBlog, coverImage: e.target.value })}
                    className="flex-1 px-3 py-2 bg-[#FAF9F6] border border-[#E4E3DC] rounded-lg text-xs text-[#111418] focus:outline-none focus:ring-1 focus:ring-[#111418]"
                  />
                  <label className="px-3 py-2 bg-[#F4F3EE] hover:bg-[#EAE8E0] border border-[#E4E3DC] rounded-lg text-xs font-mono cursor-pointer flex items-center gap-1.5 text-[#111418]">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploading ? "Uploading..." : "Upload Cover"}</span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>
              </div>

              {/* Content Editor with Write / Preview Tabs */}
              <div className="space-y-2 pt-2 border-t border-[#E4E3DC]">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono text-[#5F6978]">
                    Article Content (Markdown) *
                  </label>
                  <div className="flex items-center gap-1 bg-[#F4F3EE] p-1 rounded-lg border border-[#E4E3DC]">
                    <button
                      type="button"
                      onClick={() => setPreviewMode("write")}
                      className={`px-2.5 py-1 text-[11px] font-mono rounded ${
                        previewMode === "write" ? "bg-white text-[#111418] shadow-sm font-medium" : "text-[#5F6978]"
                      }`}
                    >
                      Write
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewMode("split")}
                      className={`px-2.5 py-1 text-[11px] font-mono rounded ${
                        previewMode === "split" ? "bg-white text-[#111418] shadow-sm font-medium" : "text-[#5F6978]"
                      }`}
                    >
                      Split View
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewMode("preview")}
                      className={`px-2.5 py-1 text-[11px] font-mono rounded ${
                        previewMode === "preview" ? "bg-white text-[#111418] shadow-sm font-medium" : "text-[#5F6978]"
                      }`}
                    >
                      Preview
                    </button>
                  </div>
                </div>

                {previewMode === "write" && (
                  <textarea
                    required
                    rows={14}
                    value={editingBlog.content}
                    onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
                    className="w-full p-4 bg-[#FAF9F6] border border-[#E4E3DC] rounded-xl text-xs font-mono text-[#111418] focus:outline-none focus:ring-1 focus:ring-[#111418] resize-y"
                    placeholder="Write article in Markdown..."
                  />
                )}

                {previewMode === "preview" && (
                  <div className="p-6 bg-white border border-[#E4E3DC] rounded-xl max-h-[400px] overflow-y-auto">
                    <MarkdownRenderer content={editingBlog.content} />
                  </div>
                )}

                {previewMode === "split" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <textarea
                      required
                      rows={14}
                      value={editingBlog.content}
                      onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
                      className="w-full p-4 bg-[#FAF9F6] border border-[#E4E3DC] rounded-xl text-xs font-mono text-[#111418] focus:outline-none focus:ring-1 focus:ring-[#111418] resize-none"
                    />
                    <div className="p-4 bg-white border border-[#E4E3DC] rounded-xl max-h-[300px] md:max-h-none overflow-y-auto">
                      <MarkdownRenderer content={editingBlog.content} />
                    </div>
                  </div>
                )}
              </div>

              {/* Status Toggles */}
              <div className="flex items-center gap-6 pt-4 border-t border-[#E4E3DC]">
                <label className="flex items-center gap-2 text-xs font-mono text-[#111418] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingBlog.published}
                    onChange={(e) => setEditingBlog({ ...editingBlog, published: e.target.checked })}
                    className="rounded border-[#E4E3DC] text-[#111418] focus:ring-0"
                  />
                  <span>Published (Visible on site)</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-mono text-[#111418] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingBlog.featured}
                    onChange={(e) => setEditingBlog({ ...editingBlog, featured: e.target.checked })}
                    className="rounded border-[#E4E3DC] text-[#111418] focus:ring-0"
                  />
                  <span>Featured on Homepage</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-6 border-t border-[#E4E3DC]">
                <button
                  type="button"
                  onClick={() => setEditingBlog(null)}
                  className="px-4 py-2 bg-[#FAF9F6] hover:bg-[#F4F3EE] border border-[#E4E3DC] text-xs font-medium rounded-lg text-[#111418]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-[#111418] hover:bg-[#1E293B] text-white text-xs font-medium rounded-lg transition-colors shadow-subtle disabled:opacity-50"
                >
                  {saving ? "Saving..." : isNew ? "Publish / Save Article" : "Update Article"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
