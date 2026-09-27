import React from "react";
import { Metadata } from "next";
import { getProfile } from "@/lib/cms-store";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ResumeView } from "./ResumeView";

export const metadata: Metadata = {
  title: "Curriculum Vitae — Shamanth S",
  description: "Complete resume and curriculum vitae of Shamanth S, AI/ML Engineer and Computer Vision Researcher.",
};

export const revalidate = 0;

export default async function ResumePage() {
  const profile = await getProfile();

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#111418]">
      <Navigation profile={profile} />

      <main className="pt-28 md:pt-36 pb-24 max-w-4xl mx-auto px-6 md:px-8">
        <ResumeView profile={profile} />
      </main>

      <Footer profile={profile} />
    </div>
  );
}
