"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ArrowRight, BookOpen, Clock, Tag } from "lucide-react";
import { BlogPost } from "@/lib/types";

interface BlogClientProps {
  blogs: BlogPost[];
}

export const BlogClient: React.FC<BlogClientProps> = ({ blogs }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(blogs.map((b) => b.category)))];

  const filteredBlogs = blogs.filter((b) => {
    const matchesCategory = selectedCategory === "All" || b.category === selectedCategory;
    const matchesSearch =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12">
      {/* Search & Category Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center pb-6 border-b border-[#E4E3DC]">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-mono rounded-full transition-colors ${
                selectedCategory === cat
                  ? "bg-[#111418] text-white shadow-subtle"
                  : "bg-white text-[#5F6978] hover:text-[#111418] border border-[#E4E3DC]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#8C96A5] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search articles & topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-[#E4E3DC] rounded-lg text-xs text-[#111418] placeholder-[#8C96A5] focus:outline-none focus:ring-1 focus:ring-[#111418]"
          />
        </div>
      </div>

      {/* Blogs List */}
      {filteredBlogs.length === 0 ? (
        <div className="p-12 text-center bg-white border border-[#E4E3DC] rounded-2xl">
          <BookOpen className="w-8 h-8 text-[#8C96A5] mx-auto mb-3" />
          <h3 className="text-base font-serif font-medium text-[#111418]">No articles found</h3>
          <p className="text-xs text-[#5F6978] mt-1">Try adjusting your search or category filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredBlogs.map((blog) => (
            <article
              key={blog.id}
              className="group bg-white border border-[#E4E3DC] hover:border-[#111418]/30 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-subtle hover:shadow-editorial"
            >
              <div className="space-y-4">
                {blog.coverImage && (
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="block relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-[#E4E3DC] bg-[#FAF9F6]"
                  >
                    <Image
                      src={blog.coverImage}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>
                )}

                <div className="flex items-center gap-3 text-xs font-mono text-[#8C96A5]">
                  <span className="px-2.5 py-0.5 bg-[#F4F3EE] text-[#111418] rounded border border-[#E4E3DC]">
                    {blog.category}
                  </span>
                  <span>{blog.publishedAt}</span>
                  <span>· {blog.readingTime}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-serif font-medium text-[#111418] tracking-tight">
                  <Link href={`/blog/${blog.slug}`} className="hover:underline">
                    {blog.title}
                  </Link>
                </h3>

                <p className="text-sm text-[#5F6978] leading-relaxed line-clamp-3">
                  {blog.excerpt}
                </p>
              </div>

              {/* Tags and CTA */}
              <div className="pt-6 mt-6 border-t border-[#E4E3DC] flex items-center justify-between gap-4">
                <div className="flex flex-wrap gap-1">
                  {blog.tags?.slice(0, 3).map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono text-[#8C96A5] bg-[#FAF9F6] px-2 py-0.5 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/blog/${blog.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-mono font-medium text-[#111418] group-hover:text-blue-600 transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
