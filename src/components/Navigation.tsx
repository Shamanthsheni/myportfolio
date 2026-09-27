"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, FileText } from "lucide-react";
import { ResumeModal } from "./ResumeModal";
import { ProfileData } from "@/lib/types";

interface NavigationProps {
  profile?: ProfileData;
}

export const Navigation: React.FC<NavigationProps> = ({ profile }) => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Achievements", href: "/achievements" },
    { label: "Contact", href: "/contact" },
  ];

  const defaultProfile: ProfileData = profile || {
    name: "Shamanth S",
    headline: "AI / ML · COMPUTER VISION · DEEP LEARNING",
    role: "AI / ML Engineer",
    bio: "I build intelligent systems, experiment with machine learning, and explore ideas that sit between AI research and real-world applications.",
    avatarUrl: "/images/shamanth_portrait.jpg",
    email: "shamanthsheni@gmail.com",
    phone: "+91 8891429533",
    location: "Bengaluru, Karnataka, India",
    github: "https://github.com/Shamanthsheni",
    linkedin: "https://www.linkedin.com/in/shamanth-sheni-b05b6b307/",
    resumeUrl: "/shamanth_s.pdf",
    statusBadge: "",
    skills: [],
    experience: [],
    education: [],
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "glass-nav border-b border-[#E4E3DC] py-3.5 shadow-subtle"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-8 flex items-center justify-between">
          {/* Logo / Brand */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 transition-transform hover:opacity-80"
          >
            <span className="font-serif text-lg md:text-xl font-semibold tracking-tight text-[#111418]">
              SHAMANTH S
            </span>
            <span className="hidden sm:inline-block text-[11px] font-mono text-[#8C96A5] tracking-wider pl-2 border-l border-[#E4E3DC]">
              AI / ML
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 bg-[#F4F3EE]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#E4E3DC]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? "bg-white text-[#111418] shadow-sm font-semibold"
                      : "text-[#5F6978] hover:text-[#111418] hover:bg-white/50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setResumeOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-[#111418] bg-white hover:bg-[#F4F3EE] border border-[#E4E3DC] rounded-full transition-all duration-200 shadow-subtle hover:shadow"
            >
              <FileText className="w-3.5 h-3.5 text-[#5F6978]" />
              Resume
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#111418] hover:bg-[#F4F3EE] rounded-lg transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden glass-nav border-b border-[#E4E3DC] px-6 py-5 animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? "bg-white text-[#111418] font-semibold border border-[#E4E3DC]"
                        : "text-[#5F6978] hover:text-[#111418] hover:bg-white/60"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-2 mt-2 border-t border-[#E4E3DC]">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setResumeOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-[#111418] bg-white border border-[#E4E3DC] rounded-lg shadow-subtle"
                >
                  <FileText className="w-4 h-4 text-[#5F6978]" />
                  View Resume
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Resume Modal */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
        profile={defaultProfile}
      />
    </>
  );
};
