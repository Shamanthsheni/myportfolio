import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag, Share2 } from "lucide-react";
import { getBlogs, getBlogBySlug, getProfile } from "@/lib/cms-store";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";

interface Props {
  params: {
    slug: string;
  };
}

export const revalidate = 0;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blog = await getBlogBySlug(params.slug);
  if (!blog) {
    return {
      title: "Article Not Found — Shamanth S",
    };
  }

  return {
    title: `${blog.seo?.title || blog.title} — Shamanth S`,
    description: blog.seo?.description || blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: blog.coverImage ? [{ url: blog.coverImage }] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const [blog, allBlogs, profile] = await Promise.all([
    getBlogBySlug(params.slug),
    getBlogs(),
    getProfile(),
  ]);

  if (!blog) {
    notFound();
  }

  const otherBlogs = allBlogs
    .filter((b) => b.published && b.id !== blog.id)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#111418]">
      <Navigation profile={profile} />

      <main className="pt-28 pb-24 max-w-3xl mx-auto px-6 md:px-8">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#5F6978] hover:text-[#111418] transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to all articles</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="space-y-6 pb-8 border-b border-[#E4E3DC]">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 text-xs font-mono bg-[#F4F3EE] text-[#111418] border border-[#E4E3DC] rounded-full">
              {blog.category}
            </span>
            <span className="text-xs font-mono text-[#8C96A5]">{blog.publishedAt}</span>
            <span className="text-xs font-mono text-[#8C96A5]">· {blog.readingTime}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#111418] tracking-tight leading-tight">
            {blog.title}
          </h1>

          <p className="text-base sm:text-lg text-[#5F6978] font-sans leading-relaxed">
            {blog.excerpt}
          </p>

          {/* Author snippet */}
          <div className="flex items-center gap-3 pt-2">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#E4E3DC]">
              <Image
                src={profile.avatarUrl || "/images/shamanth_portrait.jpg"}
                alt={profile.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="text-xs font-serif font-medium text-[#111418]">{profile.name}</div>
              <div className="text-[11px] font-mono text-[#8C96A5]">{profile.role}</div>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        {blog.coverImage && (
          <div className="my-10 relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-[#E4E3DC] shadow-editorial bg-[#F4F3EE]">
            <Image
              src={blog.coverImage}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Article Body */}
        <article className="py-6">
          <MarkdownRenderer content={blog.content} />
        </article>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="py-6 border-t border-b border-[#E4E3DC] my-10 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-[#8C96A5] mr-2">Tags:</span>
            {blog.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 bg-[#F4F3EE] text-[#333A44] text-xs font-mono rounded border border-[#E4E3DC]"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Author Bio Box */}
        <div className="p-6 md:p-8 bg-white border border-[#E4E3DC] rounded-2xl shadow-subtle flex flex-col sm:flex-row items-start sm:items-center gap-5 my-10">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border border-[#E4E3DC] flex-shrink-0">
            <Image
              src={profile.avatarUrl || "/images/shamanth_portrait.jpg"}
              alt={profile.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-2">
            <div className="text-base font-serif font-medium text-[#111418]">
              Written by {profile.name}
            </div>
            <p className="text-xs sm:text-sm text-[#5F6978] leading-relaxed">
              {profile.bio}
            </p>
            <div className="pt-1">
              <Link
                href="/about"
                className="text-xs font-mono text-[#111418] hover:text-blue-600 transition-colors underline"
              >
                More about Shamanth &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {otherBlogs.length > 0 && (
          <div className="pt-10 border-t border-[#E4E3DC] space-y-6">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#8C96A5]">
              Continue Reading
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {otherBlogs.map((b) => (
                <Link
                  key={b.id}
                  href={`/blog/${b.slug}`}
                  className="p-5 bg-white border border-[#E4E3DC] hover:border-[#111418]/30 rounded-xl transition-all shadow-subtle hover:shadow-editorial group"
                >
                  <span className="text-[10px] font-mono text-[#8C96A5] block mb-1">
                    {b.category} · {b.readingTime}
                  </span>
                  <h4 className="text-sm font-serif font-medium text-[#111418] group-hover:text-blue-600 transition-colors">
                    {b.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer profile={profile} />
    </div>
  );
}
