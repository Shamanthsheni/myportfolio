"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, FolderGit2, BookOpen, Award, User, Settings, LogOut, ExternalLink } from "lucide-react";

export const AdminNav: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (e) {
      console.error("Logout error:", e);
    }
  };

  const navItems = [
    { label: "Overview", href: "/admin", icon: LayoutDashboard },
    { label: "Projects", href: "/admin/projects", icon: FolderGit2 },
    { label: "Blogs", href: "/admin/blogs", icon: BookOpen },
    { label: "Achievements", href: "/admin/achievements", icon: Award },
    { label: "Profile", href: "/admin/profile", icon: User },
    { label: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-[#E4E3DC] shadow-subtle">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Brand & Badge */}
        <div className="flex items-center gap-3">
          <Link href="/admin" className="font-serif font-semibold text-lg text-[#111418] tracking-tight">
            CMS Dashboard
          </Link>
          <span className="px-2 py-0.5 text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 rounded">
            Admin Active
          </span>
        </div>

        {/* Links */}
        <nav className="flex items-center gap-1 overflow-x-auto py-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname?.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  isActive
                    ? "bg-[#111418] text-white"
                    : "text-[#5F6978] hover:text-[#111418] hover:bg-[#F4F3EE]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Public site link & Logout */}
        <div className="flex items-center gap-3 text-xs">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1 text-[#5F6978] hover:text-[#111418] font-mono transition-colors"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-mono"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </header>
  );
};
