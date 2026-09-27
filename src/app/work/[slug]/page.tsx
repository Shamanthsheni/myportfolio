import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjects, getProjectBySlug, getProfile } from "@/lib/cms-store";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CaseStudyView } from "@/components/CaseStudyView";

interface Props {
  params: {
    slug: string;
  };
}

export const revalidate = 0;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) {
    return {
      title: "Project Not Found — Shamanth S",
    };
  }

  return {
    title: `${project.title} — Case Study by Shamanth S`,
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} — Shamanth S`,
      description: project.shortDescription,
      images: project.thumbnail ? [{ url: project.thumbnail }] : [],
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: Props) {
  const [project, allProjects, profile] = await Promise.all([
    getProjectBySlug(params.slug),
    getProjects(),
    getProfile(),
  ]);

  if (!project) {
    notFound();
  }

  const published = allProjects.filter((p) => p.published);
  const currentIndex = published.findIndex((p) => p.id === project.id || p.slug === project.slug);
  const prevProject = currentIndex > 0 ? published[currentIndex - 1] : null;
  const nextProject = currentIndex < published.length - 1 ? published[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#111418]">
      <Navigation profile={profile} />

      <main>
        <CaseStudyView
          project={project}
          prevProject={prevProject}
          nextProject={nextProject}
        />
      </main>

      <Footer profile={profile} />
    </div>
  );
}
