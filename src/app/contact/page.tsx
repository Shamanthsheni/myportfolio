import React from "react";
import { Metadata } from "next";
import { getProfile } from "@/lib/cms-store";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ContactClient } from "./ContactClient";

export const metadata: Metadata = {
  title: "Get in Touch — Shamanth S",
  description: "Contact Shamanth S directly for AI/ML engineering roles, research collaborations, or speaking inquiries.",
};

export const revalidate = 0;

export default async function ContactPage() {
  const profile = await getProfile();

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#111418]">
      <Navigation profile={profile} />

      <main className="pt-28 md:pt-36 pb-24 max-w-6xl mx-auto px-6 md:px-8">
        <div className="max-w-2xl mb-12 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#8C96A5]">
            Communication
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif text-[#111418] tracking-tight">
            Contact & Connect
          </h1>
          <p className="text-base sm:text-lg text-[#5F6978] leading-relaxed">
            Have a project in mind, interested in my research, or want to discuss AI systems? Reach out anytime.
          </p>
        </div>

        <ContactClient profile={profile} />
      </main>

      <Footer profile={profile} />
    </div>
  );
}
