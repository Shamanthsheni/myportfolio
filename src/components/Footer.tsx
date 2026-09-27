"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Phone, ArrowUpRight, Check, Lock } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";
import { ProfileData } from "@/lib/types";

interface FooterProps {
  profile?: ProfileData;
}

export const Footer: React.FC<FooterProps> = ({ profile }) => {
  const [copied, setCopied] = useState(false);

  const email = profile?.email || "shamanthsheni@gmail.com";
  const phone = profile?.phone || "+91 8891429533";
  const github = profile?.github || "https://github.com/Shamanthsheni";
  const linkedin = profile?.linkedin || "https://www.linkedin.com/in/shamanth-sheni-b05b6b307/";

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer className="border-t border-[#E4E3DC] bg-[#FAF9F6] pt-16 pb-12">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#E4E3DC]">
          {/* Identity & Status */}
          <div className="md:col-span-6 space-y-4">
            <Link href="/" className="font-serif text-2xl font-semibold text-[#111418] tracking-tight">
              SHAMANTH S
            </Link>
            <p className="text-sm text-[#5F6978] max-w-md leading-relaxed font-sans">
              AI / ML Engineer & Computer Vision Researcher. Building intelligent systems and exploring ideas that sit between machine learning research and real-world applications.
            </p>

          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#8C96A5]">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/work" className="text-[#5F6978] hover:text-[#111418] transition-colors">
                  Selected Work & Projects
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[#5F6978] hover:text-[#111418] transition-colors">
                  About & Background
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-[#5F6978] hover:text-[#111418] transition-colors">
                  Technical Articles & Notes
                </Link>
              </li>
              <li>
                <Link href="/achievements" className="text-[#5F6978] hover:text-[#111418] transition-colors">
                  Achievements & Awards
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#5F6978] hover:text-[#111418] transition-colors">
                  Get in Touch
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Channels */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#8C96A5]">Connect</h4>
            <div className="space-y-2 text-sm">
              <button
                onClick={copyEmail}
                className="w-full flex items-center justify-between text-[#5F6978] hover:text-[#111418] p-2 -ml-2 rounded-md hover:bg-[#F4F3EE] transition-colors group text-left"
              >
                <span className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#8C96A5]" />
                  <span className="truncate">{email}</span>
                </span>
                <span className="text-[11px] font-mono text-emerald-600">
                  {copied ? <Check className="w-3.5 h-3.5 inline" /> : "Copy"}
                </span>
              </button>

              <a
                href={`tel:${phone}`}
                className="flex items-center justify-between text-[#5F6978] hover:text-[#111418] p-2 -ml-2 rounded-md hover:bg-[#F4F3EE] transition-colors group"
              >
                <span className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#8C96A5]" />
                  <span>{phone}</span>
                </span>
              </a>

              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-[#5F6978] hover:text-[#111418] p-2 -ml-2 rounded-md hover:bg-[#F4F3EE] transition-colors group"
              >
                <span className="flex items-center gap-2">
                  <GithubIcon className="w-4 h-4 text-[#8C96A5]" />
                  <span>GitHub</span>
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>

              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-[#5F6978] hover:text-[#111418] p-2 -ml-2 rounded-md hover:bg-[#F4F3EE] transition-colors group"
              >
                <span className="flex items-center gap-2">
                  <LinkedinIcon className="w-4 h-4 text-[#8C96A5]" />
                  <span>LinkedIn</span>
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright & discrete admin link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#8C96A5]">
          <div>
            © {new Date().getFullYear()} Shamanth S. Built with Next.js & Supabase CMS.
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 text-[#8C96A5] hover:text-[#111418] transition-colors py-1 px-2 rounded hover:bg-[#F4F3EE]"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
