import React from "react";
import { Metadata } from "next";
import { getProfile } from "@/lib/cms-store";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AboutClient } from "./AboutClient";

export const metadata: Metadata = {
  title: "About & Background — Shamanth S",
  description: "Learn about Shamanth S, an AI/ML developer & Computer Vision researcher focused on deep learning, computational pathology, and intelligence systems.",
};

export const revalidate = 0;

export default async function AboutPage() {
  const profile = await getProfile();

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#111418]">
      <Navigation profile={profile} />

      <main className="pt-28 md:pt-36 pb-24 max-w-6xl mx-auto px-6 md:px-8">
        <AboutClient profile={profile} />
      </main>

      <Footer profile={profile} />
    </div>
  );
}
