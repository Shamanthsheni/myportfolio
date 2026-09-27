"use client";

import React, { useState } from "react";
import { Mail, Phone, ArrowUpRight, Check, Copy, Send, MessageSquare } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";
import { ProfileData } from "@/lib/types";

interface ContactClientProps {
  profile: ProfileData;
}

export const ContactClient: React.FC<ContactClientProps> = ({ profile }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const copyToClipboard = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate swift delivery
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 600);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
      {/* Direct Contact Information */}
      <div className="lg:col-span-5 space-y-8">
        <div className="space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#8C96A5]">
            Direct Channels
          </span>
          <h2 className="text-3xl font-serif text-[#111418] tracking-tight">
            Reach out directly.
          </h2>
          <p className="text-sm text-[#5F6978] leading-relaxed">
            Feel free to email me regarding AI research collaborations, engineering opportunities, or technical inquiries.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="space-y-4">
          {/* Email */}
          <div className="p-5 bg-white border border-[#E4E3DC] rounded-xl shadow-subtle flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2.5 bg-[#FAF9F6] border border-[#E4E3DC] rounded-lg">
                <Mail className="w-4 h-4 text-[#111418]" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-mono uppercase text-[#8C96A5]">Email</div>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-xs sm:text-sm font-medium text-[#111418] hover:underline truncate block"
                >
                  {profile.email}
                </a>
              </div>
            </div>
            <button
              onClick={() => copyToClipboard(profile.email, "email")}
              className="p-2 text-xs font-mono text-[#5F6978] hover:text-[#111418] hover:bg-[#F4F3EE] rounded-md transition-colors flex-shrink-0"
              title="Copy Email"
            >
              {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Phone */}
          <div className="p-5 bg-white border border-[#E4E3DC] rounded-xl shadow-subtle flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2.5 bg-[#FAF9F6] border border-[#E4E3DC] rounded-lg">
                <Phone className="w-4 h-4 text-[#111418]" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-mono uppercase text-[#8C96A5]">Phone / WhatsApp</div>
                <a
                  href={`tel:${profile.phone}`}
                  className="text-xs sm:text-sm font-mono font-medium text-[#111418] hover:underline block"
                >
                  {profile.phone}
                </a>
              </div>
            </div>
            <button
              onClick={() => copyToClipboard(profile.phone, "phone")}
              className="p-2 text-xs font-mono text-[#5F6978] hover:text-[#111418] hover:bg-[#F4F3EE] rounded-md transition-colors flex-shrink-0"
              title="Copy Phone Number"
            >
              {copiedPhone ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Social Links */}
        <div className="pt-4 border-t border-[#E4E3DC] space-y-3">
          <div className="text-xs font-mono uppercase tracking-widest text-[#8C96A5]">
            Social & Profiles
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 bg-white border border-[#E4E3DC] rounded-lg text-[#111418] hover:bg-[#F4F3EE] transition-colors group"
            >
              <span className="flex items-center gap-2 text-xs font-medium">
                <GithubIcon className="w-4 h-4" />
                <span>GitHub @Shamanthsheni</span>
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#8C96A5] group-hover:text-[#111418] transition-colors" />
            </a>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 bg-white border border-[#E4E3DC] rounded-lg text-[#111418] hover:bg-[#F4F3EE] transition-colors group"
            >
              <span className="flex items-center gap-2 text-xs font-medium">
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn /in/shamanth-sheni</span>
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#8C96A5] group-hover:text-[#111418] transition-colors" />
            </a>
          </div>
        </div>
      </div>

      {/* Interactive Message Form */}
      <div className="lg:col-span-7">
        <div className="p-8 sm:p-10 bg-white border border-[#E4E3DC] rounded-2xl shadow-editorial space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#8C96A5]">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Send a Message</span>
            </div>
            <h3 className="text-2xl font-serif font-medium text-[#111418]">
              Leave a direct note
            </h3>
          </div>

          {sent ? (
            <div className="p-6 bg-[#F4F3EE] border border-[#E4E3DC] rounded-xl text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <Check className="w-5 h-5" />
              </div>
              <h4 className="text-base font-serif font-medium text-[#111418]">
                Message received!
              </h4>
              <p className="text-xs text-[#5F6978] max-w-sm mx-auto">
                Thank you for reaching out. I usually respond within 24 hours.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-2 text-xs font-mono text-[#111418] underline hover:opacity-75"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#5F6978] block">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#E4E3DC] rounded-lg text-xs text-[#111418] placeholder-[#8C96A5] focus:outline-none focus:ring-1 focus:ring-[#111418]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#5F6978] block">Your Email</label>
                  <input
                    type="email"
                    required
                    placeholder="jane@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#E4E3DC] rounded-lg text-xs text-[#111418] placeholder-[#8C96A5] focus:outline-none focus:ring-1 focus:ring-[#111418]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#5F6978] block">Subject / Topic</label>
                <input
                  type="text"
                  required
                  placeholder="Research Collaboration / Job Opportunity"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#E4E3DC] rounded-lg text-xs text-[#111418] placeholder-[#8C96A5] focus:outline-none focus:ring-1 focus:ring-[#111418]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#5F6978] block">Message</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Hi Shamanth, I came across your work on Nuclear Pleomorphism analysis..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#E4E3DC] rounded-lg text-xs text-[#111418] placeholder-[#8C96A5] focus:outline-none focus:ring-1 focus:ring-[#111418] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#111418] hover:bg-[#1E293B] text-white text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-2 shadow-subtle disabled:opacity-50"
              >
                {loading ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Note</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
