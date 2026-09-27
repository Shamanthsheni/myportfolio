"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff, ShieldCheck, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error || "Authentication failed");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#111418] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white border border-[#E4E3DC] rounded-2xl p-8 sm:p-10 shadow-editorial space-y-8 animate-fade-in">
        {/* Header */}
        <div className="space-y-2 text-center">
          <div className="w-12 h-12 rounded-full bg-[#FAF9F6] border border-[#E4E3DC] flex items-center justify-center mx-auto text-[#111418]">
            <Lock className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-serif font-medium text-[#111418]">
            CMS Admin Access
          </h1>
          <p className="text-xs text-[#5F6978]">
            Enter your secure password to manage portfolio content, projects, and articles.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg animate-fade-in">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#5F6978] block">
              Admin Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-3.5 pr-10 py-2.5 bg-[#FAF9F6] border border-[#E4E3DC] rounded-lg text-xs text-[#111418] placeholder-[#8C96A5] focus:outline-none focus:ring-1 focus:ring-[#111418]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C96A5] hover:text-[#111418]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-[#111418] hover:bg-[#1E293B] text-white text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-2 shadow-subtle disabled:opacity-50"
          >
            {loading ? (
              <span>Verifying...</span>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Back Link */}
        <div className="pt-4 border-t border-[#E4E3DC] text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#5F6978] hover:text-[#111418] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to public website</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
